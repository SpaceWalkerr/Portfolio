import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send, Github, Linkedin, Twitter, Phone, Braces } from 'lucide-react';
import emailjs from '@emailjs/browser';

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
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
    } catch (error) {
      console.error('Email sending failed:', error);
      setIsLoading(false);
      setShowError(true);
      
      // Hide error message after 5 seconds
      setTimeout(() => {
        setShowError(false);
      }, 5000);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (touched[name as keyof typeof touched]) {
      setFieldErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    setFieldErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
  };

  return (
    <section id="contact" className="py-24 sm:py-32 lg:py-40 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      {/* Background decorative elements - enhanced subtle glows */}
      <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-cyan-500/[0.06] rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/[0.05] rounded-full blur-3xl"></div>
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-500/[0.04] rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/3 right-1/3 w-[450px] h-[450px] bg-indigo-500/[0.04] rounded-full blur-3xl"></div>
      
      {/* Central ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-to-br from-cyan-500/[0.03] via-purple-500/[0.02] to-blue-500/[0.03] rounded-full blur-3xl"></div>
      
      {/* Subtle overlay gradients for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-transparent to-slate-950/60"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/20 via-transparent to-slate-950/20"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ 
            duration: 0.9,
            ease: [0.16, 1, 0.3, 1]
          }}
          className="mb-16 sm:mb-20 text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-cyan-500"></div>
            <span className="text-cyan-400 text-sm font-medium tracking-wider uppercase">
              Contact
            </span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-cyan-500"></div>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
            Let's Work Together
          </h2>
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto mb-6">
            Have a project in mind? Let's discuss how we can work together to bring your ideas to life.
          </p>
          
          {/* Futuristic Divider Line */}
          <div className="relative h-px w-full max-w-md mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent blur-sm opacity-30"></div>
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/50"></div>
            <div className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/50"></div>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/50"></div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -40, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ 
              delay: 0.2,
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1]
            }}
            className="space-y-6 sm:space-y-8"
          >
            {/* Contact Information Card */}
            <motion.div
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ duration: 0.3 }}
              className="backdrop-blur-xl bg-gradient-to-br from-white/[0.07] to-white/[0.02] rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/10 hover:border-cyan-400/40 transition-all duration-500 shadow-lg shadow-black/20 hover:shadow-2xl hover:shadow-cyan-500/20 group relative overflow-hidden"
            >
              {/* Background glow effects */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/[0.03] via-transparent to-blue-500/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative z-10">
                {/* Welcome Message */}
                <div className="mb-6 pb-6 border-b border-white/10">
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                    Open to collaborations and opportunities. Let's build something amazing together!
                  </p>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 group-hover:text-cyan-50 transition-colors">
                  Contact Information
                </h3>

                <div className="space-y-5 sm:space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="relative flex-shrink-0">
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/30 to-blue-500/30 rounded-xl blur-md"></div>
                      <div className="relative p-3 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl text-cyan-400 border border-cyan-400/20">
                        <Mail size={20} />
                      </div>
                    </div>
                    <div>
                      <p className="text-slate-400 text-sm mb-1.5">Email</p>
                      <a
                        href="mailto:surajnandan78@gmail.com"
                        className="text-white hover:text-cyan-400 transition-colors text-sm sm:text-base font-medium"
                      >
                        surajnandan78@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="relative flex-shrink-0">
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/30 to-blue-500/30 rounded-xl blur-md"></div>
                      <div className="relative p-3 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl text-cyan-400 border border-cyan-400/20">
                        <Phone size={20} />
                      </div>
                    </div>
                    <div>
                      <p className="text-slate-400 text-sm mb-1.5">Phone</p>
                      <a
                        href="tel:+916203484989"
                        className="text-white hover:text-cyan-400 transition-colors text-sm sm:text-base font-medium"
                      >
                        +91 6203484989
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="relative flex-shrink-0">
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/30 to-blue-500/30 rounded-xl blur-md"></div>
                      <div className="relative p-3 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl text-cyan-400 border border-cyan-400/20">
                        <MapPin size={20} />
                      </div>
                    </div>
                    <div>
                      <p className="text-slate-400 text-sm mb-1.5">Location</p>
                      <p className="text-white text-sm sm:text-base font-medium">Teghariya Road, Kishanganj 855107</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Social Links Card */}
            <motion.div
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ duration: 0.3 }}
              className="backdrop-blur-xl bg-gradient-to-br from-white/[0.07] to-white/[0.02] rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/10 hover:border-cyan-400/40 transition-all duration-500 shadow-lg shadow-black/20 hover:shadow-2xl hover:shadow-cyan-500/20 group relative overflow-hidden"
            >
              {/* Background glow effects */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/[0.03] via-transparent to-blue-500/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
              <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative z-10">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 group-hover:text-cyan-50 transition-colors">
                  Connect With Me
                </h3>
                <p className="text-slate-400 text-sm mb-6">
                  Find me on these platforms
                </p>
                
                <div className="space-y-4">
                  {/* GitHub Link */}
                  <motion.a
                    href="https://github.com/SpaceWalkerr"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: 4 }}
                    className="flex items-center gap-4 p-3 backdrop-blur-sm bg-white/[0.03] rounded-xl border border-white/10 hover:border-cyan-400/50 transition-all duration-300 group/link"
                  >
                    <div className="relative flex-shrink-0">
                      <div className="absolute inset-0 bg-cyan-400/20 blur-lg opacity-0 group-hover/link:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                      <div className="relative p-2 bg-white/5 rounded-lg">
                        <Github className="text-slate-400 group-hover/link:text-cyan-400 transition-colors" size={20} />
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-medium text-sm group-hover/link:text-cyan-400 transition-colors">GitHub</p>
                      <p className="text-slate-500 text-xs">@SpaceWalkerr</p>
                    </div>
                  </motion.a>

                  {/* LinkedIn Link */}
                  <motion.a
                    href="https://www.linkedin.com/in/surajnandan/"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: 4 }}
                    className="flex items-center gap-4 p-3 backdrop-blur-sm bg-white/[0.03] rounded-xl border border-white/10 hover:border-blue-400/50 transition-all duration-300 group/link"
                  >
                    <div className="relative flex-shrink-0">
                      <div className="absolute inset-0 bg-blue-400/20 blur-lg opacity-0 group-hover/link:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                      <div className="relative p-2 bg-white/5 rounded-lg">
                        <Linkedin className="text-slate-400 group-hover/link:text-blue-400 transition-colors" size={20} />
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-medium text-sm group-hover/link:text-blue-400 transition-colors">LinkedIn</p>
                      <p className="text-slate-500 text-xs">@surajnandan</p>
                    </div>
                  </motion.a>

                  {/* LeetCode Link */}
                  <motion.a
                    href="https://leetcode.com/u/SurajNandan/"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: 4 }}
                    className="flex items-center gap-4 p-3 backdrop-blur-sm bg-white/[0.03] rounded-xl border border-white/10 hover:border-amber-400/50 transition-all duration-300 group/link"
                  >
                    <div className="relative flex-shrink-0">
                      <div className="absolute inset-0 bg-amber-400/20 blur-lg opacity-0 group-hover/link:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                      <div className="relative p-2 bg-white/5 rounded-lg">
                        <Braces className="text-slate-400 group-hover/link:text-amber-400 transition-colors" size={20} />
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-medium text-sm group-hover/link:text-amber-400 transition-colors">LeetCode</p>
                      <p className="text-slate-500 text-xs">@SurajNandan</p>
                    </div>
                  </motion.a>

                  {/* Twitter Link */}
                  <motion.a
                    href="https://x.com/SurajNandan1625"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: 4 }}
                    className="flex items-center gap-4 p-3 backdrop-blur-sm bg-white/[0.03] rounded-xl border border-white/10 hover:border-sky-400/50 transition-all duration-300 group/link"
                  >
                    <div className="relative flex-shrink-0">
                      <div className="absolute inset-0 bg-sky-400/20 blur-lg opacity-0 group-hover/link:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                      <div className="relative p-2 bg-white/5 rounded-lg">
                        <Twitter className="text-slate-400 group-hover/link:text-sky-400 transition-colors" size={20} />
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-medium text-sm group-hover/link:text-sky-400 transition-colors">Twitter</p>
                      <p className="text-slate-500 text-xs">@SurajNandan1625</p>
                    </div>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ 
              delay: 0.4,
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1]
            }}
          >
            <motion.form
              onSubmit={handleSubmit}
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ duration: 0.3 }}
              className="backdrop-blur-xl bg-gradient-to-br from-white/[0.07] to-white/[0.02] rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/10 hover:border-cyan-400/40 transition-all duration-500 shadow-lg shadow-black/20 hover:shadow-2xl hover:shadow-cyan-500/20 group relative overflow-hidden"
            >
              {/* Background glow effects */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/[0.03] via-transparent to-blue-500/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
              <div className="absolute -top-24 -left-24 w-48 h-48 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative z-10">
                <div className="mb-5 sm:mb-6">
                  <label
                    htmlFor="name"
                    className="block text-slate-300 mb-2 font-medium text-sm sm:text-base"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full px-4 py-3 bg-slate-900/50 backdrop-blur-sm border rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all duration-300 ${
                      fieldErrors.name && touched.name
                        ? 'border-red-500/60 focus:border-red-400 focus:ring-red-400/20'
                        : 'border-white/10 focus:border-cyan-400 focus:ring-cyan-400/20'
                    }`}
                    placeholder="Your name"
                  />
                  {fieldErrors.name && touched.name && (
                    <p className="mt-1.5 text-xs text-red-400">{fieldErrors.name}</p>
                  )}
                </div>

                <div className="mb-5 sm:mb-6">
                  <label
                    htmlFor="email"
                    className="block text-slate-300 mb-2 font-medium text-sm sm:text-base"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full px-4 py-3 bg-slate-900/50 backdrop-blur-sm border rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all duration-300 ${
                      fieldErrors.email && touched.email
                        ? 'border-red-500/60 focus:border-red-400 focus:ring-red-400/20'
                        : 'border-white/10 focus:border-cyan-400 focus:ring-cyan-400/20'
                    }`}
                    placeholder="your.email@example.com"
                  />
                  {fieldErrors.email && touched.email && (
                    <p className="mt-1.5 text-xs text-red-400">{fieldErrors.email}</p>
                  )}
                </div>

                <div className="mb-6 sm:mb-8">
                  <label
                    htmlFor="message"
                    className="block text-slate-300 mb-2 font-medium text-sm sm:text-base"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    rows={5}
                    className={`w-full px-4 py-3 bg-slate-900/50 backdrop-blur-sm border rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all duration-300 resize-none ${
                      fieldErrors.message && touched.message
                        ? 'border-red-500/60 focus:border-red-400 focus:ring-red-400/20'
                        : 'border-white/10 focus:border-cyan-400 focus:ring-cyan-400/20'
                    }`}
                    placeholder="Tell me about your project..."
                  ></textarea>
                  {fieldErrors.message && touched.message && (
                    <p className="mt-1.5 text-xs text-red-400">{fieldErrors.message}</p>
                  )}
                </div>

                <motion.button
                  type="submit"
                  disabled={isLoading}
                  whileHover={{ scale: isLoading ? 1 : 1.02, y: isLoading ? 0 : -2 }}
                  whileTap={{ scale: isLoading ? 1 : 0.98 }}
                  className="relative w-full px-6 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl overflow-hidden group/button disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover/button:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 opacity-0 group-hover/button:opacity-100 transition-opacity duration-300">
                    <div className="absolute inset-0 bg-cyan-400/30 blur-xl"></div>
                  </div>
                  <span className="relative flex items-center justify-center gap-2">
                    {isLoading ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                        />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        Send Message
                      </>
                    )}
                  </span>
                </motion.button>

                {/* Success Message */}
                {showSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="mt-4 p-4 backdrop-blur-sm bg-green-500/10 border border-green-500/30 rounded-xl"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center mt-0.5">
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-green-400 font-semibold text-sm sm:text-base">
                          Message sent successfully!
                        </p>
                        <p className="text-green-300/80 text-xs sm:text-sm mt-1">
                          I'll get back to you soon.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Error Message */}
                {showError && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="mt-4 p-4 backdrop-blur-sm bg-red-500/10 border border-red-500/30 rounded-xl"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-red-500 flex items-center justify-center mt-0.5">
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-red-400 font-semibold text-sm sm:text-base">
                          Failed to send message
                        </p>
                        <p className="text-red-300/80 text-xs sm:text-sm mt-1">
                          Please try again or contact me directly via email.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
