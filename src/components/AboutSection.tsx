import React from 'react';
import { CLINIC_INFO } from '../data/clinicData';
import { ShieldCheck, Sparkles, HeartHandshake, CheckCircle2 } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 lg:py-28 bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Visual Collage with Generated Clinic Photos */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 bg-white">
              <img
                src="/src/assets/images/clinic_interior_1792490061821.jpg"
                alt="Modern ergonomic dental treatment operatory at Malligai Dental Care"
                className="w-full h-80 sm:h-96 object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-teal-300">
                  Modern Operatory Setup
                </span>
                <p className="text-sm font-medium text-slate-100">
                  Ergonomic patient dental chair & high-precision diagnostic lighting
                </p>
              </div>
            </div>

            {/* Overlapping secondary card */}
            <div className="hidden sm:flex absolute -bottom-8 -right-6 w-64 bg-white p-3.5 rounded-2xl shadow-xl border border-slate-200/90 items-center gap-3">
              <img
                src="/src/assets/images/dental_care_treatment_1792490062561.jpg"
                alt="Sterilized dental instruments tray"
                className="w-16 h-16 rounded-xl object-cover shrink-0"
                referrerPolicy="no-referrer"
              />
              <div>
                <span className="text-xs font-bold text-slate-900 block">Class-B Sterilization</span>
                <span className="text-[11px] text-slate-600 block mt-0.5">
                  100% Autoclaved instrumentation for every patient
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative & Values */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-700 mb-2">
              <span>About Malligai Dental Care</span>
            </div>

            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
              Comfortable, Modern Dental Health in the Heart of Sengottai
            </h2>

            <p className="text-base text-slate-600 leading-relaxed mb-5">
              Malligai Dental Care was established with a clear mission: to provide families in Sengottai, Tenkasi, and surrounding communities with world-class dental care without fear or discomfort.
            </p>

            <p className="text-base text-slate-600 leading-relaxed mb-6">
              Conveniently located on Jawaharlal Nehru Road opposite Muthusamy Park, our clinic blends modern dental technologies with warm clinical empathy. Whether you need an emergency toothache resolution, root canal treatment, or a smile enhancement, you will find gentle hands and honest, patient-focused guidance.
            </p>

            {/* Core Commitments */}
            <div className="space-y-4 pt-2 border-t border-slate-200/80">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center shrink-0 mt-0.5">
                  <HeartHandshake className="w-4 h-4 text-teal-700" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Fear-Free, Gentle Approach</h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    We listen to your concerns, respect your sensitivity, and take the time to ensure painless local anesthesia before any procedure begins.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-800 flex items-center justify-center shrink-0 mt-0.5">
                  <ShieldCheck className="w-4 h-4 text-sky-700" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Hospital-Grade Sterilization Protocols</h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Multi-step sterilization, sealed pouch packaging, and disposable barriers protect every visitor against cross-contamination.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Ethical Diagnoses & Transparent Fees</h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    No hidden costs or pushed unnecessary treatments. We prioritize preserving your natural teeth whenever medically viable.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
