import React from 'react';
import { ArrowUpRight, BadgeCheck, CalendarDays, Check, CircleHelp, Coffee, Droplets, GraduationCap, Leaf, Mountain, PartyPopper, Sparkles, Ticket, Trees, Users, Waves, Zap } from 'lucide-react';

const BOOKING_PHONE = '918390300030';
const enquiryLink = (subject) => `https://wa.me/${BOOKING_PHONE}?text=${encodeURIComponent(`Hello Kumar Agro Tourism, I would like to enquire about ${subject}. Please share availability, pricing and details.`)}`;

const included = [
  { icon: Waves, name: 'Splash & water games', note: 'Water play and refreshing fun' },
  { icon: Droplets, name: 'Rain dance', note: 'Music, movement and a splash of joy' },
  { icon: Mountain, name: 'Rope & bridge activities', note: 'Rope-course and nature-bridge experiences' },
  { icon: Sparkles, name: 'Swings & play zones', note: 'Garden swings, tyre swings and play areas' },
  { icon: Trees, name: 'Garden & nature walks', note: 'Greenery, pathways and open spaces' },
  { icon: Leaf, name: 'Tractor ride & outdoor fun', note: 'A countryside ride and group play' },
];

const extras = [
  { title: 'Zipline', image: '/images/zipline.webp', text: 'A high-flying adventure above the green landscape.' },
  { title: 'Sky Cycling', image: '/images/sky-cycle.webp', text: 'An unforgettable cycle ride with a view.' },
];

const groups = [
  { id:'school',icon:GraduationCap,title:'School & College Trips',sub:'LEARNING MEETS THE OUTDOORS',text:'Plan a cheerful group visit with nature, play zones, water activities and a full day together.',chips:['School excursions','College outings','Student groups'],query:'a school or college group trip' },
  { id:'business',icon:Users,title:'Corporate & Business Outings',sub:'A REFRESHING CHANGE OF SCENERY',text:'A refreshing place for team outings, company celebrations, business groups and colleagues to connect outside the office.',chips:['Corporate outings','Team get-togethers','Business groups'],query:'a corporate or business group outing' },
  { id:'family',icon:PartyPopper,title:'Celebrations & Associations',sub:'MORE REASONS TO GATHER',text:'From birthdays and family reunions to kitty parties, clubs, medical association gatherings and seasonal Hurda celebrations.',chips:['Birthdays & families','Clubs & associations','Hurda gatherings'],query:'a family celebration, club or association group trip' },
];

export function IncludedActivities() {
  return (
    <section className="agro-inclusions" id="included-activities" aria-labelledby="included-title">
      <div className="agro-detail-wrap">
        <div className="agro-section-heading">
          <div>
            <span className="agro-eyebrow"><span/> KNOW BEFORE YOU GO</span>
            <h2 id="included-title">More to do.<br/><em>More included.</em></h2>
          </div>
          <p>One day ticket opens the door to the best of Kumar. From water games to garden adventures, discover the activities included with entry—and the two special rides offered separately.</p>
        </div>
        <div className="agro-inclusions-panel">
          <div className="agro-inclusions-head">
            <span className="agro-included-pill"><BadgeCheck size={18}/> INCLUDED WITH DAY TICKET</span>
            <span className="agro-inclusions-small">NO EXTRA ACTIVITY CHARGE FOR THESE EXPERIENCES</span>
          </div>
          <div className="agro-activity-grid">
            {included.map(({icon:Icon,name,note}) => (
              <article className="agro-activity" key={name}>
                <div className="agro-activity-icon"><Icon size={25} strokeWidth={1.35}/></div>
                <div><h3>{name}</h3><p>{note}</p></div>
                <Check size={17} className="agro-check"/>
              </article>
            ))}
          </div>
          <div className="agro-inclusions-foot"><Ticket size={19}/><p>These activities are included in your day-entry ticket. Timings, safety rules and activity operation may vary.</p></div>
        </div>
        <div className="agro-extras-head"><div><span className="agro-eyebrow"><span/> OPTIONAL ADVENTURE</span><h3>Two thrills.<br/><em>A little extra.</em></h3></div><p>Only the zipline and sky cycling are separately charged. Ask the team for the latest ride rates before visiting.</p></div>
        <div className="agro-extras-grid">
          {extras.map((item,i)=><article className="agro-extra" key={item.title}>
            <img src={item.image} alt={`${item.title} adventure activity at Kumar Agro Tourism`} loading="lazy"/>
            <div className="agro-extra-shade"/>
            <div className="agro-extra-top"><span>0{i+1} / 02</span><span className="agro-paid-pill">PAID ADD-ON</span></div>
            <div className="agro-extra-bottom"><h4>{item.title}</h4><p>{item.text}</p><a href={enquiryLink(item.title+' additional ride charges')} target="_blank" rel="noopener noreferrer">Ask about ride charges <ArrowUpRight size={17}/></a></div>
          </article>)}
        </div>
      </div>
    </section>
  );
}

export function GroupExperiences() {
  return (
    <section className="agro-group-plans" id="group-plans" aria-labelledby="group-plan-title">
      <div className="agro-detail-wrap">
        <div className="agro-groups-heading"><span className="agro-eyebrow"><span/> BRING EVERYONE ALONG</span><h2 id="group-plan-title">Beautiful days<br/><em>are better together.</em></h2><p>Whether you're planning a class outing, a company day away or a celebration, we'll help shape a memorable group visit.</p></div>
        <div className="agro-groups-grid">
          {groups.map(({id,icon:Icon,title,sub,text,chips,query},i)=><article className="agro-group-card" key={id}>
            <div className="agro-group-card-top"><span>0{i+1} / 03</span><Icon size={31} strokeWidth={1.3}/></div>
            <span className="agro-group-kicker">{sub}</span>
            <h3>{title}</h3>
            <p>{text}</p>
            <div className="agro-group-chips">{chips.map(chip=><span key={chip}>{chip}</span>)}</div>
            <a href={enquiryLink(query)} target="_blank" rel="noopener noreferrer">Plan this group visit <ArrowUpRight size={18}/></a>
          </article>)}
        </div>
        <div className="agro-group-note"><CircleHelp size={20}/><p>Group packages are tailored to your date, number of guests and requirements. School, college and corporate rates are available on enquiry; no advance payment is taken through this website.</p><a href={enquiryLink('group rates and availability')} target="_blank" rel="noopener noreferrer">Request group quote <ArrowUpRight size={18}/></a></div>
      </div>
    </section>
  );
}