import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const LINKS = [
  { to: "/", label: "Inicio" },
  { to: "/nosotros", label: "Nosotros" },
  { to: "/marcas", label: "Marcas" },
  { to: "/contacto", label: "Contacto" },
];

export const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header
      data-testid="site-nav"
      className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${
        scrolled
          ? "bg-black/60 backdrop-blur-xl border-b border-white/10"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="flex h-[72px] items-center justify-between">
          <Link
            to="/"
            data-testid="nav-logo"
            className="group flex items-center gap-2.5"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-fortia-accent opacity-60 blink" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-fortia-accent" />
            </span>
            <span className="font-display text-lg font-extrabold tracking-tight text-white">
              FORTIA
              <span className="text-fortia-accent">.</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                data-testid={`nav-link-${l.label.toLowerCase()}`}
                className={({ isActive }) =>
                  `relative px-4 py-2 font-mono text-xs uppercase tracking-[0.15em] transition-colors duration-300 ${
                    isActive
                      ? "text-white"
                      : "text-zinc-500 hover:text-white"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {l.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-x-3 -bottom-0.5 h-px bg-fortia-accent"
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <Link
            to="/contacto"
            data-testid="nav-cta"
            className="hidden items-center gap-2 border border-white/15 bg-white px-5 py-2.5 font-mono text-xs uppercase tracking-[0.15em] text-black transition-colors duration-300 hover:bg-fortia-accent hover:text-white md:inline-flex"
          >
            Iniciar proyecto
          </Link>

          <button
            data-testid="nav-menu-toggle"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center border border-white/15 text-white md:hidden"
            aria-label="Menu"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-white/10 bg-black/90 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col px-6 py-4">
              {LINKS.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.to === "/"}
                  data-testid={`nav-mobile-${l.label.toLowerCase()}`}
                  className={({ isActive }) =>
                    `border-b border-white/5 py-4 font-display text-2xl font-bold tracking-tight ${
                      isActive ? "text-fortia-accent" : "text-white"
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};
