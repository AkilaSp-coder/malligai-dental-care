import React from 'react';
import { ToothCanvas } from './3d/ToothCanvas';
import { CLINIC_INFO } from '../data/clinicData';
import { Calendar, ArrowRight, ShieldCheck, Clock, MapPin, Sparkles, MessageCircle } from 'lucide-react';

interface HeroProps {
  onBookClick: () => void;
  onExploreServices: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onBookClick, onExploreServices }) => {
  return (
    <section id="home" className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden bg-gradient-to-b from-teal-50/40 via-white to-slate-50">
      {/* Decorative ambient subtle background gradients */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-teal-200/25 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-80 h-80 bg-sky-200/25 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main 2-Column Hero Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Clinic Value Proposition */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Tagline kicker */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-100/70 border border-teal-200 text-teal-800 text-xs sm:text-sm font-semibold mb-6">
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              <span>{CLINIC_INFO.tagline}</span>
              <span className="text-teal-400">·</span>
              <span className="text-teal-700 font-medium">Sengottai, Tamil Nadu</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12] mb-6 text-balance">
              Your Smile Deserves the{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-700 via-teal-600 to-sky-700">
                Best Care.
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed max-w-2xl mb-8">
              Welcome to <strong className="text-slate-800 font-semibold">{CLINIC_INFO.name}</strong>, where gentle precision meets modern clinical technology. Under the experienced care of <strong className="text-slate-800 font-semibold">Dr. R. Patrajan</strong> and <strong className="text-slate-800 font-semibold">Dr. T. Sankari Patrajan</strong>, we offer pain-free treatments, root canals, braces, and cosmetic smile makeovers in a clean, hygienic environment.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto mb-8">
              <button
                onClick={onBookClick}
                className="w-full sm:w-auto px-7 py-3.5 bg-slate-900 hover:bg-teal-700 active:bg-teal-800 text-white font-semibold text-base rounded-xl transition-all shadow-md hover:shadow-teal-900/20 flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <Calendar className="w-4.5 h-4.5 text-teal-300" />
                <span>Book an Appointment</span>
              </button>

              <button
                onClick={onExploreServices}
                className="w-full sm:w-auto px-6 py-3.5 bg-white hover:bg-slate-100 text-slate-800 font-semibold text-base rounded-xl border border-slate-300 transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Explore Our Services</span>
                <ArrowRight className="w-4 h-4 text-slate-500" />
              </button>
            </div>

            {/* Direct WhatsApp Quick Chat Prompt */}
            <div className="flex items-center gap-3 text-sm text-slate-500">
              <a
                href={CLINIC_INFO.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-emerald-700 hover:text-emerald-800 font-semibold hover:underline"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Prefer WhatsApp? Chat instantly at {CLINIC_INFO.phone}</span>
              </a>
            </div>
          </div>

          {/* Right Column: Interactive 3D Tooth Visual */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="w-full h-[460px] sm:h-[500px] lg:h-[520px] rounded-3xl bg-gradient-to-b from-white to-teal-50/50 border border-slate-200/80 shadow-xl shadow-slate-200/50 relative overflow-hidden flex flex-col">
              {/* Subtle top banner */}
              <div className="absolute top-3 right-3 z-10 px-2.5 py-1 rounded-md bg-slate-900/5 text-[11px] font-semibold text-slate-600">
                Interactive 3D Demo
              </div>

              {/* 3D WebGL Canvas */}
              <ToothCanvas onExploreServices={onExploreServices} />
            </div>
          </div>
        </div>

        {/* 4-Column Feature & Trust Strip below Hero Split */}
        <div className="mt-14 pt-8 border-t border-slate-200/90 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-start gap-3.5 p-3 rounded-xl hover:bg-white/80 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-teal-700" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Hospital-Grade Hygiene</h4>
              <p className="text-xs text-slate-600 mt-0.5 leading-normal">
                100% autoclave sterilized instruments & medical disposables
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-3 rounded-xl hover:bg-white/80 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-800 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5 text-sky-700" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Two Daily Sessions</h4>
              <p className="text-xs text-slate-600 mt-0.5 leading-normal">
                Morning (10am–2pm) & Evening (5pm–8:30pm)
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-3 rounded-xl hover:bg-white/80 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-800 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-indigo-700" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Painless Dentistry</h4>
              <p className="text-xs text-slate-600 mt-0.5 leading-normal">
                Gentle technique, modern anesthesia & patient comfort
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-3 rounded-xl hover:bg-white/80 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5 text-emerald-700" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Central Sengottai</h4>
              <p className="text-xs text-slate-600 mt-0.5 leading-normal">
                Jawaharlal Nehru Road, Opposite Muthusamy Park
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
