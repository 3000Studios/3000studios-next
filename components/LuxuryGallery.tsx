'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { cloudinaryImage } from '@/lib/cloudinary';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface GalleryImage {
  id: string;
  publicId: string;
  title: string;
  description?: string;
}

interface LuxuryGalleryProps {
  images: GalleryImage[];
  title?: string;
}

export function LuxuryGallery({
  images,
  title = 'Our Collection',
}: LuxuryGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handlePrev = () => {
    if (selectedIndex !== null && selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
    } else if (selectedIndex !== null) {
      setSelectedIndex(images.length - 1);
    }
  };

  const handleNext = () => {
    if (selectedIndex !== null && selectedIndex < images.length - 1) {
      setSelectedIndex(selectedIndex + 1);
    } else if (selectedIndex !== null) {
      setSelectedIndex(0);
    }
  };

  return (
    <section className="w-full bg-black py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">
            {title}
          </h2>
          <p className="text-gray-400 text-lg">Discover our curated selection</p>
        </motion.div>

        {/* Grid Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {images.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => setSelectedIndex(index)}
              className="group relative overflow-hidden bg-gray-900 cursor-pointer h-80"
            >
              <img
                src={cloudinaryImage(image.publicId, {
                  width: 500,
                  height: 400,
                  crop: 'fill',
                  quality: 'auto',
                  format: 'auto',
                })}
                alt={image.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all duration-300 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100">
                <h3 className="text-white text-2xl font-bold text-center">
                  {image.title}
                </h3>
                {image.description && (
                  <p className="text-gray-300 text-center mt-2 px-4">
                    {image.description}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal/Lightbox */}
      {selectedIndex !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedIndex(null)}
        >
          <div
            className="relative w-full max-w-4xl max-h-[80vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedIndex(null)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors z-10"
            >
              <X size={32} />
            </button>

            {/* Image */}
            <motion.img
              key={images[selectedIndex].publicId}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              src={cloudinaryImage(images[selectedIndex].publicId, {
                width: 1200,
                height: 800,
                crop: 'fit',
                quality: 'auto',
                format: 'auto',
              })}
              alt={images[selectedIndex].title}
              className="w-full h-auto object-contain"
            />

            {/* Title & Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mt-6"
            >
              <h3 className="text-white text-2xl font-bold mb-2">
                {images[selectedIndex].title}
              </h3>
              {images[selectedIndex].description && (
                <p className="text-gray-300">
                  {images[selectedIndex].description}
                </p>
              )}
            </motion.div>

            {/* Navigation Arrows */}
            <button
              onClick={handlePrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 text-white hover:text-gray-300 transition-colors"
            >
              <ChevronLeft size={40} />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 text-white hover:text-gray-300 transition-colors"
            >
              <ChevronRight size={40} />
            </button>

            {/* Counter */}
            <div className="text-center text-gray-400 mt-6">
              {selectedIndex + 1} / {images.length}
            </div>
          </div>
        </motion.div>
      )}
    </section>
  );
}
