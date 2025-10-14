"use client";

import React from "react";
import YouTubeIcon from "@mui/icons-material/YouTube";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import InstagramIcon from "@mui/icons-material/Instagram";

const SocialIcons = () => {
  return (
    <section>
      <div className="justify-baseline flex items-baseline gap-2 text-[#ff0099]">
        <p>Zaprati Femsportivu na </p>
        <div className="flex aspect-square h-[32px] items-center justify-center rounded-full text-accent">
          <a
            href="https://www.instagram.com/sportcastplus/?hl=en"
            target="_blank"
            rel="noopener noreferrer"
          >
            <InstagramIcon fontSize="small" style={{ color: "#ff0099" }} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default SocialIcons;
