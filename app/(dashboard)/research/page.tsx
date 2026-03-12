import dynamic from 'next/dynamic'

const ResearchContent = dynamic(
  () => import('@/components/ResearchContent'),
  { ssr: false }
)

export default function ResearchPage() {
  return <ResearchContent />
}