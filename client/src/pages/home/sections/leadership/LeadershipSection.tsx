import { motion } from "framer-motion";
import type { Lang } from "@/layouts/MainLayout";
import SectionHeading from "@/components/ui/SectionHeading/SectionHeading";
import { Briefcase, Target, ShieldCheck, Zap, Award } from "lucide-react";

interface LeadershipSectionProps {
  lang: Lang;
}

const LeadershipSection = ({ lang }: LeadershipSectionProps) => {
  const isHi = lang === "hi";

  const points = [
    {
      hi: "पिछले 15 वर्षों से विन्ध्य क्षेत्र में होने वाले सभी लोकसभा एवं विधानसभा चुनावों के प्रभारी के रूप में कार्य किया।",
      en: "Served as the in-charge for all Lok Sabha and Assembly elections in the Vindhya region for the past 15 years.",
      icon: <Briefcase className="w-7 h-7" />,
      span: "lg:col-span-8",
      accent: "border-primary",
      bgHover: "hover:shadow-primary/10"
    },
    {
      hi: "कुशल चुनाव प्रबंधन से भाजपा को प्रचंड बहुमत से विजय दिलाई।",
      en: "Ensured BJP’s decisive victories through efficient election management.",
      icon: <Zap className="w-7 h-7" />,
      span: "lg:col-span-4",
      accent: "border-secondary",
      bgHover: "hover:shadow-secondary/10"
    },
    {
      hi: "2018 के चुनावों में सत्ता विरोधी लहर के बावजूद विन्ध्य की 30 में से 24 सीटों पर जीत दर्ज कराई।",
      en: "Secured victory in 24 out of 30 seats in Vindhya during 2018 elections.",
      icon: <Target className="w-7 h-7" />,
      span: "lg:col-span-5",
      accent: "border-green", // Using your green color
      bgHover: "hover:shadow-green/10"
    },
    {
      hi: "विन्ध्य क्षेत्र के सभी जिलों में संगठन को मजबूत आधार प्रदान किया।",
      en: "Strengthened the party organization across all districts of the Vindhya region.",
      icon: <ShieldCheck className="w-7 h-7" />,
      span: "lg:col-span-7",
      accent: "border-primary",
      bgHover: "hover:shadow-primary/10"
    },
  ];

  return (
    <section className="relative overflow-hidden bg-white py-24 md:py-32">
      
      {/* Background Decor - Making it less blank */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] rounded-full bg-primary/5 blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-secondary/5 blur-[100px]" />
      </div>

      {/* 1. HEADING - Full Width */}
      <div className="w-full md:px-6 mb-20">
        <SectionHeading
          subtitle={isHi ? "संगठन, रणनीति और ऐतिहासिक विजय" : "Experience in Organization & Strategy"}
          title={isHi ? "विजनरी नेतृत्व" : "Visionary Leadership"}
        />
      </div>

      {/* 2. CARDS SECTION */}
      <div className="mx-auto max-w-[98rem] px-6">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {points.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: "circOut" }}
              className={`group relative overflow-hidden rounded-[2rem] border-t-4 ${item.accent} bg-bg-soft p-10 shadow-soft transition-all duration-500 hover:-translate-y-2 hover:bg-white ${item.bgHover} ${item.span}`}
            >
              <div className="relative z-10 flex h-full flex-col justify-between">
                <div>
                  {/* Icon and Badge */}
                  <div className="mb-12 flex items-center justify-between">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-sm text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
                      {item.icon}
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 border border-border text-[10px] font-bold uppercase  text-secondary/60 group-hover:text-secondary group-hover:border-secondary/20 transition-all">
                      <Award className="w-3 h-3" />
                      {isHi ? "उपलब्धि" : "Achievement"}
                    </div>
                  </div>

                  {/* Body Text */}
                  <h3 className="font-Poppins text-2xl font-black leading-[1.4] text-secondary group-hover:text-text transition-colors text-justify">
                    {isHi ? item.hi : item.en}
                  </h3>
                </div>

                {/* Footer Section */}
                <div className="mt-12 flex items-end justify-between">
                  <div className="space-y-1">
                    <div className="h-1.5 w-12 rounded-full bg-primary group-hover:w-24 transition-all duration-700" />
                    <p className="text-[10px] font-bold text-primary/40 uppercase ">Verified Milestone</p>
                  </div>
                  <span className="font-gotu text-7xl font-black text-secondary/[0.03] group-hover:text-secondary/[0.07] transition-all">
                    0{index + 1}
                  </span>
                </div>
              </div>

              {/* Decorative Background Shape */}
              <div className="absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-primary/5 blur-2xl group-hover:scale-150 transition-transform duration-700" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LeadershipSection;