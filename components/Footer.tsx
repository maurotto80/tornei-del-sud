"use client";

import { Facebook, Instagram, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-blue-200 text-white pt-16 pb-10">
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
            alt="TorneiGiovanili.com"
            className="w-32 mx-auto md:mx-0"
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
          <p>Fax: +39</p>
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
            <Facebook className="w-7 h-7" />
            <Instagram className="w-7 h-7" />
            <Youtube className="w-7 h-7" />
          </div>
        </div>
      </div>

      {/* LINEA */}
      <div className="mt-12 border-t border-white/30"></div>

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
    <div>P.IVA</div>
  </div>

  {/* DESKTOP */}
  <div className="hidden md:block">
    © 2025 TorneidelSud.com | NIGRO EDITORE | P.IVA
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

            {/* DESTRA — FIX MOBILE */}
            <div className="flex justify-center md:justify-end">
              <div className="text-center md:text-right leading-tight">
                <div>
                  credits:&nbsp;
                  <a
                    href="https://www.maconservice.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold hover:text-orange-400"
                  >
                    Maconservice.com
                  </a>
                </div>

                {/* 🔹 SOLO MOBILE VA A CAPO */}
                <div className="block md:inline">
                  Agency Web Division
                </div>
              </div>
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
