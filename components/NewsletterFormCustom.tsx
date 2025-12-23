"use client";

import { useState } from "react";

export default function NewsletterFormCustom() {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [privacyError, setPrivacyError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setPrivacyError(null);

    const form = new FormData(e.currentTarget);

    const name = form.get("name");
    const email = form.get("email");
    const privacyAccepted = form.get("privacyAccepted");

    // ✅ Validazione privacy (custom, in italiano)
    if (!privacyAccepted) {
      setPrivacyError("Devi accettare la privacy policy");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          privacyAccepted: true,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Errore durante l’iscrizione");
      }

      setDone(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <p className="text-white text-2xl font-semibold mt-6">
        🎉 Iscrizione completata!
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="space-y-5 max-w-md"
    >
      <input
        name="name"
        type="text"
        placeholder="Nome e Cognome"
        className="w-full px-5 py-4 bg-white rounded-md text-gray-800 text-lg"
      />

      <input
        name="email"
        type="email"
        placeholder="Indirizzo Email"
        className="w-full px-5 py-4 bg-white rounded-md text-gray-800 text-lg"
      />

      {error && (
        <p className="text-red-300 text-sm">
          {error}
        </p>
      )}

      <label className="flex items-start gap-3 text-white text-sm">
        <input
          type="checkbox"
          name="privacyAccepted"
          className="w-4 h-4 mt-1"
        />
        <span>
          Ho letto e accetto la{" "}
          <a
            href="/privacy"
            target="_blank"
            className="underline"
          >
            privacy policy
          </a>
        </span>
      </label>

      {privacyError && (
        <p className="text-red-300 text-sm">
          {privacyError}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full md:w-auto px-10 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-full text-lg font-semibold transition"
      >
        {loading ? "Invio..." : "Iscriviti"}
      </button>
    </form>
  );
}
