"use client";
import { useEffect, useState } from "react";
import { PoemDisplayProps } from "@/types";
import {
  createTwitterShareUrl,
  createFacebookShareUrl,
  shareViaWebAPI,
  copyToClipboard,
  showButtonFeedback,
} from "@/utils/share";
import { createPoemStructuredData, addStructuredDataToDOM } from "@/utils/seo";
import { ANIMATION_CONFIG } from "@/constants";

export default function PoemDisplay({ poem }: PoemDisplayProps) {
  const lines = poem.trim().split(/\r?\n/);
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    setVisibleLines(0);
    const timer = setInterval(() => {
      setVisibleLines((prevVisible) => {
        if (prevVisible >= lines.length) {
          clearInterval(timer);
          return prevVisible;
        }
        return prevVisible + 1;
      });
    }, ANIMATION_CONFIG.poemLineDelay);

    return () => clearInterval(timer);
  }, [poem, lines.length]);

  useEffect(() => {
    if (visibleLines >= lines.length) {
      const structuredData = createPoemStructuredData(poem);
      addStructuredDataToDOM(structuredData);
    }
  }, [visibleLines, lines.length, poem]);

  const handleCopyPoem = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    const success = await copyToClipboard(poem);

    if (success) {
      showButtonFeedback(button, "복사 완료!", ANIMATION_CONFIG.buttonFeedbackDelay);
    } else {
      showButtonFeedback(button, "복사 실패", ANIMATION_CONFIG.buttonFeedbackDelay);
    }
  };

  const twitterShareUrl = createTwitterShareUrl(poem);
  const facebookShareUrl = createFacebookShareUrl(poem);
  const handleWebShare = () => shareViaWebAPI(poem);
  const isAnimationComplete = visibleLines >= lines.length;

  return (
    <article className="flex flex-col items-center gap-6">
      <div className="flex flex-col items-center" itemScope itemType="https://schema.org/Poem">
        <meta itemProp="name" content="AI 생성 시" />
        <meta itemProp="author" content="포엣캠 AI" />
        <meta itemProp="dateCreated" content={new Date().toISOString()} />
        <meta itemProp="inLanguage" content="ko" />

        <div itemProp="text">
          {lines.map((line, index) => (
            <p
              key={`poem-line-${index}`}
              className={`transition-opacity duration-700 text-center text-2xl md:text-3xl font-serif italic tracking-wide whitespace-pre-wrap ${
                visibleLines > index ? "opacity-100" : "opacity-0"
              }`}>
              {line}
            </p>
          ))}
        </div>
      </div>

      {isAnimationComplete && (
        <nav className="flex gap-4" aria-label="시 공유 및 복사 옵션">
          <button
            onClick={handleCopyPoem}
            className="bg-white text-black px-4 py-2 rounded-full shadow hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300"
            aria-label="시를 클립보드에 복사">
            시 복사하기
          </button>
          <a
            href={twitterShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-500 text-white px-4 py-2 rounded-full shadow hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300"
          aria-label="트위터에 시 공유하기">
            X(트위터)에 공유
          </a>
          <a
            href={facebookShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-700 text-white px-4 py-2 rounded-full shadow hover:bg-blue-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300"
            aria-label="페이스북에 시 공유하기">
            페이스북에 공유
          </a>
          <button
            onClick={handleWebShare}
            className="bg-yellow-400 text-black px-4 py-2 rounded-full shadow hover:bg-yellow-500 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-200"
            aria-label="카카오톡에 시 공유하기">
            카카오톡에 공유
          </button>
          <button
            onClick={handleWebShare}
            className="bg-pink-500 text-white px-4 py-2 rounded-full shadow hover:bg-pink-600 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-300"
            aria-label="인스타그램에 시 공유하기">
            인스타그램에 공유
          </button>
        </nav>
      )}
    </article>
  );
}
