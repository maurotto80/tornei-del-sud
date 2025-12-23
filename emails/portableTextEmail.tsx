import * as React from "react";
import { PortableTextComponents } from "@portabletext/react";

export const portableTextEmailComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p style={{ margin: "0 0 16px 0", lineHeight: "1.5" }}>
        {children}
      </p>
    ),
    h2: ({ children }) => (
      <h2 style={{ margin: "24px 0 12px 0", fontSize: 18 }}>
        {children}
      </h2>
    ),
  },
  marks: {
    strong: ({ children }) => <strong>{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    link: ({ children, value }) => (
      <a
        href={value?.href}
        style={{ color: "#2563eb", textDecoration: "underline" }}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
  },
};
