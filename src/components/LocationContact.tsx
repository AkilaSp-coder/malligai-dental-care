import React from 'react';
import { MapPin, Phone, MessageCircle, Clock, Navigation, CheckCircle2 } from 'lucide-react';

export const LocationContact: React.FC = () => {
  return (
    <section id="contact" className="py-20 bg-[#10182D]/95 border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#00BFA5] uppercase tracking-wider mb-2">
            <span>Location & Contact</span>
            <span aria-hidden="true">·</span>
            <span>Visit Us in Sengottai</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Conveniently Located in the Heart of Sengottai
          </h2>
          <p className="text-base text-slate-300">
            Easily accessible right opposite Muthusamy Park on Jawaharlal Nehru Road with dedicated patient entrance.
          </p>
        </div>

        {/* Contact Info & Interactive Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Contact Details Card (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between glass-card rounded-3xl p-6 sm:p-8 border border-[#00BFA5]/25">
            <div className="space-y-6 text-left">
              <div>
                <span className="text-xs font-semibold text-[#00BFA5] uppercase tracking-wider block mb-1">
                  Clinic Location
                </span>
                <h3 className="text-xl font-bold text-white mb-2">
                  Malligai Dental Care
                </h3>
                <div className="flex items-start gap-3 text-slate-300 text-sm leading-relaxed">
                  <MapPin className="w-5 h-5 text-[#00BFA5] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-medium">No. 71-1/27A, Jawaharlal Nehru Road,</p>
                    <p className="text-slate-300">Opposite Muthusamy Park,</p>
                    <p className="text-slate-300">Sengottai – 627 809, Tamil Nadu.</p>
                  </div>
                </div>
              </div>

              {/* Working Hours */}
              <div className="pt-4 border-t border-white/10">
                <div className="flex items-center gap-2 text-[#00BFA5] font-semibold text-sm mb-3">
                  <Clock className="w-4 h-4" />
                  <span>Clinical Hours</span>
                </div>
                <div className="space-y-2 text-xs text-slate-300">
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-slate-400">Morning Session:</span>
                    <span className="font-semibold text-white">10:00 AM – 2:00 PM</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-slate-400">Evening Session:</span>
                    <span className="font-semibold text-white">5:00 PM – 8:30 PM</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-400">Sunday:</span>
                    <span className="font-semibold text-[#00BFA5]">Appointment only</span>
                  </div>
                </div>
              </div>

              {/* Phone & Direct Communications */}
              <div className="pt-4 border-t border-white/10 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-[#008F87]/20 text-[#00BFA5]">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block">Clinic Phone</span>
                    <a
                      href="tel:9790060801"
                      className="text-base font-bold text-white hover:text-[#00BFA5] transition-colors"
                    >
                      97900 60801
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-[#008F87]/20 text-[#00BFA5]">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block">WhatsApp Enquiries</span>
                    <a
                      href="https://wa.me/919790060801?text=Hello%20Malligai%20Dental%20Care"
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm font-semibold text-[#00BFA5] hover:underline"
                    >
                      +91 97900 60801
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Google Maps Navigation Button */}
            <div className="pt-6 mt-6 border-t border-white/10">
              <a
                href="https://www.google.com/maps/search/?api=1&query=No.+71-1%2F27A+Jawaharlal+Nehru+Road+Opposite+Muthusamy+Park+Sengottai"
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 px-4 rounded-xl text-xs font-bold text-white bg-[#008F87] hover:bg-[#00BFA5] transition-all flex items-center justify-center gap-2 shadow-md shadow-[#008F87]/20"
              >
                <Navigation className="w-4 h-4" />
                <span>Get Directions on Google Maps</span>
              </a>
            </div>
          </div>

          {/* Interactive Google Map Embed (7 cols) */}
          <div className="lg:col-span-7 rounded-3xl overflow-hidden glass-card border border-[#00BFA5]/25 relative min-h-[380px] flex flex-col">
            <div className="p-4 bg-[#10182D]/90 border-b border-white/10 flex items-center justify-between text-xs text-slate-300">
              <div className="flex items-center gap-2 font-medium">
                <MapPin className="w-4 h-4 text-[#00BFA5]" />
                <span>Sengottai, Tamil Nadu – Opposite Muthusamy Park</span>
              </div>
              <span className="text-[11px] text-slate-400">PIN: 627 809</span>
            </div>

            {/* Google Maps iFrame */}
            <div className="w-full flex-1 min-h-[340px] relative">
              <iframe
                title="Malligai Dental Care Location Map"
                src="https://maps.google.com/maps?q=Jawaharlal+Nehru+Road,+Opposite+Muthusamy+Park,+Sengottai,+Tamil+Nadu+627809&t=&z=16&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0 absolute inset-0 filter saturate-150 contrast-105"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
