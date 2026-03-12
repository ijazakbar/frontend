import ClientOnly from "@/components/ClientOnly"
import ImageContent from "@/components/ImageContent"

export const dynamic = 'force-dynamic'

export default function ImagePage() {
  return (
    <ClientOnly>
      <ImageContent />
    </ClientOnly>
  )
}