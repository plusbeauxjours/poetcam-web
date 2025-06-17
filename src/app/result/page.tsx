"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PoemDisplay from "@/components/PoemDisplay";
import { Camera, Share2, Copy as CopyIcon } from "lucide-react";
import { copyToClipboard, shareViaWebAPI, showButtonFeedback } from "@/utils/share";
import { ANIMATION_CONFIG } from "@/constants";

export default function ResultPage() {
  const router = useRouter();
  const [poem, setPoem] = useState<string | null>(null);
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    const step = sessionStorage.getItem("flowStep");
    const storedPoem = sessionStorage.getItem("poem");
    const storedImage = sessionStorage.getItem("image");

    if (step !== "result" || !storedPoem || !storedImage) {
      router.replace("/");
      return;
    }

    setPoem(storedPoem);
    setImage(storedImage);
  }, [router]);

  const handleRestart = () => {
    sessionStorage.setItem("flowStep", "shot");
    sessionStorage.removeItem("poem");
    sessionStorage.removeItem("image");
    router.replace("/shot");
  };

  const handleShare = () => {
    if (poem) {
      shareViaWebAPI(poem);
    }
  };

  const handleCopy = async (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!poem) return;
    const button = event.currentTarget;
    const success = await copyToClipboard(poem);
    showButtonFeedback(
      button,
      success ? "복사 완료!" : "복사 실패",
      ANIMATION_CONFIG.buttonFeedbackDelay
    );
  };

  if (!poem || !image) {
    return null;
  }

  return (
    <main className="relative flex flex-col items-center justify-center w-screen h-screen text-white bg-black font-sans overflow-hidden">
      <h1 className="sr-only">포엣캠 결과 페이지</h1>
      <div className="flex flex-col items-center gap-6">
        <img src={image} alt="촬영한 사진" className="max-w-full max-h-60 object-cover rounded" />
        <PoemDisplay poem={poem} showButtons={false} />
        <nav className="flex gap-4 mt-4" aria-label="결과 조작 버튼">
          <button
            onClick={handleRestart}
            className="p-3 bg-gray-700 rounded-full hover:bg-gray-600"
            aria-label="다시 찍기">
            <Camera className="w-6 h-6" aria-hidden="true" />
          </button>
          <button
            onClick={handleShare}
            className="p-3 bg-gray-700 rounded-full hover:bg-gray-600"
            aria-label="카카오톡에 공유">
            <Share2 className="w-6 h-6" aria-hidden="true" />
          </button>
          <button
            onClick={handleCopy}
            className="p-3 bg-gray-700 rounded-full hover:bg-gray-600"
            aria-label="시 복사">
            <CopyIcon className="w-6 h-6" aria-hidden="true" />
          </button>
        </nav>
        <p className="text-sm mt-4">ⓒ 2025 plejourlabs</p>
      </div>
    </main>
  );
}
