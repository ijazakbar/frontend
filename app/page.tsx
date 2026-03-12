"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Bot, Sparkles, Globe, Zap, Shield, Brain } from "lucide-react"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null // SSR mismatch avoid karne ke liye
  }

  const features = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: "Multi-LLM Support",
      description: "Access OpenAI, Google, Groq, Anthropic and 20+ other AI models",
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Multi-Language",
      description: "Urdu, Hindi, English, Arabic, Bengali and more",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Lightning Fast",
      description: "Streaming responses with real-time updates",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Enterprise Security",
      description: "Bank-grade encryption and rate limiting",
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Multi-Modal",
      description: "Chat, Images, Videos, Voice, Research",
    },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            PakChat AI
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mt-6 max-w-3xl mx-auto">
            World's Most Intelligent AI Assistant. Chat, Research, Generate Images, Videos, Voice — All in One Place.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <Link href="/chat">
              <Button size="lg" className="text-lg px-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Start Chatting <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/login">  {/* 👈 SIRF YEH CHANGE KIYA /auth/login se /login */}
              <Button size="lg" variant="outline" className="text-lg px-8">
                Sign In
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">Everything you need in one AI platform</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  )
}
