"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function GalleryModal({ isOpen, onClose, images, startIndex }) {
  const [currentIndex, setCurrentIndex] = useState(startIndex);

  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(startIndex);
    }
  }, [isOpen, startIndex]);

  if (!isOpen) return null;

  const goToPrevious = (e) => {
    e.stopPropagation();
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = (e) => {
    e.stopPropagation();
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div
      className="fixed inset-0 bg-black/90 z-50 flex flex-col items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Close Button */}
      <button
        className="absolute top-4 right-5 text-white/80 hover:text-white text-5xl font-light z-50"
        aria-label="Close gallery"
      >
        &times;
      </button>

      {/* Main Image Container */}
      <div
        className="relative w-full h-full max-w-4xl max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={images[currentIndex].src}
          alt="Full screen car image"
          fill
          style={{ objectFit: "contain" }}
          className="transition-opacity duration-300 ease-in-out"
          key={images[currentIndex].id}
        />
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-5 top-1/2 -translate-y-1/2 z-50 bg-black/50 hover:bg-black/80 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl"
        aria-label="Previous image"
      >
        &#10094;
      </button>
      <button
        onClick={goToNext}
        className="absolute right-5 top-1/2 -translate-y-1/2 z-50 bg-black/50 hover:bg-black/80 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl"
        aria-label="Next image"
      >
        &#10095;
      </button>
    </div>
  );
}
