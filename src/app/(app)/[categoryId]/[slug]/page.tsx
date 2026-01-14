import { fetchSinglePost, SinglePostAPI } from "@/app/actions/fetchSinglePost";
import { transformDate } from "@/lib/transformDate";
import React from "react";
import { hasPreviewProps } from "@/lib/util/hasPreviewProps";
import { getAuthClient, getClient } from "@faustwp/experimental-app-router";
import Article from "@/components/Articles/Article";
import Breadcrumbs from "@/components/Articles/Breadcrumbs";
import Login from "@/components/Login/Login";
import { fetchPostPreview } from "@/app/actions/fetchPostPreview";

type PageProps = {
  params: { slug: string; categoryId: string; id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export const revalidate = 300; // Revalidate this page every 5 minutes

const SinglePostPage: React.FC<PageProps> = async (props) => {
  const isPreview = hasPreviewProps(props);
  const id = props.searchParams.p;

  const client = isPreview ? await getAuthClient() : await getClient();

  // if we are previewing but we are not logged in `getAuthClient` fails and return null
  if (!client) {
    return <Login id={id as string} />;
  }

  // preview post render
  if (isPreview) {
    const data = await fetchPostPreview(id);
    const date = transformDate(data.contentNode.date);

    return (
      <Article
        author={data.contentNode.author.node.name}
        categorySlug={data.contentNode.categories.nodes[0].slug}
        content={data.contentNode.content}
        date={date}
        image={data.contentNode.featuredImage.node.sourceUrl}
        isPreview={isPreview}
        slug={data.contentNode.slug}
        title={data.contentNode.title}
      />
    );
  }

  // regular post render
  const { categoryId, slug } = props.params;

  const data = await fetchSinglePost(categoryId, slug);
  const date = transformDate(data.post.date);

  return (
    <>
      <Breadcrumbs
        label={data.post.categories.nodes[0].name}
        category={data.post.categories.nodes[0].slug}
      />
      <Article
        author={data.post.author.node.name}
        categorySlug={data.post.categories.nodes[0].slug}
        content={data.post.content}
        date={date}
        image={data.post.featuredImage.node.sourceUrl}
        isPreview={isPreview}
        slug={data.post.slug}
        title={data.post.title}
        tags={data.post.tags.nodes}
      />
    </>
  );
};

export default SinglePostPage;
