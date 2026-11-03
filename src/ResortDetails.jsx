import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, BedDouble, CalendarDays, Check, Flower2, Heart, Landmark, Mail, MessageCircle, Presentation, Sparkles, Users, Video, Maximize2, X } from 'lucide-react';

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

// Curated, artist-enhanced visualisations based on the architectural room references.
// These are design concepts, not photographs of an operating guest-room inventory.
const roomConcepts = [
  {src:'/images/kaanan-room-premium-01.avif',alt:'Luxury guest-room concept showing two neatly made beds, warm oak panelling, a floating console and a Kaanan welcome display',caption:'The Warm Welcome',detail:'Calm textures, considered details',label:'AN INVITATION TO UNWIND'},
  {src:'/images/kaanan-room-premium-02.avif',alt:'Moody evening room visualisation with twin beds, softly lit window seating and a quiet dining nook',caption:'The Evening Retreat',detail:'Quiet moments after the celebration',label:'THE ART OF UNWINDING'},
  {src:'/images/kaanan-room-premium-03.avif',alt:'Refined twin-bed room interior visualisation with upholstered olive headboards and layered warm neutral bedding',caption:'Rest, Reimagined',detail:'A little more room to rest',label:'REST IN YOUR OWN RHYTHM'},
  {src:'/images/kaanan-room-premium-04.avif',alt:'Interior design visualisation featuring a wood feature wall, bespoke wardrobe, floating console and Kaanan welcome television',caption:'The Little Details',detail:'Thoughtful touches at every turn',label:'REFINED BY DESIGN'},
  {src:'/images/kaanan-room-premium-05.avif',alt:'Bright Kaanan room concept with twin beds, expansive windows, greenery and comfortable window-side seating',caption:'A Room with Light',detail:'A gentle start to the day',label:'WHERE LIGHT FEELS DIFFERENT'},
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
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (selected === null) return undefined;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setSelected(null);
      if (event.key === 'ArrowRight') setSelected((index) => (index + 1) % roomConcepts.length);
      if (event.key === 'ArrowLeft') setSelected((index) => (index - 1 + roomConcepts.length) % roomConcepts.length);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [selected]);

  const renderRoom = (room, index, type) => (
    <figure className={'kr-editorial-room kr-editorial-room-' + type} key={room.src}>
      <button type="button" className="kr-editorial-room-photo"
        onClick={() => setSelected(index)} aria-label={'Enlarge '+room.caption+' room visualisation'}>
        <img src={room.src} alt={room.alt} loading="lazy" decoding="async" />
        <span className="kr-editorial-room-expand"><Maximize2 size={17} strokeWidth={1.45}/><span>VIEW IMAGE</span></span>
      </button>
      <figcaption className="kr-editorial-room-caption">
        <div><span className="kr-editorial-room-index">{String(index+1).padStart(2,'0')} / 05</span><h3>{room.caption}</h3></div>
        <p>{room.detail}</p>
      </figcaption>
    </figure>
  );

  return <section className="kr-rooms kr-rooms-premium" id="rooms" aria-labelledby="kr-rooms-title">
    <div className="kr-wrap">
      <div className="kr-rooms-premium-head">
        <div><span className="kr-eyebrow"><span/> THE STAY EXPERIENCE</span>
          <h2 id="kr-rooms-title">A slower kind<br/>of <em>luxury.</em></h2>
        </div>
        <div className="kr-rooms-premium-intro"><p>For wedding guests, family gatherings and quiet escapes. Discover the calming warmth and thoughtful finishes imagined for a stay at Kaanan.</p>
          <a href={enquire('rooms, family stays and wedding guest accommodation')} target="_blank" rel="noopener noreferrer">Discuss your stay <ArrowUpRight size={18}/></a>
        </div>
      </div>

      <div className="kr-rooms-gallery-primary" aria-label="Featured room design visualisations">
        {renderRoom(roomConcepts[0],0,'lead')}
        {renderRoom(roomConcepts[1],1,'portrait')}
      </div>
      <div className="kr-rooms-gallery-divider"><span>THE ROOM, FROM EVERY ANGLE</span><span className="kr-rooms-gallery-divider-rule"/><span>03 — 05</span></div>
      <div className="kr-rooms-gallery-secondary" aria-label="Additional room design perspectives">
        {roomConcepts.slice(2).map((room,i) => renderRoom(room,i+2,i===2?'landscape':'detail'))}
      </div>

      <div className="kr-rooms-premium-foot">
        <div className="kr-rooms-note-heading"><BedDouble size={22} strokeWidth={1.35}/><span>ROOMS & GUEST STAYS</span></div>
        <p>Artist-enhanced architectural design visualisations, not photographs of completed rooms. Room categories, final furnishings, amenities and availability are subject to confirmation with the resort team.</p>
        <a href={enquire('available room options, dates and room rates')} target="_blank" rel="noopener noreferrer">Enquire for availability <ArrowUpRight size={17}/></a>
      </div>
    </div>

    {selected !== null && <div className="kr-room-lightbox" role="dialog" aria-modal="true"
      aria-label={roomConcepts[selected].caption+' - room design visualisation'}
      onMouseDown={(event) => { if (event.target === event.currentTarget) setSelected(null); }}>
      <button type="button" className="kr-lightbox-close" onClick={() => setSelected(null)} aria-label="Close enlarged room image"><X size={23}/></button>
      <button type="button" className="kr-lightbox-control kr-lightbox-previous" onClick={() => setSelected((selected-1+roomConcepts.length)%roomConcepts.length)} aria-label="Previous room image"><ArrowLeft size={24}/></button>
      <figure className="kr-room-lightbox-figure"><img src={roomConcepts[selected].src} alt={roomConcepts[selected].alt}/>
        <figcaption><span>{String(selected+1).padStart(2,'0')} / 05</span><strong>{roomConcepts[selected].caption}</strong><small>ARTIST-ENHANCED DESIGN VISUALISATION</small></figcaption>
      </figure>
      <button type="button" className="kr-lightbox-control kr-lightbox-next" onClick={() => setSelected((selected+1)%roomConcepts.length)} aria-label="Next room image"><ArrowRight size={24}/></button>
    </div>}
  </section>;
}
