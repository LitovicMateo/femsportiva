import { Metadata } from "next";
import React from "react";
import { normalizeString } from "@/lib/normalizeString";

type MetadataProps = {
  params: { tagName: string };
};

export async function generateMetadata({
  params,
}: MetadataProps): Promise<Metadata> {
  const normalizedTag = normalizeString(params.tagName);

  return {
    title: normalizedTag,
    description:
      "Dobrodošli na Fesmportivu, mjesto na kojem sport predstavlja puno više od onoga što se događa na terenu!",
  };
}

const CategoryLayout = ({ children }: { children: React.ReactNode }) => {
  return <main className="">{children}</main>;
};

export default CategoryLayout;
