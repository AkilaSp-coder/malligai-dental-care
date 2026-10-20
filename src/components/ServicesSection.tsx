import React from 'react';
import { DentalService } from '../types';
import { SERVICES } from '../data/clinicData';
import { Sparkles, ShieldCheck, Smile, Activity, Sun, HeartHandshake, Clock, ArrowRight, Check } from 'lucide-react';

interface ServicesSectionProps {
  onSelectService: (service: DentalService) => void;
  onBookService: (service: DentalService) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService, onBookService }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-teal-600" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-teal-600" />;
      case 'Smile':
        return <Smile className="w-6 h-6 text-teal-600" />;
      case 'Activity':
        return <Activity className="w-6 h-6 text-teal-600" />;
      case 'Sun':
        return <Sun className="w-6 h-6 text-teal-600" />;
      case 'HeartHandshake':
      default:
        return <HeartHandshake className="w-6 h-6 text-teal-600" />;
    }
  };

  return (
    <section id="services" className="py-20 lg:py-28 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-700 mb-2">
            <span>Specialized Clinical Procedures</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Comprehensive Dental Care for Every Smile
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            From routine preventive checkups to advanced single-sitting root canals and cosmetic smile restorations, our treatments are tailored with modern clinical precision and gentle care.
          </p>
        </div>

        {/* Services Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              className="group relative bg-slate-50/70 hover:bg-white rounded-2xl p-7 border border-slate-200/90 hover:border-teal-300 transition-all duration-300 hover:shadow-xl hover:shadow-teal-950/5 flex flex-col justify-between"
            >
              <div>
                {/* Top Row: Icon + Duration */}
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center group-hover:scale-105 transition-transform">
                    {getIcon(service.iconName)}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500 bg-white px-2.5 py-1 rounded-full border border-slate-200/80">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{service.duration}</span>
                  </div>
                </div>

                {/* Service Title & Tagline */}
                <h3 className="font-heading text-xl font-bold text-slate-900 group-hover:text-teal-900 transition-colors">
                  {service.title}
                </h3>
                <p className="text-xs font-medium text-teal-700 mt-1 mb-3">
                  {service.tagline}
                </p>
                <p className="text-sm text-slate-600 leading-relaxed mb-5">
                  {service.description}
                </p>

                {/* Key Benefits Preview */}
                <div className="space-y-2 mb-6">
                  {service.benefits.slice(0, 2).map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                      <Check className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-200/70 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => onSelectService(service)}
                  className="text-xs font-bold text-teal-800 hover:text-teal-950 flex items-center gap-1 group-hover:gap-1.5 transition-all py-1.5 cursor-pointer"
                >
                  <span>Procedure Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={() => onBookService(service)}
                  className="px-3.5 py-1.5 bg-slate-900 hover:bg-teal-700 active:bg-teal-800 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                >
                  Book Slot
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Reassurance Banner */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-teal-950 text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="font-heading text-lg sm:text-xl font-bold text-white">
              Not sure which treatment is right for your tooth condition?
            </h4>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl">
              Book a primary oral examination and diagnosis with Dr. R. Patrajan or Dr. T. Sankari Patrajan. We explain every finding thoroughly before starting any procedure.
            </p>
          </div>
          <button
            onClick={() => onBookService(SERVICES[0])}
            className="px-5 py-3 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-sm rounded-xl transition-colors whitespace-nowrap shrink-0 shadow-md cursor-pointer"
          >
            Schedule Consultation
          </button>
        </div>
      </div>
    </section>
  );
};
