// 앱 관련 상수
export const APP_CONFIG = {
  name: "포엣캠",
  description: "사진 한 장으로 감성적인 한국어 시를 만들어보세요",
  url: "https://poetcam.vercel.app",
  twitterHandle: "@poetcam",
} as const;

// 카메라 설정
export const CAMERA_CONFIG = {
  idealWidth: 1280,
  idealHeight: 720,
  imageQuality: 0.8,
  imageFormat: "image/jpeg",
} as const;

// 애니메이션 설정
export const ANIMATION_CONFIG = {
  poemLineDelay: 700,
  buttonFeedbackDelay: 2000,
} as const;

// Claude API 설정
export const CLAUDE_CONFIG = {
  model: "claude-3-sonnet-20240229",
  maxTokens: 300,
  systemPrompt: `당신은 세계적인 시인이며, 이미지에서 느껴지는 감정과 분위기를 섬세하고 시적으로 표현하는 데 탁월합니다. 
아래 이미지를 천천히 관찰하세요. 이미지에 담긴 분위기, 색감, 구도, 시간대, 등장 인물 또는 사물의 의미를 깊이 있게 느끼고, 
그 감정을 바탕으로 **짧고 아름다운 자유시**를 지어주세요.
- 시는 너무 직접적이지 않고, 은유와 상징을 포함합니다.
- 최대 5행으로, 압축적이고 감성적인 언어를 사용하세요.
- 독자가 사진 속에 들어가 있는 듯한 몰입감을 주는 표현이면 좋습니다.
- 시의 끝에는 마침표를 쓰지 마세요 (의도적으로 여운을 남기기 위함입니다).`,
} as const;

// 에러 메시지
export const ERROR_MESSAGES = {
  camera: {
    notFound: "카메라를 찾을 수 없습니다. 테스트 이미지를 사용합니다.",
    notAllowed: "카메라 권한이 거부되었습니다. 테스트 이미지를 사용합니다.",
    unknown: "카메라에 접근할 수 없습니다. 테스트 이미지를 사용합니다.",
    inUse: "카메라가 다른 애플리케이션에서 사용 중입니다. 테스트 이미지를 사용합니다.",
    constraintError: "요청한 카메라 설정을 지원하지 않습니다. 테스트 이미지를 사용합니다.",
    notSupported: "브라우저에서 카메라를 지원하지 않습니다. 테스트 이미지를 사용합니다.",
    aborted: "카메라 접근이 중단되었습니다. 테스트 이미지를 사용합니다.",
    httpsRequired: "HTTPS 환경에서만 카메라를 사용할 수 있습니다. 테스트 이미지를 사용합니다.",
    apiNotSupported: "브라우저에서 카메라 API를 지원하지 않습니다. 테스트 이미지를 사용합니다.",
  },
  image: {
    invalidBase64: "Invalid base64 data",
    tooSmall: "Image data too small",
    captureFailure: "이미지 캡처에 실패했습니다. 다시 시도해주세요.",
    testImageLoadFailure: "테스트 이미지를 로드할 수 없습니다.",
  },
  api: {
    imageRequired: "Image is required",
    poemGenerationFailed: "Failed to generate poem",
    serverError: "Server error",
  },
} as const;

// 공유 관련
export const SHARE_CONFIG = {
  hashtags: ["포엣캠", "AI시", "사진시", "감성시"],
  twitterBaseUrl: "https://twitter.com/intent/tweet",
} as const;
