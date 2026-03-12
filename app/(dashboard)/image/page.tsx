import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const ImageContent = dynamic(
  () => import('@/components/ImageContent'),
  { 
    ssr: false,
    loading: () => <div className="container mx-auto p-6">Loading image generator...</div>
  }
)

export default function ImagePage() {
  return (
    <Suspense fallback={<div className="container mx-auto p-6">Loading...</div>}>
      <ImageContent />
    </Suspense>
  )
}