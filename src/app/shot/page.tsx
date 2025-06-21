"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import NativeCameraCapture from "@/components/NativeCameraCapture";
import FontCycleText from "@/components/FontCycleText";
import { generatePoem } from "@/lib/generatePoem";
type AppState = "camera" | "loading";

export default function Home() {
  const router = useRouter();
  const [appState, setAppState] = useState<AppState>("camera");

  useEffect(() => {
    const step = sessionStorage.getItem("flowStep");
    if (step !== "shot") {
      router.replace("/");
    }
  }, [router]);

  const handleImageCapture = async (image: string): Promise<void> => {
    try {
      setAppState("loading");
      const generatedPoem = await generatePoem(image);
      sessionStorage.setItem("poem", generatedPoem);
      sessionStorage.setItem("image", image);
      sessionStorage.setItem("flowStep", "result");
      router.push("/result");
    } catch (error) {
      console.error("Failed to generate poem:", error);
      setAppState("camera");
    }
  };

  return (
    <main className="relative flex flex-col items-center justify-center w-screen h-screen text-white bg-black font-sans overflow-hidden">
      <h1 className="sr-only">포엣캠 - AI가 사진을 보고 시를 써주는 서비스</h1>
      {appState === "camera" && (
        <section aria-label="사진 촬영 섹션">
          <h2 className="sr-only">사진을 촬영하여 AI 시 생성하기</h2>
          <NativeCameraCapture onCapture={handleImageCapture} />
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
    </main>
  );
}
