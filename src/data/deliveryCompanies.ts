export interface DeliveryCompany {
  id: number
  name: string
  logo_url: string | null
  description: string | null
  phone: string
  whatsapp: string | null
  messenger: string | null
  email: string | null
  website: string | null
  service_areas: string[]
  delivery_time: string | null
  min_order_amount: string | null
  delivery_fee: string | null
  working_hours: string | null
  rating: number
  review_count: number
  features: string[]
  specialties: string[]
  is_verified: boolean
  is_active: boolean
  display_order: number
}

// Types de filtres
export const filterTypes = [
  { id: 'all', label: 'Tous', specialties: [] },
  { id: 'express', label: 'Livraison express', specialties: ['express'] },
  { id: '24h', label: 'Service 24h/24', specialties: ['24h'] },
  { id: 'verified', label: 'Vérifiées', specialties: [] },
]

// Fonction utilitaire pour filtrer
export const filterCompanies = (
  companies: DeliveryCompany[],
  selectedFilter: string,
  searchQuery: string
): DeliveryCompany[] => {
  let result = [...companies]

  // Filtre par recherche
  if (searchQuery) {
    const query = searchQuery.toLowerCase()
    result = result.filter(company =>
      company.name.toLowerCase().includes(query) ||
      (company.description && company.description.toLowerCase().includes(query)) ||
      company.service_areas.some(area => area.toLowerCase().includes(query)) ||
      company.features.some(feature => feature.toLowerCase().includes(query))
    )
  }

  // Filtre par catégorie
  if (selectedFilter !== 'all') {
    const filter = filterTypes.find(f => f.id === selectedFilter)
    if (filter) {
      if (filter.id === 'verified') {
        result = result.filter(company => company.is_verified)
      } else if (filter.specialties.length > 0) {
        result = result.filter(company =>
          filter.specialties.some(specialty => 
            company.specialties.includes(specialty)
          )
        )
      }
    }
  }

  return result
}

// Fonction pour trier par différents critères
export const sortCompanies = (
  companies: DeliveryCompany[],
  sortBy: 'rating' | 'deliveryTime' | 'name' | 'reviewCount'
): DeliveryCompany[] => {
  const sorted = [...companies]
  
  switch (sortBy) {
    case 'rating':
      return sorted.sort((a, b) => b.rating - a.rating)
    case 'deliveryTime':
      const extractTime = (time: string | null) => {
        if (!time) return 999
        return parseInt(time.match(/\d+/)?.[0] || '999')
      }
      return sorted.sort((a, b) => extractTime(a.delivery_time) - extractTime(b.delivery_time))
    case 'reviewCount':
      return sorted.sort((a, b) => b.review_count - a.review_count)
    case 'name':
      return sorted.sort((a, b) => a.name.localeCompare(b.name))
    default:
      return sorted
  }
}