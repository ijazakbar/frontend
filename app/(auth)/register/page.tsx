import RegisterContent from "@/components/RegisterContent"

export const dynamic = 'force-dynamic'
export const revalidate = 0  // No caching

// ✅ ADD METADATA (important for SEO)
export const metadata = {
  title: 'Register | PakChat',
  description: 'Create your PakChat account and start your AI journey',
  openGraph: {
    title: 'Register | PakChat',
    description: 'Create your PakChat account',
    images: ['/og-image.png'],
  },
  robots: {
    index: false,  // Don't index register page
    follow: false,
  },
}

export default function RegisterPage() {
  return <RegisterContent />
}