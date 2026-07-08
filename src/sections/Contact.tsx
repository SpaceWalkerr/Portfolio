import { useState } from "react";
import emailjs from "@emailjs/browser";
import SectionShell from "../components/SectionShell";
import Reveal from "../components/Reveal";
import { section } from "../lib/sections";
import { PROFILE, EMAILJS } from "../data/content";

const { def, index } = section("contact");

type Status = "idle" | "sending" | "sent" | "error";

/** Input whose border reveals the comb-spectrum on focus (rainbow moment). */
function Field({
  label,
  type = "text",
  textarea = false,
  value,
  onChange,
}: {
  label: string;
  type?: string;
  textarea?: boolean;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <span className="readout mb-2 block">{label}</span>
      {/* gradient ring wrapper: transparent until focus-within */}
      <span className="group relative block rounded-xl bg-comb-spectrum p-px transition-opacity">
        <span className="pointer-events-none absolute inset-0 rounded-xl bg-white/10 transition-opacity duration-300 group-focus-within:opacity-0" />
        {textarea ? (
          <textarea
            rows={4}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="relative block w-full resize-none rounded-[11px] bg-deep-navy px-4 py-3 text-text-primary outline-none placeholder:text-text-muted/50"
            placeholder={`Your ${label.toLowerCase()}…`}
          />
        ) : (
          <input
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="relative block w-full rounded-[11px] bg-deep-navy px-4 py-3 text-text-primary outline-none placeholder:text-text-muted/50"
            placeholder={`Your ${label.toLowerCase()}…`}
          />
        )}
      </span>
    </label>
  );
}

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    try {
      await emailjs.send(
        EMAILJS.serviceId,
        EMAILJS.templateId,
        {
          from_name: form.name,
          from_email: form.email,
          message: form.message,
          to_email: EMAILJS.toEmail,
        },
        EMAILJS.publicKey,
      );
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const buttonLabel =
    status === "sending"
      ? "Sending…"
      : status === "sent"
        ? "Message sent — thank you"
        : status === "error"
          ? "Something went wrong — retry"
          : "Send message";

  return (
    <SectionShell section={def} index={index} loopOpacity={0.3}>
      <div className="grid gap-16 md:grid-cols-2 md:gap-24">
        <div>
          <Reveal>
            <p className="eyebrow mb-4">Abyssal — the payoff</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mb-6 font-display text-4xl font-light tracking-tight text-text-primary md:text-6xl">
              Let's build
              <br />
              something.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mb-8 max-w-md text-base leading-relaxed text-text-muted">
              Open to full-stack roles and interesting collaborations. The fastest
              way to reach me is email — or use the form.
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="mb-8 space-y-1.5">
              <a href={`tel:${PROFILE.phone.replace(/\s/g, "")}`} className="block text-text-muted transition-colors hover:text-text-primary">
                <span className="readout mr-3 inline-block w-20">Phone</span>
                {PROFILE.phone}
              </a>
              <p className="text-text-muted">
                <span className="readout mr-3 inline-block w-20">Location</span>
                {PROFILE.location}
              </p>
            </div>
          </Reveal>
          <div className="space-y-3">
            {PROFILE.socials.map((s, i) => (
              <Reveal key={s.label} delay={0.15 + i * 0.06}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-4"
                >
                  <span className="readout w-20">{s.label}</span>
                  <span className="text-text-muted transition-colors group-hover:text-text-primary">
                    {s.handle}
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={0.1}>
          <form onSubmit={submit} className="space-y-5">
            <Field label="Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
            <Field label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
            <Field label="Message" textarea value={form.message} onChange={(v) => setForm({ ...form, message: v })} />
            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full rounded-xl bg-comb-spectrum px-6 py-3.5 text-sm font-semibold text-abyss-black transition-transform hover:-translate-y-0.5 disabled:opacity-70"
              style={{ boxShadow: "0 0 30px -6px rgba(107,193,255,0.5)" }}
            >
              {buttonLabel}
            </button>
          </form>
        </Reveal>
      </div>
    </SectionShell>
  );
}
