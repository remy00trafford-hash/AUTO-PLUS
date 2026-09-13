'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function ScrollRestoration() {
  const pathname = usePathname()

  useEffect(() => {
    const key = `auto-plus-scroll:${pathname}`
    const saved = sessionStorage.getItem(key)

    if (saved) {
      requestAnimationFrame(() => {
        window.scrollTo(0, Number(saved))
      })
    }

    const save = () => sessionStorage.setItem(key, String(window.scrollY))
    window.addEventListener('scroll', save, { passive: true })
    window.addEventListener('pagehide', save)

    return () => {
      save()
      window.removeEventListener('scroll', save)
      window.removeEventListener('pagehide', save)
    }
  }, [pathname])

  return null
}
