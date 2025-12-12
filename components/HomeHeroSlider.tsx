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
  titleSize?: string;
  fontFamily?: string;
  textPosition?: string;
  overlayOpacity?: number;
  duration?: number;
  transition?: "fade" | "zoom-in" | "zoom-out" | "slide";
  images: { asset: { url: string } }[];
};

export default function HomeHeroSlider({ slides }: { slides: Slide[] }) {
  const [slideIndex, setSlideIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);

  const slide = slides[slideIndex];
  const images = slide?.images ?? [];
  const duration = slide?.duration ?? 4000;
  const transitionType = slide?.transition ?? "fade";

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setImageIndex(i => (i + 1) % images.length);
      setImageLoaded(false);
    }, duration);
    return () => clearInterval(timer);
  }, [images.length, duration]);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setSlideIndex(i => (i + 1) % slides.length);
      setImageIndex(0);
      setImageLoaded(false);
    }, duration * images.length);
    return () => clearInterval(timer);
  }, [slides.length, images.length, duration]);

  if (!slide || images.length === 0) return null;

  const imageVariants = {
    fade: { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } },
    "zoom-in": { initial: { scale: 1.2 }, animate: { scale: 1 }, exit: { opacity: 0 } },
    "zoom-out": { initial: { scale: 0.8 }, animate: { scale: 1 }, exit: { opacity: 0 } },
    slide: { initial: { x: "100%" }, animate: { x: "0%" }, exit: { x: "-100%" } },
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
            onLoadingComplete={() => setImageLoaded(true)}
          />
        </motion.div>
      </AnimatePresence>

      {imageLoaded && (
        <div
          className="absolute inset-0 bg-black z-10"
          style={{ opacity: slide.overlayOpacity ?? 0.4 }}
        />
      )}

      {imageLoaded && (
        <div
          className="
            absolute z-20 max-w-3xl px-6
            top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
            text-center
          "
          style={{
            color: slide.textColor ?? "#fff",
            fontFamily: slide.fontFamily ?? "inherit",
          }}
        >
          {slide.title && (
            <h1 className="
              font-extrabold uppercase
              text-3xl sm:text-4xl md:text-6xl
            ">
              {slide.title}
            </h1>
          )}

          {slide.subtitle && (
            <h3 className="
              mt-3
              text-base sm:text-lg md:text-2xl
              font-semibold
            ">
              {slide.subtitle}
            </h3>
          )}
        </div>
      )}
    </div>
  );
}
