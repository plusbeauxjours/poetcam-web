import type { Metadata } from "next";
import {
  Noto_Serif_KR,
  Noto_Sans_KR,
  Nanum_Gothic,
  Nanum_Pen_Script,
  Gaegu,
  Dongle,
  Playfair_Display,
  Merriweather,
  Lora,
  Crimson_Text,
  Libre_Baskerville,
  Source_Serif_4,
  PT_Serif,
  Roboto_Slab,
  Open_Sans,
  Montserrat,
  Raleway,
  Poppins,
  Quicksand,
  Dancing_Script,
  Great_Vibes,
  Pacifico,
  Satisfy,
  Caveat,
  Shadows_Into_Light,
  Permanent_Marker,
  Gowun_Dodum,
  Gowun_Batang,
  Do_Hyeon,
  Jua,
  Hi_Melody,
  Gamja_Flower,
  Gugi,
  Nanum_Brush_Script,
  Black_Han_Sans,
  Yeon_Sung,
} from "next/font/google";
import "./globals.css";
import FirebaseAnalyticsProvider from "@/components/FirebaseAnalyticsProvider";

// 한글 폰트 (next/font/google 지원)
const notoSerifKR = Noto_Serif_KR({
  weight: ["200", "300", "400", "500", "600", "700", "900"],
  subsets: ["latin"],
  variable: "--font-noto-serif-kr",
});
const notoSansKR = Noto_Sans_KR({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
  variable: "--font-noto-sans-kr",
});
const nanumGothic = Nanum_Gothic({
  weight: ["400", "700", "800"],
  subsets: ["latin"],
  variable: "--font-nanum-gothic",
});
const nanumPenScript = Nanum_Pen_Script({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-nanum-pen-script",
});
const gaegu = Gaegu({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
  variable: "--font-gaegu",
});
const dongle = Dongle({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
  variable: "--font-dongle",
});
const gowunDodum = Gowun_Dodum({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-gowun-dodum",
});
const gowunBatang = Gowun_Batang({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-gowun-batang",
});
const doHyeon = Do_Hyeon({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-do-hyeon",
});
const jua = Jua({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-jua",
});
const hiMelody = Hi_Melody({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-hi-melody",
});
const gamjaFlower = Gamja_Flower({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-gamja-flower",
});
const gugi = Gugi({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-gugi",
});
const nanumBrushScript = Nanum_Brush_Script({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-nanum-brush-script",
});
const blackHanSans = Black_Han_Sans({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-black-han-sans",
});
const yeonSung = Yeon_Sung({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-yeon-sung",
});
// 영문 폰트
const playfairDisplay = Playfair_Display({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-playfair-display",
});
const merriweather = Merriweather({
  weight: ["300", "400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-merriweather",
});
const lora = Lora({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-lora",
});
const crimsonText = Crimson_Text({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-crimson-text",
});
const libreBaskerville = Libre_Baskerville({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-libre-baskerville",
});
const sourceSerif4 = Source_Serif_4({
  weight: ["200", "300", "400", "500", "600", "700", "900"],
  subsets: ["latin"],
  variable: "--font-source-serif-4",
});
const ptSerif = PT_Serif({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-pt-serif",
});
const robotoSlab = Roboto_Slab({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-roboto-slab",
});
const openSans = Open_Sans({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-open-sans",
});
const montserrat = Montserrat({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-montserrat",
});
const raleway = Raleway({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-raleway",
});
const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-poppins",
});
const quicksand = Quicksand({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-quicksand",
});
const dancingScript = Dancing_Script({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-dancing-script",
});
const greatVibes = Great_Vibes({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-great-vibes",
});
const pacifico = Pacifico({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-pacifico",
});
const satisfy = Satisfy({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-satisfy",
});
const caveat = Caveat({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-caveat",
});
const shadowsIntoLight = Shadows_Into_Light({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-shadows-into-light",
});
const permanentMarker = Permanent_Marker({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-permanent-marker",
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

        {/* Google Fonts for unsupported fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Nanum+Myeongjo:wght@400;700;800&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Single+Day&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poor+Story&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Sunflower:wght@300;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`
          ${notoSerifKR.variable}
          ${notoSansKR.variable}
          ${nanumGothic.variable}
          ${nanumPenScript.variable}
          ${gaegu.variable}
          ${dongle.variable}
          ${gowunDodum.variable}
          ${gowunBatang.variable}
          ${doHyeon.variable}
          ${jua.variable}
          ${hiMelody.variable}
          ${gamjaFlower.variable}
          ${gugi.variable}
          ${nanumBrushScript.variable}
          ${blackHanSans.variable}
          ${yeonSung.variable}
          ${playfairDisplay.variable}
          ${merriweather.variable}
          ${lora.variable}
          ${crimsonText.variable}
          ${libreBaskerville.variable}
          ${sourceSerif4.variable}
          ${ptSerif.variable}
          ${robotoSlab.variable}
          ${openSans.variable}
          ${montserrat.variable}
          ${raleway.variable}
          ${poppins.variable}
          ${quicksand.variable}
          ${dancingScript.variable}
          ${greatVibes.variable}
          ${pacifico.variable}
          ${satisfy.variable}
          ${caveat.variable}
          ${shadowsIntoLight.variable}
          ${permanentMarker.variable}
          antialiased
        `}>
        <FirebaseAnalyticsProvider />
        {children}
      </body>
    </html>
  );
}
