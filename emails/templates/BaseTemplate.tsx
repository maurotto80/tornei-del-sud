import * as React from "react";
import { portableTextToHtml } from "../portableTextToHtml";

type Props = {
  title: string;
  content: any;
  unsubscribeToken: string;
};

export default function BaseTemplate({
  title,
  content,
  unsubscribeToken,
}: Props) {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const unsubscribeUrl = `${baseUrl}/api/newsletter/unsubscribe?token=${encodeURIComponent(
    unsubscribeToken
  )}`;

  const htmlContent = portableTextToHtml(content);

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: 24 }}>
      <h1 style={{ marginBottom: 20 }}>{title}</h1>

      {/* CONTENUTO NEWSLETTER */}
      <div
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />

      <hr style={{ margin: "40px 0" }} />

      <p style={{ fontSize: 12, color: "#666" }}>
        Ricevi questa email perché sei iscritto alla newsletter Tornei del Sud.
      </p>

      <p style={{ fontSize: 12, color: "#666", marginTop: 16 }}>
        <a href={unsubscribeUrl} target="_blank" rel="noopener noreferrer">
          Disiscriviti dalla newsletter
        </a>
      </p>
    </div>
  );
}
