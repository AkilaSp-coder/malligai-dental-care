import React from 'react';
import { WHY_CHOOSE_US } from '../data/clinicData';
import { Shield, SmilePlus, UserCheck, CheckCircle2, MapPin, Clock } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Shield':
        return <Shield className="w-5 h-5 text-teal-600" />;
      case 'SmilePlus':
        return <SmilePlus className="w-5 h-5 text-teal-600" />;
      case 'UserCheck':
        return <UserCheck className="w-5 h-5 text-teal-600" />;
      case 'CheckCircle2':
        return <CheckCircle2 className="w-5 h-5 text-teal-600" />;
      case 'MapPin':
        return <MapPin className="w-5 h-5 text-teal-600" />;
      case 'Clock':
      default:
        return <Clock className="w-5 h-5 text-teal-600" />;
    }
  };

  return (
    <section className="py-20 lg:py-28 bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-14 text-left">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-700 mb-2">
            <span>The Malligai Difference</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Why Patients Choose Our Clinic
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            We adhere to strict clinical hygiene standards, transparent medical ethics, and gentle touch techniques so that your visit is stress-free and rewarding.
          </p>
        </div>

        {/* 6-Grid Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {WHY_CHOOSE_US.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-7 border border-slate-200/90 hover:border-teal-300 transition-all duration-300 hover:shadow-lg hover:shadow-teal-950/5 flex flex-col justify-start"
            >
              <div className="w-11 h-11 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center mb-5 shrink-0">
                {getIcon(item.icon)}
              </div>
              <h3 className="font-heading text-lg font-bold text-slate-900 mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
