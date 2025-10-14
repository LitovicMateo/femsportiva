"use client";

import React from "react";
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  TelegramShareButton,
  TelegramIcon,
  FacebookMessengerShareButton,
  FacebookMessengerIcon,
} from "react-share";

import styles from "./ArticleShare.module.css";

type ArticleShareProps = {
  url: string;
};

const ArticleShare: React.FC<ArticleShareProps> = ({ url }) => {
  return (
    <section className={styles.container}>
      <h3>Podijeli ovaj članak</h3>
      <div className={styles.iconContainer}>
        <FacebookShareButton
          hashtag="#femsportiva"
          url={url}
          title="femsportiva"
        >
          <FacebookIcon round />
        </FacebookShareButton>
        <FacebookMessengerShareButton appId={"6147615245363305"} url={url}>
          <FacebookMessengerIcon size={36} round />
        </FacebookMessengerShareButton>
        <TwitterShareButton hashtags={["femsportiva"]} url={url}>
          <TwitterIcon size={36} round />
        </TwitterShareButton>
        <WhatsappShareButton url={url}>
          <WhatsappIcon size={36} round />
        </WhatsappShareButton>
        <TelegramShareButton url={url}>
          <TelegramIcon size={36} round />
        </TelegramShareButton>
      </div>
    </section>
  );
};

export default ArticleShare;
