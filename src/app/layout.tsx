import "./globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { SessionProvider } from "./provider";
import { GeistSans } from "geist/font/sans";

export const metadata: Metadata = {
  title: "Markybot - Your Personal AI Chatbot | Mark Edzel Potane",
  description:
    "Markybot is an AI-powered personal chatbot created by Mark Edzel Potane using 🦜 langchain and 🤖 openai. ✅ Free to use | ✅ Opensource",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${GeistSans.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SessionProvider>{children}</SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
