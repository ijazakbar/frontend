"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { MessageSquarePlus } from "lucide-react"

export function NewChatButton() {
  const router = useRouter()

  const handleNewChat = () => {
    // Generate new chat ID
    const newChatId = Date.now().toString()
    router.push(`/chat/${newChatId}`)
  }

  return (
    <Button
      onClick={handleNewChat}
      className="w-full bg-gradient-to-r from-blue-600 to-purple-600"
    >
      <MessageSquarePlus className="w-4 h-4 mr-2" />
      New Chat
    </Button>
  )
}