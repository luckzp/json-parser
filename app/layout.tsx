import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "JSON Parser",
  description: "A tool for parsing and formatting JSON data",
  keywords: "JSON Parser, JSON, JSON Formatting, JSON Parsing",
  robots: {
    index: true,
    follow: true,
  },
  authors: [{ name: "Peng Zhang" }],
  creator: "Peng Zhang",
  publisher: "Peng Zhang",
  icons: {
    icon: "/json.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
      <GoogleAnalytics gaId="G-6JJCFTM09P" />
    </html>
  );
}
