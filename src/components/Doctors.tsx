import React from 'react';
import { Award, GraduationCap, Clock, Stethoscope, CheckCircle2 } from 'lucide-react';

export const Doctors: React.FC = () => {
  return (
    <section id="doctors" className="py-20 bg-[#10182D] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#00BFA5] uppercase tracking-wider mb-2">
            <span>Our Doctors</span>
            <span aria-hidden="true">·</span>
            <span>Experienced Leadership</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Meet Our Dedicated Dental Clinicians
          </h2>
          <p className="text-base text-slate-300">
            Backed by over three decades of combined clinical expertise, our lead dentists provide 
            gentle, scientifically grounded care tailored to your oral health needs.
          </p>
        </div>

        {/* Doctor Profile Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Card 1: Dr. R. Patrajan */}
          <div className="glass-card rounded-2xl p-8 flex flex-col justify-between border border-[#00BFA5]/25 hover:border-[#00BFA5]/50 transition-all duration-300 hover:shadow-xl hover:shadow-[#008F87]/15">
            <div>
              {/* Doctor Header & Monogram Emblem */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#008F87] to-[#00BFA5] p-0.5 shadow-md shrink-0">
                  <div className="w-full h-full bg-[#10182D] rounded-[14px] flex items-center justify-center text-xl font-bold text-[#00BFA5]">
                    RP
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white tracking-tight">
                    Dr. R. Patrajan
                  </h3>
                  <p className="text-sm font-semibold text-[#00BFA5]">
                    Dental Surgeon
                  </p>
                </div>
              </div>

              {/* Verified Credentials */}
              <div className="space-y-3.5 pt-4 border-t border-white/10 text-sm">
                <div className="flex items-start gap-3">
                  <GraduationCap className="w-5 h-5 text-[#00BFA5] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs text-slate-400 block font-medium">Qualification</span>
                    <span className="text-slate-100 font-semibold">Bachelor of Dental Surgery (BDS)</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Stethoscope className="w-5 h-5 text-[#008F87] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs text-slate-400 block font-medium">College</span>
                    <span className="text-slate-100 font-semibold">S.A. Rajas Dental College</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#00BFA5] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs text-slate-400 block font-medium">Clinical Experience</span>
                    <span className="text-[#00BFA5] font-bold text-base">16 Years</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/10">
              <span className="text-xs text-slate-400 font-medium block mb-2">Practice Focus</span>
              <div className="flex flex-wrap gap-2 text-xs text-slate-300">
                <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10">Painless Extractions</span>
                <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10">BPS Dentures</span>
                <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10">Full Mouth Rehab</span>
              </div>
            </div>
          </div>

          {/* Card 2: Dr. T. Sankari Patrajan */}
          <div className="glass-card rounded-2xl p-8 flex flex-col justify-between border border-[#00BFA5]/25 hover:border-[#00BFA5]/50 transition-all duration-300 hover:shadow-xl hover:shadow-[#008F87]/15">
            <div>
              {/* Doctor Header & Monogram Emblem */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#008F87] to-[#00BFA5] p-0.5 shadow-md shrink-0">
                  <div className="w-full h-full bg-[#10182D] rounded-[14px] flex items-center justify-center text-xl font-bold text-[#00BFA5]">
                    SP
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white tracking-tight">
                    Dr. T. Sankari Patrajan
                  </h3>
                  <p className="text-sm font-semibold text-[#00BFA5]">
                    Dental Surgeon
                  </p>
                </div>
              </div>

              {/* Verified Credentials */}
              <div className="space-y-3.5 pt-4 border-t border-white/10 text-sm">
                <div className="flex items-start gap-3">
                  <GraduationCap className="w-5 h-5 text-[#00BFA5] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs text-slate-400 block font-medium">Qualification</span>
                    <span className="text-slate-100 font-semibold">Bachelor of Dental Surgery (BDS)</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Stethoscope className="w-5 h-5 text-[#008F87] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs text-slate-400 block font-medium">College</span>
                    <span className="text-slate-100 font-semibold">Saveetha Dental College, Chennai</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#00BFA5] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs text-slate-400 block font-medium">Clinical Experience</span>
                    <span className="text-[#00BFA5] font-bold text-base">14 Years</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/10">
              <span className="text-xs text-slate-400 font-medium block mb-2">Practice Focus</span>
              <div className="flex flex-wrap gap-2 text-xs text-slate-300">
                <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10">Digital Diagnostics</span>
                <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10">Intraoral Scanning</span>
                <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10">Cosmetic Dentistry</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
