"use client";

import { useState } from "react";
import ImageCarousel from "./components/ImageCarousel";
import Modal from "./components/Modal";
import GalleryModal from "./components/GalleryModal";

import tharImage1 from "../../public/images/thar1.jpg";
import tharImage2 from "../../public/images/thar2.jpg";
import tharImage3 from "../../public/images/thar3.jpg";
import tharImage4 from "../../public/images/thar4.jpg";

const localImages = [
  { id: 1, src: tharImage1 },
  { id: 2, src: tharImage2 },
  { id: 3, src: tharImage3 },
  { id: 4, src: tharImage4 },
];

export default function HomePage() {
  const [invites, setInvites] = useState(50);
  const [duration, setDuration] = useState(6);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [galleryStartIndex, setGalleryStartIndex] = useState(0);

  const calculatedValue = invites * 100 + duration * 500;

  const openGallery = (index) => {
    setGalleryStartIndex(index);
    setIsGalleryOpen(true);
  };

  return (
    <>
      <main className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3">
            <ImageCarousel
              onOpenModal={() => setIsModalOpen(true)}
              onOpenGallery={openGallery}
            />
          </div>
          <div className="lg:col-span-2 flex flex-col gap-8">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h1 className="text-2xl font-bold text-slate-900">
                Mahindra Thar
              </h1>
              <p className="text-sm text-slate-500 mb-4">
                LX 4-STR Hard Top Diesel
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <p className="text-slate-600">
                  <strong>Year:</strong> 2021
                </p>
                <p className="text-slate-600">
                  <strong>Fuel:</strong> Diesel
                </p>
                <p className="text-slate-600">
                  <strong>KM:</strong> 24,000
                </p>
                <p className="text-slate-600">
                  <strong>Type:</strong> Manual
                </p>
              </div>
              <p className="text-2xl font-bold text-slate-800 mt-4">
                ₹13.26 Lakh
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-slate-900">
                Price Calculator
              </h2>
              <p className="text-sm text-slate-500 mb-5">
                Calculate an estimated event cost
              </p>
              <div className="space-y-5">
                <div>
                  <div className="flex justify-between items-baseline mb-1">
                    <label
                      htmlFor="invites"
                      className="text-sm font-medium text-slate-700"
                    >
                      Number of Invites
                    </label>
                    <span className="font-semibold text-purple-600">
                      {invites}
                    </span>
                  </div>
                  <input
                    id="invites"
                    type="range"
                    min="10"
                    max="500"
                    step="10"
                    value={invites}
                    onChange={(e) => setInvites(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                  />
                </div>
                <div>
                  <div className="flex justify-between items-baseline mb-1">
                    <label
                      htmlFor="duration"
                      className="text-sm font-medium text-slate-700"
                    >
                      Duration (Months)
                    </label>
                    <span className="font-semibold text-purple-600">
                      {duration}
                    </span>
                  </div>
                  <input
                    id="duration"
                    type="range"
                    min="1"
                    max="24"
                    value={duration}
                    onChange={(e) => setDuration(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                  />
                </div>
              </div>
              <div className="text-center border-t border-slate-200 mt-6 pt-4">
                <p className="text-sm text-slate-500">Calculated Value</p>
                <p className="text-3xl font-bold text-green-600">
                  ₹{calculatedValue.toLocaleString("en-IN")}
                </p>
              </div>
              <button className="w-full mt-5 bg-purple-600 text-white font-semibold py-2.5 rounded-lg hover:bg-purple-700 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-400">
                Check Eligibility
              </button>
            </div>
          </div>
        </div>
      </main>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-2xl font-bold">360 Interactive View</h2>
        <p className="text-gray-600 mt-2">
          This is a placeholder for the 360 viewer.
        </p>
      </Modal>
      <GalleryModal
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
        images={localImages}
        startIndex={galleryStartIndex}
      />
    </>
  );
}
