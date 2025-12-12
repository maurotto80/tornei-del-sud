"use client";

import { useState } from "react";
import PageHero from "@/components/PageHero";
import Footer from "@/components/Footer";

export default function ContattiPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    privacyAccepted: false,
  });

  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">(
    "idle"
  );

  const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => {
  const { name, value, type } = e.target as HTMLInputElement;

  setForm({
    ...form,
    [name]: type === "checkbox" ? !form.privacyAccepted : value,
  });
};


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Errore invio");

      setStatus("success");
      setForm({ name: "", email: "", phone: "", message: "", privacyAccepted: false });
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="w-full">
      {/* ⭐ HERO PAGINA CONTATTI */}
      <PageHero
        title="Contattaci"
        background="/contact-banner.png"
      />

      {/* ⭐ CONTENUTO */}
      <div className="max-w-3xl mx-auto p-6 md:p-10">
        <h1 className="text-3xl font-bold mb-6">Modulo di Contatto</h1>

        <p className="text-gray-600 mb-10">
          Compila il modulo sottostante per inviare una richiesta al nostro staff.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* NOME */}
          <div>
            <label className="block text-sm font-medium mb-1">Nome *</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-3"
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="block text-sm font-medium mb-1">Email *</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-3"
            />
          </div>

          {/* TELEFONO */}
          <div>
            <label className="block text-sm font-medium mb-1">Telefono</label>
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />
          </div>

          {/* MESSAGGIO */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Messaggio *
            </label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              rows={5}
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div className="flex items-start gap-3">
  <input
    type="checkbox"
    name="privacyAccepted"
    checked={form.privacyAccepted}
    onChange={handleChange}
    required
    className="mt-1"
  />
  <label className="text-sm text-gray-600">
    Dichiaro di aver letto e accettato la{" "}
    <a
      href="/privacy"
      target="_blank"
      className="underline text-blue-600 hover:text-blue-800"
    >
      Privacy Policy
    </a>
  </label>
</div>


          {/* BUTTON */}
          <button
            type="submit"
            className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-full font-semibold"
          >
            Invia Richiesta
          </button>

          {/* STATUS */}
          {status === "sending" && (
            <p className="text-blue-500 mt-2">Invio in corso...</p>
          )}
          {status === "success" && (
            <p className="text-green-600 mt-2">
              Messaggio inviato con successo!
            </p>
          )}
          {status === "error" && (
            <p className="text-red-600 mt-2">
              Errore durante l’invio. Riprova più tardi.
            </p>
          )}
        </form>
      </div>

      {/* ⭐ FOOTER */}
      <Footer />
    </div>
  );
}
