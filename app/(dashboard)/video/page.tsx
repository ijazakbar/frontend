import ClientOnly from "@/components/ClientOnly"
import VideoContent from "@/components/VideoContent"

export const dynamic = 'force-dynamic'

export default function VideoPage() {
  return (
    <ClientOnly>
      <VideoContent />
    </ClientOnly>
  )
}