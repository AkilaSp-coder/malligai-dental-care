import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle, Menu, X, Calendar } from 'lucide-react';

interface NavbarProps {
  onBookClick: () => void;
  onAiChatClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onBookClick, onAiChatClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#10182D]/95 backdrop-blur-md border-b border-[#00BFA5]/20 shadow-md py-3'
          : 'bg-[#10182D]/80 backdrop-blur-sm border-b border-white/5 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8">
          {/* Zone 1: Single text wordmark with tooth emblem */}
          <a href="#" className="flex items-center gap-3 whitespace-nowrap shrink-0 group">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#008F87] to-[#00BFA5] p-0.5 shadow-sm group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#10182D] rounded-[7px] flex items-center justify-center">
                <svg className="w-5 h-5 text-[#00BFA5]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2C8 2 5 5 5 9c0 3.5 1.5 6 3 9.5.7 1.5 1.8 3.5 2.5 3.5s1.8-2 2.5-3.5C14.5 15 16 12.5 16 9c0-4-3-7-4-7z" />
                  <path d="M9 12c1.5 1 4.5 1 6 0" />
                </svg>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-white group-hover:text-[#00BFA5] transition-colors leading-tight">
                Malligai Dental Care
              </span>
              <span className="text-[11px] font-medium text-slate-400 tracking-wider uppercase">
                Sengottai, Tamil Nadu
              </span>
            </div>
          </a>

          {/* Zone 2: 4–5 single-line nav links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-300">
            <a href="#about" className="hover:text-[#00BFA5] transition-colors whitespace-nowrap shrink-0">
              About
            </a>
            <a href="#doctors" className="hover:text-[#00BFA5] transition-colors whitespace-nowrap shrink-0">
              Our Doctors
            </a>
            <a href="#treatments" className="hover:text-[#00BFA5] transition-colors whitespace-nowrap shrink-0">
              Treatments
            </a>
            <a href="#technology" className="hover:text-[#00BFA5] transition-colors whitespace-nowrap shrink-0">
              Technology
            </a>
            <a href="#gallery" className="hover:text-[#00BFA5] transition-colors whitespace-nowrap shrink-0">
              Clinic Tour
            </a>
            <a href="#contact" className="hover:text-[#00BFA5] transition-colors whitespace-nowrap shrink-0">
              Location & Hours
            </a>
          </nav>

          {/* Zone 3: Primary Actions */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Quick Call */}
            <a
              href="tel:9790060801"
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-200 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-all border border-white/10 whitespace-nowrap"
            >
              <Phone className="w-3.5 h-3.5 text-[#00BFA5]" />
              <span>97900 60801</span>
            </a>

            {/* Book Appointment CTA */}
            <button
              onClick={onBookClick}
              className="px-4 py-2 text-xs font-semibold text-white bg-[#008F87] hover:bg-[#00BFA5] rounded-lg transition-all shadow-md shadow-[#008F87]/20 flex items-center gap-2 whitespace-nowrap cursor-pointer active:scale-95"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Appointment</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-300 hover:text-white rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#10182D] border-b border-[#00BFA5]/20 px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-3 text-sm font-medium">
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-slate-200 hover:text-[#00BFA5] hover:bg-white/5 rounded-lg transition-colors"
            >
              About Clinic
            </a>
            <a
              href="#doctors"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-slate-200 hover:text-[#00BFA5] hover:bg-white/5 rounded-lg transition-colors"
            >
              Meet Our Doctors
            </a>
            <a
              href="#treatments"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-slate-200 hover:text-[#00BFA5] hover:bg-white/5 rounded-lg transition-colors"
            >
              Specialised Treatments
            </a>
            <a
              href="#technology"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-slate-200 hover:text-[#00BFA5] hover:bg-white/5 rounded-lg transition-colors"
            >
              Modern Technology (Scanner & X-Ray)
            </a>
            <a
              href="#gallery"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-slate-200 hover:text-[#00BFA5] hover:bg-white/5 rounded-lg transition-colors"
            >
              Clinic Gallery
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-slate-200 hover:text-[#00BFA5] hover:bg-white/5 rounded-lg transition-colors"
            >
              Location & Working Hours
            </a>

            <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
              <a
                href="tel:9790060801"
                className="flex items-center justify-center gap-2 w-full py-2.5 text-xs font-semibold text-slate-200 bg-white/5 rounded-lg border border-white/10"
              >
                <Phone className="w-4 h-4 text-[#00BFA5]" />
                <span>Call Clinic: 97900 60801</span>
              </a>
              <a
                href="https://wa.me/919790060801?text=Hello%20Malligai%20Dental%20Care,%20I%20would%20like%20to%20enquire%20about%20dental%20care."
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 text-xs font-semibold text-white bg-[#008F87] rounded-lg"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Us</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
