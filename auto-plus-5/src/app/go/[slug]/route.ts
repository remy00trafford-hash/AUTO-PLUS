import { NextRequest, NextResponse } from 'next/server'
import { products } from '../../../data/products'

export async function GET(request: NextRequest, context: { params: Promise<{ slug: string }> }) {
  const { slug } = await context.params
  const product = products.find((item) => item.slug === slug)
  if (!product) return NextResponse.redirect(new URL('/products', request.url))
  return NextResponse.redirect(product.affiliateUrl, 307)
}
