import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { BRANDS } from "@/data/brands";

export const Footer = () => {
  return (
    <footer
      data-testid="site-footer"
      className="relative border-t border-white/10 bg-fortia-surface"
    >
      <div className="mx-auto max-w-[1400px] px-6 py-16 lg:px-10 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-fortia-accent" />
              <span className="font-display text-xl font-extrabold tracking-tight">
                FORTIA SYSTEMS
              </span>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-zinc-400">
              Entidad legal y matriz de ingeniería detrás de{" "}
              <span className="text-white">acxor.com</span> y su portafolio de
              productos digitales de alta disponibilidad en producción.
            </p>
            <a
              href="mailto:contact@fortiasystems.com.mx"
              data-testid="footer-email"
              className="mt-6 inline-flex items-center gap-2 font-mono text-sm text-white transition-colors hover:text-fortia-accent"
            >
              contact@fortiasystems.com.mx
              <ArrowUpRight size={15} />
            </a>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-600">
              Navegación
            </p>
            <ul className="mt-5 space-y-3">
              {[
                { to: "/", label: "Inicio" },
                { to: "/nosotros", label: "Nosotros" },
                { to: "/marcas", label: "Marcas" },
                { to: "/contacto", label: "Contacto" },
              ].map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-sm text-zinc-400 transition-colors hover:text-white"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-600">
              Portafolio
            </p>
            <ul className="mt-5 space-y-3">
              {BRANDS.slice(0, 5).map((b) => (
                <li key={b.name}>
                  <a
                    href={b.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center gap-1.5 text-sm text-zinc-400 transition-colors hover:text-white"
                  >
                    {b.name}
                    <ArrowUpRight
                      size={13}
                      className="opacity-0 transition-opacity group-hover:opacity-100"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-8 font-mono text-xs uppercase tracking-[0.15em] text-zinc-600 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} FORTIA SYSTEMS — Todos los derechos reservados</span>
          <span>México · Operando en 2 países</span>
        </div>
      </div>
    </footer>
  );
};
