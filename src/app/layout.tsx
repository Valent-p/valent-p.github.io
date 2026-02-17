import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import BackToTop from "@/components/ui/BackToTop";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Valentino Phiri | Software Developer & Game Programmer",
  description:
    "Portfolio of Valentino Phiri, a Software Developer and Game Programmer based in Malawi. Founder of Veigatec.",
  keywords: [
    "Software Developer",
    "Game Programmer",
    "Malawi",
    "Valentino Phiri",
    "Veigatec",
  ],
  authors: [{ name: "Valentino Phiri" }],
  openGraph: {
    title: "Valentino Phiri | Software Developer & Game Programmer",
    description:
      "Portfolio of Valentino Phiri, a Software Developer and Game Programmer based in Malawi. Founder of Veigatec.",
    url: "https://valent-p.github.io",
    siteName: "Valentino Phiri Portfolio",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${outfit.variable} antialiased bg-[#020617] text-slate-50`}
      >
        {children}
        <BackToTop />
      </body>
    </html>
  );
}
