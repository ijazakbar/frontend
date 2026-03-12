import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const SettingsContent = dynamic(
  () => import('@/components/SettingsContent'),
  { 
    ssr: false,
    loading: () => <div className="container mx-auto p-6">Loading settings...</div>
  }
)

export default function SettingsPage() {
  return (
    <Suspense fallback={<div className="container mx-auto p-6">Loading...</div>}>
      <SettingsContent />
    </Suspense>
  )
}