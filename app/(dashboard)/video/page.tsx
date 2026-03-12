"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Video, Play, Download } from "lucide-react"
import { toast } from "sonner"

export default function VideoPage() {
  const [prompt, setPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [videoUrl, setVideoUrl] = useState<string | null>(null)

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt")
      return
    }

    setIsGenerating(true)
    try {
      // Simulate video generation
      await new Promise(resolve => setTimeout(resolve, 5000))
      setVideoUrl("https://example.com/sample-video.mp4")
      toast.success("Video generated successfully!")
    } catch (error) {
      toast.error("Failed to generate video")
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
        <h1 className="text-3xl font-bold mb-2">Video Generation</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Generate videos from text descriptions
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Video Prompt</label>
                <Textarea
                  placeholder="Describe the video you want to create..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  rows={4}
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Duration (seconds)</label>
                <Input type="number" defaultValue={5} min={1} max={30} />
              </div>

              <Button 
                onClick={handleGenerate} 
                disabled={isGenerating}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600"
              >
                {isGenerating ? "Generating..." : "Generate Video"}
              </Button>
            </div>
          </Card>

          <Card className="p-6 flex flex-col">
            <div className="flex-1 min-h-[300px] bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
              {videoUrl ? (
                <video controls className="max-w-full max-h-[300px] rounded-lg">
                  <source src={videoUrl} type="video/mp4" />
                </video>
              ) : (
                <div className="text-center text-gray-500">
                  <Video className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Your generated video will appear here</p>
                </div>
              )}
            </div>
            
            {videoUrl && (
              <div className="flex gap-2 mt-4">
                <Button variant="outline" className="flex-1">
                  <Play className="w-4 h-4 mr-2" />
                  Preview
                </Button>
                <Button variant="outline" className="flex-1">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
            )}
          </Card>
        </div>
      </motion.div>
    </div>
  )
}