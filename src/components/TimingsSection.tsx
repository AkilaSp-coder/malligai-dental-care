import React, { useMemo } from 'react';
import { CLINIC_INFO, CLINIC_TIMINGS_LIST } from '../data/clinicData';
import { Clock, Calendar, CheckCircle2, AlertCircle, Phone, ArrowRight } from 'lucide-react';

interface TimingsSectionProps {
  onBookClick: () => void;
}

export const TimingsSection: React.FC<TimingsSectionProps> = ({ onBookClick }) => {
  // Compute current open/closed status in Indian Standard Time (UTC+5:30)
  const clinicStatus = useMemo(() => {
    const now = new Date();
    // Convert to IST
    const utcTime = now.getTime() + now.getTimezoneOffset() * 60000;
    const istTime = new Date(utcTime + 3600000 * 5.5);

    const day = istTime.getDay(); // 0 is Sunday
    const hour = istTime.getHours();
    const minute = istTime.getMinutes();
    const currentMins = hour * 60 + minute;

    // Sunday
    if (day === 0) {
      return {
        isOpen: false,
        isSunday: true,
        message: 'Sunday: Prior Appointment Only',
        badge: 'Appointment Only Today',
      };
    }

    // Morning slot: 10:00 AM (600 mins) to 2:00 PM (840 mins)
    const morningStart = 10 * 60;
    const morningEnd = 14 * 60;

    // Evening slot: 5:00 PM (1020 mins) to 8:30 PM (1230 mins)
    const eveningStart = 17 * 60;
    const eveningEnd = 20 * 60 + 30;

    if (currentMins >= morningStart && currentMins < morningEnd) {
      return {
        isOpen: true,
        isSunday: false,
        message: 'Open Now (Morning Session until 2:00 PM)',
        badge: 'Clinic Open',
      };
    } else if (currentMins >= eveningStart && currentMins < eveningEnd) {
      return {
        isOpen: true,
        isSunday: false,
        message: 'Open Now (Evening Session until 8:30 PM)',
        badge: 'Clinic Open',
      };
    } else if (currentMins < morningStart) {
      return {
        isOpen: false,
        isSunday: false,
        message: 'Opens today at 10:00 AM (Morning Session)',
        badge: 'Currently Closed',
      };
    } else if (currentMins >= morningEnd && currentMins < eveningStart) {
      return {
        isOpen: false,
        isSunday: false,
        message: 'Midday Break · Evening Session opens at 5:00 PM',
        badge: 'Opens at 5:00 PM',
      };
    } else {
      return {
        isOpen: false,
        isSunday: false,
        message: 'Closed for the day · Opens tomorrow at 10:00 AM',
        badge: 'Currently Closed',
      };
    }
  }, []);

  return (
    <section id="timings" className="py-20 lg:py-28 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Weekly Schedule Breakdown */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-700 mb-2">
              <span>Visiting Hours & Schedule</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
              Convenient Operating Hours
            </h2>
            <p className="text-base text-slate-600 leading-relaxed mb-8">
              We operate two daily sessions to accommodate school children, working professionals, and outstation patients visiting Sengottai.
            </p>

            {/* Current Real-time Status Card */}
            <div className="mb-8 p-4 rounded-2xl bg-teal-50/80 border border-teal-200/90 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div
                  className={`w-3 h-3 rounded-full ${
                    clinicStatus.isOpen
                      ? 'bg-emerald-500'
                      : clinicStatus.isSunday
                      ? 'bg-amber-500'
                      : 'bg-slate-400'
                  }`}
                />
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                    Live Clinic Status (IST)
                  </span>
                  <span className="text-sm font-semibold text-slate-900">
                    {clinicStatus.message}
                  </span>
                </div>
              </div>
              <button
                onClick={onBookClick}
                className="hidden sm:inline-flex text-xs font-bold text-teal-800 hover:text-teal-950 underline cursor-pointer"
              >
                Reserve Slot →
              </button>
            </div>

            {/* Schedule Table */}
            <div className="overflow-hidden border border-slate-200 rounded-2xl shadow-sm">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th scope="col" className="py-3.5 pl-6 pr-3 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Day
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Morning Session
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Evening Session
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white text-sm">
                  {CLINIC_TIMINGS_LIST.map((slot) => (
                    <tr
                      key={slot.day}
                      className={slot.status === 'appointment-only' ? 'bg-amber-50/40' : 'hover:bg-slate-50/60'}
                    >
                      <td className="whitespace-nowrap py-3.5 pl-6 pr-3 font-semibold text-slate-900">
                        {slot.day}
                      </td>
                      <td className="whitespace-nowrap px-3 py-3.5 text-slate-600 tabular-nums">
                        {slot.morning}
                      </td>
                      <td className="whitespace-nowrap px-3 py-3.5 text-slate-600 tabular-nums">
                        {slot.evening}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Column: Appointment Notice & Emergency Contact */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-slate-800 to-teal-950 rounded-3xl p-7 sm:p-9 text-white shadow-xl flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-400/20 text-teal-300 text-xs font-medium mb-5 border border-teal-400/30">
                <Calendar className="w-3.5 h-3.5" />
                <span>Sunday Guidelines</span>
              </div>

              <h3 className="font-heading text-2xl font-bold text-white mb-4">
                Sunday Appointments
              </h3>

              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                Sundays are reserved strictly for pre-booked surgical procedures, implant stages, and orthodontic follow-ups. Please book your Sunday slot at least 24 hours in advance via WhatsApp or phone.
              </p>

              <div className="space-y-3.5 border-t border-slate-700/80 pt-6 mb-8 text-xs text-slate-300">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                  <span>Morning appointments: 10:00 AM – 2:00 PM</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                  <span>Evening appointments: 5:00 PM – 8:30 PM</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                  <span>Walk-ins welcome on Monday – Saturday</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-700/80">
              <span className="text-xs text-slate-400 block mb-2">Direct Telephone Line</span>
              <a
                href={CLINIC_INFO.phoneHref}
                className="text-2xl font-bold text-white hover:text-teal-300 transition-colors flex items-center gap-2 mb-4"
              >
                <Phone className="w-6 h-6 text-teal-400" />
                <span>{CLINIC_INFO.phone}</span>
              </a>

              <button
                type="button"
                onClick={onBookClick}
                className="w-full py-3 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-sm rounded-xl transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Book Appointment Online</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
