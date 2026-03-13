// app/(dashboard)/page.tsx
"use client"

import { ChatContent } from "@/components/chat/ChatContent"
import { VideoContent } from "@/components/VideoContent"
import { ImageContent } from "@/components/ImageContent"
import { ResearchContent } from "@/components/ResearchContent"
import { SettingsContent } from "@/components/SettingsContent"
import { motion } from "framer-motion"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white"
      >
        <h2 className="text-3xl font-bold mb-2">Welcome Back! 👋</h2>
        <p className="text-white/90 text-lg">
          What would you like to explore today?
        </p>
      </motion.div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <QuickActionCard
          title="Chat"
          description="Start a conversation"
          icon="💬"
          href="/chat"
        />
        <QuickActionCard
          title="Generate Video"
          description="Create amazing videos"
          icon="🎥"
          href="/video"
        />
        <QuickActionCard
          title="Create Image"
          description="Generate stunning images"
          icon="🖼️"
          href="/image"
        />
        <QuickActionCard
          title="Research"
          description="Deep dive into topics"
          icon="📚"
          href="/research"
        />
      </div>

      {/* Main Content Area - Tumhare Components */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chat Section */}
        <div className="lg:col-span-2 bg-card rounded-xl border p-4">
          <h3 className="text-lg font-semibold mb-4">Recent Chats</h3>
          <ChatContent />
        </div>

        {/* Settings/Quick Access */}
        <div className="space-y-4">
          <div className="bg-card rounded-xl border p-4">
            <h3 className="text-lg font-semibold mb-4">Quick Settings</h3>
            <SettingsContent />
          </div>
        </div>
      </div>

      {/* Media Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-card rounded-xl border p-4">
          <h3 className="text-lg font-semibold mb-4">Recent Videos</h3>
          <VideoContent />
        </div>
        <div className="bg-card rounded-xl border p-4">
          <h3 className="text-lg font-semibold mb-4">Recent Images</h3>
          <ImageContent />
        </div>
      </div>

      {/* Research Section */}
      <div className="bg-card rounded-xl border p-4">
        <h3 className="text-lg font-semibold mb-4">Ongoing Research</h3>
        <ResearchContent />
      </div>
    </div>
  )
}

// Quick Action Card Component
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
      <div className="text-4xl mb-2">{icon}</div>
      <h4 className="font-semibold">{title}</h4>
      <p className="text-sm text-muted-foreground">{description}</p>
    </motion.div>
  )
}