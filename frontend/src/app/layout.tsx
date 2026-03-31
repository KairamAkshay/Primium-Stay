import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Premium Stays",
  description: "A premium, minimalist rental application frontend.",
};

import { AuthProvider } from "@/context/AuthContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} min-h-screen antialiased`}>
      <body className="flex flex-col min-h-screen bg-[var(--background)] text-[var(--foreground)]">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
