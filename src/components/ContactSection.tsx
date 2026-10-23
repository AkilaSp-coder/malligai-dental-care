import React, { useState } from 'react';
import { CLINIC_INFO } from '../data/clinicData';
import { Phone, Clock, MapPin, Mail, MessageSquare, Send, CheckCircle2, ShieldCheck, Navigation, ExternalLink } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [quickName, setQuickName] = useState('');
  const [quickPhone, setQuickPhone] = useState('');
  const [quickMsg, setQuickMsg] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleQuickInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickName || !quickPhone) return;
    setIsSent(true);
  };

  return (
    <section id="contact" className="py-20 bg-slate-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 bg-sky-500/10 border border-sky-400/30 px-3.5 py-1.5 rounded-full text-xs font-bold text-sky-300 uppercase tracking-wider mb-4">
            <MapPin className="w-3.5 h-3.5 text-sky-400" />
            <span>Visit Us or Reach Out</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-4">
            Contact & Consultation Hours
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Have questions about a treatment or need immediate attention? We are ready to assist you and your family.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Clinic Contact Details */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Phone & WhatsApp Card */}
            <div className="bg-slate-800/90 border border-slate-700 rounded-3xl p-6 sm:p-8 shadow-xl">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center space-x-2.5">
                <Phone className="w-5 h-5 text-sky-400" />
                <span>Call & WhatsApp Enquiries</span>
              </h3>

              <div className="bg-slate-900/80 border border-slate-700 p-5 rounded-2xl">
                <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Primary Clinic Phone</p>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-2">
                  <div>
                    <a
                      href={CLINIC_INFO.telLink}
                      className="text-2xl sm:text-3xl font-extrabold text-white hover:text-sky-300 transition-colors"
                    >
                      {CLINIC_INFO.phone}
                    </a>
                    <p className="text-xs text-slate-400 mt-1">Available during clinic working hours</p>
                  </div>
                  <a
                    href={CLINIC_INFO.telLink}
                    className="inline-flex items-center justify-center space-x-2 bg-sky-600 hover:bg-sky-500 text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-xl transition-all shadow-md self-start sm:self-center"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Call Now</span>
                  </a>
                </div>
              </div>

              {/* WhatsApp Callout */}
              <div className="mt-5 pt-5 border-t border-slate-700/60 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">Instant WhatsApp Consultation</p>
                    <p className="text-xs text-slate-400">Message directly at {CLINIC_INFO.phone} for appointments</p>
                  </div>
                </div>

                <a
                  href={CLINIC_INFO.whatsappEnquiryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-md transition-all whitespace-nowrap flex items-center space-x-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Timings & Address Card */}
            <div className="bg-slate-800/90 border border-slate-700 rounded-3xl p-6 sm:p-8 shadow-xl">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center space-x-2.5">
                <Clock className="w-5 h-5 text-white" />
                <span>Working Hours & Schedule</span>
              </h3>

              <div className="space-y-4">
                {CLINIC_INFO.workingHours.map((schedule, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-slate-900/60 rounded-2xl border border-slate-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                  >
                    <div className="font-bold text-white text-sm">{schedule.days}</div>
                    <div className="text-xs sm:text-sm text-slate-300">
                      <span className="text-sky-300 font-semibold">{schedule.morning}</span>
                      {schedule.evening !== 'Closed' && (
                        <span> &bull; <span className="text-white font-semibold">{schedule.evening}</span></span>
                      )}
                      {schedule.evening === 'Closed' && (
                        <span className="text-slate-400 ml-1">({schedule.evening})</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Clinic Address */}
              <div className="mt-6 pt-6 border-t border-slate-700/60 flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-sky-400 flex-shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Clinic Address</p>
                  <a
                    href={CLINIC_INFO.directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-sm sm:text-base font-bold text-white mt-0.5 hover:text-sky-300 transition-colors"
                  >
                    {CLINIC_INFO.address}
                  </a>
                  <p className="text-xs text-slate-400 mt-1">Recognizable landmark building with illuminated "Malligai Dental" arch facade (Opposite Muthusamy Park).</p>
                  <div className="mt-2.5">
                    <a
                      href={CLINIC_INFO.directionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1.5 text-xs font-semibold text-sky-400 hover:text-sky-300 transition-colors"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>Get Directions on Google Maps</span>
                      <ExternalLink className="w-3 h-3 ml-0.5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Exterior Photo & Quick Message */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Real Exterior Photo Preview */}
            <div className="bg-slate-800/90 border border-slate-700 rounded-3xl overflow-hidden shadow-xl">
              <div className="relative aspect-[4/3] bg-slate-950">
                <img
                  src="/assets/aistudio/Media__9__c31e93b0.jpg"
                  alt="Malligai Dental Care Exterior Building"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-slate-900/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white border border-slate-700 flex items-center space-x-1.5 shadow-md">
                  <ShieldCheck className="w-3.5 h-3.5 text-white" />
                  <span>Real Clinic Facade</span>
                </div>
              </div>
              <div className="p-5">
                <h4 className="font-bold text-white text-base">Look for the Malligai Dental Signboard</h4>
                <p className="text-xs text-slate-300 mt-1">
                  Convenient street-level entrance with wheelchair ramp access and ample patient parking.
                </p>
              </div>
            </div>

            {/* Quick Callback Form */}
            <div className="bg-slate-800/90 border border-slate-700 rounded-3xl p-6 sm:p-7 shadow-xl">
              <h4 className="font-bold text-white text-base mb-1">Request a Fast Callback</h4>
              <p className="text-xs text-slate-400 mb-4">Leave your details and our team will get back to you shortly.</p>

              {isSent ? (
                <div className="p-4 bg-emerald-900/30 border border-emerald-600/40 rounded-2xl text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                  <p className="text-sm font-bold text-white">Callback Request Logged!</p>
                  <p className="text-xs text-slate-300">We will call you at {quickPhone} during clinic hours.</p>
                </div>
              ) : (
                <form onSubmit={handleQuickInquiry} className="space-y-3">
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    value={quickName}
                    onChange={(e) => setQuickName(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-900/80 border border-slate-700 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Your Phone Number"
                    value={quickPhone}
                    onChange={(e) => setQuickPhone(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-900/80 border border-slate-700 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
                  />
                  <input
                    type="text"
                    placeholder="Treatment inquiry (e.g. Smile Design, Wisdom Tooth)"
                    value={quickMsg}
                    onChange={(e) => setQuickMsg(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-900/80 border border-slate-700 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
                  />
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center justify-center space-x-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Callback Request</span>
                  </button>
                </form>
              )}
            </div>

          </div>

        </div>

        {/* Google Maps Location Section */}
        <div className="mt-12 bg-slate-800/90 border border-slate-700 rounded-3xl p-6 sm:p-8 shadow-xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-6">
            <div>
              <div className="inline-flex items-center space-x-2 bg-sky-500/10 border border-sky-400/30 px-3 py-1 rounded-full text-xs font-bold text-sky-300 uppercase tracking-wider mb-2">
                <MapPin className="w-3.5 h-3.5 text-sky-400" />
                <span>Google Maps Location & Navigation</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                Find Malligai Dental Care in Sengottai
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl">
                Located on Jawaharlal Nehru Road, directly opposite Muthusamy Park. Easily accessible with street parking and wheelchair-friendly ground-level entrance.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={CLINIC_INFO.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center space-x-2 bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-xl shadow-lg hover:shadow-sky-500/25 transition-all transform hover:-translate-y-0.5"
              >
                <Navigation className="w-4 h-4" />
                <span>Get Directions</span>
                <ExternalLink className="w-3.5 h-3.5 ml-0.5 opacity-80" />
              </a>

              <a
                href={CLINIC_INFO.telLink}
                className="inline-flex items-center justify-center space-x-2 bg-slate-700/80 hover:bg-slate-700 text-white font-bold text-xs sm:text-sm px-4 py-3 rounded-xl border border-slate-600 transition-all"
              >
                <Phone className="w-4 h-4 text-sky-400" />
                <span>Call {CLINIC_INFO.phone}</span>
              </a>
            </div>
          </div>

          {/* Address & Quick Info Banner */}
          <div className="mb-6 p-4 bg-slate-900/80 rounded-2xl border border-slate-700/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start space-x-3">
              <div className="w-9 h-9 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Official Clinic Address</span>
                <a
                  href={CLINIC_INFO.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm sm:text-base font-bold text-white hover:text-sky-300 transition-colors"
                >
                  {CLINIC_INFO.address}
                </a>
              </div>
            </div>

            <div className="flex items-center space-x-3 text-xs text-slate-300 md:self-center flex-shrink-0">
              <span className="inline-block px-2.5 py-1 rounded-lg bg-slate-800 text-teal-300 border border-slate-700 font-medium">
                Opp. Muthusamy Park
              </span>
              <span className="inline-block px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 border border-slate-700 font-medium">
                Pincode: 627809
              </span>
            </div>
          </div>

          {/* Responsive Map Embed Container */}
          <div className="relative w-full h-[360px] sm:h-[420px] rounded-2xl overflow-hidden border border-slate-700 bg-slate-950 shadow-inner">
            <iframe
              src={CLINIC_INFO.mapsEmbedUrl}
              title="Malligai Dental Care Clinic Location Map in Sengottai"
              aria-label="Google Maps preview of Malligai Dental Care location in Sengottai"
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            {/* Direct Open in Maps Badge */}
            <div className="absolute bottom-3 right-3 pointer-events-auto">
              <a
                href={CLINIC_INFO.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1.5 bg-slate-900/95 hover:bg-slate-900 text-white text-xs font-semibold px-3 py-2 rounded-xl border border-slate-700 shadow-lg transition-colors"
              >
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3 h-3 text-sky-400" />
              </a>
            </div>
          </div>
          <p className="text-[11px] text-slate-400 mt-3 text-center sm:text-left">
            * Note: Map search location is grounded directly to the official clinic address: No. 71-1/27A, Jawaharlal Nehru Road, Opposite Muthusamy Park, Sengottai – 627809. Tap "Get Directions" for GPS navigation.
          </p>
        </div>

      </div>
    </section>
  );
};
