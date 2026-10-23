import React, { useState } from 'react';
import { CLINIC_PHOTOS } from '../data/clinicData';
import { ClinicPhoto } from '../types';
import { Camera, ZoomIn, X, ChevronLeft, ChevronRight, CheckCircle, ShieldCheck } from 'lucide-react';

interface ClinicGalleryProps {
  selectedPhotoModal: { src: string; title: string } | null;
  onClosePhotoModal: () => void;
  onOpenPhotoModal: (src: string, title: string) => void;
}

export const ClinicGallery: React.FC<ClinicGalleryProps> = ({
  selectedPhotoModal,
  onClosePhotoModal,
  onOpenPhotoModal
}) => {
  const [activeCategory, setActiveCategory] = useState<'All' | 'Exterior' | 'Operatory' | 'Technology'>('All');
  const [activePhotoIndex, setActivePhotoIndex] = useState<number>(0);

  const filteredPhotos = CLINIC_PHOTOS.filter((photo) => {
    if (activeCategory === 'All') return true;
    return photo.category === activeCategory;
  });

  const handleOpenPhoto = (photo: ClinicPhoto, index: number) => {
    setActivePhotoIndex(index);
    onOpenPhotoModal(photo.imageSrc, photo.title);
  };

  const handleNextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextIdx = (activePhotoIndex + 1) % CLINIC_PHOTOS.length;
    setActivePhotoIndex(nextIdx);
    onOpenPhotoModal(CLINIC_PHOTOS[nextIdx].imageSrc, CLINIC_PHOTOS[nextIdx].title);
  };

  const handlePrevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    const prevIdx = (activePhotoIndex - 1 + CLINIC_PHOTOS.length) % CLINIC_PHOTOS.length;
    setActivePhotoIndex(prevIdx);
    onOpenPhotoModal(CLINIC_PHOTOS[prevIdx].imageSrc, CLINIC_PHOTOS[prevIdx].title);
  };

  return (
    <section id="gallery" className="py-20 bg-slate-100 text-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 bg-slate-900 border border-slate-800 px-3.5 py-1.5 rounded-full text-xs font-bold text-white uppercase tracking-wider mb-4">
            <Camera className="w-3.5 h-3.5 text-white" />
            <span>Our Facility & Operatory</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-4">
            Real Clinic Tour & Infrastructure
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Take a look inside Malligai Dental Care. We take immense pride in our sterile operatory, comfortable treatment chairs, and state-of-the-art dental equipment.
          </p>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            {(['All', 'Exterior', 'Operatory', 'Technology'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  activeCategory === cat
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                {cat === 'All' ? 'All Photos (4)' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredPhotos.map((photo, idx) => (
            <div
              key={photo.id}
              onClick={() => handleOpenPhoto(photo, idx)}
              className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-slate-200 cursor-pointer group flex flex-col"
            >
              {/* Photo Display */}
              <div className="relative aspect-[16/10] bg-slate-900 overflow-hidden">
                <img
                  src={photo.imageSrc}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                
                {/* Verified Tag */}
                <div className="absolute top-4 left-4 bg-slate-900/85 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white flex items-center space-x-1.5 shadow-md border border-slate-700/60">
                  <ShieldCheck className="w-3.5 h-3.5 text-white" />
                  <span>{photo.highlight}</span>
                </div>

                {/* Hover overlay with zoom icon */}
                <div className="absolute inset-0 bg-slate-950/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="bg-white/95 backdrop-blur-md px-4 py-2 rounded-xl text-xs font-bold text-slate-900 flex items-center space-x-2 shadow-xl scale-95 group-hover:scale-100 transition-transform">
                    <ZoomIn className="w-4 h-4 text-sky-600" />
                    <span>Click to Enlarge</span>
                  </div>
                </div>
              </div>

              {/* Photo Details */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-sky-600 bg-sky-50 px-2 py-0.5 rounded-md">
                      {photo.category}
                    </span>
                    <span className="text-xs text-slate-400">Authentic Clinic Photo</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-sky-600 transition-colors">
                    {photo.title}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    {photo.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-sky-600">
                  <span>View in High Resolution</span>
                  <span>→</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {selectedPhotoModal && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in"
          onClick={onClosePhotoModal}
        >
          <div
            className="relative max-w-5xl w-full bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-800 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar */}
            <div className="px-6 py-4 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                <h4 className="text-sm font-bold text-white">{selectedPhotoModal.title}</h4>
              </div>

              <button
                onClick={onClosePhotoModal}
                className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                aria-label="Close photo preview"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main Full-Size Image Container */}
            <div className="relative max-h-[75vh] flex items-center justify-center bg-black overflow-hidden">
              <img
                src={selectedPhotoModal.src}
                alt={selectedPhotoModal.title}
                className="max-h-[75vh] w-auto object-contain select-none"
              />

              {/* Prev / Next controls */}
              <button
                onClick={handlePrevPhoto}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white border border-slate-700 shadow-xl transition-all"
                title="Previous photo"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={handleNextPhoto}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white border border-slate-700 shadow-xl transition-all"
                title="Next photo"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Bottom Caption */}
            <div className="px-6 py-3 bg-slate-950/90 text-xs text-slate-300 flex items-center justify-between">
              <span>Photo {activePhotoIndex + 1} of {CLINIC_PHOTOS.length} • Malligai Dental Care Premises</span>
              <span className="text-white font-semibold">Verified Authentic Photograph</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
