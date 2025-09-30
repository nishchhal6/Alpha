"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import tharImage1 from "../../../public/images/thar1.jpg";
import tharImage2 from "../../../public/images/thar2.jpg";
import tharImage3 from "../../../public/images/thar3.jpg";
import tharImage4 from "../../../public/images/thar4.jpg";

const localImages = [
  { id: 1, src: tharImage1 },
  { id: 2, src: tharImage2 },
  { id: 3, src: tharImage3 },
  { id: 4, src: tharImage4 },
];

export default function ImageCarousel({ onOpenModal, onOpenGallery }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const router = useRouter();

  const goToPrevious = (e) => {
    e.stopPropagation();
    const newIndex =
      activeIndex === 0 ? localImages.length - 1 : activeIndex - 1;
    setActiveIndex(newIndex);
  };

  const goToNext = (e) => {
    e.stopPropagation();
    const newIndex =
      activeIndex === localImages.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(newIndex);
  };

  const handleThumbnailClick = (index) => {
    setActiveIndex(index);
  };

  const handleMainImageClick = () => {
    router.push("/gallery");
  };

  return (
    <div className="flex flex-col gap-4">
      <div
        className="relative w-full aspect-video bg-gray-200 rounded-lg shadow-md overflow-hidden cursor-pointer"
        onClick={handleMainImageClick}
      >
        <Image
          src={localImages[activeIndex].src}
          alt="Mahindra Thar"
          fill
          style={{ objectFit: "cover" }}
          className="transition-opacity duration-300 ease-in-out"
          key={localImages[activeIndex].id}
          placeholder="blur"
          priority
        />
        <button
          onClick={goToPrevious}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-10 bg-white/30 hover:bg-gray-800 text-gray-800 hover:text-white rounded-full w-9 h-9 flex items-center justify-center shadow-md transition-all"
          aria-label="Previous Image"
        >
          &#10094;
        </button>
        <button
          onClick={goToNext}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-10 bg-white/30 hover:bg-gray-800 text-gray-800 hover:text-white rounded-full w-9 h-9 flex items-center justify-center shadow-md transition-all"
          aria-label="Next Image"
        >
          &#10095;
        </button>
        <Image
          src={localImages[activeIndex].src}
          alt="Mahindra Thar"
          fill
          style={{ objectFit: "cover" }}
          key={localImages[activeIndex].id}
          placeholder="blur"
          priority
        />
        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpenModal();
          }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 bg-black/60 hover:bg-black/80 text-white text-sm py-1.5 px-3 rounded-md backdrop-blur-sm transition-all"
        >
          Click to view 360°
        </button>
      </div>
      <div className="grid grid-cols-5 gap-3">
        {localImages.map((image, index) => (
          <button
            key={image.id}
            onClick={() => handleThumbnailClick(index)}
            className={`relative aspect-video w-full rounded-md overflow-hidden border-2 transition-all ${
              activeIndex === index
                ? "border-purple-600 shadow-lg"
                : "border-transparent hover:border-gray-400"
            }`}
          >
            <Image
              src={image.src}
              alt={`Thumbnail ${index + 1}`}
              fill
              style={{ objectFit: "cover" }}
            />
            {index === 0 && (
              <div className="absolute top-1 right-1 bg-yellow-400 font-semibold text-black text-xs rounded-full px-1 py-0.5">
                360°
              </div>
            )}
          </button>
        ))}
        <div className="aspect-video w-full rounded-md bg-gray-200 flex items-center justify-center text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
