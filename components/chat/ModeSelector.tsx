import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageSquare, BookOpen, Code, Languages } from "lucide-react"

interface ModeSelectorProps {
  value: string
  onChange: (value: string) => void  // Yeh theek hai
}

export function ModeSelector({ value, onChange }: ModeSelectorProps) {
  return (
    <Tabs 
      value={value} 
      onValueChange={onChange}  // 👈 onChange ko onValueChange mein map karo
      className="w-full"
    >
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="chat" className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4" />
          <span className="hidden sm:inline">Chat</span>
        </TabsTrigger>
        <TabsTrigger value="research" className="flex items-center gap-2">
          <BookOpen className="w-4 h-4" />
          <span className="hidden sm:inline">Research</span>
        </TabsTrigger>
        <TabsTrigger value="code" className="flex items-center gap-2">
          <Code className="w-4 h-4" />
          <span className="hidden sm:inline">Code</span>
        </TabsTrigger>
        <TabsTrigger value="translate" className="flex items-center gap-2">
          <Languages className="w-4 h-4" />
          <span className="hidden sm:inline">Translate</span>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}