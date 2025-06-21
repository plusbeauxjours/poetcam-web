"use client";

import { useEffect, useRef, useState } from "react";
import { CameraCaptureProps } from "@/types";
import { CAMERA_CONFIG } from "@/constants";

export default function NativeCameraCapture({ onCapture }: CameraCaptureProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [permissionRequested, setPermissionRequested] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!permissionRequested) return;

    async function startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: CAMERA_CONFIG.idealWidth },
            height: { ideal: CAMERA_CONFIG.idealHeight },
            facingMode: { ideal: "environment" },
          },
        });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setIsReady(true);
      } catch (err) {
        setError(err as Error);
      }
    }

    startCamera();

    return () => {
      streamRef.current?.getTracks().forEach((t) => t.stop());
    };
  }, [permissionRequested]);

  const handleCapture = (): void => {
    const video = videoRef.current;
    if (!video) return;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const data = canvas.toDataURL(
      CAMERA_CONFIG.imageFormat,
      CAMERA_CONFIG.imageQuality,
    );
    onCapture(data);
  };

  if (!permissionRequested) {
    return (
      <div className="flex flex-col items-center gap-4 p-4">
        <p className="text-sm text-center">카메라 사용을 위해 권한이 필요합니다.</p>
        <button
          onClick={() => setPermissionRequested(true)}
          className="bg-white text-black px-6 py-2 rounded-full shadow-md font-semibold hover:bg-gray-100 transition-colors"
          aria-label="카메라 권한 요청"
        >
          카메라 권한 요청
        </button>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center gap-4 p-4">
        <div className="text-red-500 text-center max-w-md" role="alert">
          <p className="mb-3">{error.message}</p>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
          aria-label="페이지 새로고침"
        >
          새로고침
        </button>
      </div>
    );
  }

  return (
    <div className="relative w-screen h-full max-w-screen max-h-screen overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="w-full h-full object-cover"
      />
      <button
        onClick={handleCapture}
        disabled={!isReady}
        className={`absolute bottom-6 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full border-4 transition-colors ${
          isReady
            ? "bg-red-500 border-white"
            : "bg-gray-500 border-gray-300 opacity-50 cursor-not-allowed"
        }`}
        aria-label={isReady ? "사진 찍어서 시 생성하기" : "카메라 로딩 중"}
      />
    </div>
  );
}
