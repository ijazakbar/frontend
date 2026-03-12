import dynamic from 'next/dynamic'

const ImageContent = dynamic(
  () => import('@/components/ImageContent'),
  { ssr: false }
)

export default function ImagePage() {
  return <ImageContent />
}