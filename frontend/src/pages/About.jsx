import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { MaskedLines, Reveal } from "@/components/site/Motion";
import { EditorialMarquee } from "@/components/site/EditorialMarquee";

const MANIFESTO = [
  {
    n: "01",
    t: "Ingeniería, no proveeduría",
    d: "Actuamos como socio senior de ingeniería. Nos apropiamos del stack completo — arquitectura, código, infraestructura y operación — para que founders y operadores se enfoquen en crecer.",
  },
  {
    n: "02",
    t: "Construido para producción real",
    d: "Nuestros productos soportan tráfico en vivo, flujos de pago, integraciones con terceros y eventos en tiempo real. Arquitectura modular que escala por vertical y por país.",
  },
  {
    n: "03",
    t: "Alta disponibilidad como estándar",
    d: "99.9% de uptime garantizado, monitoreo 24/7 y respuesta a incidentes con SLA. La confiabilidad no es una función: es el punto de partida.",
  },
  {
    n: "04",
    t: "Seguridad desde el diseño",
    d: "Pentesting, auditorías, hardening y apoyo para certificaciones (ISO 27001, SOC 2, PCI-DSS). Cada capa se diseña pensando en cumplimiento.",
  },
];

const PROCESS = [
  { n: "01", t: "Análisis y diseño", d: "Definimos requisitos, arquitectura y diseño de la solución." },
  { n: "02", t: "Desarrollo y despliegue", d: "Construimos con mejores prácticas y llevamos a producción." },
  { n: "03", t: "Soporte continuo", d: "Mantenimiento, monitoreo 24/7 y mejoras continuas." },
];

const STACK = ["React", "Node.js", "Python", "FastAPI", "MongoDB", "PostgreSQL", "AWS", "Docker", "Kubernetes"];

export default function About() {
  return (
    <div data-testid="about-page" className="pt-[72px]">
      {/* Header */}
      <section className="mx-auto max-w-[1400px] px-6 pb-16 pt-20 lg:px-10 lg:pb-24 lg:pt-28">
        <Reveal>
          <p className="mb-8 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-zinc-400">
            <span className="h-px w-10 bg-fortia-accent" />
            Nosotros
          </p>
        </Reveal>
        <h1 className="font-display text-[13vw] font-black uppercase leading-[0.88] tracking-tighter text-white sm:text-7xl lg:text-8xl">
          <MaskedLines lines={["La ingeniería", "detrás de todo"]} accentIndex={1} />
        </h1>
        <Reveal delay={0.6}>
          <p className="mt-10 max-w-3xl text-lg leading-relaxed text-zinc-300">
            <span className="text-white">FORTIA SYSTEMS</span> es el registro
            legal de la empresa; <span className="text-white">acxor.com</span> es
            la marca comercial de ingeniería. Juntos diseñan, construyen y operan
            un portafolio de productos digitales en dos países, con más de 1.4
            millones de transacciones procesadas.
          </p>
        </Reveal>
      </section>

      {/* Manifesto */}
      <section data-testid="manifesto-section" className="border-t border-white/10">
        <div className="mx-auto max-w-[1400px] px-6 py-20 lg:px-10 lg:py-28">
          <Reveal>
            <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Manifiesto
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-px border border-white/10 bg-white/10 md:grid-cols-2">
            {MANIFESTO.map((m, i) => (
              <Reveal
                key={m.n}
                delay={(i % 2) * 0.1}
                className="group relative bg-fortia-bg p-8 transition-colors duration-500 hover:bg-fortia-surface lg:p-12"
              >
                <span className="font-display text-6xl font-black tracking-tighter text-white/10 transition-colors duration-500 group-hover:text-fortia-accent/40 lg:text-7xl">
                  {m.n}
                </span>
                <h3 className="mt-6 font-display text-2xl font-bold tracking-tight text-white">
                  {m.t}
                </h3>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-zinc-400">
                  {m.d}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <EditorialMarquee />

      {/* Process */}
      <section className="mx-auto max-w-[1400px] px-6 py-20 lg:px-10 lg:py-28">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-fortia-accent">
            / Cómo trabajamos
          </p>
          <h2 className="mt-4 font-display text-4xl font-black uppercase tracking-tighter text-white sm:text-5xl">
            Del brief a producción
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {PROCESS.map((p, i) => (
            <Reveal
              key={p.n}
              delay={i * 0.1}
              className="border border-white/10 bg-fortia-surface p-8 lg:p-10"
            >
              <span className="font-mono text-sm text-fortia-accent">{p.n}</span>
              <h3 className="mt-4 font-display text-xl font-semibold text-white">{p.t}</h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">{p.d}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Stack */}
      <section className="border-t border-white/10 bg-fortia-surface">
        <div className="mx-auto max-w-[1400px] px-6 py-20 lg:px-10 lg:py-28">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">
              Stack tecnológico
            </p>
          </Reveal>
          <div className="mt-8 flex flex-wrap gap-3">
            {STACK.map((s, i) => (
              <Reveal key={s} delay={i * 0.04}>
                <span className="inline-flex border border-white/10 px-5 py-2.5 font-mono text-sm text-zinc-300 transition-colors duration-300 hover:border-fortia-accent hover:text-white">
                  {s}
                </span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-[1400px] px-6 py-24 lg:px-10 lg:py-32">
          <Reveal>
            <h2 className="max-w-3xl font-display text-4xl font-black uppercase leading-[0.95] tracking-tighter text-white sm:text-5xl lg:text-6xl">
              Hablemos de tu próximo <span className="text-fortia-accent">producto</span>.
            </h2>
            <Link
              to="/contacto"
              data-testid="about-cta"
              className="group mt-10 inline-flex items-center gap-2 bg-white px-8 py-4 font-mono text-xs uppercase tracking-[0.15em] text-black transition-colors duration-300 hover:bg-fortia-accent hover:text-white"
            >
              Contáctanos
              <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
