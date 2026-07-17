import { Navbar } from '../components/Navbar';
import { HeroSection } from '../components/HeroSection';
import { ProblemSection } from '../components/ProblemSection';
import { SolutionSection } from '../components/SolutionSection';
import { HowItWorksSection } from '../components/HowItWorksSection';
import { StakeholdersSection } from '../components/StakeholdersSection';
import { ModulesSection } from '../components/ModulesSection';
import { DashboardPreviewSection } from '../components/DashboardPreviewSection';
import { ComplianceSection } from '../components/ComplianceSection';
import { ImpactSection } from '../components/ImpactSection';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { FounderSection } from '../components/FounderSection';
import { CTASection } from '../components/CTASection';
import { Footer } from '../components/Footer';
import { DriveVaultSection } from '../components/DriveVaultSection';
import { VolunteerSection } from '../components/VolunteerSection';
import { JourneySection } from '../components/JourneySection';
import { TermsSection } from '../components/TermsSection';
import { PrivacySection } from '../components/PrivacySection';
import { useNavigation } from '../context/NavigationContext';
import { motion, AnimatePresence } from 'motion/react';

export default function LandingPage() {
  const { activePage } = useNavigation();

  const renderActivePage = () => {
    switch (activePage) {
      case 'home':
        return (
          <motion.div
            key="home"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
          >
            <HeroSection />
            <ImpactSection />
            <DashboardPreviewSection />
            <TestimonialsSection />
          </motion.div>
        );
      case 'problem':
        return (
          <motion.div
            key="problem"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
            className="pt-16"
          >
            <ProblemSection />
          </motion.div>
        );
      case 'solution':
        return (
          <motion.div
            key="solution"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
            className="pt-16"
          >
            <SolutionSection />
            <ModulesSection />
            <DashboardPreviewSection />
          </motion.div>
        );
      case 'how-it-works':
        return (
          <motion.div
            key="how-it-works"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
            className="pt-16"
          >
            <HowItWorksSection />
            <StakeholdersSection />
          </motion.div>
        );
      case 'safety':
        return (
          <motion.div
            key="safety"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
            className="pt-16"
          >
            <ComplianceSection />
          </motion.div>
        );
      case 'leadership':
        return (
          <motion.div
            key="leadership"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
            className="pt-16"
          >
            <FounderSection />
          </motion.div>
        );
      case 'demo':
        return (
          <motion.div
            key="demo"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
            className="pt-16"
          >
            <CTASection />
          </motion.div>
        );
      case 'drive':
        return (
          <motion.div
            key="drive"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
            className="pt-16"
          >
            <DriveVaultSection />
          </motion.div>
        );
      case 'volunteer':
        return (
          <motion.div
            key="volunteer"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
            className="pt-16 animate-fade-in"
          >
            <VolunteerSection />
          </motion.div>
        );
      case 'journey':
        return (
          <motion.div
            key="journey"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
            className="pt-16 animate-fade-in"
          >
            <JourneySection />
          </motion.div>
        );
      case 'terms':
        return (
          <motion.div
            key="terms"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
            className="pt-16 animate-fade-in"
          >
            <TermsSection />
          </motion.div>
        );
      case 'privacy':
        return (
          <motion.div
            key="privacy"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
            className="pt-16 animate-fade-in"
          >
            <PrivacySection />
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 overflow-x-hidden selection:bg-red-500 selection:text-white">
      {/* Navigation Layer */}
      <Navbar />

      {/* Main Sections Body - Dynamic View Transition Router */}
      <main className="min-h-[75vh]">
        <AnimatePresence mode="wait">
          {renderActivePage()}
        </AnimatePresence>
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
