import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Leaf, Gem } from 'lucide-react';
import AgroTourism from './App.jsx';

const ResortPage = lazy(() => import('./ResortPage.jsx'));
const getSite = () => /^\/resort\/?$/i.test(window.location.pathname) ? 'resort' : 'agro';

export default function SiteRouter() {
  const [site, setSite] = useState(getSite);

  useEffect(() => {
    const onHistory = () => { setSite(getSite()); window.scrollTo({ top: 0 }); };
    window.addEventListener('popstate', onHistory);
    return () => window.removeEventListener('popstate', onHistory);
  }, []);

  useEffect(() => {
    const resort = site === 'resort';
    document.title = resort
      ? 'Kaanan by KS Resort | Weddings & Celebrations in Dondaicha'
      : 'Kumar Agro Tourism | A Countryside Escape in Dondaicha';
    const description = document.querySelector('meta[name="description"]');
    if (description) description.content = resort
      ? 'Discover Kaanan by KS Resort, a destination for weddings, receptions and celebrations surrounded by 15 acres of greenery in Dondaicha, Maharashtra.'
      : 'Reconnect with nature at Kumar Agro Tourism in Dondaicha. A full day of outdoor adventures, water fun, food and togetherness.';
    const theme = document.querySelector('meta[name="theme-color"]');
    if (theme) theme.content = resort ? '#101b38' : '#f7f4eb';
  }, [site]);

  const choose = (event, next) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    if (next === site) { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
    window.history.pushState({ destination: next }, '', next === 'resort' ? '/resort' : '/');
    setSite(next);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <div className={'destination-shell destination-' + site}>
      <div className="destination-bar">
        <div className="destination-bar-inner">
          <span className="destination-overline">TWO EXPERIENCES <span aria-hidden="true">✦</span> ONE DESTINATION</span>
          <nav className="destination-toggle" aria-label="Choose your experience">
            <span aria-hidden="true" className="destination-toggle-indicator" />
            <a href="/" onClick={(event) => choose(event, 'agro')}
               className={'destination-choice ' + (site === 'agro' ? 'is-active' : '')}
               aria-current={site === 'agro' ? 'page' : undefined}>
              <Leaf size={16} strokeWidth={1.6} />
              <span><strong>Agro Tourism</strong><small>Days in nature</small></span>
            </a>
            <a href="/resort" onClick={(event) => choose(event, 'resort')}
               className={'destination-choice ' + (site === 'resort' ? 'is-active' : '')}
               aria-current={site === 'resort' ? 'page' : undefined}>
              <Gem size={16} strokeWidth={1.6} />
              <span><strong>Kaanan Resort</strong><small>Celebrations & stays</small></span>
            </a>
          </nav>
          <span className="destination-side-note">DONDAICHA <span aria-hidden="true">·</span> MAHARASHTRA</span>
        </div>
      </div>
      {site === 'resort' ? (
        <Suspense fallback={<div className="destination-loading" role="status">Opening the Kaanan experience…</div>}>
          <ResortPage />
        </Suspense>
      ) : <AgroTourism />}
    </div>
  );
}