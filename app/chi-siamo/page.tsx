import PageHero from "@/components/PageHero";
import Footer from "@/components/Footer";

export default function ChiSiamoPage() {
  return (
    <div className="w-full">
      {/* HERO */}
      <PageHero
        title="Chi Siamo"
        background="/chi-siamo-banner.jpg"
      />

      {/* CONTENUTO */}
      <section className="max-w-4xl mx-auto px-6 md:px-10 py-16 space-y-10">
        <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
          <p>
            <strong>Tornei del Sud</strong> è un’agenzia specializzata
            nell’organizzazione di tornei di calcio giovanile nel Sud
            Italia, con una forte presenza nella regione Calabria.
          </p>

          <p>
            Nasciamo con un obiettivo chiaro: offrire alle società
            sportive un’esperienza sportiva, logistica e organizzativa
            senza stress, pensata per atleti, staff e famiglie.
          </p>

          <p>
            Selezioniamo con attenzione villaggi turistici dotati di
            campi da gioco interni o adiacenti, evitando spostamenti in
            pullman e garantendo il massimo comfort durante tutta la
            durata dell’evento.
          </p>
        </div>

        {/* BLOCCO EVIDENZA */}
        <div className="bg-blue-50 rounded-2xl p-8 space-y-4">
          <h2 className="text-2xl font-bold text-blue-900">
            Il nostro torneo di punta
          </h2>

          <p className="text-gray-700 leading-relaxed">
            Il fiore all’occhiello della nostra proposta è il torneo
            ospitato presso il <strong>Minerva Resort di Sibari</strong>,
            una delle strutture più complete del Sud Italia.
          </p>

          <p className="text-gray-700 leading-relaxed">
            Un vero villaggio dello sport, dove alloggi, ristorazione e
            campi da gioco sono concentrati in un’unica struttura,
            permettendo alle squadre di vivere il torneo come una vera
            esperienza sportiva e formativa.
          </p>
        </div>

        {/* CHIUSURA */}
        <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
          <p>
            Collaboriamo con società sportive, istruttori qualificati e
            arbitri federali per garantire eventi organizzati con
            professionalità, attenzione ai dettagli e rispetto dei
            valori sportivi.
          </p>

          <p>
            <strong>Tornei del Sud</strong> è oggi un punto di riferimento
            per le società giovanili che desiderano partecipare a tornei
            ben strutturati, in contesti sicuri e di qualità, nel cuore
            del Sud Italia.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
