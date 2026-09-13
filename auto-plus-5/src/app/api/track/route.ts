import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseAdminClient } from '../../../lib/supabase-admin'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const event = ['product_view', 'affiliate_click'].includes(body.event) ? body.event : null
    if (!event || !body.product_id || !body.slug) return NextResponse.json({ ok: false }, { status: 400 })
    const supabase = createSupabaseAdminClient()
    const { error } = await supabase.from('analytics_events').insert({
      event,
      product_id: String(body.product_id),
      slug: String(body.slug),
      name: body.name ? String(body.name).slice(0, 200) : null,
      category: body.category ? String(body.category).slice(0, 80) : null,
      referrer: request.headers.get('referer'),
      user_agent: request.headers.get('user-agent'),
    })
    if (error) return NextResponse.json({ ok: false }, { status: 500 })
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 })
  }
}
