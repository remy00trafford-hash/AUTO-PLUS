import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseAdminClient } from '../../../../lib/supabase-admin'
import crypto from 'node:crypto'

export async function POST(request: NextRequest) {
  const { code } = await request.json()
  if (typeof code !== 'string' || !/^\d{4}$/.test(code)) return NextResponse.json({ error: 'Code invalide.' }, { status: 400 })

  const codeHash = crypto.createHash('sha256').update(code).digest('hex')
  const supabase = createSupabaseAdminClient()
  const { data } = await supabase
    .from('admin_access_reveals')
    .select('id,code_hash,expires_at')
    .eq('code_hash', codeHash)
    .is('consumed_at', null)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  if (!data || new Date(data.expires_at).getTime() < Date.now()) return NextResponse.json({ error: 'Code incorrect.' }, { status: 401 })

  const consumedAt = new Date().toISOString()
  const { error: consumeError } = await supabase
    .from('admin_access_reveals')
    .update({ consumed_at: consumedAt })
    .eq('id', data.id)
    .is('consumed_at', null)

  if (consumeError) return NextResponse.json({ error: 'Connexion impossible.' }, { status: 500 })

  const session = crypto.randomBytes(32).toString('hex')
  const sessionHash = crypto.createHash('sha256').update(session).digest('hex')
  const { error } = await supabase.from('admin_sessions').insert({
    session_hash: sessionHash,
    expires_at: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString(),
  })
  if (error) return NextResponse.json({ error: 'Connexion impossible.' }, { status: 500 })

  const response = NextResponse.json({ ok: true })
  response.cookies.set('auto_plus_admin_session', session, { httpOnly: true, secure: true, sameSite: 'lax', path: '/', maxAge: 60 * 60 * 24 * 30 })
  return response
}
