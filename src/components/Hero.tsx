import React, { useState } from 'react';
import { Mail, Github, Linkedin, User as UserIcon, BookOpen, FileText, Newspaper, Building2, IdCard, Phone, GraduationCap, Library, Link as LinkIcon, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface HeroProps {
    data: Record<string, string>;
    publicationStats?: {
        journals: number;
        conferences: number;
        books: number;
    };
    socialLinks?: {
        mail?: string;
        github?: string;
        linkedin?: string;
    };
}

export const Hero: React.FC<HeroProps> = ({ data, publicationStats, socialLinks }) => {
    const [activePage, setActivePage] = useState(0);

    const getEntry = (keys: string[]) => {
        for (const key of keys) {
            if (data[key]) return { key, value: data[key] };
            const foundKey = Object.keys(data).find(k => k.toLowerCase() === key.toLowerCase());
            if (foundKey && data[foundKey]) return { key: foundKey, value: data[foundKey] };
        }
        return { key: keys[0], value: '' };
    };

    const nameEntry = getEntry(['Full Name', 'Name']);
    const designationEntry = getEntry(['Designation', 'Role', 'Rank']);
    const deptEntry = getEntry(['Department', 'Dept']);
    const institutionEntry = getEntry(['Institution Name', 'Institution', 'College']);
    const employeeIdEntry = getEntry(['Employee ID', 'ID', 'Emp ID']);
    const officialEmailEntry = getEntry(['Official Email', 'Email', 'Mail']);
    const phoneEntry = getEntry(['Phone Number', 'Phone', 'Mobile']);
    const orcidEntry = getEntry(['ORCID ID', 'orcid id', 'ORCID', 'ORC Id']);
    const scholarEntry = getEntry(['Google Scholar Link', 'google scholar', 'Google Scholar', 'Scholar']);
    const scopusEntry = getEntry(['Scopus Link', 'scopus', 'Scopus ID', 'Scopus']);

    const name = nameEntry.value || 'Faculty Member';
    const designation = designationEntry.value || 'Designation';
    const dept = deptEntry.value || '';
    const institution = institutionEntry.value;
    const employeeId = employeeIdEntry.value;
    const officialEmail = officialEmailEntry.value;
    const phone = phoneEntry.value;
    const orcidId = orcidEntry.value;
    const scholarLink = scholarEntry.value;
    const scopusLink = scopusEntry.value;

    // Social links from data if not provided via props
    const githubLinkRaw = socialLinks?.github || getEntry(['Github', 'GitHub Link', 'GitHub']).value;
    const linkedinLinkRaw = socialLinks?.linkedin || getEntry(['Linkedin', 'LinkedIn Link', 'LinkedIn']).value;

    const ensureProtocol = (link: string) => {
        if (!link || link === '#' || link === '') return '#';
        if (link.startsWith('http://') || link.startsWith('https://')) return link;
        return `https://${link}`;
    };

    // For hrefs
    const githubLink = ensureProtocol(githubLinkRaw);
    const linkedinLink = ensureProtocol(linkedinLinkRaw);
    const orcidLink = orcidId ? (orcidId.startsWith('http') ? orcidId : `https://orcid.org/${orcidId}`) : '#';
    const scholarUrl = ensureProtocol(scholarLink);
    const scopusUrl = ensureProtocol(scopusLink);

    const handledKeys = [
        'Full Name', 'Name', 'Designation', 'Role', 'Department', 'Dept',
        'Institution Name', 'Institution', 'College', 'Employee ID', 'ID', 'Emp ID',
        'Official Email', 'Email', 'Mail', 'Phone Number', 'Phone', 'Mobile',
        'ORCID ID', 'orcid id', 'ORCID', 'ORC Id', 'Google Scholar Link', 'google scholar',
        'Google Scholar', 'Scholar', 'Scopus Link', 'scopus', 'Scopus ID', 'Scopus', 'scopus ',
        'Profile Photo Link', 'About', 'about', 'Bio', 'Github', 'GitHub Link', 'GitHub',
        'Linkedin', 'LinkedIn Link', 'LinkedIn'
    ].map(k => k.toLowerCase());

    const otherColumns = Object.entries(data).filter(([key, value]) => {
        return value && !handledKeys.includes(key.toLowerCase()) && key.trim() !== '';
    });

    const getPhotoUrl = (url: string) => {
        if (!url) return '';

        // Handle various Google Drive URL formats
        if (url.includes('drive.google.com')) {
            let id = '';
            // Match /d/ID or /file/d/ID
            const dMatch = url.match(/\/d\/([a-zA-Z0-9_-]{25,})/);
            // Match id=ID
            const idMatch = url.match(/[?&]id=([a-zA-Z0-9_-]{25,})/);

            if (dMatch && dMatch[1]) id = dMatch[1];
            else if (idMatch && idMatch[1]) id = idMatch[1];

            if (id) {
                // This is the most reliable "hotlink" format for Google Drive photos
                return `https://drive.google.com/thumbnail?id=${id}&sz=w1000`;
            }
        }
        return url;
    };

    const formatKey = (key: string) => key.trim().replace(/:$/, '');

    const orcidLabel = formatKey(orcidEntry.key);
    const scholarLabel = formatKey(scholarEntry.key);
    const scopusLabel = formatKey(scopusEntry.key);
    const photo = getPhotoUrl(data['Profile Photo Link']);

    const stats = publicationStats ? [
        { label: 'Journals', value: publicationStats.journals, icon: <FileText size={24} />, color: '#064e3b' },
        { label: 'Conferences', value: publicationStats.conferences, icon: <Newspaper size={24} />, color: '#065f46' },
        { label: 'Books Published', value: publicationStats.books, icon: <BookOpen size={24} />, color: '#047857' }
    ] : [];

    const handleNextPage = () => {
        setActivePage((prev) => (prev + 1) % stats.length);
    };

    return (
        <section id="basicInfo" className="min-h-screen relative flex flex-col md:flex-row items-center overflow-hidden bg-[#ecfdf5]">
            {/* Theme Background Shape - The 'Curve' */}
            <div className="absolute top-0 left-0 w-full md:w-[45%] h-full bg-[#d1fae5] rounded-br-[100px] md:rounded-br-[200px] z-0"></div>

            {/* Content Container */}
            <div className="relative z-10 w-full container mx-auto px-6 py-20 md:py-32 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                {/* Left Content Column */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex flex-col space-y-8 md:pr-10 md:pl-12 md:-translate-y-10 items-start"
                >
                    {/* Greeting */}
                    <motion.h3
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-lg md:text-xl font-medium text-slate-600 tracking-wide"
                    >
                        Hello, I'm
                    </motion.h3>

                    {/* Name - Single Line */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight truncate text-[#064e3b]"
                    >
                        {name}
                    </motion.h1>

                    {/* Designation */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="space-y-2"
                    >
                        <p className="text-xl md:text-2xl font-bold text-slate-700">
                            {designation}
                        </p>
                        <p className="text-lg text-slate-500 font-medium font-serif italic">
                            {dept}
                        </p>
                    </motion.div>

                    {/* Additional Info */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.52 }}
                        className="space-y-3 text-slate-600 font-medium text-15 md:text-base mt-4"
                    >
                        {institution && (
                            <div className="flex items-center gap-3">
                                <Building2 size={18} className="text-[#10b981] shrink-0" />
                                <span className="text-slate-700">{institution}</span>
                            </div>
                        )}
                        {employeeId && (
                            <div className="flex items-center gap-3">
                                <IdCard size={18} className="text-[#10b981] shrink-0" />
                                <span className="text-slate-700">ID: {employeeId}</span>
                            </div>
                        )}
                        {officialEmail && (
                            <div className="flex items-center gap-3">
                                <Mail size={18} className="text-[#10b981] shrink-0" />
                                <span className="text-slate-700">{officialEmail}</span>
                            </div>
                        )}
                        {phone && (
                            <div className="flex items-center gap-3">
                                <Phone size={18} className="text-[#10b981] shrink-0" />
                                <span className="text-slate-700">{phone}</span>
                            </div>
                        )}
                        {/* Professional Profiles */}
                        {orcidLink !== '#' && (
                            <div className="flex items-center gap-3">
                                <LinkIcon size={18} className="text-[#10b981] shrink-0" />
                                <a href={orcidLink} target="_blank" rel="noopener noreferrer" className="text-slate-700 hover:text-[#10b981] transition-colors flex items-center gap-2">
                                    <span className="font-bold text-slate-500 text-sm uppercase tracking-wider">{orcidLabel}:</span>
                                    {orcidId}
                                </a>
                            </div>
                        )}
                        {scholarUrl !== '#' && (
                            <div className="flex items-center gap-3">
                                <GraduationCap size={18} className="text-[#10b981] shrink-0" />
                                <a href={scholarUrl} target="_blank" rel="noopener noreferrer" className="text-slate-700 hover:text-[#10b981] transition-colors flex items-center gap-2">
                                    <span className="font-bold text-slate-500 text-sm uppercase tracking-wider">{scholarLabel}:</span>
                                    <span className="text-sm">View Profile</span>
                                </a>
                            </div>
                        )}
                        {scopusUrl !== '#' && (
                            <div className="flex items-center gap-3">
                                <Library size={18} className="text-[#10b981] shrink-0" />
                                <a href={scopusUrl} target="_blank" rel="noopener noreferrer" className="text-slate-700 hover:text-[#10b981] transition-colors flex items-center gap-2">
                                    <span className="font-bold text-slate-500 text-sm uppercase tracking-wider">{scopusLabel}:</span>
                                    <span className="text-sm">View Profile</span>
                                </a>
                            </div>
                        )}
                        {/* Dynamic Extra Columns */}
                        {otherColumns.map(([key, value]) => (
                            <div key={key} className="flex items-center gap-3">
                                <div className="w-4.5 h-4.5 text-[#10b981] shrink-0 flex items-center justify-center">
                                    <span className="text-[10px] font-bold border border-[#10b981] rounded px-1">{key.substring(0, 2).toUpperCase()}</span>
                                </div>
                                <span className="text-slate-700"><span className="font-bold text-slate-500">{key}:</span> {value}</span>
                            </div>
                        ))}
                    </motion.div>

                    {/* Social Icons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="flex flex-wrap gap-4"
                    >
                        {[
                            { icon: <Mail size={20} />, href: '#contact', color: 'bg-[#10b981]' },
                            { icon: <Github size={20} />, href: githubLink, color: 'bg-slate-700', show: githubLink !== '#' },
                            { icon: <Linkedin size={20} />, href: linkedinLink, color: 'bg-[#0077b5]', show: linkedinLink !== '#' },
                        ].map((social, i) => (
                            (social.show === undefined || social.show) && (
                                <a
                                    key={i}
                                    href={social.href}
                                    target={social.href.startsWith('http') ? "_blank" : undefined}
                                    rel={social.href.startsWith('http') ? "noopener noreferrer" : undefined}
                                    className="group relative w-12 h-12 rounded-full border border-slate-300 flex items-center justify-center text-slate-600 hover:text-white transition-all duration-300 hover:border-transparent hover:-translate-y-1 overflow-hidden"
                                >
                                    <div className={`absolute inset-0 ${social.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                                    <span className="relative z-10">{social.icon}</span>
                                </a>
                            )
                        ))}
                    </motion.div>

                    {/* CTA Button */}
                    <motion.a
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        href="#contact"
                        className="btn-premium px-6 py-4 rounded-full text-white font-bold text-lg w-fit shadow-md hover:shadow-lg bg-[#10b981] mr-auto"
                    >
                        Let's Connect
                    </motion.a>
                </motion.div>

                {/* Right Column - Workstation Setup */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    className="flex justify-center md:self-center md:justify-end relative w-full"
                >
                    <div className="relative w-full max-w-[600px] h-[450px] flex items-end justify-center">

                        {/* The User - Sitting next to monitor (Profile Photo) */}
                        <div className="absolute left-0 md:-left-20 -top-16 z-20 transform translate-x-4 md:translate-x-0">
                            <div className="relative w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden border-[6px] border-white shadow-2xl bg-white">
                                {photo ? (
                                    <img
                                        src={photo}
                                        alt={name}
                                        className="w-full h-full object-contain object-center"
                                        referrerPolicy="no-referrer"
                                    />
                                ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center bg-slate-200 text-slate-500">
                                        <UserIcon size={48} className="opacity-50" />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Interactive Book Layout */}
                        <div className="relative z-10 w-full flex flex-col items-center md:translate-x-12 mb-10">
                            <div className="relative w-full max-w-[400px] h-[340px] flex items-center justify-center perspective-1000">

                                {stats.length > 0 && (
                                    <div className="relative w-full h-full flex items-center justify-center cursor-pointer" onClick={handleNextPage}>
                                        <AnimatePresence mode="popLayout">
                                            {stats.map((stat, i) => {
                                                // Calculate position based on activePage
                                                const isTop = (activePage === i);
                                                const isNext = ((activePage + 1) % stats.length === i);

                                                let zIndex = 0;
                                                let x = 0;
                                                let rotate = 0;
                                                let scale = 1;
                                                let opacity = 1;

                                                if (isTop) {
                                                    zIndex = 20;
                                                    x = 40;
                                                    rotate = -2;
                                                    scale = 1;
                                                } else if (isNext) {
                                                    zIndex = 10;
                                                    x = 30;
                                                    rotate = 2;
                                                    scale = 0.95;
                                                } else {
                                                    zIndex = 5;
                                                    x = 20;
                                                    rotate = 5;
                                                    scale = 0.9;
                                                }

                                                return (
                                                    <motion.div
                                                        key={stat.label}
                                                        initial={{ x: 200, opacity: 0, rotate: -20 }}
                                                        animate={{
                                                            x,
                                                            zIndex,
                                                            rotate,
                                                            scale,
                                                            opacity
                                                        }}
                                                        exit={{
                                                            x: -150,
                                                            rotate: -45,
                                                            opacity: 0,
                                                            transition: { duration: 0.5 }
                                                        }}
                                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                                        className={`absolute w-52 h-64 bg-white rounded-r-2xl shadow-2xl border-l-[15px] border-[#064e3b]/5 p-6 flex flex-col items-center justify-center overflow-hidden`}
                                                    >
                                                        {/* Page Lines */}
                                                        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(#000 0, #000 1px, transparent 1px, transparent 20px)', backgroundPosition: '0 50px' }}></div>

                                                        <div className="relative z-10 flex flex-col items-center gap-2">
                                                            <span className="text-6xl font-serif font-black text-[#064e3b]">
                                                                {stat.value}
                                                            </span>
                                                            <div className="h-px w-12 bg-[#10b981]/30 my-2"></div>
                                                            <span className="text-xs font-black uppercase tracking-widest text-slate-500 text-center leading-relaxed">
                                                                {stat.label}
                                                            </span>
                                                        </div>

                                                        {/* Icon Watermark */}
                                                        <div className="absolute bottom-4 right-4 text-[#10b981] opacity-10">
                                                            {React.cloneElement(stat.icon as React.ReactElement<any>, { size: 32 })}
                                                        </div>

                                                        {/* "Click to flip" hint for top page */}
                                                        {isTop && (
                                                            <motion.div
                                                                animate={{ x: [0, 5, 0] }}
                                                                transition={{ repeat: Infinity, duration: 1.5 }}
                                                                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-300"
                                                            >
                                                                <ChevronRight size={20} />
                                                            </motion.div>
                                                        )}
                                                    </motion.div>
                                                );
                                            })}
                                        </AnimatePresence>

                                        {/* Click Interaction Overlay */}
                                        <div className="absolute inset-0 z-50"></div>
                                    </div>
                                )}
                            </div>

                        </div>

                    </div>
                </motion.div>
            </div>
        </section>
    );
};
