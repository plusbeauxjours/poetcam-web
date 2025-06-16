# 포엣캠 (PoetCam)

AI가 사진을 보고 시를 써주는 웹 애플리케이션입니다.

## 기능

- 📸 실시간 카메라 캡처
- 🤖 Claude AI 기반 한국어 시 생성
- 📱 모바일 친화적 반응형 디자인
- 🔗 소셜 미디어 공유 기능
- ♿ 웹 접근성 지원

## 개발 환경 실행

```bash
# 기본 개발 서버 (HTTP)
npm run dev

# HTTPS 개발 서버 (카메라 권한을 위해 권장)
npm run dev:https
```

### 카메라 권한 문제 해결

#### Chrome 브라우저

1. 주소창 왼쪽의 🔒 또는 📷 아이콘 클릭
2. "카메라" 권한을 "허용"으로 변경
3. 페이지 새로고침

#### 개발 환경에서 HTTPS 사용

```bash
npm run dev:https
```

- Chrome에서는 HTTPS 환경에서만 카메라 접근이 원활히 작동합니다
- localhost는 예외적으로 HTTP에서도 작동하지만, HTTPS 사용을 권장합니다

#### 일반적인 카메라 문제

- **권한 거부**: 브라우저 설정에서 카메라 권한 확인
- **카메라 사용 중**: 다른 애플리케이션에서 카메라 사용 종료
- **카메라 없음**: 자동으로 테스트 이미지 모드로 전환

### React Webcam 사용 예시

`react-webcam` 패키지를 이용하면 카메라 권한을 간단히 요청할 수 있습니다.

```bash
npm install react-webcam
```

아래 예시에서는 권한이 부여되면 `onUserMedia` 콜백이 호출됩니다.

```tsx
import { useState } from "react";
import Webcam from "react-webcam";

export default function WebcamPermission() {
  const [hasPermission, setHasPermission] = useState(false);

  return (
    <Webcam
      audio={false}
      onUserMedia={() => setHasPermission(true)}
      onUserMediaError={(e) => console.error("Camera access denied", e)}
    />
  );
}
```

`onUserMedia`가 호출되면 카메라 권한을 얻은 상태입니다.

## 프로젝트 구조

```
src/
├── app/                    # Next.js App Router
├── components/             # React 컴포넌트
├── hooks/                  # 커스텀 훅
├── utils/                  # 유틸리티 함수
├── types/                  # TypeScript 타입 정의
├── constants/              # 상수값 관리
└── lib/                    # 라이브러리 함수
```

## 기술 스택

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS
- **AI**: Claude 3 Sonnet (Anthropic)
- **Development**: Turbopack, ESLint

## 환경 변수

`.env.local` 파일을 생성하고 다음 환경 변수를 설정하세요:

```env
CLAUDE_API_KEY=your_claude_api_key_here
```

## 배포

이 프로젝트는 Vercel에 최적화되어 있습니다:

```bash
npm run build
npm run start
```

## SEO 최적화

- Open Graph 메타태그
- Twitter Card 지원
- 구조화된 데이터 (Schema.org)
- 시맨틱 HTML
- 웹 접근성 (WCAG 준수)

## 라이선스

MIT License
