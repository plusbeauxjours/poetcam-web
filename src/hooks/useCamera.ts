import { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";
import { CameraError } from "@/types";
import { CAMERA_CONFIG, ERROR_MESSAGES } from "@/constants";

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

  const handleUserMediaError = useCallback((err: Error) => {
    console.error("Camera access failed:", err);
    let errorType: CameraError["type"] = "unknown";
    let message = ERROR_MESSAGES.camera.unknown;

    if (err.name === "NotAllowedError" || err.name === "PermissionDeniedError") {
      errorType = "not-allowed";
      message = ERROR_MESSAGES.camera.notAllowed;
    } else if (err.name === "NotFoundError" || err.name === "DevicesNotFoundError") {
      errorType = "not-found";
      message = ERROR_MESSAGES.camera.notFound;
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
