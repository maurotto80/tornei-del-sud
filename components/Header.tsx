"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* HEADER */}
      <header className="absolute top-0 left-0 w-full z-50 px-6 py-4 flex items-center justify-between text-white">
        {/* LOGO */}
        <Link href="/" className="flex items-center">
          <img
            src="/logo-footer.png"
            className="h-20 md:h-28 object-contain"
            alt="Tornei del Sud"
          />
        </Link>

        {/* MENU BUTTON */}
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-3"
        >
          <span className="hidden sm:block text-lg font-semibold">
            Menu
          </span>

          <div className="w-12 h-12 rounded-full bg-orange-500 hover:bg-orange-600 flex items-center justify-center transition">
            <Menu className="text-white w-6 h-6" />
          </div>
        </button>
      </header>

      {/* OVERLAY MENU */}
      {open && (
        <div className="fixed inset-0 z-[9999] bg-[#071018] text-white flex flex-col">
          {/* TOP BAR */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
            <img
              src="/logo-footer.png"
              className="h-16 object-contain"
              alt="Tornei del Sud"
            />

            <button
              onClick={() => setOpen(false)}
              className="w-11 h-11 flex items-center justify-center rounded-full bg-neutral-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* MENU CONTENT (SCROLLABILE) */}
          <nav className="flex-1 overflow-y-auto px-6 py-10">
            <ul className="flex flex-col gap-6 text-2xl sm:text-3xl font-bold uppercase">
              <li>
                <Link href="/" onClick={() => setOpen(false)}>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/chi-siamo" onClick={() => setOpen(false)}>
                  Chi siamo
                </Link>
              </li>
              <li>
                <Link href="/tornei" onClick={() => setOpen(false)}>
                  Tornei
                </Link>
              </li>
              <li>
                <Link href="/galleria" onClick={() => setOpen(false)}>
                  Galleria
                </Link>
              </li>
              <li>
                <Link href="/news" onClick={() => setOpen(false)}>
                  News
                </Link>
              </li>
              <li>
                <Link href="/contatti" onClick={() => setOpen(false)}>
                  Contatti
                </Link>
              </li>
            </ul>
          </nav>

          {/* CTA BOTTOM */}
          <div className="px-6 py-6 border-t border-white/10">
            <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-full font-semibold transition">
              Richiedi catalogo
            </button>
          </div>
        </div>
      )}
    </>
  );
}
