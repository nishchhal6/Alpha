"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Sample Data for the page
const carImages = [
  { id: "ext1", type: "Exterior", src: "/images/thar1.jpg" },
  { id: "ext2", type: "Exterior", src: "/images/thar2.jpg" },
  { id: "ext3", type: "Interior", src: "/images/thar3.jpg" },
  { id: "ext4", type: "Engine", src: "/images/thar4.jpg" },
  { id: "ext5", type: "Exterior", src: "/images/thar2.jpg" },
];

export default function GalleryPage() {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("Exterior");

  const filteredImages = carImages.filter((img) => img.type === activeTab);
  const router = useRouter();

  const goToPrevious = () => {
    // Functional update ka istemal karein, yeh best practice hai
    setActiveImageIndex((prevIndex) => {
      const newIndex = prevIndex === 0 ? carImages.length - 1 : prevIndex - 1;
      setActiveTab(carImages[newIndex].type);
      return newIndex;
    });
  };

  const goToNext = () => {
    setActiveImageIndex((prevIndex) => {
      const newIndex = prevIndex === carImages.length - 1 ? 0 : prevIndex + 1;
      setActiveTab(carImages[newIndex].type);
      return newIndex;
    });
  };

  const handleImageSelect = (globalIndex) => {
    setActiveImageIndex(globalIndex);
    const newTab = carImages[globalIndex].type;
    if (newTab !== activeTab) {
      setActiveTab(newTab);
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <header className="border-b sticky top-0 bg-white z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
          <Link
            href="/"
            className="text-gray-600 hover:text-gray-900 flex items-center gap-2"
          >
            &larr; <span className="font-medium">Back to car details</span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-xl font-bold">₹13.26 Lakh</span>
            <button className="bg-purple-600 text-white font-semibold py-2 px-6 rounded-md">
              View Similar Cars
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-2">
            <h3 className="font-semibold text-sm text-gray-500 uppercase tracking-wider mb-4">
              EXTERIOR
            </h3>
            <div className="space-y-3">
              {carImages.map((image, index) => (
                <button
                  key={image.id}
                  onClick={() => handleImageSelect(index)}
                  className={`block w-full rounded-md overflow-hidden border-2 transition-all ${
                    activeImageIndex === index
                      ? "border-purple-600"
                      : "border-transparent"
                  }`}
                >
                  <Image
                    src={image.src}
                    alt={image.type}
                    width={150}
                    height={100}
                    className="w-full h-auto object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
          <div className="col-span-10">
            <div className="border-b mb-6">
              <nav className="-mb-px flex space-x-8">
                {[
                  "Exterior",
                  "Interior",
                  "Engine",
                  "Tyres",
                  "Top Features",
                ].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-all ${
                      activeTab === tab
                        ? "border-purple-500 text-purple-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </nav>
            </div>
            <div className="relative aspect-[16/10] bg-gray-100 rounded-lg flex items-center justify-center">
              <Image
                src={carImages[activeImageIndex].src}
                alt="Main car view"
                fill
                style={{ objectFit: "contain" }}
                className="p-4"
              />
              <button
                onClick={goToPrevious}
                className="m-3 absolute left-3 top-1/2 -translate-y-1/2 z-10 bg-white/30 hover:bg-gray-800 text-gray-800 hover:text-white rounded-full w-9 h-9 flex items-center justify-center shadow-md transition-all"
                aria-label="Previous Image"
              >
                &#10094;
              </button>
              <button
                onClick={goToNext}
                className="m-3 absolute right-3 top-1/2 -translate-y-1/2 z-10 bg-white/30 hover:bg-gray-800 text-gray-800 hover:text-white rounded-full w-9 h-9 flex items-center justify-center shadow-md transition-all"
                aria-label="Next Image"
              >
                &#10095;
              </button>
            </div>
            <div className="text-center text-sm text-gray-500 mt-2">
              Tap on the image to zoom in
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
