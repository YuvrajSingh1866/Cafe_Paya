import React, {useEffect, useState} from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const MAP_URL = "https://maps.google.com/?cid=14765936149804910160";
const MAP_EMBED = "https://www.google.com/maps?q=Cafe%20paya%2C%20Mississauga%2C%20ON%20L5B%203R2&output=embed";

const icons = {
  arrow: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6"/></svg>,
  pin: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></svg>,
  utensils: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3v7M4.5 3v7a2.5 2.5 0 0 0 5 0V3M7 12v9M17 3v18M17 3c-2.2 2.1-3 4.5-3 7h3"/></svg>,
  bag: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 8h14l-1 12H6L5 8Z"/><path d="M9 8a3 3 0 0 1 6 0M8 12h8"/></svg>,
  clock: <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M12 7v5l3 2"/></svg>,
  menu: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>,
  close: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg>,
  star: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9L12 3Z"/></svg>,
};

function Icon({name}) { return <span className="icon">{icons[name]}</span> }

function Header() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => document.querySelector(".nav")?.classList.toggle("scrolled", window.scrollY > 18);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const close = () => setOpen(false);
  return (
    <header className="nav">
      <a href="#top" className="brand" onClick={close} aria-label="Cafe paya home">
        <span className="brand-mark">CP</span>
        <span><b>Cafe</b> paya</span>
      </a>
      <nav className={open ? "nav-links open" : "nav-links"}>
        <a href="#about" onClick={close}>About</a>
        <a href="#experience" onClick={close}>Experience</a>
        <a href="#gallery" onClick={close}>Gallery</a>
        <a href="#location" onClick={close}>Location</a>
        <a href="#contact" onClick={close}>Contact</a>
      </nav>
      <div className="nav-actions">
        <a className="nav-directions" href={MAP_URL} target="_blank" rel="noreferrer">Directions <Icon name="arrow"/></a>
        <button className="menu-btn" onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"}>
          {open ? <Icon name="close"/> : <Icon name="menu"/>}
        </button>
      </div>
    </header>
  );
}

function Reveal({children, className=""}) {
  return <div className={`reveal ${className}`}>{children}</div>
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-image" />
      <div className="hero-overlay" />
      <div className="hero-content">
        <div className="eyebrow"><span /> Indian Restaurant · Mississauga, Ontario</div>
        <h1>A warm table.<br/><em>Indian soul.</em></h1>
        <p>Cafe paya brings a relaxed Indian dining experience to Mississauga — made for good food, easy conversations, and unhurried moments.</p>
        <div className="hero-actions">
          <a className="btn btn-primary" href="#location">Visit Cafe paya <Icon name="arrow"/></a>
          <a className="btn btn-ghost" href={MAP_URL} target="_blank" rel="noreferrer"><Icon name="pin"/> Get directions</a>
        </div>
        <div className="hero-meta">
          <span><Icon name="utensils"/> Dine-in</span>
          <span><Icon name="bag"/> Takeaway</span>
          <span><Icon name="pin"/> Mississauga, ON</span>
        </div>
      </div>
      <div className="scroll-cue"><span>Scroll to explore</span><i /></div>
    </section>
  );
}

function About() {
  return (
    <section className="section about" id="about">
      <Reveal className="about-photo">
        <img src="https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1200&q=85" alt="Indian food served at a restaurant table" />
        <div className="photo-note"><span>CAFE PAYA</span><b>Mississauga, Ontario</b></div>
      </Reveal>
      <Reveal className="about-copy">
        <div className="section-label">The place</div>
        <h2>Indian dining, <em>close to home.</em></h2>
        <p>Cafe paya is an Indian restaurant located in Mississauga, Ontario. The public listing identifies the restaurant as offering both dine-in and takeaway.</p>
        <p>Whether you're stopping by for a meal or picking something up to enjoy elsewhere, Cafe paya is a local destination for Indian food in the area.</p>
        <a className="text-link" href={MAP_URL} target="_blank" rel="noreferrer">Find us on Google Maps <Icon name="arrow"/></a>
      </Reveal>
    </section>
  );
}

const experiences = [
  {icon:"utensils", title:"Dine-in", text:"Settle in and enjoy your meal at Cafe paya in Mississauga."},
  {icon:"bag", title:"Takeaway", text:"Prefer to eat elsewhere? The listing indicates takeaway service is available."},
  {icon:"pin", title:"Local & accessible", text:"Conveniently located in Mississauga, Ontario, with directions just a tap away."},
];

function Experience() {
  return (
    <section className="section dark" id="experience">
      <div className="section-head">
        <Reveal><div className="section-label light">The experience</div><h2>Simple. <em>Comfortable.</em><br/>Worth the stop.</h2></Reveal>
        <Reveal><p>Everything you need to know before you visit, without the noise. Choose how you want to enjoy Cafe paya.</p></Reveal>
      </div>
      <div className="experience-grid">
        {experiences.map((x,i) => <Reveal key={x.title} className="experience-card" >
          <span className="card-number">0{i+1}</span><Icon name={x.icon}/><h3>{x.title}</h3><p>{x.text}</p>
        </Reveal>)}
      </div>
    </section>
  );
}

const gallery = [
  ["https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1100&q=85","Indian food"],
  ["https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=1100&q=85","Indian cuisine"],
  ["https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1100&q=85","Restaurant interior"],
  ["https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1100&q=85","Dining"],
];

function Gallery() {
  const [lightbox, setLightbox] = useState(null);
  return (
    <section className="section gallery-section" id="gallery">
      <Reveal><div className="section-label">A visual taste</div><h2>Take a look <em>around.</em></h2></Reveal>
      <div className="gallery-grid">
        {gallery.map(([src,alt],i) => <Reveal key={src} className={`gallery-item g${i+1}`}><button onClick={() => setLightbox({src,alt})} aria-label={`View ${alt} image`}><img src={src} alt={alt}/><span>View</span></button></Reveal>)}
      </div>
      <p className="gallery-disclaimer">Food and interior imagery shown here is representative and is not presented as verified photography of Cafe paya.</p>
      {lightbox && <div className="lightbox" role="dialog" aria-modal="true" onClick={() => setLightbox(null)}><img src={lightbox.src} alt={lightbox.alt}/><button onClick={() => setLightbox(null)} aria-label="Close image">{<Icon name="close"/>}</button></div>}
    </section>
  );
}

function Location() {
  return (
    <section className="section location" id="location">
      <Reveal className="location-card">
        <div className="section-label">Come by</div>
        <h2>Find <em>Cafe paya.</em></h2>
        <p className="location-intro">Your next meal is in Mississauga.</p>
        <div className="address">
          <Icon name="pin"/>
          <div><strong>Mississauga, ON L5B 3R2</strong><span>Ontario, Canada</span></div>
        </div>
        <div className="location-info">
          <div><span>Service</span><b>Dine-in · Takeaway</b></div>
          <div><span>Category</span><b>Indian restaurant</b></div>
        </div>
        <a className="btn btn-primary full" href={MAP_URL} target="_blank" rel="noreferrer">Open Google Maps <Icon name="arrow"/></a>
      </Reveal>
      <Reveal className="map-wrap">
        <iframe title="Cafe paya location on Google Maps" src={MAP_EMBED} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        <a className="map-overlay" href={MAP_URL} target="_blank" rel="noreferrer">Get directions <Icon name="arrow"/></a>
      </Reveal>
    </section>
  );
}

function Contact() {
  const [status, setStatus] = useState("");
  function submit(e) {
    e.preventDefault();
    setStatus("Thanks — the form is ready to connect to your preferred email/backend service.");
  }
  return (
    <section className="contact" id="contact">
      <div className="contact-inner">
        <Reveal><div className="section-label light">Stay in touch</div><h2>Planning a visit?<br/><em>Say hello.</em></h2><p>Have a question or want to get in touch? Send a message below.</p></Reveal>
        <Reveal className="contact-form-wrap">
          <form onSubmit={submit}>
            <div className="form-row"><label>Name<input required name="name" autoComplete="name" placeholder="Your name"/></label><label>Phone<input name="phone" inputMode="tel" autoComplete="tel" placeholder="Phone number"/></label></div>
            <label>Email<input required type="email" name="email" autoComplete="email" placeholder="you@example.com"/></label>
            <label>Message<textarea required name="message" rows="4" placeholder="How can we help?"/></label>
            <button className="btn btn-light" type="submit">Send message <Icon name="arrow"/></button>
            {status && <p className="form-status" role="status">{status}</p>}
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return <footer>
    <div className="footer-top">
      <a href="#top" className="brand footer-brand"><span className="brand-mark">CP</span><span><b>Cafe</b> paya</span></a>
      <p>Indian restaurant · Mississauga, Ontario</p>
      <a href={MAP_URL} target="_blank" rel="noreferrer" className="footer-map">Open in Google Maps <Icon name="arrow"/></a>
    </div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} Cafe paya. All rights reserved.</span><span>Mississauga, ON L5B 3R2 · Canada</span></div>
  </footer>;
}

function App() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver((entries) => entries.forEach(e => { if(e.isIntersecting) e.target.classList.add("visible") }), {threshold:.12});
    els.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return <><Header/><main><Hero/><About/><Experience/><Gallery/><Location/><Contact/></main><Footer/></>;
}

createRoot(document.getElementById("root")).render(<App />);
