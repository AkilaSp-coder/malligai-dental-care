import React from 'react';
import { Smile, Sparkles, Activity, Layers, ArrowRight } from 'lucide-react';

interface TreatmentsProps {
  onSelectTreatment: (treatmentName: string) => void;
}

export const Treatments: React.FC<TreatmentsProps> = ({ onSelectTreatment }) => {
  const treatments = [
    {
      id: 'bps-dentures',
      title: 'BPS Dentures',
      subtitle: 'Biofunctional Prosthetic System',
      description:
        'State-of-the-art dentures engineered to match the natural movements of your jaw and muscles. Delivers superior suction stability, confident chewing, and remarkably lifelike facial aesthetics without frequent slippage.',
      benefits: ['Custom anatomical suction fit', 'Enhanced chewing comfort', 'Natural lifelike smile appearance'],
      icon: Smile,
    },
    {
      id: 'wisdom-tooth',
      title: 'Painless Wisdom Tooth Removal',
      subtitle: 'Gentle Oral Surgery',
      description:
        'Specialised extraction of impacted, painful, or crowded third molars. Utilizing refined local anaesthesia techniques and gentle surgical protocols to minimize discomfort and ensure smooth, prompt healing.',
      benefits: ['Advanced local anaesthesia', 'Minimal tissue trauma', 'Detailed post-op recovery care'],
      icon: Activity,
    },
    {
      id: 'rehabilitation',
      title: 'Full Mouth Rehabilitation',
      subtitle: 'Complete Smile & Bite Restoration',
      description:
        'A comprehensive, patient-centered treatment plan that restores missing, severely worn, broken, or compromised teeth. Seamlessly aligns your bite, eliminates joint strain, and restores youthful smile vitality.',
      benefits: ['Restores complete chewing function', 'Harmonizes bite & jaw joints', 'Long-lasting structural renewal'],
      icon: Layers,
    },
    {
      id: 'digital-restorations',
      title: 'Advanced Digital Restorations',
      subtitle: 'Crowns, Bridges & Preventive Care',
      description:
        'Precision dental crowns, aesthetic ceramic bridges, and preventive restorations crafted with the aid of our high-resolution intraoral scanner, eliminating messy impression trays and ensuring an airtight fit.',
      benefits: ['Mess-free digital impressions', 'Microscopic marginal fit', 'Preserves natural tooth structure'],
      icon: Sparkles,
    },
  ];

  return (
    <section id="treatments" className="py-20 bg-[#10182D]/90 border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#00BFA5] uppercase tracking-wider mb-2">
            <span>Specialised Dental Treatments</span>
            <span aria-hidden="true">·</span>
            <span>Expert Clinical Care</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Comprehensive Treatments Designed Around You
          </h2>
          <p className="text-base text-slate-300">
            Every smile is unique. We combine biological principles, gentle techniques, 
            and modern dental engineering to deliver comfort and enduring function.
          </p>
        </div>

        {/* Treatment Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {treatments.map((treatment) => {
            const Icon = treatment.icon;
            return (
              <div
                key={treatment.id}
                className="glass-card rounded-2xl p-7 flex flex-col justify-between border border-[#00BFA5]/20 hover:border-[#00BFA5]/50 transition-all duration-300 hover:shadow-xl hover:shadow-[#008F87]/15 group"
              >
                <div>
                  {/* Card Header with Icon */}
                  <div className="flex items-center justify-between gap-4 mb-5">
                    <div className="p-3 rounded-xl bg-[#008F87]/20 text-[#00BFA5] border border-[#00BFA5]/25 group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      Malligai Dental Care
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-1 group-hover:text-[#00BFA5] transition-colors">
                    {treatment.title}
                  </h3>
                  <p className="text-xs font-semibold text-[#008F87] uppercase tracking-wider mb-3">
                    {treatment.subtitle}
                  </p>

                  <p className="text-sm text-slate-300 leading-relaxed mb-6">
                    {treatment.description}
                  </p>

                  {/* Benefits checklist */}
                  <div className="space-y-2 mb-6">
                    {treatment.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00BFA5]" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Enquire Button */}
                <div className="pt-4 border-t border-white/10">
                  <button
                    onClick={() => onSelectTreatment(treatment.title)}
                    className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-200 hover:text-white bg-white/5 hover:bg-[#008F87] border border-white/10 hover:border-transparent transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Enquire for {treatment.title}</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
