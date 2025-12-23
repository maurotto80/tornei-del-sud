import * as React from "react";
import { portableTextToHtml } from "../portableTextToHtml";

type Props = {
  title: string;
  content: any;
  unsubscribeToken: string;
};

export default function PromoTemplate({
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
        backgroundColor: "#fff7ed",
      }}
    >
      <h1 style={{ color: "#ea580c" }}>{title}</h1>

      <div
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />

      <div
        style={{
          marginTop: 32,
          padding: 16,
          backgroundColor: "#ffedd5",
          borderRadius: 8,
          textAlign: "center",
        }}
      >
        <strong>🔥 Promozione speciale</strong>
      </div>

      <p style={{ fontSize: 12, color: "#666", marginTop: 40 }}>
        <a href={unsubscribeUrl} target="_blank" rel="noopener noreferrer">
          Disiscriviti dalla newsletter
        </a>
      </p>
    </div>
  );
}
