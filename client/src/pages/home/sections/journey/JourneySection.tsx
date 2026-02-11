import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import type { Lang } from "@/layouts/MainLayout";
import SectionHeading from "@/components/ui/SectionHeading/SectionHeading";

// Images imports
import img12 from "@/assets/12.jpg";
import img13 from "@/assets/13.jpg";
import img14 from "@/assets/14.jpg";
import img15 from "@/assets/15.jpg";
import img16 from "@/assets/16.jpg";

gsap.registerPlugin(ScrollTrigger);

interface JourneySectionProps {
  lang: Lang;
}

const JourneySection = ({ lang }: JourneySectionProps) => {
  const isHi = lang === "hi";
  const containerRef = useRef<HTMLDivElement>(null);

  const timeline = [
    {
      year: "1998",
      title: isHi ? "राजनीतिक उदय" : "Political Rise",
      desc: isHi ? "भारतीय जनता पार्टी की सदस्यता ग्रहण की।" : "Joined the BJP as a dedicated member.",
      img: img12,
      theme: "var(--color-secondary)",
    },
    {
      year: "2003",
      title: isHi ? "जनता का विश्वास" : "People's Mandate",
      desc: isHi ? "रीवा विधानसभा से पहली बार विधायक निर्वाचित।" : "Elected as MLA from Rewa for the first time.",
      img: img13,
      theme: "var(--color-primary)",
    },
    {
      year: "2008",
      title: isHi ? "प्रशासनिक अनुभव" : "Governance Roles",
      desc: isHi ? "कैबिनेट मंत्री: वन, खनिज एवं विधि विभाग।" : "Cabinet Minister: Forest, Minerals & Law.",
      img: img14,
      theme: "var(--color-green)",
    },
    {
      year: "2013",
      title: isHi ? "विकास का विज़न" : "Visionary Growth",
      desc: isHi ? "ऊर्जा एवं उद्योग मंत्री; रीवा सोलर प्लांट की नींव।" : "Minister for Energy & Industry.",
      img: img15,
      theme: "var(--color-secondary)",
    },
    {
      year: "2023",
      title: isHi ? "प्रदेश का नेतृत्व" : "State Leadership",
      desc: isHi ? "उप मुख्यमंत्री, मध्य प्रदेश शासन।" : "Deputy Chief Minister, Govt of MP.",
      img: img16,
      theme: "var(--color-primary)",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Progress Line Animation
      gsap.to(".progress-line", {
        height: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: ".timeline-container",
          start: "top center",
          end: "bottom center",
          scrub: 1,
        },
      });

      // Card Entrances
      const cards = gsap.utils.toArray(".timeline-card");
      cards.forEach((card: any, i) => {
        gsap.from(card, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full bg-bg py-16 overflow-hidden">
      {/* Subtle Background Text */}
      <div className="absolute top-20 left-0 w-full overflow-hidden pointer-events-none opacity-[0.02] select-none">
        <h2 className="text-[15vw] font-black whitespace-nowrap">REWA • PROGRESS • REWA</h2>
      </div>

      <div className="w-full relative z-10">
        <SectionHeading
          subtitle={isHi ? "गौरवशाली इतिहास" : "Legacy of Service"}
          title={isHi ? "राजनीतिक सफरनामा" : "The Journey of Leadership"}
        />

        <div className="timeline-container relative max-w-screen-2xl mx-auto mt-12 px-6">
          {/* Central Progress Line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[2px] h-full bg-border/40 hidden md:block">
            <div className="progress-line absolute top-0 left-0 w-full h-0 bg-green shadow-[0_0_10px_var(--color-green)]" />
          </div>

          <div className="space-y-16 md:space-y-24 relative">
            {timeline.map((item, index) => (
              <div
                key={item.year}
                className={`flex flex-col ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } items-center justify-between gap-8 md:gap-16`}
              >
                {/* Compact Image Container */}
                <div className="w-full md:w-[45%] timeline-card">
                  <div className="relative aspect-[16/10] rounded-3xl overflow-hidden border-4 border-white shadow-xl group">
                    <img 
                      src={item.img} 
                      alt={item.year} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div 
                      className="absolute bottom-4 left-4 px-4 py-1 rounded-full text-white text-sm font-gotu font-bold shadow-lg"
                      style={{ backgroundColor: item.theme }}
                    >
                      {item.year}
                    </div>
                  </div>
                </div>

                {/* Content Side */}
                <div className="w-full md:w-[45%] timeline-card space-y-3 text-center md:text-left">
                  <h4 
                    className="text-xs font-black uppercase "
                    style={{ color: item.theme }}
                  >
                    {isHi ? "उपलब्धि" : "Milestone"} — {item.year}
                  </h4>
                  <h3 className="text-2xl md:text-4xl font-gotu font-bold text-secondary leading-tight">
                    {item.title}
                  </h3>
                  <p className="font-Poppins text-base md:text-lg text-muted leading-relaxed max-w-md">
                    {item.desc}
                  </p>
                  
                  {/* Vikas Indicator */}
                  <div className={`flex items-center gap-2 justify-center ${index % 2 === 0 ? "md:justify-start" : "md:justify-end"} pt-2`}>
                    <div className="h-1 w-10 bg-green/30 rounded-full overflow-hidden">
                       <div className="h-full bg-green w-2/3" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default JourneySection;