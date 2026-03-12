export const APP_NAME = "PakChat AI"
export const APP_VERSION = "1.0.0"
export const APP_DESCRIPTION = "World's Most Intelligent AI Assistant"

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://pakchat-backend.onrender.com"

export const SUPPORTED_LANGUAGES = [
  { code: "en", name: "English" },
  { code: "ur", name: "Urdu" },
  { code: "hi", name: "Hindi" },
  { code: "ar", name: "Arabic" },
  { code: "bn", name: "Bengali" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "zh", name: "Chinese" },
  { code: "ru", name: "Russian" },
]

export const AI_MODELS = [
  {
    id: "gpt-4",
    name: "GPT-4",
    provider: "OpenAI",
    description: "Most capable model for complex tasks",
    maxTokens: 8192,
    isAvailable: true,
  },
  {
    id: "gpt-3.5-turbo",
    name: "GPT-3.5 Turbo",
    provider: "OpenAI",
    description: "Fast and efficient for most tasks",
    maxTokens: 4096,
    isAvailable: true,
  },
  {
    id: "claude-2",
    name: "Claude 2",
    provider: "Anthropic",
    description: "Excellent for analysis and reasoning",
    maxTokens: 100000,
    isAvailable: true,
  },
  {
    id: "gemini-pro",
    name: "Gemini Pro",
    provider: "Google",
    description: "Google's most advanced model",
    maxTokens: 8192,
    isAvailable: true,
  },
  {
    id: "mixtral",
    name: "Mixtral 8x7B",
    provider: "Groq",
    description: "Fast open-source model",
    maxTokens: 8192,
    isAvailable: true,
  },
]

export const CHAT_MODES = [
  { id: "chat", name: "Chat", icon: "MessageSquare" },
  { id: "research", name: "Research", icon: "BookOpen" },
  { id: "code", name: "Code", icon: "Code" },
  { id: "translate", name: "Translate", icon: "Languages" },
]

export const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
export const SUPPORTED_FILE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "application/pdf",
  "text/plain",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]