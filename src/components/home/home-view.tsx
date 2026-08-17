"use client";

import { useCallback, useMemo, useState } from "react";
import { toast } from "sonner";
import { BannerCarousel } from "@/components/home/banner-carousel";
import { HomeHeader } from "@/components/home/home-header";
import { HomeSection } from "@/components/home/home-section";
import { HomeSkeleton } from "@/components/home/home-skeleton";
import { PointsCard } from "@/components/home/points-card";
import { PullToRefresh } from "@/components/home/pull-to-refresh";
import { getHomeBanners } from "@/lib/data/banners";
import { getHomeSections } from "@/lib/data/home-sections";
import { useAuth } from "@/lib/stores/auth";

export function HomeView() {
  const user = useAuth((s) => s.user);
  const [seed, setSeed] = useState(0);
  const [loading, setLoading] = useState(false);

  const banners = useMemo(() => getHomeBanners(seed), [seed]);
  const sections = useMemo(() => getHomeSections(seed), [seed]);

  const onRefresh = useCallback(async () => {
    setLoading(true);
    await new Promise((resolve) => window.setTimeout(resolve, 650));
    setSeed((value) => value + 1);
    setLoading(false);
    toast.success("Oferta odświeżona");
  }, []);

  const name = user?.name || "Anna";
  const points = user?.pointsBalance ?? 1250;
  const cardNumber = user?.loyaltyCardNumber || "1234567890";

  return (
    <PullToRefresh onRefresh={onRefresh}>
      {loading ? (
        <HomeSkeleton />
      ) : (
        <div className="space-y-6 pb-8">
          <HomeHeader name={name} />
          <PointsCard name={name} points={points} cardNumber={cardNumber} />
          <BannerCarousel banners={banners} />
          {sections.map((section) => (
            <HomeSection key={section.id} section={section} />
          ))}
        </div>
      )}
    </PullToRefresh>
  );
}
