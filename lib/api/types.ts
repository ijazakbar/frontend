export interface User {
  id: string
  email: string
  name: string
  createdAt: Date
  updatedAt: Date
}

export interface Conversation {
  id: string
  userId: string
  title: string
  model: string
  mode: string
  messages: Message[]
  createdAt: Date
  updatedAt: Date
}

export interface Message {
  id: string
  conversationId: string
  role: "user" | "assistant" | "system"
  content: string
  tokens?: number
  createdAt: Date
}

export interface Model {
  id: string
  name: string
  provider: string
  description: string
  maxTokens: number
  isAvailable: boolean
}

export interface Template {
  id: string
  name: string
  description: string
  prompt: string
  category: string
  usageCount: number
  createdAt: Date
}