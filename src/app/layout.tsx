import type { Metadata, Viewport } from "next";
import { Barlow, Barlow_Condensed } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgressBar } from "@/components/ui/ScrollProgressBar";

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-barlow",
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-barlow-condensed",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0d1b2e",
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
      className={`${barlow.variable} ${barlowCondensed.variable}`}
    >
      <body className="antialiased">
        <ScrollProgressBar />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
