export default function PageHero({
  title,
  background,
}: {
  title: string;
  background?: string;
}) {
  return (
    <section
      className="
        relative w-full
        h-[35vh] sm:h-[40vh] md:h-[50vh]
        bg-cover bg-center
        flex items-end md:items-center
      "
      style={{
        backgroundImage: `url(${background || "/default-hero.jpg"})`,
      }}
    >
      {/* OVERLAY */}
      <div className="absolute inset-0 bg-blue-900/70"></div>

      {/* TITOLO */}
      <div
        className="
          relative z-10 w-full
          px-6
          pb-10 sm:pb-12 md:pb-0
          flex justify-center
        "
      >
        <h1
          className="
            text-center
            text-xl sm:text-2xl md:text-5xl
            font-extrabold uppercase text-white
            max-w-5xl
          "
        >
          {title}
        </h1>
      </div>
    </section>
  );
}
