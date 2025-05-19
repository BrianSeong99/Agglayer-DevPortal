import { dapps } from '@/data/dapps'
import DappProfile from '@/components/DappProfile'
import { notFound } from 'next/navigation'
import Button from '@/components/Button'
import { FaArrowLeft } from 'react-icons/fa'

export default async function DappDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = await params
  const data = dapps[slug]
  if (!data) return notFound()

  return (
    <div>
      <Button href="/dashboard/examples" className="mb-4 min-w-0 w-fit px-3 py-2 font-medium">
        <FaArrowLeft />
      </Button>
      <DappProfile {...data} />
    </div>
  )
}
