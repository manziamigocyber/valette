import { useState, useRef, useEffect } from 'react'
import hero from './assets/Simbi_Bag4.jpg'
import boss from './assets/bossimage.jpeg'
import atelier from './assets/_A9A0835_copy.jpg'
import elegance1 from './assets/_A9A0861_copy.jpg'
import elegance2 from './assets/_A9A0848_copy.jpg'
import realSimbi from './assets/Simbi_Bag.jpg'
import realSimbi1 from './assets/Simbi_Bag1.jpg'
import realSimbi2 from './assets/Simbi_Bag2.jpg'
import realSimbi3 from './assets/Simbi_Bag3.jpg'
import realA825 from './assets/_A9A0861_copy.jpg'
import realA828 from './assets/_A9A0828_copy.jpg'
import realA830 from './assets/_A9A0830_copy.jpg'
import realA833 from './assets/_A9A0833_copy.jpg'
import realA851 from './assets/_A9A0851_copy.jpg'
import realA853 from './assets/_A9A0853_copy.jpg'
import realA855 from './assets/_A9A0855_copy.jpg'
import realA856 from './assets/_A9A0856_copy.jpg'
import realA859 from './assets/_A9A0859_copy.jpg'
import realA863 from './assets/_A9A0863_copy.jpg'
import realA867 from './assets/_A9A0867_copy.jpg'
import realA869 from './assets/_A9A0869_copy.jpg'
import realA872 from './assets/_A9A0872_copy.jpg'
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
function TypeText({ text, speed = 55, deleteSpeed = 28, pause = 1600, loop = false, className, onDone }){
  const [n,setN]=useState(0)
  const [deleting,setDeleting]=useState(false)
  const fired=useRef(false)
  const reduce = typeof window!=='undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if(reduce) return <span className={className} style={{whiteSpace:'pre-line'}}>{text}</span>
  const full=text.length
  const done = !deleting && n>=full
  useEffect(()=>{
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
  },[n,deleting,done,loop,speed,deleteSpeed,pause,onDone])
  return (
    <span className={className} style={{whiteSpace:'pre-line'}}>
      {text.slice(0,n)}<span className="tw-cursor" aria-hidden="true">|</span>
    </span>
  )
}

const signature = [
  { id:'ew', name:'EAST-WEST BAG', price:'€ 1,340', img: realA856, images:[
    {color:'#D8D3CC',img:realA856},{color:'#111111',img:realA830},{color:'#8B5A2B',img:realA853} ]},
  { id:'mb', name:'MODERN BUCKET', price:'€ 1,290', img: realA863, images:[
    {color:'#D8D3CC',img:realA863},{color:'#111111',img:realSimbi2},{color:'#8B5A2B',img:realA872} ]},
  { id:'ns', name:'NORTH-SOUTH TOTE', price:'€ 1,420', img: realA855, images:[
    {color:'#D8D3CC',img:realA855},{color:'#111111',img:realSimbi3},{color:'#8B5A2B',img:realA851} ]},
  { id:'st', name:'STRUCTURED TOTE', price:'€ 1,560', img: realA867, images:[
    {color:'#D8D3CC',img:realA867},{color:'#111111',img:realA859},{color:'#8B5A2B',img:realSimbi} ]},
]

const popularRow1 = [
  { id:'aurelia', name:'AURELIA TOTE', price:'€ 1,240', img: realSimbi1, large:true },
  { id:'aurelia2', name:'AURELIA TOTE', price:'€ 1,340', img: realA872 },
  { id:'aurelia3', name:'AURELIA TOTE', price:'€ 1,340', img: realA853 },
]

const popularRow2 = [
  { id:'luxe', name:'LUXEJOIE BAG', price:'€ 1,340', img: realA851 },
  { id:'elara', name:'ELARA BAG', price:'€ 1,540', img: realSimbi2 },
  { id:'aurelia4', name:'AURELIA TOTE', price:'€ 940', img: realA830 },
]

const craftRows = [
  {n:'01',t:'MATERIALS',img:realA869,desc:'Full-grain leathers, solid brass hardware, and microfiber linings selected for decades of use.'},
  {n:'02',t:'CUSTOM DESIGN',img:realA825,desc:'Every bag is made to match your personal style and preferences. You can choose the size, color, and details that suit you best.'},
  {n:'03',t:'TIMELESS QUALITY',img:realSimbi,desc:'Reinforced stitching, hand-painted edges, and rigorous quality control ensure lasting beauty.'},
  {n:'04',t:'HANDCRAFTED',img:realA828,desc:'Cut, stitched and finished by hand in our London atelier — 14 hours per bag on average.'},
]

export default function App(){
  const [cart,setCart]=useState(0)
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
    if (modal || authMode) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = 'auto'
    return () => { document.body.style.overflow = 'auto' }
  }, [modal, authMode])

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

  const toastTimer=useRef(null)
  const popToast=(m)=>{ 
    setToast(m); 
    if(toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(()=>setToast(''),2200);
  }
  const addToCart=()=>{ setCart(c=>c+1); popToast('Added to cart'); setModal(null) }
  const goTo=(id)=>(e)=>{ e.preventDefault(); setDrawer(false); document.querySelector(id)?.scrollIntoView({behavior:'smooth'}) }
  const openModal=(p)=>{ setSwatch(0); setModal(p) }

  return (
    <>
      <nav className="nav">
        <div className="container nav-inner">
          <div className="nav-links left">
            <a href="#collections" onClick={goTo('#collections')}>Collections</a>
            <a href="#craftsmanship" onClick={goTo('#craftsmanship')}>Craftsmanship</a>
            <a href="#atelier" onClick={goTo('#atelier')}>Atelier</a>
          </div>
          <button className="hamburger" onClick={()=>setDrawer(true)} aria-label="menu">☰</button>
          <a className="nav-logo" href="#" onClick={e=>{e.preventDefault();window.scrollTo({top:0,behavior:'smooth'})}}>A U K</a>
          <div className="nav-right">
            <a href="#contact" onClick={goTo('#contact')} className="label">Contact</a>
            <button className="icon-btn" aria-label="cart" onClick={()=>popToast('Cart: '+cart+' items')}><CartIcon />{cart>0 && <span className="cart-badge">{cart}</span>}</button>
            <button className="icon-btn" aria-label="account" onClick={()=>setAuthMode('login')}><UserIcon /></button>
          </div>
        </div>
      </nav>

      <div className={'drawer '+(drawer?'open':'')} onClick={()=>setDrawer(false)}>
        <button style={{alignSelf:'end',background:'none',border:'none',fontSize:22}} onClick={()=>setDrawer(false)}>✕</button>
        <a href="#collections" onClick={goTo('#collections')}>Collections</a>
        <a href="#craftsmanship" onClick={goTo('#craftsmanship')}>Craftsmanship</a>
        <a href="#atelier" onClick={goTo('#atelier')}>Atelier</a>
        <a href="#contact" onClick={goTo('#contact')}>Contact</a>
      </div>

      {/* HERO */}
      <section className="hero">
        <img className="hero-img" src={hero} alt="AUK — model surrounded by luxury bags" />
        <p className="hero-copy"><TypeText text={"WE MAKE IT\nHAPPEN"} loop onDone={()=>setShopIn(true)} /></p>
        <a className={'underline-link hero-shop'+(shopIn?' show':'')} href="#collections" onClick={goTo('#collections')}>Shop now</a>
      </section>

      {/* SIGNATURE */}
      <section id="collections" className="section container">
        <div className="section-head" data-reveal>
          <h2><span className="rl">Explore Our</span><span className="rl"><em>Signature Collections</em></span></h2>
          <a className="muted view-all" href="#" onClick={e=>{e.preventDefault();popToast('Full collection — coming soon')}}>VIEW ALL BAGS</a>
        </div>
        <div className="sig-grid">
          {signature.map((p,i)=>(
            <div key={p.id} className="card" onClick={()=>openModal(p)} data-reveal style={{transitionDelay:(i*80)+'ms'}}>
              <div className="card-img"><img src={p.img} alt={p.name} /></div>
              <div className="card-label">{p.name}</div>
              <div className="price">{p.price}</div>
            </div>
          ))}
        </div>

        {/* MODERN ELEGANCE */}
        <div className="elegance">
          <div className="elegance-left" data-reveal>
            <img src={elegance1} alt="Model holding cream tote" />
          </div>
          <div className="elegance-right" data-reveal style={{transitionDelay:'140ms'}}>
            <div>
              <div className="kicker">MODERN ELEGANCE IN EVERY DETAIL</div>
              <p>Our pieces are not just clothing — they are a form of self-expression. Each design is thoughtfully crafted with precision and attention to detail, using high-quality materials.</p>
            </div>
            <div className="elegance-bottom">
              <img src={elegance2} alt="Brown leather tote detail" />
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
                  <img src={r.img} alt={r.t} />
                  <p>{r.desc}</p>
                </div>
              )}
            </div>
          ))}
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
            <img src={realA825} alt="AUK leather tote" />
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
            <div key={p.id} className={'pop-card'+(p.large?' large':'')} onClick={()=>openModal(p)} data-reveal style={{transitionDelay:(i*80)+'ms'}}>
              <div className="card-img"><img src={p.img} alt={p.name} /></div>
              <div className="card-label">{p.name}</div>
              <div className="price">{p.price}</div>
            </div>
          ))}
        </div>
        <div className="pop-grid2">
          {popularRow2.map((p,i)=>(
            <div key={p.id} className={'pop-card offset-'+i} onClick={()=>openModal(p)} data-reveal style={{transitionDelay:(i*80)+'ms'}}>
              <div className="card-img"><img src={p.img} alt={p.name} /></div>
              <div className="card-label">{p.name}</div>
              <div className="price">{p.price}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CRAFTED BY */}
      <section id="atelier" className="crafted container">
        <div className="crafted-head" data-reveal>
          <h2><span className="rl">Crafted By</span></h2>
          <span className="muted">THE STORY</span>
        </div>
        <div className="founder">
          <div className="founder-img" data-reveal>
            <img src={boss} alt="The founder of AUK" />
          </div>
          <div className="founder-body" data-reveal>
            <div className="kicker">THE MAN BEHIND AUK</div>
            <h3>Every piece starts with a vision — his.</h3>
            <p>What began as a personal obsession with leather, hardware, and honest craft became a maison. Each AUK bag starts as a sketch and ends in your hands — cut, stitched, and finished by people who treat every piece like it's the only one that matters. No shortcuts. No compromise. Just bags built to last a lifetime.</p>
            <span className="founder-sign">AUK — WE MAKE IT HAPPEN</span>
          </div>
        </div>
        <div className="shop-slot" data-reveal>
          <div className="shop-img">
            <img src={atelier} alt="The AUK workshop" />
          </div>
          <div className="shop-cap">
            <div className="kicker">THE WORKSHOP</div>
            <p>Every bag you see starts here — where the leather is cut and stitched by hand. A full look inside the atelier is coming soon.</p>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="contact container">
        <div className="big-v">A<br/>U<br/>K</div>
        <div className="contact-mid" data-reveal>
          <h3>Can&apos;t Find the<br/>Perfect Bag?</h3>
          <img src={realA833} alt="Model with bag" className="side-img" />
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
          <input className="input" placeholder="YOUR EMAIL" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} />
          <textarea className="input" placeholder="MESSAGE" rows={3} value={form.msg} onChange={e=>setForm({...form,msg:e.target.value})} />
          <button type="submit" className="btn-request">REQUEST CUSTOM BAG →</button>
        </form>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container foot-grid">
          <div className="foot-col">
            <h4>AUK</h4>
            <p>CUSTOM LUXURY BAGS</p>
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
          <span>45 ELM AVENUE,<br/>LONDON, UNITED KINGDOM</span>
          <span>© 2026 AUK ALL RIGHTS RESERVED.</span>
          <span className="foot-contact">
            EMAIL: INFO@AUK.COM<br/>PHONE: +44 20 0000 000
          </span>
        </div>
        <div className="foot-watermark-wrap"><div className="foot-watermark">AUK</div></div>
      </footer>

      {toast && <div className="toast show">{toast}</div>}

      {modal && (
        <div className="modal" onClick={()=>setModal(null)}>
          <div style={{position:'relative',width:'100%',maxWidth:900}} onClick={e=>e.stopPropagation()}>
            <button className="modal-x" onClick={()=>setModal(null)}>✕</button>
            <div className="modal-card">
              <img src={(modal.images||[{img:modal.img}])[swatch]?.img || modal.img} alt={modal.name} />
              <div className="modal-body">
                <small className="crumbs">Home&ensp;/&ensp;Collection&ensp;/&ensp;{modal.name}</small>
                <h3>{modal.name}</h3>
                <div className="modal-price">{modal.price}</div>
                <div className="swatches">
                  {(modal.images||[{color:'#D8D3CC',img:modal.img}]).map((v,i)=><button key={i} type="button" aria-label={'color '+v.color} className={'swatch '+(swatch===i?'active':'')} style={{background:v.color}} onClick={()=>setSwatch(i)} />)}
                </div>
                <ul className="spec-list">
                  <li><strong>Material:</strong> Full-grain leather</li>
                  <li><strong>Dimensions:</strong> 38 × 28 × 14 cm</li>
                  <li>Premium full-grain leather</li>
                  <li>Spacious interior compartment</li>
                  <li>Handcrafted construction</li>
                  <li>Soft microfiber lining</li>
                </ul>
                <p className="modal-desc">The AUK Élan Tote is designed for women who appreciate minimalist design and high-quality craftsmanship. The bag offers spacious interior, durable materials, and timeless style that fits both casual and elegant outfits.</p>
                <div className="modal-actions">
                  <button className="btn outline" onClick={addToCart}>ORDER NOW</button>
                  <button className="btn ghost" onClick={()=>{setModal(null);document.querySelector('#contact')?.scrollIntoView({behavior:'smooth'})}}>ORDER CUSTOM VERSION</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AUTH MODAL */}
      {authMode && (
        <div className="modal auth-modal" onClick={()=>setAuthMode(null)}>
          <div className="auth-container" onClick={e=>e.stopPropagation()}>
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
