import "./globals.css";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Tornei del Sud",
  description: "Organizzazione tornei di calcio giovanile nel Sud Italia",
  keywords: [
    "tornei calcio giovanile",
    "tornei del sud",
    "tornei sportivi",
    "calcio giovanile",
    "tornei giovanili Italia",
  ],
  metadataBase: new URL("https://www.torneidelsud.it"),
  openGraph: {
    title: "Tornei del Sud",
    description: "Organizzazione tornei di calcio giovanile nel Sud Italia",
    type: "website",
    locale: "it_IT",
    url: "https://www.torneidelsud.it",
    siteName: "Tornei del Sud",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it">
      <head>
        {/* Meta viewport (extra, Next lo gestisce ma lo aggiungiamo manualmente per compatibilità massima) */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* Colore della barra su mobile */}
        <meta name="theme-color" content="#1a1a1a" />

        {/* Foglio CSS per font Google (se ne aggiungeremo) */}
        
      </head>

      <body className="bg-gray-50 text-gray-900">
        <Header />

        <main>{children}</main>

      
      </body>
    </html>
  );
}
