import ClientOnly from "@/components/ClientOnly"
import SettingsContent from "@/components/SettingsContent"

export const dynamic = 'force-dynamic'

export default function SettingsPage() {
  return (
    <ClientOnly>
      <SettingsContent />
    </ClientOnly>
  )
}