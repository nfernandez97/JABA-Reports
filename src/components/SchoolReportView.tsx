import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Download, Share2, Calendar, Menu, X, ChevronRight } from 'lucide-react';
import { SchoolConfig } from '../data/schoolConfig';
import { format } from 'date-fns';
import { ExecutiveSummary } from './ExecutiveSummary';
import { NetworkDashboard } from './NetworkDashboard';
import { ConferenceDistribution } from './ConferenceDistribution';
import { IPImpactAnalysis } from './IPImpactAnalysis';
import { SchoolPartnersGrid } from './SchoolPartnersGrid';
import { ActiveCampaigns } from './ActiveCampaigns';
import { BrandExpansionOpportunities } from './BrandExpansionOpportunities';
import { QualifiedBrandsByRegion } from './QualifiedBrandsByRegion';
import { PLAYFLY_MAX_PARTNERS } from '../data/playflyNetworkData';

interface SchoolReportViewProps {
  school: SchoolConfig;
  onBack: () => void;
}

export function SchoolReportView({ school, onBack }: SchoolReportViewProps) {
  const reportDate = format(new Date(), 'MMMM dd, yyyy');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('executive-summary');

  const sectionRefs = {
    'executive-summary': useRef<HTMLDivElement>(null),
    'network-overview': useRef<HTMLDivElement>(null),
    'performance-analytics': useRef<HTMLDivElement>(null),
    'campaigns-partnerships': useRef<HTMLDivElement>(null),
    'brand-opportunities': useRef<HTMLDivElement>(null),
    'partner-schools': useRef<HTMLDivElement>(null),
  };

  const navigationItems = [
    { id: 'executive-summary', label: 'Executive Summary', icon: '📊' },
    { id: 'network-overview', label: 'Network Overview', icon: '🌐' },
    { id: 'performance-analytics', label: 'Performance Analytics', icon: '📈' },
    { id: 'campaigns-partnerships', label: 'Campaigns & Partnerships', icon: '🤝' },
    { id: 'brand-opportunities', label: 'Brand Opportunities', icon: '💼' },
    { id: 'partner-schools', label: 'Partner Schools', icon: '🏫' },
  ];

  const scrollToSection = (sectionId: string) => {
    const ref = sectionRefs[sectionId as keyof typeof sectionRefs];
    if (ref.current) {
      const yOffset = -100;
      const y = ref.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setActiveSection(sectionId);
      setIsSidebarOpen(false);
    }
  };

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150;

      for (const [id, ref] of Object.entries(sectionRefs)) {
        if (ref.current) {
          const { offsetTop, offsetHeight } = ref.current;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Branded Color Bar */}
      <div className="h-2" style={{ backgroundColor: school.primaryColor }} />

      {/* Header */}
      <div className="border-b border-gray-200 bg-white sticky top-0 z-50 shadow-sm">
        <div className="max-w-[1600px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>

              <button
                onClick={onBack}
                className="p-2 rounded-lg bg-gray-50 border border-gray-200 hover:bg-gray-100 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-black" />
              </button>

              {/* School Logo & Name */}
              <div className="flex items-center gap-4">
                {school.logoUrl && (
                  <div className="w-12 h-12 rounded-lg bg-gray-100 border border-gray-300 flex items-center justify-center">
                    <img
                      src={school.logoUrl}
                      alt={school.name}
                      className="w-full h-full object-contain rounded-lg"
                    />
                  </div>
                )}
                <div>
                  <h1 className="text-2xl font-bold text-black tracking-wide">
                    {school.shortName.toUpperCase()} REPORT
                  </h1>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>{school.mascot}</span>
                    <span>•</span>
                    <span>{school.conference}</span>
                    <span>•</span>
                    <span>{reportDate}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <button className="px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 hover:bg-gray-100 transition-colors text-black text-sm flex items-center gap-2">
                <Share2 className="w-4 h-4" />
                <span className="hidden sm:inline">Share</span>
              </button>
              <button
                className="px-4 py-2 rounded-lg text-white font-semibold text-sm flex items-center gap-2 transition-all hover:opacity-90"
                style={{ backgroundColor: school.primaryColor }}
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Export PDF</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex max-w-[1600px] mx-auto">
        {/* Sidebar Navigation */}
        <aside
          className={`
            fixed lg:sticky top-[73px] left-0 h-[calc(100vh-73px)] w-64 bg-white border-r border-gray-200 overflow-y-auto z-40
            transition-transform duration-300 lg:translate-x-0
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          `}
        >
          <nav className="p-4 space-y-1">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200
                  ${
                    activeSection === item.id
                      ? 'bg-blue-50 text-blue-900 font-semibold border-l-4 border-blue-600'
                      : 'text-gray-700 hover:bg-gray-50 border-l-4 border-transparent'
                  }
                `}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="text-sm">{item.label}</span>
                {activeSection === item.id && <ChevronRight className="w-4 h-4 ml-auto" />}
              </button>
            ))}
          </nav>
        </aside>

        {/* Mobile Overlay */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 px-6 py-8 lg:px-12">
          {/* School Info Banner */}
          <div
            className="rounded-2xl p-8 mb-8 border-l-4"
            style={{
              background: `linear-gradient(135deg, ${school.primaryColor}15 0%, ${school.secondaryColor}15 100%)`,
              borderLeftColor: school.primaryColor,
            }}
          >
            <h2 className="text-2xl font-bold text-black tracking-wide mb-2">
              {school.name}
            </h2>
            <p className="text-gray-700 text-lg">{school.location}</p>
          </div>

          {/* Executive Summary */}
          <section ref={sectionRefs['executive-summary']} className="mb-12">
            <ExecutiveSummary />
          </section>

          <div className="border-t border-gray-300 my-12" />

          {/* Network Overview */}
          <section ref={sectionRefs['network-overview']} className="mb-12">
            <NetworkDashboard />
          </section>

          <div className="border-t border-gray-300 my-12" />

          {/* Conference Distribution */}
          <section className="mb-12">
            <ConferenceDistribution />
          </section>

          <div className="border-t border-gray-300 my-12" />

          {/* Performance Analytics */}
          <section ref={sectionRefs['performance-analytics']} className="mb-12">
            <IPImpactAnalysis />
          </section>

          <div className="border-t border-gray-300 my-12" />

          {/* Campaigns & Partnerships */}
          <section ref={sectionRefs['campaigns-partnerships']} className="mb-12">
            <ActiveCampaigns />
          </section>

          <div className="border-t border-gray-300 my-12" />

          {/* Brand Opportunities */}
          <section ref={sectionRefs['brand-opportunities']} className="mb-12 space-y-12">
            <BrandExpansionOpportunities />
            <QualifiedBrandsByRegion />
          </section>

          <div className="border-t border-gray-300 my-12" />

          {/* Partner Schools */}
          <section ref={sectionRefs['partner-schools']} className="mb-12">
            <SchoolPartnersGrid partners={PLAYFLY_MAX_PARTNERS} />
          </section>

          {/* Footer */}
          <footer className="mt-16 pt-8 border-t border-gray-300">
            <div className="text-center space-y-2">
              <div className="text-sm font-semibold text-gray-900">
                {school.name} - Playfly Sports Report
              </div>
              <div className="text-xs text-gray-600">
                Generated: {format(new Date(), 'MMMM dd, yyyy - h:mm a')}
              </div>
              <div className="text-xs text-gray-500 mt-4">
                This report contains confidential and proprietary information. Distribution outside of intended recipients is prohibited.
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
