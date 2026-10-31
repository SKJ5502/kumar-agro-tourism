import React,{useEffect,useRef} from 'react';
import {motion,useReducedMotion} from 'framer-motion';
import {ArrowDown,ArrowUpRight,Leaf,Mountain,Waves} from 'lucide-react';

// This photographic silhouette is traced from the resort's real zipline brochure photo.
const outline='M381 503 L380 515 L362 520 L357 534 L359 525 L366 520 L364 551 L361 555 L367 552 L374 558 L393 556 L393 572 L379 588 L376 618 L385 649 L389 652 L387 661 L405 688 L406 705 L412 713 L409 724 L412 757 L423 762 L440 783 L453 789 L474 791 L485 786 L498 792 L539 796 L541 801 L524 856 L531 878 L544 874 L537 895 L537 906 L563 921 L563 911 L567 920 L564 923 L583 933 L628 934 L632 930 L633 918 L620 906 L620 900 L615 895 L632 891 L632 867 L621 870 L617 864 L613 866 L610 863 L612 860 L603 854 L606 851 L601 848 L621 816 L633 786 L623 776 L607 769 L605 749 L573 718 L556 714 L550 699 L543 695 L532 695 L524 689 L523 684 L515 685 L511 681 L511 659 L506 641 L513 636 L535 635 L540 630 L541 622 L540 612 L528 589 L528 557 L505 537 L505 524 L496 519 L504 509 L495 519 L476 519 L476 534 L467 535 L466 530 L459 528 L453 510 L441 495 L416 493 L393 509 L382 507Z M601 858 L609 865 L605 871 L600 871 L599 873 L601 880 L607 880 L603 882 L609 886 L606 892 L592 878 L590 873 L592 863 L594 861 L600 861Z';
const clamp=(x,a,b)=>Math.max(a,Math.min(b,x));

function Rider(){
  return <svg className="flight-rider-svg" viewBox="326 214 352 754" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs>
      <clipPath id="kumar-rider-photo"><path clipRule="evenodd" d={outline}/></clipPath>
      <linearGradient id="kumar-metal" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0" stopColor="#faf4e5"/><stop offset=".5" stopColor="#a49b91"/>
        <stop offset="1" stopColor="#d3c7b6"/>
      </linearGradient>
    </defs>
    <image href="/images/zipline.webp" x="0" y="0" width="1080" height="1290"
      preserveAspectRatio="none" clipPath="url(#kumar-rider-photo)"/>
    <g fill="none" strokeLinecap="round">
      <path d="M450 259 C466 330 479 441 491 522 M526 253 C513 342 503 441 491 522"
        stroke="#6c483a" strokeWidth="7" opacity=".45"/>
      <path d="M450 259 C466 330 479 441 491 522 M526 253 C513 342 503 441 491 522"
        stroke="#c77b59" strokeWidth="4"/>
    </g>
    <g fill="url(#kumar-metal)" stroke="#69665e" strokeWidth="2">
      <rect x="438" y="233" width="24" height="38" rx="11" transform="rotate(-12 450 252)"/>
      <rect x="513" y="228" width="24" height="39" rx="11" transform="rotate(11 525 248)"/>
      <circle cx="450" cy="251" r="5" fill="#5c615c"/>
      <circle cx="525" cy="247" r="5" fill="#5c615c"/>
    </g>
  </svg>;
}

/** Photo-realistic figure travels on a diagonal line as the document scrolls. */
export function ScrollWorld(){
  const el=useRef(null),raf=useRef(0),reduce=useReducedMotion();
  useEffect(()=>{
    const root=el.current;if(!root)return;
    let lastCompact=null;
    const frame=()=>{
      raf.current=0;
      const journey=document.getElementById('immersive-journey');
      if(!journey)return;
      const scrollY=window.scrollY,h=Math.max(1,window.innerHeight);
      const bottom=journey.getBoundingClientRect().bottom+scrollY;
      const top=journey.getBoundingClientRect().top+scrollY;
      const t=clamp((scrollY+h*.15)/Math.max(bottom-h*.6,1),0,1);
      const compact=scrollY>bottom-h*.44;
      const contact=document.getElementById('contact');
      const end=Boolean(contact&&contact.getBoundingClientRect().top<h*.86);
      root.style.setProperty('--flight-x',(compact?89:67+t*17).toFixed(2)+'vw');
      root.style.setProperty('--flight-y',(compact?40:-8+t*31).toFixed(2)+'vh');
      root.style.setProperty('--flight-scale',(compact?.42:1.02-t*.25).toFixed(3));
      root.style.setProperty('--flight-opacity',String(reduce&&scrollY>top?0:(end?0:(compact?.51:1))));
      if(lastCompact!==compact){root.classList.toggle('flight-compact',compact);lastCompact=compact;}
    };
    const schedule=()=>{if(!raf.current)raf.current=requestAnimationFrame(frame);};
    const pointer=e=>{if(!reduce)root.style.setProperty('--flight-tilt',(((e.clientX/window.innerWidth)-.5)*8).toFixed(2)+'deg');};
    frame();
    window.addEventListener('scroll',schedule,{passive:true});
    window.addEventListener('resize',schedule);
    window.addEventListener('pointermove',pointer,{passive:true});
    return()=>{window.removeEventListener('scroll',schedule);window.removeEventListener('resize',schedule);window.removeEventListener('pointermove',pointer);if(raf.current)cancelAnimationFrame(raf.current);};
  },[reduce]);
  return <div className="flight-layer" ref={el} aria-hidden="true">
    <div className="flight-rider">
      <div className="flight-cable"/><div className="flight-cable flight-cable-two"/>
      <Rider/>
      <span className="flight-rider-caption">A REAL MOMENT AT KUMAR <span aria-hidden="true">✳</span></span>
    </div>
  </div>;
}

function StoryReveal({ children, className = '' }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: reduceMotion ? 0 : 0.9, ease: [0.2, 1, 0.28, 1] }}
    >{children}</motion.div>
  );
}

/** Full-viewport chapters give the persistent 3D object an intentional story arc. */
export function ScrollJourney() {
  return (
    <section id="immersive-journey" className="immersive-journey" aria-label="Discover Kumar Agro Tourism in three chapters">
      <div className="journey-panel journey-panel-forest">
        <div className="journey-panel-lines" aria-hidden="true" />
        <div className="journey-inner page-container">
          <StoryReveal className="journey-copy">
            <div className="journey-kicker"><span className="journey-chapter-num">01 / 03</span><span className="journey-kicker-rule" /> THE TAKE-OFF</div>
            <div className="journey-icon"><Leaf size={24} strokeWidth={1.25} /></div>
            <h2>Take the<br />scenic <em>route.</em></h2>
            <p>See the landscape from a new perspective as the zipline adventure begins, surrounded by green trees and the open sky.</p>
            <a className="journey-text-link" href="#about">Meet Kumar Agro Tourism <ArrowUpRight size={17} /></a>
          </StoryReveal>
          <div className="journey-side-note"><span>THE ADVENTURE STARTS HERE</span><span>DONDAICHA, MAHARASHTRA</span></div>
        </div>
        <div className="journey-bottom-mark"><span>SCROLL TO GLIDE</span><ArrowDown size={15}/></div>
      </div>
      <div className="journey-panel journey-panel-adventure">
        <div className="journey-inner page-container journey-inner-right">
          <StoryReveal className="journey-copy">
            <div className="journey-kicker"><span className="journey-chapter-num">02 / 03</span><span className="journey-kicker-rule" /> THE FLIGHT</div>
            <div className="journey-icon"><Mountain size={26} strokeWidth={1.25} /></div>
            <h2>Feel the<br /><em>freedom.</em></h2>
            <p>Ride above the trees, let the breeze set the pace, and make a memory that stays with you.</p>
            <a className="journey-text-link" href="#experiences">Explore the experiences <ArrowUpRight size={17} /></a>
          </StoryReveal>
        </div>
        <div className="journey-side-caption">A REAL EXPERIENCE. A LASTING MEMORY. <span>✳</span></div>
      </div>
      <div className="journey-panel journey-panel-water">
        <div className="journey-inner page-container">
          <StoryReveal className="journey-copy">
            <div className="journey-kicker"><span className="journey-chapter-num">03 / 03</span><span className="journey-kicker-rule" /> THE LANDING</div>
            <div className="journey-icon"><Waves size={27} strokeWidth={1.3} /></div>
            <h2>One ride.<br /><em>A whole day.</em></h2>
            <p>The zipline is just the beginning. Stay for water activities, outdoor games, good food, and shared moments.</p>
            <a className="journey-text-link" href="#packages">Find your perfect day <ArrowUpRight size={17} /></a>
          </StoryReveal>
          <div className="journey-aside-photo"><img src="/images/sky-cycle.webp" alt="Sky cycling experience at Kumar Agro Tourism" loading="lazy" /><span>MORE TO EXPERIENCE</span></div>
        </div>
        <div className="journey-final-line">COME FOR THE ADVENTURE. STAY FOR THE FEELING.</div>
      </div>
    </section>
  );
}
