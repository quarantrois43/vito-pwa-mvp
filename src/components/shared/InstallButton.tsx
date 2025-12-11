'use client'

import { useState, useEffect } from 'react'
import { Download } from 'lucide-react'

export const InstallButton: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setShowButton(true)
    }

    window.addEventListener('beforeinstallprompt', handler)
    
    // EN DÉVELOPPEMENT : Toujours afficher le bouton pour tester l'UI
    if (process.env.NODE_ENV === 'development') {
      setShowButton(true)
    }
    
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) {
      alert("L'installation PWA n'est disponible qu'en production (HTTPS)")
      return
    }

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice

    setDeferredPrompt(null)
    setShowButton(false)
  }

  if (!showButton) return null

  return (
    <button
      onClick={handleInstall}
      className="group bg-primary text-white rounded-xl px-4 py-2.5 flex items-center gap-2 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 active:scale-95"
    >
      <Download className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={1.5} />
      <span className="text-sm font-semibold">Installer</span>
    </button>
  )
}