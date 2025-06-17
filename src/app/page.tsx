"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import FontCycleText from "@/components/FontCycleText";

export default function Home() {
  const router = useRouter();
  const [checked, setChecked] = useState(false);
  const [granted, setGranted] = useState(false);

  useEffect(() => {
    async function checkPermission() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        stream.getTracks().forEach((t) => t.stop());
        setGranted(true);
      } catch (err) {
        setGranted(false);
      } finally {
        setChecked(true);
      }
    }
    checkPermission();
  }, []);

  useEffect(() => {
    if (checked && granted) {
      // 페이지 플로우 진행 상태 저장
      if (typeof sessionStorage !== "undefined") {
        sessionStorage.setItem("flowStep", "shot");
        sessionStorage.removeItem("poem");
        sessionStorage.removeItem("image");
      }
      router.replace("/shot");
    }
  }, [checked, granted, router]);

  return (
    <main className="flex flex-col items-center justify-center gap-6 min-h-screen bg-black text-white p-4">
      <h1 className="text-xl">
        <FontCycleText text="AI가 당신의 사진을 시로 만들어드립니다." />
      </h1>
      {checked && !granted ? (
        <p className="text-sm text-gray-300">설정탭에서 카메라 권한을 켜세요</p>
      ) : (
        <p>카메라 권한을 확인하는 중...</p>
      )}
    </main>
  );
}
