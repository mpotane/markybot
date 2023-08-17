"use client";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { useChat } from "ai/react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <main className="container">
      <header className="mx-auto max-w-lg">
        <nav className="flex items-center justify-between py-5">
          <Button className="flex gap-2" variant="outline" size="sm">
            <GitHubLogoIcon />
            <p>Login with github</p>
          </Button>
          <div>
            <ModeToggle />
          </div>
        </nav>
      </header>
      <section>
        {messages.length === 0 ? (
          <Card className="mx-auto w-full max-w-md">
            <CardHeader>
              <CardTitle>Welcome to 🤖 Markybot</CardTitle>
              <CardDescription>
                A personal chatbot built with 💚 by mpotane using Nextjs,
                Langchain and Openai
              </CardDescription>
            </CardHeader>
          </Card>
        ) : (
          <ScrollArea className="mx-auto w-full max-w-md p-5 flex flex-col h-[30rem] bg-gradient-to-br from-pink-700 to-violet-700 rounded">
            {messages.map((m) => {
              const colorClassName =
                m.role === "user" ? "bg-sky-600" : "bg-slate-50 text-black";
              return (
                <div
                  key={m.id}
                  className={`${colorClassName} rounded-md mb-5 p-2 `}
                >
                  {m.role === "user" ? "🧑 " : "🤖 "}
                  {m.content}
                </div>
              );
            })}
          </ScrollArea>
        )}
      </section>
      <form
        onSubmit={handleSubmit}
        className="mx-auto max-w-md w-full grid place-items-center"
      >
        <div className="max-w-md fixed flex items-center justify-center gap-2 bottom-0 mb-8">
          <Input
            type="text"
            className="w-[20rem]"
            value={input}
            onChange={handleInputChange}
          />
          <Button type="submit">Send</Button>
        </div>
      </form>
    </main>
  );
}
