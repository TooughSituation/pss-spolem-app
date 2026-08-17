"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const THRESHOLD = 68;

function scrollParent(node: HTMLElement | null) {
  let current = node;
  while (current) {
    const { overflowY } = window.getComputedStyle(current);
    if (overflowY === "auto" || overflowY === "scroll") return current;
    current = current.parentElement;
  }
  return null;
}

export function PullToRefresh({
  onRefresh,
  children,
}: {
  onRefresh: () => Promise<void>;
  children: ReactNode;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const startY = useRef(0);
  const pulling = useRef(false);
  const offsetRef = useRef(0);
  const refreshingRef = useRef(false);
  const [offset, setOffset] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const setPull = (value: number) => {
      offsetRef.current = value;
      setOffset(value);
    };

    const onStart = (event: TouchEvent) => {
      const scroller = scrollParent(root);
      if ((scroller?.scrollTop ?? 0) > 0) return;
      pulling.current = true;
      startY.current = event.touches[0]?.clientY ?? 0;
    };

    const onMove = (event: TouchEvent) => {
      if (!pulling.current || refreshingRef.current) return;
      const scroller = scrollParent(root);
      if ((scroller?.scrollTop ?? 0) > 0) {
        pulling.current = false;
        setPull(0);
        return;
      }
      const y = event.touches[0]?.clientY ?? 0;
      const dy = y - startY.current;
      if (dy <= 0) {
        setPull(0);
        return;
      }
      if (dy > 8 && event.cancelable) event.preventDefault();
      setPull(Math.min(dy * 0.42, 96));
    };

    const onEnd = () => {
      if (!pulling.current) return;
      pulling.current = false;
      const shouldRefresh =
        offsetRef.current >= THRESHOLD && !refreshingRef.current;
      if (!shouldRefresh) {
        setPull(0);
        return;
      }
      refreshingRef.current = true;
      setRefreshing(true);
      setPull(THRESHOLD);
      void onRefresh().finally(() => {
        refreshingRef.current = false;
        setRefreshing(false);
        setPull(0);
      });
    };

    root.addEventListener("touchstart", onStart, { passive: true });
    root.addEventListener("touchmove", onMove, { passive: false });
    root.addEventListener("touchend", onEnd);
    root.addEventListener("touchcancel", onEnd);
    return () => {
      root.removeEventListener("touchstart", onStart);
      root.removeEventListener("touchmove", onMove);
      root.removeEventListener("touchend", onEnd);
      root.removeEventListener("touchcancel", onEnd);
    };
  }, [onRefresh]);

  return (
    <div ref={rootRef}>
      <div
        className="flex items-center justify-center overflow-hidden text-primary transition-[height] duration-200"
        style={{ height: refreshing ? 56 : offset }}
        aria-hidden={!refreshing && offset === 0}
      >
        <Loader2
          className={cn(
            "size-6",
            (refreshing || offset >= THRESHOLD) && "animate-spin",
          )}
        />
      </div>
      {children}
    </div>
  );
}
