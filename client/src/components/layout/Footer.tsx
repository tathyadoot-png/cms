import hi from "@/locales/hi";
import en from "@/locales/en";
import type { Lang } from "@/layouts/MainLayout";
import logo from "@/assets/SociyoLogo.png";
import { ArrowUpRight } from "lucide-react";

const Footer = ({ lang }: { lang: Lang }) => {
  const isHi = lang === "hi";

  const navLinks = [
    { label: isHi ? "होम" : "Home", path: "/" },
    { label: isHi ? "परिचय" : "About", path: "#about" },
    { label: isHi ? "विकास यात्रा" : "Journey", path: "#journey" },
    { label: isHi ? "उपलब्धियाँ" : "Achievements", path: "#achievements" },
    { label: isHi ? "नेतृत्व" : "Leadership", path: "#leadership" },
    { label: isHi ? "गैलरी" : "Gallery", path: "#gallery" },
  ];

  return (
    <footer className="bg-[#f9fafb] pt-10 border-t border-gray-100 ">
      <div className="mx-auto max-w-full px-6 lg:px-20">
        
        {/* Minimal Navigation Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-10 border-b border-gray-100">
          <div className="flex flex-col items-center md:items-start">
             <h2 className="font-[Gotu] text-2xl font-black text-secondary  uppercase">
               {isHi ? "राजेंद्र शुक्ल" : "Rajendra Shukla"}
             </h2>
             <span className="text-[10px] font-bold text-primary  uppercase">Vindhya Vision</span>
          </div>

          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-3">
            {navLinks.map((link, idx) => (
              <a 
                key={idx} 
                href={link.path} 
                className="text-xs font-bold text-secondary/60 hover:text-primary transition-all uppercase "
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        {/* The "Wow" Agency Bar - Slick & Dark */}
        <div className="my-8 rounded-[1.5rem] md:rounded-full bg-[#112250] p-4 md:p-2 pl-6 pr-6 md:pr-2 flex flex-col md:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-4">
            <p className="text-white/30 text-[9px] font-black uppercase  hidden md:block">
              © {new Date().getFullYear()} All Rights Reserved
            </p>
            <div className="h-4 w-px bg-white/10 hidden md:block" />
            <p className="text-white/60 text-xs font-medium">
              {isHi ? "प्रगतिशील विन्ध्य, समृद्ध प्रदेश" : "Progressive Vindhya, Prosperous State"}
            </p>
          </div>

          <a 
            href="https://thesociyo.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full md:w-auto flex items-center justify-between md:justify-start gap-4 bg-white/5 hover:bg-white/10 p-2 md:pl-6 rounded-full border border-white/5 transition-all group"
          >
            <span className="text-[10px] font-bold text-white/40 uppercase ">Digital Partner</span>
            <div className="flex items-center gap-3">
               <img 
                 src={logo} 
                 alt="The Sociyo" 
                 className="h-6 md:h-7 w-auto object-contain brightness-0 invert" 
               />
               <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center group-hover:bg-primary transition-all">
                  <ArrowUpRight className="w-4 h-4 text-[#112250] group-hover:text-white" />
               </div>
            </div>
          </a>
        </div>

        {/* Mobile Copyright Only */}
        <p className="text-center text-[9px] font-bold text-secondary/20 uppercase  pb-6 md:hidden">
          © {new Date().getFullYear()} Rajendra Shukla
        </p>
      </div>
    </footer>
  );
};

export default Footer;