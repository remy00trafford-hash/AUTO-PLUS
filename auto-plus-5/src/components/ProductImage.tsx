'use client'

import { useState } from 'react'

export default function ProductImage({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div className="img-fallback" role="img" aria-label={alt}>
        <b>AUTO+</b>
        <span>{alt}</span>
      </div>
    )
  }

  return <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} />
}
