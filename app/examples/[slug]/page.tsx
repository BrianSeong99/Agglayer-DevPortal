"use client";
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, 
  ExternalLink, 
  Github, 
  Book, 
  ChevronLeft, 
  ChevronRight,
  Code,
  Zap,
  Shield,
  Globe
} from 'lucide-react'
import { dapps } from '@/app/examples/data/dapps'
import PageLayout from '@/shared/components/layouts/PageLayout'
import { useState, useEffect } from 'react'

export default function DappDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = params
  const data = dapps[slug]
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [markdownContent, setMarkdownContent] = useState<string>('')

  if (!data) {
    return notFound()
  }

  useEffect(() => {
    if (data.walkthrough) {
      fetch(data.walkthrough)
        .then(res => res.text())
        .then(text => setMarkdownContent(text))
        .catch(err => console.error('Failed to load documentation:', err))
    }
  }, [data.walkthrough])

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % data.screenshots.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + data.screenshots.length) % data.screenshots.length)
  }

  // Simple markdown to HTML converter
  const parseMarkdown = (markdown: string): string => {
    let html = markdown
      // Headers
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      // Bold
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      // Code blocks
      .replace(/```(.*?)```/gs, '<pre><code>$1</code></pre>')
      // Inline code
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      // Line breaks
      .replace(/\n\n/g, '</p><p>')
      // Lists
      .replace(/^\* (.+)$/gim, '<li>$1</li>')
      // Horizontal rules
      .replace(/^---$/gim, '<hr>')
    
    // Wrap lists
    html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
    
    // Wrap in paragraphs
    html = '<p>' + html + '</p>'
    
    // Clean up
    html = html
      .replace(/<p><h/g, '<h')
      .replace(/<\/h(\d)><\/p>/g, '</h$1>')
      .replace(/<p><ul>/g, '<ul>')
      .replace(/<\/ul><\/p>/g, '</ul>')
      .replace(/<p><pre>/g, '<pre>')
      .replace(/<\/pre><\/p>/g, '</pre>')
      .replace(/<p><hr><\/p>/g, '<hr>')
    
    return html
  }

  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto px-6 pb-20">
        {/* Back Link */}
        <Link 
          href="/examples" 
          className="inline-flex items-center gap-2 mb-8 text-[#D9D9D9]/80 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Examples</span>
        </Link>

        {/* Custom Header with Logo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-start gap-4 mb-10 mt-10"
        >
          {data.logo && (
            <img 
              src={data.logo} 
              alt={data.name} 
              className="w-20 h-20 rounded-2xl shadow-lg" 
            />
          )}
          <div className="flex-1">
            <h1 className="text-5xl font-bold text-white mb-3">{data.name}</h1>
            <p className="text-lg text-[#D9D9D9]/80">{data.tagline}</p>
          </div>
        </motion.div>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid lg:grid-cols-2 gap-12 mb-12"
        >
          {/* Screenshots Carousel */}
          <div className="relative p-6 rounded-2xl bg-gray-900/30 backdrop-blur-md border border-gray-800">
            {data.screenshots.length > 0 ? (
              <div className="relative aspect-video bg-gray-900 rounded-2xl overflow-hidden border border-gray-800">
                <img
                  src={data.screenshots[currentImageIndex]}
                  alt={`${data.name} screenshot ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover"
                />
                {data.screenshots.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {data.screenshots.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-2 h-2 rounded-full transition-colors ${
                            index === currentImageIndex ? 'bg-white' : 'bg-white/40'
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="aspect-video bg-gray-900 rounded-2xl flex items-center justify-center border border-gray-800">
                <div className="text-center">
                  {data.logo ? (
                    <img src={data.logo} alt={data.name} className="w-32 h-32 mx-auto mb-4" />
                  ) : (
                    <div className="w-32 h-32 bg-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Code className="w-16 h-16 text-gray-600" />
                    </div>
                  )}
                  <p className="text-[#D9D9D9]/60">No screenshots available</p>
                </div>
              </div>
            )}
          </div>

          {/* Details */}
          <div className="p-6 rounded-2xl bg-gray-900/30 backdrop-blur-md border border-gray-800">
            <p className="text-[#D9D9D9]/70 mb-8 leading-relaxed">
              {data.description}
            </p>

            {/* Key Features */}
            {data.bullets && data.bullets.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-white mb-4">Key Features</h3>
                <div className="space-y-3">
                  {data.bullets.map((bullet, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#0071F7] mt-2 flex-shrink-0" />
                      <span className="text-[#D9D9D9]/80">{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              {data.repoUrl && (
                <a
                  href={data.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-xl transition-colors"
                >
                  <Github className="w-5 h-5" />
                  View on GitHub
                </a>
              )}
              {data.appUrl && (
                <a
                  href={data.appUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#0071F7] hover:bg-[#0071F7]/90 text-white font-medium rounded-xl transition-colors"
                >
                  <ExternalLink className="w-5 h-5" />
                  Try App
                </a>
              )}
            </div>

          </div>
        </motion.div>

        {/* Documentation Content - Full Width */}
        {data.walkthrough && markdownContent && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 p-8 rounded-2xl bg-gray-900/30 backdrop-blur-md border border-gray-800"
          >
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <Book className="w-5 h-5" />
              Documentation
            </h3>
            <div className="prose prose-invert prose-gray max-w-none
              prose-headings:text-white prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl
              prose-p:text-[#D9D9D9]/80 prose-p:leading-relaxed
              prose-strong:text-white prose-strong:font-semibold
              prose-code:text-[#0071F7] prose-code:bg-gray-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
              prose-pre:bg-gray-900 prose-pre:border prose-pre:border-gray-800
              prose-li:text-[#D9D9D9]/80 prose-li:marker:text-[#0071F7]
              prose-blockquote:border-l-[#0071F7] prose-blockquote:text-[#D9D9D9]/60"
            >
              <div dangerouslySetInnerHTML={{ __html: parseMarkdown(markdownContent) }} />
            </div>
          </motion.div>
        )}

      </div>
    </PageLayout>
  )
}
