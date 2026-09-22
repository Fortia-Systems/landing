import { ArrowUpRight } from "lucide-react";

export const BrandCard = ({ brand, index }) => {
  return (
    <a
      href={brand.url}
      target="_blank"
      rel="noreferrer"
      data-testid={`brand-card-${brand.name.toLowerCase()}`}
      className={`group relative flex flex-col overflow-hidden border border-white/10 bg-fortia-surface transition-[transform,border-color] duration-500 hover:-translate-y-1 hover:border-white/30 ${brand.span}`}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={brand.image}
          alt={brand.name}
          loading="lazy"
          className="h-full w-full object-cover opacity-60 grayscale transition-[filter,opacity,transform] duration-700 ease-out group-hover:scale-105 group-hover:opacity-90 group-hover:grayscale-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-fortia-surface via-fortia-surface/30 to-transparent" />
        <div className="absolute left-0 top-0 flex items-center gap-2 p-4">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/70">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="h-px w-6 bg-white/30" />
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/70">
            {brand.category}
          </span>
        </div>
        {brand.status === "dev" && (
          <span className="absolute right-4 top-4 border border-fortia-accent/50 bg-fortia-accent/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-fortia-accent">
            En desarrollo
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-display text-2xl font-bold tracking-tight text-white">
              {brand.name}
            </h3>
            <p className="mt-1 font-mono text-xs text-zinc-500">{brand.domain}</p>
          </div>
          <span className="mt-1 inline-flex h-9 w-9 shrink-0 items-center justify-center border border-white/10 text-white transition-colors duration-300 group-hover:border-fortia-accent group-hover:bg-fortia-accent">
            <ArrowUpRight size={16} />
          </span>
        </div>

        <p className="mt-4 flex-1 text-sm leading-relaxed text-zinc-400">
          {brand.desc}
        </p>

        <div className="mt-6 flex items-end gap-3 border-t border-white/10 pt-5">
          <span className="font-display text-3xl font-black tracking-tight text-white">
            {brand.metric}
          </span>
          <span className="pb-1 font-mono text-[11px] uppercase tracking-[0.12em] text-zinc-500">
            {brand.metricLabel}
          </span>
        </div>
      </div>
    </a>
  );
};
