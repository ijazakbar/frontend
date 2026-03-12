"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TemplateCard } from "./TemplateCard"
import { Plus, Search } from "lucide-react"

interface Template {
  id: string
  name: string
  description: string
  prompt: string
  category: string
  usageCount: number
}

export function TemplateManager() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [newTemplate, setNewTemplate] = useState({
    name: "",
    description: "",
    prompt: "",
    category: "",
  })

  // Sample templates
  const templates: Template[] = [
    {
      id: "1",
      name: "Code Review",
      description: "Review code for bugs and improvements",
      prompt: "Please review this code and suggest improvements:\n\n{code}",
      category: "coding",
      usageCount: 1234,
    },
    {
      id: "2",
      name: "Urdu Translation",
      description: "Translate text to Urdu",
      prompt: "Translate the following text to Urdu:\n\n{text}",
      category: "translation",
      usageCount: 5678,
    },
    {
      id: "3",
      name: "Research Summary",
      description: "Summarize research papers",
      prompt: "Summarize this research paper in key points:\n\n{text}",
      category: "research",
      usageCount: 890,
    },
  ]

  const filteredTemplates = templates.filter(
    (t) =>
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleCreateTemplate = () => {
    // Save template logic here
    setShowCreateForm(false)
    setNewTemplate({ name: "", description: "", prompt: "", category: "" })
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Prompt Templates</h1>
        <Button onClick={() => setShowCreateForm(true)}>
          <Plus className="w-4 h-4 mr-2" />
          New Template
        </Button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search templates..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Create Form */}
      {showCreateForm && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Create New Template</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="Template Name"
              value={newTemplate.name}
              onChange={(e) =>
                setNewTemplate({ ...newTemplate, name: e.target.value })
              }
            />
            <Input
              placeholder="Description"
              value={newTemplate.description}
              onChange={(e) =>
                setNewTemplate({ ...newTemplate, description: e.target.value })
              }
            />
            <Input
              placeholder="Category"
              value={newTemplate.category}
              onChange={(e) =>
                setNewTemplate({ ...newTemplate, category: e.target.value })
              }
            />
            <Textarea
              placeholder="Prompt template (use {variable} for placeholders)"
              value={newTemplate.prompt}
              onChange={(e) =>
                setNewTemplate({ ...newTemplate, prompt: e.target.value })
              }
              rows={4}
            />
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateTemplate}>Create</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTemplates.map((template) => (
          <TemplateCard key={template.id} template={template} />
        ))}
      </div>
    </div>
  )
}