import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Roots of π | Math Community for Teenagers",
  description: "Nonprofit community fostering critical thinking through monthly math contests. Join 150+ students in Tashkent for olympiad-style problem solving.",
  keywords: ["math", "olympiad", "teenagers", "Tashkent", "problem solving", "community", "education"],
  authors: [{ name: "The Roots of PI" }],
  openGraph: {
    title: "The Roots of π | Math Community",
    description: "Unlocking the potential of teenagers through the power of mathematics.",
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
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
