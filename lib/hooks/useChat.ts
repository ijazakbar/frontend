import { useState, useCallback } from "react"
import { chatApi } from "@/lib/api/chat"
import { toast } from "sonner"
import { ChatMessage } from "@/lib/api/chat"  // Import the type

interface UseChatOptions {
  onError?: (error: Error) => void
}

export function useChat(options: UseChatOptions = {}) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const sendMessage = useCallback(
    async (
      content: string,
      model: string,
      mode: string,
      parameters: any,
      attachments?: File[]
    ) => {
      setIsLoading(true)
      setError(null)

      try {
        // ✅ FIX: Type assertion here
        const messages: ChatMessage[] = [{ role: "user", content }]
        
        const response = await chatApi.sendMessage({
          messages,
          model,
          mode,
          parameters,
        })

        return response
      } catch (err) {
        const message = err instanceof Error ? err.message : "Failed to send message"
        setError(message)
        toast.error(message)
        options.onError?.(err as Error)
        throw err
      } finally {
        setIsLoading(false)
      }
    },
    [options]
  )

  const streamMessage = useCallback(
    async (
      content: string,
      model: string,
      mode: string,
      parameters: any,
      attachments: File[] | undefined,
      onChunk: (chunk: string) => void
    ) => {
      setIsLoading(true)
      setError(null)

      try {
        // ✅ FIX: Type assertion here too
        const messages: ChatMessage[] = [{ role: "user", content }]
        
        await chatApi.streamMessage(
          {
            messages,
            model,
            mode,
            parameters,
          },
          onChunk
        )
      } catch (err) {
        const message = err instanceof Error ? err.message : "Stream failed"
        setError(message)
        toast.error(message)
        options.onError?.(err as Error)
        throw err
      } finally {
        setIsLoading(false)
      }
    },
    [options]
  )

  return {
    sendMessage,
    streamMessage,
    isLoading,
    error,
  }
}