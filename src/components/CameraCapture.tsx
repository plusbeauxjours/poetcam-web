"use client";

import Webcam from "react-webcam";
import { CameraCaptureProps } from "@/types";
import { useCamera } from "@/hooks/useCamera";
import { CAMERA_CONFIG } from "@/constants";

export default function CameraCapture({ onCapture }: CameraCaptureProps) {
  const {
    webcamRef,
    isReady,
    error,
    isRetrying,
    permissionRequested,
    retryCamera,
    requestPermission,
    handleUserMedia,
    handleUserMediaError,
  } = useCamera();

  const handleCameraCapture = (): void => {
    if (!webcamRef.current || !isReady) {
      console.error("Webcam not ready for capture");
      return;
    }

    const imageData = webcamRef.current.getScreenshot();

    if (imageData) {
      console.log("Captured image data length:", imageData.length);
      onCapture(imageData);
    } else {
      console.error("Failed to capture image from webcam");
    }
  };

  const handleCapture = (): void => {
    handleCameraCapture();
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

  // 카메라 에러 렌더링
  if (error) {
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
    <div className="relative w-screen h-full max-w-screen max-h-screen overflow-hidden">
      {isRetrying && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 text-yellow-400 text-sm text-center z-10">
          <p>더 호환성 좋은 설정으로 카메라에 다시 접근하는 중...</p>
        </div>
      )}

      <Webcam
        ref={webcamRef}
        audio={false}
        muted
        playsInline
        screenshotFormat={CAMERA_CONFIG.imageFormat}
        screenshotQuality={CAMERA_CONFIG.imageQuality}
        onUserMedia={handleUserMedia}
        onUserMediaError={handleUserMediaError}
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

      {/* Chrome 사용자를 위한 하단 팁 */}
      {isChrome && isReady && (
        <div className="absolute top-4 right-4 text-xs text-gray-400 text-right max-w-xs z-10">
          💡 Chrome에서 카메라가 작동하지 않으면 주소창의 카메라 아이콘을 확인해보세요
        </div>
      )}
    </div>
  );
}
