import { usePortfolioData } from './hooks/usePortfolioData';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Section } from './components/Section';
import { ResearchPublications } from './components/ResearchPublications';
import { Contact } from './components/Contact';
import { SECTION_TITLES } from './config/sheets';
import { Loader2, AlertCircle } from 'lucide-react';

function App() {
  const { data, loading, error } = usePortfolioData();

  const getBasicInfoValue = (keys: string[]) => {
    const info = data.basicInfo?.[0];
    if (!info) return '';
    for (const key of keys) {
      if (info[key]) return info[key];
      const foundKey = Object.keys(info).find(k => k.toLowerCase() === key.toLowerCase());
      if (foundKey && info[foundKey]) return info[foundKey];
    }
    return '';
  };

  if (loading) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center mesh-gradient gap-6 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-sky-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
        <div className="relative z-10 glass-card rounded-3xl p-12 flex flex-col items-center gap-6">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-sky-600 to-blue-600 rounded-full blur opacity-50 animate-pulse"></div>
            <Loader2 className="relative animate-spin w-16 h-16 text-sky-600" />
          </div>
          <p className="text-slate-700 font-bold text-lg tracking-wide">Loading Portfolio...</p>
        </div>
      </div>
    );
  }

  if (error || !data.basicInfo || data.basicInfo.length === 0) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center mesh-gradient p-4 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-red-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        </div>
        <div className="relative z-10 glass-card rounded-3xl p-12 text-center max-w-md">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-black text-slate-800 mb-3">Unable to Load Portfolio</h1>
          <p className="text-slate-600 font-medium mb-8">
            We couldn't fetch the data from Google Sheets. Please check your internet connection or the sheet permissions.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="btn-premium px-8 py-4 rounded-xl text-white font-bold"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const validSections = (Object.keys(SECTION_TITLES) as (keyof typeof SECTION_TITLES)[])
    .filter(key => {
      const rows = data[key];
      if (key === 'basicInfo') return true;
      return rows && rows.length > 0 && rows.some(r => Object.values(r).some(v => v));
    });

  const sectionsToRender = validSections.filter(k =>
    k !== 'basicInfo' &&
    k !== 'contactMe' &&
    k !== 'journalPublications' &&
    k !== 'conferencePublications' &&
    k !== 'books' &&
    k !== 'researchProjects'
  );

  const aboutText = getBasicInfoValue(['About', 'about', 'Bio', 'Summary', 'Description']);
  const fullName = getBasicInfoValue(['Full Name', 'Name']);
  const designation = getBasicInfoValue(['Designation', 'Role', 'Rank']);
  const department = getBasicInfoValue(['Department', 'Dept']);

  return (
    <div className="min-h-screen scroll-smooth">
      <Navbar />

      <main className="transition-all duration-300">
        <Hero
          data={data.basicInfo[0]}
          publicationStats={{
            journals: data.journalPublications?.length || 0,
            conferences: data.conferencePublications?.length || 0,
            books: data.books?.length || 0
          }}
          socialLinks={{
            mail: data.contactMe?.[0]?.['mail'] || data.contactMe?.[0]?.['Mail'] || data.contactMe?.[0]?.['MAIL'],
            github: data.contactMe?.[0]?.['github'] || data.contactMe?.[0]?.['Github'] || data.contactMe?.[0]?.['GITHUB'],
            linkedin: data.contactMe?.[0]?.['linkedin'] || data.contactMe?.[0]?.['Linkedin'] || data.contactMe?.[0]?.['LinkedIn'] || data.contactMe?.[0]?.['LinkedIn ']
          }}
        />

        {/* About Section */}
        {aboutText && (
          <section id="about" className="container mx-auto px-6 pt-12 -mb-8 relative z-20 scroll-mt-24">
            <div className="glass-card p-8 md:p-10 rounded-3xl max-w-6xl mx-auto shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-8 w-1.5 bg-gradient-to-b from-sky-500 to-blue-600 rounded-full"></div>
                <h2 className="text-2xl md:text-3xl font-black text-slate-800">About</h2>
              </div>
              <p className="text-slate-600 leading-relaxed text-base md:text-lg font-medium">
                {aboutText}
              </p>
            </div>
          </section>
        )}

        <div className="container mx-auto px-6 py-20 space-y-16">
          {sectionsToRender.map(key => (
            <Section
              key={key}
              id={key}
              title={SECTION_TITLES[key]}
              rows={data[key]!}
            />
          ))}

          {/* Combined Research & Publications Section */}
          <ResearchPublications
            journalPublications={data.journalPublications || []}
            conferencePublications={data.conferencePublications || []}
            books={data.books || []}
            researchProjects={data.researchProjects || []}
          />

          <Contact email={data.contactMe?.[0]?.['mail'] || data.contactMe?.[0]?.['Mail'] || data.contactMe?.[0]?.['MAIL'] || getBasicInfoValue(['Official Email', 'Email'])} />
        </div>

        <footer className="relative py-16 overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900"></div>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-sky-500 rounded-full filter blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 container mx-auto px-6 text-center">
            <div className="mb-6">
              <h3 className="text-2xl font-black text-white mb-2">
                {fullName}
              </h3>
              <p className="text-slate-300 font-medium">
                {designation} {department ? `• ${department}` : ''}
              </p>
            </div>
            <div className="h-px w-32 bg-gradient-to-r from-transparent via-sky-500 to-transparent mx-auto mb-6"></div>
            <p className="text-slate-400 font-medium text-sm">
              © {new Date().getFullYear()} All rights reserved.
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default App;
