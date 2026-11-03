import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, BedDouble, CalendarDays, Check, Flower2, Heart, Landmark, Mail, MessageCircle, Presentation, Sparkles, Users, Video } from 'lucide-react';

const WAPP = '919309555833';
const enquire = (topic) => `https://wa.me/${WAPP}?text=${encodeURIComponent(`Hello Kaanan by KS Resort, I would like to enquire about ${topic}. Please share a custom quotation, available dates and event / stay options.`)}`;

const ceremonies = [
  {number:'01',name:'Roka & Engagement',tag:'THE BEGINNING',info:'Mark the first joyful promise with an intimate family celebration.'},
  {number:'02',name:'Mehendi',tag:'COLOUR & TRADITION',info:'A warm, expressive occasion with family, music and beautiful details.'},
  {number:'03',name:'Haldi',tag:'SUNLIT MOMENTS',info:'Create a vibrant setting for the ritual of blessings and laughter.'},
  {number:'04',name:'Sangeet',tag:'MUSIC & MEMORIES',info:'Celebrate the people, performances and music that bring everyone together.'},
  {number:'05',name:'Shaadi & Pheras',tag:'THE SACRED CELEBRATION',info:'The wedding ceremony, varmala and pheras framed by a beautiful venue.'},
  {number:'06',name:'Reception',tag:'A GRAND FINALE',info:'An elegant gathering to welcome your next chapter together.'},
];

const packages = [
  {number:'01',title:'The Wedding Edit',type:'COMPLETE SHAADI CELEBRATION',accent:'heritage',icon:Heart,items:['Multi-function wedding itinerary','Banquet hall, lawn or hilltop enquiries','Guest accommodation options','Custom guest-count quotation'],query:'a complete Indian shaadi and multi-day wedding celebration'},
  {number:'02',title:'The Celebration Edit',type:'PRE-WEDDING & RECEPTION',accent:'saffron',icon:Flower2,items:['Haldi, Mehendi and Sangeet enquiries','Roka, engagement and reception options','Indoor and outdoor function settings','Flexible single-event planning'],query:'a Haldi, Mehendi, Sangeet or Reception function'},
  {number:'03',title:'The Business Edit',type:'CONFERENCE & CORPORATE',accent:'navy',icon:Presentation,items:['Conferences and business meets','Team offsites and corporate retreats','Meeting-space and schedule enquiries','Group dining and stay discussions'],query:'a business conference, company offsite or corporate event'},
  {number:'04',title:'The Stay Edit',type:'ROOMS & GROUP STAYS',accent:'sage',icon:BedDouble,items:['Room and overnight-stay enquiries','Wedding guest room blocks','Family and group accommodation','Custom dates and room requirements'],query:'room reservations, family stays or a group room block'},
];

const roomConcepts = [
  {src:'/images/kaanan-room-01.avif',alt:'Kaanan guest-room interior design visualisation showing twin beds, wood panelling and a television console',caption:'THE WARM WELCOME',detail:'A calm material palette'},
  {src:'/images/kaanan-room-02.avif',alt:'Kaanan room concept with upholstered seating, floor-to-ceiling drapery and twin beds',caption:'THE QUIET CORNER',detail:'Soft light and thoughtful spaces'},
  {src:'/images/kaanan-room-03.avif',alt:'Interior visualisation of twin-bed accommodation with warm timber finishes and elegant neutral bedding',caption:'THE ROOM EXPERIENCE',detail:'Rest in understated elegance'},
  {src:'/images/kaanan-room-04.avif',alt:'Detail view of proposed resort room storage, natural wood finishes and entertainment area',caption:'THE DETAILS',detail:'Designed around your comfort'},
  {src:'/images/kaanan-room-05.avif',alt:'Sunlit room interior concept with two beds, lounge seating and large windows',caption:'A LIGHTER STAY',detail:'Room to make memories'},
];

export function IndianWeddingFunctions() {
  return <section className="kr-ceremonies" id="wedding-functions" aria-labelledby="kr-wedding-title">
    <div className="kr-wrap">
      <div className="kr-section-intro">
        <span className="kr-eyebrow"><span/> AN INDIAN WEDDING AT KAANAN</span>
        <h2 id="kr-wedding-title">Every ritual.<br/><em>Every beautiful moment.</em></h2>
        <p>From the first family gathering to the last reception dance, imagine your shaadi unfolding in one extraordinary setting.</p>
      </div>
      <div className="kr-ritual-grid">
        {ceremonies.map((ceremony)=><article className="kr-ritual" key={ceremony.number}>
          <div className="kr-ritual-number"><span>{ceremony.number}</span><span aria-hidden="true">✳</span></div>
          <span className="kr-ritual-tag">{ceremony.tag}</span>
          <h3>{ceremony.name}</h3>
          <p>{ceremony.info}</p>
          <a href={enquire(ceremony.name+' at Kaanan')} target="_blank" rel="noopener noreferrer" aria-label={'Enquire about '+ceremony.name}>Enquire about this function <ArrowUpRight size={17}/></a>
        </article>)}
      </div>
      <p className="kr-ceremony-footnote">Spaces, decoration, catering, itineraries and other function services are discussed individually. Please confirm availability and event details with the resort team.</p>
    </div>
  </section>;
}

export function ResortEventPackages() {
  return <section className="kr-packages" id="resort-packages" aria-labelledby="kr-package-title">
    <div className="kr-wrap">
      <div className="kr-packages-top">
        <div><span className="kr-eyebrow"><span/> PERSONALISED TO YOUR OCCASION</span><h2 id="kr-package-title">Thoughtfully tailored.<br/><em>Unforgettable by design.</em></h2></div>
        <p>There is no one-size-fits-all celebration. Tell us your dates, guest count and vision; our team can discuss the spaces and arrangements available for your occasion.</p>
      </div>
      <div className="kr-package-grid">
        {packages.map((p)=>{const Icon=p.icon;return <article className={'kr-package-card kr-package-'+p.accent} key={p.number}>
          <div className="kr-package-number"><span>{p.number} / 04</span><Icon size={28} strokeWidth={1.35}/></div>
          <span className="kr-package-type">{p.type}</span>
          <h3>{p.title}</h3>
          <ul>{p.items.map(item=><li key={item}><Check size={15}/><span>{item}</span></li>)}</ul>
          <a href={enquire(p.query)} target="_blank" rel="noopener noreferrer">Request a tailored quote <ArrowUpRight size={19}/></a>
        </article>;})}
      </div>
      <div className="kr-pricing-note"><Sparkles size={21}/><p>Package rates are shared on enquiry and depend on event dates, guest numbers, space selection and services requested. No unconfirmed prices or inclusions are advertised.</p><a href={enquire('resort event and accommodation packages')} target="_blank" rel="noopener noreferrer">Speak to the resort team <ArrowUpRight size={16}/></a></div>
    </div>
  </section>;
}

export function ResortRooms() {
  const [active, setActive] = useState(0);
  const prev=()=>setActive((i)=>(i-1+roomConcepts.length)%roomConcepts.length);
  const next=()=>setActive((i)=>(i+1)%roomConcepts.length);
  const current=roomConcepts[active];
  return <section className="kr-rooms" id="rooms" aria-labelledby="kr-rooms-title">
    <div className="kr-wrap">
      <div className="kr-rooms-head">
        <div><span className="kr-eyebrow"><span/> REST & RETREAT</span><h2 id="kr-rooms-title">A softer place<br/><em>to land.</em></h2></div>
        <div className="kr-rooms-head-copy"><p>For the guests who come to celebrate, and the moments that deserve a little more time. Explore the room design vision at Kaanan.</p><a href={enquire('rooms, stays and wedding guest accommodation')} target="_blank" rel="noopener noreferrer">Enquire about rooms <ArrowUpRight size={17}/></a></div>
      </div>
      <div className="kr-rooms-showcase">
        <div className="kr-room-main">
          <img src={current.src} alt={current.alt} key={current.src} loading="lazy"/>
          <div className="kr-room-main-overlay"><span>ROOM DESIGN CONCEPT <span>{String(active+1).padStart(2,'0')} / 05</span></span><div><h3>{current.caption}</h3><p>{current.detail}</p></div></div>
          <div className="kr-room-controls"><button type="button" onClick={prev} aria-label="Previous room image"><ArrowLeft size={20}/></button><button type="button" onClick={next} aria-label="Next room image"><ArrowRight size={20}/></button></div>
        </div>
        <div className="kr-room-thumbs" aria-label="Choose a room design image">
          {roomConcepts.map((room,i)=><button className={'kr-room-thumb '+(active===i?'is-current':'')} type="button" key={room.src} onClick={()=>setActive(i)} aria-label={'View room concept '+(i+1)} aria-pressed={active===i}>
            <img src={room.src} alt="" loading="lazy"/><span>0{i+1}</span>
          </button>)}
        </div>
      </div>
      <div className="kr-room-bottom"><span><BedDouble size={21}/> A glimpse of planned guest accommodation</span><p>These are design visualisations, not photographs of completed or currently available rooms. Room types, amenities and availability must be confirmed before booking.</p></div>
    </div>
  </section>;
}