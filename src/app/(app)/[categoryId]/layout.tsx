import { Metadata } from "next";
import React from "react";
import { navItems } from "../../../lib/categories";
import { pageConfig } from "@/lib/configs/pageConfig";

type MetadataProps = {
  params: { categoryId: string };
};

// export const revalidate = 300; // Revalidate this page every 5 minutes

export async function generateMetadata({
  params,
}: MetadataProps): Promise<Metadata> {
  const title = navItems.filter((nav) => nav.path === params.categoryId);

  return {
    title: title[0]?.label ?? "Preview",
    description: pageConfig.pageDescription,
  };
}

const CategoryLayout = ({ children }: { children: React.ReactNode }) => {
  return <main>{children}</main>;
};

export default CategoryLayout;
