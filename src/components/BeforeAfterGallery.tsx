import React, { useState } from 'react';
import { TRANSFORMATION_CASES } from '../data/clinicData';
import { TransformationCase } from '../types';
import { Sparkles, ZoomIn, X, ChevronLeft, ChevronRight, CheckCircle2, AlertCircle } from 'lucide-react';

interface BeforeAfterGalleryProps {
  onOpenBooking: (serviceName?: string) => void;
}

export const BeforeAfterGallery: React.FC<BeforeAfterGalleryProps> = ({ onOpenBooking }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activeModalCase, setActiveModalCase] = useState<TransformationCase | null>(null);
  const [modalIndex, setModalIndex] = useState<number>(0);

  const categories = ['All', 'Fracture Repair', 'Space Closure', 'Tooth Replacement', 'Enamel & Occlusion'];

  const filteredCases = TRANSFORMATION_CASES.filter((item) => {
    if (activeCategory === 'All') return true;
    return item.category === activeCategory;
  });

  const handleOpenModal = (caseItem: TransformationCase, index: number) => {
    setActiveModalCase(caseItem);
    setModalIndex(index);
  };

  const handleCloseModal = () => {
    setActiveModalCase(null);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    const prevIdx = (modalIndex - 1 + filteredCases.length) % filteredCases.length;
    setModalIndex(prevIdx);
    setActiveModalCase(filteredCases[prevIdx]);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextIdx = (modalIndex + 1) % filteredCases.length;
    setModalIndex(nextIdx);
    setActiveModalCase(filteredCases[nextIdx]);
  };

  return (
    <section id="transformations" className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Subtle Ambient Light */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-sky-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 bg-sky-500/15 border border-sky-400/30 px-3.5 py-1.5 rounded-full text-xs font-bold text-sky-300 uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            <span>Clinical Case Outcomes</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-4">
            Before & After Smile Transformations
          </h2>
          
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Real clinical case records documenting restorative, aesthetic, and prosthodontic dental care delivered at Malligai Dental Care.
          </p>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  activeCategory === cat
                    ? 'bg-sky-600 text-white shadow-md shadow-sky-600/30'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700/80'
                }`}
              >
                {cat === 'All' ? `All Cases (${TRANSFORMATION_CASES.length})` : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCases.map((caseItem, idx) => (
            <div
              key={caseItem.id}
              onClick={() => handleOpenModal(caseItem, idx)}
              className="bg-slate-800/90 rounded-2xl border border-slate-700/80 overflow-hidden shadow-lg hover:shadow-2xl hover:border-sky-500/50 transition-all duration-300 cursor-pointer group flex flex-col justify-between"
            >
              <div>
                {/* Image Container with Consistent Aspect Ratio */}
                <div className="relative aspect-square sm:aspect-[4/3] bg-black overflow-hidden flex items-center justify-center">
                  <img
                    src={caseItem.imageSrc}
                    alt={caseItem.title}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                  {/* Badges: Confirmed Pair Indicator or Clinical Case Badge */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
                    {caseItem.isPair ? (
                      <span className="bg-sky-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-md flex items-center space-x-1">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Before & After Pair</span>
                      </span>
                    ) : (
                      <span className="bg-slate-900/90 text-slate-200 border border-slate-700 text-[11px] font-medium px-2.5 py-1 rounded-full shadow-md">
                        Clinical Documentation
                      </span>
                    )}
                  </div>

                  {/* Click to Enlarge Overlay */}
                  <div className="absolute bottom-3 right-3 bg-slate-900/85 hover:bg-slate-900 text-white px-3 py-1.5 rounded-lg text-xs font-medium flex items-center space-x-1.5 backdrop-blur-sm border border-slate-700 opacity-90 group-hover:opacity-100 transition-opacity">
                    <ZoomIn className="w-3.5 h-3.5 text-sky-400" />
                    <span>View Detail</span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-sky-400 font-semibold uppercase tracking-wider text-[11px] bg-sky-950/60 border border-sky-800/40 px-2.5 py-0.5 rounded-md">
                      {caseItem.category}
                    </span>
                    <span className="text-slate-400 text-[11px]">Malligai Dental Care</span>
                  </div>

                  <h3 className="font-bold text-white text-base group-hover:text-sky-300 transition-colors line-clamp-2">
                    {caseItem.title}
                  </h3>

                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    {caseItem.description}
                  </p>

                  {/* Before / After labels for confirmed pairs */}
                  {caseItem.isPair && caseItem.beforeLabel && caseItem.afterLabel && (
                    <div className="pt-2 grid grid-cols-2 gap-2 text-[11px] font-semibold border-t border-slate-700/60">
                      <div className="bg-slate-900/80 px-2.5 py-1.5 rounded-lg border border-slate-700 text-slate-300">
                        <span className="text-sky-300 font-bold block text-[10px] uppercase">Initial:</span>
                        <span>{caseItem.beforeLabel}</span>
                      </div>
                      <div className="bg-slate-900/80 px-2.5 py-1.5 rounded-lg border border-slate-700 text-slate-300">
                        <span className="text-teal-300 font-bold block text-[10px] uppercase">Final Result:</span>
                        <span>{caseItem.afterLabel}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Consultation Link */}
              <div className="px-5 py-3.5 bg-slate-950/60 border-t border-slate-700/60 flex items-center justify-between text-xs">
                <span className="text-slate-400">Personalized treatment plan</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenBooking(caseItem.title);
                  }}
                  className="text-sky-400 hover:text-sky-300 font-semibold"
                >
                  Consult Doctors →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Required Clinical Disclaimer */}
        <div className="mt-12 bg-slate-800/50 border border-slate-700/70 rounded-2xl p-4 sm:p-5 text-center max-w-3xl mx-auto flex items-center justify-center space-x-3 text-xs sm:text-sm text-slate-300">
          <AlertCircle className="w-5 h-5 text-sky-400 flex-shrink-0" />
          <p className="font-medium">
            Treatment results vary by patient. Consult our dentists for an individual assessment.
          </p>
        </div>

      </div>

      {/* Lightbox Modal */}
      {activeModalCase && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in"
          onClick={handleCloseModal}
        >
          <div
            className="relative max-w-4xl w-full bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-700 flex flex-col my-auto max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-5 py-3.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-sky-400 text-xs font-bold uppercase tracking-wider block">
                  {activeModalCase.category}
                </span>
                <h4 className="text-sm sm:text-base font-bold text-white truncate max-w-md sm:max-w-xl">
                  {activeModalCase.title}
                </h4>
              </div>

              <button
                onClick={handleCloseModal}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Image Viewport */}
            <div className="relative bg-black flex items-center justify-center overflow-hidden min-h-[300px] max-h-[60vh]">
              <img
                src={activeModalCase.imageSrc}
                alt={activeModalCase.title}
                className="max-h-[60vh] w-auto max-w-full object-contain select-none"
              />

              {/* Prev / Next controls */}
              <button
                onClick={handlePrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white border border-slate-700 transition-all"
                title="Previous case"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white border border-slate-700 transition-all"
                title="Next case"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Footer & Details */}
            <div className="p-4 sm:p-5 bg-slate-900 border-t border-slate-800 space-y-3">
              <p className="text-slate-300 text-xs sm:text-sm">
                {activeModalCase.description}
              </p>

              {/* Confirmed labels if pair */}
              {activeModalCase.isPair && activeModalCase.beforeLabel && activeModalCase.afterLabel && (
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="bg-slate-800 text-slate-200 px-3 py-1 rounded-md border border-slate-700">
                    <strong className="text-sky-300">Before:</strong> {activeModalCase.beforeLabel}
                  </span>
                  <span className="bg-slate-800 text-slate-200 px-3 py-1 rounded-md border border-slate-700">
                    <strong className="text-teal-300">After:</strong> {activeModalCase.afterLabel}
                  </span>
                </div>
              )}

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs border-t border-slate-800">
                <span className="text-slate-400 text-[11px]">
                  Case {modalIndex + 1} of {filteredCases.length} &bull; Treatment results vary by patient
                </span>
                <button
                  onClick={() => {
                    handleCloseModal();
                    onOpenBooking(activeModalCase.title);
                  }}
                  className="w-full sm:w-auto px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-xl transition-all"
                >
                  Book Consultation for Similar Treatment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
