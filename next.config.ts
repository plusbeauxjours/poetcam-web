import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // SEO 최적화를 위한 설정
  compress: true,
  poweredByHeader: false,

  // 이미지 최적화
  images: {
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // 로컬 이미지 허용
    unoptimized: false,
  },

  // 성능 최적화 (CSS 최적화 비활성화)
  experimental: {
    // optimizeCss: true, // 임시 비활성화
  },

  // ESLint 설정
  eslint: {
    ignoreDuringBuilds: false,
  },

  // TypeScript 설정
  typescript: {
    ignoreBuildErrors: false,
  },

  // 헤더 설정
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
      {
        source: "/api/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, max-age=0",
          },
        ],
      },
      {
        source: "/((?!api).*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
