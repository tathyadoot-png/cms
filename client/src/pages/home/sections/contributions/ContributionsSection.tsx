import { motion } from "framer-motion";
import type { Lang } from "@/layouts/MainLayout";
import SectionHeading from "@/components/ui/SectionHeading/SectionHeading";
import { Zap, Sun, Factory, ShieldCheck, ArrowUpRight } from "lucide-react";

interface ContributionsSectionProps {
  lang: Lang;
}

const ContributionsSection = ({ lang }: ContributionsSectionProps) => {
  const isHi = lang === "hi";

  const contributions = [
    {
      titleHi: "अटल ज्योति योजना",
      titleEn: "Atal Jyoti Yojana",
      descHi: "मध्यप्रदेश में 24 घंटे निर्बाध विद्युत आपूर्ति सुनिश्चित करने हेतु ऐतिहासिक योजना का सफल क्रियान्वयन।",
      descEn: "Successful implementation of the historic scheme to ensure 24×7 uninterrupted power supply in MP.",
      icon: <Zap className="w-6 h-6" />,
      accent: "var(--color-primary)", // Saffron
    },
    {
      titleHi: "ऊर्जा एवं नवकरणीय ऊर्जा",
      titleEn: "Renewable Energy Reforms",
      descHi: "विश्व के सबसे बड़े सौर ऊर्जा संयंत्रों में से एक 'रीवा अल्ट्रा मेगा सोलर' की स्थापना में महत्वपूर्ण भूमिका।",
      descEn: "Played a pivotal role in establishing the Rewa Ultra Mega Solar, one of the world's largest solar plants.",
      icon: <Sun className="w-6 h-6" />,
      accent: "var(--color-green)", // Green
    },
    {
      titleHi: "औद्योगिक विकास",
      titleEn: "Industrial Growth",
      descHi: "निवेश प्रोत्साहन और औद्योगिक गलियारों के निर्माण के माध्यम से प्रदेश में रोजगार के नए अवसरों का सृजन।",
      descEn: "Creating new employment opportunities through investment promotion and industrial corridors.",
      icon: <Factory className="w-6 h-6" />,
      accent: "var(--color-secondary)", // Blue
    },
  ];

  return (
    <section className="bg-bg py-24 relative overflow-hidden">
      {/* Background Subtle Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-green/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="mx-auto w-full relative z-10">
        {/* Reusable Section Heading - Full Width */}
        <SectionHeading
          subtitle={isHi ? "विजनरी नेतृत्व" : "Visionary Leadership"}
          title={isHi ? "प्रमुख कार्य एवं उपलब्धियां" : "Major Contributions & Works"}
        />

        {/* Cards Grid */}
        <div className="mx-auto max-w-[100rem] px-6 md:px-12 mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {contributions.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative rounded-[2.5rem] border border-border bg-white p-10 transition-all duration-500 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] overflow-hidden"
            >
              {/* Decorative Corner Accent */}
              <div 
                className="absolute top-0 right-0 w-24 h-24 opacity-[0.03] -mr-8 -mt-8 rounded-full transition-transform duration-700 group-hover:scale-[3]"
                style={{ backgroundColor: item.accent }}
              />

              {/* Icon Box */}
              <div 
                className="mb-8 inline-flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-lg transition-transform duration-500 group-hover:rotate-[10deg]"
                style={{ backgroundColor: item.accent }}
              >
                {item.icon}
              </div>

              {/* Content */}
              <h3 className="text-2xl font-gotu font-bold text-secondary leading-tight">
                {isHi ? item.titleHi : item.titleEn}
              </h3>

              <div className="my-5 h-1 w-12 rounded-full bg-border transition-all duration-500 group-hover:w-24 group-hover:bg-green" />

              <p className="font-Poppins text-lg leading-relaxed text-muted/90 text-justify
">
                {isHi ? item.descHi : item.descEn}
              </p>

              {/* Action Link (Subtle) */}
              <div className="mt-8 flex items-center gap-2 text-xs font-black uppercase  text-secondary/40 transition-colors group-hover:text-green">
                <span>{isHi ? "अधिक जानकारी" : "Read More"}</span>
                <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Banner - Adding a "Vikas" Statement */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-20 text-center"
        >
          <div className="inline-flex items-center gap-3 rounded-full border border-border bg-bg-soft px-8 py-4">
             <div className="flex -space-x-2">
                {[1,2,3].map(i => <div key={i} className={`w-3 h-3 rounded-full border-2 border-white ${i === 1 ? 'bg-primary' : i === 2 ? 'bg-green' : 'bg-secondary'}`} />)}
             </div>
             <p className="text-[11px] font-black uppercase  text-muted">
               {isHi ? "मध्य प्रदेश के उज्ज्वल भविष्य की ओर" : "Towards a brighter future for MP"}
             </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContributionsSection;