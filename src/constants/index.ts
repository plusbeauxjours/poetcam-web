// 앱 관련 상수
export const APP_CONFIG = {
  name: "포엣캠",
  description: "사진 한 장으로 감성적인 한국어 시를 만들어보세요",
  url: "https://poetcam.plusbeauxjours.com",
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
아래 이미지를 천천히 관찰하세요.  
이미지에 담긴 분위기, 색감, 구도, 시간대, 등장 인물 또는 사물의 의미를 깊이 있게 느끼고,  
그 감정을 바탕으로 **짧고 아름다운 자유시**를 지어주세요.

**주의사항:**
- 반드시 **이미지에 실제로 존재하는 요소만을 기반으로 시를 작성**해 주세요.
- **추가적인 상상이나 픽션, 현실에 없는 요소는 포함하지 말아 주세요.**
- 예를 들어, 이미지에 인물이 없으면 인물에 대한 묘사는 하지 말고, 나무가 없으면 나무를 언급하지 마세요.
- **이미지에 보이는 것들을 섬세하고 은유적으로 표현하는 것만 허용**됩니다.

**스타일 가이드라인:**
- 시는 너무 직접적이지 않고, 은유와 상징을 포함합니다.
- 최대 5행으로, 압축적이고 감성적인 언어를 사용하세요.
- 독자가 사진 속에 들어가 있는 듯한 몰입감을 주는 표현이면 좋습니다.
- 시의 끝에는 마침표를 쓰지 마세요 (의도적으로 여운을 남기기 위함입니다).`,
} as const;

// 에러 메시지
export const ERROR_MESSAGES = {
  camera: {
    notFound: "카메라를 찾을 수 없습니다.",
    notAllowed: "카메라 권한이 거부되었습니다.",
    unknown: "카메라에 접근할 수 없습니다.",
    inUse: "카메라가 다른 애플리케이션에서 사용 중입니다.",
    constraintError: "요청한 카메라 설정을 지원하지 않습니다.",
    notSupported: "브라우저에서 카메라를 지원하지 않습니다.",
    aborted: "카메라 접근이 중단되었습니다.",
    httpsRequired: "HTTPS 환경에서만 카메라를 사용할 수 있습니다.",
    apiNotSupported: "브라우저에서 카메라 API를 지원하지 않습니다.",
  },
  image: {
    invalidBase64: "Invalid base64 data",
    tooSmall: "Image data too small",
    captureFailure: "이미지 캡처에 실패했습니다. 다시 시도해주세요.",
  },
  api: {
    imageRequired: "Image is required",
    poemGenerationFailed: "Failed to generate poem",
    serverError: "Server error",
  },
} as const;

// 공유 관련
export const SHARE_CONFIG = {
  hashtags: ["poetcam", "포엣캠", "plejourlabs", "AI시"],
  twitterBaseUrl: "https://twitter.com/intent/tweet",
  facebookBaseUrl: "https://www.facebook.com/sharer/sharer.php",
} as const;

export const FONT_CONFIG = {
  fonts: [
    // 기본 시스템 폰트
    "serif",
    "sans-serif",
    "monospace",
    "cursive",
    "fantasy",

    // 한글 폰트
    "Noto Serif KR",
    "Noto Sans KR",
    "Nanum Myeongjo",
    "Nanum Gothic",
    "Nanum Pen Script",
    "Gaegu",
    "Dongle",
    "Poor Story",
    "Sunflower",
    "Single Day",
    "Gowun Dodum",
    "Gowun Batang",
    "Do Hyeon",
    "Jua",
    "Song Myung",
    "Hi Melody",
    "Gamja Flower",
    "Gugi",
    "Nanum Brush Script",
    "Black Han Sans",
    "Yeon Sung",

    // 영문 폰트
    "Playfair Display",
    "Merriweather",
    "Lora",
    "Crimson Text",
    "Libre Baskerville",
    "Source Serif Pro",
    "PT Serif",
    "Roboto Slab",
    "Open Sans",
    "Montserrat",
    "Raleway",
    "Poppins",
    "Quicksand",
    "Dancing Script",
    "Great Vibes",
    "Pacifico",
    "Satisfy",
    "Caveat",
    "Shadows Into Light",
    "Permanent Marker",
  ],
  defaultFont: "Noto Serif KR",
} as const;
