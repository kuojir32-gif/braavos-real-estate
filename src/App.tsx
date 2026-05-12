import { motion, AnimatePresence } from "motion/react";
import { Search, MapPin, Home, Key, Phone, Mail, Instagram, Facebook, Linkedin, Menu, X, Star, ArrowRight, CheckCircle2, MessageSquare, Send, Globe, ShieldCheck, Zap, ChevronDown, Tag, TrendingUp, Play, ExternalLink, SlidersHorizontal, Wallet, Calendar, Waves, CloudRain, Dumbbell, Users, Binoculars, PersonStanding, Flame, Baby, Lock, Plus, Check } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
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
      { user: "Ahmed Yassin", rating: 5, text: "Excellent experience with Abdelrahman. He was very professional and helped me find a great deal on a golf course property." }
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
      { user: "David Miller", rating: 5, text: "Sarmad was incredibly helpful in finding my new home in JVC. His hospitality background really shows in his service." }
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
      { user: "Sara Khan", rating: 5, text: "Highly recommend Shahbaz for anyone looking into off-plan investments. Very knowledgeable about Silicon Oasis." }
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
      { user: "Jose Ssesimba", rating: 5, text: "Working with Bushii was a fantastic experience! She represented the seller while I represented the buyer, and her professionalism, knowledge, and responsiveness made the entire process smooth and stress free." }
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
      { user: "Marc Janssen", rating: 5, text: "Hakan has a great eye for design and detail. He made our property search very pleasant." }
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
      { user: "Elena Petrova", rating: 5, text: "Bilal is an expert in JVC. He helped us navigate the secondary market with ease." }
    ]
  },
  {
    id: 7,
    name: "AFAN SADIQ",
    role: "Property Consultant",
    image: "https://i.imgur.com/6J4tVPc.jpeg",
    specialty: "JVC Specialist",
    languages: "English, Urdu, Hindi",
    description: "Meet Afan Sadiq — a seasoned property consultant with over 4 years of experience, known for his honest advice and client-first approach. Fluent in English, Hindi, and Urdu, Afan blends integrity with deep market insight to make every real estate journey smooth and informed.",
    reviews: [
      { user: "Omar Hassan", rating: 5, text: "Afan is very honest and professional. I appreciated his no-pressure approach." }
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
      { user: "Roberto Luis Ortíz Cigala", rating: 5, text: "Hamza was the advisor who attended me, very good service and attention, always aware of your requirements and performs the whole procedure with you until the end." }
    ]
  },
  {
    id: 9,
    name: "QUNISH WARIS",
    role: "Luxury Property Consultant",
    image: "https://i.imgur.com/4ZalEaT.jpeg",
    specialty: "Jumeirah Lakes Towers (JLT)",
    languages: "English, Hindi, Urdu",
    description: "With a steadfast focus on property quality, Qunish prides himself on his detailed and extensive understanding of Jumeirah Lakes Towers (JLT). He is dedicated to ensuring the highest level of service, assisting clients in securing their dream homes within the shortest possible timeframe.",
    reviews: [
      { user: "Rahul Sharma", rating: 5, text: "Qunish helped me find a great apartment in JLT. He really knows the area well." }
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
      { user: "Sally Jaroudy", rating: 5, text: "Mr. Lahiru was extremely professional and kind enough to help me out despite my specific situation and difficult asks. Trustworthy and goes above and beyond to satisfy and assist the tenant." }
    ]
  },
  {
    id: 11,
    name: "ASIF MUHAMMAD",
    role: "Off-Market Director",
    image: "https://i.imgur.com/kNAFEYK.jpeg",
    specialty: "Bespoke Assets",
    languages: "English, Urdu, Arabic",
    modalImageClass: "object-[center_15%] !opacity-100",
    description: "With a deep passion for the Dubai real estate market, Asif is dedicated to assisting clients with their leasing, buying, and selling needs. He is committed to providing excellent customer service through hard work, active listening, and consistent follow-through.",
    reviews: [
      { user: "Ahmad Hilwane", rating: 5, text: "Thanks for Mr. Muhammad asif khan, he was professional and very supportive duding the transfer process. I bought my apparent through Mr. Khan and i do recommend dealing with him" }
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
      { user: "Nadya Egoshina", rating: 5, text: "I was fully enjoyed to have a deal with Braavos estate, especially with Asghar agent. Asghar is very competent and helpful for any issues resolution." }
    ]
  },
  {
    id: 13,
    name: "ABDUL REHMAN MUNIR",
    role: "Property Consultant",
    image: "https://files.catbox.moe/7kozlx.jpg",
    specialty: "Residential specialist",
    languages: "English, Arabic",
    modalImageClass: "object-[center_20%] !opacity-100",
    description: "Abdul Rehman is a dedicated Property Consultant who strives to exceed expectations while maintaining the highest level of integrity. With an emphasis on personalized service, expert guidance, and exceptional negotiation skills, he empowers his clients to navigate his real estate journeys with confidence. Diligent, transparent, and detail-oriented, Abdul Rehman is committed to achieving outstanding results for every client.",
    reviews: [
      { user: "Ahsan Khan", rating: 5, text: "It was lovely dealing with Bravoos Real Estate. Mr. Abdul helped me thoroughly in finding the new apartment based on my requirements. His professionalism, knowledge, honesty, integrity and hard work ethics are very much appreciated and respected." }
    ]
  }
];

const FAKE_PROPERTIES: any[] = [];

const FAKE_PROJECTS = [
  {
    id: 1,
    title: "RAW DISTRICT",
    location: "Sheikh Zayed Road",
    developer: "IMTIAZ",
    status: "Exclusive Launch",
    image: "https://i.ibb.co/kgfrRXmv/Screenshot-2026-05-11-172822.png",
    price: "From AED 649,000",
    completion: "Q1 2029",
    type: "Project",
    details: {
      tagline: "Iconic Urban Living | Prime Connectivity",
      highlights: [
        "Contemporary high-rise design with panoramic SZR skyline views",
        "Elegant residences, retail, and office spaces crafted for modern urban living",
        "Premium mixed-use development with luxury lifestyle amenities",
        "Landscaped leisure spaces blending sophistication and comfort",
        "Spacious apartments with expansive balconies and floor-to-ceiling windows"
      ],
      pricing: [
        { unit: "Studio", price: "AED 649,000", size: "From 380 sq.ft." },
        { unit: "1BR (Executive)", price: "AED 889,500", size: "From 610 sq.ft." },
        { unit: "1BR (Standard)", price: "AED 1,069,000", size: "From 720 sq.ft." },
        { unit: "2BR", price: "AED 1,489,000", size: "From 1,054 sq.ft." },
        { unit: "3BR", price: "AED 1,959,000", size: "From 1,400 sq.ft." },
        { unit: "Office", price: "AED 1,200,000", size: "From 700 sq.ft." },
        { unit: "Retail", price: "AED 2,500,000", size: "From 1,000 sq.ft." }
      ],
      paymentPlans: [
        { title: "50/50 Payment Plan", details: "50% During Construction | 50% On Completion – Q1 2029", icon: "Wallet" },
        { title: "60/40 Post-Handover", details: "60% During Construction | 40% Post-Handover Over 3 Years", icon: "Calendar" }
      ],
      strategicAdvantages: [
        "Prime Sheikh Zayed Road Location",
        "Direct Metro Station Connectivity",
        "Stunning SZR View Apartments",
        "Minutes from Downtown Dubai & DIFC",
        "Seamless Access to Dubai International Airport"
      ],
      amenities: [
        { name: "Resort Pool", icon: "Waves" },
        { name: "Sky Pool", icon: "CloudRain" },
        { name: "Branded Gym", icon: "Dumbbell" },
        { name: "Club House", icon: "Users" },
        { name: "Observation Deck", icon: "Binoculars" },
        { name: "Yoga Deck", icon: "PersonStanding" },
        { name: "BBQ Area", icon: "Flame" },
        { name: "Kids Play Area", icon: "Baby" }
      ],
      eoi: [
        { unit: "Studio", amount: "AED 50K" },
        { unit: "1BR", amount: "AED 80K" },
        { unit: "2BR / 3BR / Offices", amount: "AED 100K" }
      ]
    }
  },
  {
    id: 2,
    title: "Oxford Cave",
    location: "JVC",
    developer: "IMAN",
    status: "Exclusive Boutique",
    image: "https://i.ibb.co/qLs156Xg/Screenshot-2026-05-12-103148.png",
    price: "From AED 680,000",
    completion: "Q4 2028",
    type: "Project",
    details: {
      tagline: "Boutique Low-Rise Living | Launching May 13th",
      highlights: [
        "Only 5 Floors – Exclusive Boutique Low-Rise Living experience",
        "4% Launch Discount applied for priority pre-launch reservations",
        "Refined European-inspired interiors with high-end fixtures",
        "Intimate community feel with superior privacy and world-class amenites",
        "Strategically located oxford series project with high rental potential"
      ],
      pricing: [
        { unit: "Studio", price: "AED 680,000", size: "Premium Selection" },
        { unit: "1BR", price: "AED 1,110,000", size: "Executive Layouts" },
        { unit: "2BR", price: "AED 1,450,000", size: "Family Residences" },
        { unit: "2BR + Study", price: "AED 1,690,000", size: "Spacious Sanctuary" }
      ],
      paymentPlans: [
        { title: "40:60 Payment Plan", details: "40% During Construction | 60% On Handover", icon: "Wallet" }
      ],
      strategicAdvantages: [
        "Exclusive 5-Floor Boutique Design",
        "Prime Investment Node Location",
        "Priority Allocation for Early EOI",
        "7% Potential Commission Structure",
        "Oxford Heritage of Quality Builds"
      ],
      amenities: [
        { name: "Rooftop Pool", icon: "Waves" },
        { name: "Fitness Suite", icon: "Dumbbell" },
        { name: "Zen Gardens", icon: "PersonStanding" },
        { name: "Resident Lounge", icon: "Users" },
        { name: "Kids Zone", icon: "Baby" }
      ],
      eoi: [
        { unit: "Priority Booking", amount: "Contact for Details" }
      ]
    }
  },
  {
    id: 3,
    title: "Gianfranco Ferre Residences",
    location: "Al Marjan Island",
    developer: "Dar Global",
    status: "Fashion-Branded Luxury",
    image: "https://i.ibb.co/wZygFWt4/Screenshot-2026-05-12-162408.png",
    price: "From AED 1,600,000",
    completion: "Q1 2028",
    type: "Project",
    details: {
      tagline: "Fashion-Forward Coastal Living | Al Marjan, RAK",
      highlights: [
        "Fully Furnished & Fully Serviced boutique residences",
        "Impressive 3.3m Floor-to-Ceiling windows for maximum vista",
        "Stunning, unobstructed Arabian Sea & Horizon views",
        "Exclusive 3-Year Developer Home Warranty",
        "Iconic Gianfranco Ferre interior design and material palettes"
      ],
      pricing: [
        { unit: "Studios", price: "AED 1,600,000", size: "Boutique Luxury" },
        { unit: "1-Bedroom", price: "AED 2,400,000", size: "Executive Coastal" },
        { unit: "2-Bedroom", price: "AED 3,800,000", size: "Panoramic Suite" },
        { unit: "2-Bed Duplex", price: "AED 4,400,000", size: "Grand Sanctuary" },
        { unit: "3-Bed Duplex", price: "AED 7,300,000", size: "Palatial Skyline" },
        { unit: "4-Bed Duplex", price: "AED 14,400,000", size: "The Ultra-Penthouse" }
      ],
      paymentPlans: [
        { title: "45/5/50 Payment Strategy", details: "45% During Construction | 5% On Handover | 50% Post-Handover (3 Years)", icon: "Calendar" }
      ],
      strategicAdvantages: [
        "3-Years Post Handover Plan",
        "Fully Branded & Furnished",
        "Prime Location on Al Marjan",
        "Rapid Capital Appreciation",
        "World-Class Resort Services"
      ],
      amenities: [
        { name: "Infinity Beach Pool", icon: "Waves" },
        { name: "Designer Fitness Hub", icon: "Dumbbell" },
        { name: "Sea-View Lounge", icon: "Binoculars" },
        { name: "Concierge Butler", icon: "Users" },
        { name: "Valet Parking", icon: "ShieldCheck" }
      ],
      eoi: [
        { unit: "Standard Unit", amount: "AED 100K" },
        { unit: "Duplex Selection", amount: "AED 250K" }
      ]
    }
  }
];
const FAKE_REVIEWS = [
  { 
    name: "Ahmad Hilwane", 
    role: "", 
    text: "Thanks for Mr. Muhammad asif khan, he was professional and very supportive duding the transfer process. I bought my apparent through Mr. Khan and i do recommend dealing with him" 
  },
  { 
    name: "Nadya Egoshina", 
    role: "", 
    text: "I was fully enjoyed to have a deal with Braavos estate, especially with Asghar agent. The apartments were shown immediately and next day we were able to proceed with the contract. After all papers done the apartments stayed cleaned perfectly! Asghar is very competent and helpful for any issues resolution. My advice by heart for all the expats coming to Dubai!" 
  },
  { 
    name: "Ilias", 
    role: "", 
    text: "I had a great experience working with Asif Khan Mohammed for both renting a studio and selling one. As a real estate agent, he was highly professional, punctual, and always open to suggestions. What stood out the most was his resolute approach and perseverance in getting things done efficiently. His dedication and expertise made the entire process smooth and hassle-free. I would absolutely work with him again in the future, and I believe Braavos Real Estate is fortunate to have him on their team. Highly recommended!" 
  },
  { 
    name: "Jose Ssesimba", 
    role: "", 
    text: "Working with Bushii was a fantastic experience! She represented the seller while I represented the buyer, and her professionalism, knowledge, and responsiveness made the entire process smooth and stress free." 
  },
  { 
    name: "Rawan", 
    role: "", 
    text: "I had an amazing experience securing my studio apartment with Braavos Real Estate. From start to finish, Muhammed Asif was incredibly helpful, committed, and professional. His deep market knowledge, patience, and dedication made the entire process smooth and stress-free. He went above and beyond to ensure everything was handled seamlessly, and on top of that, he’s genuinely a great person to work with! I highly recommend Muhammed Asif and Braavos Real Estate to anyone looking for a reliable and trustworthy real estate partner. :)" 
  },
  { 
    name: "Tester Testmen",
    role: "",
    text: "Muhammad Asif Khan is a real trustful real estate agent that will help and guide you through the whole process! Thanks for helping out and successfully selling my property! Kind regards Youssef"
  },
  {
    name: "JLK Chicken Pastel",
    role: "",
    text: "I had an excellent experience working with Muhammad Asif Khan on my recent property transaction. He was professional, knowledgeable, and incredibly responsive throughout the entire process. He took the time to understand my needs and provided valuable insights that helped me make informed decisions. Whether it was scheduling viewings, negotiating terms, or handling paperwork, Muhammad Asif Khan made everything smooth and stress-free. He went above and beyond to ensure that I was satisfied with every aspect of the transaction."
  },
  {
    name: "Roberto Luis Ortíz Cigala",
    role: "",
    text: "It is a good agency to look for apartments, Hamza was the advisor who attended me, very good service and attention, always aware of your requirements and performs the whole procedure with you until the end. He advises you with details that if you are new you surely don't know. Overall good service."
  },
  {
    name: "Sally Jaroudy",
    role: "",
    text: "I am very satisfied with my experience with Braavos agency. Mr. Lahiru was extremely professional and kind enough to help me out despite my specific situation and difficult asks. He knew from first viewing exactly what I was looking for and did not waste my time with various other viewings. Very responsive always, which is an important quality for an agent, trustworthy and goes above and beyond to satisfy and assist the tenant."
  },
  {
    name: "Ivan Grebenyuk",
    role: "",
    text: "I would strongly recommend Braavos Real Estate. I worked with Asghar, and he was THE best agent I have ever worked with. He showed up on time to all of the viewings. I told Asghar what I was looking for, and within 1 day he sent me a perfect apartment - specifically what I was looking for. I signed the papers the next day. The process was very smooth and transparent."
  },
  {
    name: "Madiha Rubab",
    role: "",
    text: "We had a great experience with Braavos Real Estate, agent Asghar was a thorough professional, he listened to our needs and helped us find the perfect unit according to our needs.Highly recommended."
  },
  {
    name: "Millie Alyce",
    role: "",
    text: "I had a very smooth experience with Asghar. It was my first time renting in Dubai and he was very clearly on each step of the process making it as easy as possible for me. Very quick to respond and organised things very quickly. Overall great experience with this broker and company."
  },
  {
    name: "Karim",
    role: "",
    text: "Very pleased with the service. Thanks to brother Hamza Rishad he has gone above and beyond for me. Always responsive and fought really hard to get me the best deal. Highly recommend and will be sure to use again when needed"
  },
  {
    name: "Ahsan Khan",
    role: "",
    text: "It was lovely dealing with Bravoos Real Estate. Mr. Abdul helped me thoroughly in finding the new apartment based on my requirements. His professionalism, knowledge, honesty, integrity and hard work ethics are very much appreciated and respected. He knows how to make things done smoothly. Saved me from lots of hassle during my busy work schedules."
  },
  {
    name: "Kunal Bahl",
    role: "",
    text: "Asghar is one of the nicest people I have seen in this industry in Dubai. He is competent, helpful and very diligent with his work. He helped us in the renting process of an apartment we liked from step 1 and has provided consistent support throughout the entire process. I will strongly recommend his services."
  },
  {
    name: "Khalid Mahmud",
    role: "",
    text: "It has been a wonderful experience working with Hamza Shahbaz from Braavos Real Estate Dubai. We approached him by referring to one of the adds given for the apartment. We didn’t see the apartment and finalized it on à video viewing. This will be my fourth apartment in UAE but haven’t seen a true and dedicated professional like Hamza. Always available to answer my calls and messages."
  },
  {
    name: "Yulia Smirnova",
    role: "",
    text: "With my husband we had a fantastic experience working with Asghar from Braavos Real Estate Dubai. Yesterday, we finalized the deal for a wonderful apartment that we are thrilled to call our new home. Asghar's dedication, professionalism, and attentive nature made the entire process smooth and stress-free."
  },
  {
    name: "Joe Hawkins",
    role: "",
    text: "I had a great experience with this company having met Lahiru when I first moved to Dubai 6 months ago. And having only just secured a long term rental, I must of been a tough customer to deal with but Lahiru , never pressured me and was prompt and professional always going above and beyond to get me the right property on the right deal."
  }
];

const PropertyDetailModal = ({ property, isOpen, onClose, onEnquireSubmit, isSubmitting, formSubmitted }: any) => {
  if (!property || property.type === "Project") return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[320] flex items-center justify-center bg-black/90 backdrop-blur-md p-0 md:p-8"
          onClick={onClose}
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 30 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="bg-white w-full max-w-6xl h-full md:h-auto md:max-h-[92vh] md:rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 md:top-8 md:left-8 z-50 bg-black/20 hover:bg-luxury-gold md:bg-white/10 md:hover:bg-white/20 backdrop-blur-xl border border-white/20 p-3 rounded-2xl text-white transition-all transform hover:scale-105"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col md:flex-row min-h-0">
              {/* Left side: Property Details */}
              <div className="md:w-3/5 bg-gray-50 flex flex-col">
                <div className="relative min-h-[40vh] md:min-h-[450px] shrink-0 bg-luxury-navy flex items-center justify-center">
                  <img src={property.image} alt={property.title} className="max-w-full max-h-full object-contain" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                  
                  <div className="absolute bottom-8 left-8">
                    <div className="flex gap-3 mb-4">
                      <span className="bg-luxury-gold px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest text-white shadow-lg">Featured</span>
                      <span className="bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest text-luxury-navy shadow-lg">New Unit</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-white leading-tight drop-shadow-md">{property.title}</h2>
                  </div>
                </div>
                
                <div className="p-8 md:p-14">
                  <div className="flex flex-wrap items-center gap-6 mb-12 border-b border-gray-200/60 pb-10">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-2xl bg-luxury-gold/10 flex items-center justify-center text-luxury-gold">
                        <MapPin className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Location</p>
                        <p className="text-sm font-bold text-luxury-navy">{property.location}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-2xl bg-luxury-navy/5 flex items-center justify-center text-luxury-navy">
                        <Tag className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Price From</p>
                        <p className="text-sm font-bold text-luxury-gold">{property.price}</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 md:gap-6 mb-14">
                    <div className="text-center p-4 md:p-6 rounded-3xl bg-white border border-gray-100 shadow-sm">
                      <p className="text-xl md:text-2xl font-bold text-luxury-navy mb-1">{property.beds || "4"}</p>
                      <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Bedrooms</p>
                    </div>
                    <div className="text-center p-4 md:p-6 rounded-3xl bg-white border border-gray-100 shadow-sm">
                      <p className="text-xl md:text-2xl font-bold text-luxury-navy mb-1">{property.baths || "5"}</p>
                      <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Bathrooms</p>
                    </div>
                    <div className="text-center p-4 md:p-6 rounded-3xl bg-white border border-gray-100 shadow-sm">
                      <p className="text-xl md:text-2xl font-bold text-luxury-navy mb-1">{(property.size || 4500)/1000}k</p>
                      <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Sq. Ft</p>
                    </div>
                  </div>

                  <div className="mb-12">
                    <h3 className="text-xl font-serif font-bold text-luxury-navy mb-6">Property Overview</h3>
                    <p className="text-gray-600 leading-relaxed font-light text-base md:text-lg mb-8">
                      Discover unparalleled luxury in this masterfully crafted residence located in {property.location}. 
                      Every aspect of this property has been curated to provide a superior living experience, 
                      featuring premium finishes, expansive living spaces, and floor-to-ceiling windows that capture 
                      the essence of {property.location}'s dynamic energy.
                    </p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                      {['Floor-to-ceiling windows', 'Private elevator access', 'Bespoke Italian kitchen', 'Smart home automation', 'Private infinity pool', 'State-of-the-art security'].map(f => (
                        <div key={f} className="flex items-center gap-3 text-sm text-gray-700 font-medium group">
                          <div className="h-2 w-2 rounded-full bg-luxury-gold transform group-hover:scale-150 transition-transform" />
                          {f}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right side: Enquiry Form */}
              <div className="md:w-2/5 p-8 md:p-16 bg-white flex flex-col h-auto">
                <div className="mb-12 text-center md:text-left">
                  <p className="text-luxury-gold font-bold uppercase tracking-[0.4em] text-[8px] mb-4">Concierge Desk</p>
                  <h3 className="text-3xl md:text-4xl font-serif font-bold text-luxury-navy mb-4">Register Interest</h3>
                  <p className="text-gray-500 font-light text-base leading-relaxed">Our portfolio managers will provide a personalized presentation of this property.</p>
                </div>

                {formSubmitted ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="h-24 w-24 bg-green-50 rounded-full flex items-center justify-center mb-8 shadow-inner"
                    >
                      <CheckCircle2 className="h-12 w-12 text-green-500" />
                    </motion.div>
                    <h4 className="text-3xl font-serif font-bold text-luxury-navy mb-3">Enquiry Sent</h4>
                    <p className="text-gray-500 font-light mb-8 max-w-[250px]">A dedicated specialist will contact you shortly to coordinate further steps.</p>
                  </div>
                ) : (
                  <form className="space-y-6" onSubmit={onEnquireSubmit}>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 px-1">First Name</label>
                        <input required name="firstName" placeholder="First Name" className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4.5 text-sm font-medium focus:ring-2 focus:ring-luxury-gold/20 transition-all outline-none" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 px-1">Last Name</label>
                        <input required name="lastName" placeholder="Last Name" className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4.5 text-sm font-medium focus:ring-2 focus:ring-luxury-gold/20 transition-all outline-none" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 px-1">Email Address</label>
                      <input required type="email" name="email" placeholder="example@domain.com" className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4.5 text-sm font-medium focus:ring-2 focus:ring-luxury-gold/20 transition-all outline-none" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 px-1">Phone Number</label>
                      <input required type="tel" name="phone" placeholder="+971 00 000 0000" className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4.5 text-sm font-medium focus:ring-2 focus:ring-luxury-gold/20 transition-all outline-none" />
                    </div>
                    
                    <button 
                      disabled={isSubmitting}
                      className="w-full mt-6 bg-luxury-navy text-white py-5.5 rounded-3xl font-black uppercase tracking-[0.3em] text-[9px] transition-all hover:bg-black hover:shadow-2xl shadow-luxury-navy/10 disabled:bg-gray-300 flex items-center justify-center gap-4 group active:scale-[0.98]"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Securing Request...
                        </>
                      ) : (
                        <>
                          Confirm Request
                          <ArrowRight className="h-3 w-3 transform group-hover:translate-x-2 transition-transform" />
                        </>
                      )}
                    </button>
                    <div className="flex items-center justify-center gap-2 pt-10 opacity-40">
                      <ShieldCheck className="h-3 w-3" />
                      <p className="text-[8px] font-bold uppercase tracking-widest">End-to-End Encrypted Selection</p>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};


const ProjectDetailModal = ({ project, isOpen, onClose, onEnquireSubmit, isSubmitting, formSubmitted }: any) => {
  if (!project || project.type !== "Project") return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[330] flex items-center justify-center bg-luxury-navy/95 backdrop-blur-xl p-0 md:p-8"
          onClick={onClose}
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 50 }}
            className="bg-white w-full max-w-7xl h-full md:h-auto md:max-h-[92vh] md:rounded-[3rem] overflow-hidden flex flex-col md:flex-row shadow-[0_0_100px_rgba(0,0,0,0.5)] relative border-b md:border border-white/20"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 md:top-8 md:right-8 z-50 bg-luxury-navy text-white h-10 w-10 md:h-12 md:w-12 rounded-full flex items-center justify-center hover:bg-luxury-gold transition-colors shadow-xl"
            >
              <X className="h-5 w-5 md:h-6 md:w-6" />
            </button>

            {/* Main scrollable body for mobile, split for desktop */}
            <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col md:flex-row min-h-0">
              {/* Left Section: Immersive Content */}
              <div className="md:w-3/5 bg-white border-r border-gray-100/50">
                <div className="relative h-[45vh] md:h-[75vh] shrink-0 overflow-hidden bg-luxury-navy">
                  <img src={project.image} alt={project.title} className="w-full h-full object-contain" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                  <div className="absolute bottom-10 left-8 md:bottom-16 md:left-16 right-8 md:right-16">
                    <div className="flex items-center gap-2 mb-4 md:mb-6">
                      <span className="bg-luxury-gold text-white px-4 py-1.5 md:px-5 md:py-2 rounded-full text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] shadow-2xl">Exclusive Launch</span>
                      <span className="bg-white/20 backdrop-blur-md text-white border border-white/30 px-4 py-1.5 md:px-5 md:py-2 rounded-full text-[8px] md:text-[10px] font-bold uppercase tracking-[0.2em]">{project.developer}</span>
                    </div>
                    <h2 className="text-4xl md:text-7xl font-serif font-bold text-white mb-3 md:mb-5 tracking-tight leading-tight">{project.title}</h2>
                    <p className="text-base md:text-xl text-white/80 font-light flex items-center gap-2 italic"><MapPin className="h-4 w-4 md:h-5 md:w-5 text-luxury-gold" /> {project.location}</p>
                  </div>
                </div>

                <div className="p-8 md:p-20">
                  <div className="mb-16 md:mb-24">
                    <h3 className="text-luxury-gold font-black uppercase tracking-[0.5em] text-[9px] md:text-[10px] mb-6 md:mb-10">Architectural Vision</h3>
                    <p className="text-2xl md:text-4xl font-serif text-luxury-navy leading-tight mb-8 md:mb-12">{project.details.tagline}</p>
                    <div className="grid gap-5 md:gap-8">
                      {project.details.highlights.map((h: string, i: number) => (
                        <div key={i} className="flex items-start gap-4 group">
                          <div className="h-6 w-6 rounded-full bg-luxury-cream border border-luxury-gold/20 flex items-center justify-center shrink-0 mt-1">
                            <Check className="h-3 w-3 text-luxury-gold" />
                          </div>
                          <p className="text-gray-600 text-base md:text-lg group-hover:text-luxury-navy transition-colors">{h}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mb-16 md:mb-24">
                      <div className="flex items-center justify-between mb-8 md:mb-12">
                          <h3 className="text-luxury-gold font-black uppercase tracking-[0.5em] text-[9px] md:text-[10px]">Project Inventory</h3>
                          <div className="h-px flex-1 mx-6 bg-luxury-gold/10 hidden md:block" />
                          <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest bg-white px-2">Limited Availability</p>
                      </div>
                      <div className="grid gap-3 md:gap-5">
                          {project.details.pricing.map((p: any, i: number) => (
                             <div key={i} className="group p-5 md:p-8 rounded-[2rem] md:rounded-[2.5rem] bg-luxury-cream/20 hover:bg-white hover:shadow-2xl transition-all border border-transparent hover:border-luxury-gold/20 flex items-center justify-between">
                                <div className="space-y-1">
                                  <h4 className="text-lg md:text-2xl font-serif font-bold text-luxury-navy">{p.unit}</h4>
                                  <p className="text-[9px] md:text-[10px] uppercase tracking-widest text-gray-400 font-bold">{p.size}</p>
                                </div>
                                <div className="text-right">
                                  <p className="text-lg md:text-2xl font-serif font-bold text-luxury-gold mb-1">{p.price}</p>
                                  <div className="flex items-center justify-end gap-1.5">
                                    <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                                    <p className="text-[8px] md:text-[9px] uppercase tracking-widest text-green-500 font-black">Live Units</p>
                                  </div>
                                </div>
                             </div>
                          ))}
                      </div>
                  </div>

                  {project.details.strategicAdvantages && (
                    <div className="mb-16 md:mb-24">
                      <h3 className="text-luxury-gold font-black uppercase tracking-[0.5em] text-[9px] md:text-[10px] mb-8 md:mb-10">Investment Highlights</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                        {project.details.strategicAdvantages.map((adv: string, i: number) => (
                          <div key={i} className="p-6 rounded-3xl bg-gray-50 border border-gray-100 flex items-center gap-4 group hover:bg-white hover:shadow-xl transition-all">
                            <div className="h-10 w-10 shrink-0 rounded-2xl bg-luxury-gold/10 flex items-center justify-center text-luxury-gold group-hover:bg-luxury-gold group-hover:text-white transition-all">
                              <Zap className="h-5 w-5" />
                            </div>
                            <p className="text-sm font-bold text-luxury-navy uppercase tracking-wider leading-tight">{adv}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Payment Strategy and Lifestyle Amenities section removed per user request */}
                </div>
              </div>

              {/* Right Section: Reservations */}
              <div className="md:w-2/5 p-8 md:p-20 bg-luxury-cream h-auto flex flex-col">
                  <div className="mb-10 md:mb-16">
                      <div className="flex items-center gap-3 mb-6">
                        <TrendingUp className="h-5 w-5 text-luxury-gold" />
                        <p className="text-luxury-gold font-black uppercase tracking-[0.5em] text-[9px] md:text-[10px]">High Yield Investment</p>
                      </div>
                      <h3 className="text-3xl md:text-5xl font-serif font-bold text-luxury-navy mb-5 md:mb-8">Secure Your Priority Slot</h3>
                      <p className="text-gray-500 font-light leading-relaxed text-sm md:text-base">Submit your Expression of Interest to receive priority unit selection and pre-launch pricing advantages at RAW DISTRICT.</p>
                  </div>

                  <div className="grid gap-3 md:gap-4 mb-10 md:mb-16">
                      {project.details.eoi.map((e: any, i: number) => (
                          <div key={i} className="flex justify-between items-center p-5 md:p-6 bg-white rounded-2xl md:rounded-3xl border border-luxury-gold/10 shadow-sm hover:shadow-lg transition-shadow">
                              <span className="text-[10px] md:text-[11px] font-bold text-luxury-navy uppercase tracking-widest">{e.unit}</span>
                              <div className="flex items-center gap-3">
                                <span className="h-1.5 w-1.5 rounded-full bg-luxury-gold" />
                                <span className="text-base md:text-lg font-serif font-bold text-luxury-gold">{e.amount}</span>
                              </div>
                          </div>
                      ))}
                  </div>

                  {!formSubmitted ? (
                      <form className="space-y-4 md:space-y-6" onSubmit={onEnquireSubmit}>
                          <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-1.5">
                                  <label className="text-[8px] md:text-[9px] font-black uppercase tracking-widest text-gray-400 pl-2">First Name</label>
                                  <input required placeholder="Alexander" className="w-full bg-white border border-gray-100 rounded-2xl md:rounded-[1.5rem] px-5 py-4 md:px-6 md:py-4.5 text-sm font-medium focus:ring-2 focus:ring-luxury-gold/20 transition-all outline-none" />
                              </div>
                              <div className="space-y-1.5">
                                  <label className="text-[8px] md:text-[9px] font-black uppercase tracking-widest text-gray-400 pl-2">Last Name</label>
                                  <input required placeholder="Braavos" className="w-full bg-white border border-gray-100 rounded-2xl md:rounded-[1.5rem] px-5 py-4 md:px-6 md:py-4.5 text-sm font-medium focus:ring-2 focus:ring-luxury-gold/20 transition-all outline-none" />
                              </div>
                          </div>
                          <div className="space-y-1.5">
                              <label className="text-[8px] md:text-[9px] font-black uppercase tracking-widest text-gray-400 pl-2">Personal Email</label>
                              <input required type="email" placeholder="concierge@braavos.com" className="w-full bg-white border border-gray-100 rounded-2xl md:rounded-[1.5rem] px-5 py-4 md:px-6 md:py-4.5 text-sm font-medium focus:ring-2 focus:ring-luxury-gold/20 transition-all outline-none" />
                          </div>
                          <div className="space-y-1.5">
                              <label className="text-[8px] md:text-[9px] font-black uppercase tracking-widest text-gray-400 pl-2">Contact Number</label>
                              <input required type="tel" placeholder="+971 58 652 2515" className="w-full bg-white border border-gray-100 rounded-2xl md:rounded-[1.5rem] px-5 py-4 md:px-6 md:py-4.5 text-sm font-medium focus:ring-2 focus:ring-luxury-gold/20 transition-all outline-none" />
                          </div>

                          <button 
                              disabled={isSubmitting}
                              className="w-full py-5 md:py-6 gold-gradient rounded-[2rem] text-white font-black uppercase tracking-[0.4em] text-[9px] md:text-[10px] shadow-[0_20px_40px_rgba(212,175,55,0.2)] hover:shadow-[0_25px_50px_rgba(212,175,55,0.3)] transition-all flex items-center justify-center gap-4 group active:scale-95 mt-6"
                          >
                              {isSubmitting ? (
                                  <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                              ) : (
                                  <>
                                      Secure Reservation
                                      <ArrowRight className="h-4 w-4 group-hover:translate-x-2 transition-transform" />
                                  </>
                              )}
                          </button>

                          <div className="flex items-center justify-center gap-2 pt-8 opacity-30">
                              <ShieldCheck className="h-3 w-3" />
                              <span className="text-[7px] md:text-[8px] font-bold uppercase tracking-[0.3em]">Institutional Grade Security</span>
                          </div>
                      </form>
                  ) : (
                      <div className="py-20 text-center">
                          <motion.div 
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="h-20 w-20 bg-luxury-gold/10 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner"
                          >
                              <Check className="h-10 w-10 text-luxury-gold" />
                          </motion.div>
                          <h4 className="text-2xl md:text-3xl font-serif font-bold text-luxury-navy mb-4">Registration Received</h4>
                          <p className="text-gray-500 font-light italic text-sm md:text-base">An executive portfolio manager will contact you momentarily for a private presentation.</p>
                      </div>
                  )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const FeaturedProperty = ({ image, price, title, location, beds, baths, size, onEnquire, onOpenDetail }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ y: -10 }}
    className="group relative overflow-hidden rounded-xl bg-white shadow-xl dark:bg-slate-900 flex flex-col h-full cursor-pointer"
    id={`property-${title.replace(/\s+/g, '-').toLowerCase()}`}
    onClick={() => onOpenDetail({ image, price, title, location, beds, baths, size })}
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
    <div className="p-6 flex-1 flex flex-col">
      <div className="mb-2 text-2xl font-serif font-bold text-luxury-gold">{price}</div>
      <h3 className="mb-1 text-lg font-bold group-hover:text-luxury-gold transition-colors">{title}</h3>
      <div className="mb-4 flex items-center text-sm text-gray-500">
        <MapPin className="mr-1 h-4 w-4" />
        {location}
      </div>
      <div className="flex items-center justify-between border-t border-gray-100 pt-4 text-xs font-medium text-gray-600 uppercase tracking-wider mb-6">
        <span className="flex items-center"><Home className="mr-1 h-4 w-4" /> {beds} Beds</span>
        <span className="flex items-center"><Key className="mr-1 h-4 w-4" /> {baths} Baths</span>
        <span>{size} sq ft</span>
      </div>
      
      <button 
        onClick={(e) => {
          e.stopPropagation();
          onOpenDetail({ image, price, title, location, beds, baths, size });
        }}
        className="mt-auto w-full py-4 rounded-xl border border-luxury-gold/50 text-luxury-gold font-bold uppercase tracking-widest text-[10px] hover:bg-luxury-gold hover:text-white transition-all shadow-sm active:scale-95 flex items-center justify-center gap-2"
      >
        Enquire Now <ArrowRight className="h-3 w-3" />
      </button>
    </div>
  </motion.div>
);

interface LogoProps {
  className?: string;
  light?: boolean;
}

const Logo = ({ className = "h-12", light }: LogoProps) => {
  const [useImage, setUseImage] = useState(true);

  return (
    <div className={`flex items-center gap-3 ${className} group cursor-pointer`}>
      <div className="relative h-[125%] aspect-square flex-shrink-0 transition-transform duration-500 group-hover:scale-110">
        {useImage ? (
           <img 
            src="https://i.imgur.com/CX2Jtea.png" 
            alt="Braavos Logo" 
            className={`h-full w-full object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)] ${light ? 'brightness-0 invert' : ''}`} 
            onError={() => setUseImage(false)}
           />
        ) : (
          <div className={`h-full w-full rounded-xl border border-luxury-gold/20 flex items-center justify-center ${light ? 'bg-white/10' : 'bg-black'}`}>
            <span className="text-luxury-gold font-serif text-xl italic">B</span>
          </div>
        )}
      </div>
      <div className="flex flex-col justify-center gap-0.5">
        <span className={`text-[1.5em] sm:text-[1.7em] font-serif font-black tracking-[0.25em] leading-none drop-shadow-sm ${light ? 'text-white' : 'gold-text-gradient'}`}>
          BRAAVOS
        </span>
        <span className={`text-[0.35em] sm:text-[0.45em] font-black tracking-[0.7em] uppercase opacity-60 leading-none ${light ? 'text-white/60' : 'gold-text-gradient'} italic`}>
          Real Estate
        </span>
      </div>
    </div>
  );
};

const Navbar = ({ onContactClick, onSaleClick, onProjectsClick, onLogoClick, onBrokersClick }: { 
  onContactClick: () => void;
  onSaleClick: () => void;
  onProjectsClick: () => void;
  onLogoClick: () => void;
  onBrokersClick: () => void;
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
    { name: "Projects", action: onProjectsClick },
    { name: "Services", link: "#services" },
    { name: "About", link: "#about" },
    { name: "Brokers", action: onBrokersClick }
  ];

  const handleLogoClick = () => {
    onLogoClick();
    setIsMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 z-50 w-full transition-all duration-300 ${isScrolled ? "bg-white/90 py-3 shadow-xl backdrop-blur-md" : "bg-transparent py-6"}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-12">
        <div className="cursor-pointer" onClick={handleLogoClick}>
          <Logo className="h-10" light={!isScrolled} />
        </div>
        
        <div className="hidden items-center gap-12 text-[15px] font-serif font-medium tracking-wider lg:flex">
          {navItems.map((item) => (
            item.action ? (
              <button 
                key={item.name} 
                onClick={item.action}
                className={`transition-all hover:text-luxury-gold cursor-pointer relative after:content-[''] after:absolute after:bottom-[-6px] after:left-0 after:w-0 after:h-[1px] after:bg-luxury-gold after:transition-all hover:after:w-full ${isScrolled ? "text-luxury-navy" : "text-white"}`}
              >
                {item.name}
              </button>
            ) : (
              <a 
                key={item.name} 
                href={item.link} 
                className={`transition-all hover:text-luxury-gold relative after:content-[''] after:absolute after:bottom-[-6px] after:left-0 after:w-0 after:h-[1px] after:bg-luxury-gold after:transition-all hover:after:w-full ${isScrolled ? "text-luxury-navy" : "text-white"}`}
              >
                {item.name}
              </a>
            )
          ))}
          <button 
            onClick={onContactClick}
            className="gold-gradient rounded-full px-8 py-2.5 text-white shadow-lg transition-all hover:scale-105 active:scale-95 hover:shadow-luxury-gold/20 font-serif"
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
                    className="text-left text-xl font-serif font-medium text-luxury-navy flex justify-between items-center"
                  >
                    {item.name} <ArrowRight className="h-4 w-4 text-luxury-gold" />
                  </button>
                ) : (
                  <a 
                    key={item.name} 
                    href={item.link} 
                    onClick={() => setIsMenuOpen(false)}
                    className="text-xl font-serif font-medium text-luxury-navy flex justify-between items-center"
                  >
                    {item.name} <ArrowRight className="h-4 w-4 text-luxury-gold" />
                  </a>
                )
              ))}
              <button 
                onClick={() => { onContactClick(); setIsMenuOpen(false); }}
                className="gold-gradient w-full py-5 rounded-xl text-white font-serif font-medium text-lg mt-4 shadow-xl"
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
      <div className="fixed inset-0 z-[300] flex items-center justify-center p-6">
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
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-luxury-cream border border-luxury-gold/10 hover:border-luxury-gold transition-colors group">
              <div className="h-10 w-10 flex items-center justify-center rounded-full bg-white text-luxury-gold shadow-lg group-hover:scale-110 transition-transform">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">Call Our Office</p>
                <p className="text-base font-bold text-luxury-navy">
                  <a href="tel:+971586522515" className="hover:text-luxury-gold transition-colors">+971 58 652 2515</a>
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-luxury-cream border border-luxury-gold/10 hover:border-luxury-gold transition-colors group">
              <div className="h-10 w-10 flex items-center justify-center rounded-full bg-white text-luxury-gold shadow-lg group-hover:scale-110 transition-transform">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">Email Us</p>
                <p className="text-sm font-bold text-luxury-navy">
                  <a href="mailto:braavosrealestate@gmail.com" className="hover:text-luxury-gold transition-colors break-all">braavosrealestate@gmail.com</a>
                </p>
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
      <div className="fixed inset-0 z-[310] flex items-center justify-center p-6">
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
            <div className="md:w-1/3 bg-luxury-navy flex items-center justify-center relative overflow-hidden group">
              <img 
                src={agent.image} 
                alt={agent.name} 
                className={`h-full w-full object-cover opacity-90 transition-transform duration-1000 group-hover:scale-105 ${agent.modalImageClass || ""}`} 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-luxury-navy/60 via-transparent to-transparent p-8 flex flex-col justify-end pointer-events-none">
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
                <p className="text-xs font-serif font-medium text-luxury-gold mb-3">About Agent</p>
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

              <div className="pt-8 border-t border-gray-100 flex flex-col gap-4">
                <button 
                  onClick={() => {
                    onClose();
                    const contactForm = document.getElementById('contact');
                    contactForm?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full py-4 gold-gradient text-white rounded-xl font-bold uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 shadow-lg hover:shadow-luxury-gold/20 transition-all active:scale-95"
                >
                  <Mail className="h-4 w-4" /> Send Enquiry
                </button>
              </div>
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
        beds: p.beds
      }));

      const model = "gemini-3-flash-preview";
      const systemInstruction = `You are a luxury real estate concierge for Braavos Real Estate in Dubai. 
      Your goal is to help customers find properties for sale or upcoming off-plan projects based on their demands.
      You have access to the following properties for sale: ${JSON.stringify(propertyData)}.
      You also have access to off-plan projects: ${JSON.stringify(FAKE_PROJECTS)}.
      
      If a user asks to speak to a real person, a broker, or needs human assistance, you MUST provide our contact details:
      - Phone: +971 58 652 2515
      - Email: braavosrealestate@gmail.com
      
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
            className="absolute bottom-16 right-0 w-[320px] max-w-[calc(100vw-2rem)] overflow-hidden rounded-2xl bg-white shadow-2xl border border-gray-100 flex flex-col"
          >
            <div className="bg-luxury-navy p-5 text-white flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Logo className="h-6" />
                <div />
              </div>
              <button onClick={() => setIsOpen(false)}><X className="h-5 w-5 opacity-60 hover:opacity-100" /></button>
            </div>
            <div ref={scrollRef} className="h-[360px] overflow-y-auto p-4 space-y-4 bg-gray-50 scrollbar-hide">
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

const PropertyExplorer = ({ isOpen, onClose, mode, onLogoClick, onEnquire, onOpenDetail }: { isOpen: boolean; onClose: () => void, mode: "sale" | "projects", onLogoClick: () => void, onEnquire: (p: any) => void, onOpenDetail: (p: any) => void }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
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
        if (activeFilters.priceRange !== "All" && mode === "sale") {
          const priceStr = p.price.replace("AED ", "").replace("M", "");
          const priceVal = parseFloat(priceStr);
          if (activeFilters.priceRange === "Under 10M") priceMatch = priceVal < 10;
          if (activeFilters.priceRange === "10M - 25M") priceMatch = priceVal >= 10 && priceVal <= 25;
          if (activeFilters.priceRange === "Over 25M") priceMatch = priceVal > 25;
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
          <div className="border-b border-gray-100 px-8 py-3 flex items-center justify-between bg-white shadow-sm z-30">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="flex items-center gap-2 px-6 py-2.5 bg-luxury-navy text-white rounded-full text-[11px] font-black uppercase tracking-[0.2em] hover:bg-luxury-gold transition-all shadow-lg active:scale-95"
              >
                <SlidersHorizontal className={`h-3 w-3 transition-transform duration-500 ${isSidebarOpen ? "rotate-90" : ""}`} />
                {isSidebarOpen ? "Close Filters" : "Filter"}
              </button>
              <div className="h-6 w-[1px] bg-gray-200 mx-2 hidden sm:block"></div>
              <div className="cursor-pointer hidden sm:block" onClick={onLogoClick}>
                <Logo className="h-7" />
              </div>
            </div>
            <div className="text-center">
                <h3 className="text-lg font-serif font-medium text-luxury-navy capitalize tracking-tight leading-none mb-1">{mode} Portfolio</h3>
                <p className="text-[9px] text-luxury-gold font-bold uppercase tracking-[0.3em]">{filteredItems.length} Results</p>
            </div>
            <button 
              onClick={onClose}
              className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-luxury-gold transition-colors"
            >
              Exit Explorer <X className="h-4 w-4 group-hover:rotate-90 transition-transform" />
            </button>
          </div>

          <div className="flex-1 flex overflow-hidden relative">
            {/* Sidebar Filters */}
            <motion.aside 
              initial={false}
              animate={{ 
                width: isSidebarOpen ? 280 : 0,
                opacity: isSidebarOpen ? 1 : 0,
                x: isSidebarOpen ? 0 : -280
              }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="border-r border-gray-100 overflow-y-auto bg-luxury-cream z-10"
            >
              <div className="p-6 w-[280px]">
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-luxury-gold mb-6 italic opacity-60">Selection Curation</h4>
                
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-serif font-medium text-luxury-navy/40 uppercase tracking-[0.2em] flex items-center gap-2 mb-1"><MapPin className="h-3 w-3 text-luxury-gold" /> Location</label>
                    <div className="flex flex-col gap-0.5">
                      {["All", "Palm Jumeirah", "Downtown Dubai", "Dubai Hills", "Emirates Hills", "Business Bay", "Dubai Marina", "JVC", "Al Marjan Island"].map(loc => (
                        <button 
                          key={loc}
                          onClick={() => setActiveFilters({...activeFilters, location: loc})}
                          className={`text-left text-[11px] font-serif py-1.5 px-3 rounded-md transition-all ${activeFilters.location === loc ? "bg-white text-luxury-navy shadow-sm ring-1 ring-luxury-navy/5 font-bold" : "text-gray-400 hover:text-luxury-navy"}`}
                        >
                          {loc}
                        </button>
                      ))}
                    </div>
                  </div>

                  {mode !== "projects" ? (
                    <>
                      <div className="space-y-2">
                        <label className="text-[10px] font-serif font-medium text-luxury-navy/40 uppercase tracking-[0.2em] flex items-center gap-2 mb-1"><Home className="h-3 w-3 text-luxury-gold" /> Type</label>
                        <div className="flex flex-col gap-0.5">
                          {["All", "Villa", "Penthouse", "Estate", "Suite"].map(type => (
                            <button 
                              key={type}
                              onClick={() => setActiveFilters({...activeFilters, type: type})}
                              className={`text-left text-[11px] font-serif py-1.5 px-3 rounded-md transition-all ${activeFilters.type === type ? "bg-white text-luxury-navy shadow-sm ring-1 ring-luxury-navy/5 font-bold" : "text-gray-400 hover:text-luxury-navy"}`}
                            >
                              {type}
                            </button>
                          ))}
                        </div>
                      </div>

                    <div className="space-y-3">
                        <label className="text-[10px] font-serif font-medium text-luxury-navy/40 uppercase tracking-[0.2em] flex items-center gap-2 mb-1"><Star className="h-3 w-3 text-luxury-gold" /> Range</label>
                        <div className="flex flex-col gap-0.5">
                          {["All", "Under 10M", "10M - 25M", "Over 25M"].map(range => (
                            <button 
                              key={range}
                              onClick={() => setActiveFilters({...activeFilters, priceRange: range})}
                              className={`text-left text-[11px] font-serif py-1.5 px-3 rounded-md transition-all ${activeFilters.priceRange === range ? "bg-white text-luxury-navy shadow-sm ring-1 ring-luxury-navy/5 font-bold" : "text-gray-400 hover:text-luxury-navy"}`}
                            >
                              {range}
                            </button>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="space-y-2">
                      <label className="text-[10px] font-serif font-medium text-luxury-navy/40 uppercase tracking-[0.2em] flex items-center gap-2 mb-1"><CheckCircle2 className="h-3 w-3 text-luxury-gold" /> Developer</label>
                      <div className="flex flex-col gap-0.5">
                        {["All", "DAMAC", "SOBHA", "EMAAR", "NAKHEEL", "MERAAS", "IMTIAZ", "IMAN", "Dar Global"].map(dev => (
                          <button 
                            key={dev}
                            onClick={() => setActiveFilters({...activeFilters, developer: dev})}
                            className={`text-left text-[11px] font-serif py-1.5 px-3 rounded-md transition-all ${activeFilters.developer === dev ? "bg-white text-luxury-navy shadow-sm ring-1 ring-luxury-navy/5 font-bold" : "text-gray-400 hover:text-luxury-navy"}`}
                          >
                            {dev}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <button 
                    onClick={() => setActiveFilters({location: "All", type: "All", priceRange: "All", developer: "All"})}
                    className="w-full py-3 text-[9px] font-black uppercase tracking-[0.3em] text-red-300 hover:text-red-500 transition-colors border-t border-gray-100 mt-4"
                  >
                    Clear All
                  </button>
                </div>
              </div>
            </motion.aside>

            {/* Float Toggle for Mobile or When Hidden */}
            {!isSidebarOpen && (
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={() => setIsSidebarOpen(true)}
                className="absolute left-6 bottom-8 z-20 md:hidden bg-luxury-navy text-white p-4 rounded-full shadow-2xl"
              >
                <SlidersHorizontal className="h-6 w-6" />
              </motion.button>
            )}

            {/* Grid Content */}
            <main className="flex-1 p-8 overflow-y-auto bg-white relative">
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
                          onClick={() => onOpenDetail({ ...item })}
                          className="group overflow-hidden rounded-2xl bg-white shadow-lg border border-gray-100 flex flex-col cursor-pointer"
                        >
                          <div className="aspect-[16/10] overflow-hidden relative">
                            <img src={item.image} alt={item.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-t from-luxury-navy/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold text-luxury-navy uppercase tracking-widest shadow-lg">
                              {item.status}
                            </div>
                            <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                               <p className="text-[10px] font-bold uppercase tracking-widest text-luxury-gold mb-1">Architecture by {item.developer}</p>
                               <div className="text-xs font-bold flex items-center gap-1 hover:underline">
                                 View Details <ArrowRight className="h-3 w-3" />
                               </div>
                            </div>
                          </div>
                          <div className="p-6 flex-1 flex flex-col justify-between">
                            <div>
                              <div className="flex justify-between items-start mb-2">
                                <h3 className="text-xl font-serif font-bold text-luxury-navy">{item.title}</h3>
                                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                              </div>
                              <p className="text-sm text-gray-500 flex items-center gap-1 mb-2"><MapPin className="h-3 w-3 text-luxury-gold" /> {item.location}</p>
                              <p className="text-lg font-serif font-bold text-luxury-gold mb-4">{item.price}</p>
                            </div>
                            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
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
                          onEnquire={onEnquire}
                          onOpenDetail={onOpenDetail}
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
  const [showMobileBrokers, setShowMobileBrokers] = useState(false);
  const [explorerMode, setExplorerMode] = useState<"sale" | "projects" | null>(null);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchPurpose, setSearchPurpose] = useState<"buy" | "off-plan">("buy");
  const [selectedAgent, setSelectedAgent] = useState<any>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<any>(null);

  const handleBrokersClick = () => {
    if (window.innerWidth < 1024) {
      setShowMobileBrokers(true);
    } else {
      const el = document.getElementById('agents');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleLogoReset = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setExplorerMode(null);
    setShowContactModal(false);
    setSelectedProperty(null);
  };

  const handleEnquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    
    try {
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, selectedProperty })
      });
      
      const result = await response.json();
      
      if (result.success) {
        setFormSubmitted(true);
        // We keep selectedProperty set so the modal stays open and shows formSubmitted state
        // Auto-reset after 10 seconds
        setTimeout(() => {
          setFormSubmitted(false);
          setSelectedProperty(null);
        }, 10000);
      } else {
        console.error("Enquiry failed:", result.error);
        alert("There was an issue sending your request. Please try again or contact us directly.");
      }
    } catch (error) {
      console.error("Network error:", error);
      alert("Connection error. Please check your internet and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
        onProjectsClick={() => setExplorerMode("projects")}
        onLogoClick={handleLogoReset}
        onBrokersClick={handleBrokersClick}
      />
      <ContactModal isOpen={showContactModal} onClose={() => setShowContactModal(false)} />
      
      {/* Mobile Brokers View (Diffrent Tab experience) */}
      <AnimatePresence>
        {showMobileBrokers && (
          <motion.div 
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-0 z-[200] bg-white overflow-y-auto px-6 py-24"
          >
            <div className="flex justify-between items-center mb-12">
              <div>
                <p className="text-luxury-gold font-black uppercase tracking-[0.4em] text-[10px] mb-2">Our Professionals</p>
                <h2 className="text-4xl font-serif font-bold text-luxury-navy">Brokers</h2>
              </div>
              <button 
                onClick={() => setShowMobileBrokers(false)}
                className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center text-luxury-navy"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
               {FAKE_AGENTS.map((agent) => (
                 <div 
                   key={agent.id} 
                   className="flex flex-col gap-2"
                   onClick={() => {
                     setSelectedAgent(agent);
                     // Keep mobile brokers open so when they close agent profile they are still in "Brokers tab"
                   }}
                 >
                    <div className="aspect-[4/5] rounded-xl overflow-hidden bg-gray-50 border border-gray-100">
                       <img src={agent.image} alt={agent.name} className="w-full h-full object-cover" />
                    </div>
                    <p className="text-[10px] font-bold text-luxury-navy leading-tight">{agent.name}</p>
                    <p className="text-[8px] uppercase tracking-widest text-luxury-gold">{agent.specialty}</p>
                 </div>
               ))}
            </div>
            
            <div className="mt-12 p-8 bg-luxury-cream rounded-3xl text-center">
              <p className="text-sm text-gray-500 mb-4 italic">Need immediate assistance?</p>
              <button 
                onClick={() => { setShowMobileBrokers(false); setShowContactModal(true); }}
                className="w-full py-4 gold-gradient rounded-xl text-white font-serif font-bold"
              >
                Speak with Management
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <PropertyExplorer 
        mode={explorerMode || "sale"} 
        isOpen={!!explorerMode} 
        onClose={() => setExplorerMode(null)} 
        onLogoClick={handleLogoReset}
        onEnquire={(p) => {
          setSelectedProperty(p);
          // When enquiring from explorer, we might want to open the detail modal right away
        }}
        onOpenDetail={setSelectedProperty}
      />
      <PropertyDetailModal 
        property={selectedProperty}
        isOpen={!!selectedProperty && selectedProperty.type !== "Project"}
        onClose={() => setSelectedProperty(null)}
        onEnquireSubmit={handleEnquirySubmit}
        isSubmitting={isSubmitting}
        formSubmitted={formSubmitted}
      />
      <ProjectDetailModal 
        project={selectedProperty}
        isOpen={!!selectedProperty && selectedProperty.type === "Project"}
        onClose={() => setSelectedProperty(null)}
        onEnquireSubmit={handleEnquirySubmit}
        isSubmitting={isSubmitting}
        formSubmitted={formSubmitted}
      />
      <AgentProfileModal 
        agent={selectedAgent} 
        isOpen={!!selectedAgent} 
        onClose={() => setSelectedAgent(null)} 
      />
      <Chatbot />
      
      {/* Hero Section */}
      <section className="relative h-[110vh] sm:h-[95vh] w-full overflow-hidden bg-luxury-navy flex items-center pt-24 sm:pt-0" id="hero">
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
            <p className="text-luxury-gold font-bold uppercase tracking-[0.4em] text-xs mb-6">Established 2020</p>
            <h1 className="mb-8 font-serif text-6xl font-medium sm:text-8xl lg:text-9xl leading-none">
              Your Vision.<br />
              <span className="italic text-luxury-gold">Our Expertise.</span>
            </h1>
            <p className="text-lg font-light text-white/60 max-w-xl mb-12 leading-relaxed">
              Experience the pinnacle of Dubai real estate.
            </p>
          </motion.div>
          
          <motion.div 
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 0.2 }}
             className="w-full max-w-5xl"
          >
            {/* Purpose Tabs */}
            <div className="flex gap-1 mb-0 relative z-30 px-2 lg:px-0">
              {[
                { id: "buy", label: "Sale" },
                { id: "off-plan", label: "Projects" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSearchPurpose(tab.id as any)}
                  className={`px-8 py-3.5 rounded-t-2xl text-[14px] font-serif font-bold tracking-wider transition-all duration-300 min-w-[110px] ${
                    searchPurpose === tab.id 
                    ? "bg-white text-luxury-navy shadow-[0_-10px_50px_rgba(0,0,0,0.3)] scale-100 opacity-100" 
                    : "bg-white/20 text-white hover:bg-white/30 backdrop-blur-xl border border-white/20 opacity-90"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Main Search Container */}
            <div className="bg-white shadow-2xl flex flex-col items-center rounded-2xl rounded-tl-none p-1 sm:flex-row relative z-20 border border-luxury-gold/20 w-full mx-auto">
              <div className="flex-[2] w-full px-6 py-4 sm:border-r border-gray-100 group flex items-center gap-3">
                <Search className="text-luxury-navy h-5 w-5 stroke-[2.5px] opacity-90 group-focus-within:opacity-100 transition-opacity" />
                <div className="flex flex-col w-full">
                  <span className="text-[10px] font-sans font-black uppercase tracking-[0.1em] text-black mb-0.5">Location</span>
                  <input 
                    type="text" 
                    placeholder="District, Project or Keyword" 
                    className="w-full bg-transparent text-luxury-navy placeholder-luxury-navy/60 outline-none font-serif font-bold tracking-wide text-[15px]"
                  />
                </div>
              </div>
              <button 
                onClick={() => setExplorerMode(searchPurpose === "off-plan" ? "projects" : "sale")}
                className="gold-gradient w-full rounded-xl px-14 py-4 font-serif font-medium tracking-wider text-[15px] text-white sm:w-auto transition-all hover:scale-[1.02] active:scale-95 shadow-2xl hover:shadow-luxury-gold/30"
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
              { icon: ShieldCheck, title: "Investment Strategy", desc: "Bespoke advice on maximizing returns through high-yield Dubai assets." },
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
        <div className="mt-24 border-y border-gray-100 py-8 bg-white overflow-hidden flex items-center max-w-5xl mx-auto">
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

      {/* Market Intelligence Section */}
      <section className="py-24 bg-luxury-navy text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-500/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
        <div className="mx-auto max-w-7xl px-6 lg:px-12 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <p className="text-luxury-gold font-black uppercase tracking-[0.4em] text-xs mb-6">Market Intelligence</p>
              <h2 className="text-4xl sm:text-5xl font-serif font-medium leading-tight mb-8">
                In the Current <br /><span className="italic text-luxury-gold">Global Dynamics,</span>
              </h2>
              <p className="text-xl text-gray-300 font-light leading-relaxed mb-10">
                Mastering the 2026 landscape to provide exclusive foresight into the future of the UAE's most prestigious real estate markets.
              </p>
              <div className="flex flex-col sm:flex-row gap-6">
                <a 
                  href="https://www.instagram.com/braavos_dubai?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-white text-luxury-navy rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-luxury-gold hover:text-white transition-all group shadow-xl"
                >
                  <Instagram className="h-4 w-4" /> Instagram Account
                </a>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full border border-white/20 flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-luxury-gold" />
                  </div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] leading-relaxed text-luxury-gold">Market Updates <br />& Insights</p>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-video rounded-3xl overflow-hidden shadow-2xl border border-white/10 group relative">
                <img 
                  src="https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=1200" 
                  alt="Dubai Real Estate Trends" 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="h-20 w-20 rounded-full border-2 border-white flex items-center justify-center backdrop-blur-sm">
                    <Play className="h-8 w-8 text-white fill-white" />
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 left-0 sm:-left-4 bg-luxury-gold p-6 rounded-2xl shadow-2xl max-w-[240px]">
                <p className="text-white font-serif text-2xl italic leading-none">Market Expert</p>
                <div className="h-px w-full bg-white/20 my-4" />
                <p className="text-white font-black uppercase tracking-[0.3em] text-[9px]">Mr. Qaiser Shahzad Bajwa</p>
                <p className="text-white/70 text-[8px] uppercase tracking-widest mt-2">CEO & Founder, Braavos Real Estate</p>
              </div>
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
                  src="https://i.imgur.com/mvDTm2K.png" 
                  alt="Braavos Real Estate" 
                  className="h-full w-full object-cover transition-transform duration-1000 hover:scale-105"
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
              <div 
                key={specialty} 
                onClick={() => specialty === "Off-Plan Projects" && setExplorerMode("projects")}
                className={`p-6 bg-white border border-gray-100 rounded-2xl flex items-center gap-4 shadow-sm group hover:border-luxury-gold transition-all ${specialty === "Off-Plan Projects" ? "cursor-pointer" : ""}`}
              >
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
      <section className="py-32 bg-white hidden lg:block" id="agents">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div className="max-w-2xl">
                  <p className="text-luxury-gold font-black uppercase tracking-[0.4em] text-xs mb-4">MEET THE EXPERTS</p>
              <h2 className="text-5xl font-serif font-medium leading-tight">Mastering the Art of <br /><span className="italic">Dubai Real Estate.</span></h2>
            </div>
            <p className="text-gray-400 font-light max-w-sm leading-relaxed">
              By leveraging elite market intelligence and exclusive industry networks, our brokers provide unparalleled access to off-market opportunities and bespoke investment strategies.
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
                <div className="aspect-[4/5] overflow-hidden rounded-2xl mb-4 relative bg-gray-50 flex items-center justify-center border border-gray-100/50 shadow-inner group-hover:border-luxury-gold/30 transition-colors">
                  <img 
                    src={agent.image} 
                    alt={agent.name} 
                    className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-luxury-navy/90 via-luxury-navy/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6 translate-y-4 group-hover:translate-y-0">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-luxury-gold mb-1">{agent.specialty}</p>
                    <p className="text-[9px] text-white/70 uppercase tracking-[0.3em] leading-tight font-medium">{agent.languages}</p>
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
                  onEnquire={setSelectedProperty}
                  onOpenDetail={setSelectedProperty}
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
                   <p className="text-gray-600 text-sm leading-relaxed">Built on a foundation of elite industry expertise, Braavos ensures transparent dealing and lifelong relationships with our global clientele.</p>
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
                        {review.role && <p className="text-[10px] text-luxury-gold font-bold uppercase tracking-widest">{review.role}</p>}
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
                  <p className="opacity-90 mb-8 font-light">Whether you're looking to buy, sell, or invest, our team is here to guide you through every step of your real estate journey in Dubai.</p>
                </div>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 flex items-center justify-center rounded-full bg-white/20"><Phone className="h-5 w-5" /></div>
                    <div>
                      <p className="text-xs uppercase font-bold tracking-widest opacity-70">Enquiry Hotline</p>
                      <p className="font-bold">
                        <a href="tel:+971586522515" className="hover:text-luxury-gold transition-colors">+971 58 652 2515</a>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 flex items-center justify-center rounded-full bg-white/20"><Mail className="h-5 w-5" /></div>
                    <div>
                      <p className="text-xs uppercase font-bold tracking-widest opacity-70">Email Address</p>
                      <p className="font-bold">
                        <a href="mailto:braavosrealestate@gmail.com" className="hover:text-luxury-gold transition-colors">braavosrealestate@gmail.com</a>
                      </p>
                    </div>
                  </div>
                </div>
             </div>
             <div className="lg:w-2/3 p-12">
                {formSubmitted ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="h-full flex flex-col items-center justify-center text-center p-12 bg-luxury-cream/30 rounded-2xl"
                  >
                    <div className="h-20 w-20 rounded-full bg-luxury-gold text-white flex items-center justify-center mb-6 shadow-xl">
                      <CheckCircle2 className="h-10 w-10" />
                    </div>
                    <h3 className="text-3xl font-serif text-luxury-navy mb-4">Request Sent</h3>
                    <p className="text-gray-500 max-w-sm">Thank you for your interest. One of our property specialists will contact you shortly.</p>
                    <button 
                      onClick={() => setFormSubmitted(false)}
                      className="mt-8 text-xs font-bold uppercase tracking-widest text-luxury-gold hover:underline"
                    >
                      Send another request
                    </button>
                  </motion.div>
                ) : (
                  <form className="grid sm:grid-cols-2 gap-6" onSubmit={handleEnquirySubmit}>
                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-500">First Name</label>
                      <input type="text" name="firstName" required className="w-full border-b border-gray-200 py-2 focus:border-luxury-gold outline-none transition-colors" placeholder="John" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Last Name</label>
                      <input type="text" name="lastName" required className="w-full border-b border-gray-200 py-2 focus:border-luxury-gold outline-none transition-colors" placeholder="Doe" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Email Address</label>
                      <input type="email" name="email" required className="w-full border-b border-gray-200 py-2 focus:border-luxury-gold outline-none transition-colors" placeholder="john@example.com" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Phone Number</label>
                      <input type="tel" name="phone" required className="w-full border-b border-gray-200 py-2 focus:border-luxury-gold outline-none transition-colors" placeholder="+971 00 000 0000" />
                    </div>
                    <div className="sm:col-span-2 space-y-1">
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-500">How can we help you?</label>
                      <textarea name="message" rows={4} required className="w-full border border-gray-200 p-4 rounded-xl focus:border-luxury-gold outline-none transition-colors resize-none" placeholder="Tell us more about your property requirements..."></textarea>
                    </div>
                    <div className="sm:col-span-2">
                      <button 
                         type="submit"
                         disabled={isSubmitting}
                         className={`gold-gradient w-full py-5 rounded-xl text-white font-bold uppercase tracking-[0.2em] shadow-lg hover:shadow-2xl transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-3 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                       >
                         {isSubmitting ? (
                           <>
                             <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                             Sending...
                           </>
                         ) : (
                           "Submit Enquiry"
                         )}
                       </button>
                    </div>
                  </form>
                )}
             </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-luxury-navy text-white pt-24 pb-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
           <div className="grid lg:grid-cols-4 gap-12 mb-16">
              <div className="lg:col-span-1">
                <div className="cursor-pointer inline-block" onClick={handleLogoReset}>
                  <Logo className="h-12 mb-8" light />
                </div>
                <p className="text-sm text-gray-400 leading-relaxed mb-8 font-light">Dubai's premier boutique real estate agency specializing in ultra-luxury properties across the most prestigious developments in the city.</p>
                <div className="flex gap-6">
                  <a href="https://www.instagram.com/braavos_dubai?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer">
                    <Instagram className="h-5 w-5 text-luxury-gold cursor-pointer hover:scale-110 transition-all hover:text-white" />
                  </a>
                  <Linkedin className="h-5 w-5 text-luxury-gold cursor-pointer hover:scale-110 transition-all hover:text-white" />
                </div>
              </div>
              <div>
                <h4 className="font-serif text-xl mb-6 text-luxury-gold">Browse</h4>
                <ul className="space-y-4 text-sm text-gray-400 font-medium">
                  <li><a href="#" className="hover:text-white transition-colors">Residential For Sale</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Market Analysis</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">New Developments</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Commercial Real Estate</a></li>
                </ul>
              </div>
              <div>
                 <h4 className="font-serif text-xl mb-6 text-luxury-gold">Company</h4>
                 <ul className="space-y-4 text-sm text-gray-400 font-medium">
                   <li><a href="#about" className="hover:text-white transition-colors">About Braavos</a></li>
                   <li><a href="#agents" className="hover:text-white transition-colors">Brokers</a></li>
                   <li><a href="#services" className="hover:text-white transition-colors">Latest News</a></li>
                   <li><a href="#contact" className="hover:text-white transition-colors">Careers</a></li>
                 </ul>
              </div>
              <div>
                 <h4 className="font-serif text-xl mb-6 text-luxury-gold">Head Office</h4>
                 <p className="text-sm text-gray-400 mb-4">1201B Building A,<br />Prime Business Centre, JVC,<br />Dubai, UAE</p>
                 <p className="text-sm text-gray-400">ORN: 23772</p>
              </div>
           </div>
           <div className="border-t border-white/10 pt-12 flex flex-col sm:flex-row justify-between items-center gap-6">
              <p className="text-xs text-gray-500 font-serif">© 2024 Braavos Real Estate. All rights reserved.</p>
              <div className="flex gap-8 text-xs text-gray-500 font-serif font-medium tracking-wide">
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-white transition-colors">Complaints</a>
              </div>
           </div>
        </div>
      </footer>
    </div>
  );
}
