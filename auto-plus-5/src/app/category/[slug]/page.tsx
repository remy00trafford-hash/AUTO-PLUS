import Link from 'next/link'
import { products } from '../../../data/products'
import ProductImage from '../../../components/ProductImage'

export default async function Category({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const title = decodeURIComponent(slug).replaceAll('-', ' ')
  const list = products.filter((p) => p.category.toLowerCase().replaceAll(' ', '-') === slug)
  return <main><header className="header"><div className="nav"><Link href="/" className="brand"><img src="/logo.png" alt="Auto+" className="brand-logo"/>AUTO<span>+</span></Link><Link href="/products" className="nav-cta">Shop <span>→</span></Link></div></header><section className="section"><Link className="back" href="/products">← Back to shop</Link><div className="section-head"><div><span className="eyebrow">CATEGORY</span><h1>{title.charAt(0).toUpperCase() + title.slice(1)}</h1></div></div><div className="product-grid">{list.map((p) => <article className="card" key={p.id}><Link href={`/product/${p.slug}`} className="image-wrap"><ProductImage src={p.image} alt={p.name} /><span className="tag image-tag">{p.offerLabel}</span></Link><div className="card-body"><h2>{p.name}</h2><p>{p.description}</p><Link className="offer-link" href={`/product/${p.slug}`}>View product <span>→</span></Link></div></article>)}</div></section></main>
}
