import React from 'react';
import { MapPin, Clock, ShieldCheck, HeartPulse, CheckCircle2, Award } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-[#10182D]/80 border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Real Clinic Exterior Photo (5 cols) */}
          <div className="lg:col-span-5">
            <div className="relative group">
              {/* Decorative accent glow */}
              <div className="absolute -inset-1 bg-gradient-to-tr from-[#008F87] to-[#00BFA5] rounded-3xl opacity-20 blur-lg group-hover:opacity-30 transition-opacity" />

              {/* Photo Frame */}
              <div className="relative rounded-2xl overflow-hidden border border-[#00BFA5]/30 shadow-2xl bg-[#16213E]">
                <img
                  src="/assets/aistudio/Media__9__c31e93b0.jpg"
                  alt="Malligai Dental Care Clinic Exterior in Sengottai with modern facade and entrance"
                  className="w-full h-[440px] sm:h-[480px] object-cover object-center group-hover:scale-[1.02] transition-transform duration-500"
                  loading="lazy"
                />
                {/* Photo overlay badge */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#10182D] via-[#10182D]/80 to-transparent p-6 text-left">
                  <p className="text-xs uppercase tracking-wider text-[#00BFA5] font-semibold">
                    Clinic Entrance & Facade
                  </p>
                  <p className="text-sm font-medium text-white">
                    Opposite Muthusamy Park, Jawaharlal Nehru Road, Sengottai
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: About Clinic Narrative (7 cols) */}
          <div className="lg:col-span-7 flex flex-col text-left">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#00BFA5] uppercase tracking-wider mb-2">
              <span>About Malligai Dental Care</span>
              <span aria-hidden="true">·</span>
              <span>Sengottai</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-5 leading-tight">
              A Modern, Trustworthy Dental Haven for Every Family
            </h2>

            <p className="text-base text-slate-300 leading-relaxed mb-4">
              At <strong className="text-white font-semibold">Malligai Dental Care</strong>, we believe every patient deserves 
              world-class oral healthcare delivered with gentle hands and genuine warmth. Situated centrally in Sengottai, 
              our clinic brings cutting-edge dental technology—including modern digital 3D intraoral optical scanning and 
              instant low-radiation digital radiography—within reach of our community.
            </p>

            <p className="text-base text-slate-300 leading-relaxed mb-6">
              Under the clinical leadership of Dr. R. Patrajan and Dr. T. Sankari Patrajan, our practice has earned 
              an esteemed reputation across the Tenkasi district for meticulous precision, patient comfort, and reliable clinical outcomes 
              ranging from routine preventive maintenance to comprehensive full-mouth restorations.
            </p>

            {/* Key Clinical Commitments */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 mb-8">
              <div className="p-4 rounded-xl glass-card flex items-start gap-3.5">
                <div className="p-2 rounded-lg bg-[#008F87]/20 text-[#00BFA5] shrink-0 mt-0.5">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white mb-1">Strict Sterilization Protocol</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Hospital-grade autoclaving and strict multi-step infection control protocols for total patient safety.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl glass-card flex items-start gap-3.5">
                <div className="p-2 rounded-lg bg-[#008F87]/20 text-[#00BFA5] shrink-0 mt-0.5">
                  <HeartPulse className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white mb-1">Painless Treatment Focus</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Modern anaesthetic methods and gentle, empathetic care designed to alleviate dental anxiety for all ages.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Clinic Highlights */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-300 font-medium">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#00BFA5]" />
                <span>Comfortable Treatment Suites</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#00BFA5]" />
                <span>Advanced Intraoral 3D Scanning</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#00BFA5]" />
                <span>Wheelchair Accessible Ramp</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
