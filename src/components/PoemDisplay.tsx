"use client";
import { useEffect, useState } from "react";

interface Props {
  poem: string;
}

export default function PoemDisplay({ poem }: Props) {
  const lines = poem.trim().split(/\r?\n/);
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    setVisible(0);
    const timer = setInterval(() => {
      setVisible((v) => {
        if (v >= lines.length) {
          clearInterval(timer);
          return v;
        }
        return v + 1;
      });
    }, 700);
    return () => clearInterval(timer);
  }, [poem]);

  const shareText = `${poem}\n\n#포엣캠 #AI시 #사진시 #감성시`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    shareText
  )}&url=https://poetcam.vercel.app`;

  useEffect(() => {
    if (visible >= lines.length) {
      const structuredData = {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        name: "AI 생성 시",
        text: poem,
        author: {
          "@type": "SoftwareApplication",
          name: "포엣캠 AI",
        },
        dateCreated: new Date().toISOString(),
        genre: "시",
        inLanguage: "ko",
        creativeWorkStatus: "Published",
      };

      const existingScript = document.querySelector("script[data-poem-structured-data]");
      if (existingScript) {
        existingScript.remove();
      }

      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.setAttribute("data-poem-structured-data", "true");
      script.textContent = JSON.stringify(structuredData);
      document.head.appendChild(script);
    }
  }, [visible, lines.length, poem]);

  return (
    <article className="flex flex-col items-center gap-6">
      <div className="flex flex-col items-center" itemScope itemType="https://schema.org/Poem">
        <meta itemProp="name" content="AI 생성 시" />
        <meta itemProp="author" content="포엣캠 AI" />
        <meta itemProp="dateCreated" content={new Date().toISOString()} />
        <meta itemProp="inLanguage" content="ko" />

        <div itemProp="text">
          {lines.map((line, idx) => (
            <p
              key={idx}
              className={`transition-opacity duration-700 text-center text-2xl md:text-3xl font-serif italic tracking-wide whitespace-pre-wrap ${
                visible > idx ? "opacity-100" : "opacity-0"
              }`}>
              {line}
            </p>
          ))}
        </div>
      </div>

      {visible >= lines.length && (
        <nav className="flex gap-4" aria-label="시 공유 및 복사 옵션">
          <button
            onClick={(event) => {
              navigator.clipboard.writeText(poem);
              const button = event?.target as HTMLButtonElement;
              const originalText = button.textContent;
              button.textContent = "복사 완료!";
              setTimeout(() => {
                button.textContent = originalText;
              }, 2000);
            }}
            className="bg-white text-black px-4 py-2 rounded-full shadow hover:bg-gray-100 transition-colors"
            aria-label="시를 클립보드에 복사">
            시 복사하기
          </button>
          <a
            href={twitterUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-500 text-white px-4 py-2 rounded-full shadow hover:bg-blue-600 transition-colors"
            aria-label="트위터에 시 공유하기">
            X(트위터)에 공유
          </a>
        </nav>
      )}
    </article>
  );
}
