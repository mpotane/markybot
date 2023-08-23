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
import { signIn, signOut, useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MemoizedReactMarkdown } from "@/components/markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {oneDark} from 'react-syntax-highlighter/dist/esm/styles/prism'

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  const { data: session, status } = useSession();

  return (
    <main className="container">
      <header className="mx-auto max-w-lg">
        <nav className="flex items-center justify-between py-5">
          {status === "loading" ? (
            <p>Loading...</p>
          ) : status === "authenticated" ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  {session.user?.name}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => signOut()}>
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              className="flex gap-2"
              variant="outline"
              size="sm"
              onClick={() => signIn("github", { callbackUrl: "/" })}
            >
              <GitHubLogoIcon />
              <p>Login with github</p>
            </Button>
          )}
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
                  className={`${colorClassName} rounded-md mb-5 p-2`}
                >
                  {m.role === "user" ? "🧑 " : "🤖 "}
                  <MemoizedReactMarkdown
                    remarkPlugins={[remarkGfm, remarkMath]}
                    components={{
                      code({ node, inline, className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || "");
                        return !inline && match ? (
                          <SyntaxHighlighter
                            {...props}
                            style={oneDark}
                            language={match[1]}
                            PreTag="div"
                          >
                            {String(children).replace(/\n$/, "")}
                          </SyntaxHighlighter>
                        ) : (
                          <code {...props} className={className}>
                            {children}
                          </code>
                        );
                      },
                    }}
                  >
                    {m.content}
                  </MemoizedReactMarkdown>
                </div>
              );
            })}
          </ScrollArea>
        )}
      </section>
      <form
        onSubmit={handleSubmit}
        className="container grid place-items-center"
      >
        <div className="mx-auto w-full max-w-md fixed flex items-center justify-center gap-2 bottom-0 mb-8 p-5">
          <Input
            className="md:w-[20rem]"
            maxLength={2048}
            onChange={handleInputChange}
            pattern="^[a-zA-Z0-9\s\p{P}]+$"
            type="text"
            value={input}
          />
          <Button type="submit">Send</Button>
        </div>
      </form>
    </main>
  );
}