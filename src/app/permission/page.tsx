"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import FontCycleText from "@/components/FontCycleText";

export default function PermissionPage() {
  const router = useRouter();
  const [checked, setChecked] = useState(false);
  const [granted, setGranted] = useState(false);

  useEffect(() => {
    const step = sessionStorage.getItem("flowStep");
    const loggedIn = sessionStorage.getItem("loggedIn") === "true";
    if (step !== "permission" || !loggedIn) {
      router.replace("/");
      return;
    }

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
  }, [router]);

  useEffect(() => {
    if (checked && granted) {
      sessionStorage.setItem("flowStep", "shot");
      sessionStorage.removeItem("poem");
      sessionStorage.removeItem("image");
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
