import { NextResponse } from 'next/server'
import { createSupabaseAdminClient } from '../../../lib/supabase-admin'

export async function GET(request: Request) {
  const supabase = createSupabaseAdminClient()
  const token = request.headers.get('cookie')?.match(/auto_plus_admin_session=([^;]+)/)?.[1]
  if (token) {
    const crypto = await import('node:crypto')
    const hash = crypto.createHash('sha256').update(token).digest('hex')
    await supabase.from('admin_sessions').delete().eq('session_hash', hash)
  }
  const response = NextResponse.redirect(new URL('/admin/login', request.url))
  response.cookies.delete('auto_plus_admin_session')
  return response
}
