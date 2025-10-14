import React from "react";

import styles from "./InstagramCTA.module.css";

import { Nokora, Anybody } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const nokora = Nokora({ subsets: ["latin"], weight: ["100"] });
const anybody = Anybody({ subsets: ["latin"], weight: ["600"] });

const InstagramCTA = () => {
  const array = new Array(6).fill(null);
  return (
    <section className={styles.container}>
      <div className={styles.innerContainer}>
        <div className={styles.textContainer}>
          <span className={`${nokora.className} ${styles.text}`}>zaprati</span>
          <span className={`${anybody.className} ${styles.highlight}`}>
            sportcastplus
          </span>
          <span className={`${nokora.className} ${styles.text}`}>
            na instagramu
          </span>
        </div>
        <div className={styles.gridContainer}>
          {array.map((_, index) => {
            return (
              <Link
                key={index}
                href={"https://www.instagram.com/sportcastplus/"}
                className={styles.imageContainer}
              >
                <Image
                  src={`/instagram/instagram_${index + 1}.jpg`}
                  fill
                  alt=""
                  style={{ objectFit: "cover" }}
                  className={styles.image}
                />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default InstagramCTA;
