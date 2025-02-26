"use client";

import React, { useState } from "react";
import { useHeader } from "../contexts/HeaderContext";

export const Denuncia_forms = () => {
  const { headerHeight } = useHeader();

  return (
    <main
      style={{ top: `${headerHeight}px` }}
      className="bg-red-600/30 translate-y-full h-32 z-50"
    >
      <h2 className="text-[var(--font-title)] font-semibold text-3xl">
        Envie uma nova denúncia
      </h2>
    </main>
  );
};
