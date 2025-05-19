import { dapps } from '@/data/dapps'
import DappProfile from '@/components/DappProfile'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export default function DappDetailPage({ params }: { params: { slug: string } }) {
  const data = dapps[params.slug]
  if (!data) return notFound()
  return (
    <div>
      <Link href="/dashboard/examples" className="inline-block mb-4 px-4 py-2 rounded text-black font-medium shadow hover:bg-yellow-400 transition">←</Link>
      <DappProfile {...data} />
    </div>
  )
}
