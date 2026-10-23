import React from 'react';
import { DOCTORS } from '../data/clinicData';
import { Doctor } from '../types';
import { Award, GraduationCap, Clock, Calendar, CheckCircle, UserCheck } from 'lucide-react';

interface DoctorsSectionProps {
  onOpenBooking: (serviceName?: string, doctorName?: string) => void;
}

export const DoctorsSection: React.FC<DoctorsSectionProps> = ({ onOpenBooking }) => {
  return (
    <section id="doctors" className="py-20 bg-white text-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 bg-emerald-50 border border-emerald-200 px-3.5 py-1.5 rounded-full text-xs font-bold text-emerald-800 uppercase tracking-wider mb-4">
            <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Senior Dental Surgeons</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-4">
            Meet Our Chief Dentists
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            With decades of combined clinical expertise, our chief doctors provide evidence-based dental care with a gentle chairside manner.
          </p>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {DOCTORS.map((doctor: Doctor) => (
            <div
              key={doctor.id}
              className="bg-slate-50/70 border border-slate-200 rounded-3xl p-7 sm:p-9 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Profile Header */}
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div className="flex items-center space-x-4">
                    {/* Doctor Avatar Badge */}
                    <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br ${doctor.avatarColor} text-white flex items-center justify-center font-bold text-xl sm:text-2xl shadow-md border-2 border-white`}>
                      {doctor.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                        {doctor.name}
                      </h3>
                      {/* Degree Badge - strictly BDS */}
                      <span className="inline-block bg-sky-100 text-sky-800 text-xs font-bold px-2.5 py-0.5 rounded-md mt-1">
                        {doctor.degree}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Specific Verified Details from Brief */}
                <div className="space-y-3 bg-white p-4 rounded-2xl border border-slate-200/80 mb-6">
                  {/* Dental College */}
                  <div className="flex items-start space-x-3">
                    <GraduationCap className="w-4 h-4 text-sky-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Alma Mater</p>
                      <p className="text-xs sm:text-sm font-bold text-slate-800">{doctor.college}</p>
                    </div>
                  </div>

                  {/* Experience */}
                  <div className="flex items-start space-x-3">
                    <div className="w-5 h-5 rounded-md bg-slate-900 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Clock className="w-3.5 h-3.5 text-white" />
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Clinical Experience</p>
                      <p className="text-xs sm:text-sm font-bold text-slate-800">{doctor.experience}</p>
                    </div>
                  </div>
                </div>

                {/* Doctor Bio */}
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  {doctor.bio}
                </p>

                {/* Specialties / Focus Areas */}
                <div>
                  <h4 className="text-xs uppercase font-bold tracking-wider text-slate-400 mb-2.5">
                    Areas of Clinical Focus:
                  </h4>
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {doctor.specialties.map((spec, sIdx) => (
                      <span
                        key={sIdx}
                        className="bg-slate-200/70 text-slate-700 text-xs font-medium px-2.5 py-1 rounded-lg"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Consultation CTA */}
              <button
                onClick={() => onOpenBooking(undefined, doctor.name)}
                className="w-full py-3 px-4 bg-slate-900 hover:bg-sky-600 text-white text-xs sm:text-sm font-bold rounded-xl transition-all shadow-sm flex items-center justify-center space-x-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Consultation with {doctor.name}</span>
              </button>
            </div>
          ))}
        </div>

        {/* Doctor Ethics & Trust Assurance */}
        <div className="mt-12 bg-sky-50 border border-sky-100 rounded-2xl p-6 max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center space-x-3">
            <Award className="w-8 h-8 text-sky-600 flex-shrink-0" />
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Direct Chairside Doctor Consultations</h4>
              <p className="text-xs text-slate-600">Every treatment plan is personally explained by our senior doctors with transparent clinical rationale.</p>
            </div>
          </div>
          <span className="text-xs font-bold text-sky-700 bg-white px-3 py-1.5 rounded-full border border-sky-200 whitespace-nowrap">
            Registered Dental Practitioners
          </span>
        </div>

      </div>
    </section>
  );
};
