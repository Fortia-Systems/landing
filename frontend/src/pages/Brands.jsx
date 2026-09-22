import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { MaskedLines, Reveal } from "@/components/site/Motion";
import { BrandCard } from "@/components/site/BrandCard";
import { BRANDS } from "@/data/brands";

const SECTORS = ["Todos", "Fintech", "Payments", "Ticketing", "Hospitality", "Contact Center", "GovTech"];

export default function Brands() {
  const live = BRANDS.filter((b) => b.status === "live").length;
  const dev = BRANDS.filter((b) => b.status === "dev").length;

  return (
    <div data-testid="brands-page" className="pt-[72px]">
      {/* Header */}
      <section className="mx-auto max-w-[1400px] px-6 pb-14 pt-20 lg:px-10 lg:pb-20 lg:pt-28">
        <Reveal>
          <p className="mb-8 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-zinc-400">
            <span className="h-px w-10 bg-fortia-accent" />
            Portafolio · {BRANDS.length} marcas
          </p>
        </Reveal>
        <h1 className="font-display text-[13vw] font-black uppercase leading-[0.88] tracking-tighter text-white sm:text-7xl lg:text-8xl">
          <MaskedLines lines={["Nuestras", "marcas"]} accentIndex={1} />
        </h1>
        <Reveal delay={0.6}>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 font-mono text-xs uppercase tracking-[0.15em] text-zinc-500">
            <span>{live} en producción</span>
            <span className="h-1 w-1 rounded-full bg-fortia-accent" />
            <span>{dev} en desarrollo</span>
            <span className="h-1 w-1 rounded-full bg-fortia-accent" />
            <span>Impulsadas por acxor.com</span>
          </div>
        </Reveal>
      </section>

      {/* Grid */}
      <section data-testid="portfolio-grid" className="mx-auto max-w-[1400px] px-6 pb-24 lg:px-10 lg:pb-32">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {BRANDS.map((b, i) => (
            <Reveal key={b.name} delay={(i % 3) * 0.06} className={b.span}>
              <BrandCard brand={b} index={i} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/10 bg-fortia-surface">
        <div className="mx-auto max-w-[1400px] px-6 py-24 lg:px-10 lg:py-32">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-fortia-accent">
              / ¿Tienes una idea?
            </p>
            <h2 className="mt-4 max-w-3xl font-display text-4xl font-black uppercase leading-[0.95] tracking-tighter text-white sm:text-5xl lg:text-6xl">
              Construyamos la próxima marca del portafolio
            </h2>
            <Link
              to="/contacto"
              data-testid="brands-cta"
              className="group mt-10 inline-flex items-center gap-2 bg-white px-8 py-4 font-mono text-xs uppercase tracking-[0.15em] text-black transition-colors duration-300 hover:bg-fortia-accent hover:text-white"
            >
              Cotizar proyecto
              <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
