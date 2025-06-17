"use client";

import { useEffect, useRef, useState } from "react";

interface FontCycleTextProps {
  text: string;
  className?: string;
}

const fonts = [
  "var(--font-noto-serif-kr)",
  "var(--font-noto-sans-kr)",
  "var(--font-nanum-pen-script)",
  "var(--font-gaegu)",
  "var(--font-dongle)",
  "var(--font-gowun-dodum)",
  "var(--font-gowun-batang)",
  "var(--font-do-hyeon)",
  "var(--font-jua)",
  "var(--font-song-myung)",
  "var(--font-hi-melody)",
];

export default function FontCycleText({ text, className }: FontCycleTextProps) {
  const [index, setIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setIndex(0);
    intervalRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % fonts.length);
    }, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const aiIdx = text.indexOf("AI");
  const siIdx = text.indexOf("시");

  if (aiIdx === -1 && siIdx === -1) {
    return (
      <span style={{ fontFamily: fonts[index] }} className={className}>
        {text}
      </span>
    );
  }

  let parts: React.ReactNode[] = [];
  let rest = text;
  let aiUsed = false;
  let siUsed = false;
  let key = 0;

  while (rest.length > 0) {
    const aiPos = !aiUsed ? rest.indexOf("AI") : -1;
    const siPos = !siUsed ? rest.indexOf("시") : -1;

    if (aiPos === -1 && siPos === -1) {
      parts.push(
        <span key={key++} style={{ fontFamily: fonts[index] }}>
          {rest}
        </span>
      );
      break;
    }

    if (aiPos !== -1 && (siPos === -1 || aiPos < siPos)) {
      if (aiPos > 0) {
        parts.push(
          <span key={key++} style={{ fontFamily: fonts[index] }}>
            {rest.slice(0, aiPos)}
          </span>
        );
      }
      parts.push(
        <span key="ai" style={{ fontFamily: "var(--font-noto-sans-kr)", fontWeight: 700 }}>
          AI
        </span>
      );
      rest = rest.slice(aiPos + 2);
      aiUsed = true;
      continue;
    }
    if (siPos !== -1 && (aiPos === -1 || siPos < aiPos)) {
      if (siPos > 0) {
        parts.push(
          <span key={key++} style={{ fontFamily: fonts[index] }}>
            {rest.slice(0, siPos)}
          </span>
        );
      }
      parts.push(
        <span
          key="si"
          style={{ fontFamily: "var(--font-noto-sans-kr)", fontSize: 20, fontWeight: 700 }}>
          시
        </span>
      );
      rest = rest.slice(siPos + 1);
      siUsed = true;
      continue;
    }
  }

  return <span className={className}>{parts}</span>;
}
