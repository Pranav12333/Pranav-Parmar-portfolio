import { useState } from "react";
import type { ChangeEvent, FormEvent, ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaYoutube, FaEnvelope, FaInstagram, FaStackOverflow } from "react-icons/fa";
import { FiMail, FiPhone, FiMapPin, FiSend, FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import { profile } from "../data/profile";
import { SectionHeader } from "./About";
import Reveal from "./effects/Reveal";
import Magnetic from "./effects/Magnetic";

// Serverless form delivery (formsubmit.co) — messages go straight to the
// inbox, no backend needed. One-time setup: the first-ever submission
// triggers an activation email to this address; delivery starts once its
// link is clicked.
const FORM_ENDPOINT = `https://formsubmit.co/ajax/${profile.email}`;
const SEND_TIMEOUT_MS = 15000;

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<{ ok: boolean; msg: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Prefilled mailto so the visitor's message is never lost when the API is
  // down — their email app opens with everything already written. Line breaks
  // must be CRLF (RFC 6068) and some mail handlers reject URLs beyond ~2k
  // chars, so overly long messages are trimmed with an ellipsis (the full
  // text stays in the form either way).
  const mailtoHref = () => {
    const subject = encodeURIComponent(
      `Portfolio contact from ${form.name || "your website"}`
    );
    const signature = `\r\n\r\n— ${form.name}${form.email ? ` (${form.email})` : ""}`;
    let message = form.message.replace(/\r?\n/g, "\r\n");
    let body = encodeURIComponent(message + signature);
    while (body.length > 1700 && message.length > 0) {
      message = message.slice(0, Math.floor(message.length * 0.8));
      body = encodeURIComponent(`${message}…${signature}`);
    }
    return `${profile.socials.email}?subject=${subject}&body=${body}`;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus(null);
    setLoading(true);
    const controller = new AbortController();
    const abortTimer = window.setTimeout(
      () => controller.abort(),
      SEND_TIMEOUT_MS
    );
    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          _subject: `Portfolio contact from ${form.name}`,
          _template: "table",
          _captcha: "false",
        }),
        signal: controller.signal,
      });
      const data = await response.json();
      // FormSubmit reports success as the string "true".
      if (response.ok && String(data.success) === "true") {
        setStatus({ ok: true, msg: "Message sent! I'll get back to you soon." });
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus({
          ok: false,
          msg: data.message || "Sending failed — use the email button below instead.",
        });
      }
    } catch {
      setStatus({
        ok: false,
        msg: "Sending didn't go through, but your message isn't lost — send it with one click below.",
      });
    } finally {
      window.clearTimeout(abortTimer);
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 transition focus-visible:border-blue-500/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100";

  return (
    <section id="contact" className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeader eyebrow="Let's connect" title="Get in Touch" center />
        </Reveal>
        <Reveal delay={0.05}>
          <p className="mx-auto mt-5 max-w-2xl text-center text-slate-600 dark:text-slate-400">
            Got a project idea, a role in mind, or just want to connect? Drop me a
            message — I'm always open to interesting conversations.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          {/* Contact info */}
          <Reveal direction="right" className="flex h-full flex-col gap-4">
            <ContactRow
              icon={<FiMail />}
              label="Email"
              value={profile.email}
              href={profile.socials.email}
            />
            <ContactRow
              icon={<FiPhone />}
              label="Phone"
              value={profile.phone}
              href={`tel:${profile.phone.replace(/\s/g, "")}`}
            />
            <ContactRow icon={<FiMapPin />} label="Location" value={profile.location} />

            <div className="card flex-1 p-5">
              <p className="mb-3 text-sm font-semibold text-slate-900 dark:text-white">
                Find me online
              </p>
              <div className="flex flex-wrap gap-3">
                <Social href={profile.socials.github} label="GitHub">
                  <FaGithub />
                </Social>
                <Social href={profile.socials.linkedin} label="LinkedIn">
                  <FaLinkedin />
                </Social>
                <Social href={profile.socials.youtube} label="YouTube">
                  <FaYoutube />
                </Social>
                <Social href={profile.socials.instagram} label="Instagram">
                  <FaInstagram />
                </Social>
                <Social href={profile.socials.stackoverflow} label="Stack Overflow">
                  <FaStackOverflow />
                </Social>
                <Social href={profile.socials.email} label="Email" external={false}>
                  <FaEnvelope />
                </Social>
              </div>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal direction="left" className="h-full">
            <form
              onSubmit={handleSubmit}
              className="card flex h-full flex-col gap-4 p-6 sm:p-8"
            >
              <div>
                <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  required
                  placeholder="Your name"
                  value={form.name}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  required
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
              <div className="flex flex-1 flex-col">
                <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  maxLength={1500}
                  rows={5}
                  placeholder="Tell me about your project or opportunity..."
                  value={form.message}
                  onChange={handleChange}
                  className={`${inputClass} flex-1 resize-none`}
                />
              </div>

              {/* Low strength: the card clips at overflow-hidden, so the
                  button's travel must stay inside the card padding. */}
              <Magnetic strength={0.1}>
                <button
                  type="submit"
                  disabled={loading}
                  data-cursor="hover"
                  className="group btn-sheen inline-flex w-full items-center justify-center gap-2 rounded-xl brand-gradient px-6 py-3 font-semibold text-white shadow-lg shadow-blue-500/25 transition-all hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-500/40 active:scale-[0.98] disabled:opacity-60"
                >
                  {loading ? "Sending..." : "Send Message"}
                  {!loading && (
                    <FiSend className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                  )}
                </button>
              </Magnetic>

              <AnimatePresence>
                {status && (
                  <motion.div
                    role="status"
                    aria-live="polite"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className={`flex flex-col gap-2.5 rounded-lg px-3 py-2.5 text-sm ${
                      status.ok
                        ? "bg-green-500/10 text-green-600 dark:text-green-400"
                        : "bg-red-500/10 text-red-600 dark:text-red-400"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {status.ok ? (
                        <FiCheckCircle className="shrink-0" />
                      ) : (
                        <FiAlertCircle className="shrink-0" />
                      )}
                      {status.msg}
                    </span>
                    {!status.ok && (
                      <a
                        href={mailtoHref()}
                        data-cursor="hover"
                        className="inline-flex w-fit items-center gap-2 rounded-lg border border-blue-500/30 bg-blue-500/10 px-3 py-1.5 font-medium text-blue-600 transition-colors hover:bg-blue-500/20 dark:text-blue-400"
                      >
                        <FiMail /> Send via my email app instead
                      </a>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

const ContactRow = ({
  icon,
  label,
  value,
  href,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  href?: string;
}) => {
  const content = (
    <div className="group card card-hover flex items-center gap-4 p-5">
      <span className="icon-tile h-11 w-11 text-lg">{icon}</span>
      <div>
        <p className="text-xs uppercase tracking-wide text-slate-400 dark:text-slate-500">
          {label}
        </p>
        <p className="font-medium text-slate-800 transition-colors duration-300 group-hover:text-blue-600 dark:text-slate-100 dark:group-hover:text-blue-400">
          {value}
        </p>
      </div>
    </div>
  );
  return href ? (
    <a href={href} data-cursor="hover" className="block">
      {content}
    </a>
  ) : (
    content
  );
};

const Social = ({
  href,
  label,
  children,
  external = true,
}: {
  href: string;
  label: string;
  children: ReactNode;
  external?: boolean;
}) => (
  <a
    href={href}
    aria-label={label}
    data-cursor="hover"
    {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
    className="grid h-11 w-11 place-items-center rounded-full border border-slate-200 text-lg text-slate-600 transition-all duration-300 hover:-translate-y-1.5 hover:scale-110 hover:border-transparent hover:bg-blue-500 hover:text-white hover:shadow-lg hover:shadow-blue-500/40 dark:border-slate-800 dark:text-slate-300"
  >
    {children}
  </a>
);

export default Contact;
