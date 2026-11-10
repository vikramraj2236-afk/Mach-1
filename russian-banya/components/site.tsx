"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown, ArrowRight, ArrowUpRight, Check, ChevronLeft, ChevronRight, Clock3, Instagram, Menu, Phone, X, Star, MapPin, Mail } from "lucide-react";

const photo = (id: string, w = 1200) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=85`;
const services = [
  { name: "Traditional Russian Banya", duration: "90 min", price: "From $95", desc: "A timeless heat ritual with a warming steam, venik whisking and a restorative cool-down.", image: "photo-1540555700478-4be289fbecef" },
  { name: "Steam Sauna", duration: "60 min", price: "From $65", desc: "Deep, enveloping warmth designed to soften tension and invite complete stillness.", image: "photo-1576013551627-0cc20b96c2a7" },
  { name: "Deep Tissue Massage", duration: "60 / 90 min", price: "From $110", desc: "Purposeful, slow-pressure techniques to release stubborn knots and restore ease.", image: "photo-1519823551278-64ac92734fb1" },
  { name: "Aromatherapy Massage", duration: "60 min", price: "From $105", desc: "A sensory journey pairing flowing touch with carefully selected botanical oils.", image: "photo-1544161515-4ab6ce6db874" },
  { name: "Body Scrub & Detox", duration: "45 min", price: "From $75", desc: "A renewing exfoliation that polishes the skin and leaves you feeling refreshed.", image: "photo-1600334129128-685c5582fd35" },
  { name: "Luxury Couple Spa", duration: "120 min", price: "From $220", desc: "A shared escape with private time, thoughtful details and unhurried restoration.", image: "photo-1515377905703-c4788e51af15" },
  { name: "Relaxation Therapy", duration: "50 min", price: "From $85", desc: "Gentle restorative treatments to settle the senses and quiet a busy mind.", image: "photo-1540555700478-4be289fbecef" },
  { name: "VIP Wellness Experience", duration: "180 min", price: "From $350", desc: "Our signature journey: private banya, bespoke bodywork and a serene lounge ritual.", image: "photo-1600334129128-685c5582fd35" }
];
const gallery = [
  { title: "The warmth of wood", image: "photo-1540555700478-4be289fbecef" },
  { title: "A quieter kind of luxury", image: "photo-1576013551627-0cc20b96c2a7" },
  { title: "Restorative rituals", image: "photo-1544161515-4ab6ce6db874" },
  { title: "Room to exhale", image: "photo-1519823551278-64ac92734fb1" },
  { title: "A moment for two", image: "photo-1515377905703-c4788e51af15" }
];
const packages = [
  { name: "Basic Experience", price: "$95", note: "A beautiful introduction", items: ["60-minute banya access", "Herbal tea ritual", "Relaxation lounge"] },
  { name: "Premium Experience", price: "$175", note: "Our most-loved ritual", featured: true, items: ["90-minute banya ritual", "Venik whisking ceremony", "30-minute massage", "Herbal tea & fruit"] },
  { name: "VIP Experience", price: "$350", note: "The art of total renewal", items: ["Private banya suite", "Bespoke 60-minute massage", "Body scrub ritual", "Refreshments & robe"] },
  { name: "Couple Experience", price: "$280", note: "A shared escape", items: ["Private couple suite", "Banya ritual for two", "Side-by-side massage", "Champagne or herbal tea"] }
];
const reveal = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { duration: .7, ease: [0.22, 1, 0.36, 1] } } };

function SectionHeading({ kicker, title, copy, center = false }: { kicker: string; title: ReactNode; copy?: string; center?: boolean }) {
  return <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: .2 }} className={center ? "text-center mx-auto max-w-2xl" : "max-w-2xl"}>
    <p className="eyebrow mb-5">{kicker}</p><h2 className="display-title text-5xl md:text-7xl">{title}</h2>
    {copy && <p className="mt-6 text-sm leading-7 text-[#aaa69b] max-w-xl">{copy}</p>}
    <div className={`gold-line mt-7 ${center ? "mx-auto" : ""}`} />
  </motion.div>;
}

export default function Site() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeImage, setActiveImage] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState("");
  const [selectedService, setSelectedService] = useState("Traditional Russian Banya");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    if (activeImage === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveImage(null);
      if (e.key === "ArrowRight") setActiveImage((v) => v === null ? 0 : (v + 1) % gallery.length);
      if (e.key === "ArrowLeft") setActiveImage((v) => v === null ? 0 : (v - 1 + gallery.length) % gallery.length);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [activeImage]);

  const closeMenu = () => setMenuOpen(false);
  const nav = [["Our Story", "#about"], ["Treatments", "#services"], ["The Ritual", "#ritual"], ["Gallery", "#gallery"], ["Contact", "#contact"]];
  const whatsapp = "https://wa.me/910000000000?text=" + encodeURIComponent("Hello Russian Banya, I would like to enquire about a booking.");

  function handleBooking(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setFormError("");
    const data = new FormData(e.currentTarget);
    const phone = String(data.get("phone") || "").replace(/[^\d+]/g, "");
    if (phone.replace(/\D/g, "").length < 8) { setFormError("Please enter a valid phone number."); return; }
    const date = String(data.get("date") || "");
    if (date && date < new Date().toISOString().slice(0, 10)) { setFormError("Please choose today or a future date."); return; }
    setSubmitted(true);
    e.currentTarget.reset();
  }

  return <main>
    <header className={`fixed top-0 z-40 w-full transition-all duration-500 ${scrolled ? "bg-ink/95 backdrop-blur-md border-b border-white/10" : "bg-gradient-to-b from-black/55 to-transparent"}`}>
      <div className="container-shell flex h-[82px] items-center justify-between">
        <a href="#home" className="flex items-center gap-3" onClick={closeMenu}><span className="grid h-10 w-10 place-items-center border border-gold/70 text-gold font-display text-2xl">Б</span><span><span className="block text-[13px] tracking-[.23em] font-semibold">RUSSIAN BANYA</span><span className="block text-[8px] tracking-[.24em] text-sand">THE ART OF WELLNESS</span></span></a>
        <nav className="hidden lg:flex items-center gap-8">{nav.map(([label, href]) => <a key={href} href={href} className="text-[10px] uppercase tracking-[.16em] text-cream/80 hover:text-gold transition-colors">{label}</a>)}</nav>
        <div className="hidden lg:block"><a className="btn-gold !py-3" href="#booking">Reserve Your Ritual <ArrowUpRight size={14}/></a></div>
        <button aria-label="Toggle menu" onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden text-cream p-2">{menuOpen ? <X/> : <Menu/>}</button>
      </div>
      <AnimatePresence>{menuOpen && <motion.nav initial={{height:0,opacity:0}} animate={{height:"auto",opacity:1}} exit={{height:0,opacity:0}} className="lg:hidden overflow-hidden bg-ink border-t border-white/10"><div className="container-shell py-5 flex flex-col">{nav.map(([label,href])=><a key={href} onClick={closeMenu} href={href} className="py-3 text-xs tracking-[.18em] uppercase border-b border-white/10">{label}</a>)}<a onClick={closeMenu} href="#booking" className="btn-gold mt-5">Reserve Your Ritual</a></div></motion.nav>}</AnimatePresence>
    </header>

    <section id="home" className="relative min-h-[760px] h-[100svh] max-h-[1000px] flex items-end">
      <Image src={photo("photo-1540555700478-4be289fbecef", 2200)} alt="Warm, atmospheric luxury spa interior" fill priority sizes="100vw" className="object-cover object-center" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#11110f]/90 via-[#11110f]/45 to-[#11110f]/10"/>
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-black/20"/>
      <div className="container-shell relative z-10 pb-24 md:pb-32 pt-40">
        <motion.div initial="hidden" animate="show" variants={reveal} className="max-w-3xl">
          <p className="eyebrow mb-7">An ancient ritual. A modern sanctuary.</p>
          <h1 className="display-title text-[58px] sm:text-7xl md:text-[96px]">RECONNECT WITH<br/>YOUR BODY.<br/><span className="text-gold italic">REAWAKEN</span> YOUR SOUL.</h1>
          <p className="mt-8 max-w-lg text-sm md:text-base leading-7 text-cream/75">Discover the ancient Russian tradition of Banya, where heat, relaxation and wellness come together.</p>
          <div className="mt-9 flex flex-wrap gap-3"><a href="#services" className="btn-gold">Explore Treatments <ArrowRight size={14}/></a><a href="#booking" className="btn-outline">Book Your Experience</a></div>
        </motion.div>
      </div>
      <a href="#about" className="absolute bottom-8 right-8 hidden md:flex items-center gap-3 text-[9px] tracking-[.2em] uppercase text-cream/65">Scroll to discover <ArrowDown size={14}/></a>
      <div className="absolute bottom-8 left-8 hidden md:block text-[9px] tracking-[.2em] text-cream/55">EST. IN TRADITION · ROOTED IN RENEWAL</div>
    </section>

    <section id="about" className="section-pad bg-ink">
      <div className="container-shell grid md:grid-cols-2 gap-14 md:gap-24 items-center">
        <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={{once:true}}>
          <div className="relative aspect-[4/5] image-hover"><Image src={photo("photo-1576013551627-0cc20b96c2a7")} alt="Serene spa bathing space" fill sizes="(max-width:768px) 100vw, 50vw" className="object-cover"/></div>
          <div className="absolute hidden"/>
        </motion.div>
        <div><SectionHeading kicker="A heritage of wellbeing" title={<>THE BEAUTY OF<br/><i className="text-gold">SLOWING DOWN.</i></>} copy="More than a sauna, Banya is a centuries-old celebration of connection — to nature, to one another and to the quiet wisdom of the body."/>
          <p className="mt-7 text-sm leading-7 text-[#aaa69b]">At Russian Banya, we honour this cherished tradition through thoughtful rituals and considered hospitality. Let the warmth open the senses, the rhythm of the steam invite calm, and every detail bring you closer to balance.</p>
          <a href="#ritual" className="inline-flex items-center gap-3 mt-8 text-[10px] uppercase tracking-[.18em] text-gold">Discover the ritual <ArrowRight size={14}/></a>
        </div>
      </div>
    </section>

    <section id="services" className="section-pad bg-[#20201c]">
      <div className="container-shell">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14"><SectionHeading kicker="Curated for your wellbeing" title={<>RITUALS OF<br/><i className="text-gold">RESTORATION.</i></>} copy="From the deep embrace of the steam room to the intuitive touch of expert therapists, find the experience your body is asking for."/><p className="text-[10px] uppercase tracking-[.18em] text-sand max-w-[170px] leading-6">Eight ways to pause, reset and return to yourself.</p></div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">{services.map((s,i)=><motion.article key={s.name} variants={reveal} initial="hidden" whileInView="show" viewport={{once:true,amount:.12}} transition={{delay:i*.04}} className="group bg-[#292923]">
          <div className="relative aspect-[4/3] image-hover"><Image src={photo(s.image,700)} alt={s.name} fill sizes="(max-width:768px) 50vw, 25vw" className="object-cover"/><span className="absolute top-4 left-4 text-[9px] tracking-[.15em] bg-ink/75 px-3 py-2 text-gold">0{i+1}</span></div>
          <div className="p-5"><h3 className="font-display text-[25px] leading-tight">{s.name}</h3><p className="mt-3 text-xs leading-6 text-[#aaa69b] min-h-[72px]">{s.desc}</p><div className="mt-5 flex justify-between border-t border-white/10 pt-4 text-[10px] uppercase tracking-wider text-sand"><span className="flex items-center gap-1"><Clock3 size={12}/>{s.duration}</span><span>{s.price}</span></div><button onClick={()=>{setSelectedService(s.name);document.getElementById("booking")?.scrollIntoView({behavior:"smooth"});}} className="mt-5 flex items-center gap-2 text-[10px] uppercase tracking-[.15em] text-gold">Enquire <ArrowUpRight size={13}/></button></div>
        </motion.article>)}</div>
      </div>
    </section>

    <section id="ritual" className="section-pad bg-ink">
      <div className="container-shell">
        <SectionHeading center kicker="A ritual, not a routine" title={<>THE BANYA<br/><i className="text-gold">EXPERIENCE.</i></>} copy="A gentle sequence of warmth, renewal and rest. Move at your own pace; our team will guide every moment."/>
        <div className="mt-16 grid md:grid-cols-4 gap-8">{[
          ["01","ARRIVE","Leave the outside world behind. Settle in, breathe deeply and prepare to slow down.","photo-1515377905703-c4788e51af15"],
          ["02","WARM","Let the enveloping heat ease you into the present and awaken the senses.","photo-1576013551627-0cc20b96c2a7"],
          ["03","RENEW","Experience the traditional venik ritual or a treatment chosen around you.","photo-1544161515-4ab6ce6db874"],
          ["04","REST","Cool down, sip something soothing and enjoy the rare luxury of doing nothing.","photo-1540555700478-4be289fbecef"]
        ].map(([n,t,d,img])=><motion.div key={n} variants={reveal} initial="hidden" whileInView="show" viewport={{once:true}} className="relative"><div className="relative aspect-[5/4] image-hover"><Image src={photo(img,700)} alt={t.toLowerCase()+" banya ritual"} fill sizes="(max-width:768px) 100vw,25vw" className="object-cover"/></div><div className="mt-6 flex gap-4"><span className="font-display text-3xl text-gold">{n}</span><div><h3 className="text-xs tracking-[.18em] font-bold">{t}</h3><p className="mt-3 text-xs leading-6 text-[#aaa69b]">{d}</p></div></div></motion.div>)}</div>
      </div>
    </section>

    <section id="gallery" className="section-pad bg-[#20201c]">
      <div className="container-shell"><div className="flex items-end justify-between mb-12 gap-6"><SectionHeading kicker="A glimpse inside" title={<>THE ART OF<br/><i className="text-gold">ATMOSPHERE.</i></>}/><p className="hidden md:block max-w-xs text-xs leading-6 text-[#aaa69b]">Every space is an invitation to exhale. Explore the details that make each visit feel like a world apart.</p></div>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3 auto-rows-[150px] md:auto-rows-[190px]">{gallery.map((g,i)=><button key={g.title} onClick={()=>setActiveImage(i)} className={`relative text-left image-hover ${i===0?"col-span-2 row-span-2":i===3?"md:col-span-2":""}`} aria-label={`View ${g.title}`}><Image src={photo(g.image,900)} alt={g.title} fill sizes="(max-width:768px) 50vw, 33vw" className="object-cover"/><span className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-70"/><span className="absolute bottom-4 left-4 text-[9px] tracking-[.15em] uppercase">{g.title}</span></button>)}</div>
      </div>
    </section>

    <section id="packages" className="section-pad bg-ink">
      <div className="container-shell"><SectionHeading center kicker="Choose your escape" title={<>TIME WELL<br/><i className="text-gold">SPENT.</i></>} copy="Thoughtfully composed experiences, with room to make each ritual your own."/>
        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">{packages.map((p,i)=><div key={p.name} className={`p-7 border ${p.featured?"border-gold bg-[#29271f]":"border-white/15 bg-[#20201c]"} flex flex-col`}>
          {p.featured&&<span className="eyebrow mb-5">Guest favourite</span>}<h3 className="font-display text-3xl">{p.name}</h3><p className="mt-2 text-xs text-[#aaa69b]">{p.note}</p><div className="mt-8 font-display text-5xl text-gold">{p.price}<span className="text-xs font-sans text-sand"> / guest</span></div><div className="gold-line my-7"/><ul className="space-y-4 flex-1">{p.items.map(item=><li key={item} className="flex gap-3 text-xs text-cream/80"><Check size={14} className="text-gold shrink-0"/>{item}</li>)}</ul><a href="#booking" onClick={()=>setSelectedService(p.name)} className={`mt-9 text-center ${p.featured?"btn-gold":"btn-outline"}`}>Choose experience <ArrowRight size={13}/></a>
        </div>)}</div><p className="text-center text-[10px] text-[#89877f] mt-7">All prices shown are editable sample placeholders. Final rates may vary by location and availability.</p>
      </div>
    </section>

    <section className="relative py-28 md:py-36 overflow-hidden"><Image src={photo("photo-1519823551278-64ac92734fb1",1800)} alt="Spa treatment room" fill sizes="100vw" className="object-cover"/><div className="absolute inset-0 bg-ink/75"/><div className="container-shell relative text-center"><p className="eyebrow">The greatest luxury is time</p><h2 className="display-title text-5xl md:text-7xl max-w-4xl mx-auto mt-6">GIVE YOURSELF<br/><i className="text-gold">PERMISSION TO PAUSE.</i></h2><a href="#booking" className="btn-gold mt-9">Begin your experience <ArrowUpRight size={14}/></a></div></section>

    <section className="section-pad bg-[#20201c]"><div className="container-shell"><SectionHeading center kicker="Words from our guests" title={<>A FEELING THAT<br/><i className="text-gold">STAYS WITH YOU.</i></>}/>
      <div className="mt-14 grid md:grid-cols-3 gap-5">{[
        ["“A beautiful escape from the pace of everyday life. The team made every detail feel considered.”","Anastasia M."],
        ["“The warmth, the atmosphere, the quiet — exactly the reset I needed. Already looking forward to returning.”","Daniel R."],
        ["“An exceptional experience to share. Elegant, calming and genuinely memorable.”","Sofia & Alex"]
      ].map(([quote,name])=><div key={name} className="p-8 border border-white/10 bg-[#262620]"><div className="flex gap-1 text-gold">{[1,2,3,4,5].map(x=><Star key={x} size={12} fill="currentColor"/>)}</div><p className="font-display text-2xl leading-snug mt-7">{quote}</p><p className="eyebrow mt-8">{name}</p></div>)}</div>
      <p className="text-center text-[9px] text-[#89877f] mt-5">Sample testimonials for design preview. Replace with verified customer reviews before launch.</p>
    </div></section>

    <section id="booking" className="section-pad bg-ink">
      <div className="container-shell grid lg:grid-cols-[.8fr_1.2fr] gap-14 lg:gap-24">
        <div><SectionHeading kicker="Your time begins here" title={<>RESERVE<br/><i className="text-gold">YOUR RITUAL.</i></>} copy="Tell us a little about the experience you have in mind. Our team will be in touch to confirm your preferred time."/>
          <div className="mt-10 space-y-5 text-xs text-[#aaa69b]"><p className="flex gap-3"><Phone size={15} className="text-gold"/> +91 00000 00000</p><p className="flex gap-3"><Mail size={15} className="text-gold"/> hello@russianbanya.com</p><p className="flex gap-3"><Clock3 size={15} className="text-gold"/> Daily · 9:00 AM – 10:00 PM</p></div>
        </div>
        <div className="bg-[#20201c] border border-white/10 p-6 md:p-10">
          {submitted ? <div className="min-h-[480px] flex flex-col items-center justify-center text-center"><span className="w-14 h-14 rounded-full border border-gold text-gold grid place-items-center"><Check/></span><p className="eyebrow mt-7">Request received</p><h3 className="font-display text-4xl mt-3">Thank you.</h3><p className="text-sm text-[#aaa69b] leading-7 max-w-sm mt-4">Your booking request has been captured in this demo. Please contact the spa directly to confirm availability.</p><button onClick={()=>setSubmitted(false)} className="btn-outline mt-8">Make another request</button></div> :
          <form onSubmit={handleBooking} className="grid sm:grid-cols-2 gap-5">
            <label className="text-[10px] uppercase tracking-widest text-sand">Full name *<input name="name" required minLength={2} placeholder="Your name" className="mt-2 normal-case tracking-normal"/></label>
            <label className="text-[10px] uppercase tracking-widest text-sand">Phone number *<input name="phone" type="tel" required placeholder="+91 00000 00000" className="mt-2 normal-case tracking-normal"/></label>
            <label className="text-[10px] uppercase tracking-widest text-sand">Email address<input name="email" type="email" placeholder="you@example.com" className="mt-2 normal-case tracking-normal"/></label>
            <label className="text-[10px] uppercase tracking-widest text-sand">Select service *<select name="service" value={selectedService} onChange={e=>setSelectedService(e.target.value)} required className="mt-2 normal-case tracking-normal">{services.map(s=><option key={s.name}>{s.name}</option>)}{packages.map(p=><option key={p.name}>{p.name}</option>)}</select></label>
            <label className="text-[10px] uppercase tracking-widest text-sand">Preferred date *<input name="date" type="date" required min={new Date().toISOString().slice(0,10)} className="mt-2 normal-case tracking-normal"/></label>
            <label className="text-[10px] uppercase tracking-widest text-sand">Preferred time *<select name="time" required defaultValue="" className="mt-2 normal-case tracking-normal"><option value="" disabled>Select a time</option>{["09:00 AM","10:00 AM","11:00 AM","12:00 PM","01:00 PM","02:00 PM","03:00 PM","04:00 PM","05:00 PM","06:00 PM","07:00 PM","08:00 PM"].map(t=><option key={t}>{t}</option>)}</select></label>
            <label className="text-[10px] uppercase tracking-widest text-sand">Number of guests<select name="guests" defaultValue="1" className="mt-2 normal-case tracking-normal">{[1,2,3,4,5,6,7,8].map(n=><option key={n}>{n}</option>)}</select></label>
            <label className="text-[10px] uppercase tracking-widest text-sand sm:col-span-2">Additional message<textarea name="message" rows={3} placeholder="Any preferences or special requests?" className="mt-2 normal-case tracking-normal"/></label>
            {formError&&<p role="alert" className="sm:col-span-2 text-xs text-red-300">{formError}</p>}
            <div className="sm:col-span-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"><p className="text-[10px] text-[#89877f]">* Required fields. This demo does not send data to a server.</p><button className="btn-gold" type="submit">Request a booking <ArrowRight size={14}/></button></div>
          </form>}
        </div>
      </div>
    </section>

    <section id="contact" className="bg-[#20201c]">
      <div className="container-shell py-20 grid md:grid-cols-2 gap-12">
        <div><p className="eyebrow">Find your sanctuary</p><h2 className="display-title text-5xl md:text-6xl mt-5">COME BACK<br/><i className="text-gold">TO YOURSELF.</i></h2><p className="text-xs leading-6 text-[#aaa69b] mt-6 max-w-sm">We look forward to welcoming you. Replace the sample details below with your confirmed business information.</p><a href={whatsapp} target="_blank" rel="noreferrer" className="btn-gold mt-8">Book via WhatsApp <ArrowUpRight size={14}/></a></div>
        <div className="grid sm:grid-cols-2 gap-8">
          <div><p className="eyebrow mb-4">Visit us</p><p className="text-sm leading-7 text-cream/80">Your business address<br/>City, State, PIN<br/>India</p><p className="eyebrow mt-8 mb-4">Opening hours</p><p className="text-sm leading-7 text-cream/80">Monday – Sunday<br/>9:00 AM – 10:00 PM</p></div>
          <div><p className="eyebrow mb-4">Get in touch</p><p className="text-sm leading-7 text-cream/80">+91 00000 00000<br/>hello@russianbanya.com</p><p className="eyebrow mt-8 mb-4">Follow our rituals</p><div className="flex gap-4"><a aria-label="Instagram" href="https://instagram.com" target="_blank" rel="noreferrer" className="text-gold hover:text-cream"><Instagram/></a><a aria-label="Facebook" href="https://facebook.com" target="_blank" rel="noreferrer" className="text-gold hover:text-cream"><ArrowUpRight/></a></div></div>
        </div>
      </div>
      <div className="container-shell pb-16"><div className="relative h-[230px] bg-[#292923] border border-white/10 flex items-center justify-center overflow-hidden"><div className="absolute inset-0 opacity-20" style={{backgroundImage:"linear-gradient(rgba(184,154,101,.25) 1px, transparent 1px),linear-gradient(90deg,rgba(184,154,101,.25) 1px, transparent 1px)",backgroundSize:"34px 34px"}}/><div className="relative text-center"><MapPin className="text-gold mx-auto mb-3"/><p className="eyebrow">Map integration placeholder</p><p className="text-xs text-[#aaa69b] mt-2">Add your Google Maps embed URL here</p></div></div></div>
    </section>

    <footer className="bg-ink border-t border-white/10"><div className="container-shell py-12 flex flex-col md:flex-row justify-between gap-8"><a href="#home" className="flex items-center gap-3 h-fit"><span className="grid h-10 w-10 place-items-center border border-gold/70 text-gold font-display text-2xl">Б</span><span><span className="block text-[13px] tracking-[.23em] font-semibold">RUSSIAN BANYA</span><span className="block text-[8px] tracking-[.24em] text-sand">THE ART OF WELLNESS</span></span></a><div className="flex flex-wrap gap-x-7 gap-y-3 text-[9px] uppercase tracking-[.16em] text-[#aaa69b]">{nav.map(([l,h])=><a key={h} href={h} className="hover:text-gold">{l}</a>)}<a href="#packages" className="hover:text-gold">Packages</a></div><p className="text-[9px] text-[#77766e]">© {new Date().getFullYear()} Russian Banya. All rights reserved.</p></div></footer>

    <AnimatePresence>{activeImage!==null&&<motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-5" onClick={()=>setActiveImage(null)}><button aria-label="Close gallery" className="absolute top-6 right-6 text-white"><X size={28}/></button><button aria-label="Previous image" onClick={e=>{e.stopPropagation();setActiveImage((activeImage-1+gallery.length)%gallery.length)}} className="absolute left-3 md:left-8 text-white"><ChevronLeft size={32}/></button><div className="relative w-full max-w-5xl aspect-[16/10]" onClick={e=>e.stopPropagation()}><Image src={photo(gallery[activeImage].image,1600)} alt={gallery[activeImage].title} fill sizes="90vw" className="object-contain"/></div><button aria-label="Next image" onClick={e=>{e.stopPropagation();setActiveImage((activeImage+1)%gallery.length)}} className="absolute right-3 md:right-8 text-white"><ChevronRight size={32}/></button><p className="absolute bottom-6 text-xs tracking-widest uppercase">{gallery[activeImage].title}</p></motion.div>}</AnimatePresence>
  </main>;
}
