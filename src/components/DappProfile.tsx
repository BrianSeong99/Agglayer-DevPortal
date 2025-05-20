"use client";
import { DappData } from '@/data/dapps'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { useEffect, useState } from 'react'
import 'github-markdown-css/github-markdown.css'
import Button from './Button'

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
    if (walkthrough.endsWith('.md')) {
      fetch(walkthrough.startsWith('/') ? walkthrough : `/docs/${walkthrough}`)
        .then(res => res.text())
        .then(text => {
          setMarkdown(text)
        })
    } else {
      setMarkdown(walkthrough)
    }
  }, [walkthrough])

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

      {/* Links */}
      <div className="flex gap-2">
        <Button href={repoUrl} className="w-fit">
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
  