"use server";

import { PostData } from "@/lib/api-types";
import { gql } from "@apollo/client";
import { getClient } from "@faustwp/experimental-app-router";
import { revalidatePath } from "next/cache";

export async function fetchPostsByCategory(categoryId: string) {
  const query = gql`{
      posts(where: {categoryName: "${categoryId}"}) {
        nodes {
          excerpt
          featuredImage {
            node {
              sourceUrl
            }
          }
          id
          content
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

  const client = await getClient();
  const { data }: { data: { posts: { nodes: PostData[] } } } =
    await client.query({ query: query });

  // revalidatePath(`/${categoryId}`);
  return data.posts.nodes;
}
