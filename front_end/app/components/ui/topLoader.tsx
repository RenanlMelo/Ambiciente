// components/TopLoader.tsx
"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

export default function TopLoader() {
  const pathname = usePathname();
  const timeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    NProgress.start();

    if (timeout.current) clearTimeout(timeout.current);
    timeout.current = setTimeout(() => {
      NProgress.done();
    }, 300); // You can tweak the delay here

    return () => {
      if (timeout.current) clearTimeout(timeout.current);
    };
  }, [pathname]);

  return null;
}
