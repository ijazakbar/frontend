import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const VideoContent = dynamic(
  () => import('@/components/VideoContent'),
  { 
    ssr: false,
    loading: () => <div className="container mx-auto p-6">Loading video generator...</div>
  }
)

export default function VideoPage() {
  return (
    <Suspense fallback={<div className="container mx-auto p-6">Loading...</div>}>
      <VideoContent />
    </Suspense>
  )
}