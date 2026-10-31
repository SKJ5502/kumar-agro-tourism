import React, { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Leaf, Mountain, Waves } from 'lucide-react';

const OrchardScene = lazy(() => import('./OrchardScene.jsx'));
const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

/** One WebGL scene stays mounted while the visitor travels through the whole page. */
export function ScrollWorld() {
  const worldRef = useRef({ progress: 0, pointerX: 0, pointerY: 0 });
  const frameRef = useRef(0);
  const [pose, setPose] = useState({ mode: 'hero', side: 'right', chapter: 0 });
  const [webglAvailable, setWebglAvailable] = useState(true);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = document.createElement('canvas');
    try {
      const webgl = canvas.getContext('webgl2') || canvas.getContext('webgl');
      setWebglAvailable(Boolean(webgl));
    } catch {
      setWebglAvailable(false);
    }
  }, []);

  useEffect(() => {
    let lastMode = '';
    let lastSide = '';
    let lastChapter = -1;

    const update = () => {
      frameRef.current = 0;
      const journey = document.getElementById('immersive-journey');
      const contact = document.getElementById('contact');
      if (!journey) return;
      const scrollY = window.scrollY;
      const viewport = Math.max(window.innerHeight, 1);
      const journeyTop = journey.getBoundingClientRect().top + scrollY;
      const journeyBottom = journeyTop + journey.offsetHeight;
      const raw = (scrollY - journeyTop + viewport * 0.55) / Math.max(journey.offsetHeight - viewport * 0.35, 1);
      const progress = clamp(raw, 0, 1);
      worldRef.current.progress = progress;

      let mode = 'story';
      if (scrollY < journeyTop - viewport * 0.5) mode = 'hero';
      else if (scrollY > journeyBottom - viewport * 0.45) mode = 'compact';
      if (contact) {
        const rect = contact.getBoundingClientRect();
        if (rect.top < viewport * 0.87 && rect.bottom > viewport * 0.2) mode = 'contact';
      }
      const chapter = clamp(Math.floor((scrollY - journeyTop + viewport * 0.37) / viewport), 0, 2);
      const side = mode === 'story' && chapter === 1 ? 'left' : 'right';
      if (mode !== lastMode || side !== lastSide || chapter !== lastChapter) {
        lastMode = mode;
        lastSide = side;
        lastChapter = chapter;
        setPose({ mode, side, chapter });
      }
    };

    const schedule = () => {
      if (!frameRef.current) frameRef.current = window.requestAnimationFrame(update);
    };
    const onPointerMove = (event) => {
      worldRef.current.pointerX = clamp((event.clientX / Math.max(window.innerWidth, 1)) * 2 - 1, -1, 1);
      worldRef.current.pointerY = clamp((event.clientY / Math.max(window.innerHeight, 1)) * 2 - 1, -1, 1);
    };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      window.removeEventListener('pointermove', onPointerMove);
      if (frameRef.current) window.cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <div className={'world-portal world-portal-' + pose.mode + ' world-portal-' + pose.side} aria-hidden="true">
      <div className="world-portal-aura" />
      <div className="world-portal-circle world-portal-circle-outer" />
      <div className="world-portal-circle world-portal-circle-inner" />
      <div className="world-portal-canvas">
        <Suspense fallback={<div className="world-portal-fallback" />}>
          {prefersReducedMotion || !webglAvailable
            ? <div className="world-portal-fallback" />
            : <OrchardScene progressRef={worldRef} />}
        </Suspense>
      </div>
      <div className="world-portal-stamp"><span className="world-portal-sparkle">✳</span><span>ZIP INTO<br />KUMAR</span></div>
      <div className="world-portal-caption">Adventure, carried on the breeze <span aria-hidden="true">↗</span></div>
    </div>
  );
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
            <h2>Step up.<br />Breathe in.<br /><em>Get ready.</em></h2>
            <p>Begin high above the greenery, where the first view opens up and the whole place starts to feel like an escape.</p>
            <a className="journey-text-link" href="#about">Meet Kumar Agro Tourism <ArrowUpRight size={17} /></a>
          </StoryReveal>
          <div className="journey-side-note"><span>START PLATFORM ABOVE THE GROVES</span><span>DONDAICHA, MAHARASHTRA</span></div>
        </div>
        <div className="journey-bottom-mark"><span>FOLLOW THE RIDE</span><ArrowDown size={15}/></div>
      </div>
      <div className="journey-panel journey-panel-adventure">
        <div className="journey-inner page-container journey-inner-right">
          <StoryReveal className="journey-copy">
            <div className="journey-kicker"><span className="journey-chapter-num">02 / 03</span><span className="journey-kicker-rule" /> THE GLIDE</div>
            <div className="journey-icon"><Mountain size={26} strokeWidth={1.25} /></div>
            <h2>Zip across.<br /><em>Feel the rush.</em></h2>
            <p>The signature moment of the experience — sweeping over trees, water and play zones with a view that keeps unfolding as you move.</p>
            <a className="journey-text-link" href="#experiences">Explore the experiences <ArrowUpRight size={17} /></a>
          </StoryReveal>
        </div>
        <div className="journey-side-caption">A PREMIUM LITTLE ADVENTURE IN MOTION <span>✳</span></div>
      </div>
      <div className="journey-panel journey-panel-water">
        <div className="journey-inner page-container">
          <StoryReveal className="journey-copy">
            <div className="journey-kicker"><span className="journey-chapter-num">03 / 03</span><span className="journey-kicker-rule" /> THE LANDING</div>
            <div className="journey-icon"><Waves size={27} strokeWidth={1.3} /></div>
            <h2>Touch down.<br /><em>Keep the day going.</em></h2>
            <p>Once the ride ends, the fun keeps flowing — water games, food, laughter and the kind of memories that fill the rest of the day.</p>
            <a className="journey-text-link" href="#packages">Find your perfect day <ArrowUpRight size={17} /></a>
          </StoryReveal>
          <div className="journey-aside-photo"><img src="/images/zipline.webp" alt="Guests enjoying water activities at Kumar Agro Tourism" loading="lazy" /><span>THE SIGNATURE RIDE</span></div>
        </div>
        <div className="journey-final-line">ARRIVE FOR NATURE. STAY FOR THE MOMENTS IN BETWEEN.</div>
      </div>
    </section>
  );
}
