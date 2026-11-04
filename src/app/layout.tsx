import type { Metadata, Viewport } from "next";
import { Barlow, Barlow_Condensed, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgressBar } from "@/components/ui/ScrollProgressBar";
import { SmoothScrollProvider } from "@/components/ui/SmoothScrollProvider";
import { ConstructionScrollEngine } from "@/components/ui/ConstructionScrollEngine";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: "700",
  variable: "--font-barlow-condensed",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#FAF9F6",
};

export const metadata: Metadata = {
  title: {
    default: "GSAssociates Construction | Government Infrastructure Specialists — Tamil Nadu",
    template: "%s | GSAssociates Construction",
  },
  description:
    "GSAssociates Construction Pvt. Ltd. — Tamil Nadu's trusted partner for roads, highways, bridges, and government buildings. 10+ years, 200+ projects, ₹500 Cr delivered.",
  keywords: [
    "construction company Tamil Nadu",
    "infrastructure contractor Chennai",
    "road construction Tamil Nadu",
    "government contractor PWD Tamil Nadu",
    "bridge construction Tamil Nadu",
  ],
  openGraph: {
    title: "GSAssociates Construction | Tamil Nadu Infrastructure Specialists",
    description: "10+ years building Tamil Nadu's infrastructure — roads, bridges, and government buildings.",
    type: "website",
    locale: "en_IN",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${jakarta.variable} ${barlowCondensed.variable} ${mono.variable}`}
    >
      <body className="antialiased bg-[#FAF9F6] text-[#374151]">
        <SmoothScrollProvider>
          <ConstructionScrollEngine />
          <ScrollProgressBar />
          <Navbar />
          <main className="pt-28 sm:pt-32 min-h-screen relative">{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
