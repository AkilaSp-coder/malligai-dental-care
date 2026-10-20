import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { AboutSection } from './components/AboutSection';
import { DoctorsSection } from './components/DoctorsSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { TimingsSection } from './components/TimingsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AppointmentModal } from './components/AppointmentModal';
import { ServiceModal } from './components/ServiceModal';
import { FloatingActions } from './components/FloatingActions';
import { DentalService, DoctorProfile } from './types';

export default function App() {
  const [appointmentModalOpen, setAppointmentModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<DentalService | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<DoctorProfile | null>(null);
  const [detailModalService, setDetailModalService] = useState<DentalService | null>(null);

  const handleOpenAppointmentModal = (service?: DentalService, doctor?: DoctorProfile) => {
    setSelectedService(service || null);
    setSelectedDoctor(doctor || null);
    setAppointmentModalOpen(true);
  };

  const handleExploreServices = () => {
    const el = document.getElementById('services');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleViewServiceDetails = (service: DentalService) => {
    setDetailModalService(service);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans antialiased selection:bg-teal-500 selection:text-white">
      {/* 1. Sticky Navigation */}
      <Navbar onBookClick={() => handleOpenAppointmentModal()} />

      <main className="flex-1">
        {/* 2 - 5. Hero Section with 3D Tooth & CTAs */}
        <Hero
          onBookClick={() => handleOpenAppointmentModal()}
          onExploreServices={handleExploreServices}
        />

        {/* 6. Dental Services Section */}
        <ServicesSection
          onSelectService={handleViewServiceDetails}
          onBookService={(service) => handleOpenAppointmentModal(service)}
        />

        {/* 7. About the Clinic Section */}
        <AboutSection />

        {/* 8. Dentist Profile Cards (Dr. R. Patrajan & Dr. T. Sankari Patrajan) */}
        <DoctorsSection
          onBookWithDoctor={(doctor) => handleOpenAppointmentModal(undefined, doctor)}
        />

        {/* 9. Why Choose Us Section */}
        <WhyChooseUs />

        {/* 10. Clinic Timings & Schedule */}
        <TimingsSection onBookClick={() => handleOpenAppointmentModal()} />

        {/* 11. Contact Section with Map & WhatsApp Booking Form */}
        <ContactSection />
      </main>

      {/* 12. Professional Footer */}
      <Footer />

      {/* Floating Action Buttons */}
      <FloatingActions />

      {/* Interactive Appointment Modal */}
      <AppointmentModal
        isOpen={appointmentModalOpen}
        onClose={() => setAppointmentModalOpen(false)}
        preselectedService={selectedService}
        preselectedDoctor={selectedDoctor}
      />

      {/* Detailed Service Information Modal */}
      <ServiceModal
        service={detailModalService}
        onClose={() => setDetailModalService(null)}
        onBookService={(service) => handleOpenAppointmentModal(service)}
      />
    </div>
  );
}
