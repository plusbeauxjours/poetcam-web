import { useCallback, useState } from "react";
import Webcam from "react-webcam";

/**
 * React Webcam을 이용하여 카메라 권한을 요청하는 훅
 */
export function useWebcamPermission() {
  const [hasPermission, setHasPermission] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const handleUserMedia = useCallback(() => {
    setHasPermission(true);
    setError(null);
  }, []);

  const handleUserMediaError = useCallback((err: unknown) => {
    console.error("Camera access denied", err);
    setHasPermission(false);
    setError(err instanceof Error ? err : new Error("Camera access denied"));
  }, []);

  const webcamElement = (
    <Webcam
      audio={false}
      style={{ display: "none" }}
      onUserMedia={handleUserMedia}
      onUserMediaError={handleUserMediaError}
    />
  );

  return { hasPermission, error, webcamElement };
}
