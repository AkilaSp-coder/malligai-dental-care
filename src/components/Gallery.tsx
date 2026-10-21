import React, { useState } from 'react';
import { Camera, X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';

interface GalleryImage {
  src: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
}

export const Gallery: React.FC = () => {
  const images: GalleryImage[] = [
    {
      src: '/assets/aistudio/Media__9__c31e93b0.jpg',
      title: 'Clinic Facade & Main Entrance',
      subtitle: 'Opposite Muthusamy Park, Sengottai',
      category: 'Exterior',
      description: 'Modern architecturally designed facade with welcoming entrance, signage, and ramp access for patient convenience.',
    },
    {
      src: '/assets/aistudio/Media__11__8fff19b4.jpg',
      title: 'Primary Dental Operatory',
      subtitle: 'Warm Wooden Cabinetry & Ergonomic Suite',
      category: 'Treatment Room',
      description: 'Spacious, clean, and comfortable operatory featuring ergonomic patient chair and hygienic clinical cabinetry.',
    },
    {
      src: '/assets/aistudio/Media__10__025fdfb0.jpg',
      title: 'Digital Intraoral Scanner Station',
      subtitle: 'High-Precision 3D Optical Imaging Cart',
      category: 'Technology',
      description: 'Cutting-edge digital scanning workstation for comfortable, paste-free impressions and instant 3D tooth modeling.',
    },
    {
      src: '/assets/aistudio/Media__8__cfd46503.jpg',
      title: 'Digital X-Ray & Treatment Suite',
      subtitle: 'Integrated Wall-Mounted Low-Dose Radiography',
      category: 'Diagnostics',
      description: 'Second operatory suite equipped with wall-mounted digital X-ray arm providing instant, safe imaging for accurate diagnosis.',
    },
  ];

  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  const handleNext = () => {
    if (activePhotoIndex !== null) {
      setActivePhotoIndex((activePhotoIndex + 1) % images.length);
    }
  };

  const handlePrev = () => {
    if (activePhotoIndex !== null) {
      setActivePhotoIndex((activePhotoIndex - 1 + images.length) % images.length);
    }
  };

  return (
    <section id="gallery" className="py-20 bg-[#10182D]/85 border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#00BFA5] uppercase tracking-wider mb-2">
            <span>Clinic Photo Gallery</span>
            <span aria-hidden="true">·</span>
            <span>Real Facilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            A Glimpse Inside Malligai Dental Care
          </h2>
          <p className="text-base text-slate-300">
            Take a visual tour of our clean, welcoming clinic, our specialized treatment operatory rooms, 
            and our advanced dental diagnostic equipment.
          </p>
        </div>

        {/* Responsive Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {images.map((item, idx) => (
            <div
              key={idx}
              onClick={() => setActivePhotoIndex(idx)}
              className="glass-card rounded-2xl overflow-hidden border border-[#00BFA5]/20 hover:border-[#00BFA5]/50 transition-all duration-300 group cursor-pointer flex flex-col justify-between"
            >
              <div className="relative h-64 sm:h-72 overflow-hidden bg-[#16213E]">
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#10182D] via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                <div className="absolute top-3 right-3 p-2 rounded-lg bg-[#10182D]/80 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <ZoomIn className="w-4 h-4 text-[#00BFA5]" />
                </div>
                <div className="absolute top-3 left-3 px-2 py-0.5 rounded-md bg-[#10182D]/80 border border-white/10 text-[10px] font-semibold text-[#00BFA5] uppercase">
                  {item.category}
                </div>
              </div>

              <div className="p-4 flex flex-col">
                <h3 className="text-base font-bold text-white mb-1 group-hover:text-[#00BFA5] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-400">
                  {item.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activePhotoIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center">
            {/* Close Button */}
            <button
              onClick={() => setActivePhotoIndex(null)}
              className="absolute -top-12 right-0 p-2 text-slate-300 hover:text-white rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Main Lightbox Image */}
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl max-h-[70vh] flex items-center justify-center bg-[#16213E]">
              <img
                src={images[activePhotoIndex].src}
                alt={images[activePhotoIndex].title}
                className="max-h-[70vh] w-auto object-contain rounded-2xl"
              />

              {/* Prev / Next Controls */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors cursor-pointer"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Lightbox Caption */}
            <div className="w-full text-center mt-4 text-white">
              <span className="text-xs font-semibold text-[#00BFA5] uppercase tracking-wider block mb-1">
                {images[activePhotoIndex].category} · Photo {activePhotoIndex + 1} of {images.length}
              </span>
              <h3 className="text-xl font-bold">{images[activePhotoIndex].title}</h3>
              <p className="text-sm text-slate-300 max-w-xl mx-auto mt-1">
                {images[activePhotoIndex].description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
