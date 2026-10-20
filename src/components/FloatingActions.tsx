import React, { useState, useEffect } from 'react';
import { CLINIC_INFO } from '../data/clinicData';
import { MessageCircle, Phone, ArrowUp } from 'lucide-react';

export const FloatingActions: React.FC = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2.5 pointer-events-none">
      {/* Scroll to Top */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="pointer-events-auto p-2.5 rounded-full bg-white/90 hover:bg-white text-slate-700 shadow-md border border-slate-200 transition-all hover:scale-105 active:scale-95 cursor-pointer"
          title="Back to top"
          aria-label="Scroll to top of page"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}

      {/* Floating WhatsApp Action Pill */}
      <a
        href={CLINIC_INFO.whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="pointer-events-auto flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-lg shadow-emerald-950/20 transition-all hover:scale-105 active:scale-95 border border-emerald-500"
        title="Chat on WhatsApp"
        aria-label="Chat with Malligai Dental Care on WhatsApp"
      >
        <MessageCircle className="w-4 h-4 fill-current" />
        <span className="hidden sm:inline">WhatsApp Us</span>
      </a>
    </div>
  );
};
