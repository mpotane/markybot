"use client";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { useChat } from "ai/react";
import { Input } from "@/components/ui/input";

export default function Home() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <main className="container">
      <header className="w-full">
        <nav className="flex items-center justify-between p-5">
          <div>LOGO</div>
          <div className="flex gap-5">
            <a href="#">LINK 1</a>
            <a href="#">LINK 2</a>
            <a href="#">LINK 3</a>
            <a href="#">LINK 4</a>
          </div>
          <div>
            <ModeToggle />
          </div>
        </nav>
      </header>
      <div className="mx-auto w-full max-w-md py-24 flex flex-col stretch">
        {messages.map((m) => (
          <div key={m.id}>
            {m.role === "user" ? "User: " : "AI: "}
            {m.content}
          </div>
        ))}

        <form onSubmit={handleSubmit}>
          <div className="max-w-md w-full fixed flex gap-2 bottom-0 mb-8">
            <Input
              value={input}
              onChange={handleInputChange}
            />
            <Button type="submit">Send</Button>
          </div>
        </form>
      </div>
    </main>
  );
}
