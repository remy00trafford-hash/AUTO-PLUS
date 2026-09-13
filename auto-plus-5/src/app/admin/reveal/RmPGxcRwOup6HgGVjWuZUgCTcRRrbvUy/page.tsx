'use client'

import { useEffect, useState } from 'react'

const CODE = '7316'
const STORAGE_KEY = 'auto-plus-admin-code-revealed'

export default function AdminCodeRevealPage() {
  const [available, setAvailable] = useState<boolean | null>(null)

  useEffect(() => {
    const used = window.localStorage.getItem(STORAGE_KEY) === '1'
    if (!used) {
      window.localStorage.setItem(STORAGE_KEY, '1')
      setAvailable(true)
    } else {
      setAvailable(false)
    }
  }, [])

  if (available === null) return <main style={{minHeight:'100dvh',display:'grid',placeItems:'center',fontFamily:'Arial'}}>Chargement…</main>
  if (!available) return <main style={{minHeight:'100dvh',display:'grid',placeItems:'center',padding:24,fontFamily:'Arial'}}><div style={{textAlign:'center'}}><h1>Lien déjà utilisé</h1><p>Ce lien de révélation ne peut plus être consulté depuis ce navigateur.</p></div></main>

  return <main style={{minHeight:'100dvh',display:'grid',placeItems:'center',padding:24,background:'#f5f7fb',fontFamily:'Arial'}}><div style={{width:'100%',maxWidth:520,textAlign:'center',background:'#fff',border:'1px solid #e5e7eb',borderRadius:28,padding:40,boxShadow:'0 25px 70px rgba(20,30,50,.12)'}}><div style={{fontWeight:950,fontSize:30,letterSpacing:'-.07em'}}>AUTO<span style={{color:'#e1042c'}}>+</span></div><p style={{fontSize:11,fontWeight:900,letterSpacing:'.16em',color:'#e1042c'}}>PRIVATE ADMIN ACCESS</p><h1 style={{fontSize:42,margin:'20px 0 8px',letterSpacing:'-.05em'}}>Ton code</h1><div style={{fontSize:64,fontWeight:950,letterSpacing:'.18em',margin:'20px 0',color:'#111827'}}>{CODE}</div><p style={{color:'#697386'}}>Note ce code. Ce lien ne pourra plus être utilisé après cette consultation.</p></div></main>
}
