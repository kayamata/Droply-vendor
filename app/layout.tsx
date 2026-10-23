import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/providers";

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
    default: "DROPly Vendor — Grow your business on campus",
    template: "%s | DROPly Vendor",
  },
  description:
    "Reach more customers on campus, manage your orders, and grow your business — all from one place.",
  applicationName: "DROPly",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "DROPly",
  },
  icons: {
    apple: "/icons/apple-touch-icon.png",
  },
  other: {
    // Older iOS Safari still requires the legacy capable meta for standalone.
    "apple-mobile-web-app-capable": "yes",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#e85a1d",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
