import Link from 'next/link'
import { products } from '../data/products'
import ProductImage from '../components/ProductImage'

const categories = ['Phone Mounts','Power','Organization','Cleaning','Comfort','Lighting','Electronics']

function ProductCard({ p }: { p: (typeof products)[number] }) {
  return <article className="card">
    <Link href={`/product/${p.slug}`} className="image-wrap" aria-label={`View ${p.name}`}>
      <ProductImage src={p.image} alt={p.name} />
      <span className="tag image-tag">{p.offerLabel}</span>
    </Link>
    <div className="card-body">
      <h3>{p.name}</h3>
      <p>{p.description}</p>
      <Link className="offer-link" href={`/product/${p.slug}`}>View product <span>→</span></Link>
    </div>
  </article>
}

export default function Home() {
  const featured = products.filter((p) => p.featured)
  return <main>
    <header className="header"><div className="nav">
      <Link href="/" className="brand"><img src="/logo.png" alt="Auto+" className="brand-logo"/>AUTO<span>+</span></Link>
      <nav className="desktop-nav"><Link href="/">Home</Link><Link href="/products">Shop</Link><Link href="#categories">Categories</Link><Link href="/about">About</Link></nav>
      <Link href="/products" className="nav-cta">Shop <span>→</span></Link>
    </div></header>

    <section className="hero">
      <div className="hero-copy">
        <div className="eyebrow">AUTO+ / CAR ACCESSORIES</div>
        <h1>Car accessories worth discovering.</h1>
        <p>A curated lineup of gadgets, upgrades and everyday essentials for your car.</p>
        <div className="hero-actions"><Link className="primary" href="/products">Shop now <span>→</span></Link><Link className="secondary" href="#categories">Browse categories</Link></div>
      </div>
      <div className="hero-art" aria-hidden="true"><div className="glow glow-a"/><div className="glow glow-b"/><div className="hero-card"><span>AUTO+</span><b>DRIVE.<br/>UPGRADE.<br/>ENJOY.</b><i>Great finds for your car.</i></div></div>
    </section>

    <section id="selection" className="section selection"><div className="section-head"><div><span className="eyebrow">FEATURED</span><h2>Trending right now</h2></div><Link className="text-link" href="/products">View all <span>→</span></Link></div><div className="product-grid">{featured.map((p) => <ProductCard p={p} key={p.id}/>)}</div></section>

    <section id="categories" className="section categories"><div className="section-head"><div><span className="eyebrow">BROWSE</span><h2>Find what your car needs.</h2></div></div><div className="category-grid">{categories.map((c, i) => <Link href={`/products?category=${encodeURIComponent(c)}`} className="category" key={c}><span className="category-number">0{i + 1}</span><strong>{c}</strong><span className="arrow">↗</span></Link>)}</div></section>

    <section className="editorial"><div><span className="eyebrow">AUTO+</span><h2>Less searching. More great finds.</h2></div><p>Browse a curated lineup of car accessories with clear photos and a dedicated page for every product.</p></section>

    <footer className="footer"><div className="footer-top"><div><div className="brand footer-brand"><img src="/logo.png" alt="Auto+" className="brand-logo"/>AUTO<span>+</span></div><p>Car accessories worth discovering.</p></div><div className="footer-links"><div><b>Shop</b><Link href="/products">All products</Link><Link href="#categories">Categories</Link></div><div><b>Auto+</b><Link href="/about">About</Link><Link href="/privacy">Privacy</Link><Link href="/legal">Legal</Link></div></div></div><div className="footer-bottom"><span>© 2026 Auto+</span><span>See offers directly from each product page.</span></div></footer>
  </main>
}
