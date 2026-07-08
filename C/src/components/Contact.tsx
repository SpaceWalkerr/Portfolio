import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send, Github, Linkedin, Twitter, Phone, Braces } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { BlueprintSection, SheetHeader, ApprovalStamp, draftReveal } from './ui/blueprint';

const socialLinks = [
  { icon: Github, label: 'GitHub', handle: '@SpaceWalkerr', url: 'https://github.com/SpaceWalkerr' },
  { icon: Linkedin, label: 'LinkedIn', handle: '@surajnandan', url: 'https://www.linkedin.com/in/surajnandan/' },
  { icon: Braces, label: 'LeetCode', handle: '@SurajNandan', url: 'https://leetcode.com/u/SurajNandan/' },
  { icon: Twitter, label: 'Twitter', handle: '@SurajNandan1625', url: 'https://x.com/SurajNandan1625' },
];

type FieldName = 'name' | 'email' | 'message';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({});
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
    const errors: Partial<Record<FieldName, string>> = {
      name: validateField('name', formData.name),
      email: validateField('email', formData.email),
      message: validateField('message', formData.message),
    };
    setFieldErrors(errors);
    setTouched({ name: true, email: true, message: true });
    return !errors.name && !errors.email && !errors.message;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateAll()) return;
    setIsLoading(true);
    setShowError(false);

    try {
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
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (touched[name as FieldName]) {
      setFieldErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setFieldErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const fieldClass = (field: FieldName) =>
    `w-full border bg-transparent px-4 py-3 font-sans text-[15px] text-ink placeholder:text-ink-mute/50 focus:outline-none ${
      fieldErrors[field] && touched[field] ? 'border-brass' : 'border-ink/40 focus:border-ink'
    }`;

  return (
    <BlueprintSection id="contact">
      <SheetHeader
        sheetNo={8}
        sheetTotal={8}
        fig="FIG. 7"
        sectionRef="Sec. G — Correspondence"
        headline="File a Request"
        standfirst="Have a project in mind? File a request below — every submission is reviewed, most within the day."
      />

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <motion.div variants={draftReveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} className="space-y-10">
          <div>
            <p className="mb-6 font-mono text-[13px] leading-relaxed text-ink-mute">
              Open to collaborations and opportunities — let's draft something worth filing.
            </p>

            <dl className="divide-y divide-ink/20 border-y border-ink/40">
              <div className="flex items-center justify-between py-3.5">
                <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-mute">
                  <span className="mr-2 inline-flex items-center gap-1.5">
                    <Mail className="h-3.5 w-3.5" /> Email
                  </span>
                </dt>
                <dd>
                  <a href="mailto:surajnandan78@gmail.com" className="font-mono text-[13px] text-ink hover:text-brass">
                    surajnandan78@gmail.com
                  </a>
                </dd>
              </div>
              <div className="flex items-center justify-between py-3.5">
                <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-mute">
                  <span className="mr-2 inline-flex items-center gap-1.5">
                    <Phone className="h-3.5 w-3.5" /> Phone
                  </span>
                </dt>
                <dd>
                  <a href="tel:+916203484989" className="font-mono text-[13px] text-ink hover:text-brass">
                    +91 6203484989
                  </a>
                </dd>
              </div>
              <div className="flex items-center justify-between py-3.5">
                <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-mute">
                  <span className="mr-2 inline-flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5" /> Location
                  </span>
                </dt>
                <dd className="font-mono text-[13px] text-ink">Teghariya Road, Kishanganj 855107</dd>
              </div>
            </dl>
          </div>

          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-ink-mute">Find Me On</span>
            <div className="mt-3 grid grid-cols-2 gap-3">
              {socialLinks.map(({ icon: Icon, label, handle, url }) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 border border-ink/30 px-4 py-3 transition-colors hover:border-brass"
                >
                  <Icon className="h-4 w-4 flex-shrink-0 text-ink" />
                  <span>
                    <span className="block font-mono text-[10px] uppercase tracking-[0.1em] text-ink">{label}</span>
                    <span className="block font-mono text-xs text-ink-mute">{handle}</span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          variants={draftReveal}
          custom={1}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="border border-ink/40 p-6 sm:p-8"
        >
          <div className="mb-6 flex items-baseline justify-between border-b border-ink/40 pb-3">
            <span className="font-mono text-xs uppercase tracking-[0.16em] text-cyan-pale">Request Form</span>
            <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-ink-mute">Sheet 8 of 8</span>
          </div>

          <div className="mb-5">
            <label htmlFor="name" className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.16em] text-ink-mute">
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
              <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.06em] text-brass">{fieldErrors.name}</p>
            )}
          </div>

          <div className="mb-5">
            <label htmlFor="email" className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.16em] text-ink-mute">
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
              <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.06em] text-brass">{fieldErrors.email}</p>
            )}
          </div>

          <div className="mb-6">
            <label htmlFor="message" className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.16em] text-ink-mute">
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
              <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.06em] text-brass">{fieldErrors.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="flex w-full items-center justify-center gap-2 bg-ink px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.18em] text-blueprint-deep transition-colors hover:bg-brass disabled:opacity-60"
          >
            {isLoading ? (
              <>
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="h-4 w-4 rounded-full border-2 border-blueprint-deep/30 border-t-blueprint-deep"
                />
                Filing
              </>
            ) : (
              <>
                <Send size={15} />
                File Request
              </>
            )}
          </button>

          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="mt-4 flex items-center gap-3 border-l-2 border-brass bg-blueprint-deep p-3.5"
            >
              <ApprovalStamp label="Filed" className="flex-shrink-0" />
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-ink">Request filed successfully</p>
                <p className="mt-1 font-mono text-[12px] text-ink-mute">I'll get back to you soon.</p>
              </div>
            </motion.div>
          )}

          {showError && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="mt-4 border-l-2 border-brass bg-blueprint-deep p-3.5"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-brass">Filing Failed</p>
              <p className="mt-1 font-mono text-[12px] text-ink-mute">Please try again, or write directly via email.</p>
            </motion.div>
          )}
        </motion.form>
      </div>
    </BlueprintSection>
  );
};

export default Contact;
