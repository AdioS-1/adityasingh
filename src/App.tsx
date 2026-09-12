import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SelectedWork } from './components/SelectedWork';
import { ProjectDetail } from './components/ProjectDetail';
import { About } from './components/About';
import { Services } from './components/Services';
import { Playbook } from './components/Playbook';
import { Tools } from './components/Tools';
import { PlaySection } from './components/PlaySection';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';
import { ProjectInquiryModal } from './components/ProjectInquiryModal';
import { Project } from './types';
import { PROJECTS } from './data/portfolioData';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState<boolean>(false);

  // Sync with browser URL hash for deep linking (e.g. #work/aura-kinetics)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash.startsWith('work/')) {
        const slug = hash.replace('work/', '');
        const found = PROJECTS.find((p) => p.slug === slug);
        if (found) {
          setSelectedProject(found);
          window.scrollTo(0, 0);
          return;
        }
      } else if (hash) {
        setSelectedProject(null);
        const el = document.getElementById(`${hash}-section`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Track active section on scroll
  useEffect(() => {
    if (selectedProject) return;

    const sections = ['hero', 'work', 'about', 'services', 'playbook', 'play', 'contact'];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 280;

      for (const sectionId of sections) {
        const el = document.getElementById(`${sectionId}-section`);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [selectedProject]);

  const handleNavigate = (sectionId: string) => {
    setSelectedProject(null);
    window.history.pushState(null, '', `#${sectionId}`);

    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const element = document.getElementById(`${sectionId}-section`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectProject = (project: Project) => {
    setSelectedProject(project);
    window.history.pushState(null, '', `#work/${project.slug}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToWork = () => {
    setSelectedProject(null);
    window.history.pushState(null, '', '#work');
    setTimeout(() => {
      const element = document.getElementById('work-section');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  return (
    <div className="relative min-h-screen bg-[#080B11] text-[#F4F4F2] selection:bg-[#FFA800] selection:text-[#080B11]">
      {/* Accessibility Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-[100] px-4 py-2 bg-[#FFA800] text-[#080B11] font-bold text-xs uppercase tracking-widest rounded-lg"
      >
        Skip to main content
      </a>

      {/* Tactile Noise / Film Grain Overlay */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* Award-Winning Custom Reactive Cursor */}
      <CustomCursor />

      {/* Global Minimal Fixed Navigation */}
      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenContact={() => setIsInquiryModalOpen(true)}
        isProjectDetailOpen={!!selectedProject}
        onBackToWork={handleBackToWork}
      />

      {/* Main Content Area */}
      <main id="main-content" tabIndex={-1}>
        {selectedProject ? (
          /* Dedicated Project Detail Case Study View */
          <ProjectDetail
            project={selectedProject}
            onBack={handleBackToWork}
            onSelectNextProject={handleSelectProject}
          />
        ) : (
          /* Comprehensive Editorial Studio View */
          <>
            {/* Hero Section */}
            <Hero onScrollToWork={() => handleNavigate('work')} />

            {/* 01. Selected Work Gallery */}
            <SelectedWork onSelectProject={handleSelectProject} />

            {/* 02. About & Ethos Section */}
            <About onOpenContact={() => setIsInquiryModalOpen(true)} />

            {/* 03. Disciplines / What I Do */}
            <Services />

            {/* 04. Playbook / 5-Step Methodology */}
            <Playbook />

            {/* 05. Technical Stack & Instrumentation */}
            <Tools />

            {/* 06. Experimental Playground & Reactive Canvas */}
            <PlaySection />

            {/* 07. Contact & Commissions */}
            <Contact onOpenInquiry={() => setIsInquiryModalOpen(true)} />
          </>
        )}
      </main>

      {/* Minimal Editorial Footer */}
      <Footer />

      {/* Project Inquiry Modal / Drawer */}
      <ProjectInquiryModal
        isOpen={isInquiryModalOpen}
        onClose={() => setIsInquiryModalOpen(false)}
      />
    </div>
  );
}
