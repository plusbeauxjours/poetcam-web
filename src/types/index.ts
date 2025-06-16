// 공통 타입 정의
export type CameraErrorMessage =
  typeof import("../constants").ERROR_MESSAGES.camera[keyof typeof import("../constants").ERROR_MESSAGES.camera];

export interface CameraError {
  type: "not-found" | "not-allowed" | "unknown";
  message: CameraErrorMessage;
}

export interface PoemGenerationResult {
  poem: string;
  error?: string;
}

export interface CameraCaptureProps {
  onCapture: (image: string) => void;
}

export interface PoemDisplayProps {
  poem: string;
}

// API 응답 타입
export interface GeneratePoemResponse {
  poem?: string;
  error?: string;
}

// 구조화된 데이터 타입
export interface PoemStructuredData {
  "@context": string;
  "@type": string;
  name: string;
  text: string;
  author: {
    "@type": string;
    name: string;
  };
  dateCreated: string;
  genre: string;
  inLanguage: string;
  creativeWorkStatus: string;
}
