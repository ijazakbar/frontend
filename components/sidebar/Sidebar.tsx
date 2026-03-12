"use client"

import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme/ThemeToggle"
import { ConversationList } from "./ConversationList"
import { NewChatButton } from "./NewChatButton"
import {
  MessageSquare,
  BookOpen,
  Image,
  Video,
  Mic,
  Settings,
  LogOut,
  ChevronLeft,
  Bot,
  Home,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname()

  const navigation = [
    { name: "Home", href: "/", icon: Home },
    { name: "Chat", href: "/chat", icon: MessageSquare },
    { name: "Research", href: "/research", icon: BookOpen },
    { name: "Image Generation", href: "/image", icon: Image },
    { name: "Video Generation", href: "/video", icon: Video },
    { name: "Voice Processing", href: "/voice", icon: Mic },
    { name: "Settings", href: "/settings", icon: Settings },
  ]

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: isOpen ? 0 : -300 }}
        transition={{ type: "spring", damping: 20 }}
        className={cn(
          "fixed left-0 top-0 bottom-0 w-80 bg-card border-r z-50 lg:static lg:translate-x-0",
          "flex flex-col"
        )}
      >
        <div className="p-4 border-b flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg">PakChat</span>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="lg:hidden">
            <ChevronLeft className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-4">
          <NewChatButton />
        </div>

        <nav className="flex-1 overflow-y-auto p-4">
          <div className="space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  )}
                  onClick={() => onClose()}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </div>

          <div className="mt-8">
            <h3 className="text-sm font-medium text-muted-foreground mb-2 px-3">
              Recent Conversations
            </h3>
            <ConversationList />
          </div>
        </nav>

        <div className="p-4 border-t">
          <div className="flex items-center justify-between mb-4">
            <ThemeToggle />
            <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-100">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
          <div className="text-xs text-muted-foreground text-center">
            <p>PakChat v1.0.0</p>
            <p>© 2024 PakChat AI</p>
          </div>
        </div>
      </motion.aside>
    </>
  )
}