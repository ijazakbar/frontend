// app/auth/login/page.tsx
import LoginContent from "@/components/LoginContent"

export const dynamic = 'force-dynamic'
export const revalidate = 0  // No caching

export const metadata = {
  title: 'Login | PakChat',
  description: 'Sign in to your PakChat account',
}

export default function LoginPage() {
  return <LoginContent />
}