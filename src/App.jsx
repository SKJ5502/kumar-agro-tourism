import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowDown, ArrowDownRight, ArrowRight, ArrowUpRight, Check,
  ChevronDown, Clock3, Instagram, Leaf, MapPin, Menu, MessageCircle,
  MoveUpRight, Phone, Sparkles, Sun, Waves, X,
} from 'lucide-react';

import { ScrollWorld, ScrollJourney } from './components/ScrollWorld.jsx';
const BOOKING_PHONE = '+918390300030';
const WHATSAPP = 'https://wa.me/918390300030?text=Hello%20Kumar%20Agro%20Tourism%2C%20I%20would%20like%20to%20plan%20a%20visit.';
const MAPS = 'https://www.google.com/maps/search/?api=1&query=Kumar+Agro+Tourism+Dondaicha';
const INSTAGRAM = 'https://www.instagram.com/kumar.agro.tourism/';

function Brand({ light = false }) {
  return (
    <a className={`brand ${light ? 'brand-light' : ''}`} href="#home" aria-label="Kumar Agro Tourism - home">
      <span className="brand-mark" aria-hidden="true"><img src="/images/kumar-emblem.png" alt="" /></span>
      <span className="brand-words">
        <span className="brand-name">kumar<span className="brand-dot">.</span></span>
        <span className="brand-subtitle">AGRO TOURISM</span>
      </span>
    </a>
  );
}

function SectionLabel({ children, light = false }) {
  return <div className={`section-label ${light ? 'section-label-light' : ''}`}><span className="label-line" />{children}</div>;
}

function Reveal({ children, className = '', delay = 0, ...props }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: reduceMotion ? 0 : 0.75, delay, ease: [0.23, 1, 0.32, 1] }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

const experiences = [
  {
    number: '01', title: 'A little adventure', subtitle: 'For the thrill-seekers',
    image: '/images/zipline.webp', alt: 'Visitor enjoying the zipline above the green surroundings at Kumar Agro Tourism',
    description: 'Take the scenic route to a little adrenaline, with outdoor adventure activities and sky-high smiles.',
  },
  {
    number: '02', title: 'A splash of joy', subtitle: 'For the playful souls',
    image: '/images/water-play.webp', alt: 'Visitors playing in the outdoor water activity area at Kumar Agro Tourism',
    description: 'Cool off, laugh louder, and make the kind of memories that begin with one more splash.',
  },
  {
    number: '03', title: 'Room to roam', subtitle: 'For the nature-lovers',
    image: '/images/nature-bridge.webp', alt: 'A visitor walking across a garden bridge surrounded by greenery',
    description: 'Wander open spaces, find your favourite corner, and let the day move at its own pace.',
  },
];

const moments = [
  { image: '/images/sky-cycle.webp', alt: 'Visitors enjoying a high cycling adventure attraction', label: 'Sky cycling' },
  { image: '/images/garden-swing.webp', alt: 'Hanging garden chairs nestled among trees', label: 'Slow moments' },
  { image: '/images/family-fun.webp', alt: 'Family enjoying colourful playground activities together', label: 'Family time' },
  { image: '/images/rope-adventure.webp', alt: 'Outdoor rope climbing play feature among greenery', label: 'Outdoor play' },
];

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const closeOnEscape = (event) => { if (event.key === 'Escape') setMenuOpen(false); };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, []);
  return (
    <header className="site-header">
      <div className="nav-shell">
        <Brand />
        <nav className={`main-nav ${menuOpen ? 'main-nav-open' : ''}`} aria-label="Main navigation">
          <a onClick={() => setMenuOpen(false)} href="#about">Our story</a>
          <a onClick={() => setMenuOpen(false)} href="#experiences">Experiences</a>
          <a onClick={() => setMenuOpen(false)} href="#packages">Day packages</a>
          <a onClick={() => setMenuOpen(false)} href="#gatherings">Gatherings</a>
          <a onClick={() => setMenuOpen(false)} className="mobile-only-nav" href="#contact">Contact</a>
        </nav>
        <div className="nav-right">
          <span className="nav-location"><MapPin size={13} strokeWidth={1.8} /> Dondaicha</span>
          <a className="nav-cta" href={WHATSAPP} target="_blank" rel="noopener noreferrer">Plan your visit <ArrowUpRight size={15} /></a>
        </div>
        <button className="mobile-menu-btn" type="button" onClick={() => setMenuOpen((o) => !o)} aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>
  );
}

function Hero() {
  const reduceMotion = useReducedMotion();
  return (
    <section className="hero" id="home" aria-labelledby="hero-title">
      <div className="hero-image" />
      <div className="hero-shade" />
      <div className="hero-grain" />
      <div className="hero-content page-container">
        <motion.div className="hero-copy" initial={reduceMotion ? false : { opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.0, ease: [0.2, 1, 0.25, 1] }}>
          <div className="hero-eyebrow"><span className="eyebrow-dot" /> A BREATH OF FRESH AIR IN DONDAICHA</div>
          <h1 id="hero-title">Feel more.<br />Do more.<br /><em>Live a little.</em></h1>
          <p>Where adventure feels effortless, time slows down, and your favourite people feel a little closer.</p>
          <div className="hero-buttons">
            <a className="button button-cream" href="#immersive-journey">Explore the experience <ArrowUpRight size={18} /></a>
            <a className="button-text-light" href="#packages">View day packages <ArrowRight size={19} /></a>
          </div>
        </motion.div>
      </div>
      <div className="hero-bottom page-container">
        <div className="hero-footer-caption"><span className="hero-caption-icon"><Leaf size={18} /></span><span>ONE PLACE. MANY PLANS.<small>Nature &middot; Food &middot; Fun &middot; Adventure</small></span></div>
        <a href="#immersive-journey" className="scroll-cue"><span>SCROLL TO WANDER</span><span className="scroll-circle"><ArrowDown size={17} /></span></a>
      </div>
    </section>
  );
}

function IntroStrip() {
  return (
    <div className="intro-strip">
      <div className="page-container intro-grid">
        <div className="intro-item"><span className="intro-icon"><Sun size={22} strokeWidth={1.35} /></span><div><strong>One whole day of happy</strong><span>10:00 AM - 6:00 PM</span></div></div>
        <div className="intro-item"><span className="intro-icon"><Leaf size={22} strokeWidth={1.35} /></span><div><strong>Outdoors, uninterrupted</strong><span>Open spaces &amp; green escapes</span></div></div>
        <div className="intro-item"><span className="intro-icon"><Sparkles size={22} strokeWidth={1.35} /></span><div><strong>Made for memories</strong><span>Families, friends &amp; groups</span></div></div>
      </div>
    </div>
  );
}

function About() {
  return (
    <section className="section about-section page-container" id="about">
      <div className="about-visual">
        <Reveal className="about-photo-primary"><img src="/images/nature-walk.webp" alt="Lush, tree-lined pathway inside Kumar Agro Tourism" loading="lazy" /></Reveal>
        <Reveal className="about-photo-secondary" delay={0.17}><img src="/images/garden-swing.webp" alt="Garden swing chairs among greenery at Kumar Agro Tourism" loading="lazy" /></Reveal>
        <div className="about-orbit-text"><span>GROW WILD. FEEL ALIVE.</span><span className="orbit-sun">&#10043;</span></div>
      </div>
      <Reveal className="about-copy">
        <SectionLabel>WELCOME TO KUMAR</SectionLabel>
        <h2>Some days are<br />made to be <em>felt.</em></h2>
        <p className="lead">A simple escape from the everyday, filled with the good things: fresh air, unhurried conversations, playful adventures, and the joy of being together.</p>
        <p>At Kumar Agro Tourism, an ordinary day out becomes a collection of little moments worth remembering. Come with your favourite people. Leave with your favourite stories.</p>
        <a className="text-link" href="#experiences">Discover what awaits <span><ArrowUpRight size={18} /></span></a>
        <div className="about-footnote"><span className="footnote-icon">&#10022;</span> MADE FOR THE CURIOUS, THE PLAYFUL &amp; THE YOUNG AT HEART</div>
      </Reveal>
    </section>
  );
}

function Experiences() {
  return (
    <section className="experiences-section section" id="experiences">
      <div className="page-container">
        <div className="section-head experiences-head">
          <Reveal>
            <SectionLabel>THE EXPERIENCE</SectionLabel>
            <h2>Find your kind<br />of <em>happy.</em></h2>
          </Reveal>
          <Reveal delay={0.08}><p>Something for the explorers, the splash-lovers, the laid-back wanderers, and everyone in between.</p></Reveal>
        </div>
        <div className="experience-grid">
          {experiences.map((experience, i) => (
            <Reveal key={experience.number} delay={i * 0.1} className="experience-card">
              <div className="experience-image-wrap"><img src={experience.image} alt={experience.alt} loading="lazy" /><span className="image-number">{experience.number} / 03</span><span className="experience-arrow"><ArrowUpRight size={20} /></span></div>
              <div className="experience-card-bottom"><span>{experience.subtitle}</span><h3>{experience.title}</h3><p>{experience.description}</p></div>
            </Reveal>
          ))}
        </div>
      </div>
      <div className="experiences-bottom-note"><span>MORE THAN JUST A DESTINATION</span><span className="small-flower">&#10043;</span><span>IT'S A FEELING</span></div>
    </section>
  );
}

function Quote() {
  return (
    <section className="quote-section" aria-label="Made for togetherness">
      <div className="quote-bg" />
      <div className="quote-overlay" />
      <Reveal className="quote-inner page-container">
        <span className="quote-asterisk">&#10043;</span>
        <SectionLabel light>THE LITTLE THINGS, TOGETHER</SectionLabel>
        <blockquote>Good days are made of<br /><em>moments like these.</em></blockquote>
        <p>Less screen time. More sunshine. More laughter. More us.</p>
      </Reveal>
    </section>
  );
}

function Moments() {
  return (
    <section className="moments-section section page-container">
      <div className="moments-head">
        <Reveal><SectionLabel>GLIMPSES OF KUMAR</SectionLabel><h2>Happiness looks<br /><em>good on you.</em></h2></Reveal>
        <Reveal delay={0.1}><p>Real glimpses of the experiences that make a day here feel a little different.</p></Reveal>
      </div>
      <div className="moments-grid">
        {moments.map((moment, index) => (
          <Reveal key={moment.label} delay={index * 0.07} className={`moment moment-${index + 1}`}>
            <img src={moment.image} alt={moment.alt} loading="lazy" />
            <span>{moment.label} <ArrowUpRight size={15} /></span>
          </Reveal>
        ))}
      </div>
      <p className="moments-credit">PHOTOGRAPHS FROM THE KUMAR AGRO TOURISM BROCHURE</p>
    </section>
  );
}

function Packages() {
  return (
    <section className="packages-section section" id="packages">
      <div className="page-container">
        <div className="packages-header">
          <Reveal><SectionLabel>PLAN YOUR DAY</SectionLabel><h2>A beautiful day out.<br /><em>Thoughtfully simple.</em></h2></Reveal>
          <Reveal delay={0.12}><p>Pick your kind of fun, bring your people, and let us take care of the good times.</p></Reveal>
        </div>
        <div className="pricing-grid">
          <Reveal className="pricing-card pricing-card-kids">
            <div className="pricing-top"><span className="pricing-tag">FOR THE LITTLE EXPLORERS</span><Sun size={30} strokeWidth={1.1} /></div>
            <h3>Little adventures</h3>
            <p className="pricing-descriptor">The biggest smiles come in the smallest sizes.</p>
            <div className="price"><sup>&#8377;</sup>650 <span>/ person</span></div>
            <div className="pricing-divider" />
            <ul><li><Check size={16} /> For ages 4 to 14 years</li><li><Check size={16} /> Ages 3 and below enter free</li><li><Check size={16} /> Outdoor games &amp; experiences</li></ul>
            <a className="pricing-link" href={WHATSAPP} target="_blank" rel="noopener noreferrer">Enquire about this package <ArrowUpRight size={18} /></a>
          </Reveal>
          <Reveal className="pricing-card pricing-card-adult" delay={0.12}>
            <div className="pricing-top"><span className="pricing-tag">THE FULL-DAY FAVOURITE</span><Sparkles size={27} strokeWidth={1.1} /></div>
            <h3>One day, all the joy</h3>
            <p className="pricing-descriptor">Everything you need for a memory-filled escape.</p>
            <div className="price"><sup>&#8377;</sup>850 <span>/ person</span></div>
            <div className="pricing-divider" />
            <ul><li><Check size={16} /> For visitors above 14 years</li><li><Check size={16} /> Breakfast, lunch &amp; high tea</li><li><Check size={16} /> Full-day visit: 10 AM - 6 PM</li></ul>
            <a className="pricing-link" href={WHATSAPP} target="_blank" rel="noopener noreferrer">Book your day out <ArrowUpRight size={18} /></a>
            <span className="pricing-decoration">&#10043;</span>
          </Reveal>
        </div>
        <Reveal className="package-bottom-note"><span className="note-star">&#10022;</span><p>Planning a school trip or group outing? <strong>Special packages and group discounts are available.</strong></p><a href={WHATSAPP} target="_blank" rel="noopener noreferrer">Let's plan it <ArrowRight size={17} /></a></Reveal>
        <p className="price-note">Prices and inclusions are based on the provided brochure. Please confirm current availability and package details before booking.</p>
      </div>
    </section>
  );
}

function DayFlow() {
  const timeline = [
    { time: '10:00 AM', label: 'Arrive & settle in', text: 'A warm welcome and breakfast to begin your day.' },
    { time: 'LATE MORNING', label: 'Explore, play, repeat', text: 'Adventure activities, water play, and all the outdoors you like.' },
    { time: 'LUNCHTIME', label: 'Good food, good company', text: 'Take a break, sit together, and eat well.' },
    { time: 'BEFORE 6:00 PM', label: 'One last lovely moment', text: 'Rain dance, a tractor ride, high tea and sunset-time memories.' },
  ];
  return (
    <section className="dayflow-section section page-container" id="your-day">
      <div className="dayflow-visual"><img src="/images/arrival-courtyard.webp" alt="Welcome entrance and courtyard of Kumar Agro Tourism" loading="lazy" /><span className="dayflow-stamp">A DAY<br />WELL<br /><em>SPENT.</em></span></div>
      <div className="dayflow-copy">
        <Reveal><SectionLabel>FROM MORNING TO MAGIC HOUR</SectionLabel><h2>Let the day<br /><em>unfold.</em></h2><p>No need to rush. No complicated plans. Just a day full of things to look forward to.</p></Reveal>
        <div className="timeline">
          {timeline.map((item, i) => <Reveal key={item.time} className="timeline-item" delay={i * 0.06}><span className="timeline-step">0{i + 1}</span><div className="timeline-body"><span className="timeline-time">{item.time}</span><h3>{item.label}</h3><p>{item.text}</p></div></Reveal>)}
        </div>
      </div>
    </section>
  );
}

function Gatherings() {
  return (
    <section className="gatherings-section section" id="gatherings">
      <div className="page-container gatherings-inner">
        <Reveal className="gatherings-copy">
          <SectionLabel light>BETTER, TOGETHER</SectionLabel>
          <h2>Your people.<br />Your moments.<br /><em>Your place.</em></h2>
          <p>Birthdays, school outings, family reunions, kitty parties, club meet-ups, hurda parties, and every little reason to get everyone together.</p>
          <div className="gathering-tags"><span>Family gatherings</span><span>School &amp; group trips</span><span>Birthdays</span><span>Celebrations</span></div>
          <a className="button button-cream" href={WHATSAPP} target="_blank" rel="noopener noreferrer">Plan a group visit <ArrowUpRight size={18} /></a>
        </Reveal>
        <Reveal className="gatherings-visual" delay={0.15}>
          <img src="/images/family-fun.webp" alt="Family enjoying a playful moment together at Kumar Agro Tourism" loading="lazy" />
          <div className="gatherings-mini-card"><span className="mini-card-icon">&#10043;</span><div><small>MADE TO CELEBRATE</small><strong>Life's good moments</strong></div></div>
        </Reveal>
      </div>
    </section>
  );
}

function ComingSoon() {
  return (
    <section className="coming-section page-container">
      <Reveal className="coming-card"><div className="coming-emblem">&#10043;</div><div><span className="coming-label">SOMETHING BEAUTIFUL IS GROWING</span><h2>Next up: <em>Kanan Resort.</em></h2><p>Opening December 2026, with bookings beginning in November 2026.</p></div><a href={WHATSAPP} target="_blank" rel="noopener noreferrer">Ask for updates <ArrowUpRight size={18} /></a></Reveal>
    </section>
  );
}

function Contact() {
  return (
    <section className="contact-section" id="contact">
      <div className="page-container contact-inner">
        <Reveal>
          <SectionLabel light>YOUR NEXT STORY STARTS HERE</SectionLabel>
          <h2>Let's make some<br /><em>good memories.</em></h2>
          <p>The outdoors are waiting. Bring your favourite people and we'll see you at Kumar.</p>
          <div className="contact-buttons"><a className="button button-cream" href={WHATSAPP} target="_blank" rel="noopener noreferrer"><MessageCircle size={18} /> Enquire on WhatsApp <ArrowUpRight size={18} /></a><a className="button button-outline" href={`tel:${BOOKING_PHONE}`}><Phone size={17} /> Call for bookings</a></div>
        </Reveal>
        <div className="contact-side"><div className="contact-side-number">+91 83903 00030</div><span><MapPin size={15} /> Dondaicha, Maharashtra</span><a href={MAPS} target="_blank" rel="noopener noreferrer">Find us on maps <ArrowUpRight size={16} /></a></div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="page-container footer-main"><div className="footer-brand"><Brand /><p>Nature. Food. Fun. Adventure.<br />One place for all your favourite people.</p></div><div className="footer-links"><div><span>EXPLORE</span><a href="#about">About us</a><a href="#experiences">Experiences</a><a href="#packages">Packages</a></div><div><span>GET IN TOUCH</span><a href={WHATSAPP} target="_blank" rel="noopener noreferrer">Book a visit</a><a href={`tel:${BOOKING_PHONE}`}>Call us</a><a href={MAPS} target="_blank" rel="noopener noreferrer">Directions</a></div></div><div className="footer-news"><span>FOLLOW THE GOOD TIMES</span><a href={INSTAGRAM} target="_blank" rel="noopener noreferrer"><Instagram size={19} /> @kumar.agro.tourism <ArrowUpRight size={16} /></a><p>Dondaicha, Maharashtra, India</p></div></div>
      <div className="page-container footer-bottom"><span>&copy; {new Date().getFullYear()} Kumar Agro Tourism. All rights reserved.</span><span>CRAFTED FOR THE GREAT OUTDOORS <span aria-hidden="true">&#10043;</span></span><a href="#home">BACK TO TOP <MoveUpRight size={15} /></a></div>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <Header />
      <ScrollWorld />
      <main>
        <Hero />
        <ScrollJourney />
        <IntroStrip />
        <About />
        <Experiences />
        <Quote />
        <Moments />
        <Packages />
        <DayFlow />
        <Gatherings />
        <ComingSoon />
        <Contact />
      </main>
      <Footer />
      <a href={WHATSAPP} className="whatsapp-float" target="_blank" rel="noopener noreferrer" aria-label="Chat with Kumar Agro Tourism on WhatsApp"><MessageCircle size={23} fill="currentColor" strokeWidth={1.5} /></a>
    </>
  );
}
