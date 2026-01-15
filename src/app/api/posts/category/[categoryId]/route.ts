import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_ENDPOINT as string;

interface Params {
  categoryId: string;
}

interface Context {
  params: Params;
}

interface PostData {
  excerpt: string;
  featuredImage: {
    node: {
      sourceUrl: string;
    };
  };
  id: string;
  date: string;
  slug: string;
  title: string;
  categories: {
    nodes: {
      name: string;
      slug: string;
    }[];
  };
}

interface ApiResponse {
  data: {
    posts: {
      nodes: PostData[];
    };
  };
}

export async function GET(req: Request, context: Context) {
  const { params } = context;

  const query = `{
    posts(where: {categoryName: "${params.categoryId}"}) {
      nodes {
        excerpt
        featuredImage {
          node {
            sourceUrl
          }
        }
        id
        date
        slug
        title
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
      }
    }
  }`;

  try {
    const res = await fetch(API_URL, {
      cache: "no-cache",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });

    if (!res.ok) {
      console.error("Failed to fetch data:", res.statusText);
      return NextResponse.error();
    }

    const json: ApiResponse = await res.json();

    // revalidatePath(req.url);
    return NextResponse.json(json.data);
  } catch (error) {
    console.error("An error occurred while fetching data:", error);
    return NextResponse.error();
  }
}
