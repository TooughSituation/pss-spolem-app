import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { AppShell } from "@/components/layout/app-shell";
import { PwaRegister } from "@/components/pwa-register";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "PSS Społem",
    template: "%s · PSS Społem",
  },
  description:
    "Mobilna aplikacja klientów PSS Społem — promocje, gazetka, lista zakupów, sklepy i karta lojalnościowa.",
  applicationName: "PSS Społem",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "PSS Społem",
    statusBarStyle: "default",
  },
  icons: {
    icon: [{ url: "/icons/icon-192.png", sizes: "192x192" }],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180" }],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#009241" },
    { media: "(prefers-color-scheme: dark)", color: "#0d1a12" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" className={jakarta.variable} suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider>
          <AppShell>{children}</AppShell>
          <Toaster position="top-center" richColors />
          <PwaRegister />
        </ThemeProvider>
      </body>
    </html>
  );
}