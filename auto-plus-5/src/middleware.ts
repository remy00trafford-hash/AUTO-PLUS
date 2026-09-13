import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request })
  const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: {
      getAll() { return request.cookies.getAll() },
      setAll(items) { items.forEach(({ name, value, options }) => { request.cookies.set(name, value); response.cookies.set(name, value, options) }) },
    },
  })
  const { data: { user } } = await supabase.auth.getUser()
  if (request.nextUrl.pathname === '/admin/login') return response
  if (!user || (process.env.ADMIN_EMAIL && user.email !== process.env.ADMIN_EMAIL)) {
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }
  return response
}

export const config = { matcher: ['/admin/:path*'] }
