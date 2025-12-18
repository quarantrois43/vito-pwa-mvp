'use client'

import { Phone, MessageSquare, Mail, MapPin, Clock, CheckCircle } from 'lucide-react'
import type { DeliveryCompany } from '@/data/deliveryCompanies'
import { RatingStars } from './RatingStars'
import Image from 'next/image'

interface DeliveryCompanyCardProps {
  company: DeliveryCompany
}

export const DeliveryCompanyCard: React.FC<DeliveryCompanyCardProps> = ({ company }) => {
  const handlePhoneClick = () => {
    window.location.href = `tel:${company.phone}`
  }

  const handleWhatsAppClick = () => {
    if (!company.whatsapp) return
    const message = `Bonjour ${company.name}, je suis intéressé(e) par une livraison de gaz. Pouvez-vous me renseigner ?`
    window.open(`https://wa.me/${company.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer')
  }

  const handleMessengerClick = () => {
    if (!company.messenger) return
    window.open(company.messenger, '_blank', 'noopener,noreferrer')
  }

  const handleEmailClick = () => {
    if (!company.email) return
    const subject = `Demande de livraison de gaz - ${company.name}`
    const body = `Bonjour,\n\nJe souhaiterais obtenir des informations concernant une livraison de gaz.\n\nPourriez-vous me contacter pour discuter des détails ?\n\nCordialement,`
    window.location.href = `mailto:${company.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  return (
    <div className="bg-white dark:bg-dark-surface rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 hover:border-primary/50 transition-all duration-300 group">
      {/* Header */}
      <div className="bg-gradient-to-r from-neutral-50 to-white dark:from-neutral-900 dark:to-dark-surface px-6 py-5 border-b border-neutral-200 dark:border-neutral-800 relative">
        {company.is_verified && (
          <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-1.5 rounded-xl text-xs font-medium">
            <CheckCircle className="w-4 h-4" strokeWidth={1.5} />
            Vérifié
          </div>
        )}
        
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="relative w-12 h-12 bg-primary/10 rounded-xl overflow-hidden flex items-center justify-center">
              {company.logo_url ? (
                <Image
                  src={company.logo_url}
                  alt={`Logo ${company.name}`}
                  width={48}
                  height={48}
                  className="object-contain p-2"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.style.display = 'none'
                    if (target.parentElement) {
                      target.parentElement.innerHTML = `
                        <div class="w-full h-full flex items-center justify-center text-xl font-bold text-primary">
                          ${company.name.charAt(0)}
                        </div>
                      `
                    }
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-xl font-bold text-primary">
                  {company.name.charAt(0)}
                </div>
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white truncate font-sans">
                {company.name}
              </h3>
              <div className="mt-1.5">
                <RatingStars 
                  rating={company.rating} 
                  reviewCount={company.review_count}
                  size="sm"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-6 line-clamp-2 leading-relaxed font-sans">
          {company.description || 'Société de livraison de gaz'}
        </p>

        {/* Key information */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" strokeWidth={1.5} />
              <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300 font-sans">Délai</span>
            </div>
            <div className="font-semibold text-neutral-900 dark:text-white text-lg font-sans">
              {company.delivery_time || 'Nous contacter'}
            </div>
            <div className="text-xs text-neutral-500 dark:text-neutral-400 font-sans">
              {company.working_hours || 'Horaires variables'}
            </div>
          </div>
          
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-600 dark:text-emerald-400" strokeWidth={1.5} />
              <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300 font-sans">Couverture</span>
            </div>
            <div className="font-semibold text-neutral-900 dark:text-white text-lg font-sans">
              {company.service_areas.length} {company.service_areas.length > 1 ? 'zones' : 'zone'}
            </div>
            <div className="text-xs text-neutral-500 dark:text-neutral-400 font-sans">
              {company.delivery_fee || "Tarif variable"}
            </div>
          </div>
        </div>

        {/* Delivery areas */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2.5 font-sans">
            Zones desservies :
          </h4>
          <div className="flex flex-wrap gap-2">
            {company.service_areas.slice(0, 3).map((area, index) => (
              <span 
                key={index}
                className="px-3 py-1.5 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-xl text-sm font-sans"
              >
                {area}
              </span>
            ))}
            {company.service_areas.length > 3 && (
              <span className="px-3 py-1.5 bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 rounded-xl text-sm font-sans">
                +{company.service_areas.length - 3} autres
              </span>
            )}
          </div>
        </div>

        {/* Features */}
        {company.features.length > 0 && (
          <div className="mb-6">
            <h4 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2.5 font-sans">
              Services inclus :
            </h4>
            <ul className="space-y-2">
              {company.features.slice(0, 3).map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-emerald-500 dark:text-emerald-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-neutral-600 dark:text-neutral-400 truncate font-sans">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Contact buttons */}
        <div className="pt-6 border-t border-neutral-200 dark:border-neutral-800">
          <h4 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-3 font-sans">
            Contacter :
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <button
              onClick={handlePhoneClick}
              className="flex flex-col items-center justify-center p-3 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40 rounded-xl transition-all duration-200 group"
              aria-label={`Appeler ${company.name}`}
              title={`Tél: ${company.phone}`}
            >
              <Phone className="w-5 h-5 text-blue-600 dark:text-blue-400 mb-1 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
              <span className="text-xs font-medium text-blue-700 dark:text-blue-300 font-sans">Appeler</span>
            </button>

            {company.whatsapp && (
              <button
                onClick={handleWhatsAppClick}
                className="flex flex-col items-center justify-center p-3 bg-emerald-50 dark:bg-emerald-900/20 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 rounded-xl transition-all duration-200 group"
                aria-label={`WhatsApp ${company.name}`}
                title={`WhatsApp: ${company.whatsapp}`}
              >
                <MessageSquare className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mb-1 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
                <span className="text-xs font-medium text-emerald-700 dark:text-emerald-300 font-sans">WhatsApp</span>
              </button>
            )}

            {company.messenger && (
              <button
                onClick={handleMessengerClick}
                className="flex flex-col items-center justify-center p-3 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40 rounded-xl transition-all duration-200 group"
                aria-label={`Messenger ${company.name}`}
                title="Ouvrir Messenger"
              >
                <svg className="w-5 h-5 text-[#0084FF] dark:text-[#4DA6FF] mb-1 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm6.99 8.046l-4.007 6.72-3.997-6.72h8.004zm-10.014 0l4.007 6.72-3.997 6.72H4.98l4.005-6.72-4.006-6.72h8.01zm-2.002 13.275l3.997-6.72 4.007 6.72H6.974zm8.013 0l-3.997-6.72 4.007-6.72h8.004l-4.006 6.72 4.005 6.72h-8.01z"/>
                </svg>
                <span className="text-xs font-medium text-[#006AFF] dark:text-[#4DA6FF] font-sans">Messenger</span>
              </button>
            )}

            {company.email && (
              <button
                onClick={handleEmailClick}
                className="flex flex-col items-center justify-center p-3 bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/40 rounded-xl transition-all duration-200 group"
                aria-label={`Email ${company.name}`}
                title={`Email: ${company.email}`}
              >
                <Mail className="w-5 h-5 text-purple-600 dark:text-purple-400 mb-1 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
                <span className="text-xs font-medium text-purple-700 dark:text-purple-300 font-sans">Email</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}