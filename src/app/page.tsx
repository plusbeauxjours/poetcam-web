"use client";

import { useState } from "react";
import CameraCapture from "@/components/CameraCapture";
import PoemDisplay from "@/components/PoemDisplay";
import { generatePoem } from "@/lib/generatePoem";

export default function Home() {
  const [poem, setPoem] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCapture = async (image: string) => {
    setLoading(true);
    const result = await generatePoem(image);
    setPoem(result);
    setLoading(false);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 text-white bg-black font-sans gap-8">
      {/* SEO용 숨겨진 헤딩 */}
      <h1 className="sr-only">포엣캠 - AI가 사진을 보고 시를 써주는 서비스</h1>

      {!poem && !loading && (
        <section aria-label="사진 촬영 섹션">
          <h2 className="sr-only">사진을 촬영하여 AI 시 생성하기</h2>
          <CameraCapture onCapture={handleCapture} />
        </section>
      )}

      {loading && (
        <section aria-label="시 생성 중" className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 border-4 border-white border-t-transparent rounded-full animate-spin" />
          <p>시를 쓰는 중이에요…</p>
        </section>
      )}

      {poem && !loading && (
        <section aria-label="생성된 시">
          <h2 className="sr-only">AI가 생성한 시</h2>
          <PoemDisplay poem={poem} />
        </section>
      )}

      {/* 페이지 하단 설명 */}
      {!poem && !loading && (
        <section className="text-center max-w-md px-4">
          <h2 className="text-xl mb-4 font-serif">AI가 당신의 사진을 시로 만들어드립니다</h2>
          <p className="text-gray-300 text-sm leading-relaxed">
            사진 한 장을 찍으면 인공지능이 그 순간의 감정과 분위기를 담아 아름다운 한국어 시를
            창작해드립니다. 완전 무료로 이용하고 SNS에 공유해보세요.
          </p>
          <div className="mt-6 text-xs text-gray-400">
            <p>🤖 Claude AI 기반 시 생성</p>
            <p>📸 실시간 카메라 지원</p>
            <p>🔗 SNS 공유 기능</p>
          </div>
        </section>
      )}
    </main>
  );
}
