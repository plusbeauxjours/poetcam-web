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

아래 이미지를 천천히 관찰하세요. 이미지에 담긴 **분위기, 색감, 구도, 시간대, 등장 인물 또는 사물의 의미**를 깊이 있게 느끼고,  
그 감정을 바탕으로 **짧고 아름다운 자유시**를 지어주세요.

다음의 기준을 반드시 지켜주세요:

1. 시는 **감각적이고 이미지 중심**이어야 하며, 사물의 본질을 은유적으로 포착하세요.  
   - 예: "낙엽" → "누군가의 오래된 편지처럼 떨어진다"

2. 감정은 직접 말하지 말고, **숨기듯 이미지로 표현**해주세요.  
   - "나는 외롭다" → "텅 빈 정류장에 버스가 멈추지 않는다"

3. **일상적인 표현을 낯설게 표현**해 주세요.  
   - "햇빛이 쨍쨍하다" → "도시에 갇힌 별들이 낮잠을 자는 중이다"

4. 각 행은 **짧고 리듬감 있는 어조**를 유지하며, 반복이나 소리의 울림을 활용하세요.

5. 메시지를 직접 전달하지 말고, **독자가 해석할 여지를 남겨** 몰입감을 주는 표현을 사용하세요.  
   - 마치 사진 속에 들어가 있는 듯한 시적 공간을 만들어주세요.

6. 시의 **중간이나 마지막에 가볍고 위트 있는 유머를 한 줄 포함**해주세요.  
   - 분위기를 해치지 않는 선에서 약간의 반전, 미소, 농담 등을 담아주세요.  
   - 예: "너도 나처럼 구겨진 하루를 펴다가 / 다리미를 태운 적 있니?"

7. **마침표는 쓰지 마세요.** 여운을 남기기 위함입니다.

[출력 형식]
• 한국어 자유시 형태로 작성해주세요 (제목 없이 시만)  
• 최대 5행으로 구성해주세요  
• 출력은 시 텍스트만, 다른 말은 하지 마세요  

[입력 이미지 설명 또는 캡션]
`,
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
