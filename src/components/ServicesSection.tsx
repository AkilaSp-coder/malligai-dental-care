import React, { useState } from 'react';
import { SERVICES } from '../data/clinicData';
import { ServiceItem } from '../types';
import { 
  Sparkles, 
  ShieldCheck, 
  Activity, 
  Layers, 
  Zap, 
  Anchor, 
  Smile, 
  HeartPulse, 
  ArrowRight, 
  CheckCircle2,
  Stethoscope
} from 'lucide-react';

interface ServicesSectionProps {
  onOpenBooking: (serviceName?: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenBooking }) => {
  const [activeCategory, setActiveCategory] = useState<'All' | 'Requested' | 'Restorative' | 'Cosmetic'>('All');

  const getIcon = (name: string) => {
    switch (name) {
      case 'Sparkles': return <Sparkles className="w-5 h-5" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5" />;
      case 'Activity': return <Activity className="w-5 h-5" />;
      case 'Layers': return <Layers className="w-5 h-5" />;
      case 'Zap': return <Zap className="w-5 h-5" />;
      case 'Anchor': return <Anchor className="w-5 h-5" />;
      case 'Smile': return <Smile className="w-5 h-5" />;
      case 'HeartPulse': return <HeartPulse className="w-5 h-5" />;
      default: return <Stethoscope className="w-5 h-5" />;
    }
  };

  const filteredServices = SERVICES.filter((service) => {
    if (activeCategory === 'All') return true;
    if (activeCategory === 'Requested') return service.isNewRequested;
    if (activeCategory === 'Restorative') return service.category === 'Restorative' || service.category === 'Speciality';
    if (activeCategory === 'Cosmetic') return service.category === 'Cosmetic';
    return true;
  });

  return (
    <section id="services" className="py-20 bg-slate-50 text-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 bg-sky-100 border border-sky-200 px-3.5 py-1.5 rounded-full text-xs font-bold text-sky-800 uppercase tracking-wider mb-4">
            <Stethoscope className="w-3.5 h-3.5 text-sky-600" />
            <span>Comprehensive Dental Treatments</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-4">
            Tailored Treatments for Lifelong Dental Health
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            From modern aesthetic smile makeovers to biofunctional prosthetics and gentle oral surgery, each treatment is performed with patient comfort and clinical precision.
          </p>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            <button
              onClick={() => setActiveCategory('All')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeCategory === 'All'
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              All Treatments ({SERVICES.length})
            </button>
            <button
              onClick={() => setActiveCategory('Requested')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center space-x-1.5 ${
                activeCategory === 'Requested'
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'bg-slate-100 text-slate-800 hover:bg-slate-200 border border-slate-300'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Speciality Treatments (4)</span>
            </button>
            <button
              onClick={() => setActiveCategory('Restorative')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeCategory === 'Restorative'
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              Restorative & Surgery
            </button>
            <button
              onClick={() => setActiveCategory('Cosmetic')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeCategory === 'Cosmetic'
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              Smile & Orthodontics
            </button>
          </div>
        </div>

        {/* 4 Requested Treatments Spotlight Callout */}
        {activeCategory === 'All' && (
          <div className="mb-10 bg-gradient-to-r from-sky-900 via-slate-900 to-indigo-950 rounded-2xl p-6 text-white shadow-lg border border-slate-800">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-3 text-center md:text-left">
                <div className="w-12 h-12 rounded-xl bg-white/15 text-white border border-white/20 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-extrabold text-lg text-white">Speciality Care Available at Malligai Dental</h3>
                  <p className="text-slate-300 text-xs sm:text-sm">
                    Smile Design • BPS Dentures • Painless Wisdom Tooth Removal • Full Mouth Rehabilitation
                  </p>
                </div>
              </div>
              <button
                onClick={() => onOpenBooking('Speciality Consultation')}
                className="bg-white hover:bg-slate-100 text-slate-950 font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-md transition-all whitespace-nowrap"
              >
                Book Speciality Consult
              </button>
            </div>
          </div>
        )}

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className={`bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border flex flex-col justify-between group ${
                service.isNewRequested
                  ? 'border-sky-300/80 ring-1 ring-sky-200/60 bg-gradient-to-b from-sky-50/40 via-white to-white'
                  : 'border-slate-200/90 hover:border-sky-300'
              }`}
            >
              <div>
                {/* Header Icon & Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 ${
                      service.isNewRequested
                        ? 'bg-sky-600 text-white shadow-md shadow-sky-600/30'
                        : 'bg-slate-100 text-slate-800 group-hover:bg-sky-50 group-hover:text-sky-600'
                    }`}
                  >
                    {getIcon(service.iconName)}
                  </div>

                  {service.badge && (
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                        service.isNewRequested
                          ? 'bg-slate-900 text-white border border-slate-700'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {service.badge}
                    </span>
                  )}
                </div>

                {/* Service Title */}
                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-sky-600 transition-colors">
                  {service.title}
                </h3>

                {/* Short Patient-Friendly Description */}
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
                  {service.shortDescription}
                </p>

                {/* Feature Bullet points */}
                <div className="space-y-1.5 pt-3 border-t border-slate-100 mb-6">
                  {service.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-start space-x-2 text-xs text-slate-600">
                      <CheckCircle2 className="w-3.5 h-3.5 text-sky-500 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Book Button */}
              <button
                onClick={() => onOpenBooking(service.title)}
                className="w-full py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-sky-600 hover:text-white text-slate-800 text-xs font-bold transition-all flex items-center justify-center space-x-1.5 group/btn"
              >
                <span>Book This Treatment</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
