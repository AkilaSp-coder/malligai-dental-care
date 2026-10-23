import React from 'react';
import { CLINIC_INFO, DOCTORS } from '../data/clinicData';
import { Phone, MapPin, Clock, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking }) => {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center p-1.5 shadow-md">
                <svg viewBox="0 0 24 24" className="w-full h-full text-white fill-current">
                  <path d="M12 2C8.5 2 6 4.5 6 8c0 2.2.8 4.2 2 5.5.8.9 1.3 2 1.5 3.2.3 1.8 1.1 4.3 2.5 4.3s2.2-2.5 2.5-4.3c.2-1.2.7-2.3 1.5-3.2 1.2-1.3 2-3.3 2-5.5 0-3.5-2.5-6-6-6zm-2.2 4.5c.4 0 .8.4.8.8 0 .5-.4.9-.8.9-.5 0-.8-.4-.8-.9 0-.4.3-.8.8-.8zm4.4 0c.4 0 .8.4.8.8 0 .5-.4.9-.8.9-.5 0-.8-.4-.8-.9 0-.4.4-.8.8-.8z" />
                </svg>
              </div>
              <span className="font-extrabold text-white text-lg tracking-tight">
                MALLIGAI <span className="text-white font-black">DENTAL</span>
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Premier multi-speciality dental healthcare facility committed to gentle patient care, advanced 3D intraoral digital impressions, low-radiation digital radiography, and long-lasting smile transformations.
            </p>
            <div className="flex items-center space-x-2 text-xs text-emerald-400 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Hospital Grade Autoclave Sterilization</span>
            </div>
          </div>

          {/* Doctors On Duty */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider">Chief Dental Surgeons</h4>
            <div className="space-y-3">
              {DOCTORS.map((doc) => (
                <div key={doc.id} className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                  <p className="font-bold text-white text-xs">{doc.name}, {doc.degree}</p>
                  <p className="text-[11px] text-slate-400">{doc.college}</p>
                  <span className="inline-block mt-1 text-[10px] font-semibold text-white bg-slate-800 border border-slate-700 px-2 py-0.5 rounded">
                    {doc.experience}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Treatments */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider">Speciality Treatments</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#services" className="hover:text-white transition-colors flex items-center space-x-1.5">
                  <span className="text-white">•</span>
                  <span>Smile Design</span>
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors flex items-center space-x-1.5">
                  <span className="text-white">•</span>
                  <span>BPS Dentures</span>
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors flex items-center space-x-1.5">
                  <span className="text-white">•</span>
                  <span>Painless Wisdom Tooth Removal</span>
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors flex items-center space-x-1.5">
                  <span className="text-white">•</span>
                  <span>Full Mouth Rehabilitation</span>
                </a>
              </li>
              <li>
                <a href="#transformations" className="hover:text-white transition-colors flex items-center space-x-1.5 text-sky-400">
                  <span className="text-sky-400">•</span>
                  <span>Before & After Transformations</span>
                </a>
              </li>
              <li>
                <a href="#facilities" className="hover:text-sky-300 transition-colors flex items-center space-x-1.5 text-sky-400">
                  <span className="text-sky-400">•</span>
                  <span>Intraoral Scanner & Digital X-ray</span>
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors flex items-center space-x-1.5">
                  <span>•</span>
                  <span>Dental Implants & Root Canals</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Direct Contact & Hours */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider">Connect & Visit</h4>
            <div className="space-y-2 text-xs">
              <a
                href={CLINIC_INFO.telLink}
                className="flex items-center space-x-2 text-slate-300 hover:text-white"
              >
                <Phone className="w-3.5 h-3.5 text-white flex-shrink-0" />
                <span>{CLINIC_INFO.phone}</span>
              </a>
              <div className="flex items-start space-x-2 text-slate-400">
                <MapPin className="w-3.5 h-3.5 text-sky-400 flex-shrink-0 mt-0.5" />
                <span>{CLINIC_INFO.address}</span>
              </div>
              <div className="flex items-start space-x-2 text-slate-400">
                <Clock className="w-3.5 h-3.5 text-slate-400 flex-shrink-0 mt-0.5" />
                <span>Mon-Sat: 9:30 AM–1:30 PM & 4:30 PM–9:00 PM</span>
              </div>
            </div>

            <button
              onClick={onOpenBooking}
              className="w-full mt-3 py-2.5 bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs rounded-xl shadow-md transition-all"
            >
              Book Consultation Now
            </button>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>&copy; {new Date().getFullYear()} Malligai Dental Care. All rights reserved.</p>
          <div className="flex items-center space-x-4">
            <a href="#home" className="hover:text-slate-400 transition-colors">Home</a>
            <a href="#services" className="hover:text-slate-400 transition-colors">Services</a>
            <a href="#transformations" className="hover:text-slate-400 transition-colors">Before & After</a>
            <a href="#facilities" className="hover:text-slate-400 transition-colors">Facilities</a>
            <a href="#doctors" className="hover:text-slate-400 transition-colors">Doctors</a>
            <a href="#contact" className="hover:text-slate-400 transition-colors">Contact</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
