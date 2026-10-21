import React, { useState, useEffect } from 'react';
import { ToothCanvas } from './ToothCanvas';

interface CinematicIntroProps {
  onComplete: () => void;
  forceShow?: boolean;
}

export const CinematicIntro: React.FC<CinematicIntroProps> = ({ onComplete, forceShow = false }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [fadeState, setFadeState] = useState<'in' | 'active' | 'out'>('in');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Respect reduced-motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasSeenIntro = sessionStorage.getItem('mdc_intro_seen');

    if ((hasSeenIntro && !forceShow) || prefersReducedMotion) {
      onComplete();
      return;
    }

    setIsVisible(true);
    setFadeState('active');

    // Progress timer over ~4 seconds
    const startTime = Date.now();
    const duration = 3800; // 3.8s intro

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);

      if (elapsed >= duration) {
        clearInterval(interval);
        handleSkip();
      }
    }, 40);

    return () => clearInterval(interval);
  }, [forceShow]);

  const handleSkip = () => {
    setFadeState('out');
    sessionStorage.setItem('mdc_intro_seen', 'true');
    setTimeout(() => {
      setIsVisible(false);
      onComplete();
    }, 600);
  };

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#10182D] transition-opacity duration-700 ${
        fadeState === 'out' ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background ambient lighting */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-[#008F87]/20 blur-[120px]" />
        <div className="absolute -bottom-[20%] -right-[10%] w-[50vw] h-[50vw] rounded-full bg-[#00BFA5]/15 blur-[140px]" />
      </div>

      {/* Skip Button Top Right */}
      <div className="absolute top-6 right-6 z-20">
        <button
          onClick={handleSkip}
          className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-slate-300 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-all flex items-center gap-2 cursor-pointer border border-white/10 shadow-sm"
        >
          <span>Skip Intro</span>
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      {/* Main 3D Tooth Presentation */}
      <div className="relative z-10 flex flex-col items-center max-w-lg px-6 text-center">
        {/* Clinic emblem */}
        <div className="mb-2 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#008F87]/20 border border-[#00BFA5]/30 text-xs font-medium text-[#00BFA5]">
          <span>MALLIGAI DENTAL CARE</span>
          <span>·</span>
          <span>SENGOTTAI</span>
        </div>

        {/* 3D Canvas Box */}
        <div className="w-72 h-72 sm:w-80 sm:h-80 my-2">
          <ToothCanvas mode="clinical" autoRotate={true} showControls={false} />
        </div>

        {/* Brand Headline */}
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
          Your Smile Deserves the Best Care.
        </h2>
        <p className="text-base text-[#00BFA5] font-semibold tracking-wide">
          Recover Your Lovely Smile!
        </p>

        {/* Cinematic Loading Progress Bar */}
        <div className="w-48 h-1 bg-white/10 rounded-full mt-6 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#008F87] to-[#00BFA5] transition-all duration-75"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};
