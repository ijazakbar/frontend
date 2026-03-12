import { apiClient } from "./client"

export interface ChatMessage {
  role: "user" | "assistant" | "system"
  content: string
}

export interface ChatRequest {
  messages: ChatMessage[]
  model: string
  mode: string
  parameters: {
    temperature: number
    maxTokens: number
    topP: number
    frequencyPenalty: number
    presencePenalty: number
  }
}

export interface ChatResponse {
  id: string
  message: ChatMessage
  usage: {
    promptTokens: number
    completionTokens: number
    totalTokens: number
  }
}

export const chatApi = {
  sendMessage: async (data: ChatRequest) => {
    const response = await apiClient.post<ChatResponse>("/api/chat", data)
    return response.data
  },

  streamMessage: async (
    data: ChatRequest,
    onChunk: (chunk: string) => void
  ) => {
    const response = await fetch(`${apiClient.defaults.baseURL}/api/chat/stream`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("pakchat_token")}`,
      },
      body: JSON.stringify(data),
    })

    const reader = response.body?.getReader()
    const decoder = new TextDecoder()

    if (!reader) throw new Error("No reader available")

    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      const chunk = decoder.decode(value)
      const lines = chunk.split("\n")

      for (const line of lines) {
        if (line.startsWith("data: ")) {
          const data = line.slice(6)
          if (data === "[DONE]") continue
          try {
            const parsed = JSON.parse(data)
            if (parsed.content) {
              onChunk(parsed.content)
            }
          } catch (e) {
            console.error("Failed to parse chunk:", e)
          }
        }
      }
    }
  },

  getHistory: async (conversationId?: string) => {
    const response = await apiClient.get("/api/chat/history", {
      params: { conversationId },
    })
    return response.data
  },
}