/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],

  safelist: [
    // TITOLI SLIDER (dinamici da Sanity)
    "text-xl",
    "text-2xl",
    "text-3xl",
    "text-4xl",
    "text-5xl",
    "text-6xl",
    "text-7xl",

    "md:text-2xl",
    "md:text-3xl",
    "md:text-4xl",
    "md:text-5xl",
    "md:text-6xl",

    "lg:text-3xl",
    "lg:text-4xl",
    "lg:text-5xl",
    "lg:text-6xl",
    "lg:text-7xl",
  ],

  theme: {
    extend: {},
  },
  plugins: [],
};
