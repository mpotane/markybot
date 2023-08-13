"use client";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { useChat } from "ai/react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Home() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <main className="container">
      <header className="mx-auto max-w-lg">
        <nav className="flex items-center justify-between py-5">
          <div>Markybot</div>
          <div>
            <ModeToggle />
          </div>
        </nav>
      </header>
      <ScrollArea className="mx-auto w-full max-w-md p-5 flex flex-col h-[48rem] bg-slate-700 rounded">
        {messages.map((m) => {
          const colorClassName = m.role === "user" ? "bg-sky-600" : "bg-slate-50 text-black";
          return (
          <div key={m.id} className={`${colorClassName} rounded-md mb-5 p-2 `}>
            {m.role === "user" ? "🧑 " : "🤖 "}
            {m.content}
          </div>
          )
        })}

        <form onSubmit={handleSubmit}>
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
      </ScrollArea>
    </main>
  );
}
