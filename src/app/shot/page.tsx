"use client";

import { useState } from "react";
import CameraCapture from "@/components/CameraCapture";
import PoemDisplay from "@/components/PoemDisplay";
import FontCycleText from "@/components/FontCycleText";
import { generatePoem } from "@/lib/generatePoem";

type AppState = "camera" | "loading" | "poem";

export default function Home() {
  const [poem, setPoem] = useState<string>("");
  const [appState, setAppState] = useState<AppState>("camera");

  const handleImageCapture = async (image: string): Promise<void> => {
    try {
      setAppState("loading");
      const generatedPoem = await generatePoem(image);
      setPoem(generatedPoem);
      setAppState("poem");
    } catch (error) {
      console.error("Failed to generate poem:", error);
      // 에러 발생 시 카메라 상태로 돌아가기
      setAppState("camera");
      // TODO: 사용자에게 에러 메시지 표시하는 기능 추가
    }
  };

  const resetToCamera = (): void => {
    setPoem("");
    setAppState("camera");
  };

  return (
    <main className="relative flex flex-col items-center justify-center w-screen h-screen text-white bg-black font-sans overflow-hidden">
      {/* SEO용 숨겨진 헤딩 */}
      <h1 className="sr-only">포엣캠 - AI가 사진을 보고 시를 써주는 서비스</h1>

      {appState === "camera" && (
        <section aria-label="사진 촬영 섹션">
          <h2 className="sr-only">사진을 촬영하여 AI 시 생성하기</h2>
          <CameraCapture onCapture={handleImageCapture} />
        </section>
      )}

      {appState === "loading" && (
        <section aria-label="시 생성 중" className="flex flex-col items-center gap-4">
          <div
            className="h-8 w-8 border-4 border-white border-t-transparent rounded-full animate-spin"
            role="status"
            aria-label="로딩 중"
          />
          <p>시를 쓰는 중이에요…</p>
        </section>
      )}

      {appState === "poem" && poem && (
        <section aria-label="생성된 시">
          <h2 className="sr-only">AI가 생성한 시</h2>
          <div className="flex flex-col items-center gap-6">
            <PoemDisplay poem={poem} />
            <button
              onClick={resetToCamera}
              className="mt-4 bg-gray-700 text-white px-4 py-2 rounded-full shadow hover:bg-gray-600 transition-colors"
              aria-label="새로운 사진으로 다시 시작하기">
              다시 찍기
            </button>
          </div>
        </section>
      )}

      {/* 페이지 하단 설명 */}
      {appState === "camera" && (
        <section className="absolute bottom-4 left-0 right-0 text-center px-4">
          <h2 className="text-xl mb-2">
            <FontCycleText text="AI가 당신의 사진을 시로 만들어드립니다." />
          </h2>
          <p className="text-gray-300 text-xs leading-relaxed">
            사진 한 장을 찍으면 인공지능이 그 순간의 감정과 분위기를 담아 아름다운 한국어 시를
            창작해드립니다. 완전 무료로 이용하고 SNS에 공유해보세요.
          </p>
          <div className="mt-4 text-xs text-gray-400">
            <p>🤖 Claude AI 기반 시 생성</p>
            <p>📸 실시간 카메라 지원</p>
            <p>🔗 SNS 공유 기능</p>
          </div>
        </section>
      )}
    </main>
  );
}
