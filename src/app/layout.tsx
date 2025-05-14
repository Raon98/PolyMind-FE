import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import { Providers } from "@/common/providers/providers";

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  display: "swap",
  preload: true,
  variable: "--font-noto-sans-kr",
});

export const metadata: Metadata = {
  title: "PolyMind",
  description: "AI Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={notoSansKr.variable}>
      <body className="antialiased min-h-screen-mobile w-full max-w-mobile mx-auto">
        <div className="min-h-screen-safe w-full px-4 safe-left safe-right">
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}
