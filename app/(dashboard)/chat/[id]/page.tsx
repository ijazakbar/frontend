"use client"

import { ChatContainer } from "@/components/chat/ChatContainer"
import { useParams } from "next/navigation"
import { useEffect } from "react"

export default function ChatSessionPage() {
  const params = useParams()
  const chatId = params.id as string

  useEffect(() => {
    // Load chat history by ID
    console.log("Loading chat:", chatId)
  }, [chatId])

  return <ChatContainer />
}