import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

type WPPost = {
  post_name?: string;
  post_permalink?: string;
};

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));

    console.log(body);

    const headerSecret = (req as any).headers?.get
      ? (req as any).headers.get("x-revalidate-secret")
      : undefined;
    const secret = body.secret || headerSecret;

    if (!process.env.REVALIDATE_SECRET) {
      console.error("REVALIDATE_SECRET not set in environment");
      return NextResponse.json(
        { revalidated: false, reason: "server misconfigured" },
        { status: 500 },
      );
    }

    if (secret !== process.env.REVALIDATE_SECRET) {
      return NextResponse.json({ revalidated: false }, { status: 401 });
    }

    const paths = new Set<string>();

    // Add homepage (optional but useful)
    paths.add("/");

    // Extract post info
    const post: WPPost = body.post || {};
    const postName = post.post_name || body.post_name || undefined;

    // If taxonomies.category is an object keyed by slug (WP Webhooks format), use keys
    const tax = body.taxonomies?.category;
    if (tax && typeof tax === "object") {
      // tax may be an object with slug keys, or an array of term objects
      if (!Array.isArray(tax)) {
        Object.keys(tax).forEach((slug) => {
          if (!slug) return;
          paths.add(`/${slug}`);
          if (postName) paths.add(`/${slug}/${postName}`);
        });
      } else {
        (tax as any[]).forEach((term) => {
          const slug = term?.slug;
          if (!slug) return;
          paths.add(`/${slug}`);
          if (postName) paths.add(`/${slug}/${postName}`);
        });
      }
    }

    // If a permalink is provided, use its pathname as a fallback
    if (body.post_permalink && typeof body.post_permalink === "string") {
      try {
        const url = new URL(body.post_permalink);
        if (url.pathname) paths.add(url.pathname.replace(/\/$/, ""));
      } catch (e) {
        // ignore invalid urls
      }
    }

    // If no categories were found but we have a post slug, try to revalidate common path
    if (paths.size === 1 && postName) {
      // try /post-slug as a fallback
      paths.add(`/${postName}`);
    }

    const results: { path: string; ok: boolean; error?: string }[] = [];

    for (const p of Array.from(paths)) {
      try {
        await revalidatePath(p === "" ? "/" : p);
        results.push({ path: p, ok: true });
        console.log("Revalidated:", p);
      } catch (err: any) {
        console.error("Failed to revalidate", p, err);
        results.push({ path: p, ok: false, error: String(err) });
      }
    }

    const ok = results.every((r) => r.ok);
    return NextResponse.json({ revalidated: ok, results });
  } catch (err) {
    console.error("revalidate endpoint error:", err);
    return NextResponse.json(
      { revalidated: false, error: String(err) },
      { status: 500 },
    );
  }
}
