import * as React from "react";
import { portableTextToHtml } from "../portableTextToHtml";

type Props = {
  title: string;
  content: any;
  unsubscribeToken: string;
};

export default function EventTemplate({
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
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        padding: 24,
        backgroundColor: "#f8fafc",
      }}
    >
      <h1 style={{ color: "#1e40af" }}>{title}</h1>

      <div
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />

      <div
        style={{
          marginTop: 32,
          padding: 16,
          backgroundColor: "#e0f2fe",
          borderRadius: 8,
        }}
      >
        <strong>📅 Evento in arrivo</strong>
      </div>

      <p style={{ fontSize: 12, color: "#666", marginTop: 40 }}>
        <a href={unsubscribeUrl} target="_blank" rel="noopener noreferrer">
          Disiscriviti dalla newsletter
        </a>
      </p>
    </div>
  );
}
