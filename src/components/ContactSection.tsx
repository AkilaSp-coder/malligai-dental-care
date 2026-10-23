import React, { useState } from 'react';
import { CLINIC_INFO } from '../data/clinicData';
import { Phone, Clock, MapPin, Mail, MessageSquare, Send, CheckCircle2, ShieldCheck } from 'lucide-react';

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
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Clinic Address</p>
                  <p className="text-sm sm:text-base font-bold text-white mt-0.5">{CLINIC_INFO.address}</p>
                  <p className="text-xs text-slate-400 mt-1">Recognizable landmark building with illuminated "Malligai Dental" arch facade.</p>
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

      </div>
    </section>
  );
};
