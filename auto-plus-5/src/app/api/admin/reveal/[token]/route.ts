import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseAdminClient } from '../../../../../../lib/supabase-admin'
import crypto from 'node:crypto'

export async function GET(request: NextRequest, context: { params: Promise<{ token: string }> }) {
  const { token } = await context.params
  const tokenHash = crypto.createHash('sha256').update(token).digest('hex')
  const supabase = createSupabaseAdminClient()
  const { data } = await supabase.from('admin_access_reveals').select('id,code,expires_at,consumed_at').eq('token_hash', tokenHash).maybeSingle()
  if (!data || data.consumed_at || new Date(data.expires_at).getTime() < Date.now()) return new NextResponse('Lien invalide ou déjà utilisé.', { status: 410 })
  const { error } = await supabase.from('admin_access_reveals').update({ consumed_at: new Date().toISOString() }).eq('id', data.id).is('consumed_at', null)
  if (error) return new NextResponse('Impossible de révéler le code.', { status: 500 })
  return new NextResponse(`<!doctype html><html><head><meta charset="utf-8"><meta name="robots" content="noindex,nofollow"><meta name="referrer" content="no-referrer"><title>Auto+ — Code Admin</title></head><body style="margin:0;background:#f5f7fb;font-family:Arial,sans-serif;display:grid;place-items:center;min-height:100vh"><main style="background:white;border:1px solid #e5e7eb;border-radius:24px;padding:40px;text-align:center;box-shadow:0 25px 70px rgba(20,30,50,.12)"><b style="font-size:30px">AUTO<span style="color:#e1042c">+</span></b><p style="color:#e1042c;font-size:11px;font-weight:900;letter-spacing:.16em">PRIVATE ADMIN ACCESS</p><h1>Ton code</h1><div style="font-size:64px;font-weight:950;letter-spacing:.18em;margin:24px 0">${data.code}</div><p>Note ce code. Ce lien est maintenant désactivé.</p></main></body></html>`, { headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store, no-cache, must-revalidate', 'Referrer-Policy': 'no-referrer' } })
}
