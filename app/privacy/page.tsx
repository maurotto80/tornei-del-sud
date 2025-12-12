import PageHero from "@/components/PageHero";
import Footer from "@/components/Footer";

export default function PrivacyPolicyPage() {
  return (
    <div className="w-full">
      {/* HERO */}
      <PageHero
        title="Privacy Policy"
        background="/privacy-hero.png"
      />

      {/* CONTENUTO */}
      <section className="max-w-4xl mx-auto px-6 md:px-10 py-16 space-y-10 text-gray-700">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Privacy Policy</h2>

          <p>
            La presente Privacy Policy descrive le modalità di gestione del sito
            <strong> TorneidelSud.com</strong> in riferimento al trattamento dei
            dati personali degli utenti che lo consultano.
          </p>

          <p>
            Il trattamento dei dati avviene nel rispetto del Regolamento UE
            2016/679 (GDPR) e della normativa italiana vigente.
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

        <div className="space-y-4">
          <h3 className="text-xl font-semibold">
            Tipologia di dati trattati
          </h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>dati anagrafici</li>
            <li>dati di contatto</li>
            <li>dati forniti volontariamente tramite moduli</li>
            <li>dati di navigazione</li>
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold">
            Finalità del trattamento
          </h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>rispondere alle richieste degli utenti</li>
            <li>fornire informazioni su tornei ed eventi</li>
            <li>adempiere ad obblighi di legge</li>
            <li>migliorare l’esperienza di navigazione</li>
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold">
            Diritti dell’interessato
          </h3>
          <p>
            L’utente può esercitare in qualsiasi momento i diritti previsti dal
            GDPR (accesso, rettifica, cancellazione, limitazione e opposizione al
            trattamento).
          </p>
          <p>
            Le richieste possono essere inviate all’indirizzo email:
            <strong> info@test.com</strong>
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold">
            Modifiche alla presente policy
          </h3>
          <p>
            La presente Privacy Policy può essere aggiornata. Le modifiche
            saranno pubblicate su questa pagina.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
