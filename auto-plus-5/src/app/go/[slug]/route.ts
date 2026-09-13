import { NextRequest, NextResponse } from 'next/server'
import { products } from '../../../data/products'
import { createSupabaseAdminClient } from '../../../lib/supabase-admin'

export async function GET(request: NextRequest, context: { params: Promise<{ slug: string }> }) {
  const { slug } = await context.params
  const product = products.find((item) => item.slug === slug)
  if (!product) return NextResponse.redirect(new URL('/products', request.url))

  try {
    const supabase = createSupabaseAdminClient()
    await supabase.from('analytics_events').insert({
      event: 'affiliate_click',
      product_id: product.id,
      slug: product.slug,
      name: product.name,
      category: product.category,
      referrer: request.headers.get('referer'),
      user_agent: request.headers.get('user-agent'),
    })
  } catch {}

  return NextResponse.redirect(product.affiliateUrl, 307)
}
