"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

const TabsContext = React.createContext<{
  value: string
  onValueChange: (value: string) => void
} | null>(null)

export const Tabs = ({ 
  value, 
  onValueChange, 
  children,
  className 
}: { 
  value: string
  onValueChange: (value: string) => void
  children: React.ReactNode
  className?: string 
}) => {
  return (
    <TabsContext.Provider value={{ value, onValueChange }}>
      <div className={cn("tabs", className)}>{children}</div>
    </TabsContext.Provider>
  )
}

export const TabsList = ({ 
  children,
  className 
}: { 
  children: React.ReactNode
  className?: string 
}) => {
  return <div className={cn("tabs-list", className)}>{children}</div>
}

export const TabsTrigger = ({ 
  value, 
  children,
  className 
}: { 
  value: string
  children: React.ReactNode
  className?: string 
}) => {
  const context = React.useContext(TabsContext)
  return (
    <button
      className={cn(
        "tabs-trigger", 
        context?.value === value ? 'active' : '',
        className
      )}
      onClick={() => context?.onValueChange(value)}
    >
      {children}
    </button>
  )
}

export const TabsContent = ({ 
  value, 
  children,
  className 
}: { 
  value: string
  children: React.ReactNode
  className?: string 
}) => {
  const context = React.useContext(TabsContext)
  if (context?.value !== value) return null
  return <div className={cn("tabs-content", className)}>{children}</div>
}