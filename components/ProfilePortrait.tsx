import Image from "next/image";

interface ProfilePortraitProps {
  src: string;
  alt: string;
}

export default function ProfilePortrait({ src, alt }: ProfilePortraitProps) {
  return (
    <div className="relative aspect-[4/5] min-h-[18rem] overflow-hidden rounded-lg border border-border bg-muted sm:min-h-[22rem]">
      <Image
        src={src}
        alt={alt}
        fill
        preload
        sizes="(max-width: 768px) 82vw, 23rem"
        className="object-cover object-[center_18%]"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/24 via-transparent to-transparent" />
    </div>
  );
}
