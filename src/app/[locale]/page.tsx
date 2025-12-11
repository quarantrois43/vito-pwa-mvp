'use client'

import { useEffect } from 'react'
import { MainButtons } from '@/components/home/MainButtons'
import { QuickActions } from '@/components/home/QuickActions'
import { TrustBadges } from '@/components/home/TrustBadges'
import { InstallPrompt } from '@/components/layout/InstallPrompt'
import { OfflineBanner } from '@/components/ui/OfflineBanner'
import { PromotionPopup } from '@/components/promotions/PromotionPopup'
import { usePromotionPopup } from '@/lib/hooks/usePromotionPopup'
import { promotions } from '@/data/promotions'

export default function HomePage() {
  const { showPopup, selectedPromotion, initializePopup, closePopup } = usePromotionPopup()

  useEffect(() => {
    // Initialiser la popup avec vos données de promotions
    initializePopup(promotions)
  }, [initializePopup])

  return (
    <main className="min-h-screen bg-neutral-50 dark:bg-dark-bg pt-14 sm:pt-16">
      <OfflineBanner />
      <InstallPrompt />
      
      {/* Popup promotion */}
      {showPopup && selectedPromotion && (
        <PromotionPopup
          promotion={selectedPromotion}
          onClose={closePopup}
        />
      )}

      {/* Bannière */}
      <div className="relative min-h-[70vh] sm:min-h-[80vh] flex flex-col justify-center overflow-hidden bg-gradient-to-br from-primary/5 to-primary/10">
        {/* Contenu centré */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Titre principal */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-neutral-900 dark:text-white mb-4 tracking-tight animate-slide-up">
              VITO
            </h1>
            
            {/* Sous-titre */}
            <h2 className="text-lg sm:text-xl md:text-2xl font-medium text-neutral-700 dark:text-neutral-300 mb-6 tracking-tight animate-slide-up" style={{ animationDelay: '0.05s' }}>
              Rapide. Fiable. Centré sur l'essentiel.
            </h2>
            
            {/* Paragraphe descriptif */}
            <p className="text-base text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-2xl mx-auto mb-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              VITO transforme votre expérience Vitogaz. Quatre boutons simples vous donnent un contrôle total : trouver un revendeur, commander en ligne, être au courant des promotions et gérer votre prêt PAMF pour acheter votre gaz.
            </p>
            
            {/* Ligne décorative */}
            <div className="w-16 h-1 bg-primary mx-auto mb-8 rounded-full animate-slide-up" style={{ animationDelay: '0.15s' }} />
            
            {/* Mini stats discrètes */}
            <div className="flex flex-wrap justify-center gap-6 sm:gap-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-semibold text-primary mb-1">+100</div>
                <div className="text-xs font-medium text-neutral-600 dark:text-neutral-400">Points de vente</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-semibold text-primary mb-1">24/7</div>
                <div className="text-xs font-medium text-neutral-600 dark:text-neutral-400">Service client</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-semibold text-primary mb-1">100%</div>
                <div className="text-xs font-medium text-neutral-600 dark:text-neutral-400">Sécurité garantie</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4 boutons principaux */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-12 sm:pb-16">
        <MainButtons />
      </div>

      {/* Badges de confiance */}
      {/*}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16">
        <TrustBadges />
      </div>
      */}
      {/* Actions rapides */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12">
        <QuickActions />
      </div>
    </main>
  )
}