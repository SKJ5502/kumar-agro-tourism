import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowDown, ArrowRight, ArrowUpRight, BedDouble, Building2, Check,
  Flower2, Gamepad2, Landmark, MapPin, Menu, MessageCircle,
  Mountain, Phone, Sparkles, Sun, Trees, Users, Waves, X,
} from 'lucide-react';
import { IndianWeddingFunctions, ResortEventPackages, ResortRooms } from './ResortDetails.jsx';

const PHONE = '+919309555833';
const WHATSAPP = 'https://wa.me/919309555833?text=' + encodeURIComponent('Hello Kaanan by KS Resort, I would like to enquire about hosting a celebration at your resort.');
const MAP = 'https://www.google.com/maps/search/?api=1&query=Dondaicha+Dhule+Maharashtra+425408';

function Reveal({ children, className = '', delay = 0 }) {
  const reduced = useReducedMotion();
  return <motion.div className={className} initial={reduced ? false : { opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }}
    transition={{ duration: reduced ? 0 : 0.8, delay, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>;
}

function KaananMark({ size = 46, light = false }) {
  return <img className="k-logo-mark"
    src={light ? '/images/kaanan-mark-official.webp' : '/images/kaanan-mark-ink.webp'}
    style={{ width: size, height: 'auto' }}
    alt="" aria-hidden="true" />;
}

function Brand({ light = false }) {
  return <a className={'k-brand'+(light?' k-brand-light':'')} href="#resort-top" aria-label="Kaanan by KS Resort home">
    <KaananMark size={39}/><span className="k-brand-words"><strong>kaanan</strong><small>BY KS RESORT</small></span>
  </a>;
}

function Tag({ children, light = false }) {
  return <div className={'k-eyebrow'+(light?' k-eyebrow-light':'')}><span className="k-eyebrow-rule"/>{children}</div>;
}

function ResortHeader() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const close = e => { if(e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);
  return <header className="k-header">
    <div className="k-nav-wrap">
      <Brand/>
      <nav className={'k-nav'+(open?' k-nav-open':'')} aria-label="Kaanan navigation">
        <a onClick={()=>setOpen(false)} href="#estate">The estate</a>
        <a onClick={()=>setOpen(false)} href="#wedding-functions">Shaadi</a>
        <a onClick={()=>setOpen(false)} href="#resort-packages">Packages</a>
        <a onClick={()=>setOpen(false)} href="#rooms">Rooms</a>
        <a onClick={()=>setOpen(false)} href="#resort-contact">Contact</a>
      </nav>
      <a className="k-header-cta" href={WHATSAPP} target="_blank" rel="noopener noreferrer">Make an enquiry <ArrowUpRight size={17}/></a>
      <button className="k-menu-toggle" type="button" aria-label={open?'Close resort menu':'Open resort menu'} aria-expanded={open}
        onClick={()=>setOpen(v=>!v)}>{open?<X size={23}/>:<Menu size={23}/>}</button>
    </div>
  </header>;
}

function ResortHero() {
  const reduced = useReducedMotion();
  return <section className="k-hero" id="resort-top" aria-labelledby="kaanan-title">
    <div className="k-hero-image" role="img" aria-label="Architectural visualisation of Kaanan by KS Resort and an outdoor wedding celebration"/>
    <div className="k-hero-overlay" aria-hidden="true"/>
    <div className="k-hero-ornament" aria-hidden="true"/>
    <div className="k-hero-inner">
      <motion.div className="k-hero-copy" initial={reduced?false:{opacity:0,y:28}} animate={{opacity:1,y:0}} transition={{duration:1,ease:[.22,1,.36,1]}}>
        <Tag light>THE ART OF BEAUTIFUL BEGINNINGS</Tag>
        <h1 id="kaanan-title">Where forever<br/>begins <em>beautifully.</em></h1>
        <p>Where grand celebrations meet thoughtful elegance. A remarkable setting for Indian weddings, celebrations, business gatherings and considered stays — surrounded by greenery in Dondaicha.</p>
        <div className="k-hero-actions">
          <a className="k-button k-button-gold" href={WHATSAPP} target="_blank" rel="noopener noreferrer">Enquire for your occasion <ArrowUpRight size={19}/></a>
          <a className="k-text-link k-text-link-light" href="#estate">Discover Kaanan <ArrowRight size={19}/></a>
        </div>
      </motion.div>
      <div className="k-hero-calligraphy" aria-hidden="true">A place for<br/><em>forever.</em></div>
    </div>
    <div className="k-hero-bottom"><span>WEDDINGS <i/> CELEBRATIONS <i/> TOGETHERNESS</span><a href="#estate">SCROLL TO EXPLORE <ArrowDown size={16}/></a><span className="k-render-note">ARCHITECTURAL VISUALISATION</span></div>
  </section>;
}

const stats = [
  {value:'15',label:'ACRES OF GREENERY',detail:'An expansive natural backdrop'},
  {value:'02',label:'BANQUET HALLS',detail:'Thoughtfully designed indoor spaces'},
  {value:'300',label:'GUEST ACCOMMODATION',detail:'Planned on-site capacity'},
];
function EstateIntro() {
  return <section className="k-intro" id="estate">
    <div className="k-section-wrap">
      <div className="k-intro-top">
        <Reveal className="k-intro-left"><Tag>THE KAANAN EXPERIENCE</Tag><h2>A destination<br/>as extraordinary<br/>as <em>the occasion.</em></h2></Reveal>
        <Reveal className="k-intro-right" delay={.1}>
          <div className="k-asterisk">✳</div>
          <p>Some days stay with us forever. Kaanan is imagined as the setting for those moments — where architecture, nature, and warm hospitality come together in one exceptional destination.</p>
          <a href="#celebrations" className="k-text-link">Explore our celebration spaces <ArrowUpRight size={18}/></a>
        </Reveal>
      </div>
      <div className="k-stats" aria-label="Resort highlights">
        {stats.map((stat,i)=><Reveal key={stat.value} className="k-stat" delay={i*.08}><strong>{stat.value}</strong><div><span>{stat.label}</span><small>{stat.detail}</small></div></Reveal>)}
      </div>
    </div>
  </section>;
}

const spaces = [
  {num:'01',title:'Two Banquet Halls',sub:'GRANDEUR, INDOORS',icon:Landmark,description:'Elegant spaces envisioned for weddings, receptions, and milestone celebrations.',tone:'pearl'},
  {num:'02',title:'The Celebration Lawn',sub:'OPEN-AIR OCCASIONS',icon:Flower2,description:'An open sky, a sweeping green setting, and space for every unforgettable detail.',tone:'sage'},
  {num:'03',title:'Hilltop Function Area',sub:'ABOVE THE ORDINARY',icon:Mountain,description:'An elevated setting for ceremonies, gatherings, and memories with a view.',tone:'lilac'},
  {num:'04',title:'Conference Hall',sub:'GATHER WITH PURPOSE',icon:Building2,description:'A considered setting for conferences, private events, and purposeful meetings.',tone:'pearl'},
];
function CelebrationSpaces() {
  return <section className="k-spaces-section" id="celebrations">
    <div className="k-section-wrap">
      <Reveal className="k-section-heading"><div><Tag>PLACES WITH PURPOSE</Tag><h2>Every occasion,<br/><em>beautifully framed.</em></h2></div><p>From intimate gatherings to celebrations on a grand scale, discover spaces imagined with every detail in mind.</p></Reveal>
      <div className="k-space-grid">{spaces.map((space,i)=>{
        const Icon=space.icon;
        return <Reveal key={space.title} className={'k-space-card k-space-'+space.tone} delay={i*.07}>
          <div className="k-space-head"><span>{space.num} / 04</span><Icon size={29} strokeWidth={1.25}/></div>
          <div className="k-space-body"><span className="k-space-category">{space.sub}</span><h3>{space.title}</h3><p>{space.description}</p></div>
          <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="k-space-arrow" aria-label={'Enquire about '+space.title}><ArrowUpRight size={20}/></a>
        </Reveal>;
      })}</div>
    </div>
  </section>;
}

const features=[
  {icon:Waves,name:'Swimming Pool',detail:'A refreshing escape'},
  {icon:Users,name:'Amphitheatre',detail:'Space for shared moments'},
  {icon:Trees,name:'Mango Bagicha',detail:'Inspired by the land'},
  {icon:Gamepad2,name:'Game Zone',detail:'Playful experiences'},
  {icon:Sparkles,name:'Fun-Filled Activities',detail:'For every generation'},
  {icon:BedDouble,name:'Guest Accommodation',detail:'Planned for up to 300'},
];
function Amenities() {
  return <section className="k-amenities-section" id="amenities">
    <div className="k-section-wrap k-amenities-layout">
      <Reveal className="k-amenities-heading"><Tag light>MORE THAN A DESTINATION</Tag><h2>Room for<br/>every kind<br/>of <em>joy.</em></h2><p>Thoughtfully conceived amenities to turn a beautiful occasion into an unforgettable experience.</p><a className="k-text-link k-text-link-light" href={WHATSAPP} target="_blank" rel="noopener noreferrer">Ask about the resort <ArrowUpRight size={18}/></a></Reveal>
      <div className="k-amenities-grid">{features.map((f,i)=>{const Icon=f.icon;return <Reveal className="k-amenity" delay={i*.05} key={f.name}><Icon size={34} strokeWidth={1.1}/><h3>{f.name}</h3><p>{f.detail}</p></Reveal>;})}</div>
    </div>
  </section>;
}

function EstateGallery() {
  return <section className="k-gallery-section" id="gallery"><div className="k-section-wrap">
    <Reveal className="k-gallery-heading"><Tag>THE VISION</Tag><h2>A glimpse of <em>Kaanan.</em></h2><p>A setting where the celebration and the scenery feel equally special.</p></Reveal>
    <div className="k-gallery-grid">
      <Reveal className="k-gallery-image k-gallery-main"><img src="/images/kaanan-estate.avif" alt="Architectural rendering of Kaanan Resort's grand facade, wedding lawn and decorated ceremony stage" loading="lazy"/><span>THE GRAND VISION <i>01 / 03</i></span></Reveal>
      <Reveal className="k-gallery-image k-gallery-side" delay={.1}><img src="/images/kaanan-ceremony.avif" alt="Detail from architectural rendering showing the flower-lined ceremony lawn" loading="lazy"/><span>A SETTING TO REMEMBER <i>02 / 03</i></span></Reveal>
      <Reveal className="k-gallery-image k-gallery-side" delay={.16}><img src="/images/kaanan-architecture.avif" alt="Architectural concept showing Kaanan Resort's arched facade and garden" loading="lazy"/><span>DESIGNED WITH INTENTION <i>03 / 03</i></span></Reveal>
    </div>
    <p className="k-gallery-disclaimer">Architectural visualisations illustrate the vision for Kaanan. Final facilities and availability should be confirmed with the resort team.</p>
  </div></section>;
}

function ResortContact() {
  return <section className="k-contact" id="resort-contact"><div className="k-contact-glow" aria-hidden="true"/>
    <div className="k-section-wrap k-contact-inner"><Reveal>
      <div className="k-mark-large"><KaananMark size={76} light/></div>
      <Tag light>LET'S CREATE SOMETHING BEAUTIFUL</Tag>
      <h2>Every great story<br/>begins <em>somewhere.</em></h2>
      <p>Tell us about your celebration, event, or occasion. Our team would be delighted to share more about the Kaanan vision and current availability.</p>
      <div className="k-contact-actions">
        <a className="k-button k-button-gold" href={WHATSAPP} target="_blank" rel="noopener noreferrer"><MessageCircle size={18}/> Send an enquiry <ArrowUpRight size={18}/></a>
        <a className="k-button k-button-outline" href={'tel:'+PHONE}><Phone size={17}/> Call the resort team</a>
      </div>
    </Reveal>
    <div className="k-contact-foot"><div><Phone size={16}/><a href={'tel:'+PHONE}>+91 93095 55833</a></div><div><MapPin size={16}/><span>Dondaicha, Dist. Dhule, Maharashtra 425408</span></div><a href={MAP} target="_blank" rel="noopener noreferrer">Explore the location <ArrowUpRight size={16}/></a></div>
  </div></section>;
}

function ResortFooter() {
  return <footer className="k-footer"><div className="k-section-wrap k-footer-inner"><Brand light/><span>CRAFTED FOR THE MOMENTS THAT MATTER</span><a href="#resort-top">BACK TO THE TOP <ArrowUpRight size={15}/></a></div><div className="k-section-wrap k-footer-legal"><span>© {new Date().getFullYear()} Kaanan by KS Resort. All rights reserved.</span><span>THE KAANAN VISION · DONDAICHA, MAHARASHTRA</span></div></footer>;
}

export default function ResortPage() {
  return <div className="kaanan-page"><ResortHeader/><main><ResortHero/><EstateIntro/><CelebrationSpaces/><IndianWeddingFunctions/><ResortEventPackages/><Amenities/><ResortRooms/><EstateGallery/><ResortContact/></main><ResortFooter/></div>;
}