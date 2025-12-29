import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, BookOpen, FileText, Newspaper, Lightbulb } from 'lucide-react';

interface ResearchPublicationsProps {
    journalPublications: Record<string, string>[];
    conferencePublications: Record<string, string>[];
    books: Record<string, string>[];
    researchProjects: Record<string, string>[];
}

const isValidUrl = (string: string) => {
    if (!string) return false;
    try {
        new URL(string);
        return string.startsWith('http');
    } catch (_) {
        return false;
    }
};

const SubSection: React.FC<{
    title: string;
    icon: React.ReactNode;
    rows: Record<string, string>[];
    color: string;
}> = ({ title, icon, rows, color }) => {
    if (!rows || rows.length === 0) return null;

    const validRows = rows.filter(r => Object.values(r).some(v => v));
    if (validRows.length === 0) return null;

    const columns = Object.keys(validRows[0]);

    return (
        <div className="mb-12">
            {/* Subsection Header */}
            <div className="flex items-center gap-3 mb-6">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center`}>
                    {icon}
                </div>
                <h3 className="text-2xl font-black text-slate-800">{title}</h3>
                <div className="flex-1 h-px bg-gradient-to-r from-slate-200 to-transparent"></div>
                <span className="text-sm font-bold text-slate-400">{validRows.length} {validRows.length === 1 ? 'item' : 'items'}</span>
            </div>

            {/* Desktop Table */}
            <div className="hidden lg:block">
                <div className="glass-card rounded-3xl overflow-hidden">
                    <div className="overflow-x-auto custom-scrollbar">
                        <table className="w-full">
                            <thead>
                                <tr className={`bg-gradient-to-r ${color} text-white`}>
                                    {columns.map((col) => (
                                        <th key={col} className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">
                                            {col}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {validRows.map((row, idx) => (
                                    <motion.tr
                                        key={idx}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: idx * 0.05 }}
                                        viewport={{ once: true }}
                                        className="group hover:bg-white/50 transition-all duration-300"
                                    >
                                        {columns.map((col) => {
                                            const val = row[col];
                                            return (
                                                <td key={col} className="px-6 py-5 text-sm text-slate-700 font-medium">
                                                    {isValidUrl(val) ? (
                                                        <a
                                                            href={val}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className={`inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${color} text-white rounded-xl font-semibold text-xs hover:shadow-lg hover:scale-105 transition-all duration-300`}
                                                        >
                                                            View Link
                                                            <ExternalLink size={14} />
                                                        </a>
                                                    ) : (
                                                        <span className="line-clamp-3">{val}</span>
                                                    )}
                                                </td>
                                            );
                                        })}
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Mobile/Tablet Cards */}
            <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-6">
                {validRows.map((row, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: idx * 0.05 }}
                        viewport={{ once: true }}
                        className="glass-card rounded-2xl p-6 hover-lift space-y-4"
                    >
                        {/* Card Header with Index */}
                        <div className="flex items-center justify-between mb-4">
                            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center`}>
                                <span className="text-white font-bold text-sm">{idx + 1}</span>
                            </div>
                        </div>

                        {/* Card Content */}
                        {columns.map((col) => {
                            const val = row[col];
                            if (!val) return null;
                            return (
                                <div key={col} className="space-y-1">
                                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                                        {col}
                                    </div>
                                    <div className="text-sm font-semibold text-slate-700">
                                        {isValidUrl(val) ? (
                                            <a
                                                href={val}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={`inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${color} text-white rounded-xl font-semibold text-xs hover:shadow-lg hover:scale-105 transition-all duration-300 mt-2`}
                                            >
                                                Open Link
                                                <ExternalLink size={14} />
                                            </a>
                                        ) : (
                                            <span className="line-clamp-4">{val}</span>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export const ResearchPublications: React.FC<ResearchPublicationsProps> = ({
    journalPublications,
    conferencePublications,
    books,
    researchProjects
}) => {
    // Check if there's any data
    const hasData = [journalPublications, conferencePublications, books, researchProjects]
        .some(arr => arr && arr.length > 0 && arr.some(r => Object.values(r).some(v => v)));

    if (!hasData) return null;

    return (
        <section id="researchPublications" className="py-20 scroll-mt-24">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true, margin: "-100px" }}
            >
                {/* Main Section Header */}
                <div className="flex flex-col mb-12">
                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: '4rem' }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="h-1.5 bg-gradient-to-r from-sky-600 to-blue-600 rounded-full mb-4"
                    />
                    <h2 className="text-3xl md:text-5xl font-black text-slate-800 mb-2">
                        Research & Publications
                    </h2>
                    <p className="text-slate-500 font-medium">Explore my research contributions and publications</p>
                </div>

                {/* Subsections */}
                <div className="space-y-12">
                    <SubSection
                        title="Research Projects"
                        icon={<Lightbulb className="w-6 h-6 text-white" />}
                        rows={researchProjects}
                        color="from-amber-500 to-orange-600"
                    />

                    <SubSection
                        title="Journal Publications"
                        icon={<FileText className="w-6 h-6 text-white" />}
                        rows={journalPublications}
                        color="from-sky-500 to-blue-600"
                    />

                    <SubSection
                        title="Conference Publications"
                        icon={<Newspaper className="w-6 h-6 text-white" />}
                        rows={conferencePublications}
                        color="from-blue-500 to-indigo-600"
                    />

                    <SubSection
                        title="Books Published"
                        icon={<BookOpen className="w-6 h-6 text-white" />}
                        rows={books}
                        color="from-indigo-500 to-purple-600"
                    />
                </div>
            </motion.div>
        </section>
    );
};
