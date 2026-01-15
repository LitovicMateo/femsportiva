import { NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_ENDPOINT as string;

export async function GET(req: Request, context: any) {
  const { params }: { params: { slug: string } } = context;

  const query = `query FetchSinglePost {
      post(id: "${params.slug}", idType: URI) {
        date
        excerpt
        content
        slug
        title
        featuredImage {
          node {
            altText
            caption
            slug
            sourceUrl
          }
        }
        categories {
          nodes {
            name
            slug
          }
        }
        author {
          node {
            name
          }
        }
        seo 
        {
          focuskw
        }
        tags {
          nodes {
            name
          }
        }
      }
    }`;

  const res = await fetch(API_URL, {
    next: {
      // revalidate: 60,
    },
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: query,
    }),
  });
  const data = await res.json();

  return NextResponse.json(data);
}
