"use client";

import { useEffect, useState } from "react";
import Image, { type ImageProps } from "next/image";

export const PLACEHOLDER_IMAGE = "/images/placeholder.jpg";

export function SafeImage({
  src,
  alt,
  ...props
}: Omit<ImageProps, "src" | "alt"> & {
  src?: ImageProps["src"] | null;
  alt: string;
}) {
  const incoming = src || PLACEHOLDER_IMAGE;
  const [current, setCurrent] = useState(incoming);

  useEffect(() => {
    setCurrent(incoming);
  }, [incoming]);

  return (
    <Image
      {...props}
      src={current}
      alt={alt}
      onError={() => {
        if (current !== PLACEHOLDER_IMAGE) {
          setCurrent(PLACEHOLDER_IMAGE);
        }
      }}
    />
  );
}
