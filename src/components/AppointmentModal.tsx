import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, User, Phone, CheckCircle2, MessageSquare, AlertCircle } from 'lucide-react';
import { CLINIC_INFO, DOCTORS, SERVICES } from '../data/clinicData';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
  initialDoctor?: string;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
  initialService,
  initialDoctor
}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: initialService || SERVICES[0].title,
    doctor: initialDoctor || 'Either Senior Doctor',
    preferredDate: '',
    timeSlot: 'Morning (10:00 AM – 1:00 PM)',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (initialService) {
      setFormData(prev => ({ ...prev, service: initialService }));
    }
  }, [initialService]);

  useEffect(() => {
    if (initialDoctor) {
      setFormData(prev => ({ ...prev, doctor: initialDoctor }));
    }
  }, [initialDoctor]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      return;
    }
    setSubmitted(true);
  };

  const handleWhatsAppForward = () => {
    const text = encodeURIComponent(
      `Hello Malligai Dental Care, I would like to enquire about a dental appointment.\n\n*Name:* ${formData.name}\n*Phone:* ${formData.phone}\n*Treatment / Concern:* ${formData.service}\n*Preferred Doctor:* ${formData.doctor}\n*Date:* ${formData.preferredDate || 'Earliest available'}\n*Slot:* ${formData.timeSlot}${formData.message ? `\n*Notes:* ${formData.message}` : ''}`
    );
    window.open(`https://wa.me/${CLINIC_INFO.whatsapp}?text=${text}`, '_blank');
  };

  const resetForm = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-sky-950 p-6 text-white flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-2 text-xs text-white font-bold uppercase tracking-wider mb-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>Malligai Dental Care</span>
            </div>
            <h3 className="text-xl font-bold">Request an Appointment</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {submitted ? (
          <div className="p-8 text-center space-y-5">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h4 className="text-2xl font-bold text-slate-900">Appointment Request Received!</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Thank you, <span className="font-semibold text-slate-900">{formData.name}</span>. Our clinic desk will review your preferred slot with <span className="font-semibold text-slate-900">{formData.doctor}</span> and contact you at <span className="font-semibold text-slate-900">{formData.phone}</span> shortly to confirm.
              </p>
            </div>

            {/* Direct WhatsApp Confirmation Button */}
            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-left space-y-3">
              <p className="text-xs text-emerald-900 font-medium">
                Want immediate confirmation? Send this booking directly to our clinic WhatsApp:
              </p>
              <button
                onClick={handleWhatsAppForward}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center justify-center space-x-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Confirm via WhatsApp Now</span>
              </button>
            </div>

            <div className="flex items-center space-x-3 pt-2">
              <a
                href={CLINIC_INFO.telLink}
                className="flex-1 py-2.5 border border-slate-300 rounded-xl font-bold text-xs text-slate-700 text-center flex items-center justify-center space-x-1.5"
              >
                <Phone className="w-3.5 h-3.5 text-sky-600" />
                <span>Call Clinic Directly</span>
              </a>
              <button
                onClick={resetForm}
                className="flex-1 py-2.5 bg-slate-900 text-white rounded-xl font-bold text-xs"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-4">
            
            {/* Patient Name */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Full Name *
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Kumar"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Phone Number *
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="tel"
                  required
                  placeholder="e.g. 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
            </div>

            {/* Treatment / Service Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Select Treatment / Service
              </label>
              <select
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
              >
                <optgroup label="Speciality Treatments">
                  <option value="Smile Design">Smile Design</option>
                  <option value="BPS Dentures">BPS Dentures</option>
                  <option value="Painless Wisdom Tooth Removal">Painless Wisdom Tooth Removal</option>
                  <option value="Full Mouth Rehabilitation">Full Mouth Rehabilitation</option>
                </optgroup>
                <optgroup label="Advanced Diagnostics">
                  <option value="Intraoral 3D Scan & Consultation">Intraoral 3D Scan & Consultation</option>
                  <option value="Digital X-ray & Dental Checkup">Digital X-ray & Dental Checkup</option>
                </optgroup>
                <optgroup label="General & Restorative Treatments">
                  <option value="Root Canal Treatment (RCT)">Root Canal Treatment (RCT)</option>
                  <option value="Dental Implants">Dental Implants</option>
                  <option value="Clear Aligners & Braces">Clear Aligners & Braces</option>
                  <option value="Scaling & Advanced Whitening">Scaling & Advanced Whitening</option>
                  <option value="General Consultation">General Dental Consultation</option>
                </optgroup>
              </select>
            </div>

            {/* Doctor Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Preferred Doctor
              </label>
              <select
                value={formData.doctor}
                onChange={(e) => setFormData({ ...formData, doctor: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
              >
                <option value="Either Senior Doctor">Either Senior Doctor (First Available)</option>
                <option value="Dr. R. Patrajan (BDS, 16 yrs exp)">Dr. R. Patrajan (BDS, 16 yrs exp)</option>
                <option value="Dr. T. Sankari Patrajan (BDS, 14 yrs exp)">Dr. T. Sankari Patrajan (BDS, 14 yrs exp)</option>
              </select>
            </div>

            {/* Date & Time Slot */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Preferred Date
                </label>
                <input
                  type="date"
                  value={formData.preferredDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Timing Slot
                </label>
                <select
                  value={formData.timeSlot}
                  onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                >
                  <option value="Morning (9:30 AM – 1:30 PM)">Morning (9:30 AM – 1:30 PM)</option>
                  <option value="Evening (4:30 PM – 9:00 PM)">Evening (4:30 PM – 9:00 PM)</option>
                  <option value="Sunday Morning (10:00 AM – 1:00 PM)">Sunday (10:00 AM – 1:00 PM)</option>
                </select>
              </div>
            </div>

            {/* Optional Notes */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Symptoms or Notes (Optional)
              </label>
              <textarea
                rows={2}
                placeholder="Mention any toothache, sensitivity, or aesthetic goal..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-500 hover:to-blue-600 text-white font-bold text-sm rounded-xl shadow-lg shadow-sky-600/25 transition-all flex items-center justify-center space-x-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Confirm Appointment Request</span>
              </button>
            </div>

            <p className="text-[11px] text-slate-400 text-center">
              We respect your privacy. No spam. You will receive quick scheduling confirmation.
            </p>
          </form>
        )}
      </div>
    </div>
  );
};
