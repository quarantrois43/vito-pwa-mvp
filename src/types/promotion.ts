// src/types/promotion.ts
export interface Promotion {
  id: string
  title: string
  subtitle: string | null
  description: string
  discount_value: number
  discount_type: string
  valid_from: Date | null
  valid_until: Date
  image_url: string | null
  promo_code: string | null
  product_category: string | null
  zones: string[]
  applicable_products: string[]
  conditions: string[]
  usage_count: number
  max_usage: number | null
  is_active: boolean
  is_featured: boolean
  display_order: number
  created_by_id: string | null
  updated_by_id: string | null
  created_at: Date
  updated_at: Date
  deleted_at: Date | null
}