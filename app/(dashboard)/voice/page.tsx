"use client"
// app/(dashboard)/voice/page.tsx ke top pe ye import add karo
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Mic, Play, Square, Upload, Volume2 } from "lucide-react"
import { toast } from "sonner"

export default function VoicePage() {
  const [isRecording, setIsRecording] = useState(false)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [transcription, setTranscription] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const mediaRecorder = useRef<MediaRecorder | null>(null)
  const chunks = useRef<Blob[]>([])

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      mediaRecorder.current = new MediaRecorder(stream)
      chunks.current = []

      mediaRecorder.current.ondataavailable = (e) => {
        chunks.current.push(e.data)
      }

      mediaRecorder.current.onstop = () => {
        const blob = new Blob(chunks.current, { type: "audio/webm" })
        const url = URL.createObjectURL(blob)
        setAudioUrl(url)
        
        // Simulate transcription
        setIsProcessing(true)
        setTimeout(() => {
          setTranscription("This is a sample transcription of your recording.")
          setIsProcessing(false)
        }, 2000)
      }

      mediaRecorder.current.start()
      setIsRecording(true)
      toast.success("Recording started")
    } catch (error) {
      toast.error("Microphone access denied")
    }
  }

  const stopRecording = () => {
    if (mediaRecorder.current && isRecording) {
      mediaRecorder.current.stop()
      mediaRecorder.current.stream.getTracks().forEach(track => track.stop())
      setIsRecording(false)
    }
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold mb-2">Voice Processing</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Speech-to-text and text-to-speech with AssemblyAI and ElevenLabs
        </p>

        <Tabs defaultValue="stt" className="mb-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="stt">Speech to Text</TabsTrigger>
            <TabsTrigger value="tts">Text to Speech</TabsTrigger>
          </TabsList>

          <TabsContent value="stt">
            <Card className="p-6">
              <div className="space-y-6">
                <div className="flex justify-center gap-4">
                  {!isRecording ? (
                    <Button onClick={startRecording} size="lg" className="w-32">
                      <Mic className="w-4 h-4 mr-2" />
                      Record
                    </Button>
                  ) : (
                    <Button onClick={stopRecording} variant="destructive" size="lg" className="w-32">
                      <Square className="w-4 h-4 mr-2" />
                      Stop
                    </Button>
                  )}
                  
                  <Button variant="outline" size="lg" className="w-32">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload
                  </Button>
                </div>

                {audioUrl && (
                  <div className="space-y-4">
                    <audio controls src={audioUrl} className="w-full" />
                    
                    <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                      <h3 className="font-semibold mb-2">Transcription:</h3>
                      {isProcessing ? (
                        <div className="animate-pulse">Processing...</div>
                      ) : (
                        <p>{transcription}</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="tts">
            <Card className="p-6">
              <div className="space-y-4">
                <textarea
                  placeholder="Enter text to convert to speech..."
                  className="w-full p-3 border rounded-lg bg-background"
                  rows={4}
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <Select defaultValue="male">
                    <SelectTrigger>
                      <SelectValue placeholder="Voice type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="urdu">Urdu Voice</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select defaultValue="normal">
                    <SelectTrigger>
                      <SelectValue placeholder="Speed" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="slow">Slow</SelectItem>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="fast">Fast</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600">
                  <Volume2 className="w-4 h-4 mr-2" />
                  Generate Speech
                </Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  )
}