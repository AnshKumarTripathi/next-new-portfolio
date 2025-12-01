import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/lib/theme";
import { RippleProvider } from "@/lib/rippleContext";
import Navigation from "@/components/Navigation";
import ThemeToggle from "@/components/ThemeToggle";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // Removed 300 weight to reduce font bundle size
  display: "swap", // Better font loading performance
});

export const metadata = {
  title: "Ansh Kumar Tripathi - Software Engineer",
  description:
    "Software Engineer Portfolio - Building modern web applications with React, Next.js, and JavaScript. Ansh Kumar Tripathi specializes in Cybersecurity, AI/ML, and Game Development.",
  keywords: [
    "Ansh Kumar Tripathi",
    "Software Engineer",
    "Portfolio",
    "React",
    "Next.js",
    "JavaScript",
    "Cybersecurity",
    "AI/ML",
    "Game Development",
  ],
  authors: [{ name: "Ansh Kumar Tripathi" }],
  creator: "Ansh Kumar Tripathi",
  openGraph: {
    title: "Ansh Kumar Tripathi - Software Engineer",
    description:
      "Software Engineer Portfolio - Building modern web applications with React, Next.js, and JavaScript. Specializing in Cybersecurity, AI/ML, and Game Development.",
    url: "https://anshkumartripathi.space",
    siteName: "Ansh Kumar Tripathi Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ansh Kumar Tripathi - Software Engineer",
    description:
      "Software Engineer Portfolio - Building modern web applications with React, Next.js, and JavaScript.",
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
  icons: {
    icon: "/icon.svg",
    apple: "/apple-icon.svg",
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Ansh Kumar Tripathi",
  },
};

export const viewport = {
  themeColor: "#DC143C",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>
        <Providers>
          <RippleProvider>
            <ThemeToggle />
            <div className="flex min-h-screen flex-col">
              <Navigation />
              {/* <div className="h-24 md:h-24" aria-hidden /> */}
              <main className="flex-1 w-full pt-24 flex justify-center">
                <div className="mx-auto flex w-[90%] max-w-[1152px] flex-col gap-12 px-4 md:px-6">
                  {children}
                </div>
              </main>
            </div>
          </RippleProvider>
        </Providers>
      </body>
    </html>
  );
}
