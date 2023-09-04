"use client";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { ClipboardIcon, ClipboardCheckIcon } from "lucide-react";
import { useState } from "react";

type CodeBlockProps = {
  language: string;
  value: string;
};

export default function CodeBlock({
  language,
  value,
  ...props
}: CodeBlockProps) {
  const [copy, setCopy] = useState(false);

  const handleClipBoard = async () => {
    await navigator.clipboard.writeText(value);
    setCopy(true);
    setTimeout(() => {
      setCopy(false);
    }, 2000);
  };

  return (
    <>
      <div
        className="absolute translate-x-[22rem] p-2"
        onClick={handleClipBoard}
      >
        {copy ? (
          <div>
            <ClipboardCheckIcon className="h-4 w-4 text-green-300 hover:text-green-500" />
          </div>
        ) : (
          <ClipboardIcon className="h-4 w-4 text-slate-500 hover:text-slate-300" />
        )}
      </div>
      <SyntaxHighlighter
        {...props}
        style={oneDark}
        language={language}
        PreTag="div"
        className="max-w-sm"
      >
        {value}
      </SyntaxHighlighter>
    </>
  );
}
