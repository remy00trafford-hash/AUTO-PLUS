import Link from 'next/link'
import { products } from '../../data/products'
import ProductImage from '../../components/ProductImage'

export default async function Products({ searchParams }: { searchParams?: Promise<{ category?: string }> }) {
  const params = searchParams ? await searchParams : {}
  const category = params.category
  const list = category ? products.filter((p) => p.category === category) : products
  return <main>
    <header className="header"><div className="nav"><Link href="/" className="brand"><img src="/logo.png" alt="Auto+" className="brand-logo"/>AUTO<span>+</span></Link><nav className="desktop-nav"><Link href="/">Home</Link><Link href="/products">Shop</Link><Link href="/#categories">Categories</Link><Link href="/about">About</Link></nav></div></header>
    <section className="section catalogue"><Link className="back" href="/">← Back to home</Link><div className="section-head"><div><span className="eyebrow">SHOP</span><h1>{category ? category : 'All Auto+ Products'}</h1></div><p>{list.length} product{list.length > 1 ? 's' : ''} selected.</p></div><div className="product-grid">{list.map((p) => <article className="card" key={p.id}><Link href={`/product/${p.slug}`} className="image-wrap"><ProductImage src={p.image} alt={p.name} /><span className="tag image-tag">{p.offerLabel}</span></Link><div className="card-body"><h2>{p.name}</h2><p>{p.description}</p><Link className="offer-link" href={`/product/${p.slug}`}>View product <span>→</span></Link></div></article>)}</div></section>
  </main>
}
