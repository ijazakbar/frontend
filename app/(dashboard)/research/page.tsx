import ClientOnly from "@/components/ClientOnly"
import ResearchContent from "@/components/ResearchContent"

export const dynamic = 'force-dynamic'

export default function ResearchPage() {
  return (
    <ClientOnly>
      <ResearchContent />
    </ClientOnly>
  )
}