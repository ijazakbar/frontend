import dynamic from 'next/dynamic'

const VideoContent = dynamic(
  () => import('@/components/VideoContent'),
  { ssr: false }
)

export default function VideoPage() {
  return <VideoContent />
}