import Image from 'next/image';
import { Mail, Phone, MapPin, Briefcase } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-[#060709] py-16 border-t border-white/5 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-start gap-16 relative z-10">
        
        {/* Brand & Logo */}
        <div className="flex flex-col gap-6 max-w-sm">
          <div className="flex items-center gap-5">
            <div className="relative w-20 h-20 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 shadow-lg shadow-black/50 overflow-hidden backdrop-blur-sm transition-transform hover:scale-105 duration-500">
              <Image 
                src="/Logo.png" 
                alt="Surendra & Co. Logo" 
                fill
                className="object-contain p-3 drop-shadow-md"
              />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 tracking-wide">
                Surendra & Co.
              </h3>
              <div className="flex items-center gap-2 mt-2">
                <Briefcase size={14} className="text-[#3b82f6]" />
                <p className="text-[#3b82f6] text-xs font-bold tracking-widest uppercase">
                  Coach Body Builders
                </p>
              </div>
            </div>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed border-l-2 border-white/10 pl-4">
            Specialists in all types of coach body building. Delivering premium quality, innovative design, and unmatched durability for your commercial travel needs.
          </p>
        </div>

        {/* Contact Information */}
        <div className="flex flex-col gap-5">
          <h4 className="text-white font-semibold text-lg tracking-wide flex items-center gap-2">
            <span className="w-8 h-[1px] bg-[#3b82f6] inline-block"></span>
            Contact Us
          </h4>
          
          <div className="flex flex-col gap-4 mt-2">
            <a href="tel:+919825039111" className="flex items-center gap-4 text-gray-400 hover:text-white transition-all duration-300 group">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#3b82f6]/20 group-hover:text-[#3b82f6] group-hover:border-[#3b82f6]/30 transition-all border border-white/5 shadow-inner">
                <Phone size={18} />
              </div>
              <span className="text-sm font-medium tracking-wide">+91 98250 39111</span>
            </a>
            
            <a href="mailto:surendra_bareja@yahoo.com" className="flex items-center gap-4 text-gray-400 hover:text-white transition-all duration-300 group">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#3b82f6]/20 group-hover:text-[#3b82f6] group-hover:border-[#3b82f6]/30 transition-all border border-white/5 shadow-inner">
                <Mail size={18} />
              </div>
              <span className="text-sm font-medium tracking-wide">surendra_bareja@yahoo.com</span>
            </a>
          </div>
        </div>

        {/* Location */}
        <div className="flex flex-col gap-5 max-w-xs">
          <h4 className="text-white font-semibold text-lg tracking-wide flex items-center gap-2">
            <span className="w-8 h-[1px] bg-[#3b82f6] inline-block"></span>
            Location
          </h4>
          
          <div className="flex items-start gap-4 text-gray-400 mt-2 group">
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/5 shrink-0 mt-1 shadow-inner group-hover:bg-[#3b82f6]/20 group-hover:text-[#3b82f6] group-hover:border-[#3b82f6]/30 transition-all duration-300">
              <MapPin size={18} />
            </div>
            <div className="text-sm leading-relaxed space-y-1 font-medium group-hover:text-gray-300 transition-colors">
              <p>N. H. No. 8, Near APMC Market</p>
              <p>Bareja – 382425</p>
              <p>Taluka: Daskroi</p>
              <p>District: Ahmedabad</p>
            </div>
          </div>
        </div>
        
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
        <p className="text-sm text-gray-500 font-medium tracking-wide">
          &copy; {new Date().getFullYear()} Surendra & Co. All rights reserved.
        </p>
        <div className="flex items-center gap-6 text-sm text-gray-500 font-medium">
          <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
          <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
        </div>
      </div>
    </footer>
  );
}
