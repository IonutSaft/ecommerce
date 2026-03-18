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
  title: {
    default: "Modern E-commerce | Premium Shopping Experience",
    template: "%s | Modern E-commerce",
  },
  description:
    "Experience the next generation of online shopping with a high-performance, secure, and modern e-commerce platform built with Next.js 16.",
  keywords: [
    "e-commerce",
    "next.js",
    "shopping",
    "react",
    "prisma",
    "modern store",
  ],
  authors: [{ name: "Ionut Saftoiu" }],
  creator: "Ionut Saftoiu",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ecommerce-ivory-nine-53.vercel.app/",
    title: "Modern E-commerce | Premium Shopping Experience",
    description:
      "Discover a seamless shopping journey with a modern, high-performance e-commerce platform.",
    siteName: "Modern E-commerce",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Modern E-commerce Platform Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Modern E-commerce | Premium Shopping Experience",
    description:
      "Discover a seamless shopping journey with a modern, high-performance e-commerce platform.",
    images: ["/og-image.png"],
    creator: "@XeVvOn",
  },
  icons: {
    icon: "/favicon.ico",
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
    </html>
  );
}
