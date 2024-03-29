import "./globals.css";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { ThemeProvider } from "@/components/theme-provider";
import { SessionProvider } from "./provider";


export const metadata: Metadata = {
  title: "Markybot - Your Personal AI Chatbot | Mpotane",
  description:
    "Markybot is an AI-powered personal chatbot created by Mpotane using langchain and openai. Get instant responses to your queries and have a personalized conversation with Markybot today!",
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
