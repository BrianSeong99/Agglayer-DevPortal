"use client";
import { DappData } from '@/app/dashboard/examples/data/dapps'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { useEffect, useState } from 'react'
import 'github-markdown-css/github-markdown.css'
import Button from '@/shared/components/Button'

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
  const [markdown, setMarkdown] = useState('')

  useEffect(() => {
    if (typeof walkthrough === 'string' && walkthrough.endsWith('.md')) {
      fetch(walkthrough.startsWith('/') ? walkthrough : `/docs/${walkthrough}`)
        .then(res => res.text())
        .then(text => {
          setMarkdown(text)
        })
    } else {
      setMarkdown(typeof walkthrough === 'string' ? walkthrough : '')
    }
  }, [walkthrough])

  // Determine the app URL based on the app name
  const getAppUrl = () => {
    if (name === 'AggSwap') {
      return '/dashboard/examples/aggswap-app'
    }
    // Default to repo URL for other apps
    return repoUrl
  }

  return (
    <div className="max-w-5xl mx-auto space-y-10">
      {/* App Header */}
      <div className="flex items-center space-x-4">
        <img
          src={logo}
          alt={`${name} logo`}
          className="w-20 h-20 rounded-lg"
        />
        <div>
          <h1 className="text-3xl font-bold">{name}</h1>
          <p className="text-[var(--text-secondary)]">{tagline}</p>
        </div>
      </div>

      {/* Links */}
      <div className="flex gap-2">
        <Button href={getAppUrl()} className="w-fit">
          ▶️ Try the App
        </Button>
        <Button href={repoUrl} className="w-fit">
          🔗 View Source Code
        </Button>
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
              className="w-[400px] h-[250px] object-cover rounded-lg"
            />
          ))}
        </div>
      </div>

      {/* Project Description */}
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Project Description</h2>
        <p className="text-[var(--text-secondary)]">{description}</p>
        <ul className="list-disc list-inside text-[var(--text-secondary)] mt-2">
          {bullets.map((point, i) => <li key={i}>{point}</li>)}
        </ul>
      </div>

      {/* Project Walkthrough */}
      <hr className="my-8 border-t border-gray-200" />
      <div
        className="rounded-2xl p-6 mt-4"
        style={{ background: 'var(--bg-card)', color: 'var(--text-main)', boxShadow: 'var(--shadow-card)' }}
      >
        <div className="markdown-body" style={{ padding: 0 }}>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {markdown}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  )
}
  