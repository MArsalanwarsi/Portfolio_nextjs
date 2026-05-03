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
    <div className="relative aspect-[4/5] min-h-[18rem] overflow-hidden rounded-2xl border border-border bg-muted sm:min-h-[22rem]">
      {imageSource ? (
        <Image
          src={imageSource}
          alt={alt}
          fill
          preload
          sizes="(max-width: 768px) 82vw, 34rem"
          className="object-cover object-[center_18%]"
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
        <div className="absolute inset-0 grid place-items-center bg-muted">
          <span className="font-display text-6xl font-semibold tracking-normal text-muted-foreground">
            {initials}
          </span>
        </div>
      )}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/24 via-transparent to-transparent" />
    </div>
  );
}
