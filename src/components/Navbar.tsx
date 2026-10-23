import React, { useState, useEffect } from 'react';
import { Phone, Calendar, Menu, X, Clock, MapPin } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';

interface NavbarProps {
  onOpenBooking: (prefillService?: string, prefillDoctor?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Services', href: '#services' },
    { label: 'Before & After', href: '#transformations' },
    { label: 'Facilities', href: '#facilities' },
    { label: 'Our Doctors', href: '#doctors' },
    { label: 'Clinic Tour', href: '#gallery' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      {/* Top Information Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 border-b border-slate-800 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Clinic Hours & Location */}
          <div className="flex items-center space-x-6 min-w-0">
            <div className="flex items-center space-x-1.5 truncate">
              <Clock className="w-3.5 h-3.5 text-white flex-shrink-0" />
              <span className="truncate">
                Mon - Sat: 9:30 AM – 1:30 PM & 4:30 PM – 9:00 PM | Sun: 10:00 AM – 1:00 PM
              </span>
            </div>
            <div className="hidden lg:flex items-center space-x-1.5 flex-shrink-0">
              <MapPin className="w-3.5 h-3.5 text-sky-400 flex-shrink-0" />
              <span>Main Road, Tamil Nadu</span>
            </div>
          </div>

          {/* Quick Phone & WhatsApp Link */}
          <div className="flex items-center space-x-4 flex-shrink-0">
            <a
              href={CLINIC_INFO.telLink}
              className="flex items-center space-x-1.5 text-slate-200 hover:text-white transition-colors font-semibold"
            >
              <Phone className="w-3.5 h-3.5 text-white flex-shrink-0" />
              <span>{CLINIC_INFO.phone}</span>
            </a>
            <span className="text-slate-700">|</span>
            <a
              href={CLINIC_INFO.whatsappEnquiryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-slate-200/80 py-2.5 sm:py-3'
            : 'bg-white border-b border-slate-100 py-3 sm:py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-3 lg:gap-6">
            
            {/* Clinic Brand & Logo */}
            <a href="#home" className="flex items-center space-x-2.5 sm:space-x-3 group flex-shrink-0">
              {/* Real Logo Emblem styled from the clinic's exterior sign */}
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-sky-950 flex items-center justify-center p-2 shadow-md border border-slate-700 group-hover:scale-105 transition-transform flex-shrink-0">
                <svg
                  viewBox="0 0 24 24"
                  className="w-full h-full text-white fill-current"
                >
                  <path d="M12 2C8.5 2 6 4.5 6 8c0 2.2.8 4.2 2 5.5.8.9 1.3 2 1.5 3.2.3 1.8 1.1 4.3 2.5 4.3s2.2-2.5 2.5-4.3c.2-1.2.7-2.3 1.5-3.2 1.2-1.3 2-3.3 2-5.5 0-3.5-2.5-6-6-6zm-2.2 4.5c.4 0 .8.4.8.8 0 .5-.4.9-.8.9-.5 0-.8-.4-.8-.9 0-.4.3-.8.8-.8zm4.4 0c.4 0 .8.4.8.8 0 .5-.4.9-.8.9-.5 0-.8-.4-.8-.9 0-.4.4-.8.8-.8z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center">
                  <span className="font-extrabold text-base sm:text-lg lg:text-xl text-slate-900 tracking-tight leading-tight whitespace-nowrap">
                    MALLIGAI <span className="bg-slate-900 text-white font-black px-1.5 py-0.5 rounded-md ml-1 shadow-sm text-sm sm:text-base">DENTAL</span>
                  </span>
                </div>
                <p className="text-[10px] sm:text-[11px] font-medium text-slate-500 uppercase tracking-wider leading-none mt-0.5 whitespace-nowrap">
                  Care & Implant Centre
                </p>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-4 xl:space-x-6 flex-shrink-0">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-[13px] xl:text-sm font-semibold text-slate-700 hover:text-sky-600 transition-colors whitespace-nowrap py-1 relative hover:after:w-full after:w-0 after:h-0.5 after:bg-sky-600 after:absolute after:bottom-0 after:left-0 after:transition-all"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Right Action Buttons */}
            <div className="hidden sm:flex items-center space-x-2.5 lg:space-x-3 flex-shrink-0">
              {/* Phone Icon Button */}
              <a
                href={CLINIC_INFO.telLink}
                className="w-10 h-10 rounded-xl border border-slate-200 hover:border-sky-300 text-slate-700 hover:text-sky-600 hover:bg-sky-50/50 transition-all flex items-center justify-center flex-shrink-0"
                title={`Call ${CLINIC_INFO.phone}`}
                aria-label={`Call clinic at ${CLINIC_INFO.phone}`}
              >
                <Phone className="w-4 h-4" />
              </a>

              {/* Book Appointment CTA */}
              <button
                onClick={() => onOpenBooking()}
                className="h-10 bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-500 hover:to-blue-600 text-white text-xs sm:text-sm font-bold px-4 lg:px-5 rounded-xl shadow-md shadow-sky-600/20 hover:shadow-lg hover:shadow-sky-600/30 transition-all flex items-center space-x-2 whitespace-nowrap flex-shrink-0"
              >
                <Calendar className="w-4 h-4 flex-shrink-0" />
                <span>Book Appointment</span>
              </button>
            </div>

            {/* Mobile Controls */}
            <div className="lg:hidden flex items-center space-x-2 flex-shrink-0">
              {/* Compact Mobile Book CTA */}
              <button
                onClick={() => onOpenBooking()}
                className="h-9 bg-sky-600 text-white text-xs font-bold px-3 rounded-lg flex items-center space-x-1 sm:hidden flex-shrink-0 shadow-sm"
              >
                <Calendar className="w-3.5 h-3.5 flex-shrink-0" />
                <span>Book</span>
              </button>

              {/* Hamburger Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center text-slate-700 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors flex-shrink-0"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top-2">
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2.5 px-3 rounded-lg text-sm font-semibold text-slate-800 hover:bg-slate-50 hover:text-sky-600 transition-colors"
                >
                  {link.label}
                </a>
              ))}

              {/* Mobile Actions Drawer */}
              <div className="pt-4 mt-2 border-t border-slate-100 flex flex-col space-y-2.5">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenBooking();
                  }}
                  className="w-full h-11 bg-gradient-to-r from-sky-600 to-blue-700 text-white font-bold rounded-xl flex items-center justify-center space-x-2 shadow-md text-sm"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Appointment Now</span>
                </button>

                <div className="flex items-center space-x-2 pt-1">
                  <a
                    href={CLINIC_INFO.telLink}
                    className="flex-1 h-10 border border-slate-300 hover:border-slate-400 rounded-xl font-semibold text-xs text-slate-700 flex items-center justify-center space-x-1.5 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-sky-600" />
                    <span>Call: {CLINIC_INFO.phone}</span>
                  </a>
                  <a
                    href={CLINIC_INFO.whatsappEnquiryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 h-10 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-semibold text-xs flex items-center justify-center space-x-1.5 transition-colors"
                  >
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
