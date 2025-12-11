'use client'

import { useState, useEffect } from 'react'
import type { Promotion } from '@/types/promotion'
import { Clock, Tag, Check, ChevronDown, CalendarDays, MapPin, Info, Share } from 'lucide-react'
import { hapticFeedback } from '@/lib/utils/haptic'

interface PromotionCardProps {
  promotion: Promotion
  delay?: number
}

export const PromotionCard: React.FC<PromotionCardProps> = ({ promotion, delay = 0 }) => {
  const [timeLeft, setTimeLeft] = useState('')
  const [isExpired, setIsExpired] = useState(false)
  const [copied, setCopied] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime()
      const end = new Date(promotion.validUntil).getTime()
      const diff = end - now

      if (diff <= 0) {
        setIsExpired(true)
        setTimeLeft('00:00:00:00')
        return
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)

      const formatted = `${String(days).padStart(2, '0')}:${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
      setTimeLeft(formatted)
    }

    calculateTimeLeft()
    const interval = setInterval(calculateTimeLeft, 1000)
    return () => clearInterval(interval)
  }, [promotion.validUntil])

  const handleCopyCode = () => {
    if (!promotion.code) return
    hapticFeedback('medium')
    navigator.clipboard.writeText(promotion.code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleToggleExpand = () => {
    hapticFeedback('light')
    setIsExpanded(!isExpanded)
  }

  const handleShare = () => {
    hapticFeedback('medium')
    if (navigator.share) {
      navigator.share({
        title: promotion.title,
        text: promotion.description,
        url: window.location.href,
      })
    }
  }

  const getTimeColor = () => {
    if (isExpired) return 'text-red-600 bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-800'
    const now = new Date().getTime()
    const end = new Date(promotion.validUntil).getTime()
    const diff = end - now
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    if (days > 7) return 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30 border-emerald-200 dark:border-emerald-800'
    if (days > 3) return 'text-amber-600 bg-amber-50 dark:bg-amber-900/30 border-amber-200 dark:border-amber-800'
    return 'text-red-600 bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-800'
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative overflow-hidden rounded-2xl transition-all duration-300 animate-slide-up group bg-white dark:bg-dark-surface border border-neutral-200 dark:border-neutral-800"
      style={{
        animationDelay: `${delay}s`,
        boxShadow: isHovered 
          ? '0 20px 40px -20px rgba(0, 139, 127, 0.15), 0 0 0 1px rgba(0, 139, 127, 0.05)'
          : '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.03)',
        transform: isHovered ? 'translateY(-2px)' : 'translateY(0)'
      }}
    >
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={promotion.image}
          alt={promotion.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />

        {promotion.discount > 0 && (
          <div className="absolute top-4 right-4 z-10">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/30 rounded-xl blur-md" />
              <div className="relative bg-primary text-white rounded-xl px-4 py-2">
                <div className="text-xl font-bold font-sans">-{promotion.discount}%</div>
              </div>
            </div>
          </div>
        )}

        {!promotion.isActive && (
          <div className="absolute top-4 left-4 z-10">
            <div className="bg-black/80 backdrop-blur-sm text-white rounded-xl px-3 py-1.5 text-sm font-medium border border-white/20">
              Expirée
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-2 line-clamp-2 font-sans">
            {promotion.title}
          </h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2 font-sans">
            {promotion.description}
          </p>
        </div>

        {/* Quick info */}
        <div className="flex flex-wrap gap-2 mb-4">
          {promotion.isActive && !isExpired && (
            <div className={`flex items-center gap-2 px-3 py-2 rounded-xl ${getTimeColor()} text-sm font-medium border`}>
              <Clock className="w-4 h-4" strokeWidth={1.5} />
              <span className="font-mono text-sm">{timeLeft}</span>
            </div>
          )}

          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-sm font-medium border border-blue-200 dark:border-blue-800">
            <CalendarDays className="w-4 h-4" strokeWidth={1.5} />
            <span>Jusqu'au {new Date(promotion.validUntil).toLocaleDateString('fr-FR')}</span>
          </div>
        </div>

        {/* Promo code */}
        {promotion.code && (
          <div className="mb-4">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300 font-sans">
                Code promo
              </span>
              <button
                onClick={handleShare}
                className="flex items-center gap-1 text-sm text-primary hover:text-primary-600 transition-colors font-sans"
              >
                <Share className="w-4 h-4" strokeWidth={1.5} />
                <span className="hidden sm:inline">Partager</span>
              </button>
            </div>
            <button onClick={handleCopyCode} className="w-full group/btn">
              <div className="relative overflow-hidden rounded-xl bg-primary/5 border border-primary/20 hover:border-primary/40 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000" />
                <div className="relative flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Tag className="w-5 h-5 text-primary" strokeWidth={1.5} />
                    </div>
                    <div className="text-left">
                      <div className="text-xl font-semibold text-primary font-mono">
                        {promotion.code}
                      </div>
                      <div className="text-xs text-primary/70 font-sans">
                        Cliquez pour copier
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {copied ? (
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400">
                        <Check className="w-4 h-4" strokeWidth={1.5} />
                        <span className="text-sm font-medium">Copié !</span>
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center group-hover/btn:scale-110 transition-transform">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </button>
          </div>
        )}

        {/* Expand button */}
        <button
          onClick={handleToggleExpand}
          className="w-full flex items-center justify-between p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all duration-300 border border-neutral-200 dark:border-neutral-800"
        >
          <div className="flex items-center gap-3">
            <Info className="w-5 h-5 text-primary" strokeWidth={1.5} />
            <span className="font-medium text-neutral-900 dark:text-white font-sans">
              Voir les détails
            </span>
          </div>
          <ChevronDown 
            className={`w-5 h-5 text-neutral-500 transition-transform duration-300 ${
              isExpanded ? 'rotate-180' : ''
            }`}
            strokeWidth={1.5}
          />
        </button>
      </div>

      {/* Expanded details */}
      <div className={`overflow-hidden transition-all duration-300 ${
        isExpanded ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="bg-neutral-50 dark:bg-neutral-900/50 border-t border-neutral-200 dark:border-neutral-800 p-6">
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2 font-sans">
              Détails de la promotion
            </h4>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 font-sans">
              Toutes les informations importantes concernant cette offre
            </p>
          </div>

          <div className="space-y-4">
            {/* Validity */}
            <div className="bg-white dark:bg-dark-surface rounded-xl p-4 border border-neutral-200 dark:border-neutral-800">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <CalendarDays className="w-5 h-5 text-blue-600 dark:text-blue-400" strokeWidth={1.5} />
                </div>
                <div>
                  <h5 className="font-semibold text-neutral-900 dark:text-white font-sans">
                    Validité
                  </h5>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 font-sans">
                    Période d'application
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center py-2 border-b border-neutral-100 dark:border-neutral-800">
                  <span className="text-sm text-neutral-600 dark:text-neutral-400 font-sans">Fin</span>
                  <span className="font-medium text-neutral-900 dark:text-white font-sans">
                    {formatDate(promotion.validUntil)}
                  </span>
                </div>
              </div>
            </div>

            {/* Conditions */}
            <div className="bg-white dark:bg-dark-surface rounded-xl p-4 border border-neutral-200 dark:border-neutral-800">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                  <Check className="w-5 h-5 text-emerald-600 dark:text-emerald-400" strokeWidth={1.5} />
                </div>
                <div>
                  <h5 className="font-semibold text-neutral-900 dark:text-white font-sans">
                    Conditions
                  </h5>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 font-sans">
                    Règles d'application
                  </p>
                </div>
              </div>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" strokeWidth={1.5} />
                  </div>
                  <span className="text-sm text-neutral-700 dark:text-neutral-300 font-sans">
                    Réduction de {promotion.discount}% sur le produit concerné
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}