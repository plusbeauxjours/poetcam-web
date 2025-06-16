import { useEffect, useRef, useState, useCallback } from "react";
import { CameraError } from "@/types";
import { CAMERA_CONFIG, ERROR_MESSAGES } from "@/constants";

/**
 * 카메라 접근 및 관리를 위한 커스텀 훅
 */
export function useCamera() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<CameraError | null>(null);
  const [useTestImage, setUseTestImage] = useState(false);
  const [isRetrying, setIsRetrying] = useState(false);
  const [permissionRequested, setPermissionRequested] = useState(false);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsReady(false);
    setError(null);
    setUseTestImage(false);
  }, []);

  const handleCameraError = useCallback((err: unknown) => {
    console.error("Camera error details:", err);

    if (err instanceof Error) {
      let errorType: CameraError["type"] = "unknown";
      let message: string = ERROR_MESSAGES.camera.unknown;

      switch (err.name) {
        case "NotFoundError":
        case "DevicesNotFoundError":
          errorType = "not-found";
          message = ERROR_MESSAGES.camera.notFound;
          break;
        case "NotAllowedError":
        case "PermissionDeniedError":
          errorType = "not-allowed";
          message = ERROR_MESSAGES.camera.notAllowed;
          break;
        case "NotReadableError":
        case "TrackStartError":
          errorType = "unknown";
          message = ERROR_MESSAGES.camera.inUse;
          break;
        case "OverconstrainedError":
        case "ConstraintNotSatisfiedError":
          errorType = "unknown";
          message = ERROR_MESSAGES.camera.constraintError;
          break;
        case "NotSupportedError":
          errorType = "unknown";
          message = ERROR_MESSAGES.camera.notSupported;
          break;
        case "AbortError":
          errorType = "unknown";
          message = ERROR_MESSAGES.camera.aborted;
          break;
        default:
          errorType = "unknown";
          message = `카메라 오류 (${err.name}): 테스트 이미지를 사용합니다.`;
      }

      setError({ type: errorType, message });
      setUseTestImage(true);
      setIsReady(true);
    }
  }, []);

  const initCamera = useCallback(
    async (constraints?: MediaStreamConstraints) => {
      try {
        setIsRetrying(false);
        setError(null);

        // 기본 제약 조건
        const defaultConstraints: MediaStreamConstraints = {
          video: {
            width: { ideal: CAMERA_CONFIG.idealWidth },
            height: { ideal: CAMERA_CONFIG.idealHeight },
            facingMode: "environment", // 후면 카메라 우선 (모바일에서)
          },
        };

        // 사용자 정의 제약 조건 또는 기본값 사용
        const finalConstraints = constraints || defaultConstraints;

        console.log("Requesting camera access with constraints:", finalConstraints);

        const stream = await navigator.mediaDevices.getUserMedia(finalConstraints);

        if (videoRef.current && stream) {
          videoRef.current.srcObject = stream;
          streamRef.current = stream;

          // 비디오 메타데이터 로드 대기
          const handleLoadedMetadata = () => {
            console.log(
              "Camera ready, video dimensions:",
              videoRef.current?.videoWidth,
              "x",
              videoRef.current?.videoHeight
            );
            setIsReady(true);
            setError(null);
            setUseTestImage(false);
          };

          videoRef.current.onloadedmetadata = handleLoadedMetadata;

          // 비디오 재생 시작
          try {
            await videoRef.current.play();
          } catch (playError) {
            console.warn("Video play failed, but continuing:", playError);
            // 재생 실패해도 계속 진행 (일부 브라우저에서는 정상)
          }
        }
      } catch (err) {
        console.error("Camera initialization failed:", err);

        // 첫 번째 시도가 실패하면 더 관대한 설정으로 재시도
        if (
          !constraints &&
          err instanceof Error &&
          (err.name === "OverconstrainedError" || err.name === "ConstraintNotSatisfiedError")
        ) {
          console.log("Retrying with relaxed constraints...");
          setIsRetrying(true);

          const relaxedConstraints: MediaStreamConstraints = {
            video: true, // 가장 기본적인 설정
          };

          return initCamera(relaxedConstraints);
        }

        handleCameraError(err);
      }
    },
    [handleCameraError]
  );

  const retryCamera = useCallback(() => {
    stopCamera();
    setError(null);
    setUseTestImage(false);
    initCamera();
  }, [stopCamera, initCamera]);

  const requestPermission = useCallback(async () => {
    console.log("Requesting camera permission...");
    setPermissionRequested(true);

    // 잠시 기다린 후 카메라 초기화 시작
    setTimeout(() => {
      initCamera();
    }, 100);
  }, [initCamera]);

  useEffect(() => {
    // 자동으로 권한 요청하지 않고 사용자 액션 기다림
    console.log("Camera hook initialized, waiting for user permission request");
  }, []);

  // 권한이 요청된 후에만 카메라 관련 체크 수행
  useEffect(() => {
    if (!permissionRequested) {
      return;
    }

    // getUserMedia API 지원 확인
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      console.error("getUserMedia is not supported");
      setError({
        type: "unknown",
        message: ERROR_MESSAGES.camera.apiNotSupported,
      });
      setUseTestImage(true);
      setIsReady(true);
      return;
    }

    // 개발 환경에서는 HTTP에서도 카메라 접근 허용
    const isProduction = process.env.NODE_ENV === "production";
    if (
      typeof window !== "undefined" &&
      isProduction &&
      window.location.protocol === "http:"
    ) {
      console.warn("Camera requires HTTPS in production");
      setError({
        type: "not-allowed",
        message: ERROR_MESSAGES.camera.httpsRequired,
      });
      setUseTestImage(true);
      setIsReady(true);
      return;
    }

    // 이미 initCamera가 requestPermission에서 호출되므로 여기서는 호출하지 않음
    return () => {
      stopCamera();
    };
  }, [permissionRequested, stopCamera]);

  return {
    videoRef,
    isReady,
    error,
    useTestImage,
    isRetrying,
    permissionRequested,
    stopCamera,
    retryCamera,
    requestPermission,
  };
}
