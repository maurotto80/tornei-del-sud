"use client";

import { useState } from "react";

export default function GalleryLightbox({ images = [] }: { images: { url: string }[] }) {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(0);

  if (!images || images.length === 0) return null;

  function openLightbox(index: number) {
    setCurrent(index);
    setOpen(true);
  }

  function next() {
    setCurrent((prev) => (prev + 1) % images.length);
  }

  function prev() {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  }

  return (
    <>
      {/* GRID IMMAGINI */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((img, i) => (
          <img
            key={i}
            src={img.url}
            alt=""
            className="w-full h-40 object-cover rounded cursor-pointer hover:opacity-80 transition"
            onClick={() => openLightbox(i)}
          />
        ))}
      </div>

      {/* LIGHTBOX */}
      {open && (
        <div className="fixed inset-0 bg-black/90 z-[9999] flex items-center justify-center">
          
          {/* IMMAGINE */}
          <img
            src={images[current].url}
            className="max-w-[90%] max-h-[80vh] rounded shadow-lg"
          />

          {/* CHIUDI */}
          <button
            className="absolute top-6 right-6 text-white text-4xl"
            onClick={() => setOpen(false)}
          >
            ✕
          </button>

          {/* FRECCIA SINISTRA */}
          <button
            className="absolute left-6 text-white text-5xl"
            onClick={prev}
          >
            ‹
          </button>

          {/* FRECCIA DESTRA */}
          <button
            className="absolute right-6 text-white text-5xl"
            onClick={next}
          >
            ›
          </button>
        </div>
      )}
    </>
  );
}
