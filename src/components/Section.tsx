import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

interface SectionProps {
    id: string;
    title: string;
    rows: Record<string, string>[];
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

export const Section: React.FC<SectionProps> = ({ id, title, rows }) => {
    if (!rows || rows.length === 0) return null;

    const validRows = rows.filter(r => Object.values(r).some(v => v));
    if (validRows.length === 0) return null;

    const columns = Object.keys(validRows[0]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5
            }
        }
    };

    return (
        <section id={id} className="py-20 scroll-mt-24">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true, margin: "-100px" }}
            >
                {/* Section Header */}
                <div className="flex flex-col mb-12">
                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: '4rem' }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="h-1.5 bg-gradient-to-r from-sky-600 to-blue-600 rounded-full mb-4"
                    />
                    <h2 className="text-3xl md:text-5xl font-black text-slate-800 mb-2">
                        {title}
                    </h2>
                    <p className="text-slate-500 font-medium">Explore my {title.toLowerCase()}</p>
                </div>

                {/* Desktop Table */}
                <div className="hidden lg:block">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        className="glass-card rounded-3xl overflow-hidden"
                    >
                        <div className="overflow-x-auto custom-scrollbar">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-gradient-to-r from-sky-600 to-blue-600 text-white">
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
                                            variants={itemVariants}
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
                                                                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-sky-600 to-blue-600 text-white rounded-xl font-semibold text-xs hover:shadow-lg hover:scale-105 transition-all duration-300"
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
                    </motion.div>
                </div>

                {/* Mobile/Tablet Cards */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                    {validRows.map((row, idx) => (
                        <motion.div
                            key={idx}
                            variants={itemVariants}
                            className="glass-card rounded-2xl p-6 hover-lift space-y-4"
                        >
                            {/* Card Header with Index */}
                            <div className="flex items-center justify-between mb-4">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-600 to-blue-600 flex items-center justify-center">
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
                                                    className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-sky-600 to-blue-600 text-white rounded-xl font-semibold text-xs hover:shadow-lg hover:scale-105 transition-all duration-300 mt-2"
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
                </motion.div>
            </motion.div>
        </section>
    );
};
