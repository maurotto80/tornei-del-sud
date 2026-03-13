export default function ComingSoon() {
  return (
    <div className="fixed inset-0 bg-gray-900 text-white flex flex-col items-center justify-center text-center z-50 px-6">

      <img
        src="/logo.png"
        alt="Tornei del Sud"
        className="w-40 mb-8"
      />

      <h1 className="text-4xl md:text-6xl font-bold mb-6">
        Tornei del Sud
      </h1>

      <p className="max-w-xl text-lg md:text-xl text-gray-300 mb-10">
        Stiamo preparando la nuova piattaforma dedicata ai tornei di calcio giovanile nel Sud Italia.
      </p>

      <div className="bg-orange-500 px-6 py-3 rounded-full text-xl font-semibold">
        🚀 Coming Soon
      </div>

      <p className="mt-8 text-gray-400">
        info@torneidelsud.it
      </p>

      <div className="absolute bottom-6 text-gray-500 text-sm">
        © {new Date().getFullYear()} Tornei del Sud
      </div>

    </div>
  );
}