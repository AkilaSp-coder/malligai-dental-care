import React, { useState, useEffect } from 'react';
import { CLINIC_INFO } from '../data/clinicData';
import { Phone, Calendar, Menu, X, Sparkles } from 'lucide-react';

interface NavbarProps {
  onBookClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onBookClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Services', href: '#services' },
    { label: 'About', href: '#about' },
    { label: 'Doctors', href: '#doctors' },
    { label: 'Timings', href: '#timings' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/80 py-3.5'
          : 'bg-white/80 backdrop-blur-sm border-b border-slate-100 py-4.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark (Single text element with custom clinic icon) */}
          <a
            href="#home"
            className="group flex items-center gap-2.5 text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 rounded-lg whitespace-nowrap shrink-0"
            aria-label="Malligai Dental Care Home"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-slate-900 via-teal-800 to-teal-600 flex items-center justify-center text-white shadow-md shadow-teal-900/10 transition-transform group-hover:scale-105">
              <svg
                viewBox="0 0 24 24"
                className="w-5 h-5 fill-current"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 2C8.5 2 6 4.5 6 8.5C6 11 7 13.5 7.8 16.5C8.3 18.5 8.8 21.5 10.5 21.9C11.5 22.2 12.5 20.8 12.8 19C13 17.5 13.2 16 13.8 16C14.4 16 14.6 17.5 14.8 19C15.1 20.8 16.1 22.2 17.1 21.9C18.8 21.5 19.3 18.5 19.8 16.5C20.6 13.5 21.6 11 21.6 8.5C21.6 4.5 19.1 2 15.6 2C14.4 2 13.3 2.5 12.8 3.3C12.3 2.5 11.2 2 12 2Z" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-bold text-lg sm:text-xl text-slate-900 tracking-tight leading-tight">
                Malligai Dental Care
              </span>
              <span className="text-[11px] font-medium text-teal-700 tracking-wide uppercase hidden sm:block">
                Sengottai · Tamil Nadu
              </span>
            </div>
          </a>

          {/* Zone 2: Navigation Links (Clean single-line text links) */}
          <nav
            className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600"
            aria-label="Primary Navigation"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-teal-700 transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 border-transparent hover:border-teal-600"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: 1 Primary Action (Phone & Appointment CTA) */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href={CLINIC_INFO.phoneHref}
              className="hidden lg:flex items-center gap-2 text-xs font-semibold text-slate-700 hover:text-teal-700 transition-colors px-3 py-2 rounded-lg hover:bg-slate-100"
              title="Call Malligai Dental Care"
            >
              <Phone className="w-3.5 h-3.5 text-teal-600" />
              <span>{CLINIC_INFO.phone}</span>
            </a>

            <button
              onClick={onBookClick}
              className="px-4.5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-slate-900 hover:bg-teal-700 active:bg-teal-800 rounded-xl transition-all shadow-sm hover:shadow-teal-900/15 flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-teal-300" />
              <span>Book Appointment</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-600"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-base font-medium text-slate-800 hover:text-teal-700 hover:bg-slate-50 rounded-lg transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col gap-2.5">
            <a
              href={CLINIC_INFO.phoneHref}
              className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800 hover:bg-slate-50 transition-colors"
            >
              <Phone className="w-4 h-4 text-teal-600" />
              <span>Call {CLINIC_INFO.phone}</span>
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onBookClick();
              }}
              className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-teal-700 transition-colors"
            >
              <Calendar className="w-4 h-4 text-teal-300" />
              <span>Book Appointment</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
