import PageHero from "@/components/PageHero";
import Footer from "@/components/Footer";

export default function CookiePolicyPage() {
  return (
    <div className="w-full">
      <PageHero
        title="Cookie Policy"
        background="/cookie-hero.jpg"
      />

      <section className="max-w-4xl mx-auto px-6 md:px-10 py-16 space-y-10 text-gray-700">
        <h2 className="text-2xl font-bold">Cookie Policy</h2>

        <p>
          La presente Cookie Policy descrive l’utilizzo dei cookie da parte del
          sito <strong>TorneidelSud.com</strong>.
        </p>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold">
            Tipologie di cookie utilizzati
          </h3>

          <p>
            Il sito utilizza esclusivamente <strong>cookie tecnici</strong>,
            necessari al corretto funzionamento del sito e alla navigazione
            dell’utente.
          </p>

          <ul className="list-disc pl-6 space-y-2">
            <li>gestione della navigazione</li>
            <li>visualizzazione delle pagine</li>
            <li>funzionamento dei moduli di contatto</li>
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold">
            Cookie di terze parti
          </h3>
          <p>
            Il sito non utilizza cookie di profilazione né cookie di terze parti
            per finalità di marketing o analisi.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold">
            Gestione dei cookie
          </h3>
          <p>
            L’utente può gestire o disabilitare i cookie attraverso le
            impostazioni del proprio browser. La disabilitazione dei cookie
            tecnici potrebbe compromettere il corretto funzionamento del sito.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold">
            Titolare del trattamento
          </h3>
          <p>
            <strong>NIGRO EDITORE</strong>
            <br />
            Email: info@test.com
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
