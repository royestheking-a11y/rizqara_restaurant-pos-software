import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rizqara POS — Smart Restaurant Management",
  description: "Rizqara POS: Complete restaurant point-of-sale system with order management, kitchen display, billing, inventory, and analytics.",
  keywords: "restaurant POS, point of sale, order management, kitchen display, billing",
  authors: [{ name: "Rizqara Tech" }],
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Rizqara POS",
  },
};

export const viewport: Viewport = {
  themeColor: "#8B0000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
