import Link from 'next/link'
import { notFound } from 'next/navigation'
import { products } from '../../../data/products'
import ProductImage from '../../../components/ProductImage'

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const p = products.find((item) => item.slug === slug)
  if (!p) notFound()
  return <main>
    <header className="header"><div className="nav"><Link href="/" className="brand"><img src="/logo.png" alt="Auto+" className="brand-logo"/>AUTO<span>+</span></Link><Link href="/products" className="nav-cta">Shop <span>→</span></Link></div></header>
    <section className="detail"><Link href="/products" className="back">← Back to shop</Link><div className="detail-grid"><div className="detail-image"><ProductImage src={p.image} alt={p.name} /></div><div className="detail-copy"><div className="tag">{p.offerLabel}</div><h1>{p.name}</h1><p className="lead">{p.description}</p><div className="why"><h2>About this product</h2><p>{p.description} This page covers the key details so you can quickly decide if it's right for you.</p></div><Link className="primary detail-cta" href={p.affiliatePath}>View offer <span>→</span></Link></div></div></section>
  </main>
}
