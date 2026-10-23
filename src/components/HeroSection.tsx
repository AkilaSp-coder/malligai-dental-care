import React from 'react';
import { Hero3DTooth } from './Hero3DTooth';
import { Calendar, Phone, Award, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';

interface HeroSectionProps {
  onOpenBooking: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenBooking }) => {
  return (
    <section id="home" className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white pt-8 pb-16 lg:pt-14 lg:pb-24">
      {/* Subtle Background Glow Orbs */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-sky-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Clinic Headline & Pitch */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Trust Pill */}
            <div className="inline-flex items-center space-x-2 bg-slate-800/80 border border-slate-700/80 px-3.5 py-1.5 rounded-full text-xs font-semibold text-sky-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>16+ Years of Proven Clinical Excellence</span>
              <span className="text-slate-500">•</span>
              <span className="text-white font-semibold">ISO Standard Sterilization</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15]">
              World-Class Dental Care at{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-teal-200 to-white">
                Malligai Dental Care
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Experience gentle, comprehensive dentistry led by <span className="text-white font-semibold">Dr. R. Patrajan</span> (16 yrs exp.) and <span className="text-white font-semibold">Dr. T. Sankari Patrajan</span> (14 yrs exp.). Equipped with advanced <span className="text-sky-300 font-medium">Intraoral 3D Scanners</span> and <span className="text-sky-300 font-medium">Digital X-rays</span>.
            </p>

            {/* Key Clinic Feature Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 pt-2 text-left max-w-lg mx-auto lg:mx-0">
              <div className="flex items-center space-x-2 text-xs sm:text-sm text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Painless Wisdom Tooth Removal</span>
              </div>
              <div className="flex items-center space-x-2 text-xs sm:text-sm text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Aesthetic Smile Design</span>
              </div>
              <div className="flex items-center space-x-2 text-xs sm:text-sm text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Precision BPS Dentures</span>
              </div>
              <div className="flex items-center space-x-2 text-xs sm:text-sm text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Full Mouth Rehabilitation</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-4">
              <button
                onClick={onOpenBooking}
                className="w-full sm:w-auto bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-base px-7 py-3.5 rounded-xl shadow-lg shadow-sky-500/25 transition-all flex items-center justify-center space-x-2.5"
              >
                <Calendar className="w-5 h-5" />
                <span>Book Your Appointment</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={CLINIC_INFO.telLink}
                className="w-full sm:w-auto bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700 text-slate-200 hover:text-white font-semibold text-base px-6 py-3.5 rounded-xl transition-all flex items-center justify-center space-x-2"
              >
                <Phone className="w-4 h-4 text-white" />
                <span>{CLINIC_INFO.phone}</span>
              </a>
            </div>

            {/* Quick Metrics Bar */}
            <div className="pt-6 border-t border-slate-800/80 grid grid-cols-3 gap-4 text-center lg:text-left">
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-white">16+</p>
                <p className="text-xs text-slate-400 font-medium">Years Clinical Care</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-white">30K+</p>
                <p className="text-xs text-slate-400 font-medium">Patients Treated</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-white">100%</p>
                <p className="text-xs text-slate-400 font-medium">Sterile Protocols</p>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Tooth Interactive Hero Model */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="w-full max-w-md lg:max-w-none relative bg-gradient-to-b from-slate-900/80 to-slate-950/80 border border-slate-800/90 rounded-3xl p-3 shadow-2xl backdrop-blur-xl">
              <div className="flex items-center justify-between px-3 py-1.5 border-b border-slate-800/60 mb-1">
                <span className="text-xs font-semibold text-slate-400 flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <span>Interactive 3D Tooth Model</span>
                </span>
                <span className="text-[11px] text-white bg-white/10 border border-white/20 px-2 py-0.5 rounded-full font-medium">
                  3D Digital Workflow
                </span>
              </div>

              {/* 3D Canvas */}
              <Hero3DTooth />

              <div className="px-3 py-2 bg-slate-900/60 rounded-xl border border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
                <span>Natural Tooth Anatomy & Digital Scanning</span>
                <a href="#facilities" className="text-sky-400 hover:text-sky-300 font-semibold flex items-center space-x-1">
                  <span>Explore Facilities</span>
                  <span>→</span>
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
