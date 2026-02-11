import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause, Headphones, ChevronRight, Waves, X, MonitorPlay } from 'lucide-react'
import SectionHeading from "@/components/ui/SectionHeading/SectionHeading"
import vdo1 from "@/assets/vdo1.mp4"
import audio1 from "@/assets/audio.mp3"
import img14 from "@/assets/14.jpg"

type Lang = "hi" | "en";

interface AudioVideoSectionProps {
  lang: Lang;
}

const AudioVideoSection = ({ lang }: AudioVideoSectionProps) => {
  const isHi = lang === "hi";
  const [activeAudio, setActiveAudio] = useState<number | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const videoList = [
    { 
      id: 1, 
      title: isHi ? "रीवा का बढ़ता गौरव: हवाई अड्डे का शिलान्यास" : "Rewa's Rising Pride: Airport Foundation",
      thumbnail: img14,
      url: vdo1,
      tag: isHi ? "मुख्य" : "Featured"
    },
    { 
      id: 2, 
      title: isHi ? "विकास कार्यों की समीक्षा" : "Review of Development Projects",
      thumbnail: img14,
      url: vdo1,
      tag: isHi ? "अपडेट" : "Updates"
    },
    { 
      id: 3, 
      title: isHi ? "जन संवाद: सीधी बात" : "Public Dialogue: Direct Talk",
      thumbnail: img14,
      url: vdo1,
      tag: isHi ? "लाइव" : "Live"
    }
  ];

  return (
    <section className="py-12 md:py-24 bg-[#F8F9FB] relative overflow-hidden">
      <SectionHeading 
        title={isHi ? "मीडिया हब" : "Media Hub"} 
        subtitle={isHi ? "डिजिटल गैलरी" : "Digital Gallery"} 
      />

      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-28 mt-8 md:mt-12">
        <div className="flex flex-col lg:flex-row gap-8 md:gap-12">
          
          {/* LEFT: VIDEO BROADCAST */}
          <div className="w-full lg:w-2/3 space-y-6 md:space-y-8">
            <div className="flex items-center gap-3 px-2 md:px-0">
              <div className="h-6 md:h-8 w-1 bg-[#E46B2E] rounded-full" />
              <h3 className="font-[Gotu] text-lg md:text-xl font-black text-[#112250] uppercase  flex items-center gap-2">
                <MonitorPlay size={18} className="md:w-5 md:h-5" /> {isHi ? "वीडियो प्रसारण" : "Video Broadcast"}
              </h3>
            </div>

            {/* Main Featured Video Card */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="relative rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden bg-white shadow-lg md:shadow-xl group cursor-pointer"
              onClick={() => setSelectedVideo(videoList[0].url)}
            >
              <div className="aspect-video relative">
                <img src={videoList[0].thumbnail} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Main" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#112250]/90 via-[#112250]/20 to-transparent" />
                
                {/* Play Button - Responsive Size */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                   <div className="relative">
                      <div className="absolute inset-0 bg-[#E46B2E] rounded-full animate-ping opacity-25" />
                      <div className="h-14 w-14 md:h-20 md:w-20 bg-[#E46B2E] text-white rounded-full flex items-center justify-center shadow-2xl relative z-10">
                        <Play fill="white" size={24} className="ml-1 md:hidden" />
                        <Play fill="white" size={28} className="ml-1 hidden md:block" />
                      </div>
                   </div>
                </div>

                <div className="absolute bottom-4 left-4 right-4 md:bottom-10 md:left-10 md:right-10">
                  <span className="bg-[#159172] px-3 py-1 md:px-4 md:py-1.5 rounded-full text-[9px] md:text-[10px] font-black text-white uppercase  mb-2 md:mb-4 inline-block shadow-lg">
                    {videoList[0].tag}
                  </span>
                  <h4 className="text-white text-lg md:text-4xl font-[Gotu] font-black leading-tight drop-shadow-md">
                    {videoList[0].title}
                  </h4>
                </div>
              </div>
            </motion.div>

            {/* Thumbnail Grid - Stacked on mobile, 2 cols on tablet/desktop */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
               {videoList.slice(1).map((vdo) => (
                 <div 
                   key={vdo.id} 
                   onClick={() => setSelectedVideo(vdo.url)}
                   className="flex items-center gap-4 p-3 md:p-4 bg-white rounded-2xl md:rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-all cursor-pointer group"
                 >
                    <div className="w-24 h-20 md:w-36 md:h-24 rounded-xl md:rounded-2xl overflow-hidden shrink-0 relative">
                       <img src={vdo.thumbnail} className="w-full h-full object-cover group-hover:scale-110 transition-all" alt="thumb" />
                       <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                          <Play size={14} fill="white" className="text-white" />
                       </div>
                    </div>
                    <div className="flex flex-col justify-center overflow-hidden">
                       <h5 className="font-[Gotu] py-2 font-bold text-[#112250] text-xs md:text-sm leading-snug line-clamp-2">
                         {vdo.title}
                       </h5>
                       <span className="text-[8px] md:text-[9px] text-[#E46B2E] font-black uppercase  mt-1 md:mt-2">Play Video</span>
                    </div>
                 </div>
               ))}
            </div>
          </div>

          {/* RIGHT: AUDIO ARCHIVE */}
          <div className="w-full lg:w-1/3 space-y-6 md:space-y-8">
            <div className="flex items-center gap-3 px-2 md:px-0">
              <div className="h-6 md:h-8 w-1 bg-[#159172] rounded-full" />
              <h3 className="font-[Gotu] text-lg md:text-xl font-black text-[#112250] uppercase  flex items-center gap-2">
                <Headphones size={18} className="md:w-5 md:h-5" /> {isHi ? "ऑडियो संदेश" : "Audio Messages"}
              </h3>
            </div>

            <div className="bg-white rounded-[1.5rem] md:rounded-[2.5rem] p-4 md:p-6 shadow-xl border border-gray-100">
               <div className="space-y-3">
                  {[1, 2, 3, 4].map((audio, idx) => (
                    <div 
                      key={idx} 
                      onClick={() => setActiveAudio(activeAudio === idx ? null : idx)}
                      className={`p-4 md:p-5 rounded-xl md:rounded-[1.5rem] transition-all duration-300 cursor-pointer border ${activeAudio === idx ? 'bg-[#112250] border-[#112250] shadow-lg shadow-blue-900/20' : 'bg-gray-50 border-transparent hover:bg-gray-100'}`}
                    >
                      <div className="flex items-center gap-3 md:gap-4">
                         <div className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 ${activeAudio === idx ? 'bg-[#E46B2E]' : 'bg-white shadow-sm'}`}>
                            {activeAudio === idx ? <Pause size={18} className="text-white" /> : <Play size={18} fill="#112250" className="text-[#112250]" />}
                         </div>
                         <div className="flex-1 min-w-0">
                            <div className={`font-[Gotu] font-bold text-[11px] md:text-xs truncate py-2 ${activeAudio === idx ? 'text-white' : 'text-[#112250]'}`}>
                              {isHi ? `पॉडकास्ट: एपिसोड 0${audio}` : `Podcast: Episode 0${audio}`}
                            </div>
                            <p className={`text-[8px] font-black uppercase  mt-0.5 ${activeAudio === idx ? 'text-[#E46B2E]' : 'text-[#159172]'}`}>
                               Jan Samvad
                            </p>
                         </div>
                         {activeAudio === idx && <Waves className="text-[#E46B2E] animate-pulse shrink-0" size={16} />}
                      </div>

                      <AnimatePresence>
                        {activeAudio === idx && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                             <div className="mt-4 pt-4 border-t border-white/10">
                                <audio src={audio1} controls className="w-full h-8 invert brightness-200 scale-90 md:scale-100" autoPlay />
                             </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* VIDEO MODAL PLAYER - Optimized for Mobile */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 md:backdrop-blur-xl flex items-center justify-center p-2 md:p-10"
          >
            <button 
              onClick={() => setSelectedVideo(null)}
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors p-2 z-[110]"
            >
              <X size={32} className="md:w-10 md:h-10" />
            </button>
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              className="w-full max-w-5xl aspect-video rounded-xl md:rounded-3xl overflow-hidden bg-black shadow-2xl border border-white/10"
            >
              <video src={selectedVideo} controls autoPlay className="w-full h-full" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default AudioVideoSection