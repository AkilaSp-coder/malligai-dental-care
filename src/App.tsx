import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Doctors } from './components/Doctors';
import { Treatments } from './components/Treatments';
import { Technology } from './components/Technology';
import { Gallery } from './components/Gallery';
import { AppointmentForm } from './components/AppointmentForm';
import { LocationContact } from './components/LocationContact';
import { Footer } from './components/Footer';
import { AiAssistant } from './components/AiAssistant';
import { QuickMobileBar } from './components/QuickMobileBar';
import { CinematicIntro } from './components/3d/CinematicIntro';

export default function App() {
  const [showIntro, setShowIntro] = useState(false);
  const [selectedTreatment, setSelectedTreatment] = useState('General Consultation');
  const [isAiChatOpen, setIsAiChatOpen] = useState(false);

  useEffect(() => {
    // Check if intro has already been seen in this session
    const seen = sessionStorage.getItem('mdc_intro_seen');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!seen && !prefersReducedMotion) {
      setShowIntro(true);
    }
  }, []);

  const handleScrollToBooking = (treatmentName?: string) => {
    if (treatmentName) {
      setSelectedTreatment(treatmentName);
    }
    const el = document.getElementById('appointment');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleReplayIntro = () => {
    sessionStorage.removeItem('mdc_intro_seen');
    setShowIntro(true);
  };

  return (
    <div className="min-h-screen bg-[#10182D] text-slate-100 flex flex-col font-sans relative selection:bg-[#00BFA5] selection:text-[#10182D]">
      {/* 3D Cinematic Opening Experience (On First Load or Replay) */}
      {showIntro && (
        <CinematicIntro
          onComplete={() => setShowIntro(false)}
          forceShow={showIntro}
        />
      )}

      {/* Top Header Navigation (Top Bar Contract) */}
      <Navbar
        onBookClick={() => handleScrollToBooking()}
        onAiChatClick={() => setIsAiChatOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section with Interactive 3D Human Tooth Visual */}
        <Hero
          onBookClick={() => handleScrollToBooking()}
          onReplayIntro={handleReplayIntro}
        />

        {/* About Malligai Dental Care (With Clinic Exterior Photo) */}
        <About />

        {/* Meet Our Doctors (Dr. R. Patrajan & Dr. T. Sankari Patrajan) */}
        <Doctors />

        {/* Specialised Dental Treatments (BPS Dentures, Wisdom Tooth, Full Mouth Rehab) */}
        <Treatments
          onSelectTreatment={(treatmentName) => handleScrollToBooking(treatmentName)}
        />

        {/* Modern Dental Technology (Intraoral 3D Scanner & Digital Radiography) */}
        <Technology />

        {/* Clinic Photo Gallery (All Verified Clinic Photos + Lightbox) */}
        <Gallery />

        {/* Appointment Enquiry Form & Working Hours */}
        <AppointmentForm initialTreatment={selectedTreatment} />

        {/* Location & Google Maps Interactive Embed */}
        <LocationContact />
      </main>

      {/* Footer */}
      <Footer
        onBookClick={() => handleScrollToBooking()}
        onReplayIntro={handleReplayIntro}
      />

      {/* AI-Powered Website Enquiry Assistant (Tamil / English) */}
      <AiAssistant
        onOpenBooking={() => handleScrollToBooking()}
      />

      {/* Mobile Sticky Action Bar (<15% Viewport height) */}
      <QuickMobileBar
        onBookClick={() => handleScrollToBooking()}
      />
    </div>
  );
}
