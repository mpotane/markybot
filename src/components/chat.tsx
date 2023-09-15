"use client";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { useChat } from "ai/react";
// import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { GitHubLogoIcon, PlusCircledIcon } from "@radix-ui/react-icons";
import { SendHorizonal } from "lucide-react";
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
import rehypeSanitize from "rehype-sanitize";
import CodeBlock from "@/components/codeblock";
import { useEffect, useRef } from "react";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  const { data: session, status } = useSession();
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatContainerRef.current?.scrollIntoView(false);
  }, [messages]);

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
          <ScrollArea className="mx-auto w-full max-w-md py-5 px-2 md:px-5 flex flex-col h-[30rem] bg-gradient-to-br from-pink-700 to-violet-700 rounded">
            {messages.map((m) => {
              const colorClassName =
                m.role === "user" ? "bg-sky-600" : "bg-slate-50 text-black";
              return (
                <div
                  key={m.id}
                  className={`${colorClassName} rounded-md mb-5 p-2 mx-auto`}
                  ref={chatContainerRef}
                >
                  {m.role === "user" ? "🧑 " : "🤖 "}
                  <MemoizedReactMarkdown
                    className="relative"
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeSanitize]}
                    components={{
                      code({ node, inline, className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || "");

                        if (inline) {
                          return (
                            <code className={className} {...props}>
                              {children}
                            </code>
                          );
                        }

                        return (
                          <CodeBlock
                            language={(match && match[1]) || ""}
                            value={String(children).replace(/\n$/, "")}
                            {...props}
                          />
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
        <div className="mx-auto w-4/5 max-w-md fixed flex items-center justify-center gap-2 bottom-0 pb-10 px-5 pt-5 border rounded-t-lg">
          <button className="absolute translate-x-[-5.5rem] md:translate-x-[-9rem]">
            <PlusCircledIcon />
          </button>
          <Textarea
            className="resize-none px-10 pt-[1.6rem]"
            placeholder="Type something..."
            maxLength={2048}
            onChange={handleInputChange}
            value={input}
          />
          <button className="absolute translate-x-[5.5rem] md:translate-x-[9rem] hover:text-green-500" type="submit">
            <SendHorizonal size={18} />
          </button>
        </div>
      </form>
    </main>
  );
}
