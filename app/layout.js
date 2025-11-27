import { Geist } from "next/font/google";
import "./globals.css";
import { Providers } from "@/lib/theme";
import { RippleProvider } from "@/lib/rippleContext";
import Navigation from "@/components/Navigation";
import ThemeToggle from "@/components/ThemeToggle";

const geistSans = Geist({
  variable: "--font-geist-sans",
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
      <body className={`${geistSans.variable} antialiased`}>
        <Providers>
          <RippleProvider>
            <ThemeToggle />
            <div className="flex min-h-screen flex-col">
              <Navigation />
              <main className="flex-1 pt-16">{children}</main>
            </div>
          </RippleProvider>
        </Providers>
      </body>
    </html>
  );
}
