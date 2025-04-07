import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Loader from "@/components/commons/loader/loader";
import { ThemeProvider } from "next-themes";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import IntroModal from "@/components/commons/IntroModal";
import FeedbackModal from "@/components/commons/FeedbackModal";
import RegisterServiceWorker from "@/components/RegiserServiceWorker";
import { CookieBanner } from "@/components/cookies-banner";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const APP_NAME = "CampusIQ - Revolutionary School Management Software";
const APP_DESCRIPTION = "CampusIQ is a cutting-edge school management system designed to streamline administrative tasks and enhance educational processes.";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_NAME,
    template: "%s - PWA App",
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.ts",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_NAME,
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    shortcut: "/favicon.ico",
    apple: [{ url: "/icons/icon-512x512.png", sizes: "180x180" }],
  },
};

export const viewport: Viewport = {
  minimumScale: 1,
  initialScale: 1,
  width: "device-width",
  viewportFit: "cover",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <style>{`
            html, body, #__next {
              height: 100%;
            }
            #__next {
              margin: 0 auto;
            }
            h1 {
              text-align: center;
            }
            `}</style>
        {/* <script
          crossOrigin="anonymous"
          src="//unpkg.com/react-scan/dist/auto.global.js"
          defer
        /> */}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased scrollbar-hide`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <RegisterServiceWorker />
          <Loader />
          {/* <UseCheckStoreExpired /> */}
          {children}
          <CookieBanner />
          <IntroModal />
          <Analytics />
          <SpeedInsights />
          <Toaster />
          <FeedbackModal />
        </ThemeProvider>
      </body>
    </html>
  );
}
