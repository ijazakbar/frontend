import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const RegisterContent = dynamic(
  () => import('@/components/RegisterContent'),
  { 
    ssr: false,
    loading: () => <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }
)

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <RegisterContent />
    </Suspense>
  )
}