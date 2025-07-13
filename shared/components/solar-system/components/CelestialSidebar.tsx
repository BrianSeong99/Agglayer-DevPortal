import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

interface CelestialSidebarProps {
  isOpen: boolean
  onClose: () => void
  celestialBody: {
    type: 'sun' | 'planet'
    data?: any
  } | null
}

const CelestialSidebar = ({ isOpen, onClose, celestialBody }: CelestialSidebarProps) => {
  return (
    <AnimatePresence mode="wait">
      {isOpen && celestialBody && (
        <motion.div
          initial={{ x: -400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -400, opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          className="w-full h-full"
          style={{ 
            padding: '0px' // Remove padding since it's handled by the Html component
          }}
        >
          <div className="relative h-full w-full rounded-2xl border border-gray-700 bg-black/30 backdrop-blur-xs overflow-hidden">
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-10 rounded-lg bg-white/10 p-2 transition-colors hover:bg-white/20"
            >
              <X className="h-5 w-5 text-white" />
            </button>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="flex h-full w-full flex-col p-8"
            >
              {celestialBody.type === 'sun' ? (
                <div className="text-white">
                  <h2 className="mb-4 text-3xl font-bold">Agglayer Sun</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-300">Type</h3>
                      <p className="text-gray-400">Central Hub</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-300">Description</h3>
                      <p className="text-gray-400">The Agglayer serves as the central hub connecting all blockchain networks in the ecosystem.</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-300">Properties</h3>
                      <ul className="list-inside list-disc space-y-1 text-gray-400">
                        <li>Gravitational center of the network</li>
                        <li>Coordinates cross-chain communication</li>
                        <li>Maintains network consensus</li>
                      </ul>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-white">
                  <h2 className="mb-4 text-3xl font-bold">{celestialBody.data?.name || 'Unknown Planet'}</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-300">Chain ID</h3>
                      <p className="text-gray-400">{celestialBody.data?.chainId || 'N/A'}</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-300">Rollup ID</h3>
                      <p className="text-gray-400">{celestialBody.data?.rollupId || 'N/A'}</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-300">Network Status</h3>
                      <p className="text-gray-400">{celestialBody.data?.networkLiveness || 'Unknown'}</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-300">Verifier Type</h3>
                      <p className="text-gray-400">{celestialBody.data?.rollupVerifierType || 'N/A'}</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-300">Last Verified</h3>
                      <p className="text-gray-400">{celestialBody.data?.lastVerified || 'N/A'}</p>
                    </div>
                    {celestialBody.data?.sequencerUrl && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-300">Sequencer URL</h3>
                        <p className="break-all text-sm text-gray-400">{celestialBody.data.sequencerUrl}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default CelestialSidebar