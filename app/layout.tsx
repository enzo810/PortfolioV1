import ConditionalHeader from "@/components/ConditionalHeader";
import QueryProvider from "@/lib/queryProvider";
import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-jetbrainsMono",
});

export const metadata: Metadata = {
  title: "Enzo Sousa - Portfolio",
  description:
    "Portfolio of Enzo Sousa, a 20-year-old full-stack web developer. Student at Epitech in apprenticeship at Creach Agency.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${jetbrainsMono.variable} antialiased container`}>
        <QueryProvider>
          <ConditionalHeader />
          {children}
        </QueryProvider>
        <Toaster richColors={true} />
      </body>
    </html>
  );
}
