"use client";

import { useEffect, useState } from "react";

interface FontCycleTextProps {
  text: string;
  className?: string;
}

const fonts = [
  "var(--font-noto-serif-kr)",
  "var(--font-nanum-pen-script)",
  "var(--font-dancing-script)",
];

export default function FontCycleText({ text, className }: FontCycleTextProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % fonts.length);
    }, 500);
    return () => clearInterval(id);
  }, []);

  return (
    <span style={{ fontFamily: fonts[index] }} className={className}>
      {text}
    </span>
  );
}
