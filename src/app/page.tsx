"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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
      router.replace("/shot");
    }
  }, [checked, granted, router]);

  return (
    <main className="flex items-center justify-center min-h-screen bg-black text-white">
      {checked && !granted ? (
        <p>설정탭에서 카메라 권한을 켜세요</p>
      ) : (
        <p>카메라 권한을 확인하는 중...</p>
      )}
    </main>
  );
}
