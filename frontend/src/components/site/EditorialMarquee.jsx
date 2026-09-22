import Marquee from "react-fast-marquee";

const PHRASES = [
  "ARQUITECTURA",
  "CÓDIGO",
  "EXPERIENCIA",
  "OPTIMIZACIÓN",
  "RESULTADOS",
];

export const EditorialMarquee = () => {
  return (
    <section
      data-testid="editorial-marquee"
      className="border-y border-white/10 bg-fortia-bg py-8 lg:py-12"
    >
      <Marquee speed={45} gradient={false} autoFill>
        {PHRASES.map((p, i) => (
          <div key={i} className="flex items-center">
            <span className="font-display text-6xl font-black uppercase tracking-tighter text-stroke sm:text-7xl lg:text-8xl">
              {p}
            </span>
            <span className="mx-8 text-4xl text-fortia-accent lg:mx-12">✳</span>
          </div>
        ))}
      </Marquee>
    </section>
  );
};
