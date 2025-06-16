"use client";
import { useEffect, useRef, useState } from "react";

interface Props {
  onCapture: (image: string) => void;
}

export default function CameraCapture({ onCapture }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [useTestImage, setUseTestImage] = useState(false);

  // 테스트 이미지를 base64로 변환하는 함수
  const loadTestImage = async (): Promise<string> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Failed to get canvas context"));
          return;
        }
        ctx.drawImage(img, 0, 0);
        const dataUrl = canvas.toDataURL("image/jpeg", 0.8);
        resolve(dataUrl);
      };
      img.onerror = () => reject(new Error("Failed to load test image"));
      img.src = "/testshot.png";
    });
  };

  useEffect(() => {
    async function init() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          streamRef.current = stream;

          // 비디오가 로드되면 준비 완료 상태로 설정
          videoRef.current.onloadedmetadata = () => {
            setIsReady(true);
            setError(null);
            setUseTestImage(false);
          };
        }
      } catch (err) {
        console.error("Camera access error:", err);
        if (err instanceof Error) {
          if (err.name === "NotFoundError") {
            setError("카메라를 찾을 수 없습니다. 테스트 이미지를 사용합니다.");
            setUseTestImage(true);
            setIsReady(true);
          } else if (err.name === "NotAllowedError") {
            setError("카메라 권한이 거부되었습니다. 테스트 이미지를 사용합니다.");
            setUseTestImage(true);
            setIsReady(true);
          } else {
            setError("카메라에 접근할 수 없습니다. 테스트 이미지를 사용합니다.");
            setUseTestImage(true);
            setIsReady(true);
          }
        }
      }
    }
    init();
    return () => {
      streamRef.current?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  async function handleCapture() {
    if (useTestImage) {
      try {
        const testImageData = await loadTestImage();
        console.log("Using test image, data length:", testImageData.length);
        onCapture(testImageData);
      } catch (err) {
        console.error("Failed to load test image:", err);
        setError("테스트 이미지를 로드할 수 없습니다.");
      }
      return;
    }

    const video = videoRef.current;
    if (!video || !isReady || video.videoWidth === 0 || video.videoHeight === 0) {
      console.error("Video not ready for capture");
      return;
    }

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      console.error("Failed to get canvas context");
      return;
    }

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const data = canvas.toDataURL("image/jpeg", 0.8);

    // base64 데이터 유효성 확인
    if (data && data.startsWith("data:image/") && data.includes("base64,")) {
      console.log("Captured image data length:", data.length);
      onCapture(data);
    } else {
      console.error("Invalid image data generated");
      setError("이미지 캡처에 실패했습니다. 다시 시도해주세요.");
    }
  }

  if (useTestImage) {
    return (
      <div className="flex flex-col items-center gap-4">
        <div className="rounded-lg shadow-md overflow-hidden">
          <img
            src="/testshot.png"
            alt="Test shot"
            className="max-w-full h-auto"
            style={{ maxHeight: "400px" }}
          />
        </div>
        {error && <div className="text-yellow-600 text-center text-sm">{error}</div>}
        <button
          onClick={handleCapture}
          className="bg-white text-black px-6 py-2 rounded-full shadow-md font-semibold hover:bg-gray-100">
          테스트 이미지로 시 생성하기
        </button>
      </div>
    );
  }

  if (error && !useTestImage) {
    return (
      <div className="flex flex-col items-center gap-4 p-4">
        <div className="text-red-500 text-center">{error}</div>
        <button
          onClick={() => window.location.reload()}
          className="bg-blue-500 text-white px-4 py-2 rounded">
          새로고침
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="rounded-lg shadow-md"
        style={{ maxWidth: "100%", height: "auto" }}
      />
      <button
        onClick={handleCapture}
        disabled={!isReady}
        className={`px-6 py-2 rounded-full shadow-md font-semibold ${
          isReady
            ? "bg-white text-black hover:bg-gray-100"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}>
        {isReady ? "사진 찍기" : "카메라 로딩 중..."}
      </button>
    </div>
  );
}
