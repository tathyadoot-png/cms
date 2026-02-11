import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { Globe, Menu, X, ArrowRight, Home, User, Map, Briefcase, Award, Star, Tv, BadgeCheck, PhoneCall } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import hi from "@/locales/hi";
import en from "@/locales/en";
import logo from "@/assets/13.jpg";

type Lang = "hi" | "en";

interface NavbarProps {
  lang: Lang;
  setLang: (l: Lang) => void;
}

const Navbar = ({ lang, setLang }: NavbarProps) => {
  const t = lang === "hi" ? hi : en;
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef(null);

  const navItems = [
    { label: t.nav.home, href: "#home", icon: <Home size={20} /> },
    { label: t.nav.about, href: "#about", icon: <User size={20} /> },
    { label: lang === "hi" ? "राजनीतिक यात्रा" : "Journey", href: "#journey", icon: <Map size={20} /> },
    { label: lang === "hi" ? "प्रमुख कार्य" : "Contributions", href: "#contributions", icon: <Briefcase size={20} /> },
    { label: t.nav.achievements, href: "#achievements", icon: <Award size={20} /> },
    { label: lang === "hi" ? "नेतृत्व" : "Leadership", href: "#leadership", icon: <Star size={20} /> },
    { label: t.nav.media, href: "#media", icon: <Tv size={20} /> },
  ];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".nav-reveal", 
        { y: -15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.05, ease: "power4.out" }
      );
    }, navRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav ref={navRef} className="fixed top-0 z-[100] w-full px-4 md:px-8 py-4 sm:py-6">
      <div 
        className={`mx-auto max-w-7xl flex items-center justify-between px-4 sm:px-6 py-2.5 transition-all duration-500 rounded-2xl border ${
          scrolled 
            ? "bg-white shadow-2xl border-border" 
            : "bg-white/90 backdrop-blur-xl border-white shadow-lg"
        }`}
      >
        {/* LOGO SECTION - Same as Desktop, minimal on mobile */}
        <div className="nav-reveal flex items-center gap-3 group cursor-pointer">
          <div className="h-10 w-10 sm:h-12 sm:w-12 shrink-0 overflow-hidden rounded-xl border-b-[3px] border-green shadow-md">
             <img src={logo} alt="Logo" className="h-full w-full object-cover" />
          </div>

          <div className="flex flex-col">
            <h1 className="font-gotu font-[1000] text-secondary text-[14px] sm:text-lg md:text-xl  uppercase leading-none">
              {lang === "hi" ? "राजेन्द्र शुक्ल" : "Rajendra Shukla"}
            </h1>
            <div className="flex items-center gap-1.5 mt-0.5 sm:mt-1">
               <span className=" xs:block text-[8px] md:text-[10px] font-medium text-primary uppercase">
                  {lang === "hi" ? "उपमुख्यमंत्री, मध्य प्रदेश शासन" : "Deputy CM Of MP Govt."}
               </span>
              
               <div className="h-[1px] w-4 bg-green/40 hidden sm:block" />
            </div>
          </div>
        </div>

        {/* DESKTOP NAV */}
        <nav className="hidden xl:flex items-center gap-8">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="nav-reveal group relative">
              <h1 className="text-[11px] font-[1000] uppercase  text-secondary/80 group-hover:text-green transition-colors cursor-pointer">
                {item.label}
              </h1>
              <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-green transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* DESKTOP ACTIONS - Hidden on Mobile */}
        <div className="nav-reveal flex items-center gap-4">
          <button
            onClick={() => setLang(lang === "hi" ? "en" : "hi")}
            className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-xl bg-bg-soft border border-border text-secondary  text-[10px] uppercase hover:bg-white hover:border-green transition-all"
          >
            <Globe size={14} className="text-green" />
            {lang === "hi" ? "EN" : "हिंदी"}
          </button>

          <a
            href="#contact"
            className="hidden sm:flex items-center gap-2 bg-primary px-6 py-3 rounded-xl text-[10px]  uppercase text-white shadow-lg hover:bg-secondary transition-all"
          >
            {t.cta.contact}
            <ArrowRight size={14} />
          </a>

          {/* MOBILE MENU TOGGLE */}
          <button 
            className="xl:hidden p-2.5 text-secondary bg-bg-soft rounded-xl border border-border active:scale-90 transition-all shadow-sm" 
            onClick={() => setIsOpen(true)}
          >
            <Menu size={22} />
          </button>
        </div>
      </div>

      {/* MOBILE MENU - All actions shifted here */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[110] bg-white lg:hidden flex flex-col p-6"
          >
            {/* Drawer Header */}
            <div className="flex justify-between items-center mb-8">
               <div className="flex items-center gap-3">
                  <img src={logo} className="h-10 w-10 object-cover rounded-lg border-b-2 border-green" />
                  <h1 className="text-secondary font-black text-lg uppercase ">Rajendra Shukla</h1>
               </div>
               <button onClick={() => setIsOpen(false)} className="p-3 bg-secondary text-white rounded-full shadow-lg">
                  <X size={24} />
               </button>
            </div>

            {/* Navigation Items */}
            <nav className="flex flex-col gap-3 overflow-y-auto mb-6 pr-2">
              {navItems.map((item, idx) => (
                <motion.a
                  key={item.href}
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-bg-soft border border-border group active:bg-green/5 transition-all"
                >
                  <div className="text-green">{item.icon}</div>
                  <h1 className="text-lg font-bold text-secondary uppercase ">{item.label}</h1>
                </motion.a>
              ))}
            </nav>

            {/* ACTION SECTION (Language & Contact shifted here) */}
            <div className="mt-auto flex flex-col gap-3 pt-6 border-t border-border">
               {/* Language Switcher */}
               <button 
                onClick={() => { setLang(lang === "hi" ? "en" : "hi"); setIsOpen(false); }}
                className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl bg-bg-soft border border-border text-secondary font-black uppercase text-xs  active:bg-white transition-all"
               >
                 <Globe size={18} className="text-green" />
                 {lang === "hi" ? "Switch to English" : "हिंदी में बदलें"}
               </button>

               {/* Mobile Contact Button */}
               <a 
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-3 w-full py-5 rounded-2xl bg-primary text-white font-black uppercase text-xs  shadow-xl shadow-primary/20"
               >
                 <PhoneCall size={18} />
                 {t.cta.contact}
               </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;