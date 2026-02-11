import { motion } from "framer-motion";
import { GraduationCap, ShieldCheck, User, Star, Quote } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";
import img18 from "@/assets/18.jpg";
import SectionHeading from "@/components/ui/SectionHeading/SectionHeading";

gsap.registerPlugin(ScrollTrigger);

type Lang = "hi" | "en";

interface AboutSectionProps {
  lang: Lang;
}

const AboutSection = ({ lang }: AboutSectionProps) => {
  const isHi = lang === "hi";
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Giant Name Reveal (Slide up with skew)
      gsap.from(".giant-name span", {
        y: 100,
        skewY: 7,
        opacity: 0,
        stagger: 0.2,
        duration: 1.5,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".giant-name",
          start: "top 85%",
        }
      });

      // 2. Bio Text Reveal (Fade in and slide)
      gsap.from(".bio-content > div", {
        x: -50,
        opacity: 0,
        stagger: 0.3,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".bio-content",
          start: "top 80%",
        }
      });

      // 3. Image Scale & Reveal
      gsap.from(".img-container", {
        scale: 1.2,
        clipPath: "inset(100% 0% 0% 0%)",
        duration: 1.5,
        ease: "expo.out",
        scrollTrigger: {
          trigger: ".img-container",
          start: "top 80%",
        }
      });

      // 4. Staggered Cards (Existing but optimized)
      gsap.from(".info-card", {
        y: 100,
        rotate: 5,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: ".content-grid",
          start: "top 85%",
        }
      });

      // 5. Background Legacy Text Parallax
      gsap.to(".legacy-watermark", {
        x: -200,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 2,
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full bg-[#FDFDFD] overflow-hidden">
      
      {/* 1. TOP SEAMLESS HEADING */}
      <div className="w-full pt-20 pb-10 bg-gradient-to-b from-gray-50 to-white">
        <SectionHeading
          subtitle={isHi ? "जनसेवा को समर्पित एक जीवन" : "A Life Dedicated to Public Service"}
          title={isHi ? "परिचय" : "About"}
        />
      </div>

      <div className="max-w-[1800px] mx-auto px-6 lg:px-28 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* 2. LEFT COLUMN */}
          <div className="lg:col-span-7 space-y-12">
            
            {/* Giant Name Branding */}
            <div className="relative group giant-name overflow-hidden">
              <h2 className="font-[Gotu] font-[1000] py-4  md:py-10 uppercase text-[#112250] text-6xl md:text-[8rem] lg:text-[9rem]">
                <span className="text-[#E46B2E] block">{isHi ? "राजेन्द्र" : "RAJENDRA"}</span>
                <span className="relative inline-block">
                  {isHi ? "शुक्ल" : "SHUKLA"}
                 
                </span>
              </h2>
            </div>

            {/* Biography Content */}
            <div className="space-y-8 max-w-2xl bio-content">
              <div className="p-8 border-l-[6px] border-green bg-white shadow-[20px_20px_60px_rgba(0,0,0,0.05)] rounded-r-[2rem]">
                <p className="font-[Gotu] text-2xl font-black text-[#112250]">
                  {isHi 
                    ? "जन्म: 03 अगस्त 1964 | बी.ई. (मैकेनिकल), रीवा इंजीनियरिंग कॉलेज" 
                    : "Born: Aug 03, 1964 | B.E. (Mechanical), Rewa Engg. College"}
                </p>
              </div>

              <div className="space-y-8 font-[Poppins] text-gray-600 font-bold leading-relaxed text-xl">
                <div className="flex gap-4">
                  <Quote className="text-[#E46B2E] shrink-0" size={32} />
                  <p className="text-justify" >
                    {isHi 
                      ? "अपने छात्र जीवन के दौरान वर्ष 1985-86 में वे इंजीनियरिंग कॉलेज, रीवा के छात्रसंघ अध्यक्ष निर्वाचित हुए, जिससे उनके नेतृत्व कौशल की प्रारंभिक पहचान बनी।"
                      : "During his student days in 1985-86, he was elected as the President of the Student Union at Rewa Engineering College, marking his early leadership."}
                  </p>
                </div>
                <p className="pl-12 border-l-2 border-gray-100 italic text-justify">
                  {isHi 
                    ? "वर्ष 1998 में उन्होंने भारतीय जनता पार्टी की सदस्यता ग्रहण की तथा शीघ्र ही प्रदेश कार्यसमिति सदस्य बनाए गए।"
                    : "In 1998, he joined the Bharatiya Janata Party and was soon appointed as a member of the State Executive Committee."}
                </p>
              </div>
            </div>
          </div>

          {/* 3. RIGHT COLUMN */}
          <div className="lg:col-span-5 space-y-8 content-grid">
            
            {/* Immersive Image Container */}
            <div className="relative h-[400px] rounded-[3rem] overflow-hidden shadow-2xl group img-container">
              <img 
                src={img18} 
                className="bg-parallax absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
                alt="Rajendra Shukla" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#112250] via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-8 left-8">
                 <p className="text-white font-[Gotu] text-sm  uppercase opacity-80">Rewa, Madhya Pradesh</p>
              </div>
            </div>

            {/* Interactive Grid Cards */}
            <div className="grid grid-cols-2 gap-6">
              <motion.div whileHover={{ y: -5 }} className="info-card col-span-2 p-10 rounded-[3rem] bg-[#112250] text-white relative overflow-hidden group">
                <User className="text-[#E46B2E] mb-4" size={32} />
                <p className="font-[Gotu] text-2xl font-black italic uppercase leading-tight relative z-10">
                  {isHi ? "छात्रसंघ अध्यक्ष (1985)" : "Student Union President"}
                </p>
                <div className="absolute -right-4 -bottom-4 text-white/5 group-hover:scale-110 transition-transform">
                   <User size={150} />
                </div>
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }} className="info-card p-8 rounded-[2.5rem] bg-white border border-gray-100 shadow-sm flex flex-col justify-between aspect-square group">
                <div className="h-14 w-14 bg-[#E46B2E]/10 text-primary rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform">
                  <GraduationCap size={28} />
                </div>
                <div>
                  <p className="font-[Gotu] text-3xl font-black text-green">B.E.</p>
                  <p className="font-[Poppins] text-[10px] font-black text-gray-400 uppercase  mt-2">{isHi ? "मैकेनिकल 1986" : "Mechanical '86"}</p>
                </div>
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }} className="info-card p-8 rounded-[2.5rem] bg-white border border-gray-100 shadow-sm flex flex-col justify-between aspect-square group">
                <div className="h-14 w-14 bg-[#E46B2E]/10 text-primary rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform">
                  <ShieldCheck size={28} />
                </div>
                <div>
                  <p className="font-[Gotu] text-3xl font-black text-green">BJP</p>
                  <p className="font-[Poppins] text-[10px] font-black text-gray-400 uppercase  mt-2">{isHi ? "सदस्यता 1998" : "Joined 1998"}</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Watermark Layer */}
      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gray-100 -z-10" />
      <h1 className="legacy-watermark absolute bottom-0 right-0 text-[22vw] font-black text-gray-400/5 leading-none select-none pointer-events-none uppercase">
        Legacy
      </h1>
    </section>
  );
};

export default AboutSection;