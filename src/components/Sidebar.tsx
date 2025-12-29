import React, { useState } from 'react';
import { Menu, X, User, BookOpen, Award, Briefcase, FileText, Share2 } from 'lucide-react';
import { SECTION_TITLES } from '../config/sheets';

interface SidebarProps {
    activeSections: string[];
}

export const Sidebar: React.FC<SidebarProps> = ({ activeSections }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    const getIcon = (key: string) => {
        switch (key) {
            case 'basicInfo': return <User size={18} />;
            case 'qualifications': return <BookOpen size={18} />;
            case 'teaching':
            case 'courses':
            case 'mentoring': return <BookOpen size={18} />;
            case 'journalPublications':
            case 'conferencePublications': return <FileText size={18} />;
            case 'researchProjects':
            case 'patents': return <Briefcase size={18} />;
            case 'skills': return <Award size={18} />; // Fallback
            case 'awards': return <Award size={18} />;
            default: return <Share2 size={18} />;
        }
    };

    // Prevent scroll when mobile menu is open
    React.useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    return (
        <>
            <button
                onClick={toggle}
                className="fixed top-4 right-4 z-50 p-2 bg-slate-900 text-white rounded-md md:hidden shadow-lg transition-transform hover:scale-105"
                aria-label="Toggle Menu"
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-slate-900/50 z-30 md:hidden backdrop-blur-sm"
                    onClick={() => setIsOpen(false)}
                />
            )}

            <aside className={`
        fixed top-0 left-0 h-full w-72 bg-white border-r border-slate-200 z-40 transform transition-transform duration-300 ease-out overflow-y-auto no-scrollbar
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 shadow-2xl md:shadow-none
      `}>
                <div className="p-8 pb-32">
                    <div className="mb-10 flex items-center gap-3 select-none">
                        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-indigo-200 shadow-lg">P</div>
                        <span className="text-xl font-bold text-slate-900 tracking-tight">Portfolio</span>
                    </div>

                    <nav className="space-y-1">
                        {activeSections.map((key) => (
                            <a
                                key={key}
                                href={`#${key}`}
                                onClick={() => setIsOpen(false)}
                                className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-500 rounded-xl hover:bg-slate-50 hover:text-indigo-600 transition-all group active:scale-95"
                            >
                                <span className="text-slate-400 group-hover:text-indigo-600 transition-colors">
                                    {getIcon(key)}
                                </span>
                                <span className="truncate">{SECTION_TITLES[key as keyof typeof SECTION_TITLES]}</span>
                            </a>
                        ))}
                    </nav>
                </div>
            </aside>
        </>
    );
};
