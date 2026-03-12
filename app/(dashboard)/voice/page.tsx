import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const VoiceContent = dynamic(
  () => import('@/components/VoiceContent'),
  { 
    ssr: false,
    loading: () => <div className="container mx-auto p-6">Loading voice processor...</div>
  }
)

export default function VoicePage() {
  return (
    <Suspense fallback={<div className="container mx-auto p-6">Loading...</div>}>
      <VoiceContent />
    </Suspense>
  )
}