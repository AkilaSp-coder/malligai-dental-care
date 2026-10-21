import React from 'react';
import { Phone, MessageCircle, Calendar } from 'lucide-react';

interface QuickMobileBarProps {
  onBookClick: () => void;
}

export const QuickMobileBar: React.FC<QuickMobileBarProps> = ({ onBookClick }) => {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-[#10182D]/95 backdrop-blur-md border-t border-[#00BFA5]/20 p-2 shadow-2xl">
      <div className="flex items-center gap-2 max-w-md mx-auto">
        {/* Call Button */}
        <a
          href="tel:9790060801"
          className="flex-1 py-2 px-3 rounded-lg bg-white/10 hover:bg-white/15 border border-white/10 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
        >
          <Phone className="w-3.5 h-3.5 text-[#00BFA5]" />
          <span>Call Clinic</span>
        </a>

        {/* WhatsApp Button */}
        <a
          href="https://wa.me/919790060801?text=Hello%20Malligai%20Dental%20Care,%20I%20would%20like%20to%20enquire%20for%20an%20appointment."
          target="_blank"
          rel="noreferrer"
          className="flex-1 py-2 px-3 rounded-lg bg-[#008F87] hover:bg-[#00BFA5] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          <span>WhatsApp</span>
        </a>

        {/* Book Button */}
        <button
          onClick={onBookClick}
          className="py-2 px-3.5 rounded-lg bg-[#00BFA5] text-[#10182D] text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-sm active:scale-95 cursor-pointer"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Book</span>
        </button>
      </div>
    </div>
  );
};
