import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2, AlertCircle, Mail, Clock, Zap } from 'lucide-react';

interface ContactProps {
    email?: string;
}

export const Contact: React.FC<ContactProps> = ({ email }) => {
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        purpose: '',
        message: '',
        consent: false
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const targetEmail = email || "mohitkonduri@example.com"; // Fallback if data hasn't loaded

        setStatus('submitting');

        try {
            // Try using the Vercel serverless function first
            const apiEndpoint = '/api/send-email';

            const response = await fetch(apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    ...formData,
                    targetEmail
                }),
            });

            if (response.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', subject: '', purpose: '', message: '', consent: false });
                setTimeout(() => setStatus('idle'), 5000);
            } else {
                // Fallback to direct FormSubmit if API fails
                console.warn('API failed, trying FormSubmit directly...');
                const formsubmitEndpoint = `https://formsubmit.co/ajax/${targetEmail}`;

                const fallbackResponse = await fetch(formsubmitEndpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        ...formData,
                        _subject: `Portfolio Contact: ${formData.subject}`,
                        _template: 'table'
                    }),
                });

                if (fallbackResponse.ok) {
                    setStatus('success');
                    setFormData({ name: '', email: '', subject: '', purpose: '', message: '', consent: false });
                    setTimeout(() => setStatus('idle'), 5000);
                } else {
                    throw new Error("Both API and FormSubmit failed");
                }
            }
        } catch (err) {
            console.error('Email sending error:', err);
            setStatus('error');
            setTimeout(() => setStatus('idle'), 5000);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { id, value, type } = e.target;
        const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
        setFormData(prev => ({ ...prev, [id || e.target.name]: val }));
    };

    return (
        <section id="contact" className="py-24 scroll-mt-20 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-96 h-96 bg-sky-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
            </div>

            <div className="container mx-auto px-6 max-w-6xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: '4rem' }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="h-1.5 bg-gradient-to-r from-sky-600 to-blue-600 rounded-full mb-6 mx-auto"
                    />
                    <h2 className="text-4xl md:text-6xl font-black text-slate-800 mb-4">
                        Let's <span className="gradient-text">Connect</span>
                    </h2>
                    <p className="text-lg text-slate-600 font-medium max-w-2xl mx-auto">
                        Have a question or want to collaborate? I'd love to hear from you.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Contact Info Cards */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="lg:col-span-1 space-y-6"
                    >
                        {/* Info Card 1 */}
                        <div className="glass-card rounded-2xl p-6 hover-lift">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-600 to-blue-600 flex items-center justify-center mb-4">
                                <Mail className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-800 mb-2">Email Me</h3>
                            <p className="text-sm text-slate-600 font-medium">
                                I'm always open to discussing new academic collaborations.
                            </p>
                        </div>

                        {/* Info Card 2 */}
                        <div className="glass-card rounded-2xl p-6 hover-lift">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-600 to-blue-600 flex items-center justify-center mb-4">
                                <Clock className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-800 mb-2">Office Hours</h3>
                            <p className="text-sm text-slate-600 font-medium">
                                Mon - Fri: 9:00 AM - 4:00 PM
                            </p>
                        </div>

                        {/* Info Card 3 */}
                        <div className="glass-card-dark rounded-2xl p-6 hover-lift">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-4">
                                <Zap className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">Quick Response</h3>
                            <p className="text-sm text-slate-300 font-medium">
                                Usually within 24-48 hours
                            </p>
                        </div>
                    </motion.div>

                    {/* Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="lg:col-span-2"
                    >
                        {status === 'success' ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="glass-card rounded-3xl p-12 text-center h-full flex flex-col items-center justify-center"
                            >
                                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center mb-6">
                                    <CheckCircle2 size={40} className="text-white" />
                                </div>
                                <h3 className="text-3xl font-black text-slate-800 mb-3">Message Sent!</h3>
                                <p className="text-slate-600 font-medium text-lg">
                                    Thank you for reaching out. I'll get back to you soon.
                                </p>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="glass-card rounded-3xl p-8 space-y-6">
                                {status === 'error' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 font-semibold"
                                    >
                                        <AlertCircle size={20} />
                                        Something went wrong. Please try again.
                                    </motion.div>
                                )}

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-600 uppercase tracking-wider ml-1">
                                            Name
                                        </label>
                                        <input
                                            required
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            type="text"
                                            placeholder="Your full name"
                                            className="w-full px-5 py-4 bg-white/50 border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none transition-all font-medium text-sm rounded-xl"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-600 uppercase tracking-wider ml-1">
                                            Email
                                        </label>
                                        <input
                                            required
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            type="email"
                                            placeholder="hello@example.com"
                                            className="w-full px-5 py-4 bg-white/50 border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none transition-all font-medium text-sm rounded-xl"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-600 uppercase tracking-wider ml-1">
                                            Subject
                                        </label>
                                        <input
                                            required
                                            id="subject"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            type="text"
                                            placeholder="Brief overview"
                                            className="w-full px-5 py-4 bg-white/50 border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none transition-all font-medium text-sm rounded-xl"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-600 uppercase tracking-wider ml-1">
                                            Purpose
                                        </label>
                                        <select
                                            required
                                            id="purpose"
                                            name="purpose"
                                            value={formData.purpose}
                                            onChange={handleChange}
                                            className="w-full px-5 py-4 bg-white/50 border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none transition-all font-medium text-sm rounded-xl appearance-none cursor-pointer"
                                        >
                                            <option value="">Select a purpose</option>
                                            <option value="Academic Query">Academic Query</option>
                                            <option value="Research Collaboration">Research Collaboration</option>
                                            <option value="Student Guidance">Student Guidance</option>
                                            <option value="Conference/Journal">Conference/Journal</option>
                                            <option value="Administrative">Administrative</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider ml-1">
                                        Message
                                    </label>
                                    <textarea
                                        required
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows={5}
                                        placeholder="How can I help you?"
                                        className="w-full px-5 py-4 bg-white/50 border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none transition-all font-medium text-sm rounded-xl resize-none"
                                    ></textarea>
                                </div>

                                <div className="flex items-start gap-3">
                                    <input
                                        required
                                        id="consent"
                                        name="consent"
                                        checked={formData.consent}
                                        onChange={handleChange}
                                        type="checkbox"
                                        className="mt-1 w-5 h-5 rounded-md accent-sky-600 cursor-pointer"
                                    />
                                    <label htmlFor="consent" className="text-sm font-medium text-slate-600 cursor-pointer select-none">
                                        I agree to be contacted for academic purposes and research discussions.
                                    </label>
                                </div>

                                <motion.button
                                    disabled={status === 'submitting'}
                                    type="submit"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full btn-premium px-8 py-5 rounded-xl text-white font-bold text-base disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                                >
                                    {status === 'submitting' ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            Send Message
                                            <Send size={18} />
                                        </>
                                    )}
                                </motion.button>
                            </form>
                        )}
                    </motion.div>
                </div>
            </div >
        </section >
    );
};
