import ClientOnly from "@/components/ClientOnly"
import RegisterContent from "@/components/RegisterContent"

export const dynamic = 'force-dynamic'

export default function RegisterPage() {
  return (
    <ClientOnly>
      <RegisterContent />
    </ClientOnly>
  )
}