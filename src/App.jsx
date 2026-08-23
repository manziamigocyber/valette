import { useState } from 'react'
import hero from './assets/hero-new.jpg'
import atelier from './assets/atelier.jpg'
import elegance1 from './assets/elegance1.jpg'
import elegance2 from './assets/elegance2.jpg'
import realSimbi from './assets/real/Simbi_Bag.jpg'
import realSimbi1 from './assets/real/Simbi_Bag1.jpg'
import realSimbi2 from './assets/real/Simbi_Bag2.jpg'
import realSimbi3 from './assets/real/Simbi_Bag3.jpg'
import realA825 from './assets/real/_A9A0825_copy.jpg'
import realA828 from './assets/real/_A9A0828_copy.jpg'
import realA830 from './assets/real/_A9A0830_copy.jpg'
import realA833 from './assets/real/_A9A0833_copy.jpg'
import realA838 from './assets/real/_A9A0838_copy.jpg'
import realA851 from './assets/real/_A9A0851_copy.jpg'
import realA853 from './assets/real/_A9A0853_copy.jpg'
import realA855 from './assets/real/_A9A0855_copy.jpg'
import realA856 from './assets/real/_A9A0856_copy.jpg'
import realA859 from './assets/real/_A9A0859_copy.jpg'
import realA863 from './assets/real/_A9A0863_copy.jpg'
import realA867 from './assets/real/_A9A0867_copy.jpg'
import realA869 from './assets/real/_A9A0869_copy.jpg'
import realA872 from './assets/real/_A9A0872_copy.jpg'
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

const artisanImages = [atelier, realA869, realA828, realSimbi3, realA838]
const artisans = [
  { name:'Ethan Carter', role:'Lead Craftsman' },
  { name:'Lucas Reed', role:'Hand Stitching Expert' },
  { name:'Liam Bennett', role:'Leather Specialist' },
  { name:'Noah Sullivan', role:'Senior Artisan' },
  { name:'Oliver Hayes', role:'Pattern Maker' },
]

export default function App(){
  const [cart,setCart]=useState(0)
  const [drawer,setDrawer]=useState(false)
  const [toast,setToast]=useState('')
  const [modal,setModal]=useState(null)
  const [craftOpen,setCraftOpen]=useState('01')
  const [form,setForm]=useState({name:'',last:'',phone:'',email:'',msg:''})
  const [swatch,setSwatch]=useState(0)
  const [slide,setSlide]=useState(0)

  const popToast=(m)=>{ setToast(m); setTimeout(()=>setToast(''),2200) }
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
            <button className="icon-btn" aria-label="account" onClick={()=>popToast('Account — coming soon')}><UserIcon /></button>
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
        <p className="hero-copy">WE MAKE IT<br/>HAPPEN</p>
        <a className="underline-link hero-shop" href="#collections" onClick={goTo('#collections')}>Shop now</a>
      </section>

      {/* SIGNATURE */}
      <section id="collections" className="section container">
        <div className="section-head">
          <h2>Explore Our<br/><em>Signature Collections</em></h2>
          <a className="muted view-all" href="#" onClick={e=>{e.preventDefault();popToast('Full collection — coming soon')}}>VIEW ALL BAGS</a>
        </div>
        <div className="sig-grid">
          {signature.map(p=>(
            <div key={p.id} className="card" onClick={()=>openModal(p)}>
              <div className="card-img"><img src={p.img} alt={p.name} /></div>
              <div className="card-label">{p.name}</div>
              <div className="price">{p.price}</div>
            </div>
          ))}
        </div>

        {/* MODERN ELEGANCE */}
        <div className="elegance">
          <div className="elegance-left">
            <img src={elegance1} alt="Model holding cream tote" />
          </div>
          <div className="elegance-right">
            <div>
              <div className="kicker">MODERN ELEGANCE IN EVERY DETAIL</div>
              <h3>AUK</h3>
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
        <div className="craft-head">
          <h2>The Art of Craftsmanship</h2>
          <span className="craft-brand">AUK</span>
        </div>
        <div className="acc">
          {craftRows.map(r=>(
            <div key={r.n} className={'acc-row'+(craftOpen===r.n?' active':'')} onClick={()=>setCraftOpen(craftOpen===r.n?null:r.n)}>
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
          <span className="tl-word tl-1">Timeless</span>
          <span className="tl-cap tl-cap-2">Crafted from a premium leather with a luxurious finish.</span>
          <span className="tl-word tl-2">Everyday</span>
          <span className="tl-word tl-3">Elegance</span>
          <div className="timeless-img">
            <img src={realA825} alt="AUK leather tote" />
          </div>
          <a className="underline-link tl-shop" href="#collections" onClick={goTo('#collections')}>Shop now</a>
        </div>
      </section>

      {/* POPULAR */}
      <section className="container pop-section">
        <div className="pop-head">
          <h2>Popular Models</h2>
          <a className="muted view-all" href="#" onClick={e=>{e.preventDefault();popToast('All models — coming soon')}}>VIEW ALL BAGS</a>
        </div>
        <div className="pop-grid">
          {popularRow1.map(p=>(
            <div key={p.id} className={'pop-card'+(p.large?' large':'')} onClick={()=>openModal(p)}>
              <div className="card-img"><img src={p.img} alt={p.name} /></div>
              <div className="card-label">{p.name}</div>
              <div className="price">{p.price}</div>
            </div>
          ))}
        </div>
        <div className="pop-grid2">
          {popularRow2.map((p,i)=>(
            <div key={p.id} className={'pop-card offset-'+i} onClick={()=>openModal(p)}>
              <div className="card-img"><img src={p.img} alt={p.name} /></div>
              <div className="card-label">{p.name}</div>
              <div className="price">{p.price}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CRAFTED BY */}
      <section id="atelier" className="crafted container">
        <div className="crafted-head">
          <h2>Crafted By</h2>
          <a className="muted view-all" href="#" onClick={e=>{e.preventDefault();popToast('Meet the atelier — coming soon')}}>LEARN MORE</a>
        </div>
        <div className="crafted-track">
          {[0,1,2,3,4].map(i=>{
            const idx=(slide+i)%artisans.length
            const a=artisans[idx]
            return (
              <div key={idx} className={'crafted-person'+(i===2?' featured':'')}>
                <img src={artisanImages[idx]} alt={a.name} style={{filter:i===2?'none':'grayscale(.35)'}} />
                <h4>{a.name}</h4>
                <p>{a.role}</p>
              </div>
            )
          })}
        </div>
        <div className="crafted-foot">
          <div className="crafted-arrows">
            <button onClick={()=>setSlide(s=>(s+artisans.length-1)%artisans.length)} aria-label="previous">←</button>
            <button onClick={()=>setSlide(s=>(s+1)%artisans.length)} aria-label="next">→</button>
          </div>
          <p className="crafted-desc">The people behind every piece. Skilled hands, years of experience, and attention to every detail define our work. Each bag is crafted with precision and purpose.</p>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="contact container">
        <div className="big-v">A<br/>U<br/>K</div>
        <div className="contact-mid">
          <h3>Can&apos;t Find the<br/>Perfect Bag?</h3>
          <img src={realA833} alt="Model with bag" className="side-img" />
          <div className="side-caption">CREATE YOUR OWN CUSTOM DESIGN WITH AUK.</div>
        </div>
        <form className="form" onSubmit={e=>{
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
          <button type="submit" className="underline-link btn-underline">REQUEST CUSTOM BAG</button>
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
                <h3>AUK Élan Tote</h3>
                <div className="modal-price">$ 1,250 <span>— {modal.price}</span></div>
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
    </>
  )
}
