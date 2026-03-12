"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageList } from "./MessageList"
import { ChatInput } from "./ChatInput"
import { ModelSelector } from "./ModelSelector"
import { ModeSelector } from "./ModeSelector"
import { TypingIndicator } from "./TypingIndicator"
import { ParameterPanel } from "@/components/parameters/ParameterPanel"
import { useChat } from "@/lib/hooks/useChat"
import { Button } from "@/components/ui/button"
import { Settings, Sidebar } from "lucide-react"

interface Message {
  id: string
  role: "user" | "assistant" | "system"
  content: string
  timestamp: Date
  status?: "sending" | "streaming" | "complete" | "error"
}

export function ChatContainer() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isParameterPanelOpen, setIsParameterPanelOpen] = useState(false)
  const [selectedModel, setSelectedModel] = useState("gpt-4")
  const [selectedMode, setSelectedMode] = useState("chat")
  const [parameters, setParameters] = useState({
    temperature: 0.7,
    maxTokens: 2000,
    topP: 0.9,
    frequencyPenalty: 0,
    presencePenalty: 0,
  })
  
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { sendMessage, isLoading, streamMessage } = useChat()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (content: string, attachments?: File[]) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      timestamp: new Date(),
      status: "complete",
    }
    setMessages((prev) => [...prev, userMessage])

    // Add placeholder for assistant message
    const assistantMessageId = (Date.now() + 1).toString()
    setMessages((prev) => [
      ...prev,
      {
        id: assistantMessageId,
        role: "assistant",
        content: "",
        timestamp: new Date(),
        status: "streaming",
      },
    ])

    try {
      let fullResponse = ""
      await streamMessage(
        content,
        selectedModel,
        selectedMode,
        parameters,
        attachments,
        (chunk) => {
          fullResponse += chunk
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantMessageId
                ? { ...msg, content: fullResponse }
                : msg
            )
          )
        }
      )

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantMessageId
            ? { ...msg, status: "complete" }
            : msg
        )
      )
    } catch (error) {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantMessageId
            ? {
                ...msg,
                content: "Sorry, I encountered an error. Please try again.",
                status: "error",
              }
            : msg
        )
      )
    }
  }

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              PakChat
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <ModelSelector value={selectedModel} onChange={setSelectedModel} />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsParameterPanelOpen(!isParameterPanelOpen)}
            >
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <div className="px-4 pb-2">
          <ModeSelector value={selectedMode} onChange={setSelectedMode} />
        </div>
      </header>

      {/* Parameter Panel */}
      <AnimatePresence>
        {isParameterPanelOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-b overflow-hidden"
          >
            <ParameterPanel parameters={parameters} onChange={setParameters} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <MessageList messages={messages} />
        {isLoading && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t bg-card p-4">
        <ChatInput
          onSend={handleSendMessage}
          disabled={isLoading}
          placeholder="Type your message... (Shift+Enter for new line)"
        />
        <p className="text-xs text-muted-foreground mt-2 text-center">
          PakChat is secure and private. Your conversations are encrypted.
        </p>
      </div>
    </div>
  )
}