"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PoemDisplay from "@/components/PoemDisplay";

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

  if (!poem || !image) {
    return null;
  }

  return (
    <main className="relative flex flex-col items-center justify-center w-screen h-screen text-white bg-black font-sans overflow-hidden">
      <h1 className="sr-only">포엣캠 결과 페이지</h1>
      <div className="flex flex-col items-center gap-6">
        <img src={image} alt="촬영한 사진" className="max-w-full max-h-60 object-cover rounded" />
        <PoemDisplay poem={poem} />
        <button
          onClick={handleRestart}
          className="mt-4 bg-gray-700 text-white px-4 py-2 rounded-full shadow hover:bg-gray-600 transition-colors"
          aria-label="새로운 사진으로 다시 시작하기">
          다시 찍기
        </button>
      </div>
    </main>
  );
}

