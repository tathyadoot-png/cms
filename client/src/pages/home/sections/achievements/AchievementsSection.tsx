import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Lang } from "@/layouts/MainLayout";
import SectionHeading from "@/components/ui/SectionHeading/SectionHeading";

import imgSolar from "@/assets/15.jpg"; 
import imgTiger from "@/assets/12.jpg";

gsap.registerPlugin(ScrollTrigger);

interface AchievementsSectionProps {
  lang: Lang;
}

const AchievementsSection = ({ lang }: AchievementsSectionProps) => {
  const isHi = lang === "hi";
  const containerRef = useRef<HTMLDivElement>(null);

  const achievements = [
    {
      titleHi: "एशिया का सबसे बड़ा सोलर पावर प्लांट",
      titleEn: "Asia’s Largest Solar Power Plant",
      descHi: "रीवा की धरती पर नवकरणीय ऊर्जा का महाकुंभ। माननीय प्रधानमंत्री जी द्वारा लोकार्पित यह प्रोजेक्ट आज पूरी दुनिया के लिए एक मिसाल है, जिसने मध्य प्रदेश को ऊर्जा आत्मनिर्भर बनाया।",
      descEn: "A mega-hub of renewable energy in Rewa. Inaugurated by the Hon'ble PM, it's a global benchmark making MP self-reliant in power.",
      img: imgSolar,
      tag: isHi ? "ऊर्जा क्रांति" : "ENERGY REVOLUTION",
    },
    {
      titleHi: "विश्व की पहली व्हाइट टाइगर सफारी",
      titleEn: "World's First White Tiger Safari",
      descHi: "46 वर्षों के लंबे इंतजार के बाद विन्ध्य की शान सफेद बाघों को मुकुन्दपुर में फिर से बसाया गया। यह ऐतिहासिक उपलब्धि आज वैश्विक पर्यटन और वन्यजीव संरक्षण का प्रमुख केंद्र है।",
      descEn: "After 46 years, the pride of Vindhya—white tigers—reintroduced in Mukundpur. A historic feat now a global hub for tourism and wildlife conservation.",
      img: imgTiger,
      tag: isHi ? "विरासत" : "WILDLIFE HERITAGE",
    },
  ];

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop logic: Keep your original morphing animation
      mm.add("(min-width: 768px)", () => {
        gsap.set(".card-2", { opacity: 0, x: 50, scale: 0.95 });

        gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=150%",
            pin: true,
            scrub: 0.8,
          }
        })
        .to(".card-1", { opacity: 0, x: -50, scale: 0.95, duration: 0.6 })
        .to(".card-2", { opacity: 1, x: 0, scale: 1, duration: 1 }, "-=0.6");
      });

      // Mobile logic: No pinning, just simple reveal if you want, or leave it natural
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="bg-[#fdfdfd] py-16 md:py-24 overflow-hidden">
      {/* Heading - Edge to Edge Full Width */}
      <div className="w-full  lg:px-3 mb-12">
        <SectionHeading
          subtitle={isHi ? "प्रदेश को राष्ट्रीय पहचान दिलाने वाले कार्य" : "Milestones that Gave National Recognition"}
          title={isHi ? "विशेष उपलब्धियाँ" : "Landmark Achievements"}
        />
      </div>

      {/* Main Container - Changes from h-screen to auto on mobile */}
      <div 
        ref={containerRef} 
        className="w-full h-auto md:h-screen flex flex-col items-center justify-center"
      >
        <div className="relative w-full max-w-[94rem] h-full md:h-[600px] flex flex-col md:block px-6 md:px-20 gap-16">
          
          {achievements.map((item, index) => (
            <div
              key={index}
              className={`achievement-card card-${index + 1} 
                /* Mobile: Relative (Auto Height) | Desktop: Absolute (Fixed Morph) */
                relative md:absolute inset-0 
                flex flex-col md:flex-row items-center justify-between 
                gap-8 md:gap-0
                ${index === 0 ? "z-20" : "z-10"}
                /* Hide second card only on desktop initial state */
                ${index === 1 ? "md:opacity-0" : "opacity-100"}`}
            >
              {/* IMAGE SIDE */}
              <div className="w-full md:w-5/12">
                <div className="rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl aspect-[4/5] border-[6px] md:border-[12px] border-white">
                  <img 
                    src={item.img} 
                    className="w-full h-full object-cover" 
                    alt={item.titleEn}
                  />
                </div>
              </div>

              {/* INFO SIDE */}
              <div className="w-full md:w-6/12 space-y-6 md:space-y-8">
                <div className="space-y-3">
                  <div className="flex items-center gap-4">
                    <span className="text-[10px] md:text-[11px] font-black  text-primary uppercase">
                      {item.tag}
                    </span>
                    <div className="h-[1px] w-12 md:w-20 bg-primary/20" />
                  </div>
                  
                  <h3 className="text-3xl md:text-6xl font-gotu font-bold text-secondary leading-tight text-justify">
                    {isHi ? item.titleHi : item.titleEn}
                  </h3>
                </div>

                <div className="relative pl-6 md:pl-8 border-l-2 border-primary/20">
                  <p className="font-Poppins text-base md:text-xl leading-relaxed text-text-muted/80 text-justify">
                    {isHi ? item.descHi : item.descEn}
                  </p>
                </div>

                {/* Progress Indicators */}
                <div className="flex items-center gap-6 pt-2">
                   <div className="flex items-baseline gap-1 font-gotu font-bold">
                      <span className="text-3xl md:text-4xl text-secondary">0{index + 1}</span>
                      <span className="text-sm text-gray-300">/ 02</span>
                   </div>
                   <div className="w-24 md:w-32 h-[3px] bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary"
                        style={{ width: index === 0 ? '50%' : '100%' }}
                      />
                   </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;