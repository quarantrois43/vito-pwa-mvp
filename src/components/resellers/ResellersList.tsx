'use client'

import { ResellerCard } from '@/components/resellers/ResellerCard'
import type { Reseller } from '@/types/reseller'
import type { DistanceResult } from '@/lib/hooks/useDistanceMatrix'
import { MapPin } from 'lucide-react'

interface ResellersListProps {
  resellers: Reseller[]
  selectedReseller: Reseller | null
  onSelectReseller: (reseller: Reseller) => void
  distances?: Record<string, DistanceResult>
}

export const ResellersList: React.FC<ResellersListProps> = ({
  resellers,
  selectedReseller,
  onSelectReseller,
  distances,
}) => {
  return (
    <div className="p-4 space-y-4">
      {resellers.map((reseller, index) => (
        <ResellerCard
          key={reseller.id}
          reseller={reseller}
          isSelected={selectedReseller?.id === reseller.id}
          onClick={() => onSelectReseller(reseller)}
          delay={index * 0.05}
          distance={distances?.[reseller.id]}
        />
      ))}

      {resellers.length === 0 && (
        <div className="text-center py-16">
          <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
            <MapPin className="w-8 h-8 text-neutral-400 dark:text-neutral-600" strokeWidth={1.5} />
          </div>
          <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-2 tracking-tight">
            Aucun revendeur trouvé
          </h3>
          <p className="text-neutral-600 dark:text-neutral-400">
            Essayez de modifier les filtres
          </p>
        </div>
      )}
    </div>
  )
}