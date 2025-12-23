import * as React from "react";

export default function WelcomeEmail({ name }: { name?: string }) {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", lineHeight: "1.6" }}>
      <h1>Benvenuto{name ? ` ${name}` : ""} 👋</h1>

      <p>
        Grazie per esserti iscritto alla newsletter di{" "}
        <strong>Tornei del Sud</strong>.
      </p>

      <p>
        Riceverai aggiornamenti su tornei, eventi e novità dal mondo giovanile.
      </p>

      <p>
        A presto,<br />
        <strong>Lo staff Tornei del Sud</strong>
      </p>
    </div>
  );
}
