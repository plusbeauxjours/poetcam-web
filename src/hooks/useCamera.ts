import { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";
import { CameraError, CameraErrorType } from "@/types";
import { CAMERA_CONFIG } from "@/constants";

/**
 * react-webcam을 사용한 카메라 접근 훅
 */
export function useCamera() {
  const webcamRef = useRef<Webcam>(null);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<CameraError | null>(null);
  const [useTestImage, setUseTestImage] = useState(false);
  const [isRetrying, setIsRetrying] = useState(false);
  const [permissionRequested, setPermissionRequested] = useState(false);

  const videoConstraints: MediaTrackConstraints = {
    width: { ideal: CAMERA_CONFIG.idealWidth },
    height: { ideal: CAMERA_CONFIG.idealHeight },
    facingMode: "environment",
  };

  const stopCamera = useCallback(() => {
    const stream = webcamRef.current?.stream;
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    setIsReady(false);
    setError(null);
    setUseTestImage(false);
  }, []);

  const handleUserMedia = useCallback(() => {
    setIsReady(true);
    setError(null);
    setUseTestImage(false);
  }, []);

  const handleUserMediaError = useCallback((err: string | DOMException) => {
    console.error("Camera access failed:", err);
    let errorType: CameraErrorType = "unknown";
    let message = "카메라에 접근할 수 없습니다. 테스트 이미지를 사용합니다.";

    if (err instanceof DOMException) {
      if (err.name === "NotAllowedError" || err.name === "PermissionDeniedError") {
        errorType = "not-allowed";
        message = "카메라 권한이 거부되었습니다. 테스트 이미지를 사용합니다.";
      } else if (err.name === "NotFoundError" || err.name === "DevicesNotFoundError") {
        errorType = "not-found";
        message = "카메라를 찾을 수 없습니다. 테스트 이미지를 사용합니다.";
      }
    } else if (typeof err === "string") {
      if (err.includes("Permission denied") || err.includes("Not allowed")) {
        errorType = "not-allowed";
        message = "카메라 권한이 거부되었습니다. 테스트 이미지를 사용합니다.";
      } else if (err.includes("Not found") || err.includes("No device")) {
        errorType = "not-found";
        message = "카메라를 찾을 수 없습니다. 테스트 이미지를 사용합니다.";
      }
    }

    setError({ type: errorType, message });
    setUseTestImage(true);
    setIsReady(true);
  }, []);

  const requestPermission = useCallback(() => {
    setPermissionRequested(true);
  }, []);

  const retryCamera = useCallback(() => {
    stopCamera();
    setIsRetrying(false);
    setError(null);
    setUseTestImage(false);
    setPermissionRequested(false);
    setTimeout(() => setPermissionRequested(true), 100);
  }, [stopCamera]);

  return {
    webcamRef,
    videoConstraints,
    isReady,
    error,
    useTestImage,
    isRetrying,
    permissionRequested,
    stopCamera,
    retryCamera,
    requestPermission,
    handleUserMedia,
    handleUserMediaError,
  };
}
