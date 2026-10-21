import React, { useState } from 'react';
import { Scan, Radio, CheckCircle, Cpu, Eye, Sparkles } from 'lucide-react';
import { ToothCanvas } from './3d/ToothCanvas';

export const Technology: React.FC = () => {
  const [show3dDemo, setShow3dDemo] = useState(false);

  return (
    <section id="technology" className="py-20 bg-[#10182D] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#00BFA5] uppercase tracking-wider mb-2">
            <span>Modern Dental Technology</span>
            <span aria-hidden="true">·</span>
            <span>Accurate Diagnostics</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Advanced Clinical Equipment in Sengottai
          </h2>
          <p className="text-base text-slate-300">
            Precision begins with clear visualization. Our digital intraoral scanner and digital 
            radiography elevate clinical assessment, enhance treatment planning, and eliminate patient discomfort.
          </p>
        </div>

        {/* 2 Feature Spotlights with Real Photos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">
          {/* Tech 1: Intraoral Scanner */}
          <div className="glass-card rounded-3xl overflow-hidden border border-[#00BFA5]/25 flex flex-col justify-between hover:border-[#00BFA5]/50 transition-all duration-300">
            <div className="relative h-64 sm:h-72 overflow-hidden bg-[#16213E]">
              <img
                src="/assets/aistudio/Media__10__025fdfb0.jpg"
                alt="Modern Intraoral 3D Scanner cart and digital imaging handpiece at Malligai Dental Care"
                className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#10182D]/85 border border-[#00BFA5]/30 text-xs font-semibold text-[#00BFA5]">
                <Scan className="w-3.5 h-3.5" />
                <span>In-Clinic Facility</span>
              </div>
            </div>

            <div className="p-7 flex flex-col flex-1 justify-between">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Intraoral 3D Scanner
                </h3>
                <p className="text-xs font-semibold text-[#00BFA5] uppercase tracking-wider mb-4">
                  Digital Impression & Treatment Planning
                </p>
                <p className="text-sm text-slate-300 leading-relaxed mb-5">
                  Our handheld optical intraoral scanner captures thousands of photorealistic 3D data points 
                  per second inside your mouth. This replaces conventional, uncomfortable impression trays and 
                  gooey pastes with an instant, color-accurate digital 3D model of your teeth and gums.
                </p>

                <div className="space-y-2.5 text-xs text-slate-200 mb-6">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#00BFA5] shrink-0 mt-0.5" />
                    <span><strong>Gag-Free Experience:</strong> Eliminates alginate impression trays for seamless patient comfort.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#00BFA5] shrink-0 mt-0.5" />
                    <span><strong>Sub-Millimeter Accuracy:</strong> Perfect marginal fit for crowns, bridges, and BPS dentures.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#00BFA5] shrink-0 mt-0.5" />
                    <span><strong>Immediate Visualization:</strong> Patients can view their 3D dentition on-screen with their dentist.</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShow3dDemo(!show3dDemo)}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-[#00BFA5] hover:text-white bg-[#008F87]/15 hover:bg-[#008F87] border border-[#00BFA5]/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>{show3dDemo ? 'Close 3D Scan Demo' : 'View 3D Optical Scan Simulation'}</span>
              </button>
            </div>
          </div>

          {/* Tech 2: Digital X-Ray & Modern Operatory */}
          <div className="glass-card rounded-3xl overflow-hidden border border-[#00BFA5]/25 flex flex-col justify-between hover:border-[#00BFA5]/50 transition-all duration-300">
            <div className="relative h-64 sm:h-72 overflow-hidden bg-[#16213E]">
              <img
                src="/assets/aistudio/Media__8__cfd46503.jpg"
                alt="Digital Wall-mounted X-ray unit and treatment room at Malligai Dental Care Sengottai"
                className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#10182D]/85 border border-[#00BFA5]/30 text-xs font-semibold text-[#00BFA5]">
                <Radio className="w-3.5 h-3.5" />
                <span>In-Clinic Facility</span>
              </div>
            </div>

            <div className="p-7 flex flex-col flex-1 justify-between">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Digital Dental Radiography (X-Ray)
                </h3>
                <p className="text-xs font-semibold text-[#00BFA5] uppercase tracking-wider mb-4">
                  Low-Dose, Instant High-Resolution Imaging
                </p>
                <p className="text-sm text-slate-300 leading-relaxed mb-5">
                  Equipped with modern wall-mounted digital radiography arms, our clinic provides instantaneous 
                  imaging of tooth roots, bone density, hidden cavities, and wisdom tooth angulations. 
                  Digital sensors dramatically reduce radiation exposure compared to traditional film.
                </p>

                <div className="space-y-2.5 text-xs text-slate-200 mb-6">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#00BFA5] shrink-0 mt-0.5" />
                    <span><strong>Low Radiation Exposure:</strong> Up to 80% reduction compared to traditional film X-rays.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#00BFA5] shrink-0 mt-0.5" />
                    <span><strong>Instant Screen Review:</strong> High-definition clarity within seconds for fast, accurate diagnosis.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#00BFA5] shrink-0 mt-0.5" />
                    <span><strong>Ecologically Safe:</strong> 100% digital, eliminating hazardous chemical processing liquids.</span>
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300 flex items-center gap-3">
                <Cpu className="w-5 h-5 text-[#008F87] shrink-0" />
                <span>Integrated directly into our treatment planning computers for real-time doctor review.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Optional 3D Scan Simulation Drawer */}
        {show3dDemo && (
          <div className="glass-card rounded-3xl p-6 sm:p-8 border border-[#00BFA5]/40 mb-8 animate-in fade-in duration-300">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-white/10">
              <div>
                <span className="text-xs font-semibold text-[#00BFA5] uppercase tracking-wider block">
                  Interactive Simulation
                </span>
                <h4 className="text-xl font-bold text-white">
                  Intraoral 3D Optical Scan Beam Visualization
                </h4>
              </div>
              <button
                onClick={() => setShow3dDemo(false)}
                className="text-xs font-medium text-slate-400 hover:text-white px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 cursor-pointer"
              >
                Close Simulation
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-7 h-72 sm:h-80 w-full rounded-2xl bg-[#10182D]/90 overflow-hidden relative border border-[#00BFA5]/20">
                <ToothCanvas mode="scanner" interactive={true} autoRotate={true} showControls={false} />
              </div>

              <div className="md:col-span-5 text-sm text-slate-300 space-y-3">
                <p className="font-semibold text-white">How the Intraoral Scanner works:</p>
                <p className="text-xs leading-relaxed text-slate-300">
                  The optical scanner emits structured turquoise light patterns onto the dental crown and gingival margins. 
                  Real-time photogrammetry software assembles millions of coordinate points into an airtight 3D CAD model.
                </p>
                <div className="p-3 rounded-lg bg-[#008F87]/15 border border-[#00BFA5]/25 text-xs text-[#00BFA5]">
                  ✓ Eliminates messy alginate impressions<br />
                  ✓ High-definition crown margins<br />
                  ✓ Comfortable & swift
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
