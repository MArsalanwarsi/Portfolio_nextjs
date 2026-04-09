"use client";

import Image from "next/image";
import { useState } from "react";

interface ProfilePortraitProps {
  src: string;
  fallbackSrc: string;
  alt: string;
  initials: string;
}

export default function ProfilePortrait({
  src,
  fallbackSrc,
  alt,
  initials,
}: ProfilePortraitProps) {
  const [imageSource, setImageSource] = useState(src);

  return (
    <div className="portrait-frame">
      {imageSource ? (
        <Image
          src={imageSource}
          alt={alt}
          fill
          preload
          sizes="(max-width: 768px) 82vw, 36rem"
          className="portrait-frame__image"
          unoptimized={imageSource.endsWith(".svg")}
          onError={() => {
            if (imageSource !== fallbackSrc) {
              setImageSource(fallbackSrc);
              return;
            }

            setImageSource("");
          }}
        />
      ) : (
        <div className="portrait-frame__fallback" aria-hidden="true">
          <span className="portrait-frame__fallback-mark">{initials}</span>
        </div>
      )}
    </div>
  );
}
