import { DappData } from '@/data/dapps'
import ReactMarkdown from 'react-markdown'
  
export default function DappProfile({
  logo,
  name,
  tagline,
  screenshots,
  description,
  bullets,
  repoUrl,
  walkthrough,
}: DappData) {
  return (
    <div className="max-w-5xl mx-auto space-y-10">
      {/* App Header */}
      <div className="flex items-center space-x-4">
        <img
          src={logo}
          alt={`${name} logo`}
          className="w-20 h-20 rounded-lg border"
        />
        <div>
          <h1 className="text-3xl font-bold">{name}</h1>
          <p className="text-gray-600">{tagline}</p>
        </div>
      </div>

      {/* Screenshots */}
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Screenshots</h2>
        <div className="flex space-x-4 overflow-x-auto pb-2">
          {screenshots.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`Screenshot ${i + 1}`}
              className="w-[400px] h-[250px] object-cover rounded-lg border"
            />
          ))}
        </div>
      </div>

      {/* Project Description */}
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Project Description</h2>
        <p className="text-gray-700">{description}</p>
        <ul className="list-disc list-inside text-gray-700 mt-2">
          {bullets.map((point, i) => <li key={i}>{point}</li>)}
        </ul>
      </div>

      {/* Code Walkthrough */}
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Code Walkthrough</h2>
        <a
          href={repoUrl}
          className="inline-block bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-800 transition"
          target="_blank"
        >
          🔗 View Source Code
        </a>
        <div className="prose prose-sm prose-pre:bg-gray-900 prose-pre:text-white prose-pre:p-0 prose-pre:m-0">
          <ReactMarkdown>{walkthrough}</ReactMarkdown>
        </div>
      </div>
    </div>
  )
}
  