import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import { motion } from "framer-motion";

const StickySocial = () => {
  const socials = [
    { 
      icon: Facebook, 
      href: "https://www.facebook.com/rajendrashuklamp", 
      color: "#1877F2", 
      bg: "bg-[#1877F2]/10", 
      border: "border-[#1877F2]/20" 
    },
    { 
      icon: Instagram, 
      href: "https://www.instagram.com/rajendrashuklaofficial/", 
      color: "#E4405F", 
      bg: "bg-[#E4405F]/10", 
      border: "border-[#E4405F]/20" 
    },
    { 
      icon: Twitter, 
      href: "https://x.com/rshuklabjp", 
      color: "#000000", 
      bg: "bg-black/5", 
      border: "border-black/10" 
    },
    { 
      icon: Youtube, 
      href: "https://www.youtube.com/@rajendrashuklamp", 
      color: "#FF0000", 
      bg: "bg-[#FF0000]/10", 
      border: "border-[#FF0000]/20" 
    },
  ];

  return (
    /* PLACEMENT CHANGE:
       Mobile: Bottom-Right (Safe Zone)
       Desktop: Center-Right (Original)
    */
    <div className="fixed z-[999] 
      bottom-24 right-5 
      md:right-5 md:top-1/2 md:-translate-y-1/2 md:bottom-auto"
    >
      {/* DOCK STYLE:
          Mobile: Super compact and more transparent
          Desktop: Your original glass dock
      */}
      <div className="bg-white/40 backdrop-blur-xl border border-white/30 
        p-1.5 md:p-2.5 rounded-[2rem] 
        shadow-[0_10px_30px_rgba(0,0,0,0.08)] 
        flex flex-col gap-2.5 md:gap-4"
      >
        
        {socials.map((item, idx) => (
          <motion.a
            key={idx}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`relative group 
              h-6 w-6 md:h-12 md:w-12 
              flex items-center justify-center rounded-full md:rounded-2xl 
              border ${item.bg} ${item.border} 
              transition-all duration-300`}
          >
            {/* Hover Background - Only visible on Desktop hover */}
            <div 
              className="absolute inset-0 rounded-full md:rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300"
              style={{ 
                backgroundColor: item.color, 
                boxShadow: `0 8px 15px -5px ${item.color}88` 
              }}
            />
            
            {/* Icon: Slightly smaller on mobile */}
            <item.icon 
              className="w-3.5 h-3.5 md:w-5 md:h-5 relative z-10 transition-colors duration-300 group-hover:!text-white" 
              style={{ color: item.color }} 
            />

            {/* Tooltip: Hidden on Mobile */}
            <div className="hidden md:block absolute right-full mr-5 px-3 py-1.5 rounded-xl bg-black text-white text-[10px] font-black uppercase  opacity-0 group-hover:opacity-100 pointer-events-none transition-all translate-x-4 group-hover:translate-x-0 whitespace-nowrap">
                Follow
                <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-black rotate-45" />
            </div>
          </motion.a>
        ))}
        
      </div>
    </div>
  );
};

export default StickySocial;