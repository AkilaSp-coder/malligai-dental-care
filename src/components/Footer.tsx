import React from 'react';
import { CLINIC_INFO, SERVICES, DOCTORS } from '../data/clinicData';
import { Phone, MapPin, Clock, MessageCircle, Heart, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-slate-800">
          {/* Clinic Brand & Mission (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-teal-500 text-slate-950 flex items-center justify-center font-bold shadow-md">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                  <path d="M12 2C8.5 2 6 4.5 6 8.5C6 11 7 13.5 7.8 16.5C8.3 18.5 8.8 21.5 10.5 21.9C11.5 22.2 12.5 20.8 12.8 19C13 17.5 13.2 16 13.8 16C14.4 16 14.6 17.5 14.8 19C15.1 20.8 16.1 22.2 17.1 21.9C18.8 21.5 19.3 18.5 19.8 16.5C20.6 13.5 21.6 11 21.6 8.5C21.6 4.5 19.1 2 15.6 2C14.4 2 13.3 2.5 12.8 3.3C12.3 2.5 11.2 2 12 2Z" />
                </svg>
              </div>
              <span className="font-heading font-bold text-xl text-white">
                {CLINIC_INFO.name}
              </span>
            </div>

            <p className="text-teal-400 text-sm font-semibold">
              {CLINIC_INFO.tagline}
            </p>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Providing gentle, painless, and modern dental solutions to Sengottai and Tenkasi district under the expert leadership of Dr. R. Patrajan and Dr. T. Sankari Patrajan.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href={CLINIC_INFO.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-700/30 hover:bg-emerald-700/50 text-emerald-300 border border-emerald-600/40 text-xs font-semibold transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp: {CLINIC_INFO.phone}</span>
              </a>
            </div>
          </div>

          {/* Quick Navigation Links (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <a href="#home" className="hover:text-teal-300 transition-colors">Home</a>
              </li>
              <li>
                <a href="#services" className="hover:text-teal-300 transition-colors">Dental Services</a>
              </li>
              <li>
                <a href="#about" className="hover:text-teal-300 transition-colors">About Clinic</a>
              </li>
              <li>
                <a href="#doctors" className="hover:text-teal-300 transition-colors">Our Doctors</a>
              </li>
              <li>
                <a href="#timings" className="hover:text-teal-300 transition-colors">Clinic Timings</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-teal-300 transition-colors">Contact & Map</a>
              </li>
            </ul>
          </div>

          {/* Key Services (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Featured Treatments
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              {SERVICES.slice(0, 5).map((service) => (
                <li key={service.id}>
                  <a href="#services" className="hover:text-teal-300 transition-colors flex items-center gap-1.5">
                    <span className="text-teal-500">·</span>
                    <span>{service.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Clinic Address & Hours (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Clinic Location
            </h4>
            <div className="flex items-start gap-2.5 text-xs text-slate-400 leading-relaxed">
              <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
              <span>{CLINIC_INFO.address}</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-slate-400">
              <Phone className="w-4 h-4 text-teal-400 shrink-0" />
              <a href={CLINIC_INFO.phoneHref} className="hover:text-teal-300">
                {CLINIC_INFO.phone}
              </a>
            </div>
            <div className="flex items-start gap-2.5 text-xs text-slate-400 pt-1">
              <Clock className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
              <div>
                <div>Morning: 10:00 AM – 2:00 PM</div>
                <div>Evening: 5:00 PM – 8:30 PM</div>
                <div className="text-amber-400">Sunday: Appointment only</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Sub-bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} Malligai Dental Care. Sengottai, Tamil Nadu. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <span>Dr. R. Patrajan & Dr. T. Sankari Patrajan</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors flex items-center gap-1 cursor-pointer"
              title="Back to top"
              aria-label="Back to top"
            >
              <span>Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
