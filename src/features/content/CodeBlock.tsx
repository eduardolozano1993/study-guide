import { useState } from "react";
import { Check, Copy } from "lucide-react";
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
    <div
      className={cn(
        "relative my-6 overflow-hidden rounded-2xl border border-border/80 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.06)]",
        className,
      )}
    >
      <div className="flex items-center justify-between border-b border-border/70 bg-slate-50 px-4 py-3 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
        <span>{language}</span>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium tracking-[0.08em] text-muted-foreground transition-colors hover:bg-slate-200/70 hover:text-foreground"
        >
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>

      <SyntaxHighlighter
        language={language}
        style={vs}
        customStyle={{
          margin: 0,
          borderRadius: 0,
          fontSize: "0.95rem",
          lineHeight: 1.7,
          padding: "1.25rem 1.5rem",
          background: "#fffdf9",
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
