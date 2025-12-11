'use client'

import { useState, useEffect, useCallback } from 'react'
import type { Reseller } from '@/types/reseller'
import { RefreshCw } from 'lucide-react'

interface MapFiltersProps {
  resellers: Reseller[]
  onFilterChange: (filtered: Reseller[]) => void
}

export const MapFilters: React.FC<MapFiltersProps> = ({ resellers, onFilterChange }) => {
  const [selectedType, setSelectedType] = useState<'all' | Reseller['type']>('all')
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [selectedCity, setSelectedCity] = useState<string>('all')

  const cities = Array.from(new Set(resellers.map(r => r.city))).sort()

  const applyFilters = useCallback(() => {
    let filtered = resellers

    if (selectedType !== 'all') {
      filtered = filtered.filter(r => r.type === selectedType)
    }

    if (selectedServices.length > 0) {
      filtered = filtered.filter(r =>
        selectedServices.every(service => r.services.includes(service))
      )
    }

    if (selectedCity !== 'all') {
      filtered = filtered.filter(r => r.city === selectedCity)
    }

    onFilterChange(filtered)
  }, [selectedType, selectedServices, selectedCity, resellers, onFilterChange])

  useEffect(() => {
    applyFilters()
  }, [applyFilters])

  const toggleService = (service: string) => {
    setSelectedServices(prev =>
      prev.includes(service)
        ? prev.filter(s => s !== service)
        : [...prev, service]
    )
  }

  const resetFilters = () => {
    setSelectedType('all')
    setSelectedServices([])
    setSelectedCity('all')
  }

  const hasActiveFilters = selectedType !== 'all' || selectedServices.length > 0 || selectedCity !== 'all'

  return (
    <div className="w-full">
      {/* Desktop */}
      <div className="hidden md:flex items-center justify-between">
        <div className="flex flex-wrap gap-3 overflow-x-auto py-2">
          {/* Type */}
          <div className="flex items-center gap-2 shrink-0">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value as any)}
              className="px-4 py-2 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-dark-surface text-sm font-medium text-neutral-700 dark:text-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 tracking-tight"
            >
              <option value="all">Types Distrib</option>
              <option value="Quincaillerie">Quincailleries</option>
              <option value="Épicerie">Épiceries</option>
              <option value="Station Service">Stations-service</option>
              <option value="Autres">Autres</option>
            </select>
          </div>

          {/* Ville */}
          {cities.length > 0 && (
            <div className="flex items-center gap-2 shrink-0">
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="px-4 py-2 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-dark-surface text-sm font-medium text-neutral-700 dark:text-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 tracking-tight"
              >
                <option value="all">Toutes les villes</option>
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
          )}

          {/* Services */}
          {(['Bouteille 9kg', 'Bouteille 13kg', 'Kit Fatapera', 'Détendeur', 'Pack connectique'] as const).map(service => (
            <button
              key={service}
              onClick={() => toggleService(service)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 border shrink-0 ${
                selectedServices.includes(service)
                  ? 'bg-primary text-white border-primary'
                  : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600'
              }`}
            >
              {service}
            </button>
          ))}
        </div>

        {/* Bouton Réinitialiser */}
        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            className="px-4 py-2 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-dark-surface text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-all duration-300 shrink-0 flex items-center gap-2 hover:border-neutral-300 dark:hover:border-neutral-600"
          >
            <RefreshCw className="w-4 h-4" strokeWidth={1.5} />
            Réinitialiser
          </button>
        )}
      </div>

      {/* Mobile */}
      <div className="md:hidden space-y-3">
        <div className="flex flex-wrap gap-2">
          {/* Type */}
          <div className="flex-1 min-w-[140px]">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value as any)}
              className="w-full px-4 py-2 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-dark-surface text-sm font-medium text-neutral-700 dark:text-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 tracking-tight"
            >
              <option value="all">Types Distrib</option>
              <option value="Quincaillerie">Quincailleries</option>
              <option value="Épicerie">Épiceries</option>
              <option value="Station Service">Stations-service</option>
              <option value="Autres">Autres</option>
            </select>
          </div>

          {/* Ville */}
          {cities.length > 0 && (
            <div className="flex-1 min-w-[140px]">
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full px-4 py-2 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-dark-surface text-sm font-medium text-neutral-700 dark:text-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 tracking-tight"
              >
                <option value="all">Toutes les villes</option>
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Services en grille */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {(['Bouteille 9kg', 'Bouteille 13kg', 'Kit Fatapera', 'Détendeur', 'Pack connectique'] as const).map(service => (
            <button
              key={service}
              onClick={() => toggleService(service)}
              className={`px-3 py-2 rounded-xl text-sm font-medium transition-all duration-300 border ${
                selectedServices.includes(service)
                  ? 'bg-primary text-white border-primary'
                  : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600'
              }`}
            >
              {service}
            </button>
          ))}
        </div>

        {/* Bouton Réinitialiser mobile */}
        {hasActiveFilters && (
          <div className="flex justify-center">
            <button
              onClick={resetFilters}
              className="px-4 py-2 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-dark-surface text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-all duration-300 flex items-center gap-2 hover:border-neutral-300 dark:hover:border-neutral-600"
            >
              <RefreshCw className="w-4 h-4" strokeWidth={1.5} />
              Réinitialiser
            </button>
          </div>
        )}
      </div>
    </div>
  )
}