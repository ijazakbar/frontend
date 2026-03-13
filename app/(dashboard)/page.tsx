// app/(dashboard)/page.tsx - Simple Version
"use client"

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
  const router = useRouter()
  
  return (
    <div className="space-y-6 p-6">
      <h1 className="text-3xl font-bold">Welcome to Dashboard</h1>
      <p>Your dashboard is now working! 🎉</p>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button onClick={() => router.push('/chat')} className="p-4 border rounded-lg">
          💬 Chat
        </button>
        <button onClick={() => router.push('/video')} className="p-4 border rounded-lg">
          🎥 Video
        </button>
        <button onClick={() => router.push('/image')} className="p-4 border rounded-lg">
          🖼️ Image
        </button>
        <button onClick={() => router.push('/voice')} className="p-4 border rounded-lg">
          🎤 Voice
        </button>
      </div>
    </div>
  )
}