// "use client";
import DappProfile from '@/app/examples/components/DappProfile'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { dapps } from '@/app/examples/data/dapps'
import DashboardLayout from '@/shared/components/dashboard/DashboardLayout'

export default async function DappDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  // Await the params as required by Next.js 15
  const { slug } = await params
  const data = dapps[slug]

  if (!data) {
    return notFound()
  }

  return (
    <DashboardLayout>
      <Link href="/examples" className="inline-block mb-4 px-4 py-2 rounded text-black font-medium shadow hover:bg-yellow-400 transition">←</Link>
      <DappProfile {...data} />
    </DashboardLayout>
  )
}
