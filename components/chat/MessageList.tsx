import { MessageBubble } from "./MessageBubble"

interface Message {
  id: string
  role: "user" | "assistant" | "system"
  content: string
  timestamp: Date
  status?: "sending" | "streaming" | "complete" | "error"
}

interface MessageListProps {
  messages: Message[]
}

export function MessageList({ messages }: MessageListProps) {
  if (messages.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-center text-muted-foreground">
        <div>
          <h3 className="text-lg font-semibold mb-2">Welcome to PakChat!</h3>
          <p>Start a conversation by typing a message below.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <MessageBubble key={message.id} {...message} />
      ))}
    </div>
  )
}