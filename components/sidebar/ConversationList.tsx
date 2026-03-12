"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { formatDistanceToNow } from "date-fns"
import { cn } from "@/lib/utils"
import { MessageSquare } from "lucide-react"

interface Conversation {
  id: string
  title: string
  lastMessage: string
  timestamp: Date
  model: string
}

export function ConversationList() {
  const pathname = usePathname()

  // Sample data - replace with actual data from API
  const conversations: Conversation[] = [
    {
      id: "1",
      title: "Project Discussion",
      lastMessage: "Let's review the requirements...",
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      model: "GPT-4",
    },
    {
      id: "2",
      title: "Research on AI",
      lastMessage: "Here are the key findings...",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      model: "Claude 2",
    },
    {
      id: "3",
      title: "Code Review",
      lastMessage: "The implementation looks good...",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      model: "DeepSeek Coder",
    },
  ]

  if (conversations.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-50" />
        <p className="text-sm">No conversations yet</p>
        <p className="text-xs">Start a new chat to begin</p>
      </div>
    )
  }

  return (
    <div className="space-y-1">
      {conversations.map((conv) => {
        const isActive = pathname === `/chat/${conv.id}`
        
        return (
          <Link
            key={conv.id}
            href={`/chat/${conv.id}`}
            className={cn(
              "block p-3 rounded-lg transition-colors",
              isActive ? "bg-muted" : "hover:bg-muted/50"
            )}
          >
            <div className="flex items-start justify-between mb-1">
              <h4 className="font-medium text-sm truncate flex-1">
                {conv.title}
              </h4>
              <span className="text-xs text-muted-foreground ml-2">
                {formatDistanceToNow(conv.timestamp, { addSuffix: true })}
              </span>
            </div>
            <p className="text-xs text-muted-foreground truncate mb-1">
              {conv.lastMessage}
            </p>
            <div className="flex items-center gap-2">
              <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">
                {conv.model}
              </span>
            </div>
          </Link>
        )
      })}
    </div>
  )
}