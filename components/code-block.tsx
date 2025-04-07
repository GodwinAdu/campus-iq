"use client"

import React from "react"
import { Check, Copy } from "lucide-react"
import { cn } from "@/lib/utils"

interface CodeBlockProps {
  code: string
  language?: string
  showLineNumbers?: boolean
  className?: string
  filename?: string
}

export default function CodeBlock({
  code,
  language = "javascript",
  showLineNumbers = true,
  className,
  filename,
}: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false)

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={cn("relative my-6 overflow-hidden rounded-lg border bg-zinc-950 dark:bg-zinc-900", className)}>
      <div className="flex items-center justify-between border-b border-zinc-700 bg-zinc-800 px-4 py-2">
        {filename ? (
          <div className="text-xs font-medium text-zinc-300">{filename}</div>
        ) : (
          <div className="text-xs font-medium text-zinc-300">{language}</div>
        )}
        <button
          onClick={copyToClipboard}
          className="text-xs text-zinc-400 hover:text-zinc-100 transition-colors flex items-center gap-1"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className={cn("p-4 overflow-x-auto text-sm text-zinc-100", showLineNumbers && "pl-12 relative")}>
        {showLineNumbers && (
          <div className="absolute left-0 top-0 pt-4 w-8 h-full flex flex-col text-right pr-2 text-zinc-500 select-none bg-zinc-900/30">
            {code.split("\n").map((_, i) => (
              <div key={i} className="leading-relaxed">
                {i + 1}
              </div>
            ))}
          </div>
        )}
        <code>{code}</code>
      </pre>
    </div>
  )
}

