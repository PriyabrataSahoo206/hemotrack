import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  ShieldCheck, 
  AlertTriangle, 
  Scale, 
  MapPin, 
  Mail, 
  Phone, 
  ArrowLeft, 
  Calendar, 
  UserCheck, 
  Shield, 
  Activity, 
  Building2, 
  Info,
  ExternalLink
} from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';
import { motion } from 'motion/react';

export function TermsSection() {
  const { navigateTo } = useNavigation();
  const [activeSection, setActiveSection] = useState<string>('sec-1');

  const sections = [
    { id: 'sec-1', label: '1. Acceptance of Terms' },
    { id: 'sec-2', label: '2. About HemoTrack' },
    { id: 'sec-3', label: '3. Eligibility & Use' },
    { id: 'sec-4', label: '4. User Roles & Access' },
    { id: 'sec-5', label: '5. User Responsibilities' },
    { id: 'sec-6', label: '6. Prohibited Activities' },
    { id: 'sec-7', label: '7. Institutional Responsibility' },
    { id: 'sec-8', label: '8. No Medical Advice' },
    { id: 'sec-9', label: '9. Data & Submitted Content' },
    { id: 'sec-10', label: '10. Platform Availability' },
    { id: 'sec-11', label: '11. Beta & Prototypes' },
    { id: 'sec-12', label: '12. Intellectual Property' },
    { id: 'sec-13', label: '13. Privacy & Data' },
    { id: 'sec-14', label: '14. Third-Party Services' },
    { id: 'sec-15', label: '15. Disclaimers' },
    { id: 'sec-16', label: '16. Limitation of Liability' },
    { id: 'sec-17', label: '17. Indemnity' },
    { id: 'sec-18', label: '18. Suspension & Termination' },
    { id: 'sec-19', label: '19. Governing Law' },
    { id: 'sec-20', label: '20. Grievances & Contact' },
    { id: 'sec-21', label: '21. Changes to Terms' },
    { id: 'sec-22', label: '22. Entire Understanding' },
    { id: 'sec-23', label: '23. Severability' },
    { id: 'sec-24', label: '24. Acknowledgment' },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of the sticky header/navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveSection(id);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120;
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="bg-slate-50 min-h-screen py-10 md:py-16 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb */}
        <div className="mb-8">
          <button 
            onClick={() => navigateTo('home')}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:text-red-600 hover:bg-slate-100 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>
        </div>

        {/* Hero Header */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 md:p-10 shadow-sm relative overflow-hidden mb-12">
          <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/5 rounded-full blur-2xl -ml-20 -mb-20"></div>

          <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-4 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-100 text-red-600 text-xs font-bold">
                <FileText className="w-3.5 h-3.5" />
                Legal Agreements
              </div>
              <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                Terms & Conditions <span className="text-red-500 font-extrabold">–</span> HemoTrack
              </h1>
              <p className="text-sm md:text-base text-slate-600 leading-relaxed">
                Please read these terms carefully. They govern access to and use of the HemoTrack coordination website, web applications, and services.
              </p>
              <div className="flex flex-wrap items-center gap-y-2 gap-x-6 pt-2 text-xs font-semibold text-slate-500">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  Effective Date: June 24, 2026
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  Last Updated: June 24, 2026
                </span>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center bg-slate-50 border border-slate-100 rounded-2xl p-5 shrink-0 text-center md:w-52">
              <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center shadow-md shadow-red-200 mb-2">
                <ShieldCheck className="text-white w-5.5 h-5.5" />
              </div>
              <span className="text-[10px] font-extrabold tracking-wider text-slate-400 uppercase">Verification Level</span>
              <span className="text-xs font-black text-slate-800 mt-0.5">Oversight-Ready v2.0</span>
            </div>
          </div>
        </div>

        {/* Critical Legal Disclaimer Alert Box */}
        <div className="bg-amber-50/50 border border-amber-200 rounded-2xl p-5 mb-12 flex flex-col sm:flex-row items-start gap-4">
          <div className="p-2 rounded-xl bg-amber-100 text-amber-700 shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-extrabold text-amber-800 uppercase tracking-wide">Critical Coordination Disclaimer</h4>
            <p className="text-xs md:text-sm text-amber-700 leading-relaxed">
              HemoTrack is a <strong>digital coordination and logistics support platform</strong>. It does not sell blood, provide clinical treatment/diagnosis, or substitute for licensed medical and transfusion decision-making. All clinical and operational actions must be verified independently by authorized healthcare personnel.
            </p>
          </div>
        </div>

        {/* 2-Column Desktop Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Sticky Table of Contents Sidebar */}
          <div className="lg:col-span-4 hidden lg:block">
            <div className="sticky top-24 bg-white border border-slate-200/80 rounded-2xl p-5 space-y-4 max-h-[calc(100vh-140px)] overflow-y-auto shadow-sm scrollbar-thin">
              <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider flex items-center gap-2">
                <Scale className="w-3.5 h-3.5 text-slate-400" />
                Agreement Index
              </h3>
              <div className="space-y-1">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-all flex items-center justify-between cursor-pointer ${
                      activeSection === section.id
                        ? 'bg-red-50 text-red-700 font-bold border-l-3 border-red-500 pl-2'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    <span>{section.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Detailed Prose Section */}
          <div className="lg:col-span-8 bg-white border border-slate-200/80 rounded-3xl p-6 md:p-10 space-y-12 shadow-sm">
            
            {/* Section 1 */}
            <div id="sec-1" className="scroll-mt-24 space-y-4 border-b border-slate-100 pb-8">
              <div className="flex items-center gap-2 text-slate-800 font-extrabold">
                <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center text-xs font-black">1</span>
                <h2 className="text-lg md:text-xl font-black text-slate-900">Acceptance of Terms</h2>
              </div>
              <div className="text-sm md:text-base text-slate-600 leading-relaxed space-y-3 pl-9">
                <p>
                  These Terms & Conditions (“<strong>Terms</strong>”) govern access to and use of the HemoTrack website, web application, dashboards, services, and related features (collectively, the “<strong>Platform</strong>”).
                </p>
                <p>
                  By accessing, browsing, registering for, or using HemoTrack, you agree to be bound by these Terms. If you do not agree, you must not use the Platform.
                </p>
              </div>
            </div>

            {/* Section 2 */}
            <div id="sec-2" className="scroll-mt-24 space-y-4 border-b border-slate-100 pb-8">
              <div className="flex items-center gap-2 text-slate-800 font-extrabold">
                <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center text-xs font-black">2</span>
                <h2 className="text-lg md:text-xl font-black text-slate-900">About HemoTrack</h2>
              </div>
              <div className="text-sm md:text-base text-slate-600 leading-relaxed space-y-3 pl-9">
                <p>
                  HemoTrack is a digital coordination and logistics support platform intended to assist authorized stakeholders such as hospitals, blood banks, delivery teams, administrators, and oversight authorities in managing blood request coordination, dispatch visibility, transport tracking, operational monitoring, and reporting.
                </p>
                <p className="font-semibold text-slate-800">
                  HemoTrack is <span className="text-red-600 underline decoration-red-100 decoration-wavy">not</span>:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-slate-600">
                  <li>a blood-selling marketplace;</li>
                  <li>a medical treatment or diagnosis service;</li>
                  <li>a substitute for licensed medical, blood banking, transfusion, or regulatory decision-making;</li>
                  <li>an emergency clinical authority.</li>
                </ul>
              </div>
            </div>

            {/* Section 3 */}
            <div id="sec-3" className="scroll-mt-24 space-y-4 border-b border-slate-100 pb-8">
              <div className="flex items-center gap-2 text-slate-800 font-extrabold">
                <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center text-xs font-black">3</span>
                <h2 className="text-lg md:text-xl font-black text-slate-900">Eligibility and Authorized Use</h2>
              </div>
              <div className="text-sm md:text-base text-slate-600 leading-relaxed space-y-3 pl-9">
                <p>
                  You may use HemoTrack only if:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-slate-600">
                  <li>you are legally capable of entering into a binding arrangement;</li>
                  <li>you are acting on behalf of yourself or an authorized institution, as applicable;</li>
                  <li>you provide accurate and complete registration information;</li>
                  <li>your use of the Platform is lawful and consistent with these Terms.</li>
                </ul>
                <p>
                  If you create or use an institutional account, you represent that you are authorized to do so on behalf of the relevant institution.
                </p>
              </div>
            </div>

            {/* Section 4 */}
            <div id="sec-4" className="scroll-mt-24 space-y-4 border-b border-slate-100 pb-8">
              <div className="flex items-center gap-2 text-slate-800 font-extrabold">
                <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center text-xs font-black">4</span>
                <h2 className="text-lg md:text-xl font-black text-slate-900">User Roles and Access</h2>
              </div>
              <div className="text-sm md:text-base text-slate-600 leading-relaxed space-y-3 pl-9">
                <p>
                  HemoTrack may provide different access levels for different categories of users, including:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold text-slate-700 flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-blue-500" /> Hospitals
                  </div>
                  <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold text-slate-700 flex items-center gap-2">
                    <Activity className="w-4 h-4 text-red-500" /> Blood Banks
                  </div>
                  <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold text-slate-700 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-emerald-500" /> Delivery Partners
                  </div>
                  <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold text-slate-700 flex items-center gap-2">
                    <Shield className="w-4 h-4 text-purple-500" /> Administrators & Regulators
                  </div>
                </div>
                <p className="text-xs text-slate-500 pt-2">
                  Access to data, workflows, and features is role-based. Users must not attempt to access data, records, dashboards, or features beyond their assigned authorization level.
                </p>
              </div>
            </div>

            {/* Section 5 */}
            <div id="sec-5" className="scroll-mt-24 space-y-4 border-b border-slate-100 pb-8">
              <div className="flex items-center gap-2 text-slate-800 font-extrabold">
                <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center text-xs font-black">5</span>
                <h2 className="text-lg md:text-xl font-black text-slate-900">User Responsibilities</h2>
              </div>
              <div className="text-sm md:text-base text-slate-600 leading-relaxed space-y-5 pl-9">
                <p>By using HemoTrack, you agree that you will:</p>
                
                <div className="space-y-3.5">
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                      <UserCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                      5.1 Provide Accurate Information
                    </h4>
                    <p className="text-xs md:text-sm text-slate-500 pl-6">
                      Provide true, current, and complete information and keep account and organizational details reasonably updated.
                    </p>
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                      <Shield className="w-4 h-4 text-indigo-500 shrink-0" />
                      5.2 Protect Account Credentials
                    </h4>
                    <p className="text-xs md:text-sm text-slate-500 pl-6">
                      Keep your login credentials secure and confidential; notify HemoTrack promptly of unauthorized access or suspected account compromise; accept responsibility for activity occurring under your account.
                    </p>
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                      <Scale className="w-4 h-4 text-blue-500 shrink-0" />
                      5.3 Use the Platform Lawfully and Responsibly
                    </h4>
                    <p className="text-xs md:text-sm text-slate-500 pl-6">
                      Use HemoTrack only for legitimate, authorized, and lawful purposes; comply with applicable institutional, medical, regulatory, and data protection requirements.
                    </p>
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                      <Info className="w-4 h-4 text-slate-500 shrink-0" />
                      5.4 Respect Role-Based Limits
                    </h4>
                    <p className="text-xs md:text-sm text-slate-500 pl-6">
                      Access only the information necessary for your role and authorized purpose; do not misuse operational data, personal data, or platform outputs.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 6 */}
            <div id="sec-6" className="scroll-mt-24 space-y-4 border-b border-slate-100 pb-8">
              <div className="flex items-center gap-2 text-slate-800 font-extrabold">
                <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center text-xs font-black">6</span>
                <h2 className="text-lg md:text-xl font-black text-slate-900">Prohibited Activities</h2>
              </div>
              <div className="text-sm md:text-base text-slate-600 leading-relaxed pl-9">
                <p className="mb-3">You must <strong>not</strong>:</p>
                <ul className="space-y-2.5 text-xs md:text-sm text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0"></span>
                    <span>Use HemoTrack for any unlawful, fraudulent, misleading, or harmful purpose.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0"></span>
                    <span>Impersonate another person or institution.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0"></span>
                    <span>Submit false requests, fabricated information, or misleading operational records.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0"></span>
                    <span>Attempt to gain unauthorized access to accounts, data, systems, or networks.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0"></span>
                    <span>Reverse engineer, copy, scrape, exploit, or interfere with the Platform without authorization.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0"></span>
                    <span>Upload malware, harmful code, or malicious content.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0"></span>
                    <span>Use the Platform to market, sell, or solicit direct consumer blood transactions.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0"></span>
                    <span>Rely on the Platform as a substitute for medical judgment or emergency clinical decision-making.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0"></span>
                    <span>Access, export, or disclose data beyond your role or authorization.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Section 7 */}
            <div id="sec-7" className="scroll-mt-24 space-y-4 border-b border-slate-100 pb-8">
              <div className="flex items-center gap-2 text-slate-800 font-extrabold">
                <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center text-xs font-black">7</span>
                <h2 className="text-lg md:text-xl font-black text-slate-900">Institutional Responsibility</h2>
              </div>
              <div className="text-sm md:text-base text-slate-600 leading-relaxed space-y-3 pl-9">
                <p>
                  Hospitals, blood banks, delivery operators, and other institutional users remain responsible for:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>verifying the legitimacy of requests, dispatches, and approvals;</li>
                  <li>complying with applicable medical, blood banking, and regulatory requirements;</li>
                  <li>ensuring that personnel using HemoTrack are properly authorized;</li>
                  <li>validating operational and clinical decisions independently of the Platform.</li>
                </ul>
                <p className="text-xs text-slate-500 pt-1">
                  HemoTrack provides a digital workflow and visibility layer only; it does not validate medical suitability, blood eligibility, transfusion necessity, or regulatory approvals unless explicitly stated in a future written agreement.
                </p>
              </div>
            </div>

            {/* Section 8 */}
            <div id="sec-8" className="scroll-mt-24 space-y-4 border-b border-slate-100 pb-8">
              <div className="flex items-center gap-2 text-slate-800 font-extrabold">
                <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center text-xs font-black">8</span>
                <h2 className="text-lg md:text-xl font-black text-slate-900">No Medical Advice Guarantee</h2>
              </div>
              <div className="text-sm md:text-base text-slate-600 leading-relaxed space-y-3 pl-9 bg-red-50/10 border-l-4 border-red-500 py-2 pr-4">
                <p className="font-extrabold text-red-700 uppercase tracking-wide text-xs">No Clinical Decision Support Guarantee</p>
                <p>
                  HemoTrack does not provide medical advice, treatment recommendations, transfusion guidance, or emergency clinical decision-making. Any medical, blood banking, or treatment-related decisions must be made by licensed and authorized professionals and institutions.
                </p>
              </div>
            </div>

            {/* Section 9 */}
            <div id="sec-9" className="scroll-mt-24 space-y-4 border-b border-slate-100 pb-8">
              <div className="flex items-center gap-2 text-slate-800 font-extrabold">
                <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center text-xs font-black">9</span>
                <h2 className="text-lg md:text-xl font-black text-slate-900">Data and Content Submitted by Users</h2>
              </div>
              <div className="text-sm md:text-base text-slate-600 leading-relaxed space-y-3 pl-9">
                <p>
                  Users may submit operational, organizational, or workflow-related data through the Platform. By doing so, you represent and warrant that:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>you have the right and authority to submit such data;</li>
                  <li>the data is accurate to the best of your knowledge;</li>
                  <li>the data does not violate law, confidentiality obligations, or third-party rights;</li>
                  <li>the data is submitted only for legitimate authorized use.</li>
                </ul>
                <p>
                  You remain responsible for the lawfulness of data you upload or process through HemoTrack.
                </p>
              </div>
            </div>

            {/* Section 10 */}
            <div id="sec-10" className="scroll-mt-24 space-y-4 border-b border-slate-100 pb-8">
              <div className="flex items-center gap-2 text-slate-800 font-extrabold">
                <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center text-xs font-black">10</span>
                <h2 className="text-lg md:text-xl font-black text-slate-900">Platform Availability and Changes</h2>
              </div>
              <div className="text-sm md:text-base text-slate-600 leading-relaxed space-y-2 pl-9">
                <p>
                  HemoTrack may update, modify, suspend, or discontinue any part of the Platform at any time, with or without notice, including features, workflows, dashboards, access levels, or technical integrations.
                </p>
                <p>
                  We do not guarantee uninterrupted availability, continuous uptime, or error-free operation.
                </p>
              </div>
            </div>

            {/* Section 11 */}
            <div id="sec-11" className="scroll-mt-24 space-y-4 border-b border-slate-100 pb-8">
              <div className="flex items-center gap-2 text-slate-800 font-extrabold">
                <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center text-xs font-black">11</span>
                <h2 className="text-lg md:text-xl font-black text-slate-900">Beta / Pilot / Prototype Features</h2>
              </div>
              <div className="text-sm md:text-base text-slate-600 leading-relaxed space-y-2 pl-9">
                <p>
                  Certain HemoTrack features may be offered as pilot, beta, demo, or prototype functionality. Such features may be incomplete, subject to change, or unavailable at times. HemoTrack makes no guarantee that beta or prototype features will remain unchanged or suitable for production use.
                </p>
              </div>
            </div>

            {/* Section 12 */}
            <div id="sec-12" className="scroll-mt-24 space-y-4 border-b border-slate-100 pb-8">
              <div className="flex items-center gap-2 text-slate-800 font-extrabold">
                <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center text-xs font-black">12</span>
                <h2 className="text-lg md:text-xl font-black text-slate-900">Intellectual Property</h2>
              </div>
              <div className="text-sm md:text-base text-slate-600 leading-relaxed space-y-2 pl-9">
                <p>
                  Unless otherwise stated, HemoTrack and its associated materials—including platform design, software, content, branding, text, graphics, workflows, interfaces, and documentation—are owned by or licensed to HemoTrack and are protected by applicable intellectual property laws.
                </p>
                <p>
                  You may not reproduce, distribute, modify, reverse engineer, republish, or commercially exploit HemoTrack materials without prior written permission, except as expressly permitted by law or written agreement.
                </p>
              </div>
            </div>

            {/* Section 13 */}
            <div id="sec-13" className="scroll-mt-24 space-y-4 border-b border-slate-100 pb-8">
              <div className="flex items-center gap-2 text-slate-800 font-extrabold">
                <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center text-xs font-black">13</span>
                <h2 className="text-lg md:text-xl font-black text-slate-900">Privacy and Data Handling</h2>
              </div>
              <div className="text-sm md:text-base text-slate-600 leading-relaxed space-y-2 pl-9">
                <p>
                  Use of HemoTrack is also governed by the HemoTrack Privacy Policy. By using the Platform, you acknowledge that your information may be collected, processed, and handled in accordance with the Privacy Policy.
                </p>
              </div>
            </div>

            {/* Section 14 */}
            <div id="sec-14" className="scroll-mt-24 space-y-4 border-b border-slate-100 pb-8">
              <div className="flex items-center gap-2 text-slate-800 font-extrabold">
                <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center text-xs font-black">14</span>
                <h2 className="text-lg md:text-xl font-black text-slate-900">Third-Party Services and Integrations</h2>
              </div>
              <div className="text-sm md:text-base text-slate-600 leading-relaxed space-y-2 pl-9">
                <p>
                  HemoTrack may use or integrate with third-party hosting providers, cloud services, analytics tools, communication tools, mapping services, or other vendors. HemoTrack is not responsible for the acts, omissions, availability, or policies of third-party services outside its reasonable control.
                </p>
              </div>
            </div>

            {/* Section 15 */}
            <div id="sec-15" className="scroll-mt-24 space-y-4 border-b border-slate-100 pb-8">
              <div className="flex items-center gap-2 text-slate-800 font-extrabold">
                <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center text-xs font-black">15</span>
                <h2 className="text-lg md:text-xl font-black text-slate-900">Disclaimers</h2>
              </div>
              <div className="text-sm md:text-base text-slate-600 leading-relaxed space-y-4 pl-9">
                <p className="italic text-slate-500 font-semibold">To the maximum extent permitted by law:</p>
                
                <div className="space-y-3">
                  <p>
                    <strong>15.1 “As Is” / “As Available”</strong><br />
                    The Platform is provided on an “as is” and “as available” basis without warranties of any kind, express or implied, except where such disclaimers are not permitted by law.
                  </p>
                  <p>
                    <strong>15.2 No Guarantee of Outcomes</strong><br />
                    HemoTrack does not guarantee: blood availability, request fulfillment, dispatch acceptance, delivery success, medical outcomes, clinical appropriateness, or uninterrupted service availability.
                  </p>
                  <p>
                    <strong>15.3 No Warranty on Third-Party Inputs</strong><br />
                    HemoTrack is not responsible for the accuracy, completeness, or reliability of data entered by hospitals, blood banks, delivery teams, or other users.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 16 */}
            <div id="sec-16" className="scroll-mt-24 space-y-4 border-b border-slate-100 pb-8">
              <div className="flex items-center gap-2 text-slate-800 font-extrabold">
                <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center text-xs font-black">16</span>
                <h2 className="text-lg md:text-xl font-black text-slate-900">Limitation of Liability</h2>
              </div>
              <div className="text-sm md:text-base text-slate-600 leading-relaxed space-y-2 pl-9">
                <p>
                  To the maximum extent permitted by law, HemoTrack, its founder, team members, advisors, affiliates, vendors, and service providers shall not be liable for any indirect, incidental, consequential, special, punitive, or exemplary damages, including loss of data, business interruption, reputational harm, operational loss, or medical/clinical consequences arising out of or related to use of the Platform.
                </p>
                <p>
                  HemoTrack’s total liability, if any, for direct claims arising solely from the Platform shall be limited to the amount actually paid by the relevant user or institution to HemoTrack for the specific service giving rise to the claim in the preceding [12] months, or INR 10,000, whichever is lower, unless otherwise required by law.
                </p>
              </div>
            </div>

            {/* Section 17 */}
            <div id="sec-17" className="scroll-mt-24 space-y-4 border-b border-slate-100 pb-8">
              <div className="flex items-center gap-2 text-slate-800 font-extrabold">
                <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center text-xs font-black">17</span>
                <h2 className="text-lg md:text-xl font-black text-slate-900">Indemnity</h2>
              </div>
              <div className="text-sm md:text-base text-slate-600 leading-relaxed space-y-2 pl-9">
                <p>
                  You agree to indemnify and hold harmless HemoTrack, its founder, team members, affiliates, and service providers from and against claims, liabilities, losses, damages, costs, and expenses arising from:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>your misuse of the Platform;</li>
                  <li>your violation of these Terms;</li>
                  <li>your unlawful, inaccurate, or unauthorized submission or use of data;</li>
                  <li>your violation of third-party rights, confidentiality obligations, or applicable law.</li>
                </ul>
              </div>
            </div>

            {/* Section 18 */}
            <div id="sec-18" className="scroll-mt-24 space-y-4 border-b border-slate-100 pb-8">
              <div className="flex items-center gap-2 text-slate-800 font-extrabold">
                <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center text-xs font-black">18</span>
                <h2 className="text-lg md:text-xl font-black text-slate-900">Suspension and Termination</h2>
              </div>
              <div className="text-sm md:text-base text-slate-600 leading-relaxed space-y-2 pl-9">
                <p>
                  HemoTrack may suspend, restrict, or terminate access to the Platform at any time if:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>you violate these Terms;</li>
                  <li>your use creates security, legal, or operational risk;</li>
                  <li>requested by a competent authority or institution;</li>
                  <li>necessary to protect the Platform, users, or stakeholders.</li>
                </ul>
                <p>
                  Termination of access does not automatically delete records where retention is required for legitimate operational, legal, audit, or security purposes.
                </p>
              </div>
            </div>

            {/* Section 19 */}
            <div id="sec-19" className="scroll-mt-24 space-y-4 border-b border-slate-100 pb-8">
              <div className="flex items-center gap-2 text-slate-800 font-extrabold">
                <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center text-xs font-black">19</span>
                <h2 className="text-lg md:text-xl font-black text-slate-900">Governing Law and Jurisdiction</h2>
              </div>
              <div className="text-sm md:text-base text-slate-600 leading-relaxed space-y-2 pl-9">
                <p>
                  These Terms shall be governed by and construed in accordance with the laws of <strong>India</strong>.
                </p>
                <p>
                  Subject to applicable law, courts located in <strong>Bhubaneswar, Odisha, India</strong> shall have jurisdiction over disputes arising out of or relating to these Terms or use of HemoTrack, unless otherwise required by a binding institutional agreement.
                </p>
              </div>
            </div>

            {/* Section 20 */}
            <div id="sec-20" className="scroll-mt-24 space-y-4 border-b border-slate-100 pb-8">
              <div className="flex items-center gap-2 text-slate-800 font-extrabold">
                <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center text-xs font-black">20</span>
                <h2 className="text-lg md:text-xl font-black text-slate-900">Grievances and Contact</h2>
              </div>
              <div className="text-sm md:text-base text-slate-600 leading-relaxed space-y-4 pl-9">
                <p>
                  For questions, complaints, notices, or concerns relating to these Terms, please contact:
                </p>
                
                <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 space-y-3">
                  <div className="flex items-start gap-3">
                    <UserCheck className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-bold text-slate-800">Priyabrata Sahoo</p>
                      <p className="text-xs text-slate-500">Founder, HemoTrack</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-blue-500 shrink-0" />
                    <a href="mailto:priyasahoo.2600@gmail.com" className="text-red-600 hover:underline font-semibold text-xs md:text-sm">
                      priyasahoo.2600@gmail.com
                    </a>
                  </div>

                  <div className="flex items-center gap-3">
                    <ExternalLink className="w-4 h-4 text-emerald-500 shrink-0" />
                    <a href="https://hemotrack.edgeone.dev/" target="_blank" rel="noopener noreferrer" className="text-slate-700 hover:text-red-600 font-semibold text-xs md:text-sm flex items-center gap-1">
                      https://hemotrack.edgeone.dev/
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 21 */}
            <div id="sec-21" className="scroll-mt-24 space-y-4 border-b border-slate-100 pb-8">
              <div className="flex items-center gap-2 text-slate-800 font-extrabold">
                <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center text-xs font-black">21</span>
                <h2 className="text-lg md:text-xl font-black text-slate-900">Changes to These Terms</h2>
              </div>
              <div className="text-sm md:text-base text-slate-600 leading-relaxed space-y-2 pl-9">
                <p>
                  HemoTrack may update these Terms from time to time. Updated Terms will be posted on the Platform with a revised “Last Updated” date. Continued use of the Platform after such changes may constitute acceptance of the updated Terms, subject to applicable law.
                </p>
              </div>
            </div>

            {/* Section 22 */}
            <div id="sec-22" className="scroll-mt-24 space-y-4 border-b border-slate-100 pb-8">
              <div className="flex items-center gap-2 text-slate-800 font-extrabold">
                <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center text-xs font-black">22</span>
                <h2 className="text-lg md:text-xl font-black text-slate-900">Entire Understanding</h2>
              </div>
              <div className="text-sm md:text-base text-slate-600 leading-relaxed space-y-2 pl-9">
                <p>
                  These Terms, together with the Privacy Policy and any specific institutional agreements or written policies expressly incorporated by reference, constitute the understanding between the user and HemoTrack regarding use of the Platform.
                </p>
              </div>
            </div>

            {/* Section 23 */}
            <div id="sec-23" className="scroll-mt-24 space-y-4 border-b border-slate-100 pb-8">
              <div className="flex items-center gap-2 text-slate-800 font-extrabold">
                <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center text-xs font-black">23</span>
                <h2 className="text-lg md:text-xl font-black text-slate-900">Severability</h2>
              </div>
              <div className="text-sm md:text-base text-slate-600 leading-relaxed space-y-2 pl-9">
                <p>
                  If any provision of these Terms is found unenforceable or invalid, the remaining provisions shall continue in full force to the extent permitted by law.
                </p>
              </div>
            </div>

            {/* Section 24 */}
            <div id="sec-24" className="scroll-mt-24 space-y-4 pb-4">
              <div className="flex items-center gap-2 text-slate-800 font-extrabold">
                <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center text-xs font-black">24</span>
                <h2 className="text-lg md:text-xl font-black text-slate-900">Acknowledgment</h2>
              </div>
              <div className="text-sm md:text-base text-slate-600 leading-relaxed space-y-2 pl-9">
                <p>
                  By using HemoTrack, you acknowledge that you have read, understood, and agreed to these Terms & Conditions.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
