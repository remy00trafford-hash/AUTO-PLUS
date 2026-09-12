import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Auto+ — Car Accessories, Gadgets & Upgrades',
  description: 'A curated selection of car accessories, gadgets and upgrades worth discovering.',
  openGraph: {
    title: 'Auto+ — Car Accessories, Gadgets & Upgrades',
    description: 'A curated selection of car accessories, gadgets and upgrades worth discovering.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export default function RootLayout({children}:{children:React.ReactNode}) {
  return <html lang="en"><body>{children}</body></html>
}
