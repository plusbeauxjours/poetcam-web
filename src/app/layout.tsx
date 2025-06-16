import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://poetcam.vercel.app"),
  title: {
    default: "포엣캠 - AI가 사진을 보고 시를 써주는 서비스",
    template: "%s | 포엣캠",
  },
  description:
    "사진 한 장으로 감성적인 한국어 시를 만들어보세요. AI가 당신의 사진을 보고 아름다운 시를 창작해드립니다. 무료로 이용하고 SNS에 공유하세요.",
  keywords: [
    "AI 시",
    "사진 시",
    "인공지능 시 창작",
    "감성 시",
    "한국어 시",
    "포토 포엠",
    "AI 창작",
    "시 생성기",
  ],
  authors: [{ name: "포엣캠팀" }],
  creator: "포엣캠",
  publisher: "포엣캠",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://poetcam.vercel.app",
    title: "포엣캠 - AI가 사진을 보고 시를 써주는 서비스",
    description:
      "사진 한 장으로 감성적인 한국어 시를 만들어보세요. AI가 당신의 사진을 보고 아름다운 시를 창작해드립니다.",
    siteName: "포엣캠",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "포엣캠 - AI 시 창작 서비스",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "포엣캠 - AI가 사진을 보고 시를 써주는 서비스",
    description:
      "사진 한 장으로 감성적인 한국어 시를 만들어보세요. AI가 당신의 사진을 보고 아름다운 시를 창작해드립니다.",
    images: ["/og-image.jpg"],
    creator: "@poetcam",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
  alternates: {
    canonical: "https://poetcam.vercel.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2931981606209596"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="포엣캠" />

        {/* 구조화된 데이터 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "포엣캠",
              description:
                "사진 한 장으로 감성적인 한국어 시를 만들어보세요. AI가 당신의 사진을 보고 아름다운 시를 창작해드립니다.",
              url: "https://poetcam.vercel.app",
              applicationCategory: "Entertainment",
              operatingSystem: "Any",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "KRW",
              },
              author: {
                "@type": "Organization",
                name: "포엣캠팀",
              },
              featureList: ["AI 시 창작", "사진 기반 시 생성", "한국어 시 지원", "SNS 공유 기능"],
            }),
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
    </html>
  );
}
