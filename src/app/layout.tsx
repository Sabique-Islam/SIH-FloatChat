import type { Metadata } from "next";
import { GeistSans, GeistMono } from "geist/font";
import "./globals.css";

export const metadata: Metadata = {
  title: "ARGO AI - Oceanographic Research Suite",
  description: "Modern research-oriented interface for ARGO float data analysis and visualization",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`} style={{
      "--font-geist-sans": GeistSans.style.fontFamily,
      "--font-geist-mono": GeistMono.style.fontFamily,
    } as React.CSSProperties}>
      <body
        className="antialiased font-sans"
      >
        {children}
      </body>
    </html>
  );
}
