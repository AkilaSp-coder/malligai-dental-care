import React from 'react';
import { Phone, MessageCircle, MapPin, Clock, ArrowUp, Sparkles } from 'lucide-react';

interface FooterProps {
  onReplayIntro?: () => void;
  onBookClick: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onReplayIntro, onBookClick }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0b101e] text-slate-400 pt-16 pb-24 lg:pb-12 border-t border-white/5 text-left text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/5">
          {/* Col 1: Brand & Overview (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#008F87] to-[#00BFA5] p-0.5">
                <div className="w-full h-full bg-[#10182D] rounded-[6px] flex items-center justify-center">
                  <svg className="w-4 h-4 text-[#00BFA5]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2C8 2 5 5 5 9c0 3.5 1.5 6 3 9.5.7 1.5 1.8 3.5 2.5 3.5s1.8-2 2.5-3.5C14.5 15 16 12.5 16 9c0-4-3-7-4-7z" />
                    <path d="M9 12c1.5 1 4.5 1 6 0" />
                  </svg>
                </div>
              </div>
              <span className="text-base font-bold text-white tracking-tight">
                Malligai Dental Care
              </span>
            </div>

            <p className="text-slate-400 leading-relaxed max-w-sm">
              Providing premier dental healthcare, precision BPS dentures, painless wisdom tooth extractions, 
              and advanced digital intraoral scanning in Sengottai, Tamil Nadu.
            </p>

            <p className="text-slate-300 font-medium italic">
              “Your Smile Deserves the Best Care. Recover Your Lovely Smile!”
            </p>

            {onReplayIntro && (
              <div className="pt-2">
                <button
                  onClick={onReplayIntro}
                  className="inline-flex items-center gap-1.5 text-xs text-[#00BFA5] hover:text-white transition-colors cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Replay 3D Cinematic Opening</span>
                </button>
              </div>
            )}
          </div>

          {/* Col 2: Navigation Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="hover:text-[#00BFA5] transition-colors">About Clinic</a>
              </li>
              <li>
                <a href="#doctors" className="hover:text-[#00BFA5] transition-colors">Our Doctors</a>
              </li>
              <li>
                <a href="#treatments" className="hover:text-[#00BFA5] transition-colors">Treatments</a>
              </li>
              <li>
                <a href="#technology" className="hover:text-[#00BFA5] transition-colors">3D Technology</a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-[#00BFA5] transition-colors">Clinic Gallery</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#00BFA5] transition-colors">Location & Hours</a>
              </li>
            </ul>
          </div>

          {/* Col 3: Specialised Care (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Specialised Treatments</h4>
            <ul className="space-y-2 text-slate-400">
              <li>BPS Dentures (Precision Biofunctional)</li>
              <li>Painless Wisdom Tooth Removal</li>
              <li>Full Mouth Rehabilitation</li>
              <li>Digital Intraoral 3D Scanning</li>
              <li>Low-Dose Digital Dental X-Ray</li>
              <li>General Consultation & Cleaning</li>
            </ul>
          </div>

          {/* Col 4: Verified Contact Info (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Contact & Hours</h4>
            <div className="space-y-2 text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#00BFA5] shrink-0 mt-0.5" />
                <span>No. 71-1/27A, Jawaharlal Nehru Road, Opp. Muthusamy Park, Sengottai – 627 809</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#008F87] shrink-0" />
                <a href="tel:9790060801" className="hover:text-white transition-colors font-semibold">97900 60801</a>
              </div>
              <div className="flex items-start gap-2 pt-1 border-t border-white/5">
                <Clock className="w-4 h-4 text-[#00BFA5] shrink-0 mt-0.5" />
                <div>
                  <p>Morning: 10:00 AM – 2:00 PM</p>
                  <p>Evening: 5:00 PM – 8:30 PM</p>
                  <p className="text-slate-400">Sunday: Appointment only</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <div>
            © {new Date().getFullYear()} Malligai Dental Care, Sengottai. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <span>Dr. R. Patrajan (BDS) & Dr. T. Sankari Patrajan (BDS)</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer flex items-center gap-1"
              title="Back to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Top</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
