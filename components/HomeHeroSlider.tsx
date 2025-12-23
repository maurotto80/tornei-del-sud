"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export type Slide = {
  title?: string;
  subtitle?: string;
  description?: string;
  buttonLabel?: string;
  buttonLink?: string;
  textColor?: string;
  titleSize?: "sm" | "md" | "lg" | "xl";
  fontFamily?: string;
  textPosition?: "top-left" | "top-center" | "top-right" | "center" | "bottom-center";
  overlayOpacity?: number;
  duration?: number;
  transition?: "fade" | "zoom-in" | "zoom-out" | "slide";
  images: { asset: { url: string } }[];
};

/* 🔠 MAPPATURA RESPONSIVE (QUI DECIDI TU LE DIMENSIONI) */
const TITLE_SIZE_MAP: Record<NonNullable<Slide["titleSize"]>, string> = {
  sm: "text-xl md:text-2xl lg:text-3xl",
  md: "text-2xl md:text-4xl lg:text-5xl",
  lg: "text-2xl md:text-5xl lg:text-6xl",
  xl: "text-2xl md:text-6xl lg:text-7xl",
};

/* 📍 POSIZIONI TESTO */
const POSITION_MAP: Record<
  NonNullable<Slide["textPosition"]>,
  string
> = {
  "top-left": "top-10 left-10 text-left",
  "top-center": "top-10 left-1/2 -translate-x-1/2 text-center",
  "top-right": "top-10 right-10 text-right",
  center:
    "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center",
  "bottom-center":
    "bottom-10 left-1/2 -translate-x-1/2 text-center",
};

export default function HomeHeroSlider({ slides }: { slides: Slide[] }) {
  const [slideIndex, setSlideIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);

  const slide = slides[slideIndex];
  const images = slide?.images ?? [];
  const duration = slide?.duration ?? 4000;
  const transitionType = slide?.transition ?? "fade";

  /* 🔁 CAMBIO IMMAGINI */
  useEffect(() => {
    if (images.length <= 1) return;
    const t = setInterval(() => {
      setImageIndex((i) => (i + 1) % images.length);
    }, duration);
    return () => clearInterval(t);
  }, [images.length, duration]);

  /* 🔁 CAMBIO SLIDE */
  useEffect(() => {
    if (slides.length <= 1) return;
    const t = setInterval(() => {
      setSlideIndex((i) => (i + 1) % slides.length);
      setImageIndex(0);
    }, duration * images.length);
    return () => clearInterval(t);
  }, [slides.length, images.length, duration]);

  if (!slide || images.length === 0) return null;

  const imageVariants = {
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    },
    "zoom-in": {
      initial: { scale: 1.2 },
      animate: { scale: 1 },
      exit: { opacity: 0 },
    },
    "zoom-out": {
      initial: { scale: 0.8 },
      animate: { scale: 1 },
      exit: { opacity: 0 },
    },
    slide: {
      initial: { x: "100%" },
      animate: { x: "0%" },
      exit: { x: "-100%" },
    },
  };

  return (
    <div className="relative w-full h-[85vh] md:h-[90vh] overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        <motion.div
          key={`${slideIndex}-${imageIndex}`}
          className="absolute inset-0"
          variants={imageVariants[transitionType]}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 1 }}
        >
          <Image
            src={images[imageIndex].asset.url}
            alt={slide.title ?? "slide"}
            fill
            priority
            className="object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* OVERLAY */}
      <div
        className="absolute inset-0 bg-black z-10"
        style={{ opacity: slide.overlayOpacity ?? 0.4 }}
      />

      {/* TESTI */}
      <div
        className={`absolute z-20 max-w-3xl px-6 ${
          POSITION_MAP[slide.textPosition ?? "center"]
        }`}
        style={{
          color: slide.textColor ?? "#fff",
          fontFamily: slide.fontFamily ?? "inherit",
        }}
      >
        {slide.title && (
          <h1
            className={`font-extrabold uppercase ${
              TITLE_SIZE_MAP[slide.titleSize ?? "lg"]
            }`}
          >
            {slide.title}
          </h1>
        )}

        {slide.subtitle && (
          <h3 className="mt-3 text-base md:text-xl font-semibold">
            {slide.subtitle}
          </h3>
        )}
      </div>
    </div>
  );
}
