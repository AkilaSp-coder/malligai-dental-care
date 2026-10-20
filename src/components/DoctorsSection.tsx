import React from 'react';
import { DOCTORS } from '../data/clinicData';
import { DoctorProfile } from '../types';
import { UserCheck, Clock, Calendar, Check, Camera, Stethoscope } from 'lucide-react';

interface DoctorsSectionProps {
  onBookWithDoctor: (doctor: DoctorProfile) => void;
}

export const DoctorsSection: React.FC<DoctorsSectionProps> = ({ onBookWithDoctor }) => {
  return (
    <section id="doctors" className="py-20 lg:py-28 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 text-left">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-700 mb-2">
            <span>Our Dental Surgeons</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Meet Our Resident Doctors
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            At Malligai Dental Care, you are cared for by dedicated resident dental surgeons committed to gentle, personalized dental health.
          </p>
        </div>

        {/* Doctor Profile Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {DOCTORS.map((doctor) => (
            <div
              key={doctor.id}
              className="bg-slate-50/70 border border-slate-200/90 rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:border-teal-300 hover:shadow-xl hover:shadow-teal-950/5 transition-all duration-300"
            >
              <div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-6">
                  {/* Doctor Portrait Placeholder Box with clear label according to brief */}
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-br from-teal-700 via-teal-800 to-slate-900 text-white flex flex-col items-center justify-center p-2 text-center shadow-md shrink-0 border border-teal-600/30">
                    <Stethoscope className="w-8 h-8 text-teal-300 mb-1" />
                    <span className="text-[10px] font-medium text-teal-100 leading-tight">
                      Doctor Portrait
                    </span>
                    <span className="text-[8px] text-teal-200/80 leading-none mt-0.5">
                      Ready for photo
                    </span>
                  </div>

                  <div>
                    <span className="text-xs font-semibold text-teal-700 uppercase tracking-wider">
                      {doctor.qualifications}
                    </span>
                    <h3 className="font-heading text-2xl font-bold text-slate-900 mt-0.5">
                      {doctor.name}
                    </h3>
                    <p className="text-xs sm:text-sm font-medium text-slate-600 mt-1">
                      {doctor.role}
                    </p>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-2">
                      <Clock className="w-3.5 h-3.5 text-teal-600" />
                      <span>{doctor.experience}</span>
                    </div>
                  </div>
                </div>

                {/* Doctor Bio */}
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  {doctor.bio}
                </p>

                {/* Clinical Specialties */}
                <div className="mb-6">
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-3">
                    Areas of Clinical Focus
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {doctor.specialties.map((spec, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                        <Check className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Schedule info */}
                <div className="bg-white rounded-xl p-3 border border-slate-200/80 text-xs text-slate-600 mb-6 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-teal-600 shrink-0" />
                  <span><strong>Consultation Hours:</strong> {doctor.schedule}</span>
                </div>
              </div>

              {/* Booking CTA */}
              <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between gap-4">
                <span className="text-xs text-slate-500">
                  Accepting new patients
                </span>
                <button
                  type="button"
                  onClick={() => onBookWithDoctor(doctor)}
                  className="px-4 py-2 bg-slate-900 hover:bg-teal-700 active:bg-teal-800 text-white font-semibold text-xs rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5 text-teal-300" />
                  <span>Book with {doctor.name.split(' ')[0]}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Photo Swap Note for Client Presentation */}
        <div className="mt-8 p-3 rounded-xl bg-slate-100/70 border border-slate-200 text-xs text-slate-500 flex items-center gap-2">
          <Camera className="w-4 h-4 text-slate-400 shrink-0" />
          <span>
            <strong>Client Note:</strong> Profile photo slots are ready to easily accept official studio portraits of Dr. R. Patrajan and Dr. T. Sankari Patrajan upon launch.
          </span>
        </div>
      </div>
    </section>
  );
};
