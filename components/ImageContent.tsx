"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card } from "@/components/ui/card"
import { Image as ImageIcon, Download, Sparkles } from "lucide-react"
import { toast } from "sonner"

export default function ImageContent() {
  const [prompt, setPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)
  const [model, setModel] = useState("replicate")
  const [size, setSize] = useState("1024x1024")

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt")
      return
    }

    setIsGenerating(true)
    try {
      // Simulate image generation
      await new Promise(resolve => setTimeout(resolve, 3000))
      setGeneratedImage("https://via.placeholder.com/1024x1024.png?text=Generated+Image")
      toast.success("Image generated successfully!")
    } catch (error) {
      toast.error("Failed to generate image")
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold mb-2">Image Generation</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Create stunning images with Replicate and FAL.ai
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Left Panel - Controls */}
          <Card className="p-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Model</label>
                <Select value={model} onValueChange={setModel}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select model" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="replicate">Replicate (SDXL)</SelectItem>
                    <SelectItem value="fal">FAL.ai (SDXL)</SelectItem>
                    <SelectItem value="dalle">DALL-E 3</SelectItem>
                    <SelectItem value="midjourney">Midjourney Style</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Image Size</label>
                <Select value={size} onValueChange={setSize}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1024x1024">1024x1024 (Square)</SelectItem>
                    <SelectItem value="1024x768">1024x768 (Landscape)</SelectItem>
                    <SelectItem value="768x1024">768x1024 (Portrait)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Prompt</label>
                <Textarea
                  placeholder="Describe the image you want to generate..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  rows={4}
                />
              </div>

              <Button 
                onClick={handleGenerate} 
                disabled={isGenerating}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600"
              >
                {isGenerating ? (
                  <>Generating...</>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generate Image
                  </>
                )}
              </Button>
            </div>
          </Card>

          {/* Right Panel - Preview */}
          <Card className="p-6 flex flex-col">
            <div className="flex-1 min-h-[400px] bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
              {generatedImage ? (
                <img 
                  src={generatedImage} 
                  alt="Generated" 
                  className="max-w-full max-h-[400px] rounded-lg"
                />
              ) : (
                <div className="text-center text-gray-500">
                  <ImageIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Your generated image will appear here</p>
                </div>
              )}
            </div>
            
            {generatedImage && (
              <Button variant="outline" className="mt-4">
                <Download className="w-4 h-4 mr-2" />
                Download Image
              </Button>
            )}
          </Card>
        </div>
      </motion.div>
    </div>
  )
}