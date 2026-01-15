import Hero from "@/components/Hero/Hero";
import YouTubeCTA from "@/components/SocialCTA/YouTubeCTA";
import InstagramCTA from "@/components/SocialCTA/InstagramCTA";
import { fetchRecentPosts } from "../actions/fetchRecentPosts";
import ArticleGrid from "@/components/ArticleList/Grid/ArticleGrid";
import ArticleList from "@/components/ArticleList/List/ArticleList";

import styles from "./Page.module.css";
import ArticleAd from "@/components/Ads/ArticleAd";

// export const revalidate = 0;

export default async function Home() {
  const posts = await fetchRecentPosts();

  return (
    <main className={styles.page}>
      {posts && (
        <>
          <Hero posts={posts!} />
          <div className={styles.bannerContainer}>
            <ArticleAd
              adTargetUrl="https://smash-porec.hr/"
              alt="Smash banner ad"
              imageSrc="/ads/smash-ad.png"
            />
          </div>
          <ArticleList posts={posts!.slice(4, 8)} />
          <ArticleList posts={posts!.slice(9, 12)} />
          <ArticleList posts={posts!.slice(13, 16)} />
          <ArticleList posts={posts!.slice(17, 20)} />
          <ArticleList posts={posts!.slice(21, 24)} />
        </>
      )}
    </main>
  );
}
