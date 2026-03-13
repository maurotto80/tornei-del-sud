// app/page.tsx

export default function ComingSoon() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white text-center px-6">

      {/* LOGO */}
      <img
        src="/logo.png"
        alt="Tornei del Sud"
        className="w-40 mb-8"
      />

      {/* TITOLO */}
      <h1 className="text-4xl md:text-6xl font-bold mb-6">
        Tornei del Sud
      </h1>

      {/* SOTTOTITOLO */}
      <p className="max-w-xl text-lg md:text-xl text-gray-300 mb-10">
        Stiamo preparando la nuova piattaforma dedicata ai tornei di calcio giovanile nel Sud Italia.
      </p>

      {/* COMING SOON */}
      <div className="text-2xl font-semibold bg-orange-500 px-6 py-3 rounded-full mb-8">
        🚀 Coming Soon
      </div>

      {/* CONTATTO */}
      <p className="text-gray-400">
        Per informazioni:
      </p>

      <a
        href="mailto:info@torneidelsud.it"
        className="text-orange-400 text-lg font-semibold hover:underline mt-2"
      >
        info@torneidelsud.it
      </a>

      {/* FOOTER */}
      <div className="absolute bottom-6 text-gray-500 text-sm">
        © {new Date().getFullYear()} Tornei del Sud
      </div>

    </div>
  );
}