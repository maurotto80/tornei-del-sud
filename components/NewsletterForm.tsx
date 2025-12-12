"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = new FormData(e.target as HTMLFormElement);
    const name = form.get("name");
    const email = form.get("email");

    const res = await fetch("/api/newsletter", {
      method: "POST",
      body: JSON.stringify({ name, email }),
    });

    if (res.ok) {
      setDone(true);
    } else {
      const data = await res.json();
      setError(data.error || "Errore sconosciuto");
    }

    setLoading(false);
  }

  if (done) {
    return (
      <p className="text-white text-2xl font-semibold mt-6">
        🎉 Iscrizione completata! Controlla la tua casella email.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-md">
      <input
        name="name"
        type="text"
        placeholder="Nome e Cognome"
        className="w-full px-5 py-4 bg-white rounded-md text-gray-800 text-lg"
      />

      <input
        name="email"
        type="email"
        required
        placeholder="Indirizzo Email"
        className="w-full px-5 py-4 bg-white rounded-md text-gray-800 text-lg"
      />

      {error && <p className="text-red-300 text-sm">{error}</p>}

      <label className="flex items-center gap-3 text-white text-sm cursor-pointer">
        <input type="checkbox" required className="w-4 h-4" />
        Ho letto e accetto la privacy
      </label>

      <button
        type="submit"
        disabled={loading}
        className="w-full md:w-auto px-10 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-full text-lg font-semibold transition"
      >
        {loading ? "Invio..." : "Iscrizione..." }
      </button>
    </form>
  );
}
