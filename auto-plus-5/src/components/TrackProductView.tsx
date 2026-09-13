'use client'

import { useEffect } from 'react'
import type { Product } from '../data/products'

export default function TrackProductView({ product }: { product: Product }) {
  useEffect(() => {
    fetch('/api/track', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ event: 'product_view', product_id: product.id, slug: product.slug, name: product.name, category: product.category }) }).catch(() => {})
  }, [product])
  return null
}
