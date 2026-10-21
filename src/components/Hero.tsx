import React from 'react';
import { Calendar, MessageCircle, Phone, Sparkles, ShieldCheck, Clock, MapPin, Eye } from 'lucide-react';
import { ToothCanvas } from './3d/ToothCanvas';

interface HeroProps {
  onBookClick: () => void;
  onReplayIntro?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onBookClick, onReplayIntro }) => {
  return (
    <section className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden">
      {/* Background radial gradients for dental atmosphere */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[#008F87]/12 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 -right-24 w-[450px] h-[450px] bg-[#00BFA5]/10 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Headline, Tagline, CTAs & Key Trust Markers (7 cols on lg) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Unboxed Metadata Trust Marker (Zero-Pill discipline) */}
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wide text-[#00BFA5] mb-4">
              <span className="uppercase tracking-wider">Malligai Dental Care</span>
              <span aria-hidden="true" className="text-slate-500">·</span>
              <span className="text-slate-300">Sengottai, Tamil Nadu</span>
              <span aria-hidden="true" className="text-slate-500">·</span>
              <span className="text-slate-300">Est. Proven Excellence</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-extrabold text-white leading-[1.12] tracking-tight mb-4 text-balance">
              Your Smile Deserves the{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#EAF7FA] to-[#00BFA5]">
                Best Care.
              </span>
            </h1>

            {/* Tagline */}
            <p className="text-xl sm:text-2xl font-semibold text-[#00BFA5] mb-4">
              Recover Your Lovely Smile!
            </p>

            {/* Descriptive Body */}
            <p className="text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed mb-8">
              Experience modern, compassionate dentistry in Sengottai with advanced Intraoral 3D scanning, 
              precision BPS dentures, painless wisdom tooth extractions, and low-dose digital diagnostics 
              led by experienced clinicians.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto mb-8">
              {/* Book Appointment CTA */}
              <button
                onClick={onBookClick}
                className="w-full sm:w-auto px-6 py-3.5 text-sm font-bold text-white bg-[#008F87] hover:bg-[#00BFA5] rounded-xl transition-all shadow-lg shadow-[#008F87]/25 flex items-center justify-center gap-2.5 cursor-pointer active:scale-95 group"
              >
                <Calendar className="w-4 h-4 transition-transform group-hover:scale-110" />
                <span>Book an Appointment</span>
              </button>

              {/* WhatsApp Us CTA */}
              <a
                href="https://wa.me/919790060801?text=Hello%20Malligai%20Dental%20Care,%20I%20would%20like%20to%20enquire%20for%20a%20dental%20appointment."
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 text-sm font-bold text-slate-100 hover:text-white bg-white/10 hover:bg-white/15 border border-[#00BFA5]/30 hover:border-[#00BFA5] rounded-xl transition-all flex items-center justify-center gap-2.5 active:scale-95"
              >
                <MessageCircle className="w-4 h-4 text-[#00BFA5]" />
                <span>WhatsApp Us</span>
              </a>

              {/* Click to Call */}
              <a
                href="tel:9790060801"
                className="w-full sm:w-auto px-5 py-3.5 text-sm font-semibold text-slate-300 hover:text-white flex items-center justify-center gap-2 hover:bg-white/5 rounded-xl transition-colors"
              >
                <Phone className="w-4 h-4 text-[#008F87]" />
                <span>Call: 97900 60801</span>
              </a>
            </div>

            {/* Doctor Experience Proof Strip (Claim-to-Proof Adjacency) */}
            <div className="w-full pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs text-slate-300">
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-bold text-white tabular-nums">16+ & 14+</span>
                <span className="text-slate-400 font-medium">Years Clinical Experience</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-bold text-[#00BFA5] flex items-center gap-1">
                  <span>3D</span>
                  <span className="text-xs font-normal text-slate-300">Optical</span>
                </span>
                <span className="text-slate-400 font-medium">Intraoral Scanner</span>
              </div>
              <div className="flex flex-col col-span-2 sm:col-span-1">
                <span className="text-xl sm:text-2xl font-bold text-white">BPS®</span>
                <span className="text-slate-400 font-medium">Precision Biofunctional Dentures</span>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Interactive Tooth Visual (5 cols on lg) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            {/* 3D Visual Container Card with subtle glassmorphic ring */}
            <div className="w-full max-w-md lg:max-w-none aspect-square sm:h-[460px] rounded-3xl glass-card relative overflow-hidden flex flex-col shadow-2xl border border-[#00BFA5]/25">
              {/* Subtle top indicator bar */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-xs z-20 pointer-events-none">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#10182D]/80 border border-white/10 text-slate-300 text-[11px]">
                  <Sparkles className="w-3 h-3 text-[#00BFA5]" />
                  <span>Interactive 3D Molar Model</span>
                </div>
                {onReplayIntro && (
                  <button
                    onClick={onReplayIntro}
                    className="pointer-events-auto text-[11px] font-medium text-slate-400 hover:text-white px-2 py-1 rounded bg-[#10182D]/80 hover:bg-[#10182D] transition-colors border border-white/5 cursor-pointer flex items-center gap-1"
                    title="Replay cinematic opening"
                  >
                    <Eye className="w-3 h-3 text-[#00BFA5]" />
                    <span>Replay Intro</span>
                  </button>
                )}
              </div>

              {/* Three.js Canvas */}
              <div className="w-full h-full flex-1">
                <ToothCanvas interactive={true} autoRotate={true} showControls={true} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
