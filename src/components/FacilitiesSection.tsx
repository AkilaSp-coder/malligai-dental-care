import React, { useState } from 'react';
import { FACILITIES } from '../data/clinicData';
import { CheckCircle2, Cpu, ShieldCheck, Zap, ZoomIn, ArrowRight } from 'lucide-react';

interface FacilitiesSectionProps {
  onOpenBooking: (serviceName?: string) => void;
  onSelectPhoto?: (photoSrc: string, title: string) => void;
}

export const FacilitiesSection: React.FC<FacilitiesSectionProps> = ({ onOpenBooking, onSelectPhoto }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'intraoral-scanner' | 'digital-x-ray'>('all');

  const displayedFacilities = activeTab === 'all' 
    ? FACILITIES 
    : FACILITIES.filter(f => f.id === activeTab);

  return (
    <section id="facilities" className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-sky-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 bg-sky-500/15 border border-sky-400/30 px-3.5 py-1.5 rounded-full text-xs font-bold text-sky-300 uppercase tracking-wider mb-4">
            <Cpu className="w-3.5 h-3.5 text-sky-400" />
            <span>Modern Clinic Technology</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-4">
            Advanced Dental Facilities
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            At Malligai Dental Care, we invest in hospital-grade digital dental equipment to provide comfortable, precise, and minimally invasive clinical treatments.
          </p>

          {/* Quick Filter Switch */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'all'
                  ? 'bg-sky-600 text-white shadow-md shadow-sky-600/30'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              All Facilities
            </button>
            <button
              onClick={() => setActiveTab('intraoral-scanner')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'intraoral-scanner'
                  ? 'bg-sky-600 text-white shadow-md shadow-sky-600/30'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Intraoral Scanner
            </button>
            <button
              onClick={() => setActiveTab('digital-x-ray')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'digital-x-ray'
                  ? 'bg-sky-600 text-white shadow-md shadow-sky-600/30'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Digital X-ray
            </button>
          </div>
        </div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {displayedFacilities.map((facility) => (
            <div
              key={facility.id}
              className="bg-slate-800/80 rounded-3xl border border-slate-700/80 overflow-hidden shadow-xl hover:border-sky-500/50 transition-all flex flex-col group"
            >
              {/* Real Clinic Photo Container */}
              <div className="relative aspect-video sm:aspect-[16/10] bg-slate-950 overflow-hidden cursor-pointer"
                onClick={() => onSelectPhoto && onSelectPhoto(facility.imageSrc, facility.name)}
              >
                <img
                  src={facility.imageSrc}
                  alt={facility.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-70" />
                
                {/* Verified Clinic Equipment Badge */}
                <div className="absolute top-4 left-4 bg-slate-900/90 backdrop-blur-md border border-slate-700/80 px-3 py-1.5 rounded-full text-xs font-semibold text-white flex items-center space-x-1.5 shadow-lg">
                  <ShieldCheck className="w-3.5 h-3.5 text-white" />
                  <span>Real Clinic Equipment</span>
                </div>

                {/* Click to Zoom hint */}
                <div className="absolute bottom-4 right-4 bg-slate-900/80 hover:bg-slate-900 text-slate-200 px-3 py-1.5 rounded-lg text-xs font-medium flex items-center space-x-1.5 backdrop-blur-sm border border-slate-700">
                  <ZoomIn className="w-3.5 h-3.5 text-sky-400" />
                  <span>View Full Photo</span>
                </div>
              </div>

              {/* Photo Caption Note */}
              <div className="px-5 py-2.5 bg-slate-950/60 border-b border-slate-700/60 text-xs text-slate-400 font-medium">
                {facility.imageCaption}
              </div>

              {/* Facility Content Details */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                <div>
                  <div className="inline-block bg-sky-900/50 border border-sky-600/40 text-sky-300 text-xs font-bold px-3 py-1 rounded-full mb-3">
                    {facility.badge}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">
                    {facility.name}
                  </h3>
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 font-normal">
                    {facility.description}
                  </p>

                  {/* Key Patient Benefits */}
                  <div className="space-y-2.5 pt-2 border-t border-slate-700/60">
                    <h4 className="text-xs uppercase font-bold tracking-wider text-slate-400">
                      Key Clinical Advantages:
                    </h4>
                    {facility.keyBenefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-start space-x-2.5 text-xs sm:text-sm text-slate-200">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Booking Prompt */}
                <div className="pt-4 border-t border-slate-700/60 flex items-center justify-between">
                  <span className="text-xs text-slate-400">Integrated into all modern diagnostics</span>
                  <button
                    onClick={() => onOpenBooking(facility.name)}
                    className="text-sky-400 hover:text-sky-300 font-semibold text-xs sm:text-sm flex items-center space-x-1.5 group-hover:translate-x-1 transition-transform"
                  >
                    <span>Schedule Consultation</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Additional Facility Standards Banner */}
        <div className="mt-12 bg-slate-800/40 border border-slate-700/60 rounded-2xl p-6 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="flex flex-col items-center space-y-2">
            <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold">
              1
            </div>
            <h4 className="font-bold text-white text-sm">Class B Autoclave Sterilization</h4>
            <p className="text-xs text-slate-400">100% sterile pouching for every patient</p>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <div className="w-10 h-10 rounded-xl bg-white/15 text-white border border-white/20 flex items-center justify-center font-bold">
              2
            </div>
            <h4 className="font-bold text-white text-sm">Ergonomic Motorized Operatory</h4>
            <p className="text-xs text-slate-400">Cushioned seating designed for patient relaxation</p>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              3
            </div>
            <h4 className="font-bold text-white text-sm">Digital Patient Records</h4>
            <p className="text-xs text-slate-400">Instant scan archiving for seamless follow-ups</p>
          </div>
        </div>

      </div>
    </section>
  );
};
