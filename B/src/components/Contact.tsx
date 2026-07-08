import { useState, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send, Github, Linkedin, Twitter, Phone, Braces } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { PressSection, SectionMasthead, pressReveal } from './ui/press';

// Three.js is a heavy dependency (~130KB gzipped) — code-split so it's only
// fetched once someone actually sends a message, not in the main bundle.
const loadWaxSeal = () => import('./ui/wax-seal');
const WaxSeal = lazy(loadWaxSeal);

const socialLinks = [
  { icon: Github, label: 'GitHub', handle: '@SpaceWalkerr', url: 'https://github.com/SpaceWalkerr' },
  { icon: Linkedin, label: 'LinkedIn', handle: '@surajnandan', url: 'https://www.linkedin.com/in/surajnandan/' },
  { icon: Braces, label: 'LeetCode', handle: '@SurajNandan', url: 'https://leetcode.com/u/SurajNandan/' },
  { icon: Twitter, label: 'Twitter', handle: '@SurajNandan1625', url: 'https://x.com/SurajNandan1625' },
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [fieldErrors, setFieldErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [touched, setTouched] = useState<{ name?: boolean; email?: boolean; message?: boolean }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Name is required';
        if (value.trim().length < 2) return 'Name must be at least 2 characters';
        return undefined;
      case 'email':
        if (!value.trim()) return 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email address';
        return undefined;
      case 'message':
        if (!value.trim()) return 'Message is required';
        if (value.trim().length < 10) return 'Message must be at least 10 characters';
        return undefined;
      default:
        return undefined;
    }
  };

  const validateAll = (): boolean => {
    const errors: { name?: string; email?: string; message?: string } = {};
    errors.name = validateField('name', formData.name);
    errors.email = validateField('email', formData.email);
    errors.message = validateField('message', formData.message);
    setFieldErrors(errors);
    setTouched({ name: true, email: true, message: true });
    return !errors.name && !errors.email && !errors.message;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateAll()) return;
    setIsLoading(true);
    setShowError(false);
    loadWaxSeal(); // warm the chunk in parallel with the send, so the seal is ready to stamp on success

    try {
      // EmailJS configuration
      const serviceId = 'service_tmmpyud';
      const templateId = 'template_75e58ah';
      const publicKey = 'my_dIqRX5ixRlREAC';

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_email: 'surajnandan78@gmail.com',
      };

      await emailjs.send(serviceId, templateId, templateParams, publicKey);

      setIsLoading(false);
      setShowSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      setFieldErrors({});
      setTouched({});

      setTimeout(() => setShowSuccess(false), 5000);
    } catch (error) {
      console.error('Email sending failed:', error);
      setIsLoading(false);
      setShowError(true);

      setTimeout(() => setShowError(false), 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (touched[name as keyof typeof touched]) {
      setFieldErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setFieldErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const fieldClass = (field: 'name' | 'email' | 'message') =>
    `w-full border bg-paper px-4 py-3 font-editorial text-[15px] text-ink placeholder:text-ink-faint focus:outline-none ${
      fieldErrors[field] && touched[field] ? 'border-oxblood' : 'border-ink/40 focus:border-ink'
    }`;

  return (
    <PressSection id="contact">
      <SectionMasthead
        section="Section G"
        name="Correspondence"
        headline="Letters to the Editor"
        standfirst="Have a project in mind? Write in — every letter is read, and most get a reply within the day."
      />

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        {/* ===== Contact details & socials ===== */}
        <motion.div
          variants={pressReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="space-y-10"
        >
          <div>
            <p className="mb-6 font-editorial text-[15px] italic leading-relaxed text-ink-mute">
              Open to collaborations and opportunities — let's build something worth printing.
            </p>

            <dl className="divide-y divide-ink/20 border-y border-ink">
              <div className="flex items-center justify-between py-3.5">
                <dt className="font-monopress text-[10px] uppercase tracking-[0.18em] text-ink-mute">
                  <span className="mr-2 inline-flex items-center gap-1.5">
                    <Mail className="h-3.5 w-3.5" /> Email
                  </span>
                </dt>
                <dd>
                  <a
                    href="mailto:surajnandan78@gmail.com"
                    className="font-editorial text-[15px] text-ink hover:text-oxblood"
                  >
                    surajnandan78@gmail.com
                  </a>
                </dd>
              </div>
              <div className="flex items-center justify-between py-3.5">
                <dt className="font-monopress text-[10px] uppercase tracking-[0.18em] text-ink-mute">
                  <span className="mr-2 inline-flex items-center gap-1.5">
                    <Phone className="h-3.5 w-3.5" /> Phone
                  </span>
                </dt>
                <dd>
                  <a href="tel:+916203484989" className="font-editorial text-[15px] text-ink hover:text-oxblood">
                    +91 6203484989
                  </a>
                </dd>
              </div>
              <div className="flex items-center justify-between py-3.5">
                <dt className="font-monopress text-[10px] uppercase tracking-[0.18em] text-ink-mute">
                  <span className="mr-2 inline-flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5" /> Location
                  </span>
                </dt>
                <dd className="font-editorial text-[15px] text-ink">Teghariya Road, Kishanganj 855107</dd>
              </div>
            </dl>
          </div>

          {/* Social directory */}
          <div>
            <span className="font-monopress text-[10px] uppercase tracking-[0.24em] text-ink-mute">
              Find Me On
            </span>
            <div className="mt-3 grid grid-cols-2 gap-3">
              {socialLinks.map(({ icon: Icon, label, handle, url }) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 border border-ink/30 px-4 py-3 transition-colors hover:border-ink hover:bg-ink hover:text-paper"
                >
                  <Icon className="h-4 w-4 flex-shrink-0" />
                  <span>
                    <span className="block font-monopress text-[10px] uppercase tracking-[0.1em]">
                      {label}
                    </span>
                    <span className="block font-editorial text-xs italic text-ink-mute group-hover:text-paper/70">
                      {handle}
                    </span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ===== The letter form ===== */}
        <motion.form
          onSubmit={handleSubmit}
          variants={pressReveal}
          custom={1}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="border border-ink p-6 sm:p-8"
        >
          <div className="mb-6 flex items-baseline justify-between border-b border-ink pb-3">
            <span className="font-editorial text-base italic">To the Editor,</span>
            <span className="font-monopress text-[9px] uppercase tracking-[0.16em] text-ink-mute">
              Correspondence Form
            </span>
          </div>

          <div className="mb-5">
            <label htmlFor="name" className="mb-1.5 block font-monopress text-[10px] uppercase tracking-[0.16em] text-ink-mute">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className={fieldClass('name')}
              placeholder="Your name"
            />
            {fieldErrors.name && touched.name && (
              <p className="mt-1.5 font-monopress text-[10px] uppercase tracking-[0.06em] text-oxblood">{fieldErrors.name}</p>
            )}
          </div>

          <div className="mb-5">
            <label htmlFor="email" className="mb-1.5 block font-monopress text-[10px] uppercase tracking-[0.16em] text-ink-mute">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={fieldClass('email')}
              placeholder="your.email@example.com"
            />
            {fieldErrors.email && touched.email && (
              <p className="mt-1.5 font-monopress text-[10px] uppercase tracking-[0.06em] text-oxblood">{fieldErrors.email}</p>
            )}
          </div>

          <div className="mb-6">
            <label htmlFor="message" className="mb-1.5 block font-monopress text-[10px] uppercase tracking-[0.16em] text-ink-mute">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              onBlur={handleBlur}
              rows={5}
              className={`${fieldClass('message')} resize-none`}
              placeholder="Tell me about your project..."
            />
            {fieldErrors.message && touched.message && (
              <p className="mt-1.5 font-monopress text-[10px] uppercase tracking-[0.06em] text-oxblood">{fieldErrors.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="flex w-full items-center justify-center gap-2 bg-ink px-6 py-3.5 font-monopress text-[11px] uppercase tracking-[0.18em] text-paper transition-colors hover:bg-oxblood disabled:opacity-60"
          >
            {isLoading ? (
              <>
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="h-4 w-4 rounded-full border-2 border-paper/30 border-t-paper"
                />
                Sending
              </>
            ) : (
              <>
                <Send size={15} />
                Send to Print
              </>
            )}
          </button>

          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="mt-4 flex items-center gap-3 border-l-2 border-ink bg-paper-bright p-3.5"
            >
              <Suspense fallback={<div className="h-11 w-11 flex-shrink-0 rounded-full bg-oxblood" />}>
                <WaxSeal
                  size={44}
                  className="flex-shrink-0"
                  onReady={(handle) => handle.stamp()}
                />
              </Suspense>
              <div>
                <p className="font-monopress text-[10px] uppercase tracking-[0.1em] text-ink">
                  Sealed &amp; sent to the presses
                </p>
                <p className="mt-1 font-editorial text-[13px] italic text-ink-mute">
                  I'll get back to you soon.
                </p>
              </div>
            </motion.div>
          )}

          {showError && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="mt-4 border-l-2 border-oxblood bg-paper-bright p-3.5"
            >
              <p className="font-monopress text-[10px] uppercase tracking-[0.1em] text-oxblood">
                Failed to send
              </p>
              <p className="mt-1 font-editorial text-[13px] italic text-ink-mute">
                Please try again, or write directly via email.
              </p>
            </motion.div>
          )}
        </motion.form>
      </div>
    </PressSection>
  );
};

export default Contact;
