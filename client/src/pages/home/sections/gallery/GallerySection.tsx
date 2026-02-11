import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useOutletContext } from "react-router-dom";
import type { Lang } from "@/layouts/MainLayout";
import SectionHeading from "@/components/ui/SectionHeading/SectionHeading";
import { X, ChevronLeft, ChevronRight, Layers, ArrowUpRight } from "lucide-react";
import { galleryCategories } from "@/data/galleryData";

const GallerySection = () => {
  const { lang } = useOutletContext<{ lang: Lang }>();
  const isHi = lang === "hi";

  const [activeCat, setActiveCat] = useState<typeof galleryCategories[0] | null>(null);
  const [imgIndex, setImgIndex] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (activeCat) {
      timer = setTimeout(() => handleNext(), 5000);
    }
    return () => clearTimeout(timer);
  }, [activeCat, imgIndex]);

  const handleNext = () => {
    if (activeCat) {
      if (imgIndex < activeCat.images.length - 1) {
        setImgIndex(prev => prev + 1);
      } else {
        closeGallery();
      }
    }
  };

  const handlePrev = () => {
    if (imgIndex > 0) setImgIndex(prev => prev - 1);
  };

  const closeGallery = () => {
    setActiveCat(null);
    setImgIndex(0);
  };

  return (
    <section id="gallery" className="relative py-24 bg-[#FAFAFA] overflow-hidden">
      {/* Soft Background Accents */}
      <div className="absolute top-0 left-0 w-full h-full opacity-40 pointer-events-none">
        <div className="absolute top-[-5%] right-[-2%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-[-5%] left-[-2%] w-[600px] h-[600px] bg-green/10 rounded-full blur-[140px]" />
      </div>

      {/* Main Container - Full Width logic */}
      <div className="mx-auto w-full  md:px-12 lg:px-7">
         <SectionHeading 
              subtitle={isHi ? "विजुअल आर्काइव" : "Visual Archive"} 
              title={isHi ? "जनसेवा की झलकियां" : "Moments of Service"} 
            />
        {/* Full Width Heading Section */}
     

        {/* MODERN BENTO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[700px] lg:px-40 px-6">
          {galleryCategories.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              onClick={() => { setActiveCat(cat); setImgIndex(0); }}
              className={`group relative overflow-hidden rounded-[2.5rem] cursor-pointer bg-white shadow-xl shadow-secondary/5 border border-white
                ${idx === 0 ? "md:col-span-7 md:row-span-2" : ""} 
                ${idx === 1 ? "md:col-span-5 md:row-span-1" : ""}
                ${idx === 2 ? "md:col-span-2 md:row-span-1" : ""}
                ${idx === 3 ? "md:col-span-3 md:row-span-1" : ""}
              `}
            >
              {/* Image with Parallax-like Effect */}
              <img 
                src={cat.thumbnail} 
                className="w-full h-full object-cover transition-transform duration-1000 ease-in-out group-hover:scale-110"
                alt={cat.titleEn}
              />
              
              {/* Overlay: Deep Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/10 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />

              {/* Content Box */}
              <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-end">
                <div className="flex items-end justify-between translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="max-w-[80%]">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-[10px] font-black uppercase  border border-primary/20">
                        {cat.images.length} {isHi ? "फोटोज" : "Photos"}
                      </span>
                    </div>
                    <h3 className="text-white text-2xl md:text-3xl font-bold leading-tight">
                      {isHi ? cat.titleHi : cat.titleEn}
                    </h3>
                  </div>
                  
                  {/* Icon Button */}
                  <div className="w-14 h-14 rounded-2xl bg-white text-secondary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-lg">
                    <ArrowUpRight size={24} strokeWidth={2.5} />
                  </div>
                </div>
              </div>

              {/* Glass Tag */}
              <div className="absolute top-8 left-8 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold uppercase  flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <Layers size={14} className="text-primary" />
                {isHi ? "गैलरी देखें" : "View Gallery"}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* STORY VIEWER OVERLAY */}
      <AnimatePresence>
        {activeCat && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] bg-black flex items-center justify-center p-0 md:p-10"
          >
            {/* Background Image (Blurred) */}
            <div className="absolute inset-0 opacity-40 blur-3xl scale-125 pointer-events-none">
                <img src={activeCat.images[imgIndex]} className="w-full h-full object-cover" alt="" />
            </div>

            {/* Header Area */}
            <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-black/80 to-transparent z-[10005] flex items-center justify-between px-6 md:px-16">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl border border-primary/50 overflow-hidden rotate-3">
                    <img src={activeCat.thumbnail} className="w-full h-full object-cover" alt="" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg md:text-xl ">{isHi ? activeCat.titleHi : activeCat.titleEn}</h3>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green rounded-full animate-pulse" />
                    <span className="text-white/40 text-[10px] md:text-xs uppercase  font-bold">{isHi ? "लाइव प्रीव्यू" : "Live Preview"}</span>
                  </div>
                </div>
              </div>
              
              <button 
                onClick={(e) => { e.stopPropagation(); closeGallery(); }} 
                className="w-14 h-14 bg-white/10 hover:bg-red-500 hover:rotate-90 rounded-2xl flex items-center justify-center text-white transition-all duration-300 backdrop-blur-xl border border-white/10 z-[10006]"
              >
                <X size={28} />
              </button>
            </div>

            {/* Main Image Container */}
            <div className="relative w-full h-full max-w-6xl flex items-center justify-center">
              {/* Progress Bars */}
              <div className="absolute top-28 inset-x-8 md:inset-x-20 flex gap-1.5 z-[10004]">
                {activeCat.images.map((_, i) => (
                  <div key={i} className="h-1 flex-1 bg-white/10 rounded-full overflow-hidden">
                    {i === imgIndex && (
                      <motion.div 
                        initial={{ width: "0%" }} animate={{ width: "100%" }}
                        transition={{ duration: 5, ease: "linear" }}
                        className="h-full bg-primary shadow-[0_0_15px_rgba(255,153,51,0.8)]"
                      />
                    )}
                    {i < imgIndex && <div className="h-full w-full bg-primary/60" />}
                  </div>
                ))}
              </div>

              {/* Click Zones */}
              <div className="absolute inset-0 z-[10003] flex">
                <div className="flex-1 cursor-w-resize" onClick={handlePrev} />
                <div className="flex-1 cursor-e-resize" onClick={handleNext} />
              </div>

              <AnimatePresence mode="wait">
                <motion.img 
                  key={imgIndex}
                  src={activeCat.images[imgIndex]}
                  initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                  transition={{ duration: 0.5 }}
                  className="max-w-[95%] max-h-[75vh] object-contain rounded-3xl z-[10002] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.7)]"
                />
              </AnimatePresence>

              {/* Navigation Arrows */}
              <button onClick={handlePrev} className="hidden xl:flex absolute left-[-100px] text-white/30 hover:text-primary transition-all z-[10004] hover:scale-125">
                <ChevronLeft size={70} strokeWidth={1} />
              </button>
              <button onClick={handleNext} className="hidden xl:flex absolute right-[-100px] text-white/30 hover:text-primary transition-all z-[10004] hover:scale-125">
                <ChevronRight size={70} strokeWidth={1} />
              </button>
            </div>

            {/* Premium Caption Card */}
            <div className="absolute bottom-10 inset-x-0 px-6 flex justify-center z-[10004]">
               <motion.div 
                 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                 className="px-8 py-5 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2rem] text-center max-w-2xl shadow-2xl"
               >
                  <p className="text-primary font-black text-[10px] uppercase  mb-2">
                    {isHi ? "चित्र विवरण" : "Image Details"} — {imgIndex + 1} / {activeCat.images.length}
                  </p>
                  <p className="text-white text-base md:text-xl font-medium leading-snug">
                    {isHi ? "स्वर्णिम रीवा: जनसेवा और विकास की एक अटूट यात्रा" : "Golden Rewa: An unbreakable journey of service and progress"}
                  </p>
               </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GallerySection;