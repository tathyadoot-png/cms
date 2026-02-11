import { useEffect, useState, useMemo } from "react";
import { Outlet } from "react-router-dom";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import bjp from "@/assets/bjp.png";
import StickySocial from "@/components/layout/StickySocial";
import ScrollToTop from "@/components/layout/ScrollToTop";

export type Lang = "hi" | "en";

const MainLayout = () => {
  const [lang, setLang] = useState<Lang>(() => {
    if (typeof window === "undefined") return "hi";
    return localStorage.getItem("lang") === "en" ? "en" : "hi";
  });

  const [loading, setLoading] = useState(true);
  const isHi = lang === "hi";

  useEffect(() => {
    localStorage.setItem("lang", lang);
    const timer = setTimeout(() => setLoading(false), 3500);
    return () => clearTimeout(timer);
  }, [lang]);

  // FIX 1: Intl.Segmenter TypeScript Error solve karne ke liye 'any' cast kiya
  const splitText = (text: string) => {
    if (!text) return [];
    try {
      // @ts-ignore - Kuch environments mein Intl.Segmenter red line dikhayega
      const segmenter = new (Intl as any).Segmenter(isHi ? "hi" : "en", { granularity: "grapheme" });
      return Array.from(segmenter.segment(text)).map((s: any) => s.segment);
    } catch (e) {
      // Fallback agar browser Segmenter support na kare (purane browsers)
      return text.split("");
    }
  };

 const firstName = useMemo(() => splitText(isHi ? "राजेन्द्र" : "RAJENDRA"), [isHi]);
const lastName = useMemo(() => splitText(isHi ? "शुक्ल" : "SHUKLA"), [isHi]);

  // FIX 2: Variants ki error solve karne ke liye structure ko simple rakha
  const textContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.08, 
        delayChildren: 0.5 
      }
    }
  };

  const letterAnim: Variants = {
    hidden: { 
      opacity: 0, 
      y: 60, 
      rotateX: -90 
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      rotateX: 0,
      transition: { 
        duration: 1, 
        ease: [0.16, 1, 0.3, 1] 
      } 
    }
  };

  return (
    <>
      {/* Styles remains the same */}
      <style>{`
        .sovereign-loader { background: #08090a; perspective: 1200px; overflow: hidden; }
        .mesh-bg {
          position: absolute; inset: 0;
          background-image: 
            radial-gradient(at 0% 0%, rgba(255, 153, 51, 0.08) 0, transparent 50%), 
            radial-gradient(at 100% 100%, rgba(0, 128, 0, 0.08) 0, transparent 50%);
        }
        .scanline {
          width: 100%; height: 15vh; z-index: 5;
          background: linear-gradient(0deg, transparent 0%, rgba(255,153,51,0.03) 50%, transparent 100%);
          position: absolute; animation: scan 3s linear infinite;
        }
        @keyframes scan { 0% { transform: translateY(-100vh); } 100% { transform: translateY(100vh); } }
      `}</style>

      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            key="loader"
            className="fixed inset-0 z-[9999] sovereign-loader flex flex-col items-center justify-center px-4"
            exit={{ opacity: 0, filter: "blur(15px)", transition: { duration: 0.8 } }}
          >
            <div className="mesh-bg" />
            <div className="scanline" />

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} className="absolute top-10 sm:top-16">
              <img src={bjp} className="w-12 sm:w-16 grayscale" alt="BJP" />
            </motion.div>

          <motion.div 
  variants={textContainer}
  initial="hidden"
  animate="visible"
  className="z-10 text-center w-full"
>
  <div className="flex justify-center overflow-hidden mb-2">
    <h2 className={`flex text-white text-[14vw] sm:text-[10vw] md:text-[6vw] font-black italic ${isHi ? "-space-x-1 sm:-space-x-2" : "tracking-tighter"}`}>
      {firstName.map((l, i) => (
        <motion.span key={i} variants={letterAnim} className="inline-block">
          {l}
        </motion.span>
      ))}
    </h2>
  </div>

  <motion.div 
    initial={{ width: 0 }} 
    animate={{ width: "60%" }} 
    className="h-[1px] bg-gradient-to-r from-transparent via-orange-500/50 to-transparent mx-auto my-4 sm:my-6" 
  />

  <div className="flex justify-center overflow-hidden">
    {/* Yahan maine '-space-x' use kiya hai jo 'शु' aur 'क्ल' ko pas layega */}
    <h2 className={`flex text-orange-500/90 text-[11vw] sm:text-[8vw] md:text-[5vw] font-light uppercase ${isHi ? "-space-x-1 sm:-space-x-2" : "tracking-[0.3em]"}`}>
      {lastName.map((l, i) => (
        <motion.span key={i} variants={letterAnim} className="inline-block">
          {l}
        </motion.span>
      ))}
    </h2>
  </div>
</motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.4 }} className="absolute bottom-12 text-center">
              <p className="text-white text-[8px] sm:text-[10px]  uppercase mb-1">Rewa • Madhya Pradesh</p>
              <div className="h-[1px] w-8 bg-orange-500/40 mx-auto" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {!loading && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          <Navbar lang={lang} setLang={setLang} />
          <StickySocial /> 
          <ScrollToTop />
          <main className="min-h-screen bg-[#fcfcfc]">
            <Outlet context={{ lang }} />
          </main>
          <Footer lang={lang} />
        </motion.div>
      )}
    </>
  );
};

export default MainLayout;