import { useLayoutEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
}

const SectionHeading = ({ title, subtitle }: SectionHeadingProps) => {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".connector-line", {
        width: 0,
        opacity: 0,
        duration: 1.5,
        ease: "expo.out",
        scrollTrigger: { trigger: containerRef.current, start: "top 90%" },
      });

      gsap.from(".reveal-up", {
        y: 60,
        opacity: 0,
        stagger: 0.2,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: { trigger: containerRef.current, start: "top 90%" },
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full lg:w-[90%] mx-auto mb-12 md:mb-20 px-4 md:px-8 lg:px-12 overflow-hidden"
    >
      {/* WRAPPER: Responsive gap management */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-8 lg:gap-12">
        
        {/* LEFT: HEADING - Adjusted md text size to prevent overflow */}
        <div className="flex-shrink-0 md:max-w-[60%] lg:max-w-none">
          <div className="py-2">
            <h2 className="reveal-up py-2 font-[Gotu] text-3xl md:text-4xl lg:text-6xl font-[1000] text-[#112250] leading-[0.9] md:leading-[0.85]  uppercase">
              {title}
            </h2>
          </div>
        </div>

        {/* MIDDLE: DESIGNER LINE (Visible on md and up) */}
        <div className="hidden md:block flex-grow mb-4 lg:mb-8">
          <div className="connector-line h-[2px] w-full bg-gradient-to-r from-primary to-green" />
        </div>

        {/* RIGHT: SUBTITLE & TAG - Width adjusted for md screens */}
        <div className="w-full md:w-auto lg:w-1/3 md:pb-3 lg:pb-6">
          <div className="overflow-hidden">
            {subtitle && (
              <p className="reveal-up font-[Poppins] py-2 text-xs md:text-sm lg:text-lg font-medium uppercase  text-green mb-2 lg:mb-4 leading-tight">
                {subtitle}
              </p>
            )}
            <div className="reveal-up flex items-center gap-2 lg:gap-3">
              <span className="h-px w-6 lg:w-10 bg-[#112250]/30" />
              <span className="text-[8px] lg:text-[10px] font-bold text-primary uppercase  whitespace-nowrap">
                Public Leader • Vision 2026
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM PROGRESS BAR */}
      <div className="mt-6 lg:mt-10 w-full h-[1px] bg-gray-100 relative">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "30%" }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute left-0 top-0 h-full bg-[#E46B2E]"
        />
      </div>
    </div>
  );
};

export default SectionHeading;