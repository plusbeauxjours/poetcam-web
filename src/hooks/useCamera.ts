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
  const [isRetrying, setIsRetrying] = useState(false);
  const [permissionRequested, setPermissionRequested] = useState(true);

  const [cameraConstraints, setCameraConstraints] = useState<MediaTrackConstraints>({
    width: { ideal: CAMERA_CONFIG.idealWidth },
    height: { ideal: CAMERA_CONFIG.idealHeight },
    facingMode: { ideal: "environment" },
  });

  const stopCamera = useCallback(() => {
    const stream = webcamRef.current?.stream;
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    setIsReady(false);
    setError(null);
  }, []);

  const handleUserMedia = useCallback(() => {
    setIsReady(true);
    setError(null);
  }, []);

  const handleUserMediaError = useCallback((err: string | DOMException) => {
    console.error("Camera access failed:", err);
    let errorType: CameraErrorType = "unknown";
    let message = "카메라에 접근할 수 없습니다.";

    if (err instanceof DOMException) {
      if (err.name === "NotAllowedError" || err.name === "PermissionDeniedError") {
        errorType = "not-allowed";
        message = "카메라 권한이 거부되었습니다.";
      } else if (
        err.name === "NotFoundError" ||
        err.name === "DevicesNotFoundError" ||
        err.name === "OverconstrainedError"
      ) {
        errorType = "not-found";
        message = "카메라를 찾을 수 없습니다.";
        // environment 카메라가 없으면 전면 카메라로 재시도
        setCameraConstraints({
          width: { ideal: CAMERA_CONFIG.idealWidth },
          height: { ideal: CAMERA_CONFIG.idealHeight },
          facingMode: { ideal: "user" },
        });
        setIsRetrying(true);
        setPermissionRequested(false);
        setTimeout(() => {
          setPermissionRequested(true);
          setIsRetrying(false);
        }, 100);
        return;
      }
    } else if (typeof err === "string") {
      if (err.includes("Permission denied") || err.includes("Not allowed")) {
        errorType = "not-allowed";
        message = "카메라 권한이 거부되었습니다.";
      } else if (err.includes("Not found") || err.includes("No device")) {
        errorType = "not-found";
        message = "카메라를 찾을 수 없습니다.";
      }
    }

    setError({ type: errorType, message });
    setIsReady(false);
  }, []);

  const requestPermission = useCallback(() => {
    setPermissionRequested(true);
  }, []);

  const retryCamera = useCallback(() => {
    stopCamera();
    setIsRetrying(true);
    setError(null);
    setCameraConstraints({
      width: { ideal: CAMERA_CONFIG.idealWidth },
      height: { ideal: CAMERA_CONFIG.idealHeight },
      facingMode: { ideal: "user" },
    });
    setPermissionRequested(false);
    setTimeout(() => {
      setPermissionRequested(true);
      setIsRetrying(false);
    }, 100);
  }, [stopCamera]);

  return {
    webcamRef,
    cameraConstraints,
    isReady,
    error,
    isRetrying,
    permissionRequested,
    stopCamera,
    retryCamera,
    requestPermission,
    handleUserMedia,
    handleUserMediaError,
  };
}
