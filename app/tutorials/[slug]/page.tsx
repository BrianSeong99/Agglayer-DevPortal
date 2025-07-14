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
import { dapps } from '@/app/tutorials/data/dapps'
import DashboardLayout from '@/shared/components/dashboard/DashboardLayout'
import DashboardHeader from '@/shared/components/dashboard/DashboardHeader'
import { useState } from 'react'

export default function DappDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = params
  const data = dapps[slug]
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  if (!data) {
    return notFound()
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % data.screenshots.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + data.screenshots.length) % data.screenshots.length)
  }

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-6 pb-20">
        <DashboardHeader 
          title={data.name}
          subtitle={data.tagline}
        />
        {/* Back Link */}
        <Link 
          href="/tutorials" 
          className="inline-flex items-center gap-2 mb-8 text-[#D9D9D9]/80 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Examples</span>
        </Link>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid lg:grid-cols-2 gap-12 mb-12"
        >
          {/* Screenshots Carousel */}
          <div className="relative">
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
          <div>
            <div className="flex items-start gap-4 mb-6">
              {data.logo && (
                <img 
                  src={data.logo} 
                  alt={data.name} 
                  className="w-20 h-20 rounded-2xl shadow-lg" 
                />
              )}
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-white mb-2">{data.name}</h1>
                <p className="text-lg text-[#D9D9D9]/80">{data.tagline}</p>
              </div>
            </div>

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
              {data.walkthrough && (
                <a
                  href={data.walkthrough}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#0071F7] hover:bg-[#0071F7]/90 text-white font-medium rounded-xl transition-colors"
                >
                  <Book className="w-5 h-5" />
                  Read Documentation
                </a>
              )}
            </div>
          </div>
        </motion.div>

        {/* Technical Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid md:grid-cols-3 gap-6"
        >
          <div className="p-6 bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-gradient-to-br from-[#0071F7] to-[#0071F7]/80 text-white">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-white">Performance</h3>
            </div>
            <p className="text-[#D9D9D9]/70">
              Built for speed and scalability with cross-chain capabilities powered by Agglayer
            </p>
          </div>

          <div className="p-6 bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-gradient-to-br from-white to-white/80 text-black">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-white">Security</h3>
            </div>
            <p className="text-[#D9D9D9]/70">
              Leveraging Agglayer's unified security model for safe cross-chain operations
            </p>
          </div>

          <div className="p-6 bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-gradient-to-br from-[#0071F7] to-white text-white">
                <Globe className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-white">Interoperability</h3>
            </div>
            <p className="text-[#D9D9D9]/70">
              Seamless integration with multiple chains through Agglayer's unified bridge
            </p>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  )
}
