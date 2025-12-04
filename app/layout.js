import "./globals.css";
import { Providers } from "@/lib/theme";
import { RippleProvider } from "@/lib/rippleContext";
import { LanguageProvider } from "@/lib/languageContext";
import Navigation from "@/components/Navigation";
import SystemSidebar from "@/components/SystemSidebar";

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
    <html lang="en" suppressHydrationWarning data-theme="dark">
      <body className="antialiased">
        <Providers>
          <LanguageProvider>
            <RippleProvider>
              <div
                style={{
                  display: "flex",
                  minHeight: "100vh",
                  flexDirection: "column",
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Navigation />
                <SystemSidebar />
                <main
                  style={{
                    flex: "1 1 0%",
                    width: "100%",
                    paddingTop: "3.5rem",
                  }}
                >
                  {children}
                </main>
              </div>
            </RippleProvider>
          </LanguageProvider>
        </Providers>
      </body>
    </html>
  );
}
