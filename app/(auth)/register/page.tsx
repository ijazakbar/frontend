import dynamic from 'next/dynamic'

const RegisterContent = dynamic(
  () => import('@/components/RegisterContent'),
  { ssr: false }
)

export default function RegisterPage() {
  return <RegisterContent />
}