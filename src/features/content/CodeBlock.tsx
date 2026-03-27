import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vs } from "react-syntax-highlighter/dist/esm/styles/prism";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  code: string;
  language?: string;
  className?: string;
}

export function CodeBlock({
  code,
  language = "text",
  className,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={cn("relative rounded-lg overflow-hidden my-4", className)}>
      {/* Language label */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#f3f4f6] dark:bg-[#1e1e1e] border-b border-border text-xs text-muted-foreground">
        <span>{language}</span>
        <button
          type="button"
          onClick={handleCopy}
          className="text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          {copied ? "✓ Copied" : "Copy"}
        </button>
      </div>

      {/* Code */}
      <SyntaxHighlighter
        language={language}
        style={vs}
        customStyle={{
          margin: 0,
          borderRadius: 0,
          fontSize: "0.875rem",
        }}
        codeTagProps={{
          className: "font-mono",
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
