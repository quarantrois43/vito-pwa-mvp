'use client'

import { Truck, User } from 'lucide-react'
import type { TravelMode } from '@/lib/hooks/useDistanceMatrix'

interface TravelModeSelectorProps {
  mode: TravelMode
  onChange: (mode: TravelMode) => void
}

const modes = [
  { id: 'DRIVING' as TravelMode, label: 'Voiture', icon: Truck },
  { id: 'WALKING' as TravelMode, label: 'À pied', icon: User },
]

export const TravelModeSelector: React.FC<TravelModeSelectorProps> = ({ mode, onChange }) => {
  return (
    <div className="bg-white dark:bg-dark-surface rounded-2xl p-4 border border-neutral-200 dark:border-neutral-800 mb-4">
      <p className="text-xs font-medium text-neutral-600 dark:text-neutral-400 mb-3 tracking-tight">
        Mode de transport
      </p>
      <div className="grid grid-cols-2 gap-3">
        {modes.map((m) => {
          const Icon = m.icon
          return (
            <button
              key={m.id}
              onClick={() => onChange(m.id)}
              className={`flex flex-col items-center gap-2 p-3 rounded-xl transition-all duration-300 border ${
                mode === m.id
                  ? 'bg-primary text-white border-primary'
                  : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600'
              }`}
            >
              <Icon className="w-6 h-6" strokeWidth={1.5} />
              <span className="text-xs font-medium">{m.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}