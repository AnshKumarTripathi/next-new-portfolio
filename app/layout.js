import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/lib/theme";
import { RippleProvider } from "@/lib/rippleContext";
import Navigation from "@/components/Navigation";
import ThemeToggle from "@/components/ThemeToggle";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "Your Name - Software Engineer",
  description:
    "Software Engineer Portfolio - Building modern web applications with React, Next.js, and JavaScript",
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
