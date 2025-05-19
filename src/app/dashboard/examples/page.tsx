import { dapps } from '@/data/dapps'
import Link from 'next/link'

export default function ExamplesListPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dapp Examples</h1>
      <ul className="space-y-4">
        {Object.entries(dapps).map(([slug, dapp]) => (
          <li key={slug} className="p-4 rounded shadow bg-white flex items-center">
            <img src={dapp.logo} alt={dapp.name} className="w-12 h-12 rounded mr-4" />
            <div className="flex-1">
              <Link href={`/dashboard/examples/${slug}`} className="text-lg font-semibold hover:underline">
                {dapp.name}
              </Link>
              <div className="text-gray-500">{dapp.tagline}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
