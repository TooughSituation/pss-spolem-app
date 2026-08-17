"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { HomeBanner } from "@/lib/types";
import { cn } from "@/lib/utils";

const AUTOPLAY_MS = 4500;

export function BannerCarousel({ banners }: { banners: HomeBanner[] }) {
  const [index, setIndex] = useState(0);
  const paused = useRef(false);
  const resumeAt = useRef(0);

  const goTo = useCallback(
    (next: number) => {
      if (!banners.length) return;
      const count = banners.length;
      setIndex(((next % count) + count) % count);
    },
    [banners.length],
  );

  const pause = () => {
    paused.current = true;
    resumeAt.current = Date.now() + AUTOPLAY_MS;
  };

  useEffect(() => {
    if (banners.length < 2) return;
    const id = window.setInterval(() => {
      if (paused.current) {
        if (Date.now() >= resumeAt.current) paused.current = false;
        return;
      }
      setIndex((current) => (current + 1) % banners.length);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [banners.length]);

  if (!banners.length) return null;

  return (
    <section className="px-4" aria-roledescription="karuzela" aria-label="Banery">
      <div
        className="relative overflow-hidden rounded-xl"
        onPointerDown={pause}
        onTouchStart={pause}
      >
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {banners.map((banner) => (
            <BannerSlide key={banner.id} banner={banner} />
          ))}
        </div>
      </div>
      {banners.length > 1 ? (
        <div className="mt-2.5 flex justify-center gap-1.5">
          {banners.map((banner, i) => (
            <button
              key={banner.id}
              type="button"
              aria-label={`Baner ${i + 1}`}
              aria-current={i === index}
              className={cn(
                "h-2 rounded-full transition-all",
                i === index ? "w-5 bg-primary" : "w-2 bg-border",
              )}
              onClick={() => {
                pause();
                goTo(i);
              }}
            />
          ))}
        </div>
      ) : null}
    </section>
  );
}

export function BannerSlide({ banner }: { banner: HomeBanner }) {
  return (
    <Link
      href={banner.link}
      className="relative block h-40 w-full shrink-0 overflow-hidden"
    >
      <Image
        src={banner.image}
        alt={banner.title}
        fill
        className="object-cover"
        sizes="430px"
        priority={banner.order === 1}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/88 via-primary/45 to-transparent" />
      <div className="absolute inset-0 flex flex-col justify-end p-4 text-white">
        <p className="text-lg font-bold leading-tight">{banner.title}</p>
        {banner.subtitle ? (
          <p className="mt-1 text-sm text-white/85">{banner.subtitle}</p>
        ) : null}
      </div>
    </Link>
  );
}
