import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Check, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { MaskedLines, Reveal } from "@/components/site/Motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { api } from "@/lib/api";
import { REASONS } from "@/data/brands";

const initial = { name: "", company: "", email: "", reason: "", message: "" };

export default function Contact() {
  const [form, setForm] = useState(initial);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.reason || form.message.length < 5) {
      toast.error("Completa todos los campos requeridos.");
      return;
    }
    setLoading(true);
    try {
      await api.post("/contact", form);
      setSent(true);
      setForm(initial);
      toast.success("Mensaje enviado. Te contactaremos pronto.");
    } catch (err) {
      const detail = err?.response?.data?.detail;
      toast.error(
        typeof detail === "string" ? detail : "No se pudo enviar. Intenta de nuevo."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div data-testid="contact-page" className="pt-[72px]">
      <section className="mx-auto max-w-[1400px] px-6 pb-24 pt-20 lg:px-10 lg:pb-32 lg:pt-28">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.1fr] lg:gap-24">
          {/* Left */}
          <div>
            <Reveal>
              <p className="mb-8 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-zinc-400">
                <span className="h-px w-10 bg-fortia-accent" />
                Contacto
              </p>
            </Reveal>
            <h1 className="font-display text-[13vw] font-black uppercase leading-[0.88] tracking-tighter text-white sm:text-6xl lg:text-7xl">
              <MaskedLines lines={["Iniciemos", "algo real"]} accentIndex={1} />
            </h1>
            <Reveal delay={0.6}>
              <p className="mt-8 max-w-md text-base leading-relaxed text-zinc-400">
                Cuéntanos sobre tu proyecto. FORTIA SYSTEMS y el equipo de
                acxor.com responden como socio de ingeniería senior, no como
                proveedor.
              </p>
            </Reveal>

            <Reveal delay={0.75}>
              <div className="mt-12 space-y-px border border-white/10 bg-white/10">
                <a
                  href="mailto:contact@fortiasystems.com.mx"
                  data-testid="contact-email-link"
                  className="group flex items-center justify-between bg-fortia-bg px-6 py-5 transition-colors duration-300 hover:bg-fortia-surface"
                >
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-zinc-500">
                      Email
                    </p>
                    <p className="mt-1 font-display text-lg font-semibold text-white">
                      contact@fortiasystems.com.mx
                    </p>
                  </div>
                  <ArrowUpRight size={18} className="text-zinc-500 transition-colors group-hover:text-fortia-accent" />
                </a>
                <div className="grid grid-cols-2 gap-px bg-white/10">
                  <div className="bg-fortia-bg px-6 py-5">
                    <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-zinc-500">
                      Sede
                    </p>
                    <p className="mt-1 font-display text-lg font-semibold text-white">México</p>
                  </div>
                  <div className="bg-fortia-bg px-6 py-5">
                    <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-zinc-500">
                      Respuesta
                    </p>
                    <p className="mt-1 font-display text-lg font-semibold text-white">24–48 h</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Form */}
          <Reveal delay={0.2}>
            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                data-testid="contact-success"
                className="flex min-h-[420px] flex-col items-center justify-center border border-white/10 bg-fortia-surface p-10 text-center"
              >
                <span className="inline-flex h-16 w-16 items-center justify-center rounded-full border border-fortia-accent/40 bg-fortia-accent/10 text-fortia-accent">
                  <Check size={30} />
                </span>
                <h3 className="mt-6 font-display text-2xl font-bold text-white">
                  Mensaje recibido
                </h3>
                <p className="mt-3 max-w-sm text-sm text-zinc-400">
                  Gracias por escribir. Nuestro equipo revisará tu mensaje y te
                  contactará muy pronto.
                </p>
                <button
                  data-testid="contact-send-another"
                  onClick={() => setSent(false)}
                  className="mt-8 border border-white/20 px-6 py-3 font-mono text-xs uppercase tracking-[0.15em] text-white transition-colors hover:border-white/60"
                >
                  Enviar otro mensaje
                </button>
              </motion.div>
            ) : (
              <form
                data-testid="contact-form"
                onSubmit={submit}
                className="border border-white/10 bg-fortia-surface p-6 lg:p-10"
              >
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2.5">
                    <Label htmlFor="name" className="font-mono text-[11px] uppercase tracking-[0.15em] text-zinc-500">
                      Nombre *
                    </Label>
                    <Input
                      id="name"
                      data-testid="contact-input-name"
                      value={form.name}
                      onChange={(e) => update("name", e.target.value)}
                      placeholder="Tu nombre"
                      className="h-12 rounded-none border-white/15 bg-fortia-bg text-white placeholder:text-zinc-600 focus-visible:ring-1 focus-visible:ring-white focus-visible:ring-offset-0"
                    />
                  </div>
                  <div className="space-y-2.5">
                    <Label htmlFor="company" className="font-mono text-[11px] uppercase tracking-[0.15em] text-zinc-500">
                      Empresa
                    </Label>
                    <Input
                      id="company"
                      data-testid="contact-input-company"
                      value={form.company}
                      onChange={(e) => update("company", e.target.value)}
                      placeholder="Opcional"
                      className="h-12 rounded-none border-white/15 bg-fortia-bg text-white placeholder:text-zinc-600 focus-visible:ring-1 focus-visible:ring-white focus-visible:ring-offset-0"
                    />
                  </div>
                </div>

                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2.5">
                    <Label htmlFor="email" className="font-mono text-[11px] uppercase tracking-[0.15em] text-zinc-500">
                      Email *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      data-testid="contact-input-email"
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      placeholder="tu@empresa.com"
                      className="h-12 rounded-none border-white/15 bg-fortia-bg text-white placeholder:text-zinc-600 focus-visible:ring-1 focus-visible:ring-white focus-visible:ring-offset-0"
                    />
                  </div>
                  <div className="space-y-2.5">
                    <Label className="font-mono text-[11px] uppercase tracking-[0.15em] text-zinc-500">
                      Motivo de contacto *
                    </Label>
                    <Select value={form.reason} onValueChange={(v) => update("reason", v)}>
                      <SelectTrigger
                        data-testid="contact-select-reason"
                        className="h-12 rounded-none border-white/15 bg-fortia-bg text-white focus:ring-1 focus:ring-white focus:ring-offset-0"
                      >
                        <SelectValue placeholder="Selecciona una opción" />
                      </SelectTrigger>
                      <SelectContent className="rounded-none border-white/15 bg-fortia-elevated text-white">
                        {REASONS.map((r) => (
                          <SelectItem
                            key={r}
                            value={r}
                            data-testid={`contact-reason-${r}`}
                            className="font-mono text-sm"
                          >
                            {r}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="mt-6 space-y-2.5">
                  <Label htmlFor="message" className="font-mono text-[11px] uppercase tracking-[0.15em] text-zinc-500">
                    Mensaje *
                  </Label>
                  <Textarea
                    id="message"
                    data-testid="contact-input-message"
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                    placeholder="Cuéntanos sobre tu proyecto, alcance y objetivos…"
                    rows={6}
                    className="resize-none rounded-none border-white/15 bg-fortia-bg text-white placeholder:text-zinc-600 focus-visible:ring-1 focus-visible:ring-white focus-visible:ring-offset-0"
                  />
                </div>

                <button
                  type="submit"
                  data-testid="contact-form-submit-button"
                  disabled={loading}
                  className="group mt-8 inline-flex w-full items-center justify-center gap-2 bg-white px-8 py-4 font-mono text-xs uppercase tracking-[0.15em] text-black transition-colors duration-300 hover:bg-fortia-accent hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <Loader2 size={16} className="animate-spin" /> Enviando…
                    </>
                  ) : (
                    <>
                      Enviar mensaje
                      <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </>
                  )}
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </section>
    </div>
  );
}
