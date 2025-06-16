"use client";

import Image from "next/image";
import { useEffect } from "react";
import { CameraCaptureProps } from "@/types";
import { useCamera } from "@/hooks/useCamera";
import { useWebcamPermission } from "@/hooks/useWebcamPermission";
import { imageToBase64, captureVideoFrame } from "@/utils/image";
import { CAMERA_CONFIG } from "@/constants";

export default function CameraCapture({ onCapture }: CameraCaptureProps) {
  const {
    videoRef,
    isReady,
    error,
    useTestImage,
    isRetrying,
    permissionRequested,
    retryCamera,
    requestPermission,
    initCamera,
  } = useCamera();

  const { hasPermission, webcamElement, error: permissionError } =
    useWebcamPermission();

  useEffect(() => {
    if (permissionRequested && hasPermission) {
      initCamera();
    }
  }, [permissionRequested, hasPermission, initCamera]);

  const handleTestImageCapture = async (): Promise<void> => {
    try {
      const testImageData = await imageToBase64("/testshot.png", CAMERA_CONFIG.imageQuality);
      console.log("Using test image, data length:", testImageData.length);
      onCapture(testImageData);
    } catch (err) {
      console.error("Failed to load test image:", err);
    }
  };

  const handleCameraCapture = (): void => {
    const video = videoRef.current;
    if (!video || !isReady) {
      console.error("Video not ready for capture");
      return;
    }

    const imageData = captureVideoFrame(video, CAMERA_CONFIG.imageQuality);

    if (imageData) {
      console.log("Captured image data length:", imageData.length);
      onCapture(imageData);
    } else {
      console.error("Failed to capture image from video");
    }
  };

  const handleCapture = (): void => {
    if (useTestImage) {
      handleTestImageCapture();
    } else {
      handleCameraCapture();
    }
  };

  // Chrome 브라우저 감지
  const isChrome =
    typeof window !== "undefined" &&
    /Chrome/.test(navigator.userAgent) &&
    /Google Inc/.test(navigator.vendor);

  if (!permissionRequested) {
    return (
      <div className="flex flex-col items-center gap-4 p-4">
        <p className="text-sm text-center">카메라 사용을 위해 권한이 필요합니다.</p>
        <button
          onClick={requestPermission}
          className="bg-white text-black px-6 py-2 rounded-full shadow-md font-semibold hover:bg-gray-100 transition-colors"
          aria-label="카메라 권한 요청">
          카메라 권한 요청
        </button>
      </div>
    );
  }

  if (permissionRequested && !hasPermission) {
    return (
      <div className="flex flex-col items-center gap-4 p-4">
        {webcamElement}
        <p className="text-sm text-center">브라우저에서 카메라 권한을 허용해주세요.</p>
        {permissionError && (
          <p className="text-red-500 text-sm">{permissionError.message}</p>
        )}
      </div>
    );
  }

  // 테스트 이미지 모드 렌더링
  if (useTestImage) {
    return (
      <div className="flex flex-col items-center gap-4">
        <div className="rounded-lg shadow-md overflow-hidden">
          <Image
            src="/testshot.png"
            alt="Test image for poem generation"
            width={400}
            height={300}
            className="max-w-full h-auto"
            style={{ maxHeight: "400px" }}
            priority
          />
        </div>

        {error && (
          <div className="text-yellow-600 text-center text-sm max-w-md" role="alert">
            <p className="mb-2">{error.message}</p>

            {/* Chrome 사용자를 위한 특별 안내 */}
            {isChrome && error.type === "not-allowed" && (
              <div className="text-xs text-gray-400 mt-3 p-3 bg-gray-800 rounded">
                <p className="font-semibold mb-2">🔧 Chrome에서 카메라 허용하기:</p>
                <ol className="text-left space-y-1 list-decimal list-inside">
                  <li>주소창 왼쪽의 🔒 아이콘 클릭</li>
                  <li>&ldquo;카메라&rdquo; 권한을 &ldquo;허용&rdquo;으로 변경</li>
                  <li>페이지 새로고침</li>
                </ol>
              </div>
            )}

            {error.type !== "not-allowed" && (
              <button
                onClick={retryCamera}
                className="mt-2 bg-gray-600 text-white px-3 py-1 rounded text-xs hover:bg-gray-500 transition-colors"
                disabled={isRetrying}>
                {isRetrying ? "재시도 중..." : "카메라 다시 시도"}
              </button>
            )}
          </div>
        )}

        <button
          onClick={handleCapture}
          className="bg-white text-black px-6 py-2 rounded-full shadow-md font-semibold hover:bg-gray-100 transition-colors"
          aria-label="테스트 이미지로 시 생성하기">
          테스트 이미지로 시 생성하기
        </button>
      </div>
    );
  }

  // 카메라 에러 렌더링 (테스트 이미지 사용하지 않는 경우)
  if (error && !useTestImage) {
    return (
      <div className="flex flex-col items-center gap-4 p-4">
        <div className="text-red-500 text-center max-w-md" role="alert">
          <p className="mb-3">{error.message}</p>

          {/* Chrome 사용자를 위한 상세 안내 */}
          {isChrome && (
            <div className="text-sm text-gray-300 bg-gray-800 p-4 rounded mb-4">
              <p className="font-semibold mb-2">Chrome 브라우저 설정:</p>
              <ul className="text-left space-y-1 text-xs">
                <li>• 주소창에서 카메라 아이콘 확인</li>
                <li>• 설정 → 개인정보 및 보안 → 사이트 설정 → 카메라</li>
                <li>• 이 사이트에 카메라 권한 허용</li>
              </ul>
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <button
            onClick={retryCamera}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            disabled={isRetrying}
            aria-label="카메라 접근 재시도">
            {isRetrying ? "재시도 중..." : "다시 시도"}
          </button>
          <button
            onClick={() => window.location.reload()}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
            aria-label="페이지 새로고침">
            새로고침
          </button>
        </div>
      </div>
    );
  }

  // 일반 카메라 모드 렌더링
  return (
    <div className="flex flex-col items-center gap-4">
      {isRetrying && (
        <div className="text-yellow-400 text-sm text-center">
          <p>더 호환성 좋은 설정으로 카메라에 다시 접근하는 중...</p>
        </div>
      )}

      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="rounded-lg shadow-md"
        style={{ maxWidth: "100%", height: "auto" }}
        aria-label="카메라 미리보기"
      />

      <button
        onClick={handleCapture}
        disabled={!isReady}
        className={`px-6 py-2 rounded-full shadow-md font-semibold transition-colors ${
          isReady
            ? "bg-white text-black hover:bg-gray-100"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
        aria-label={isReady ? "사진 찍어서 시 생성하기" : "카메라 로딩 중"}>
        {isReady ? "사진 찍기" : "카메라 로딩 중..."}
      </button>

      {/* Chrome 사용자를 위한 하단 팁 */}
      {isChrome && isReady && (
        <div className="text-xs text-gray-400 text-center max-w-xs">
          💡 Chrome에서 카메라가 작동하지 않으면 주소창의 카메라 아이콘을 확인해보세요
        </div>
      )}
    </div>
  );
}
