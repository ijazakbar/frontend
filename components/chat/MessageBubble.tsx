"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Copy, Check, User, Bot } from "lucide-react"
import { useState } from "react"
import { format } from "date-fns"
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

// Register languages if needed
import javascript from 'react-syntax-highlighter/dist/esm/languages/prism/javascript'
import typescript from 'react-syntax-highlighter/dist/esm/languages/prism/typescript'
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx'
import tsx from 'react-syntax-highlighter/dist/esm/languages/prism/tsx'
import python from 'react-syntax-highlighter/dist/esm/languages/prism/python'
import java from 'react-syntax-highlighter/dist/esm/languages/prism/java'
import cpp from 'react-syntax-highlighter/dist/esm/languages/prism/cpp'
import json from 'react-syntax-highlighter/dist/esm/languages/prism/json'

// Register languages
SyntaxHighlighter.registerLanguage('javascript', javascript)
SyntaxHighlighter.registerLanguage('typescript', typescript)
SyntaxHighlighter.registerLanguage('jsx', jsx)
SyntaxHighlighter.registerLanguage('tsx', tsx)
SyntaxHighlighter.registerLanguage('python', python)
SyntaxHighlighter.registerLanguage('java', java)
SyntaxHighlighter.registerLanguage('cpp', cpp)
SyntaxHighlighter.registerLanguage('json', json)

interface MessageBubbleProps {
  id: string
  role: "user" | "assistant" | "system"
  content: string
  timestamp: Date
  status?: "sending" | "streaming" | "complete" | "error"
}

export function MessageBubble({
  role,
  content,
  timestamp,
  status,
}: MessageBubbleProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const isUser = role === "user"
  const isError = status === "error"
  const isStreaming = status === "streaming"

  const renderContent = () => {
    if (!content) return isStreaming ? "▋" : null

    // Simple markdown-like code block parsing
    const parts = content.split(/(```[\s\S]*?```)/g)
    
    return parts.map((part, index) => {
      const codeMatch = part.match(/```(\w*)\n([\s\S]*?)```/)
      
      if (codeMatch) {
        const language = codeMatch[1] || 'text'
        const code = codeMatch[2].trim()
        
        return (
          <div key={index} className="relative group my-4">
            <SyntaxHighlighter
              language={language}
              style={vscDarkPlus}
              PreTag="div"
              customStyle={{
                borderRadius: '0.5rem',
                padding: '1rem',
              }}
            >
              {code}
            </SyntaxHighlighter>
          </div>
        )
      }
      
      // Regular text - split by line breaks for basic formatting
      return (
        <div key={index} className="whitespace-pre-wrap">
          {part.split('\n').map((line, i) => (
            <p key={i} className="mb-2 last:mb-0">
              {line || <br />}
            </p>
          ))}
        </div>
      )
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "flex gap-3 mb-4",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white flex-shrink-0">
          <Bot className="w-5 h-5" />
        </div>
      )}

      <div
        className={cn(
          "max-w-[70%] rounded-2xl p-4 relative group",
          isUser
            ? "bg-blue-600 text-white"
            : "bg-muted text-foreground",
          isError && "bg-destructive/10 text-destructive border border-destructive",
          isStreaming && "animate-pulse"
        )}
      >
        <div
          className={cn(
            "text-xs mb-2",
            isUser ? "text-blue-100" : "text-muted-foreground"
          )}
        >
          {format(timestamp, "h:mm a")}
        </div>

        <div className="prose dark:prose-invert max-w-none">
          {renderContent()}
        </div>

        {!isUser && (
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={handleCopy}
            >
              {copied ? (
                <Check className="w-4 h-4 text-green-500" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
          </div>
        )}
      </div>

      {isUser && (
        <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-white flex-shrink-0">
          <User className="w-5 h-5" />
        </div>
      )}
    </motion.div>
  )
}