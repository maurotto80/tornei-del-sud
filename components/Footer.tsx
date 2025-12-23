"use client";

import { Facebook, Instagram, Youtube } from "lucide-react";

// 🔒 SOCIAL FISSI (modificabili solo da codice)
const SOCIAL_LINKS = {
  facebook: "https://www.facebook.com/profile.php?id=100077440447476",
  instagram: "https://www.instagram.com/torneidelsud",
  youtube: "https://www.youtube.com/@torneidelsud",
};

export default function Footer() {
  return (
    <footer
      className="
        bg-gradient-to-b
        from-blue-900
        via-blue-700
        to-blue-600
        text-white
        pt-16 pb-10
      "
    >
      {/* SEZIONE SUPERIORE */}
      <div
        className="
          max-w-7xl mx-auto px-6 md:px-12
          grid grid-cols-1 md:grid-cols-4 gap-12
          text-center md:text-left
        "
      >
        {/* LOGO + BRAND */}
        <div className="space-y-4 flex flex-col items-center md:items-start">
          <img
            src="/logo-footer.png"
            alt="TorneidelSud"
            className="w-32"
          />

          <div className="pt-4">
            <p className="text-lg font-semibold">NIGRO EDITORE</p>
            <p className="text-blue-500 tracking-widest text-sm">
              YOUR EXPERIENCE
            </p>
          </div>
        </div>

        {/* CONTATTI */}
        <div className="space-y-2">
          <h3 className="font-bold text-xl mb-4 uppercase text-blue-500">
            Contatti
          </h3>
          <p>INDIRIZZO (Italia)</p>
          <p className="mt-3">
            Email:{" "}
            <a
              href="mailto:info@test.com"
              className="underline hover:text-white/80"
            >
              info@test.com
            </a>
          </p>
          <p>Tel: +39</p>
          <p className="mt-2">P.IVA</p>
        </div>

        {/* NAVIGA */}
        <div className="space-y-2">
          <h3 className="font-bold text-xl mb-4 uppercase text-blue-500">
            Naviga
          </h3>
          <ul className="space-y-2">
            <li><a href="/chi-siamo">Chi siamo</a></li>
            <li><a href="/tornei">Tornei</a></li>
            <li><a href="/galleria">Galleria</a></li>
            <li><a href="/news">News</a></li>
            <li><a href="/contatti">Contatti</a></li>
          </ul>
        </div>

        {/* FOLLOW US */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="font-bold text-xl mb-4 uppercase text-blue-500">
            Follow Us
          </h3>

          <div className="flex gap-6 text-2xl">
            <a
              href={SOCIAL_LINKS.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-orange-400 transition-transform hover:scale-110"
            >
              <Facebook className="w-7 h-7" />
            </a>

            <a
              href={SOCIAL_LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-orange-400 transition-transform hover:scale-110"
            >
              <Instagram className="w-7 h-7" />
            </a>

            <a
              href={SOCIAL_LINKS.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-orange-400 transition-transform hover:scale-110"
            >
              <Youtube className="w-7 h-7" />
            </a>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="w-full border-t border-white/10 mt-12 pt-6">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div
            className="
              grid grid-cols-1 md:grid-cols-3 gap-4
              text-center md:text-left
              items-center text-sm
            "
          >
            {/* SINISTRA */}
            <div className="flex justify-center md:justify-start">
              {/* MOBILE */}
              <div className="text-center md:hidden leading-tight">
                <div>© 2025 TorneidelSud.com</div>
                <div>NIGRO EDITORE</div>
                <div>P.IVA 00000000000</div>
              </div>

              {/* DESKTOP */}
              <div className="hidden md:block whitespace-nowrap">
                © 2025 TorneidelSud.com | NIGRO EDITORE | P.IVA 00000000000
              </div>
            </div>

            {/* CENTRO */}
            <div className="flex justify-center gap-3">
              <a href="/privacy" className="hover:text-orange-400">
                Privacy Policy
              </a>
              <span>•</span>
              <a href="/cookie-policy" className="hover:text-orange-400">
                Cookie Policy
              </a>
            </div>

            {/* DESTRA */}
            <div className="flex flex-col md:flex-row items-center justify-center md:justify-end text-center md:text-right">
              <span className="flex items-center">
                credits:&nbsp;
                <a
                  href="https://www.maconservice.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold hover:text-orange-400"
                >
                  Maconservice.com
                </a>
              </span>
              <span className="block md:inline md:ml-1">
                Agency Web Division
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* SCROLL TO TOP */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="
          fixed bottom-6 right-6
          w-10 h-10
          flex items-center justify-center
          rounded-full bg-orange-500 text-white text-2xl
          shadow-lg hover:bg-orange-600 transition
        "
      >
        ↑
      </button>
    </footer>
  );
}
