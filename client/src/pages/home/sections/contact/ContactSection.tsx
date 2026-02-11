import { useState } from "react";
import { useOutletContext } from "react-router-dom"; 
import { motion } from "framer-motion";
import type { Lang } from "@/layouts/MainLayout";
import SectionHeading from "@/components/ui/SectionHeading/SectionHeading";
import { Send, Mail, Facebook, Twitter, Instagram, Youtube, CheckCircle2 } from "lucide-react";

const ContactSection = () => {
  const { lang } = useOutletContext<{ lang: Lang }>(); 
  const isHi = lang === "hi";

  const [form, setForm] = useState({
    name: "", phone: "", email: "", city: "", message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = isHi ? "जनसंपर्क वेबसाइट से नया संदेश" : "New Message";
    const body = `Name: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email}\nCity: ${form.city}\n\nMessage:\n${form.message}`;
    window.location.href = `mailto:officeofrajendrashukla@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const labels = {
    title: isHi ? "अपनी बात हम तक पहुँचाएँ" : "Share Your Message With Us",
    subtitle: isHi ? "संपर्क करें" : "Contact Us",
    desc: isHi ? "विन्ध्य के विकास और आपकी समस्याओं के समाधान के लिए हम सदैव तत्पर हैं।" : "We are always ready for the development of Vindhya and to solve your problems.",
    name: isHi ? "पूरा नाम" : "Full Name",
    phone: isHi ? "मोबाइल नंबर" : "Mobile Number",
    email: isHi ? "ईमेल पता" : "Email Address",
    city: isHi ? "शहर / जिला" : "City / District",
    msg: isHi ? "अपना संदेश लिखें...(वैकल्पिक)" : "Write your message...(optional)",
    btn: isHi ? "संदेश भेजें" : "Send Message"
  };

  return (
    <section id="contact" className="relative overflow-hidden bg-white py-16 lg:py-32">
      {/* Background Blurs */}
      <div className="absolute top-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-primary/5 rounded-full blur-[80px] md:blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-green/10 rounded-full blur-[70px] md:blur-[100px] -z-10" />

      <div className="mx-auto w-full">
        {/* Heading Section */}
        <div className="mb-10 lg:mb-20">
          <SectionHeading subtitle={labels.subtitle} title={labels.title} />
        </div>

        <div className="mx-auto max-w-[95rem] px-6 lg:px-12">
          {/* Main Grid: Using flex flex-col for mobile ordering */}
          <div className="flex flex-col lg:grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* RIGHT FORM - Now first on mobile using order-1 */}
            <div className="w-full lg:col-span-7 order-1 lg:order-2 relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-green/20 rounded-[2rem] md:rounded-[2.6rem] blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              
              <div className="relative bg-bg-soft border border-border p-6 md:p-12 rounded-[2rem] md:rounded-[2.5rem] shadow-2xl shadow-secondary/5">
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] md:text-xs font-bold text-secondary/40 uppercase ml-1 ">{labels.name}</label>
                    <input type="text" name="name" required className="w-full rounded-xl border border-border bg-white px-4 py-3 md:px-5 md:py-4 focus:ring-2 focus:ring-green/20 focus:border-green transition-all outline-none" onChange={handleChange} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] md:text-xs font-bold text-secondary/40 uppercase ml-1 ">{labels.phone}</label>
                    <input type="tel" name="phone" required className="w-full rounded-xl border border-border bg-white px-4 py-3 md:px-5 md:py-4 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none" onChange={handleChange} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] md:text-xs font-bold text-secondary/40 uppercase ml-1 ">{labels.email}</label>
                    <input type="email" name="email" required className="w-full rounded-xl border border-border bg-white px-4 py-3 md:px-5 md:py-4 focus:ring-2 focus:ring-green/20 focus:border-green transition-all outline-none" onChange={handleChange} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] md:text-xs font-bold text-secondary/40 uppercase ml-1">{labels.city}</label>
                    <input type="text" name="city" required className="w-full rounded-xl border border-border bg-white px-4 py-3 md:px-5 md:py-4 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none" onChange={handleChange} />
                  </div>
               
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-[10px] md:text-xs font-bold text-secondary/40 uppercase ml-1 ">{labels.msg}</label>
                    <textarea name="message" rows={4} className="w-full rounded-xl border border-border bg-white px-4 py-3 md:px-5 md:py-4 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none resize-none" onChange={handleChange} />
                  </div>
                  <button type="submit" className="md:col-span-2 bg-secondary py-4 md:py-5 rounded-2xl text-white font-black text-sm md:text-base uppercase flex items-center justify-center gap-3 hover:bg-primary transition-all shadow-xl shadow-secondary/20">
                    {labels.btn} <Send className="w-4 h-4 md:w-5 md:h-5" />
                  </button>
                </form>
              </div>
            </div>

            {/* LEFT CONTENT - Now second on mobile using order-2 */}
            <div className="w-full lg:col-span-5 order-2 lg:order-1 space-y-8 md:space-y-10">
              <div className="space-y-4 md:space-y-6">
                <h3 className="text-2xl md:text-4xl font-black text-secondary leading-tight text-justify">
                  {isHi ? "आपकी आवाज़, हमारी प्राथमिकता" : "Your Voice, Our Priority"}
                </h3>
                <p className="text-secondary/60 text-base md:text-lg leading-relaxed text-justify">{labels.desc}</p>
              </div>
              
              <div className="space-y-4">
                 <div className="flex items-center gap-4 p-4 md:p-5 rounded-2xl bg-bg-soft border border-border group hover:border-green/30 transition-all">
                    <div className="h-10 w-10 md:h-12 md:w-12 flex-shrink-0 flex items-center justify-center rounded-xl bg-white text-green shadow-sm">
                      <Mail className="w-5 h-5 md:w-6 md:h-6" />
                    </div>
                    <span className="font-bold text-sm md:text-base text-secondary break-all">officeofrajendrashukla@gmail.com</span>
                 </div>
              </div>

              {/* Trust Badge */}
              <div className="flex items-center gap-3 py-2 px-4 bg-green/5 border border-green/10 rounded-full w-fit">
                <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-green" />
                <span className="text-[10px] md:text-xs font-bold text-green uppercase ">
                 {isHi ? "हमसे जुड़ें" : "Connect With Us"}
                </span>
              </div>

              {/* Social Icons */}
             <div className="flex gap-4 pt-2 md:pt-4">
  {[
    { Icon: Facebook, link: "https://www.facebook.com/OfficeOfRShukla" },
    { Icon: Twitter, link: "https://x.com/OfficeOfRShukla" },
    { Icon: Instagram, link: "https://www.instagram.com/officeofrshukla/" },
    // { Icon: Youtube, link: "https://www.youtube.com/" },
  ].map(({ Icon, link }, i) => (
    <a
      key={i}
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="h-11 w-11 md:h-12 md:w-12 flex items-center justify-center rounded-full bg-secondary text-white hover:bg-primary transition-all shadow-md"
    >
      <Icon className="w-5 h-5" />
    </a>
  ))}
</div>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
