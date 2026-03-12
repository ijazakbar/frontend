import dynamic from 'next/dynamic'

const VoiceContent = dynamic(
  () => import('@/components/VoiceContent'),
  { ssr: false }
)

export default function VoicePage() {
  return <VoiceContent />
}