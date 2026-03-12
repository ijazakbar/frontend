"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Copy, Play, Users } from "lucide-react"
import { toast } from "sonner"

interface TemplateCardProps {
  template: {
    id: string
    name: string
    description: string
    prompt: string
    category: string
    usageCount: number
  }
}

export function TemplateCard({ template }: TemplateCardProps) {
  const handleUse = () => {
    // Navigate to chat with template
    toast.success(`Template "${template.name}" loaded`)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(template.prompt)
    toast.success("Template copied to clipboard")
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg mb-1">{template.name}</CardTitle>
            <p className="text-sm text-muted-foreground">{template.description}</p>
          </div>
          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
            {template.category}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm line-clamp-3 bg-muted p-3 rounded">
          {template.prompt}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex items-center text-sm text-muted-foreground">
          <Users className="w-4 h-4 mr-1" />
          {template.usageCount.toLocaleString()} uses
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={handleCopy}>
            <Copy className="w-4 h-4" />
          </Button>
          <Button size="sm" onClick={handleUse}>
            <Play className="w-4 h-4 mr-1" />
            Use
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}