import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const LoginContent = dynamic(
  () => import('@/components/LoginContent'),
  { 
    ssr: false,
    loading: () => <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }
)

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <LoginContent />
    </Suspense>
  )
}