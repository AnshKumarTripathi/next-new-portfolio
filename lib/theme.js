"use client";

import { ThemeProvider } from "next-themes";

export function Providers({ children }) {
  return (
    <ThemeProvider
      attribute="data-theme"
      defaultTheme="dark"
      themes={["dark", "solarized"]}
      enableSystem={false}
      disableTransitionOnChange={true}
    >
      {children}
    </ThemeProvider>
  );
}

