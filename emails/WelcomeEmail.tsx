import * as React from "react";

type WelcomeEmailProps = {
  name?: string;
  unsubscribeToken: string;
};

export default function WelcomeEmail({
  name,
  unsubscribeToken,
}: WelcomeEmailProps) {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const unsubscribeUrl = `${baseUrl}/api/newsletter/unsubscribe?token=${encodeURIComponent(
    unsubscribeToken
  )}`;

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: 24 }}>
      <h1>Ciao{ name ? ` ${name}` : "" } 👋</h1>

      <p>
        Grazie per esserti iscritto alla newsletter di <b>Tornei del Sud</b>.
      </p>

      <p>
        Riceverai aggiornamenti su eventi, tornei e novità.
      </p>

      <hr style={{ margin: "32px 0" }} />

      <p style={{ fontSize: 12, color: "#666" }}>
        Se non desideri più ricevere comunicazioni, puoi{" "}
        <a href={unsubscribeUrl}>disiscriverti qui</a>.
      </p>
    </div>
  );
}
