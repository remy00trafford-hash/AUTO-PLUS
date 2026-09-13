# Auto+ Admin Dashboard

Private analytics dashboard for Auto+.

## Required Vercel environment variables

- `NEXT_PUBLIC_SUPABASE_URL=https://htkynieftrrkdylcuzyt.supabase.co`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY=<Supabase publishable key>`
- `SUPABASE_SERVICE_ROLE_KEY=<Supabase service-role key; server-only>`
- `ADMIN_EMAIL=<your admin email>`

The service-role key must never be exposed in client-side code or committed to GitHub.

Admin route: `/admin/login`

The dashboard reports Auto+ product views and affiliate clicks. AliExpress orders, validated commissions and paid balance remain official AliExpress data and are not fabricated by Auto+.
