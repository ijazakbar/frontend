// app/dashboard/page.tsx
"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Bot, MessageSquare, Image, FileText } from "lucide-react"

interface User {
  id: string
  email: string
  username?: string
}

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [stats, setStats] = useState({
    conversations: 0,
    messages: 0,
    images: 0,
    files: 0
  })

  useEffect(() => {
    // Get user from localStorage
    const userStr = localStorage.getItem('user')
    if (userStr) {
      setUser(JSON.parse(userStr))
    }

    // Fetch dashboard stats (optional)
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('token')
      if (!token) return

      const res = await fetch('https://pakchat-backend.onrender.com/api/user/stats', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      if (res.ok) {
        const data = await res.json()
        setStats(data)
      }
    } catch (error) {
      console.error('Error fetching stats:', error)
    }
  }

  const statsCards = [
    { 
      title: 'Conversations', 
      value: stats.conversations, 
      icon: MessageSquare,
      color: 'text-blue-500',
      bg: 'bg-blue-50',
      href: '/dashboard/chat'
    },
    { 
      title: 'Messages', 
      value: stats.messages, 
      icon: Bot,
      color: 'text-purple-500',
      bg: 'bg-purple-50',
      href: '/dashboard/chat'
    },
    { 
      title: 'Images', 
      value: stats.images, 
      icon: Image,
      color: 'text-green-500',
      bg: 'bg-green-50',
      href: '/dashboard/images'
    },
    { 
      title: 'Files', 
      value: stats.files, 
      icon: FileText,
      color: 'text-orange-500',
      bg: 'bg-orange-50',
      href: '/dashboard/files'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">
            Welcome back, {user?.username || user?.email?.split('@')[0]}! 👋
          </h2>
          <p className="text-gray-500 mt-1">
            Here's what's happening with your account
          </p>
        </div>
        
        <Button onClick={() => router.push('/dashboard/chat')}>
          <MessageSquare className="w-4 h-4 mr-2" />
          New Chat
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCards.map((stat) => (
          <Card 
            key={stat.title}
            className="p-6 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => router.push(stat.href)}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.title}</p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-lg ${stat.bg}`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Recent Conversations</h3>
          <p className="text-gray-500 text-center py-8">
            No conversations yet. Start a new chat!
          </p>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold mb-4">Quick Actions</h3>
          <div className="space-y-2">
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => router.push('/dashboard/chat')}
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Start New Chat
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => router.push('/dashboard/images')}
            >
              <Image className="w-4 h-4 mr-2" />
              Generate Image
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => router.push('/dashboard/files')}
            >
              <FileText className="w-4 h-4 mr-2" />
              Upload File
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}