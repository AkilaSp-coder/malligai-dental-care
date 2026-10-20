import React from 'react';
import { DentalService } from '../types';
import { X, Clock, Check, Calendar, Sparkles } from 'lucide-react';

interface ServiceModalProps {
  service: DentalService | null;
  onClose: () => void;
  onBookService: (service: DentalService) => void;
}

export const ServiceModal: React.FC<ServiceModalProps> = ({ service, onClose, onBookService }) => {
  if (!service) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 to-teal-950 p-6 sm:p-7 text-white flex items-start justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-teal-400/20 text-teal-300 text-xs font-semibold mb-2">
              <Sparkles className="w-3 h-3" />
              <span>Malligai Dental Speciality</span>
            </div>
            <h3 className="font-heading text-2xl font-bold text-white">
              {service.title}
            </h3>
            <p className="text-teal-200 text-xs mt-1">
              {service.tagline}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-7 overflow-y-auto space-y-6">
          {/* Duration & Overview */}
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-2">
              <Clock className="w-4 h-4 text-teal-600" />
              <span>Estimated Duration: <strong>{service.duration}</strong></span>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed">
              {service.longDescription}
            </p>
          </div>

          {/* When is this treatment recommended */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              Common Signs & Indications
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {service.recommendedFor.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-1.5 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Clinical Benefits */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              Treatment Benefits & Patient Experience
            </h4>
            <div className="space-y-2">
              {service.benefits.map((benefit, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                  <Check className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action CTA */}
          <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-xs text-slate-500 text-center sm:text-left">
              Free consultation & digital examination review
            </span>
            <button
              onClick={() => {
                onClose();
                onBookService(service);
              }}
              className="w-full sm:w-auto px-6 py-3 bg-slate-900 hover:bg-teal-700 text-white font-bold text-xs sm:text-sm rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-teal-300" />
              <span>Book Appointment for {service.title}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
