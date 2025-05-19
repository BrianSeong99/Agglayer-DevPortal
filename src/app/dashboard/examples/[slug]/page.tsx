import { dapps } from '@/data/dapps'
import DappProfile from '@/components/DappProfile'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import fs from 'fs'
import path from 'path'

export default async function DappDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = await params
  const data = dapps[slug]
  if (!data) return notFound()

  // If walkthrough is a file path, read the file content
  let walkthroughContent = data.walkthrough
  if (walkthroughContent.endsWith('.md')) {
    const filePath = path.join(process.cwd(), walkthroughContent)
    walkthroughContent = fs.readFileSync(filePath, 'utf8')
  }

  return (
    <div>
      <Link href="/dashboard/examples" className="inline-block mb-4 px-4 py-2 rounded text-black font-medium shadow hover:bg-yellow-400 transition">←</Link>
      <DappProfile {...data} walkthrough={walkthroughContent} />
    </div>
  )
}
