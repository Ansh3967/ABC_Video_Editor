import { useState } from "react";
import { motion } from "framer-motion";
import { SectionHeader } from "./SectionHeader";

type Status = "idle" | "sending" | "sent" | "error";

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setError(null);
    try {
      const res = await fetch("/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to send");
      }
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  return (
    <section className="px-4 md:px-8 lg:px-12 py-20 bg-black">
      {/* Gradient Border Wrapper */}
      <div className="relative max-w-6xl mx-auto rounded-[32px] p-[1.5px] bg-gradient-to-br from-white via-zinc-300 to-slate-500">
        {/* Glow */}
        <div className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-white/30 via-zinc-400/20 to-slate-500/30 blur-3xl opacity-60" />

        {/* Actual Section */}
        <section
          id="contact"
          className="relative rounded-[32px] bg-bg py-24 md:py-32 px-6 md:px-10 lg:px-16 overflow-hidden"
        >
          <div className="max-w-[1200px] mx-auto">
            <h3 className="text-4xl md:text-6xl text-text-primary mb-10 text-center">
              Have an <span className="font-display italic">idea</span>?
            </h3>

            <SectionHeader
              eyebrow="05 — Contact"
              title="Let's"
              italic="connect"
              subtitle="Drop a note about your project, role, or wild idea. It lands straight in my inbox."
            />

            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mt-12">
              {/* Left Side */}
              <div className="md:col-span-5">
                <h2 className="text-4xl md:text-5xl text-text-primary leading-tight">
                  Send a <span className="font-display italic">message</span>
                </h2>

                <p className="text-muted mt-5 text-sm md:text-base max-w-sm">
                  Got a project, role, or wild idea? Drop the details and it lands straight in my
                  inbox.
                </p>
              </div>

              {/* Form */}
              <motion.form
                onSubmit={onSubmit}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="md:col-span-7 flex flex-col gap-5"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field
                    label="Name"
                    name="name"
                    value={form.name}
                    onChange={onChange}
                    required
                    maxLength={100}
                  />

                  <Field
                    label="Email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={onChange}
                    required
                    maxLength={255}
                  />
                </div>

                <Field
                  label="Message"
                  name="message"
                  value={form.message}
                  onChange={onChange}
                  required
                  textarea
                  maxLength={2000}
                />

                <div className="flex items-center justify-between gap-4 pt-2">
                  <p className="text-xs text-muted">
                    {status === "sent" && (
                      <span className="text-green-400">Message sent — talk soon.</span>
                    )}

                    {status === "error" && <span className="text-red-400">{error}</span>}
                  </p>

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="group relative inline-flex rounded-full text-sm disabled:opacity-60"
                  >
                    {/* Button Glow Border */}
                    <span className="absolute -inset-[1.5px] rounded-full bg-gradient-to-r from-white via-zinc-300 to-slate-500 opacity-70 blur-sm group-hover:opacity-100 transition-opacity" />

                    {/* Button */}
                    <span className="relative inline-flex items-center gap-2 rounded-full bg-text-primary text-bg group-hover:bg-bg group-hover:text-text-primary px-7 py-3.5 transition-colors">
                      {status === "sending" ? "Sending…" : "Send message"}

                      <span className="text-[10px]">↗</span>
                    </span>
                  </button>
                </div>
              </motion.form>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}

function Field({
  label,
  textarea,
  ...props
}: {
  label: string;
  textarea?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement> &
  React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const base =
    "w-full bg-transparent border-b border-stroke focus:border-text-primary text-text-primary placeholder:text-muted/60 outline-none py-3 transition-colors";
  return (
    <label className="block">
      <span className="block text-xs uppercase tracking-[0.25em] text-muted mb-2">{label}</span>
      {textarea ? (
        <textarea
          rows={5}
          className={base + " resize-none"}
          {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input className={base} {...(props as React.InputHTMLAttributes<HTMLInputElement>)} />
      )}
    </label>
  );
}
