import React, { useState } from 'react';
import { Calendar, Phone, MessageCircle, CheckCircle, AlertCircle, Clock, ArrowRight } from 'lucide-react';

interface AppointmentFormProps {
  initialTreatment?: string;
}

export const AppointmentForm: React.FC<AppointmentFormProps> = ({ initialTreatment = 'General Consultation' }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    treatment: initialTreatment,
    preferredDate: '',
    preferredTimeSlot: 'Morning (10:00 AM – 2:00 PM)',
    notes: '',
  });

  const [loading, setLoading] = useState(false);
  const [submittedData, setSubmittedData] = useState<{
    referenceId: string;
    whatsappUrl: string;
    message: string;
  } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Sync initial treatment if changed externally
  React.useEffect(() => {
    if (initialTreatment) {
      setFormData((prev) => ({ ...prev, treatment: initialTreatment }));
    }
  }, [initialTreatment]);

  // Today's date formatted as YYYY-MM-DD for min date
  const todayStr = new Date().toISOString().split('T')[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Frontend validation
    if (!formData.name.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }

    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number.');
      return;
    }

    if (!formData.preferredDate) {
      setErrorMessage('Please choose your preferred appointment date.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit enquiry. Please try again.');
      }

      setSubmittedData({
        referenceId: data.referenceId,
        whatsappUrl: data.whatsappUrl,
        message: data.message,
      });
    } catch (err: any) {
      setErrorMessage(err.message || 'Network error submitting enquiry. Please call us at 97900 60801 directly.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSubmittedData(null);
    setErrorMessage(null);
    setFormData({
      name: '',
      phone: '',
      treatment: 'General Consultation',
      preferredDate: '',
      preferredTimeSlot: 'Morning (10:00 AM – 2:00 PM)',
      notes: '',
    });
  };

  return (
    <section id="appointment" className="py-20 bg-[#10182D] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Context, Working Hours & Call Options (5 cols) */}
          <div className="lg:col-span-5 flex flex-col text-left">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#00BFA5] uppercase tracking-wider mb-2">
              <span>Appointment Enquiry</span>
              <span aria-hidden="true">·</span>
              <span>Fast Response</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4 leading-tight">
              Schedule Your Consultation in Sengottai
            </h2>

            <p className="text-base text-slate-300 leading-relaxed mb-6">
              Submit your enquiry online, and our clinic desk will review availability and confirm your 
              visit. You can also reach us directly via telephone or WhatsApp for immediate scheduling.
            </p>

            {/* Clinic Verified Working Hours Box */}
            <div className="p-5 rounded-2xl glass-card border border-[#00BFA5]/20 mb-6">
              <div className="flex items-center gap-2 text-[#00BFA5] font-bold text-sm mb-3">
                <Clock className="w-4 h-4" />
                <span>Verified Working Hours</span>
              </div>

              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="font-medium text-slate-400">Morning Session:</span>
                  <span className="font-semibold text-white">10:00 AM – 2:00 PM</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="font-medium text-slate-400">Evening Session:</span>
                  <span className="font-semibold text-white">5:00 PM – 8:30 PM</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="font-medium text-slate-400">Sunday:</span>
                  <span className="font-semibold text-[#00BFA5]">Appointment Only</span>
                </div>
              </div>
            </div>

            {/* Direct Contact Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="tel:9790060801"
                className="flex-1 py-3 px-4 rounded-xl text-xs font-bold text-white bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center gap-2 transition-all"
              >
                <Phone className="w-4 h-4 text-[#00BFA5]" />
                <span>Call 97900 60801</span>
              </a>
              <a
                href="https://wa.me/919790060801?text=Hello%20Malligai%20Dental%20Care,%20I%20would%20like%20to%20enquire%20for%20an%20appointment."
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-3 px-4 rounded-xl text-xs font-bold text-white bg-[#008F87] hover:bg-[#00BFA5] flex items-center justify-center gap-2 transition-all shadow-md shadow-[#008F87]/20"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Directly</span>
              </a>
            </div>

            <p className="text-[11px] text-slate-400 mt-4 leading-relaxed">
              * Note: An online enquiry is an appointment request and is subject to clinic confirmation.
            </p>
          </div>

          {/* Right Column: Appointment Form / Success Card (7 cols) */}
          <div className="lg:col-span-7">
            <div className="glass-card rounded-3xl p-6 sm:p-8 border border-[#00BFA5]/30 shadow-2xl relative">
              {submittedData ? (
                /* Success State */
                <div className="text-center py-6 animate-in fade-in duration-300">
                  <div className="w-16 h-16 rounded-full bg-[#008F87]/20 text-[#00BFA5] flex items-center justify-center mx-auto mb-4 border border-[#00BFA5]/30">
                    <CheckCircle className="w-8 h-8" />
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-2">
                    Enquiry Submitted Successfully!
                  </h3>

                  <p className="text-xs font-semibold text-[#00BFA5] tracking-wider uppercase mb-4">
                    Reference ID: <span className="font-mono text-white text-sm">{submittedData.referenceId}</span>
                  </p>

                  <p className="text-sm text-slate-300 max-w-md mx-auto mb-6 leading-relaxed">
                    Thank you! We have received your appointment request. Our clinic desk will contact you 
                    to confirm the exact time slot.
                  </p>

                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300 mb-6 max-w-md mx-auto text-left space-y-1.5">
                    <div><strong>Patient:</strong> {formData.name}</div>
                    <div><strong>Contact:</strong> {formData.phone}</div>
                    <div><strong>Treatment:</strong> {formData.treatment}</div>
                    <div><strong>Preferred Date:</strong> {formData.preferredDate}</div>
                    <div><strong>Time Slot:</strong> {formData.preferredTimeSlot}</div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a
                      href={submittedData.whatsappUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full sm:w-auto py-3 px-6 rounded-xl text-xs font-bold text-white bg-[#008F87] hover:bg-[#00BFA5] flex items-center justify-center gap-2 transition-all shadow-md shadow-[#008F87]/30"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Send to Clinic WhatsApp Now</span>
                    </a>

                    <button
                      onClick={handleReset}
                      className="w-full sm:w-auto py-3 px-5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors cursor-pointer"
                    >
                      Submit Another Enquiry
                    </button>
                  </div>
                </div>
              ) : (
                /* Enquiry Form */
                <form onSubmit={handleSubmit} className="space-y-4 text-left">
                  <h3 className="text-xl font-bold text-white mb-1">
                    Book an Appointment Enquiry
                  </h3>
                  <p className="text-xs text-slate-400 mb-4">
                    Fill in your details below. We will reach out to confirm your slot.
                  </p>

                  {errorMessage && (
                    <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-200 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Name and Phone Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        Patient Full Name <span className="text-[#00BFA5]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Anand Kumar"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#00BFA5] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        Mobile Phone Number <span className="text-[#00BFA5]">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="10-digit number (e.g. 9790060801)"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#00BFA5] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Treatment Selection */}
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Treatment Needed <span className="text-[#00BFA5]">*</span>
                    </label>
                    <select
                      value={formData.treatment}
                      onChange={(e) => setFormData({ ...formData, treatment: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#16213E] border border-white/10 text-white text-sm focus:outline-none focus:border-[#00BFA5] transition-colors cursor-pointer"
                    >
                      <option value="General Consultation">General Dental Consultation & Checkup</option>
                      <option value="BPS Dentures">BPS Dentures (Precision Biofunctional System)</option>
                      <option value="Painless Wisdom Tooth Removal">Painless Wisdom Tooth Removal</option>
                      <option value="Full Mouth Rehabilitation">Full Mouth Rehabilitation</option>
                      <option value="Intraoral 3D Scanning">Intraoral 3D Digital Scan</option>
                      <option value="Digital X-Ray Diagnostic">Digital Dental Radiography (X-Ray)</option>
                      <option value="Tooth Pain / Emergency">Tooth Pain / Urgent Care</option>
                    </select>
                  </div>

                  {/* Date and Time Slot Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        Preferred Date <span className="text-[#00BFA5]">*</span>
                      </label>
                      <input
                        type="date"
                        required
                        min={todayStr}
                        value={formData.preferredDate}
                        onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#16213E] border border-white/10 text-white text-sm focus:outline-none focus:border-[#00BFA5] transition-colors cursor-pointer"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        Preferred Time Slot <span className="text-[#00BFA5]">*</span>
                      </label>
                      <select
                        value={formData.preferredTimeSlot}
                        onChange={(e) => setFormData({ ...formData, preferredTimeSlot: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#16213E] border border-white/10 text-white text-sm focus:outline-none focus:border-[#00BFA5] transition-colors cursor-pointer"
                      >
                        <option value="Morning (10:00 AM – 2:00 PM)">Morning (10:00 AM – 2:00 PM)</option>
                        <option value="Evening (5:00 PM – 8:30 PM)">Evening (5:00 PM – 8:30 PM)</option>
                        <option value="Sunday (Appointment Only)">Sunday (Appointment Only)</option>
                      </select>
                    </div>
                  </div>

                  {/* Additional Notes */}
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Notes / Symptoms (Optional)
                    </label>
                    <textarea
                      rows={2}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="Briefly describe your dental concerns..."
                      className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#00BFA5] transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3.5 px-6 rounded-xl text-sm font-bold text-white bg-[#008F87] hover:bg-[#00BFA5] transition-all shadow-lg shadow-[#008F87]/25 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {loading ? (
                        <span>Submitting Enquiry...</span>
                      ) : (
                        <>
                          <Calendar className="w-4 h-4" />
                          <span>Submit Appointment Request</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
