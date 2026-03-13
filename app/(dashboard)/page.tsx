
"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
  const router = useRouter()

  useEffect(() => {
    // Check authentication
    const user = localStorage.getItem('user')
    if (!user) {
      router.push('/auth/login')
    }
  }, [])

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      {/* Dashboard content */}
    </div>
  )
}