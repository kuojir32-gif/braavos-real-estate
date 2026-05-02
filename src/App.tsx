import { motion, AnimatePresence } from "motion/react";
import { Search, MapPin, Home, Key, Phone, Mail, Instagram, Facebook, Linkedin, Menu, X, Star, ArrowRight, CheckCircle2, MessageSquare, Send, Globe, ShieldCheck, Zap, ChevronDown, Tag } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { GoogleGenAI, Type } from "@google/genai";

// Initialize Gemini AI
const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const FAKE_AGENTS = [
  {
    id: 1,
    name: "ABDELRAHMAN ELSAKKA",
    role: "Luxury Property Advisor",
    image: "https://i.imgur.com/jOz2dgJ.jpeg",
    specialty: "Golf Course Estates",
    languages: "English, Arabic",
    description: "Abdelrahman is a dedicated Property Consultant who strives to exceed expectations while maintaining the highest level of integrity. With an emphasis on personalized service, expert guidance, and exceptional negotiation skills, he empowers his clients to navigate their real estate journeys with confidence. Diligent, transparent, and detail-oriented, Abdelrahman is committed to achieving outstanding results for every client.",
    reviews: [
      { user: "John D.", rating: 5, text: "Found me the perfect home with a view of the 18th hole. Excellence throughout." }
    ]
  },
  {
    id: 2,
    name: "MUHAMMAD SARMAD FAROOQ",
    role: "Property Consultant",
    image: "https://i.imgur.com/KSfq8Zx.jpeg",
    specialty: "Jumeirah Village Circle (JVC)",
    languages: "English, Hindi, Urdu, Punjabi",
    description: "Muhammad Sarmad Farooq brings a refined sense of service from his hospitality background into the world of real estate. Specializing in JVC and fluent in English, Hindi, Urdu, and Punjabi, he’s quickly making his mark with a client-focused approach, attentive communication, and a growing reputation for reliability.",
    reviews: [
      { user: "Lisa M.", rating: 5, text: "Sarmad has an incredible eye for value. Trust his recommendations." }
    ]
  },
  {
    id: 3,
    name: "SHAHBAZ GUL",
    role: "Property Consultant",
    image: "https://i.imgur.com/DKXUv0d.jpeg",
    specialty: "Silicon Oasis & Off-Plan",
    languages: "English, Hindi, Urdu, Punjabi",
    description: "Shahbaz Gul is a seasoned property consultant with 4 years of experience, specializing in both Silicon Oasis and off-plan developments. As a multilingual professional fluent in English, Hindi, Urdu, and Punjabi, he offers insightful guidance and a steady hand to clients seeking long-term value and smart investments.",
    reviews: [
      { user: "Private Office", rating: 5, text: "Professionalism at its peak. Shahbaz is our trusted partner for all assets." }
    ]
  },
  {
    id: 4,
    name: "BUSHRA",
    role: "Property Consultant",
    image: "https://i.imgur.com/33nkfRu.jpeg",
    specialty: "JVC & Off-Plan",
    languages: "English, Urdu, Hindi",
    description: "Bushra is a dynamic property consultant with years of hands-on experience, specializing in JVC and off-plan projects. Hailing from Karachi, Pakistan and fluent in English, Urdu, and Hindi, she brings a fresh perspective, clear communication, and a strong focus on helping clients make confident, well-informed decisions.",
    reviews: [
      { user: "Sophie T.", rating: 5, text: "Bushra didn't just find a house, she found a lifestyle. Her eye for design is unmatched." }
    ]
  },
  {
    id: 5,
    name: "HAKAN CAN ÇOLAK",
    role: "Property Consultant",
    image: "https://i.imgur.com/0axG52z.jpeg",
    specialty: "Design & Development",
    languages: "English, Turkish, German",
    description: "Hakan Can Çolak brings a global perspective to Dubai real estate, with roots in Turkey’s construction industry and a passion for interior design and property development. With experience spanning Istanbul, Spain, and the Netherlands, he combines refined aesthetics, strong sales acumen, and a client-first mindset to deliver exceptional property experiences.",
    reviews: [
      { user: "Klaus W.", rating: 5, text: "Hakan made my move from Berlin to Dubai completely stress-free." }
    ]
  },
  {
    id: 6,
    name: "MUHAMMAD BILAL",
    role: "Property Consultant",
    image: "https://i.imgur.com/o5mWsfZ.jpeg",
    specialty: "JVC Secondary Market",
    languages: "English, Urdu, Punjabi, Hindi",
    description: "Muhammad Bilal brings years of expertise, specializing in the JVC secondary market. Based in Dubai and originally from Lahore, he brings multilingual fluency in English, Urdu, Punjabi, and Hindi—ensuring clear communication and a tailored approach for every client.",
    reviews: [
      { user: "The Millers", rating: 5, text: "Bilal found us our dream home in the Ranches. He understood our needs perfectly." }
    ]
  },
  {
    id: 7,
    name: "AFAN SADIQ",
    role: "Leasing Specialist",
    image: "https://i.imgur.com/6J4tVPc.jpeg",
    specialty: "Short-Term / Holiday Homes",
    languages: "English, Urdu, Hindi",
    description: "Meet Afan Sadiq — a seasoned property consultant with over 4 years of experience, known for his honest advice and client-first approach. Fluent in English, Hindi, and Urdu, Afan blends integrity with deep market insight to make every real estate journey smooth and informed.",
    reviews: [
      { user: "Gareth P.", rating: 5, text: "Afan managed my property perfectly. High occupancy and great returns." }
    ]
  },
  {
    id: 8,
    name: "HAMZA SHAHBAZ",
    role: "Senior Consultant",
    image: "https://i.imgur.com/yqZUBbs.jpeg",
    specialty: "Off-Plan Properties",
    languages: "English, Arabic, Urdu",
    description: "Deeply committed to client satisfaction, Hamza is a hardworking professional who takes immense pride in his work. By keeping his customers at the forefront of every decision, he ensures a seamless and memorable real estate experience for every individual he serves.",
    reviews: [
      { user: "Ahmed R.", rating: 5, text: "Hamza's insights into future developments were spot on." }
    ]
  },
  {
    id: 9,
    name: "QUNISH WARIS",
    role: "Luxury Property Consultant",
    image: "https://i.imgur.com/UPjYCXm.jpeg",
    specialty: "Jumeirah Lakes Towers (JLT)",
    languages: "English, Hindi, Urdu",
    description: "With a steadfast focus on property quality, Qunish prides himself on his detailed and extensive understanding of Jumeirah Lakes Towers (JLT). He is dedicated to ensuring the highest level of service, assisting clients in securing their dream homes within the shortest possible timeframe.",
    reviews: [
      { user: "Sonia G.", rating: 5, text: "Qunish made finding a rental in Dubai Marina so easy. He handled all the paperwork!" },
      { user: "Mark D.", rating: 5, text: "Excellent follow-up and very helpful with local community info." }
    ]
  },
  {
    id: 10,
    name: "LAHIRU DARSHANA",
    role: "Waterfront Expert",
    image: "https://i.imgur.com/Ls9LE69.jpeg",
    specialty: "Beachfront Villas",
    languages: "English, Sinhalese",
    description: "Lahiru is the go-to specialist for beachfront living. From Emaar Beachfront to the World Islands, he knows every grain of sand on the Dubai coast.",
    reviews: [
      { user: "Emma L.", rating: 5, text: "Found us the perfect holiday home with private beach access. Incredible service." },
      { user: "Viktor P.", rating: 4, text: "Very knowledgeable about coastal development regulations." }
    ]
  },
  {
    id: 11,
    name: "ASIF MUHAMMAD",
    role: "Off-Market Director",
    image: "https://i.imgur.com/kNAFEYK.jpeg",
    specialty: "Bespoke Assets",
    languages: "English, Urdu, Arabic",
    description: "With a deep passion for the Dubai real estate market, Asif is dedicated to assisting clients with their leasing, buying, and selling needs. He is committed to providing excellent customer service through hard work, active listening, and consistent follow-through.",
    reviews: [
      { user: "Secret Buyer", rating: 5, text: "Total discretion and unmatched access. Asif is the best in the business." }
    ]
  },
  {
    id: 12,
    name: "ASGHAR MUHAMMAD",
    role: "SENIOR PROPERTY CONSULTANT",
    image: "https://i.imgur.com/gH06QnN.jpeg",
    specialty: "Jumeirah Village Circle & Surroundings",
    languages: "English, Urdu, Arabic",
    description: "A leading property consultant with vast knowledge of the Jumeirah Village Circle community and the property market across Dubai. Known for his exceptional client service and diligence, Asghar focuses on enabling his clients to choose from the best properties that perfectly align with their lifestyle and budget.",
    reviews: [
      { user: "Michael T.", rating: 5, text: "Asghar found us an off-market gem that wasn't listed anywhere else. Pure class." },
      { user: "Laila K.", rating: 5, text: "The definitive expert for luxury living in Dubai." }
    ]
  }
];

const FAKE_PROPERTIES = Array.from({ length: 40 }, (_, i) => ({
  id: i + 1,
  purpose: i < 20 ? "sale" : "rent",
  image: `https://images.unsplash.com/photo-${[
    "1512917774080-9991f1c4c750", "1600585154340-be6161a56a0c", "1600607687940-4e2a09695d51", 
    "1600566753190-17f0bb2a6c3e", "1600210492486-724fe5c67fb0", "1580587767378-7827a6e414c8",
    "1512918766775-d5ee3dfde113", "1613490491599-45d0d7a84bb4", "1613977257363-707ba9f58220",
    "1564013799919-ab600027ffc6", "1592595808347-118fb27da259", "1507089947368-19c1ad974541",
    "1512915920391-382cd013e8c0", "1600585154542-6331f9387001", "1600047509807-ba8f99d2cdde",
    "1600570997594-3bc88f98c6b9", "1600566753086-00f18fb6b3ea", "1600607687644-c7171ef3f096",
    "1600585152223-144b62475993", "1605141830624-74746f91572f"
  ][i % 20]}?auto=format&fit=crop&q=80&w=1000`,
  price: i < 20 ? `AED ${(5 + Math.random() * 50).toFixed(1)}M` : `AED ${(150 + Math.random() * 500).toFixed(0)}K /yr`,
  title: `${i < 20 ? "Sale" : "Rental"} Property ${i + 1} - Premium ${["Villa", "Penthouse", "Estate", "Suite"][i % 4]}`,
  location: ["Palm Jumeirah", "Downtown Dubai", "Dubai Hills", "Emirates Hills", "Business Bay"][i % 5],
  beds: 3 + (i % 4),
  baths: 4 + (i % 3),
  size: (2500 + i * 450).toLocaleString()
}));

const FAKE_PROJECTS = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  image: `https://images.unsplash.com/photo-${[
    "1597659840241-37e2b9c2f55f", "1545324418-cc1a3fa10c00", "1570129477492-45c003edd2be",
    "1512917774080-9991f1c4c750", "1600585154340-be6161a56a0c", "1600607687940-4e2a09695d51"
  ][i % 6]}?auto=format&fit=crop&q=80&w=1000`,
  title: `Project ${["Residence", "Towers", "Lakeside", "Heights"][i % 4]} ${i + 1}`,
  developer: ["DAMAC", "SOBHA", "EMAAR", "NAKHEEL", "MERAAS"][i % 5],
  location: ["Business Bay", "Dubai Marina", "JVC", "Meydan"][i % 4],
  status: ["Off-plan", "Ready 2025", "Ready 2026"][i % 3]
}));

const FAKE_REVIEWS = [
  { name: "Sarah Jenkins", role: "CEO, Tech Ventures", text: "Braavos handled my relocation with absolute precision. The penthouse they found in Downtown is breathtaking." },
  { name: "Khalid Al-Maktoum", role: "Private Investor", text: "Their portfolio of off-market properties is unmatched in Dubai. A truly bespoke service for serious buyers." },
  { name: "Elena Rodriguez", role: "Interior Designer", text: "As a designer, I appreciate their curation. Every property they showed me was a masterpiece of architecture." },
  { name: "James Wilson", role: "Hedge Fund Manager", text: "Sharp market analysis and zero-pressure sales. Braavos is the gold standard of real estate in the UAE." },
  { name: "Sophie Chen", role: "Entrepreneur", text: "Finding a home in a new country is stressful, but the team at Braavos made it feel like a breeze. Highly recommended." },
  { name: "Marcus Thorne", role: "Consultant", text: "Exquisite attention to detail. They didn't just find me a house; they found me a lifestyle." },
  { name: "Anya Petrova", role: "Model", text: "The most professional agency I've worked with. They respect privacy and deliver excellence every time." },
  { name: "Robert Sterling", role: "Retired Executive", text: "Braavos' after-sales support is what sets them apart. They are partners, not just agents." },
  { name: "Laila Haddad", role: "Art Collector", text: "They found me a villa with the perfect lighting for my collection. Their intuition for client needs is top-tier." },
  { name: "David Miller", role: "Digital Nomad", text: "Smooth process from viewing to keys. The team is young, energetic, and extremely knowledgeable." },
  { name: "Isabella Rossi", role: "Chef", text: "I needed a specific kitchen setup, and they scoured the city until they found the perfect match." },
  { name: "Tanaka Kenji", role: "Architect", text: "From a technical standpoint, Braavos understands structural quality better than any other agency in Dubai." },
  { name: "Olivia Brown", role: "Journalist", text: "Their market reports are the only ones I trust. Braavos truly knows the pulse of Dubai Real Estate." },
  { name: "Viktor Drago", role: "Athlete", text: "Privacy was my main concern. Braavos handled everything discreetly and efficiently." },
  { name: "Grace Lee", role: "Philanthropist", text: "A truly community-focused agency. Their integrity shines through in every interaction." }
];

const FeaturedProperty = ({ image, price, title, location, beds, baths, size }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ y: -10 }}
    className="group relative overflow-hidden rounded-xl bg-white shadow-xl dark:bg-slate-900"
    id={`property-${title.replace(/\s+/g, '-').toLowerCase()}`}
  >
    <div className="aspect-[4/3] overflow-hidden">
      <img 
        src={image} 
        alt={title} 
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        referrerPolicy="no-referrer"
      />
      <div className="absolute top-4 left-4 rounded-full bg-luxury-gold px-3 py-1 text-xs font-semibold text-white">
        Featured
      </div>
    </div>
    <div className="p-6">
      <div className="mb-2 text-2xl font-serif font-bold text-luxury-gold">{price}</div>
      <h3 className="mb-1 text-lg font-bold group-hover:text-luxury-gold transition-colors">{title}</h3>
      <div className="mb-4 flex items-center text-sm text-gray-500">
        <MapPin className="mr-1 h-4 w-4" />
        {location}
      </div>
      <div className="flex items-center justify-between border-t border-gray-100 pt-4 text-xs font-medium text-gray-600 uppercase tracking-wider">
        <span className="flex items-center"><Home className="mr-1 h-4 w-4" /> {beds} Beds</span>
        <span className="flex items-center"><Key className="mr-1 h-4 w-4" /> {baths} Baths</span>
        <span>{size} sq ft</span>
      </div>
    </div>
  </motion.div>
);

interface LogoProps {
  className?: string;
  light?: boolean;
}

const Logo = ({ className = "h-10", light }: LogoProps) => {
  const [useImage, setUseImage] = useState(true);

  return (
    <div className={`flex items-center gap-4 ${className} group cursor-pointer`}>
      <div className="relative h-12 w-12 flex items-center justify-center">
        {useImage ? (
           <img 
            src="/logo.png" 
            alt="Braavos Logo" 
            className={`h-full w-full object-contain brightness-110 contrast-125 ${light ? 'brightness-200' : ''}`} 
            onError={() => setUseImage(false)}
           />
        ) : (
          <svg viewBox="0 0 100 120" className="h-full w-full drop-shadow-xl">
            <defs>
              <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#C49A6C" />
                <stop offset="40%" stopColor="#FBDF93" />
                <stop offset="100%" stopColor="#8A6D3B" />
              </linearGradient>
            </defs>
            <path d="M5 40 L16 33 V85 L5 92 Z" fill="url(#goldGrad)" opacity={light ? "0.8" : "1"} />
            <path d="M19 25 L30 18 V88 L19 95 Z" fill="url(#goldGrad)" opacity={light ? "0.8" : "1"} />
            <path d="M33 5 L44 0 V100 L33 105 Z" fill="url(#goldGrad)" opacity={light ? "0.8" : "1"} />
            
            <path d="M52 35 L61 30 V75 L52 80 Z" fill="url(#goldGrad)" />
            <path d="M64 45 L73 40 V72 L64 77 Z" fill="url(#goldGrad)" />
            <path d="M76 55 L85 50 V68 L76 73 Z" fill="url(#goldGrad)" />
            
            <path d="M44 65 L85 85 V95 L44 75 Z" fill="url(#goldGrad)" opacity="0.9" />
            <path d="M44 80 L75 100 V110 L44 90 Z" fill="url(#goldGrad)" opacity="0.7" />
            <path d="M44 95 L65 110 V118 L44 105 Z" fill="url(#goldGrad)" opacity="0.5" />
          </svg>
        )}
      </div>
      <div className="flex flex-col">
        <span className={`text-2xl font-serif font-black tracking-[0.25em] leading-none drop-shadow-sm ${light ? 'text-white' : 'gold-text-gradient'}`}>BRAAVOS</span>
        <span className={`text-[10px] font-black tracking-[0.6em] mt-2 uppercase opacity-90 ${light ? 'text-white/60' : 'gold-text-gradient'}`}>Real Estate</span>
      </div>
    </div>
  );
};

const Navbar = ({ onContactClick, onSaleClick, onRentClick, onProjectsClick }: { 
  onContactClick: () => void;
  onSaleClick: () => void;
  onRentClick: () => void;
  onProjectsClick: () => void;
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Sale", action: onSaleClick },
    { name: "Rent", action: onRentClick },
    { name: "Projects", action: onProjectsClick },
    { name: "Services", link: "#services" },
    { name: "About", link: "#about" },
    { name: "Agents", link: "#agents" }
  ];

  return (
    <nav className={`fixed top-0 z-50 w-full transition-all duration-300 ${isScrolled ? "bg-white/90 py-3 shadow-xl backdrop-blur-md" : "bg-transparent py-6"}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-12">
        <div className="cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <Logo className="h-8" light={!isScrolled} />
        </div>
        
        <div className="hidden items-center gap-12 text-[12px] font-black uppercase tracking-[0.3em] lg:flex">
          {navItems.map((item) => (
            item.action ? (
              <button 
                key={item.name} 
                onClick={item.action}
                className={`transition-all hover:text-luxury-gold cursor-pointer relative after:content-[''] after:absolute after:bottom-[-6px] after:left-0 after:w-0 after:h-[1.5px] after:bg-luxury-gold after:transition-all hover:after:w-full ${isScrolled ? "text-luxury-navy" : "text-white"}`}
              >
                {item.name}
              </button>
            ) : (
              <a 
                key={item.name} 
                href={item.link} 
                className={`transition-all hover:text-luxury-gold relative after:content-[''] after:absolute after:bottom-[-6px] after:left-0 after:w-0 after:h-[1.5px] after:bg-luxury-gold after:transition-all hover:after:w-full ${isScrolled ? "text-luxury-navy" : "text-white"}`}
              >
                {item.name}
              </a>
            )
          ))}
          <button 
            onClick={onContactClick}
            className="gold-gradient rounded-full px-7 py-2.5 text-white shadow-lg transition-all hover:scale-105 active:scale-95 hover:shadow-luxury-gold/20"
          >
            Contact Us
          </button>
        </div>
        
        <button className="lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X className={isScrolled ? "text-luxury-navy" : "text-white"} /> : <Menu className={isScrolled ? "text-luxury-navy" : "text-white"} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-100 overflow-hidden shadow-2xl"
          >
            <div className="flex flex-col p-8 gap-6">
              {navItems.map((item) => (
                item.action ? (
                  <button 
                    key={item.name} 
                    onClick={() => { item.action?.(); setIsMenuOpen(false); }}
                    className="text-left text-xl font-serif font-bold text-luxury-navy flex justify-between items-center"
                  >
                    {item.name} <ArrowRight className="h-4 w-4 text-luxury-gold" />
                  </button>
                ) : (
                  <a 
                    key={item.name} 
                    href={item.link} 
                    onClick={() => setIsMenuOpen(false)}
                    className="text-xl font-serif font-bold text-luxury-navy"
                  >
                    {item.name}
                  </a>
                )
              ))}
              <button 
                onClick={() => { onContactClick(); setIsMenuOpen(false); }}
                className="gold-gradient w-full py-5 rounded-xl text-white font-bold uppercase tracking-[0.2em] mt-4 shadow-xl"
              >
                Contact Us
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const ContactModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => (
  <AnimatePresence>
    {isOpen && (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl"
        >
          <div className="gold-gradient p-12 text-center text-white relative">
            <h3 className="text-4xl font-serif mb-3 tracking-tight">Concierge Services</h3>
            <p className="opacity-80 text-[10px] font-black uppercase tracking-[0.5em]">Luxury Real Estate</p>
          </div>
          <div className="p-10 space-y-8">
            <div className="flex items-center gap-6 p-6 rounded-2xl bg-luxury-cream border border-luxury-gold/10 hover:border-luxury-gold transition-colors group">
              <div className="h-12 w-12 flex items-center justify-center rounded-full bg-white text-luxury-gold shadow-lg group-hover:scale-110 transition-transform">
                <Phone className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">Call Our Office</p>
                <p className="text-xl font-bold text-luxury-navy">+971 4 321 0000</p>
              </div>
            </div>
            <div className="flex items-center gap-6 p-6 rounded-2xl bg-luxury-cream border border-luxury-gold/10 hover:border-luxury-gold transition-colors group">
              <div className="h-12 w-12 flex items-center justify-center rounded-full bg-white text-luxury-gold shadow-lg group-hover:scale-110 transition-transform">
                <Mail className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">Email Us</p>
                <p className="text-xl font-bold text-luxury-navy">concierge@braavos.ae</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="w-full py-4 text-sm font-bold uppercase tracking-widest text-gray-400 hover:text-luxury-gold transition-colors"
            >
              Close Window
            </button>
          </div>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

const AgentProfileModal = ({ agent, isOpen, onClose }: { agent: any; isOpen: boolean; onClose: () => void }) => (
  <AnimatePresence>
    {isOpen && agent && (
      <div className="fixed inset-0 z-[120] flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
        />
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 30 }}
          className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row h-[85vh] md:h-auto"
        >
          <div className="md:w-1/3 bg-luxury-navy relative overflow-hidden group">
            <img src={agent.image} alt={agent.name} className="h-full w-full object-cover opacity-90 scale-105 group-hover:scale-100 transition-transform duration-1000" />
            <div className="absolute inset-0 bg-gradient-to-t from-luxury-navy via-transparent to-transparent p-8 flex flex-col justify-end">
              <h2 className="text-3xl font-serif font-bold text-white mb-2">{agent.name}</h2>
              <p className="text-luxury-gold font-bold uppercase tracking-widest text-xs">{agent.role}</p>
            </div>
            <button onClick={onClose} className="absolute top-6 left-6 h-10 w-10 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors md:hidden">
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <div className="flex-1 p-8 md:p-12 overflow-y-auto bg-white custom-scrollbar">
            <div className="flex justify-between items-start mb-8">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-luxury-gold mb-4">About Agent</p>
                <div className="flex flex-wrap gap-3 mb-6">
                  {agent.languages.split(', ').map((lang: string) => (
                    <span key={lang} className="px-3 py-1 bg-luxury-cream border border-luxury-gold/10 rounded-full text-[10px] font-bold uppercase text-luxury-navy/60">{lang}</span>
                  ))}
                </div>
              </div>
              <button onClick={onClose} className="hidden md:flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 text-gray-400 hover:text-luxury-navy transition-colors">
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-12">
              <section>
                <h3 className="text-xl font-serif font-bold text-luxury-navy mb-4">Profile Description</h3>
                <p className="text-gray-500 leading-relaxed font-light">{agent.description}</p>
              </section>

              <section>
                <h3 className="text-xl font-serif font-bold text-luxury-navy mb-6 flex items-center gap-3">
                  Client Reviews
                  <div className="flex gap-1">
                    {[1,2,3,4,5].map(s => <Star key={s} className="h-3 w-3 fill-luxury-gold text-luxury-gold" />)}
                  </div>
                </h3>
                <div className="grid gap-6">
                  {agent.reviews.map((rev: any, idx: number) => (
                    <div key={idx} className="p-6 bg-luxury-cream/50 rounded-2xl border border-gray-100">
                      <div className="flex justify-between items-center mb-4">
                        <p className="font-bold text-sm text-luxury-navy">{rev.user}</p>
                        <div className="flex gap-1">
                          {Array.from({ length: rev.rating }).map((_, i) => <Star key={i} className="h-2 w-2 fill-luxury-gold text-luxury-gold" />)}
                        </div>
                      </div>
                      <p className="text-sm italic text-gray-600 leading-relaxed">"{rev.text}"</p>
                    </div>
                  ))}
                </div>
              </section>


            </div>
          </div>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Welcome to Braavos Real Estate. I am your luxury property concierge. How can I assist you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    const userText = input;
    const newMsg = { role: 'user', text: userText };
    setMessages(prev => [...prev, newMsg]);
    setInput('');
    setIsLoading(true);
    
    try {
      const propertyData = FAKE_PROPERTIES.map(p => ({
        id: p.id,
        title: p.title,
        price: p.price,
        location: p.location,
        purpose: p.purpose,
        beds: p.beds
      }));

      const model = "gemini-3-flash-preview";
      const systemInstruction = `You are a luxury real estate concierge for Braavos Real Estate in Dubai. 
      Your goal is to help customers find properties based on their demands.
      You have access to the following properties: ${JSON.stringify(propertyData)}.
      
      Always respond in JSON format with the following structure:
      {
        "text": "Your helpful response message here",
        "recommendedPropertyIds": [1, 2, 3] // optional array of property IDs that match the user's request
      }
      
      Be professional, elegant, and helpful. If no properties match, tell them and offer to help with other search criteria.`;

      const response = await genAI.models.generateContent({
        model,
        contents: userText,
        config: {
          systemInstruction,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              text: { type: Type.STRING },
              recommendedPropertyIds: { 
                type: Type.ARRAY,
                items: { type: Type.INTEGER }
              }
            },
            required: ["text"]
          }
        }
      });

      const result = JSON.parse(response.text || "{}");
      
      const botMsg: any = { 
        role: 'bot', 
        text: result.text,
      };

      if (result.recommendedPropertyIds && result.recommendedPropertyIds.length > 0) {
        botMsg.properties = FAKE_PROPERTIES.filter(p => result.recommendedPropertyIds.includes(p.id));
      }

      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { 
        role: 'bot', 
        text: "I apologize, I'm experiencing a momentary connection issue. Please feel free to contact our concierge team directly or try again." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute bottom-20 right-0 w-[380px] overflow-hidden rounded-2xl bg-white shadow-2xl border border-gray-100 flex flex-col"
          >
            <div className="bg-luxury-navy p-5 text-white flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Logo className="h-6" />
                <div>
                  <p className="text-[10px] text-green-400 flex items-center gap-1 font-bold"><span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" /> CONCIERGE AI ACTIVE</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)}><X className="h-5 w-5 opacity-60 hover:opacity-100" /></button>
            </div>
            <div ref={scrollRef} className="h-[450px] overflow-y-auto p-4 space-y-4 bg-gray-50 scrollbar-hide">
              {messages.map((msg: any, i) => (
                <div key={i} className={`flex flex-col ${msg.role === 'bot' ? 'items-start' : 'items-end'}`}>
                  <div className={`max-w-[90%] p-3 rounded-2xl text-sm ${msg.role === 'bot' ? 'bg-white text-gray-800 rounded-tl-none shadow-sm' : 'gold-gradient text-white rounded-tr-none'}`}>
                    {msg.text}
                  </div>
                  {msg.properties && msg.properties.length > 0 && (
                    <div className="mt-3 w-full grid grid-cols-1 gap-3">
                      {msg.properties.slice(0, 3).map((p: any) => (
                        <div key={p.id} className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 p-2 flex gap-3 group hover:border-luxury-gold transition-all">
                          <div className="h-16 w-16 rounded-lg overflow-hidden flex-shrink-0">
                            <img src={p.image} className="h-full w-full object-cover group-hover:scale-110 transition-transform" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-[10px] font-black text-luxury-gold truncate mb-0.5">{p.title}</p>
                            <p className="text-[11px] font-bold text-luxury-navy mb-1">{p.price}</p>
                            <p className="text-[9px] text-gray-400 flex items-center gap-1"><MapPin className="h-2 w-2" /> {p.location}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm flex gap-1">
                    <span className="h-1.5 w-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="h-1.5 w-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="h-1.5 w-1.5 bg-gray-300 rounded-full animate-bounce" />
                  </div>
                </div>
              )}
            </div>
            <div className="p-4 border-t border-gray-100 flex gap-2 bg-white">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about properties, locations, prices..." 
                className="flex-1 text-sm outline-none bg-gray-50 px-4 py-2.5 rounded-xl"
                disabled={isLoading}
              />
              <button 
                onClick={handleSend}
                disabled={isLoading}
                className={`h-11 w-11 flex items-center justify-center rounded-xl text-white transition-all ${isLoading ? 'bg-gray-200' : 'bg-luxury-gold hover:scale-105 active:scale-95 shadow-lg shadow-luxury-gold/20'}`}
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button 
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="h-16 w-16 gold-gradient rounded-full flex items-center justify-center text-white shadow-2xl relative"
      >
        {isOpen ? <X className="h-8 w-8" /> : <MessageSquare className="h-8 w-8" />}
        {!isOpen && <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 rounded-full border-2 border-white animate-bounce" />}
      </motion.button>
    </div>
  );
};

const PropertyExplorer = ({ isOpen, onClose, mode }: { isOpen: boolean; onClose: () => void, mode: "sale" | "rent" | "projects" }) => {
  const [activeFilters, setActiveFilters] = useState({
    location: "All",
    type: "All",
    priceRange: "All",
    developer: "All"
  });

  const filteredItems = mode === "projects" 
    ? FAKE_PROJECTS.filter(p => {
        const locMatch = activeFilters.location === "All" || p.location === activeFilters.location;
        const devMatch = activeFilters.developer === "All" || p.developer === activeFilters.developer;
        return locMatch && devMatch;
      })
    : FAKE_PROPERTIES.filter(p => {
        if (p.purpose !== mode) return false;
        const locMatch = activeFilters.location === "All" || p.location === activeFilters.location;
        const typeMatch = activeFilters.type === "All" || p.title.includes(activeFilters.type);
        
        let priceMatch = true;
        if (activeFilters.priceRange !== "All") {
          const priceStr = p.price.replace("AED ", "").replace("M", "").replace("K /yr", "");
          const priceVal = parseFloat(priceStr);
          if (mode === "sale") {
            if (activeFilters.priceRange === "Under 10M") priceMatch = priceVal < 10;
            if (activeFilters.priceRange === "10M - 25M") priceMatch = priceVal >= 10 && priceVal <= 25;
            if (activeFilters.priceRange === "Over 25M") priceMatch = priceVal > 25;
          } else {
            if (activeFilters.priceRange === "Budget") priceMatch = priceVal < 250;
            if (activeFilters.priceRange === "Premium") priceMatch = priceVal >= 250 && priceVal <= 500;
            if (activeFilters.priceRange === "Ultra") priceMatch = priceVal > 500;
          }
        }
        
        return locMatch && typeMatch && priceMatch;
      });

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          className="fixed inset-0 z-[110] bg-white overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="border-b border-gray-100 px-8 py-4 flex items-center justify-between bg-white shadow-sm">
            <Logo className="h-8" />
            <div className="text-center hidden md:block">
                <h3 className="text-xl font-serif font-bold text-luxury-navy capitalize tracking-tight">{mode} Portfolio</h3>
                <p className="text-[10px] text-luxury-gold font-bold uppercase tracking-[0.3em]">{filteredItems.length} curated listings</p>
            </div>
            <button 
              onClick={onClose}
              className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-luxury-gold transition-colors"
            >
              Exit Explorer <X className="h-4 w-4 group-hover:rotate-90 transition-transform" />
            </button>
          </div>

          <div className="flex-1 flex overflow-hidden">
            {/* Sidebar Filters */}
            <aside className="w-80 border-r border-gray-100 p-8 overflow-y-auto bg-luxury-cream">
              <h4 className="text-xs font-black uppercase tracking-[0.2em] text-luxury-gold mb-8">Refine Search</h4>
              
              <div className="space-y-10">
                <div className="space-y-4">
                  <label className="text-sm font-bold text-luxury-navy flex items-center gap-2"><MapPin className="h-4 w-4 text-luxury-gold" /> Location</label>
                  <div className="flex flex-col gap-2">
                    {["All", "Palm Jumeirah", "Downtown Dubai", "Dubai Hills", "Emirates Hills", "Business Bay", "Dubai Marina"].map(loc => (
                      <button 
                        key={loc}
                        onClick={() => setActiveFilters({...activeFilters, location: loc})}
                        className={`text-left text-sm py-2 px-4 rounded-lg transition-all ${activeFilters.location === loc ? "bg-luxury-navy text-white shadow-md" : "text-gray-500 hover:bg-white hover:text-luxury-navy"}`}
                      >
                        {loc}
                      </button>
                    ))}
                  </div>
                </div>

                {mode !== "projects" ? (
                  <>
                    <div className="space-y-4">
                      <label className="text-sm font-bold text-luxury-navy flex items-center gap-2"><Home className="h-4 w-4 text-luxury-gold" /> Property Type</label>
                      <div className="flex flex-col gap-2">
                        {["All", "Villa", "Penthouse", "Estate", "Suite"].map(type => (
                          <button 
                            key={type}
                            onClick={() => setActiveFilters({...activeFilters, type: type})}
                            className={`text-left text-sm py-2 px-4 rounded-lg transition-all ${activeFilters.type === type ? "bg-luxury-navy text-white shadow-md" : "text-gray-500 hover:bg-white hover:text-luxury-navy"}`}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <label className="text-sm font-bold text-luxury-navy flex items-center gap-2"><Star className="h-4 w-4 text-luxury-gold" /> Price Range</label>
                      <div className="flex flex-col gap-2">
                        {(mode === "sale" 
                          ? ["All", "Under 10M", "10M - 25M", "Over 25M"]
                          : ["All", "Budget", "Premium", "Ultra"]
                        ).map(range => (
                          <button 
                            key={range}
                            onClick={() => setActiveFilters({...activeFilters, priceRange: range})}
                            className={`text-left text-sm py-2 px-4 rounded-lg transition-all ${activeFilters.priceRange === range ? "bg-luxury-navy text-white shadow-md" : "text-gray-500 hover:bg-white hover:text-luxury-navy"}`}
                          >
                            {range}
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="space-y-4">
                    <label className="text-sm font-bold text-luxury-navy flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-luxury-gold" /> Developer</label>
                    <div className="flex flex-col gap-2">
                      {["All", "DAMAC", "SOBHA", "EMAAR", "NAKHEEL", "MERAAS"].map(dev => (
                        <button 
                          key={dev}
                          onClick={() => setActiveFilters({...activeFilters, developer: dev})}
                          className={`text-left text-sm py-2 px-4 rounded-lg transition-all ${activeFilters.developer === dev ? "bg-luxury-navy text-white shadow-md" : "text-gray-500 hover:bg-white hover:text-luxury-navy"}`}
                        >
                          {dev}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <button 
                  onClick={() => setActiveFilters({location: "All", type: "All", priceRange: "All", developer: "All"})}
                  className="w-full py-3 text-xs font-bold uppercase tracking-widest text-red-400 hover:text-red-600 transition-colors border-t border-gray-200 mt-4"
                >
                  Reset Filters
                </button>
              </div>
            </aside>

            {/* Grid Content */}
            <main className="flex-1 p-8 overflow-y-auto bg-white">
              {filteredItems.length > 0 ? (
                <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                  <AnimatePresence mode="popLayout">
                    {filteredItems.map((item: any) => (
                      mode === "projects" ? (
                        <motion.div 
                          key={item.id}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          whileHover={{ y: -10 }}
                          className="group overflow-hidden rounded-2xl bg-white shadow-lg border border-gray-100 flex flex-col"
                        >
                          <div className="aspect-[16/10] overflow-hidden relative">
                            <img src={item.image} alt={item.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-t from-luxury-navy/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold text-luxury-navy uppercase tracking-widest shadow-lg">
                              {item.status}
                            </div>
                            <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                               <p className="text-[10px] font-bold uppercase tracking-widest text-luxury-gold mb-1">Architecture by {item.developer}</p>
                               <button className="text-xs font-bold flex items-center gap-1 hover:underline">Request Brochure <ArrowRight className="h-3 w-3" /></button>
                            </div>
                          </div>
                          <div className="p-6 flex-1 flex flex-col justify-between">
                            <div>
                              <div className="flex justify-between items-start mb-2">
                                <h3 className="text-xl font-serif font-bold text-luxury-navy">{item.title}</h3>
                                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                              </div>
                              <p className="text-sm text-gray-500 flex items-center gap-1 mb-4"><MapPin className="h-3 w-3 text-luxury-gold" /> {item.location}</p>
                            </div>
                            <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                               <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Developer</span>
                               <span className="text-sm font-serif font-bold text-luxury-navy">{item.developer}</span>
                            </div>
                          </div>
                        </motion.div>
                      ) : (
                        <FeaturedProperty 
                          key={item.id}
                          image={item.image}
                          price={item.price}
                          title={item.title}
                          location={item.location}
                          beds={item.beds}
                          baths={item.baths}
                          size={item.size}
                        />
                      )
                    ))}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <Search className="h-16 w-16 text-gray-200 mb-4" />
                  <h3 className="text-2xl font-serif text-gray-400">No results found</h3>
                  <p className="text-gray-400 max-w-xs mt-2">Try adjusting your filters or speak with our concierge.</p>
                </div>
              )}
            </main>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default function App() {
  const [showContactModal, setShowContactModal] = useState(false);
  const [explorerMode, setExplorerMode] = useState<"sale" | "rent" | "projects" | null>(null);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchPurpose, setSearchPurpose] = useState<"buy" | "rent" | "off-plan">("buy");
  const [beds, setBeds] = useState("Any");
  const [price, setPrice] = useState("Any");
  const [selectedAgent, setSelectedAgent] = useState<any>(null);

  const CustomDropdown = ({ label, icon: Icon, options, current, onSelect, id }: { label: string, icon: any, options: string[], current: string, onSelect: (val: string) => void, id: string }) => (
    <div className="flex-1 w-full px-8 py-5 border-gray-100 last:border-r-0 group relative">
      <div 
        className="flex items-center gap-3 cursor-pointer"
        onClick={(e) => { e.stopPropagation(); setActiveDropdown(activeDropdown === id ? null : id); }}
      >
        <div className="p-2 rounded-lg bg-luxury-gold/5 group-hover:bg-black/5 transition-colors">
          <Icon className="text-luxury-gold h-4 w-4" />
        </div>
        <div className="flex flex-col">
          <span className="text-[9px] font-black uppercase tracking-[0.15em] text-gray-400 mb-0.5">{label}</span>
          <span className="text-[12px] font-black uppercase tracking-widest text-luxury-navy">{current}</span>
        </div>
        <ChevronDown className={`h-3 w-3 ml-auto text-luxury-gold transition-transform duration-500 ease-out ${activeDropdown === id ? "rotate-180" : ""}`} />
      </div>
      
      <AnimatePresence>
        {activeDropdown === id && (
          <motion.div 
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="absolute top-[85%] left-0 w-full min-w-[260px] bg-white shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] rounded-2xl border border-gray-100 z-50 py-3 overflow-hidden outline outline-1 outline-black/5"
          >
            <div className="px-6 py-2 border-b border-gray-50 mb-1">
               <p className="text-[8px] font-black uppercase tracking-[0.3em] text-gray-300">Select {label}</p>
            </div>
            {options.map(opt => (
              <div 
                key={opt} 
                className={`px-6 py-3.5 text-[10px] font-black uppercase tracking-widest cursor-pointer transition-all flex items-center justify-between ${current === opt ? "bg-black text-white" : "text-luxury-navy/60 hover:text-black hover:bg-gray-50 bg-white"}`}
                onClick={() => { onSelect(opt); setActiveDropdown(null); }}
              >
                {opt}
                {current === opt && <div className="h-1.5 w-1.5 rounded-full bg-luxury-gold" />}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <div className="min-h-screen bg-luxury-cream text-luxury-navy relative" onClick={() => setActiveDropdown(null)}>
      <Navbar 
        onContactClick={() => setShowContactModal(true)} 
        onSaleClick={() => setExplorerMode("sale")}
        onRentClick={() => setExplorerMode("rent")}
        onProjectsClick={() => setExplorerMode("projects")}
      />
      <ContactModal isOpen={showContactModal} onClose={() => setShowContactModal(false)} />
      <PropertyExplorer 
        mode={explorerMode || "sale"} 
        isOpen={!!explorerMode} 
        onClose={() => setExplorerMode(null)} 
      />
      <AgentProfileModal 
        agent={selectedAgent} 
        isOpen={!!selectedAgent} 
        onClose={() => setSelectedAgent(null)} 
      />
      <Chatbot />
      
      {/* Hero Section */}
      <section className="relative h-[95vh] w-full overflow-hidden bg-luxury-navy flex items-center" id="hero">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="absolute inset-0 h-full w-full object-cover opacity-40 grayscale contrast-125"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-dubai-skyline-at-night-42867-large.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-luxury-navy via-luxury-navy/60 to-transparent" />
        
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-12 flex flex-col items-start text-white">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <p className="text-luxury-gold font-bold uppercase tracking-[0.4em] text-xs mb-6">Established 2008</p>
            <h1 className="mb-8 font-serif text-6xl font-medium sm:text-8xl lg:text-9xl leading-none">
              Your Vision.<br />
              <span className="italic text-luxury-gold">Our Expertise.</span>
            </h1>
            <p className="text-lg font-light text-white/60 max-w-xl mb-12 leading-relaxed">
              Experience the pinnacle of Dubai real estate. From waterfront villas on the Palm to architectural wonders in Downtown.
            </p>
          </motion.div>
          
          <motion.div 
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 0.2 }}
             className="w-full max-w-5xl"
          >
            {/* Purpose Tabs */}
            <div className="flex gap-2 mb-0 relative z-30 px-2 lg:px-0">
              {[
                { id: "buy", label: "Sale" },
                { id: "rent", label: "Rent" },
                { id: "off-plan", label: "Projects" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSearchPurpose(tab.id as any)}
                  className={`px-12 py-5 rounded-t-2xl text-[13px] font-black uppercase tracking-[0.3em] transition-all duration-300 min-w-[160px] ${
                    searchPurpose === tab.id 
                    ? "bg-white text-luxury-navy shadow-[0_-10px_50px_rgba(0,0,0,0.3)] scale-100" 
                    : "bg-white/10 text-white/60 hover:bg-white/20 hover:text-white backdrop-blur-xl border border-white/10"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Main Search Container */}
            <div className="bg-white shadow-2xl flex flex-col items-center rounded-2xl rounded-tl-none p-2 sm:flex-row relative z-20 border border-luxury-gold/5 w-full mx-auto">
              <div className="flex-[2] w-full px-8 py-5 sm:border-r border-gray-100 group flex items-center gap-4">
                <Search className="text-luxury-gold h-5 w-5 opacity-40 group-focus-within:opacity-100 transition-opacity" />
                <div className="flex flex-col w-full">
                  <span className="text-[10px] font-black uppercase tracking-[0.1em] text-gray-400 mb-0.5">Location</span>
                  <input 
                    type="text" 
                    placeholder="District, Project or Keyword" 
                    className="w-full bg-transparent text-luxury-navy placeholder-luxury-navy/20 outline-none font-black uppercase tracking-widest text-[11px] placeholder:font-light"
                  />
                </div>
              </div>
              
              <CustomDropdown 
                id="beds"
                label="Beds" 
                icon={Home} 
                options={["Any", "Studio", "1 Bed", "2 Beds", "3 Beds", "4+ Beds"]} 
                current={beds}
                onSelect={setBeds}
              />

              <CustomDropdown 
                id="price"
                label="Price Range" 
                icon={Tag} 
                options={searchPurpose === "rent" 
                  ? ["Any", "Under 100K", "100K - 250K", "Over 250K"]
                  : ["Any", "Under 5M", "5M - 15M", "Over 15M"]
                } 
                current={price}
                onSelect={setPrice}
              />

              <button 
                onClick={() => setExplorerMode(searchPurpose === "off-plan" ? "projects" : searchPurpose === "rent" ? "rent" : "sale")}
                className="gold-gradient w-full rounded-xl px-12 py-5 font-black uppercase tracking-[0.3em] text-[10px] text-white sm:w-auto transition-all hover:scale-[1.02] active:scale-95 shadow-2xl hover:shadow-luxury-gold/30"
              >
                Search
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Solutions Section (Moved to 2nd position) */}
      <section className="bg-white py-24" id="services">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-serif font-medium sm:text-5xl">Dubai real estate solutions focused around <br /><span className="text-luxury-gold italic">excellent customer service.</span></h2>
            <div className="mx-auto h-1 w-24 bg-luxury-gold" />
          </div>
          
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Home, title: "Selling a Property", desc: "Our multi-award-winning sales team is ready to sell your property at the best price." },
              { icon: Search, title: "Buying a Property", desc: "Explore thousands of properties matching your dream luxury lifestyle in Dubai." },
              { icon: Key, title: "Renting a Property", desc: "Expert rental services to help you find the perfect villa or apartment." },
              { icon: Star, title: "Branded Residences", desc: "Exclusive access to top branded developments in the UAE." }
            ].map((service) => (
              <motion.div 
                key={service.title}
                whileHover={{ y: -5 }}
                className="rounded-2xl border border-gray-100 bg-luxury-cream/30 p-8 shadow-sm transition-all hover:shadow-xl"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-white text-luxury-gold shadow-sm">
                  <service.icon className="h-7 w-7" />
                </div>
                <h3 className="mb-3 text-xl font-bold">{service.title}</h3>
                <p className="text-sm leading-relaxed text-gray-500">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Partner Logos - Rolling Marquee */}
        <div className="mt-24 border-y border-gray-100 py-10 bg-white overflow-hidden flex items-center">
          <div className="relative flex overflow-hidden w-full">
            <motion.div 
              animate={{ x: [0, -1035] }}
              transition={{ x: { repeat: Infinity, duration: 25, ease: "linear" } }}
              className="flex gap-20 items-center whitespace-nowrap px-10"
            >
              {["EMAAR", "DAMAC", "NAKHEEL", "SOBHA", "MERAAS", "BINGHATTI", "EMAAR", "DAMAC", "NAKHEEL", "SOBHA", "MERAAS", "BINGHATTI"].map((dev, i) => (
                <span key={i} className={`text-2xl font-serif font-black opacity-20 hover:opacity-100 transition-opacity cursor-default ${i % 2 === 0 ? 'italic' : ''}`}>{dev}</span>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Braavos Section */}
      <section className="py-32 bg-luxury-cream/20" id="about">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <p className="text-luxury-gold font-black uppercase tracking-[0.4em] text-xs mb-6">Established 2020</p>
              <h2 className="text-5xl font-serif font-medium leading-tight mb-8">About <span className="italic">Braavos Real Estate.</span></h2>
              <div className="space-y-6 text-gray-600 leading-relaxed font-light">
                <p>
                  Braavos Real Estate is a fully integrated real estate firm based in JVC, Dubai, U.A.E founded in March 2020 by <span className="text-luxury-navy font-bold">Mr. Qaiser Shahzad Bajwa</span>, a veteran and highly accomplished property consultant with over 15 years of experience in the UAE real estate market.
                </p>
                <p>
                  In addition to offering unique investment opportunities, we provide comprehensive brokerage and consultancy services. We offer a customized menu of high-quality services tailored to your specific needs to maximize the profitability and potential of your real estate assets.
                </p>
                <div className="pt-8 border-t border-luxury-gold/20">
                  <h3 className="text-2xl font-serif text-luxury-navy mb-4">Why Braavos?</h3>
                  <p className="mb-4">
                    With our distinct yet cohesive divisions all under one roof, we are your single source for any project. We specialize in guiding you through the development process from start to finish while advising you on market trends to assist you in making the best decisions.
                  </p>
                  <p>
                    Our unique structure allows us to streamline this process for you. We take pride in providing quality and timely workmanship, superior customer service, and sound investment advice. Our professional Team with more than 10 years of extensive experience caters to every delicate need.
                  </p>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[4/5] overflow-hidden rounded-3xl shadow-2xl relative">
                <img 
                  src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&q=80&w=1000" 
                  alt="Dubai Skyline View" 
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-luxury-navy/60 to-transparent" />
                <div className="absolute bottom-12 left-12 right-12 text-white">
                  <p className="text-6xl font-serif mb-2">15+</p>
                  <p className="text-xs font-black uppercase tracking-[0.3em] text-luxury-gold">Years of Dubai Market Expertise</p>
                </div>
              </div>
              <div className="absolute -top-10 -right-10 h-64 w-64 bg-white/50 backdrop-blur-xl rounded-full flex items-center justify-center border border-luxury-gold/10 hidden xl:flex">
                <p className="text-center px-10 text-[10px] font-black uppercase tracking-widest text-luxury-navy leading-relaxed italic">
                  "Exceeding expectations through integrity and local insight."
                </p>
              </div>
            </motion.div>
          </div>
          <div className="mt-20 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              "Residential Sales", "Commercial Leasing", "Off-Plan Projects", "Redevelopment"
            ].map((specialty, i) => (
              <div key={specialty} className="p-6 bg-white border border-gray-100 rounded-2xl flex items-center gap-4 shadow-sm group hover:border-luxury-gold transition-all">
                <div className="h-10 w-10 flex items-center justify-center rounded-full bg-luxury-cream text-luxury-gold group-hover:bg-luxury-gold group-hover:text-white transition-colors">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <span className="text-sm font-bold text-luxury-navy">{specialty}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-32 bg-white" id="agents">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div className="max-w-2xl">
              <p className="text-luxury-gold font-black uppercase tracking-[0.4em] text-xs mb-4">Our Elite Team</p>
              <h2 className="text-5xl font-serif font-medium leading-tight">Mastering the Art of <br /><span className="italic">Dubai Real Estate.</span></h2>
            </div>
            <p className="text-gray-400 font-light max-w-sm leading-relaxed">
              With over 15 years of market dominance, our specialized agents provide unparalleled access to off-market opportunities and bespoke investment strategies.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-8">
            {FAKE_AGENTS.map((agent, i) => (
              <motion.div 
                key={agent.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
                onClick={() => setSelectedAgent(agent)}
              >
                <div className="aspect-[3/4] overflow-hidden rounded-2xl mb-4 relative bg-gray-100">
                  <img 
                    src={agent.image} 
                    alt={agent.name} 
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-luxury-navy/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                    <p className="text-[10px] font-black uppercase tracking-widest text-luxury-gold mb-1">{agent.specialty}</p>
                    <p className="text-[10px] text-white/60 uppercase tracking-widest leading-tight">{agent.languages}</p>
                  </div>
                </div>
                <h4 className="text-sm font-serif font-bold text-luxury-navy group-hover:text-luxury-gold transition-colors">{agent.name}</h4>
                <p className="text-[9px] font-black uppercase tracking-widest text-luxury-gold/60">{agent.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="bg-luxury-navy py-24 text-white" id="buy">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="mb-16 flex flex-col items-end justify-between border-b border-white/10 pb-8 sm:flex-row">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-widest text-luxury-gold">Exclusive Listings</p>
              <h2 className="text-4xl font-serif font-medium sm:text-5xl">Explore Property in Dubai.</h2>
            </div>
            <button 
              onClick={() => setExplorerMode("sale")}
              className="group mt-6 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-luxury-gold transition-all sm:mt-0"
            >
              View All Properties 
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-2" />
            </button>
          </div>
          
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
             <AnimatePresence>
              {FAKE_PROPERTIES.slice(0, 3).map((p) => (
                <FeaturedProperty 
                  key={p.id}
                  image={p.image}
                  price={p.price}
                  title={p.title}
                  location={p.location}
                  beds={p.beds}
                  baths={p.baths}
                  size={p.size}
                />
              ))}
             </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
           <div className="text-center mb-20">
              <h2 className="text-5xl font-serif mb-6">Why Our Clients Trust <span className="text-luxury-gold font-bold">Braavos.</span></h2>
              <p className="text-gray-500 max-w-2xl mx-auto">Providing unmatched expertise and personalized service for the world's most discerning real estate investors.</p>
           </div>

           <div className="grid lg:grid-cols-3 gap-8">
              {/* Pillar Content */}
              <div className="lg:col-span-1 space-y-8">
                <div className="p-8 bg-luxury-cream rounded-3xl border border-luxury-gold/10">
                   <h3 className="text-2xl font-serif mb-4 flex items-center gap-3"><ShieldCheck className="text-luxury-gold" /> Integrity</h3>
                   <p className="text-gray-600 text-sm leading-relaxed">Over 15 years of transparent dealing in the Dubai market, building lifelong relationships with our global clientele.</p>
                </div>
                <div className="p-8 bg-luxury-cream rounded-3xl border border-luxury-gold/10">
                   <h3 className="text-2xl font-serif mb-4 flex items-center gap-3"><Zap className="text-luxury-gold" /> Efficiency</h3>
                   <p className="text-gray-600 text-sm leading-relaxed">Our record-breaking transaction speeds ensure you never miss out on high-yield investment opportunities.</p>
                </div>
                <div className="p-8 bg-luxury-cream rounded-3xl border border-luxury-gold/10">
                   <h3 className="text-2xl font-serif mb-4 flex items-center gap-3"><Globe className="text-luxury-gold" /> Global Network</h3>
                   <p className="text-gray-600 text-sm leading-relaxed">A multilingual team of 200+ specialists catering to investors from over 45 different countries.</p>
                </div>
              </div>

              {/* Review Scroll */}
              <div className="lg:col-span-2 relative">
                <div className="grid sm:grid-cols-2 gap-6 h-[700px] overflow-y-auto pr-4 scrollbar-hide">
                  {FAKE_REVIEWS.map((review, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="p-8 bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-lg transition-shadow relative"
                    >
                      <Star className="absolute top-8 right-8 text-luxury-gold opacity-10 h-10 w-10" />
                      <div className="flex gap-1 mb-4 text-luxury-gold">
                        {Array.from({ length: 5 }).map((_, j) => <Star key={j} className="h-3 w-3 fill-current" />)}
                      </div>
                      <p className="text-gray-700 italic text-sm mb-6 leading-relaxed">"{review.text}"</p>
                      <div>
                        <p className="font-bold text-luxury-navy">{review.name}</p>
                        <p className="text-[10px] text-luxury-gold font-bold uppercase tracking-widest">{review.role}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none" />
              </div>
           </div>
        </div>
      </section>

      {/* Lead Generation Form */}
      <section className="bg-luxury-cream py-24" id="contact">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row gap-12 bg-white rounded-3xl shadow-2xl overflow-hidden border border-white/50">
             <div className="lg:w-1/3 gold-gradient p-12 text-white flex flex-col justify-between">
                <div>
                  <h2 className="text-4xl font-serif mb-6">Speak with our specialists today.</h2>
                  <p className="opacity-90 mb-8 font-light">Whether you're looking to buy, sell, or rent, our team is here to guide you through every step of your real estate journey in Dubai.</p>
                </div>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 flex items-center justify-center rounded-full bg-white/20"><Phone className="h-5 w-5" /></div>
                    <div>
                      <p className="text-xs uppercase font-bold tracking-widest opacity-70">Enquiry Hotline</p>
                      <p className="font-bold">+971 4 321 0000</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 flex items-center justify-center rounded-full bg-white/20"><Mail className="h-5 w-5" /></div>
                    <div>
                      <p className="text-xs uppercase font-bold tracking-widest opacity-70">Email Address</p>
                      <p className="font-bold">info@braavos.ae</p>
                    </div>
                  </div>
                </div>
             </div>
             <div className="lg:w-2/3 p-12">
                <form className="grid sm:grid-cols-2 gap-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500">First Name</label>
                    <input type="text" className="w-full border-b border-gray-200 py-2 focus:border-luxury-gold outline-none transition-colors" placeholder="John" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Last Name</label>
                    <input type="text" className="w-full border-b border-gray-200 py-2 focus:border-luxury-gold outline-none transition-colors" placeholder="Doe" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Email Address</label>
                    <input type="email" className="w-full border-b border-gray-200 py-2 focus:border-luxury-gold outline-none transition-colors" placeholder="john@example.com" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Phone Number</label>
                    <input type="tel" className="w-full border-b border-gray-200 py-2 focus:border-luxury-gold outline-none transition-colors" placeholder="+971 00 000 0000" />
                  </div>
                  <div className="sm:col-span-2 space-y-1">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500">How can we help you?</label>
                    <textarea rows={4} className="w-full border border-gray-200 p-4 rounded-xl focus:border-luxury-gold outline-none transition-colors resize-none" placeholder="Tell us more about your property requirements..."></textarea>
                  </div>
                  <div className="sm:col-span-2">
                    <button 
                      type="submit"
                      className="gold-gradient w-full py-5 rounded-xl text-white font-bold uppercase tracking-[0.2em] shadow-lg hover:shadow-2xl transition-all hover:scale-[1.01] active:scale-[0.99]"
                    >
                      Submit Enquiry
                    </button>
                  </div>
                </form>
             </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-luxury-navy text-white pt-24 pb-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
           <div className="grid lg:grid-cols-4 gap-12 mb-16">
              <div className="lg:col-span-1">
                <Logo className="h-8 mb-8" light />
                <p className="text-sm text-gray-400 leading-relaxed mb-8 font-light">Dubai's premier boutique real estate agency specializing in ultra-luxury properties across the most prestigious developments in the city.</p>
                <div className="flex gap-6">
                  <Instagram className="h-5 w-5 text-luxury-gold cursor-pointer hover:scale-110 transition-all hover:text-white" />
                  <Facebook className="h-5 w-5 text-luxury-gold cursor-pointer hover:scale-110 transition-all hover:text-white" />
                  <Linkedin className="h-5 w-5 text-luxury-gold cursor-pointer hover:scale-110 transition-all hover:text-white" />
                </div>
              </div>
              <div>
                <h4 className="font-serif text-xl mb-6 text-luxury-gold">Browse</h4>
                <ul className="space-y-4 text-sm text-gray-400 font-medium">
                  <li><a href="#" className="hover:text-white transition-colors">Residential For Sale</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Residential For Rent</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">New Developments</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Commercial Real Estate</a></li>
                </ul>
              </div>
              <div>
                 <h4 className="font-serif text-xl mb-6 text-luxury-gold">Company</h4>
                 <ul className="space-y-4 text-sm text-gray-400 font-medium">
                   <li><a href="#about" className="hover:text-white transition-colors">About Braavos</a></li>
                   <li><a href="#agents" className="hover:text-white transition-colors">Our Specialists</a></li>
                   <li><a href="#services" className="hover:text-white transition-colors">Latest News</a></li>
                   <li><a href="#contact" className="hover:text-white transition-colors">Careers</a></li>
                 </ul>
              </div>
              <div>
                 <h4 className="font-serif text-xl mb-6 text-luxury-gold">Head Office</h4>
                 <p className="text-sm text-gray-400 mb-4">Level 42, Marina Tower,<br />Dubai Marina, Dubai, UAE</p>
                 <p className="text-sm text-gray-400">ORN: 1234<br />BRN: 5678</p>
              </div>
           </div>
           <div className="border-t border-white/10 pt-12 flex flex-col sm:flex-row justify-between items-center gap-6">
              <p className="text-xs text-gray-500">© 2024 Braavos Real Estate. All rights reserved.</p>
              <div className="flex gap-8 text-xs text-gray-500 uppercase font-bold tracking-widest">
                <a href="#">Privacy Policy</a>
                <a href="#">Terms of Service</a>
                <a href="#">Complaints</a>
              </div>
           </div>
        </div>
      </footer>
    </div>
  );
}
