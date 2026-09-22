import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import { MaskedLines, Reveal } from "@/components/site/Motion";
import { EditorialMarquee } from "@/components/site/EditorialMarquee";
import { BrandCard } from "@/components/site/BrandCard";
import { BRANDS } from "@/data/brands";

const HERO_IMG =
  "https://images.pexels.com/photos/37730211/pexels-photo-37730211.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";

const STATS = [
  { value: "8", label: "Productos en producción" },
  { value: "1.4M+", label: "Transacciones procesadas" },
  { value: "99.9%", label: "Uptime garantizado" },
  { value: "2", label: "Países de operación" },
];

const CAPABILITIES = [
  { n: "01", t: "Arquitectura & Desarrollo", d: "Web, móvil, backend, APIs y software a medida listos para producción." },
  { n: "02", t: "Integraciones", d: "Conexiones con bancos, procesadores de pago, crypto y proveedores externos." },
  { n: "03", t: "DevOps & Despliegue", d: "Pipelines CI/CD, infraestructura en la nube y monitoreo continuo." },
  { n: "04", t: "Seguridad & Cumplimiento", d: "Pentesting, hardening y apoyo para certificaciones (ISO, SOC 2, PCI-DSS)." },
];

export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.55, 0.9]);

  return (
    <div data-testid="home-page">
      {/* HERO */}
      <section
        ref={heroRef}
        data-testid="hero-section"
        className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden"
      >
        <motion.div style={{ y: imgY, scale: imgScale }} className="absolute inset-0">
          <img src={HERO_IMG} alt="" className="h-full w-full object-cover" />
        </motion.div>
        <motion.div
          style={{ opacity: overlayOpacity }}
          className="absolute inset-0 bg-fortia-bg"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-fortia-bg via-fortia-bg/40 to-fortia-bg/70" />

        <div className="relative mx-auto w-full max-w-[1400px] px-6 pb-16 pt-32 lg:px-10 lg:pb-24">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="mb-8 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-zinc-400"
          >
            <span className="h-px w-10 bg-fortia-accent" />
            Sociedad matriz de acxor.com
          </motion.div>

          <h1 className="font-display text-[15vw] font-black uppercase leading-[0.86] tracking-tighter text-white sm:text-[13vw] lg:text-[11rem]">
            <MaskedLines lines={["FORTIA", "SYSTEMS"]} delay={0.25} accentIndex={1} />
          </h1>

          <div className="mt-10 grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-end">
            <Reveal delay={0.7} className="max-w-2xl">
              <p className="text-lg leading-relaxed text-zinc-300 sm:text-xl">
                La entidad de ingeniería que diseña, construye y opera productos
                digitales de alta disponibilidad — desde la arquitectura hasta
                producción.
              </p>
            </Reveal>
            <Reveal delay={0.85} className="flex flex-wrap gap-3 lg:justify-end">
              <Link
                to="/marcas"
                data-testid="hero-cta-brands"
                className="group inline-flex items-center gap-2 bg-white px-6 py-3.5 font-mono text-xs uppercase tracking-[0.15em] text-black transition-colors duration-300 hover:bg-fortia-accent hover:text-white"
              >
                Ver portafolio
                <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <Link
                to="/contacto"
                data-testid="hero-cta-contact"
                className="inline-flex items-center gap-2 border border-white/20 px-6 py-3.5 font-mono text-xs uppercase tracking-[0.15em] text-white transition-colors duration-300 hover:border-white/60"
              >
                Contáctanos
              </Link>
            </Reveal>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-16 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-zinc-500"
          >
            <ArrowDown size={14} className="animate-bounce" />
            Desplázate
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      <section data-testid="aggregate-stats" className="border-y border-white/10 bg-fortia-surface">
        <div className="mx-auto grid max-w-[1400px] grid-cols-2 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal
              key={s.label}
              delay={i * 0.08}
              className={`border-white/10 p-8 lg:p-12 ${i % 2 === 0 ? "border-r" : ""} ${i < 2 ? "border-b lg:border-b-0" : ""} ${i < 3 ? "lg:border-r" : ""}`}
            >
              <div className="font-display text-5xl font-black tracking-tighter text-white lg:text-6xl">
                {s.value}
              </div>
              <div className="mt-3 font-mono text-[11px] uppercase tracking-[0.15em] text-zinc-500">
                {s.label}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* INTRO / WHAT */}
      <section className="mx-auto max-w-[1400px] px-6 py-24 lg:px-10 lg:py-36">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-fortia-accent">
              / Qué es FORTIA
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-5xl">
              FORTIA SYSTEMS es el registro legal y la columna vertebral
              tecnológica detrás de{" "}
              <span className="text-zinc-500">acxor.com</span> y todas sus
              marcas.
            </h2>
            <p className="mt-8 max-w-2xl text-base leading-relaxed text-zinc-400">
              Construimos productos y plataformas de software desde cero y los
              mantenemos operando: arquitectura, desarrollo, integraciones,
              DevOps, seguridad y soporte continuo. Operamos nuestro propio
              portafolio y acompañamos a founders que necesitan un socio de
              ingeniería senior, no un proveedor.
            </p>
          </Reveal>
        </div>

        <div className="mt-20 grid gap-px border border-white/10 bg-white/10 md:grid-cols-2">
          {CAPABILITIES.map((c, i) => (
            <Reveal
              key={c.n}
              delay={i * 0.08}
              className="group bg-fortia-bg p-8 transition-colors duration-500 hover:bg-fortia-surface lg:p-10"
            >
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-sm text-fortia-accent">{c.n}</span>
                <h3 className="font-display text-xl font-semibold text-white">{c.t}</h3>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-zinc-400">{c.d}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <EditorialMarquee />

      {/* PORTFOLIO PREVIEW */}
      <section data-testid="portfolio-preview" className="mx-auto max-w-[1400px] px-6 py-24 lg:px-10 lg:py-36">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-fortia-accent">
              / El portafolio
            </p>
            <h2 className="mt-4 font-display text-4xl font-black uppercase tracking-tighter text-white sm:text-5xl lg:text-6xl">
              Marcas en producción
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <Link
              to="/marcas"
              data-testid="portfolio-view-all"
              className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-white transition-colors hover:text-fortia-accent"
            >
              Ver las 8 marcas
              <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {BRANDS.slice(0, 6).map((b, i) => (
            <Reveal key={b.name} delay={(i % 3) * 0.08} className={b.span}>
              <BrandCard brand={b} index={i} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/10 bg-fortia-surface">
        <div className="mx-auto max-w-[1400px] px-6 py-24 lg:px-10 lg:py-36">
          <Reveal>
            <h2 className="max-w-4xl font-display text-4xl font-black uppercase leading-[0.95] tracking-tighter text-white sm:text-5xl lg:text-7xl">
              ¿Listo para construir algo que <span className="text-fortia-accent">opere en producción</span>?
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                to="/contacto"
                data-testid="cta-start-project"
                className="group inline-flex items-center gap-2 bg-white px-8 py-4 font-mono text-xs uppercase tracking-[0.15em] text-black transition-colors duration-300 hover:bg-fortia-accent hover:text-white"
              >
                Iniciar un proyecto
                <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <a
                href="mailto:contact@fortiasystems.com.mx"
                className="font-mono text-sm text-zinc-400 transition-colors hover:text-white"
              >
                contact@fortiasystems.com.mx
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
