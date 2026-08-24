import { useState, useRef, useEffect } from 'react'
import hero from './assets/Simbi_Bag4.jpg'
import boss from './assets/craftmakerboss.jpg'
import team from './assets/team.jpg'
import atelier from './assets/_A9A0835_copy.jpg'
import elegance2 from './assets/_A9A0848_copy.jpg'
import customTote from './assets/_A9A0861_copy.jpg'
import sideModel from './assets/_A9A0833_copy.jpg'
import { signature, popularRow1, popularRow2, craftRows, makingSteps, allProducts } from './data/products.js'
import './App.css'

const CartIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="9" cy="21" r="1.4" /><circle cx="19" cy="21" r="1.4" />
    <path d="M2 2h3l3.2 14.2a1.5 1.5 0 0 0 1.5 1.2h9.7a1.5 1.5 0 0 0 1.5-1.2L23 6H6" />
  </svg>
)

const UserIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="7.5" r="4" /><path d="M4 21c0-4 3.6-6.5 8-6.5s8 2.5 8 6.5" />
  </svg>
)

const InstaIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" /><circle cx="12" cy="12" r="4.4" /><circle cx="17.6" cy="6.4" r="1.1" fill="currentColor" stroke="none" />
  </svg>
)

const FbIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" /><path d="M15.5 8h-2a2 2 0 0 0-2 2v11M9 13h5" />
  </svg>
)

const XIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.8 3h3.1l-6.9 7.9L22 21h-6.4l-5-6.5L4.9 21H1.8l7.4-8.5L1.5 3H8l4.5 6zm-1.1 16.1h1.7L7.1 4.7H5.2z" />
  </svg>
)

// Self-typing text — types out char-by-char, then fires onDone.
// When loop is true it types, pauses, deletes, and retypes forever.
// startDelay: ms to wait after mount before typing begins.
function TypeText({ text, speed = 55, deleteSpeed = 28, pause = 1600, loop = false, startDelay = 900, className, onDone }){
  const [n,setN]=useState(0)
  const [deleting,setDeleting]=useState(false)
  const [started,setStarted]=useState(false)
  const fired=useRef(false)
  const reduce = typeof window!=='undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const full=text.length
  const done = !deleting && n>=full
  // wait for startDelay before beginning
  useEffect(()=>{
    if(reduce) return
    if(started) return
    const t=setTimeout(()=>setStarted(true), startDelay)
    return ()=>clearTimeout(t)
  },[started,startDelay,reduce])
  useEffect(()=>{
    if(reduce) return
    if(!started) return
    if(done){
      if(onDone && !fired.current){ fired.current=true; onDone() }
      if(!loop) return
      const t=setTimeout(()=>setDeleting(true), pause)
      return ()=>clearTimeout(t)
    }
    const t=setTimeout(()=>{
      if(deleting){
        setN(n-1)
        if(n-1===0) setDeleting(false)
      } else {
        setN(n+1)
      }
    }, deleting?deleteSpeed:speed)
    return ()=>clearTimeout(t)
  },[n,deleting,done,loop,speed,deleteSpeed,pause,onDone,started,reduce])
  if(reduce) return <span className={className} style={{whiteSpace:'pre-line'}}>{text}</span>
  return (
    <span className={className} style={{whiteSpace:'pre-line'}}>
      {text.slice(0,n)}<span className="tw-cursor" aria-hidden="true">|</span>
    </span>
  )
}

const fmtEuro = (n) => '€ ' + Math.round(n).toLocaleString('en-US')

export default function App(){
  // Cart persists in localStorage. Only {key,qty} is stored — images/prices are
  // re-resolved from the catalogue on load (asset URLs are content-hashed per build).
  const [cart,setCart]=useState(()=>{
    try{
      const raw = localStorage.getItem('auk-cart')
      const saved = raw ? JSON.parse(raw) : []
      if(!Array.isArray(saved)) return []
      return saved.flatMap(s=>{
        const p = allProducts.find(x=>x.id===s?.key)
        const qty = Math.floor(Number(s?.qty))
        if(!p || !(qty>0)) return []
        return [{key:p.id, name:p.name, price:p.price, img:p.img, qty}]
      })
    }catch{ return [] }
  })
  const [drawer,setDrawer]=useState(false)
  const [toast,setToast]=useState('')
  const [modal,setModal]=useState(null)
  const [craftOpen,setCraftOpen]=useState('01')
  const [form,setForm]=useState({name:'',last:'',phone:'',email:'',msg:''})
  const [swatch,setSwatch]=useState(0)
  const [authMode,setAuthMode]=useState(null)
  const [cartOpen,setCartOpen]=useState(false)
  const [shopIn,setShopIn]=useState(false)
  const [scrollCue,setScrollCue]=useState('down') // 'down' | 'up' | 'none'

  useEffect(() => {
    if (modal || authMode || cartOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = 'auto'
    return () => { document.body.style.overflow = 'auto' }
  }, [modal, authMode, cartOpen])

  // persist cart
  useEffect(() => {
    try{ localStorage.setItem('auk-cart', JSON.stringify(cart.map(x=>({key:x.key, qty:x.qty})))) }catch{ /* storage unavailable */ }
  }, [cart])

  // modal open — preload every colorway photo so swatch switching is instant
  useEffect(() => {
    if (modal) (modal.images||[]).forEach(v=>{ const im=new Image(); im.src=v.img })
  }, [modal])

  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]')
    if (!('IntersectionObserver' in window)) { els.forEach(el=>el.setAttribute('data-revealed','')); return }
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(en=>{
        if (en.isIntersecting) { en.target.setAttribute('data-revealed',''); io.unobserve(en.target) }
      })
    }, { threshold:.12, rootMargin:'0px 0px -40px 0px' })
    els.forEach(el=>io.observe(el))
    return () => io.disconnect()
  }, [])

  // Scroll cue: 'down' near top, 'up' near bottom, hidden in the middle
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || document.documentElement.scrollTop
      const max = document.documentElement.scrollHeight - window.innerHeight
      if (y < 80) setScrollCue('down')
      else if (max - y < 120) setScrollCue('up')
      else setScrollCue('none')
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive:true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Escape closes any open overlay (menu drawer, product modal, cart, auth)
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') { setModal(null); setAuthMode(null); setCartOpen(false); setDrawer(false) }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const toastTimer=useRef(null)
  const popToast=(m)=>{ 
    setToast(m); 
    if(toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(()=>setToast(''),2200);
  }
  const addToCart=(p)=>{
    const item = p || modal
    if(!item) return
    const key = item.id
    setCart(prev=>{
      const found = prev.find(x=>x.key===key)
      if(found) return prev.map(x=>x.key===key?{...x,qty:x.qty+1}:x)
      return [...prev, {key, name:item.name, price:item.price, img:item.img || (item.images&&item.images[0]?.img), qty:1}]
    })
    popToast('Added to cart'); setModal(null)
  }
  const changeQty=(key,d)=>setCart(prev=>prev.flatMap(x=>{
    if(x.key!==key) return [x]
    const q = x.qty + d
    return q<=0 ? [] : [{...x,qty:q}]
  }))
  const removeFromCart=(key)=>setCart(prev=>prev.filter(x=>x.key!==key))
  const cartCount = cart.reduce((s,x)=>s+x.qty,0)
  const cartTotal = cart.reduce((s,x)=>s + x.price*x.qty, 0)
  const goTo=(id)=>(e)=>{ e.preventDefault(); setDrawer(false); document.querySelector(id)?.scrollIntoView({behavior:'smooth'}) }
  const openModal=(p)=>{ setSwatch(0); setModal(p) }
  // fetch a product's colorway photos ahead of time so swatch switches are instant
  const preloadProduct=(p)=>{ (p.images||[]).forEach(v=>{ const im=new Image(); im.src=v.img }) }
  // product cards are interactive — keyboard support + a11y semantics
  const cardProps=(p)=>({
    role:'button', tabIndex:0, 'aria-label':`View ${p.name}`,
    onClick:()=>openModal(p),
    onMouseEnter:()=>preloadProduct(p),
    onFocus:()=>preloadProduct(p),
    onKeyDown:(e)=>{ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); openModal(p) } },
  })

  return (
    <>
      <nav className="nav">
        <div className="container nav-inner">
          <div className="nav-links left">
            <a href="#collections" onClick={goTo('#collections')}>Collections</a>
            <a href="#craftsmanship" onClick={goTo('#craftsmanship')}>Craftsmanship</a>
            <a href="#atelier" onClick={goTo('#atelier')}>Atelier</a>
          </div>
          <button className="hamburger" onClick={()=>setDrawer(true)} aria-label="Open menu">☰</button>
          <a className="nav-logo" href="#" onClick={e=>{e.preventDefault();window.scrollTo({top:0,behavior:'smooth'})}}>A U K</a>
          <div className="nav-right">
            <a href="#contact" onClick={goTo('#contact')} className="label">Contact</a>
            <button className="icon-btn" aria-label="cart" onClick={()=>setCartOpen(true)}><CartIcon />{cartCount>0 && <span className="cart-badge">{cartCount}</span>}</button>
            <button className="icon-btn" aria-label="account" onClick={()=>setAuthMode('login')}><UserIcon /></button>
          </div>
        </div>
      </nav>

      <div className={'drawer '+(drawer?'open':'')} onClick={()=>setDrawer(false)}>
        <button style={{alignSelf:'end',background:'none',border:'none',fontSize:22}} onClick={()=>setDrawer(false)} aria-label="Close menu">✕</button>
        <a href="#collections" onClick={goTo('#collections')}>Collections</a>
        <a href="#craftsmanship" onClick={goTo('#craftsmanship')}>Craftsmanship</a>
        <a href="#atelier" onClick={goTo('#atelier')}>Atelier</a>
        <a href="#contact" onClick={goTo('#contact')}>Contact</a>
      </div>

      {/* HERO */}
      <section className="hero">
        <img className="hero-img" src={hero} alt="AUK — model surrounded by luxury bags" fetchPriority="high" />
        <p className="hero-copy"><TypeText text={"WE MAKE IT\nHAPPEN"} loop speed={110} deleteSpeed={55} pause={7000} startDelay={2500} onDone={()=>setShopIn(true)} /></p>
        <a className={'underline-link hero-shop'+(shopIn?' show':'')} href="#collections" onClick={goTo('#collections')}>Make your order</a>
      </section>

      {/* SIGNATURE */}
      <div className="stitch-line" role="presentation" />
      <section id="collections" className="section container">
        <div className="section-head" data-reveal>
          <h2><span className="rl">Explore Our</span><span className="rl"><em>Signature Collections</em></span></h2>
          <a className="muted view-all" href="#" onClick={e=>{e.preventDefault();popToast('Full collection — coming soon')}}>VIEW ALL BAGS</a>
        </div>
        <div className="sig-grid">
          {signature.map((p,i)=>(
            <div key={p.id} className="card" {...cardProps(p)} data-reveal style={{transitionDelay:(i*80)+'ms'}}>
              <div className="card-img"><img src={p.img} alt={p.name} loading="lazy" decoding="async" /></div>
              <div className="card-label">{p.name}</div>
              <div className="price">{fmtEuro(p.price)}</div>
            </div>
          ))}
        </div>

        {/* MODERN ELEGANCE */}
        <div className="elegance">
          <div className="elegance-left" data-reveal>
                      <img src={customTote} alt="Model holding cream tote" loading="lazy" decoding="async" />
          </div>
          <div className="elegance-right" data-reveal style={{transitionDelay:'140ms'}}>
            <div>
              <div className="kicker">MODERN ELEGANCE IN EVERY DETAIL</div>
              <p>AUK handbags are known for their understated elegance and functionality. Crafted from high-quality leather and durable materials, each AUK bag exudes timeless sophistication — blending classic designs with modern twists for the practical needs of today&apos;s stylish woman.</p>
              <p>A blend of artistry and functionality that inspires women around the world to embrace their own unique journeys, one handbag at a time.</p>
            </div>
            <div className="elegance-bottom">
              <img src={elegance2} alt="Brown leather tote detail" loading="lazy" decoding="async" />
            </div>
          </div>
        </div>
      </section>

      {/* CRAFTSMANSHIP */}
      <section id="craftsmanship" className="craft container">
        <div className="craft-head" data-reveal>
          <h2><span className="rl">The Art of Craftsmanship</span></h2>
          <span className="craft-brand">AUK</span>
        </div>
        <div className="acc">
          {craftRows.map(r=>(
            <div key={r.n} className={'acc-row'+(craftOpen===r.n?' active':'')} onClick={()=>setCraftOpen(craftOpen===r.n?null:r.n)} data-reveal>
              <div className="acc-line">
                <span className="acc-num">{r.n}.</span>
                <span className="acc-title">{r.t}</span>
                <span className="acc-cta">EXPLORE DETAILS <i className="acc-arrow">{craftOpen===r.n?'⌄':'↗'}</i></span>
              </div>
              {craftOpen===r.n && (
                <div className="acc-body">
                  <img src={r.img} alt={r.t} loading="lazy" decoding="async" />
                  <p>{r.desc}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* THE MAKING — process strip */}
        <div className="making" data-reveal>
          <div className="making-head">
            <span className="kicker">THE MAKING</span>
            <span className="muted">FROM LEATHER TO LIFETIME</span>
          </div>
          <div className="making-grid">
            {makingSteps.map((s,i)=>(
              <div className="making-step" key={s.n} data-reveal style={{transitionDelay:(i*90)+'ms'}}>
                <div className="making-img"><img src={s.img} alt={s.alt} loading="lazy" decoding="async" /></div>
                <div className="making-meta">
                  <span className="making-num">{s.n}</span>
                  <span className="making-label">{s.t}</span>
                </div>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* TIMELESS */}
        <div className="timeless">
          <span className="tl-cap tl-cap-1">Minimal shapes created by thoughtful design decisions.</span>
          <div className="tl-orbit">
            <span className="tl-word tl-1" data-reveal>Timeless</span>
            <span className="tl-word tl-2" data-reveal style={{transitionDelay:'90ms'}}>Everyday</span>
            <span className="tl-word tl-3" data-reveal style={{transitionDelay:'180ms'}}>Elegance</span>
          </div>
          <span className="tl-cap tl-cap-2">Crafted from a premium leather with a luxurious finish.</span>
          <div className="timeless-img">
            <img src={customTote} alt="AUK leather tote" loading="lazy" decoding="async" />
          </div>
          <a className="underline-link tl-shop" href="#collections" onClick={goTo('#collections')}>Shop now</a>
        </div>
      </section>

      {/* POPULAR */}
      <section className="container pop-section">
        <div className="pop-head" data-reveal>
          <h2><span className="rl">Popular Models</span></h2>
          <a className="muted view-all" href="#" onClick={e=>{e.preventDefault();popToast('All models — coming soon')}}>VIEW ALL BAGS</a>
        </div>
        <div className="pop-grid">
          {popularRow1.map((p,i)=>(
            <div key={p.id} className={'pop-card'+(p.large?' large':'')} {...cardProps(p)} data-reveal style={{transitionDelay:(i*80)+'ms'}}>
              <div className="card-img"><img src={p.img} alt={p.name} loading="lazy" decoding="async" /></div>
              <div className="card-label">{p.name}</div>
              <div className="price">{fmtEuro(p.price)}</div>
            </div>
          ))}
        </div>
        <div className="pop-grid2">
          {popularRow2.map((p,i)=>(
            <div key={p.id} className={'pop-card offset-'+i} {...cardProps(p)} data-reveal style={{transitionDelay:(i*80)+'ms'}}>
              <div className="card-img"><img src={p.img} alt={p.name} loading="lazy" decoding="async" /></div>
              <div className="card-label">{p.name}</div>
              <div className="price">{fmtEuro(p.price)}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CRAFTED BY */}
      <div className="stitch-line" role="presentation" />
      <section id="atelier" className="crafted container">
        <div className="crafted-head" data-reveal>
          <h2><span className="rl">Crafted By</span></h2>
          <span className="muted">THE STORY</span>
        </div>
        <div className="founder">
          <div className="founder-img" data-reveal>
            <img src={boss} alt="The founder of AUK" loading="lazy" decoding="async" />
          </div>
          <div className="founder-body" data-reveal>
            <div className="kicker">AUK BRAND FOUNDER — C.E.O</div>
            <h3>SHYAKA sam_Art</h3>
            <p>His designs not only captivate the fashion world but also embody AUK&apos;s commitment to luxury and individuality, making him a driving force behind the brand&apos;s continued success and global recognition.</p>
            <p>The name &ldquo;AUK&rdquo; was born in a high-school classroom — he used to repeat &ldquo;as you know&rdquo; during his class representations, until the students started calling him exactly that. The nickname stuck. The brand carries it.</p>
            <span className="founder-sign">AUK — MAKE IT HAPPEN · AS U KNOW!</span>
          </div>
        </div>
        <div className="shop-slot" data-reveal>
          <div className="shop-img">
            <img src={team} alt="The AUK summer internship team" loading="lazy" decoding="async" />
          </div>
          <div className="shop-cap">
            <div className="kicker">ABOUT OUR TEAM</div>
            <p>In the land of a thousand hills — Kigali, Rwanda — three individuals embarked on an unexpected journey when they joined the AUK handbag brand for a summer internship. Each brought a unique set of skills and dreams to the table, unaware of the transformative experience that awaited them.</p>
          </div>
        </div>
        <div className="shop-slot" data-reveal>
          <div className="shop-img">
            <img src={atelier} alt="The AUK workshop" loading="lazy" decoding="async" />
          </div>
          <div className="shop-cap">
            <div className="kicker">THE WORKSHOP</div>
            <p>Every bag you see starts here in our Kigali atelier — where the leather is cut and stitched by hand. A full look inside is coming soon.</p>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="contact container">
        <div className="big-v">A<br/>U<br/>K</div>
        <div className="contact-mid" data-reveal>
          <h3>Can&apos;t Find the<br/>Perfect Bag?</h3>
          <img src={sideModel} alt="Model with bag" className="side-img" loading="lazy" decoding="async" />
          <div className="side-caption">CREATE YOUR OWN CUSTOM DESIGN WITH AUK.</div>
        </div>
        <form className="form" data-reveal style={{transitionDelay:'140ms'}} onSubmit={e=>{
          e.preventDefault()
          if(!form.name || !form.email) return popToast('Please fill name and email')
          popToast('Request sent — we will contact you soon!')
          setForm({name:'',last:'',phone:'',email:'',msg:''})
        }}>
          <small>LEAVE YOUR CONTACT DETAILS AND WE WILL CONTACT YOU SOON.</small>
          <input className="input" placeholder="NAME" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />
          <input className="input" placeholder="LAST NAME" value={form.last} onChange={e=>setForm({...form,last:e.target.value})} />
          <input className="input" placeholder="YOUR PHONE" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} />
          <input className="input" type="email" placeholder="YOUR EMAIL" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} />
          <textarea className="input" placeholder="MESSAGE" rows={3} value={form.msg} onChange={e=>setForm({...form,msg:e.target.value})} />
          <button type="submit" className="btn-request">REQUEST CUSTOM BAG →</button>
        </form>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container foot-grid">
          <div className="foot-col">
            <h4>AUK</h4>
            <p>WHERE ELEGANCE MEETS FUNCTIONALITY IN EVERY STITCH.</p>
          </div>
          <div className="foot-col">
            <h4>NAVIGATION</h4>
            <p><a href="#collections" onClick={goTo('#collections')}>Collections</a><br/><a href="#craftsmanship" onClick={goTo('#craftsmanship')}>Craftsmanship</a><br/><a href="#atelier" onClick={goTo('#atelier')}>Atelier</a><br/><a href="#contact" onClick={goTo('#contact')}>Contact</a></p>
          </div>
          <div className="foot-col">
            <h4>SUPPORT</h4>
            <p><a href="#" onClick={e=>{e.preventDefault();popToast('Help Center — soon')}}>Help Center</a><br/><a href="#" onClick={e=>{e.preventDefault();popToast('FAQ — soon')}}>FAQ</a><br/><a href="#" onClick={e=>{e.preventDefault();popToast('Terms — soon')}}>Terms</a><br/><a href="#" onClick={e=>{e.preventDefault();popToast('Privacy — soon')}}>Privacy</a></p>
          </div>
          <div className="foot-col">
            <h4>STAY UP TO DATE</h4>
            <div className="socials">
              <a href="#" onClick={e=>{e.preventDefault();popToast('Instagram')}} aria-label="Instagram"><InstaIcon /></a>
              <a href="#" onClick={e=>{e.preventDefault();popToast('Facebook')}} aria-label="Facebook"><FbIcon /></a>
              <a href="#" onClick={e=>{e.preventDefault();popToast('X')}} aria-label="X"><XIcon /></a>
            </div>
          </div>
        </div>
        <div className="container foot-bottom">
          <span>KG 601 ST 41,<br/>KIGALI, RWANDA</span>
          <span>© {new Date().getFullYear()} AUK ALL RIGHTS RESERVED.</span>
          <span className="foot-contact">
            EMAIL: SAMSHYAKA12@GMAIL.COM<br/>TEL: +250 782 551 960
          </span>
        </div>
        <div className="foot-watermark-wrap"><div className="foot-watermark">AUK</div></div>
      </footer>

      {toast && <div className="toast show">{toast}</div>}

      {modal && (
        <div className="modal" onClick={()=>setModal(null)}>
          <div style={{position:'relative',width:'100%',maxWidth:900}} role="dialog" aria-modal="true" aria-label={modal.name} onClick={e=>e.stopPropagation()}>
            <button className="modal-x" onClick={()=>setModal(null)}>✕</button>
            <div className="modal-card">
              <img src={(modal.images||[{img:modal.img}])[swatch]?.img || modal.img} alt={modal.name} decoding="async" />
              <div className="modal-body">
                <small className="crumbs">Home&ensp;/&ensp;Collection&ensp;/&ensp;{modal.name}</small>
                <h3>{modal.name}</h3>
                <div className="modal-price">{fmtEuro(modal.price)}</div>
                <div className="swatches">
                  {(modal.images||[{color:'#D8D3CC',img:modal.img}]).map((v,i)=><button key={i} type="button" aria-label={'color '+v.color} className={'swatch '+(swatch===i?'active':'')} style={{background:v.color}} onClick={()=>setSwatch(i)} />)}
                </div>
                <ul className="spec-list">
                  <li><strong>Material:</strong> {modal.material}</li>
                  <li><strong>Dimensions:</strong> {modal.dimensions}</li>
                  {(modal.features||[]).map(f=><li key={f}>{f}</li>)}
                </ul>
                <p className="modal-desc">{modal.desc}</p>
                <div className="modal-actions">
                  <button className="btn outline" onClick={() => addToCart(modal)}>ORDER NOW</button>
                  <button className="btn ghost" onClick={()=>{setModal(null);document.querySelector('#contact')?.scrollIntoView({behavior:'smooth'})}}>ORDER CUSTOM VERSION</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CART PANEL */}
      {cartOpen && (
        <div className="modal cart-modal" onClick={()=>setCartOpen(false)}>
          <div className="cart-panel" role="dialog" aria-modal="true" aria-label="Shopping cart" onClick={e=>e.stopPropagation()}>
            <div className="cart-head">
              <h3>YOUR CART{ ' ' }<span className="cart-count">({cartCount})</span></h3>
              <button className="cart-x" onClick={()=>setCartOpen(false)} aria-label="close">✕</button>
            </div>
            <div className="cart-body">
              {cart.length===0 ? (
                <div className="cart-empty">
                  <p>Your cart is empty.</p>
                  <button className="btn outline" onClick={()=>{setCartOpen(false);document.querySelector('#collections')?.scrollIntoView({behavior:'smooth'})}}>BROWSE COLLECTION</button>
                </div>
              ) : cart.map(item=>(
                <div className="cart-item" key={item.key}>
                  <img className="cart-thumb" src={item.img} alt={item.name} />
                  <div className="cart-item-body">
                    <div className="cart-item-name">{item.name}</div>
                    <div className="cart-item-price">{fmtEuro(item.price)}</div>
                    <div className="cart-qty">
                      <button className="qty-btn" onClick={()=>changeQty(item.key,-1)} aria-label="decrease">−</button>
                      <span className="qty-num">{item.qty}</span>
                      <button className="qty-btn" onClick={()=>changeQty(item.key,1)} aria-label="increase">+</button>
                      <button className="cart-remove" onClick={()=>removeFromCart(item.key)}>Remove</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {cart.length>0 && (
              <div className="cart-foot">
                <div className="cart-total">
                  <span>TOTAL</span>
                  <span className="cart-total-val">{fmtEuro(cartTotal)}</span>
                </div>
                <button className="btn outline cart-checkout" onClick={()=>{setCartOpen(false);document.querySelector('#contact')?.scrollIntoView({behavior:'smooth'})}}>CHECKOUT</button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* AUTH MODAL */}
      {authMode && (
        <div className="modal auth-modal" onClick={()=>setAuthMode(null)}>
          <div className="auth-container" role="dialog" aria-modal="true" aria-label={authMode==='login'?'Sign in':'Create account'} onClick={e=>e.stopPropagation()}>
            <button className="modal-x auth-x" onClick={()=>setAuthMode(null)}>✕</button>
            <div className="auth-content">
              <h2 className="auth-title">{authMode==='login'?'SIGN IN':'CREATE ACCOUNT'}</h2>
              <p className="auth-subtitle">
                {authMode==='login'?'Welcome back. Sign in to access your account.':'Join AUK for exclusive access to new collections and personalized services.'}
              </p>
              <form className="auth-form" onSubmit={e=>{e.preventDefault();popToast(authMode==='login'?'Welcome back!':'Account created!');setAuthMode(null)}}>
                {authMode==='register'&&(
                  <div className="auth-row">
                    <input className="auth-input" placeholder="FIRST NAME" required />
                    <input className="auth-input" placeholder="LAST NAME" required />
                  </div>
                )}
                <input className="auth-input" type="email" placeholder="EMAIL ADDRESS" required />
                <input className="auth-input" type="password" placeholder="PASSWORD" required />
                {authMode==='register'&&(
                  <input className="auth-input" type="password" placeholder="CONFIRM PASSWORD" required />
                )}
                {authMode==='login'&&(
                  <a href="#" className="auth-forgot" onClick={e=>{e.preventDefault();popToast('Reset link sent')}}>Forgot password?</a>
                )}
                <button type="submit" className="auth-submit">
                  {authMode==='login'?'SIGN IN →':'CREATE ACCOUNT →'}
                </button>
              </form>
              <div className="auth-divider"><span>OR</span></div>
              <div className="auth-toggle">
                {authMode==='login'?(
                  <p>Don't have an account? <button className="auth-link" onClick={()=>setAuthMode('register')}>Create one</button></p>
                ):(
                  <p>Already have an account? <button className="auth-link" onClick={()=>setAuthMode('login')}>Sign in</button></p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MAKER'S STAMP — fixed, follows the user while scrolling */}
      <div className="stamp" aria-hidden="true">
        <svg viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="58" fill="rgba(255,255,255,.85)" />
          <g className="stamp-ring">
            <defs>
              <path id="stamp-orbit" d="M60,60 m-45,0 a45,45 0 1,1 90,0 a45,45 0 1,1 -90,0" />
            </defs>
            <circle cx="60" cy="60" r="57.5" fill="none" stroke="#3d3833" strokeOpacity=".55" strokeWidth="1" strokeDasharray="2.5 3.5" />
            <text className="stamp-text"><textPath href="#stamp-orbit">HANDCRAFTED · KIGALI · RWANDA · AUK ·</textPath></text>
          </g>
          <circle cx="60" cy="60" r="33" fill="none" stroke="#3d3833" strokeOpacity=".55" strokeWidth="1" />
          <text x="60" y="59" textAnchor="middle" className="stamp-auk">AUK</text>
          <text x="60" y="73" textAnchor="middle" className="stamp-sub">MAKE IT HAPPEN</text>
        </svg>
      </div>

      {/* SCROLL CUE + BACK TO TOP */}
      <div className={'scroll-cue '+(scrollCue==='down'?'show down':scrollCue==='up'?'show up':'')} aria-hidden="true">
        {scrollCue==='up'
          ? <button className="cue-btn" onClick={()=>window.scrollTo({top:0,behavior:'smooth'})}>
              <span className="cue-arrow">↑</span><span className="cue-text">BACK TO TOP</span>
            </button>
          : <><span className="cue-text">SCROLL TO EXPLORE</span><span className="cue-arrow">↓</span></>}
      </div>
    </>
  )
}
