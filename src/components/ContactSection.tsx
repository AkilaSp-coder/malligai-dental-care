import React, { useState } from 'react';
import { CLINIC_INFO, SERVICES, DOCTORS, createWhatsAppAppointmentUrl } from '../data/clinicData';
import { AppointmentFormData } from '../types';
import { MapPin, Phone, MessageCircle, Clock, Send, CheckCircle2, Navigation, ExternalLink } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<AppointmentFormData>({
    fullName: '',
    phoneNumber: '',
    service: SERVICES[0].title,
    doctorPreference: 'Any Available Doctor',
    preferredDate: '',
    preferredSlot: 'Morning (10:00 AM - 2:00 PM)',
    notes: '',
  });

  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const url = createWhatsAppAppointmentUrl(formData);
    setSubmitted(true);
    // Open WhatsApp in new tab with prefilled message
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-14 text-left">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-700 mb-2">
            <span>Find & Reach Us</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Contact Malligai Dental Care
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            We are conveniently located directly opposite Muthusamy Park on Jawaharlal Nehru Road in Sengottai. Reach out via phone or WhatsApp for instant assistance.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10">
          {/* Left Column: Direct Contact Details & Interactive Map Preview */}
          <div className="lg:col-span-6 space-y-6">
            {/* Quick Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Telephone */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center mb-3">
                    <Phone className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Phone Support</span>
                  <div className="text-lg font-bold text-slate-900 mt-0.5">{CLINIC_INFO.phone}</div>
                  <p className="text-xs text-slate-500 mt-1">Direct doctor line & consultations</p>
                </div>
                <a
                  href={CLINIC_INFO.phoneHref}
                  className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 hover:text-teal-900"
                >
                  <span>Call Now</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* WhatsApp */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">WhatsApp Desk</span>
                  <div className="text-lg font-bold text-slate-900 mt-0.5">{CLINIC_INFO.phone}</div>
                  <p className="text-xs text-slate-500 mt-1">Quick text enquiries & appointment slots</p>
                </div>
                <a
                  href={CLINIC_INFO.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-900"
                >
                  <span>Chat on WhatsApp</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Address Card */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5 text-teal-700" />
                </div>
                <div className="flex-1">
                  <span className="text-xs font-semibold uppercase tracking-wider text-teal-700 block mb-1">
                    Clinic Address
                  </span>
                  <p className="text-base font-semibold text-slate-900 leading-snug">
                    {CLINIC_INFO.address}
                  </p>
                  <p className="text-xs text-slate-500 mt-1.5 flex items-center gap-1">
                    <Navigation className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    <span>Landmark: Opposite Muthusamy Park, Sengottai</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Map Preview / Location Box */}
            <div className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-sm">
              <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-teal-400" />
                  <span className="text-xs font-bold uppercase tracking-wider">
                    Sengottai Clinic Location
                  </span>
                </div>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CLINIC_INFO.googleMapsQuery)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-teal-300 hover:text-teal-200 flex items-center gap-1 hover:underline"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Map embed / simulated interactive container */}
              <div className="relative h-64 w-full bg-slate-100">
                <iframe
                  title="Malligai Dental Care Sengottai Map"
                  src={CLINIC_INFO.googleMapsEmbed}
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
                <span>Opposite Muthusamy Park, Jawaharlal Nehru Road</span>
                <span className="font-semibold text-teal-700">Pincode: 627 809</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive WhatsApp Pre-filled Appointment Form */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-7 sm:p-9 border border-slate-200 shadow-xl shadow-slate-900/5">
            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-semibold mb-2 border border-teal-100">
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>Instant WhatsApp Booking</span>
              </div>
              <h3 className="font-heading text-2xl font-bold text-slate-900">
                Request an Appointment
              </h3>
              <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                Fill in your details below. Clicking "Book via WhatsApp" opens WhatsApp with your pre-formatted appointment enquiry ready to send to our Sengottai clinic.
              </p>
            </div>

            {submitted && (
              <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong>Appointment Enquiry Sent!</strong> WhatsApp has opened with your request details. If WhatsApp did not open automatically, you can call us directly at <strong>{CLINIC_INFO.phone}</strong>.
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Patient Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. K. Murugan / Selvi"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent text-slate-900"
                />
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Contact Mobile Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 98765 43210"
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent text-slate-900"
                />
              </div>

              {/* Treatment / Service */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Treatment / Concern
                </label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent text-slate-900 bg-white"
                >
                  {SERVICES.map((s) => (
                    <option key={s.id} value={s.title}>
                      {s.title}
                    </option>
                  ))}
                  <option value="General Consultation / Toothache Check">
                    General Consultation / Toothache Check
                  </option>
                  <option value="Emergency Tooth Pain Relief">
                    Emergency Tooth Pain Relief
                  </option>
                </select>
              </div>

              {/* Doctor Preference & Preferred Slot (2-cols) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Doctor Preference
                  </label>
                  <select
                    value={formData.doctorPreference}
                    onChange={(e) => setFormData({ ...formData, doctorPreference: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent text-slate-900 bg-white"
                  >
                    <option value="Any Available Doctor">Any Available Doctor</option>
                    {DOCTORS.map((d) => (
                      <option key={d.id} value={d.name}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Preferred Time Slot
                  </label>
                  <select
                    value={formData.preferredSlot}
                    onChange={(e) => setFormData({ ...formData, preferredSlot: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent text-slate-900 bg-white"
                  >
                    <option value="Morning (10:00 AM - 2:00 PM)">Morning (10:00 AM - 2:00 PM)</option>
                    <option value="Evening (5:00 PM - 8:30 PM)">Evening (5:00 PM - 8:30 PM)</option>
                    <option value="Sunday (Prior Appointment Only)">Sunday (Prior Appointment Only)</option>
                  </select>
                </div>
              </div>

              {/* Preferred Date */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Preferred Appointment Date
                </label>
                <input
                  type="date"
                  value={formData.preferredDate}
                  onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent text-slate-900"
                />
              </div>

              {/* Brief Notes */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Brief Note (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Sensitivity in lower molar, bleeding while brushing"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent text-slate-900 resize-none"
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-sm rounded-xl transition-all shadow-md hover:shadow-emerald-900/15 flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4.5 h-4.5" />
                <span>Send Appointment Enquiry via WhatsApp</span>
              </button>

              <div className="text-center pt-2">
                <span className="text-xs text-slate-500">
                  Or call directly for immediate emergency assistance:{' '}
                  <a href={CLINIC_INFO.phoneHref} className="text-teal-700 font-bold hover:underline">
                    {CLINIC_INFO.phone}
                  </a>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
