"use client";

import { useEffect, useState } from "react";

interface FontCycleTextProps {
  text: string;
  className?: string;
}

const fonts = [
  "serif",
  "sans-serif",
  "monospace",
  "cursive",
  "fantasy",
];

export default function FontCycleText({ text, className }: FontCycleTextProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % fonts.length);
    }, 300);
    return () => clearInterval(id);
  }, []);

  return (
    <span style={{ fontFamily: fonts[index] }} className={className}>
      {text}
    </span>
  );
}
