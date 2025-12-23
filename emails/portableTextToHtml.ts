import { toHTML } from "@portabletext/to-html";

export function portableTextToHtml(content: any) {
  if (!content || !Array.isArray(content)) {
    return "";
  }

  return toHTML(content, {
    components: {
      block: {
        normal: ({ children }) =>
          `<p style="margin:0 0 16px 0;line-height:1.5">${children}</p>`,
        h2: ({ children }) =>
          `<h2 style="margin:24px 0 12px 0;font-size:18px">${children}</h2>`,
      },
      marks: {
        strong: ({ children }) => `<strong>${children}</strong>`,
        em: ({ children }) => `<em>${children}</em>`,
        link: ({ value, children }) =>
          `<a href="${value?.href}" target="_blank" style="color:#2563eb;text-decoration:underline">${children}</a>`,
      },
    },
  });
}
