import ClientOnly from "@/components/ClientOnly"
import LoginContent from "@/components/LoginContent"

export const dynamic = 'force-dynamic'

export default function LoginPage() {
  return (
    <ClientOnly>
      <LoginContent />
    </ClientOnly>
  )
}