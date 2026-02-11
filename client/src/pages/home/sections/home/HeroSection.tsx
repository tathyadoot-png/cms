import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { PiFlowerLotusThin } from "react-icons/pi";
import hi from "@/locales/hi";
import en from "@/locales/en";

// Images
import slid1 from "@/assets/slid1.jpeg"
import slid2 from "@/assets/slid2.jpeg"
import slid3 from "@/assets/slid3.jpeg"
import slid4 from "@/assets/slid4.jpeg"
import slid5 from "@/assets/slid5.jpeg"
import slid6 from "@/assets/slid6.jpeg"
import slid7 from "@/assets/slid7.jpeg"
import img4 from "@/assets/4.jpg";
import img5 from "@/assets/bjp.png";


export type Lang = "hi" | "en";

interface HeroSectionProps {
  lang?: Lang;
}

const HeroSection = ({ lang = "hi" }: HeroSectionProps) => {
  const t = lang === "hi" ? hi : en;
  const isHi = lang === "hi";

  const containerRef = useRef<HTMLDivElement | null>(null);
  const images = [slid2, slid1, slid3, slid4, slid5, slid6, slid7];
  const [currentIndex, setCurrentIndex] = useState(0);
useEffect(() => {
  const interval = setInterval(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, 3000); // 4.5 seconds

  return () => clearInterval(interval);
}, [images.length]);

  // GSAP same hi rahega... (tl code)

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center bg-bg pt-28 pb-16 lg:pt-32 lg:pb-20 overflow-hidden"
    >
      {/* Background Decor */}
      <div className="absolute inset-0 -z-10 pointer-events-none opacity-30">
        <div className="absolute top-[5%] left-[-5%] w-[400px] lg:w-[600px] h-[400px] lg:h-[600px] bg-primary/10 blur-[120px] lg:blur-[150px] rounded-full" />
        <div className="absolute bottom-0 right-[-5%] w-[350px] lg:w-[500px] h-[350px] lg:h-[500px] bg-secondary/5 blur-[120px] lg:blur-[150px] rounded-full" />
      </div>

      {/* Main Grid: Mobile pe padding kam, Desktop pe wahi royal px-36 */}
      <div className="mx-auto w-full px-6 md:px-12 lg:px-36 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        
        {/* ================= LEFT CONTENT ================= */}
        {/* Mobile pe center text (optional), Desktop pe strictly LEFT aligned */}
        <div className="relative z-20 text-center lg:text-left order-2 lg:order-1">
          
          {/* Badge */}
          <div className="hero-badge mb-6 lg:mb-10">
            <div className="inline-flex items-center gap-3 rounded-full bg-primary/5 px-5 lg:px-6 py-2 lg:py-2.5 text-[10px] lg:text-[11px] font-black uppercase  text-green border border-primary/20 shadow-sm">
              {/* <PiFlowerLotusThin className="text-lg lg:text-xl animate-pulse" /> */}
              <img src={img5} className="h-8 w-8" alt="" />
              {isHi ? "जनसेवा का संकल्प" : "Commitment to People"}
            </div>
          </div>

          {/* NAME: Proper scaling for desktop matras */}
          <div className="relative mb-8 lg:mb-10 space-y-0 lg:space-y-2">
            <h1 className="hero-text font-gotu font-bold uppercase  text-primary leading-[1.1] text-[clamp(2.8rem,7vw,6rem)]">
              {isHi ? "राजेन्द्र" : "RAJENDRA"}
            </h1>
            <h1 className="hero-text font-gotu font-bold uppercase  text-secondary leading-[1.1] text-[clamp(2.8rem,7vw,6rem)]">
              {isHi ? "शुक्ल" : "SHUKLA"}
            </h1>
          </div>

 {/* DETAILS */}
<div className="hero-details space-y-6 lg:space-y-8">
  <div className="flex items-start justify-center lg:justify-start gap-4 lg:gap-6">
    {/* Decorative Line - desktop pe thodi badi */}
    <div className="h-[2px] w-8 lg:w-16 bg-primary rounded-full mt-3 lg:mt-4 flex-shrink-0" />
    
    <div className="space-y-1 lg:space-y-2">
      <p className="font-gotu text-xl lg:text-3xl font-bold text-secondary italic leading-tight">
        {isHi ? "उपमुख्यमंत्री" : "Deputy Chief Minister"}
      </p>
      <p className="font-gotu text-base lg:text-xl font-medium text-secondary/80">
        {isHi 
          ? "लोक स्वास्थ्य एवं चिकित्सा शिक्षा मंत्री, मध्य प्रदेश" 
          : "Minister for Public Health and Medical Education, MP"}
      </p>
    </div>
  </div>

  <p className="font-Poppins text-base lg:text-xl text-text-muted leading-relaxed max-w-lg mx-auto lg:mx-0">
    {isHi
      ? "स्वस्थ समाज, सशक्त प्रदेश और बेहतर भविष्य के लिए निरंतर कार्य और समर्पण।"
      : "Continuous dedication towards a healthy society and a prosperous state."}
  </p>
</div>

          {/* CTA BUTTONS: Mobile pe stack, Desktop pe row inline */}
          <div className="mt-10 lg:mt-14 flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center lg:justify-start hero-details">
            <a href="#contact" className="group relative overflow-hidden rounded-full bg-primary px-10 lg:px-12 py-4 lg:py-5 text-xs lg:text-sm font-black uppercase  text-white shadow-2xl shadow-primary/30 transition-transform hover:scale-105 active:scale-95 text-center">
              <span className="relative z-10">{t.cta.contact}</span>
              <div className="absolute inset-0 bg-secondary translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </a>
            
            <a href="#about" className="rounded-full border-2 border-green px-10 lg:px-12 py-4 lg:py-5 text-xs lg:text-sm font-black uppercase  text-green hover:bg-bg-soft transition-all duration-300 text-center">
              {isHi ? "परिचय" : "About"}
            </a>
          </div>
        </div>

        {/* ================= RIGHT CAROUSEL (Big Screen focus) ================= */}
        <div className="hero-image-container relative h-[450px] sm:h-[550px] lg:h-[700px] w-full flex items-center justify-center lg:justify-end order-1 lg:order-2">
          
          <div className="relative w-full h-full rounded-[3rem] lg:rounded-[4.5rem] overflow-hidden border-[10px] lg:border-[14px] border-white shadow-[0_50px_100px_rgba(0,0,0,0.12)] bg-bg-soft">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentIndex}
                src={images[currentIndex]}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full object-cover object-top"
                alt="Rajendra Shukla"
              />
            </AnimatePresence>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-secondary/70 via-transparent to-transparent pointer-events-none" />
            
            {/* Progress Dots */}
            <div className="absolute bottom-8 lg:bottom-12 left-1/2 -translate-x-1/2 flex gap-3 z-30">
              {images.map((_, idx) => (
                <div 
                  key={idx} 
                  className={`h-1 lg:h-1.5 transition-all duration-700 rounded-full ${currentIndex === idx ? "w-10 lg:w-14 bg-primary" : "w-2 lg:w-3 bg-white/40"}`} 
                />
              ))}
            </div>
          </div>

          {/* Floating Badge: Desktop pe Grand, Mobile pe chota and Adjusted */}
          <motion.div 
            className="floating-card absolute -top-4 -right-2 lg:-top-8 lg:-right-4 bg-white p-6 lg:p-10 rounded-2xl lg:rounded-[3rem] shadow-2xl z-40 border border-border text-center"
          >
            <p className="text-green font-gotu font-black text-3xl lg:text-5xl leading-none">20+</p>
            <p className="font-Poppins text-[8px] lg:text-[11px] font-black text-secondary/60 uppercase  mt-2 lg:mt-3">Years of Service</p>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;