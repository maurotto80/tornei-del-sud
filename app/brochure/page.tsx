export default function BrochurePage() {
  const pdfUrl = "/BROCHURE_TORNEI_DEL_SUD_2026.pdf";

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      
      <h1 className="text-3xl font-bold text-center mb-6">
        📖 Catalogo Tornei del Sud 2026
      </h1>

      {/* Bottone download */}
      <div className="text-center mb-6">
        <a
          href={pdfUrl}
          target="_blank"
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full font-semibold transition"
        >
          📥 Scarica Brochure
        </a>
      </div>

      {/* Viewer PDF */}
      <div className="w-full border rounded-xl overflow-hidden shadow">
        <iframe
          src={pdfUrl}
          className="w-full h-[800px]"
          loading="lazy"
        />
      </div>

      {/* 🔵 TORNA ALLA LISTA TORNEI */}
      <div className="text-center mt-10">
        <a
          href="/tornei"
          className="inline-block px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-lg rounded-full transition"
        >
          ← Torna alla Lista Tornei
        </a>
      </div>

    </div>
  );
}

