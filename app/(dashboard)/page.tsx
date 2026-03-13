// app/(dashboard)/page.tsx
"use client"

// 👇 Import paths sahi karo
import ChatContent from "@/components/chat/ChatContent"  // /chat folder mein hai
import VideoContent from "@/components/VideoContent"     // direct components mein
import ImageContent from "@/components/ImageContent"      // direct components mein
import VoiceContent from "@/components/VoiceContent"      // agar exist karta hai to
import ResearchContent from "@/components/ResearchContent" // direct components mein
import SettingsContent from "@/components/SettingsContent" // direct components mein

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
  const router = useRouter()
  
  return (
    <div className="space-y-6 p-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white"
      >
        <h2 className="text-3xl font-bold mb-2">Welcome Back! 👋</h2>
        <p className="text-white/90 text-lg">
          Chat, Create, Research, Generate Voice — All in One Place
        </p>
      </motion.div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <QuickActionCard
          title="Chat"
          description="Start a conversation"
          icon="💬"
          href="/chat"
        />
        <QuickActionCard
          title="Video"
          description="Generate videos"
          icon="🎥"
          href="/video"
        />
        <QuickActionCard
          title="Image"
          description="Create images"
          icon="🖼️"
          href="/image"
        />
        <QuickActionCard
          title="Voice"
          description="Text to speech"
          icon="🎤"
          href="/voice"
        />
        <QuickActionCard
          title="Research"
          description="Deep research"
          icon="📚"
          href="/research"
        />
      </div>

      {/* Main Content Area - Conditional Rendering */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chat Section - Check if component exists */}
        <div className="lg:col-span-2 bg-card rounded-xl border p-4">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span>💬</span> Recent Chats
          </h3>
          {typeof ChatContent !== 'undefined' ? <ChatContent /> : <p>Chat component loading...</p>}
        </div>

        {/* Settings */}
        <div className="space-y-4">
          <div className="bg-card rounded-xl border p-4">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span>⚙️</span> Quick Settings
            </h3>
            {typeof SettingsContent !== 'undefined' ? <SettingsContent /> : <p>Settings loading...</p>}
          </div>
        </div>
      </div>

      {/* Voice Section */}
      <div className="bg-card rounded-xl border p-4">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <span>🎤</span> Voice Studio
        </h3>
        {typeof VoiceContent !== 'undefined' ? <VoiceContent /> : (
          <div className="text-center py-8 text-muted-foreground">
            Voice feature coming soon...
          </div>
        )}
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card rounded-xl border p-4">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span>🎥</span> Recent Videos
          </h3>
          {typeof VideoContent !== 'undefined' ? <VideoContent /> : <p>No videos yet</p>}
        </div>
        <div className="bg-card rounded-xl border p-4">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span>🖼️</span> Recent Images
          </h3>
          {typeof ImageContent !== 'undefined' ? <ImageContent /> : <p>No images yet</p>}
        </div>
        <div className="bg-card rounded-xl border p-4">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span>📚</span> Research
          </h3>
          {typeof ResearchContent !== 'undefined' ? <ResearchContent /> : <p>No research yet</p>}
        </div>
      </div>
    </div>
  )
}

function QuickActionCard({ title, description, icon, href }: {
  title: string
  description: string
  icon: string
  href: string
}) {
  const router = useRouter()
  
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => router.push(href)}
      className="bg-card border rounded-xl p-4 cursor-pointer hover:shadow-lg transition-all"
    >
      <div className="text-3xl mb-2">{icon}</div>
      <h4 className="font-semibold text-sm">{title}</h4>
      <p className="text-xs text-muted-foreground">{description}</p>
    </motion.div>
  )
}