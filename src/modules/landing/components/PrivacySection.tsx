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
  ExternalLink,
  Eye,
  Database,
  Lock,
  Share2,
  Cpu
} from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';
import { motion } from 'motion/react';

export function PrivacySection() {
  const { navigateTo } = useNavigation();
  const [activeSection, setActiveSection] = useState<string>('sec-1');

  const sections = [
    { id: 'sec-1', label: '1. Introduction' },
    { id: 'sec-2', label: '2. Scope of This Policy' },
    { id: 'sec-3', label: '3. Nature of Services' },
    { id: 'sec-4', label: '4. Information We Collect' },
    { id: 'sec-5', label: '5. How We Collect Data' },
    { id: 'sec-6', label: '6. Why We Use Data' },
    { id: 'sec-7', label: '7. Legal Basis' },
    { id: 'sec-8', label: '8. Data Sharing & Disclosure' },
    { id: 'sec-9', label: '9. Role-Based Access' },
    { id: 'sec-10', label: '10. Cookies & Tracking' },
    { id: 'sec-11', label: '11. Data Retention' },
    { id: 'sec-12', label: '12. Data Security' },
    { id: 'sec-13', label: '13. User Rights & Choices' },
    { id: 'sec-14', label: '14. Children’s Data' },
    { id: 'sec-15', label: '15. Cross-Border Processing' },
    { id: 'sec-16', label: '16. Third-Party Links' },
    { id: 'sec-17', label: '17. Breach Response' },
    { id: 'sec-18', label: '18. Changes to Policy' },
    { id: 'sec-19', label: '19. Contact & Grievances' },
    { id: 'sec-20', label: '20. Acknowledgment' },
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
                <Shield className="w-3.5 h-3.5" />
                Data Protection & Privacy
              </div>
              <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                Privacy Policy <span className="text-red-500 font-extrabold">–</span> HemoTrack
              </h1>
              <p className="text-sm md:text-base text-slate-600 leading-relaxed">
                Your trust and data privacy are core to our logistical operations. Learn how we secure, process, and respect operational and stakeholder information.
              </p>
              <div className="flex flex-wrap items-center gap-y-2 gap-x-6 pt-2 text-xs font-semibold text-slate-500">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  Effective Date: June 4, 2025
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  Last Updated: May 12, 2026
                </span>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center bg-slate-50 border border-slate-100 rounded-2xl p-5 shrink-0 text-center md:w-52">
              <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center shadow-md shadow-red-200 mb-2">
                <ShieldCheck className="text-white w-5.5 h-5.5" />
              </div>
              <span className="text-[10px] font-extrabold tracking-wider text-slate-400 uppercase">Compliance</span>
              <span className="text-xs font-black text-slate-800 mt-0.5">DPDP Compliant (India)</span>
            </div>
          </div>
        </div>

        {/* 2-Column Desktop Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Sticky Table of Contents Sidebar */}
          <div className="lg:col-span-4 hidden lg:block">
            <div className="sticky top-24 bg-white border border-slate-200/80 rounded-2xl p-5 space-y-4 max-h-[calc(100vh-140px)] overflow-y-auto shadow-sm scrollbar-thin">
              <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider flex items-center gap-2">
                <Eye className="w-3.5 h-3.5 text-slate-400" />
                Policy Sections
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
                <h2 className="text-lg md:text-xl font-black text-slate-900">Introduction (From Raktsetu to HemoTrack)</h2>
              </div>
              <div className="text-sm md:text-base text-slate-600 leading-relaxed space-y-3 pl-9">
                <p>
                  HemoTrack (“<strong>HemoTrack</strong>”, “**we**”, “**our**”, or “**us**”) is a digital coordination and logistics support platform designed to assist authorized stakeholders such as hospitals, blood banks, delivery partners, administrators, and oversight authorities in managing blood request coordination, dispatch workflows, tracking, monitoring, and operational reporting.
                </p>
                <p>
                  This Privacy Policy explains how HemoTrack collects, uses, stores, shares, and protects information when users access or use the HemoTrack website, web application, dashboards, communication channels, and related services (collectively, the “**Platform**”).
                </p>
                <p>
                  By using the Platform, you acknowledge that you have read and understood this Privacy Policy.
                </p>
              </div>
            </div>

            {/* Section 2 */}
            <div id="sec-2" className="scroll-mt-24 space-y-4 border-b border-slate-100 pb-8">
              <div className="flex items-center gap-2 text-slate-800 font-extrabold">
                <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center text-xs font-black">2</span>
                <h2 className="text-lg md:text-xl font-black text-slate-900">Scope of This Policy</h2>
              </div>
              <div className="text-sm md:text-base text-slate-600 leading-relaxed space-y-3 pl-9">
                <p>This Privacy Policy applies to:</p>
                <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
                  <li>visitors to the HemoTrack website;</li>
                  <li>registered users of the HemoTrack Platform;</li>
                  <li>hospitals, blood banks, delivery partners, administrators, regulators, and authorized representatives who use HemoTrack;</li>
                  <li>communications, demo requests, contact forms, and support interactions submitted through HemoTrack.</li>
                </ul>
                <p>
                  This Privacy Policy does <strong>not</strong> replace or override the legal, medical, or regulatory obligations of hospitals, blood banks, healthcare providers, or government authorities.
                </p>
              </div>
            </div>

            {/* Section 3 */}
            <div id="sec-3" className="scroll-mt-24 space-y-4 border-b border-slate-100 pb-8">
              <div className="flex items-center gap-2 text-slate-800 font-extrabold">
                <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center text-xs font-black">3</span>
                <h2 className="text-lg md:text-xl font-black text-slate-900">Nature of HemoTrack’s Services</h2>
              </div>
              <div className="text-sm md:text-base text-slate-600 leading-relaxed space-y-3 pl-9">
                <p>
                  HemoTrack is intended to operate as a <strong>digital coordination, tracking, and operational support platform</strong> for authorized institutions and stakeholders. HemoTrack is <strong>not</strong>:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-slate-600">
                  <li>a direct-to-consumer blood selling platform;</li>
                  <li>a medical diagnosis or treatment platform;</li>
                  <li>a replacement for licensed blood banking, hospital, or regulatory processes;</li>
                  <li>a substitute for medical judgment, transfusion decisions, or emergency clinical decision-making.</li>
                </ul>
              </div>
            </div>

            {/* Section 4 */}
            <div id="sec-4" className="scroll-mt-24 space-y-4 border-b border-slate-100 pb-8">
              <div className="flex items-center gap-2 text-slate-800 font-extrabold">
                <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center text-xs font-black">4</span>
                <h2 className="text-lg md:text-xl font-black text-slate-900">Information We May Collect</h2>
              </div>
              <div className="text-sm md:text-base text-slate-600 leading-relaxed space-y-5 pl-9">
                <p>Depending on the nature of the user and the services used, HemoTrack may collect the following categories of information:</p>

                <div className="space-y-4">
                  <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                    <h4 className="text-sm font-extrabold text-slate-900 flex items-center gap-2 mb-1.5">
                      <UserCheck className="w-4 h-4 text-red-500" />
                      4.1 Account and Identity Information
                    </h4>
                    <p className="text-xs text-slate-500 pl-6">
                      Full name, designation/role, hospital/blood bank/organization name, official email address, phone number, username/login credentials, and employee or organization-issued identification details, where applicable.
                    </p>
                  </div>

                  <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                    <h4 className="text-sm font-extrabold text-slate-900 flex items-center gap-2 mb-1.5">
                      <Building2 className="w-4 h-4 text-blue-500" />
                      4.2 Organization and Operational Information
                    </h4>
                    <p className="text-xs text-slate-500 pl-6">
                      Hospital, blood bank, or delivery partner profile information, service area or operational zone, authorized contact persons, request workflow information, dispatch and delivery records, audit logs and operational reports.
                    </p>
                  </div>

                  <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                    <h4 className="text-sm font-extrabold text-slate-900 flex items-center gap-2 mb-1.5">
                      <Database className="w-4 h-4 text-purple-500" />
                      4.3 Blood Request and Workflow Information
                    </h4>
                    <p className="text-xs text-slate-500 pl-6">
                      Request identifiers, request timestamps, request status and workflow history, required blood group / component details (where entered by authorized institutions), dispatch and transport details, confirmation and acknowledgment records.
                    </p>
                  </div>

                  <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                    <h4 className="text-sm font-extrabold text-slate-900 flex items-center gap-2 mb-1.5">
                      <MapPin className="w-4 h-4 text-emerald-500" />
                      4.4 Tracking, Transport, and Device Information
                    </h4>
                    <p className="text-xs text-slate-500 pl-6">
                      Live or historical location information of delivery operations (where enabled), route and trip status, transport event logs, delivery status updates, device/browser metadata, IP address, session data, and basic analytics logs.
                    </p>
                  </div>

                  <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                    <h4 className="text-sm font-extrabold text-slate-900 flex items-center gap-2 mb-1.5">
                      <Mail className="w-4 h-4 text-amber-500" />
                      4.5 Communication and Support Information
                    </h4>
                    <p className="text-xs text-slate-500 pl-6">
                      Contact form submissions, email communications, support tickets, demo requests, feedback and survey responses.
                    </p>
                  </div>

                  <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                    <h4 className="text-sm font-extrabold text-slate-900 flex items-center gap-2 mb-1.5">
                      <Cpu className="w-4 h-4 text-cyan-500" />
                      4.6 Technical and Usage Information
                    </h4>
                    <p className="text-xs text-slate-500 pl-6">
                      Login time and session records, pages visited and feature usage, error logs and diagnostics, security logs and suspicious activity records.
                    </p>
                  </div>

                  <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                    <h4 className="text-sm font-extrabold text-slate-900 flex items-center gap-2 mb-1.5">
                      <Lock className="w-4 h-4 text-indigo-500" />
                      4.7 Limited Sensitive or Health-Related Workflow Data
                    </h4>
                    <p className="text-xs text-slate-500 pl-6">
                      Where entered by authorized institutions, HemoTrack may process limited blood request or workflow-related information relevant to coordination and operational visibility. HemoTrack does not seek to become a medical records repository unless explicitly designed, contractually agreed, and lawfully permitted to do so.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 5 */}
            <div id="sec-5" className="scroll-mt-24 space-y-4 border-b border-slate-100 pb-8">
              <div className="flex items-center gap-2 text-slate-800 font-extrabold">
                <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center text-xs font-black">5</span>
                <h2 className="text-lg md:text-xl font-black text-slate-900">How We Collect Information</h2>
              </div>
              <div className="text-sm md:text-base text-slate-600 leading-relaxed space-y-3 pl-9">
                <p>We may collect information:</p>
                <ul className="list-disc pl-5 space-y-1 text-slate-600">
                  <li>directly from users during signup, onboarding, profile creation, or support requests;</li>
                  <li>from hospitals, blood banks, delivery teams, or administrators using the Platform;</li>
                  <li>through forms, dashboards, and workflow submissions;</li>
                  <li>automatically through browser/device interactions, cookies, and usage analytics;</li>
                  <li>from authorized integrations, if implemented and lawfully permitted.</li>
                </ul>
              </div>
            </div>

            {/* Section 6 */}
            <div id="sec-6" className="scroll-mt-24 space-y-4 border-b border-slate-100 pb-8">
              <div className="flex items-center gap-2 text-slate-800 font-extrabold">
                <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center text-xs font-black">6</span>
                <h2 className="text-lg md:text-xl font-black text-slate-900">Why We Collect and Use Information</h2>
              </div>
              <div className="text-sm md:text-base text-slate-600 leading-relaxed space-y-4 pl-9">
                <p>We may use information for the following purposes:</p>

                <div className="space-y-3 text-xs md:text-sm text-slate-600">
                  <p>
                    <strong>6.1 To Provide and Operate the Platform</strong><br />
                    Create and manage user accounts, authenticate users and control access, enable request coordination, dispatch tracking, delivery monitoring, and reporting, and provide dashboards, notifications, and workflow visibility.
                  </p>
                  <p>
                    <strong>6.2 To Support Platform Security and Integrity</strong><br />
                    Detect fraud, misuse, unauthorized access, or suspicious activity, maintain audit logs and security records, troubleshoot errors, and improve platform reliability.
                  </p>
                  <p>
                    <strong>6.3 To Communicate With Users</strong><br />
                    Respond to support requests, send operational alerts and platform notices, and provide onboarding, service, or account-related communication.
                  </p>
                  <p>
                    <strong>6.4 To Improve HemoTrack</strong><br />
                    Analyze feature usage and performance, improve user experience, workflows, and reliability, and conduct internal testing, analytics, and quality improvements.
                  </p>
                  <p>
                    <strong>6.5 To Comply With Legal, Contractual, and Regulatory Obligations</strong><br />
                    Maintain records required for legitimate operational, contractual, or compliance purposes, respond to lawful requests from competent authorities, and investigate misuse, incidents, or policy violations.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 7 */}
            <div id="sec-7" className="scroll-mt-24 space-y-4 border-b border-slate-100 pb-8">
              <div className="flex items-center gap-2 text-slate-800 font-extrabold">
                <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center text-xs font-black">7</span>
                <h2 className="text-lg md:text-xl font-black text-slate-900">Legal Basis / User Acknowledgment</h2>
              </div>
              <div className="text-sm md:text-base text-slate-600 leading-relaxed space-y-3 pl-9">
                <p>Where applicable, HemoTrack processes information based on:</p>
                <ul className="list-disc pl-5 space-y-1 text-slate-600 text-xs md:text-sm">
                  <li>user consent;</li>
                  <li>legitimate operational requirements of the Platform;</li>
                  <li>contractual necessity with authorized institutions or users;</li>
                  <li>compliance with applicable law, regulatory obligations, or lawful requests.</li>
                </ul>
                <p className="bg-slate-50 border border-slate-200 p-4 rounded-2xl text-xs text-slate-500 font-medium">
                  <strong>Regulatory Note:</strong> India’s Digital Personal Data Protection (DPDP) Act expects clear notice, purpose limitation, consent management, grievance handling, and user rights processes. Where personal data is collected, HemoTrack aims to process only such data as is reasonably necessary for the stated purpose.
                </p>
              </div>
            </div>

            {/* Section 8 */}
            <div id="sec-8" className="scroll-mt-24 space-y-4 border-b border-slate-100 pb-8">
              <div className="flex items-center gap-2 text-slate-800 font-extrabold">
                <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center text-xs font-black">8</span>
                <h2 className="text-lg md:text-xl font-black text-slate-900">Data Sharing and Disclosure</h2>
              </div>
              <div className="text-sm md:text-base text-slate-600 leading-relaxed space-y-4 pl-9">
                <p className="font-extrabold text-slate-800 flex items-center gap-1">
                  <Share2 className="w-4 h-4 text-red-500" />
                  HemoTrack does NOT sell personal data.
                </p>
                <p>We may share information only in the following situations:</p>

                <div className="space-y-3 text-xs md:text-sm text-slate-600">
                  <p>
                    <strong>8.1 With Authorized Institutional Users</strong><br />
                    Relevant operational data may be visible to authorized hospitals, blood banks, delivery partners, administrators, or regulators based on role-based access permissions and legitimate workflow requirements.
                  </p>
                  <p>
                    <strong>8.2 With Service Providers / Vendors</strong><br />
                    We may use trusted third-party vendors for hosting, cloud infrastructure, email delivery, analytics, logging, customer support, or platform maintenance, subject to appropriate contractual and security safeguards.
                  </p>
                  <p>
                    <strong>8.3 For Legal and Safety Reasons</strong><br />
                    We may disclose information where required by law, court order, or lawful government request; to protect the safety, rights, security, or property of users, institutions, or HemoTrack; or to investigate misuse, fraud, abuse, or security incidents.
                  </p>
                  <p>
                    <strong>8.4 In Business Transfers</strong><br />
                    If HemoTrack undergoes a merger, acquisition, restructuring, or asset transfer, relevant information may be transferred subject to applicable law and reasonable safeguards.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 9 */}
            <div id="sec-9" className="scroll-mt-24 space-y-4 border-b border-slate-100 pb-8">
              <div className="flex items-center gap-2 text-slate-800 font-extrabold">
                <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center text-xs font-black">9</span>
                <h2 className="text-lg md:text-xl font-black text-slate-900">Role-Based Access and Visibility</h2>
              </div>
              <div className="text-sm md:text-base text-slate-600 leading-relaxed space-y-3 pl-9">
                <p>
                  HemoTrack is designed to use role-based access controls. Different users may see different data depending on their role, organization, and authorization level. For example:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-slate-600 text-xs md:text-sm">
                  <li>hospitals may view and manage their request records;</li>
                  <li>blood banks may view request and dispatch information relevant to their operations;</li>
                  <li>delivery partners may access assigned transport and delivery information;</li>
                  <li>administrators may access broader operational records;</li>
                  <li>regulators, if enabled, may receive read-only oversight access.</li>
                </ul>
                <p className="font-semibold text-slate-800">
                  Users must not access, export, or use information beyond their authorized role.
                </p>
              </div>
            </div>

            {/* Section 10 */}
            <div id="sec-10" className="scroll-mt-24 space-y-4 border-b border-slate-100 pb-8">
              <div className="flex items-center gap-2 text-slate-800 font-extrabold">
                <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center text-xs font-black">10</span>
                <h2 className="text-lg md:text-xl font-black text-slate-900">Cookies and Similar Technologies</h2>
              </div>
              <div className="text-sm md:text-base text-slate-600 leading-relaxed space-y-2 pl-9">
                <p>HemoTrack may use cookies or similar technologies to:</p>
                <ul className="list-disc pl-5 space-y-1 text-slate-600">
                  <li>maintain secure sessions;</li>
                  <li>remember user preferences;</li>
                  <li>analyze website and platform usage;</li>
                  <li>improve performance and user experience.</li>
                </ul>
                <p className="text-xs text-slate-500 pt-1">
                  Users may manage cookie settings through their browser, subject to functionality limitations.
                </p>
              </div>
            </div>

            {/* Section 11 */}
            <div id="sec-11" className="scroll-mt-24 space-y-4 border-b border-slate-100 pb-8">
              <div className="flex items-center gap-2 text-slate-800 font-extrabold">
                <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center text-xs font-black">11</span>
                <h2 className="text-lg md:text-xl font-black text-slate-900">Data Retention</h2>
              </div>
              <div className="text-sm md:text-base text-slate-600 leading-relaxed space-y-3 pl-9">
                <p>We retain information only for as long as reasonably necessary for:</p>
                <ul className="list-disc pl-5 space-y-1 text-slate-600 text-xs md:text-sm">
                  <li>providing the Platform;</li>
                  <li>maintaining operational records and audit trails;</li>
                  <li>security, fraud prevention, and dispute resolution;</li>
                  <li>contractual, legal, or regulatory requirements.</li>
                </ul>
                <p>
                  When information is no longer required, we will seek to delete, anonymize, or securely archive it in accordance with applicable law, operational needs, and legitimate record-keeping requirements. DPDP obligations include deletion once the purpose is complete, subject to legal exceptions and retention needs.
                </p>
              </div>
            </div>

            {/* Section 12 */}
            <div id="sec-12" className="scroll-mt-24 space-y-4 border-b border-slate-100 pb-8">
              <div className="flex items-center gap-2 text-slate-800 font-extrabold">
                <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center text-xs font-black">12</span>
                <h2 className="text-lg md:text-xl font-black text-slate-900">Data Security</h2>
              </div>
              <div className="text-sm md:text-base text-slate-600 leading-relaxed space-y-3 pl-9">
                <p>
                  HemoTrack uses reasonable technical, organizational, and administrative safeguards intended to protect information from unauthorized access, disclosure, alteration, misuse, or destruction. These may include:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-slate-600 text-xs md:text-sm">
                  <li>role-based access controls;</li>
                  <li>password protection and authentication controls;</li>
                  <li>encryption in transit where feasible;</li>
                  <li>secure hosting and infrastructure controls;</li>
                  <li>logging and monitoring of critical actions;</li>
                  <li>incident response procedures.</li>
                </ul>
                <p className="text-xs text-amber-700 bg-amber-50 border border-amber-100 p-3 rounded-xl flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  Please note: No system can guarantee absolute security, and users acknowledge that internet-based services carry inherent risk.
                </p>
              </div>
            </div>

            {/* Section 13 */}
            <div id="sec-13" className="scroll-mt-24 space-y-4 border-b border-slate-100 pb-8">
              <div className="flex items-center gap-2 text-slate-800 font-extrabold">
                <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center text-xs font-black">13</span>
                <h2 className="text-lg md:text-xl font-black text-slate-900">User Rights and Choices</h2>
              </div>
              <div className="text-sm md:text-base text-slate-600 leading-relaxed space-y-3 pl-9">
                <p>Subject to applicable law and operational limitations, users may have the right to:</p>
                <ul className="list-disc pl-5 space-y-1.5 text-slate-600 text-xs md:text-sm">
                  <li>access certain personal information associated with their account;</li>
                  <li>request correction of inaccurate information;</li>
                  <li>request deletion of personal information, where legally and operationally feasible;</li>
                  <li>withdraw consent in certain cases;</li>
                  <li>request information about how their personal data is being processed;</li>
                  <li>raise grievances or privacy concerns.</li>
                </ul>
                <p>Requests may be denied or limited where retention is required by law, data is necessary for security/fraud prevention, or deletion would impair legitimate institutional workflow records.</p>
              </div>
            </div>

            {/* Section 14 */}
            <div id="sec-14" className="scroll-mt-24 space-y-4 border-b border-slate-100 pb-8">
              <div className="flex items-center gap-2 text-slate-800 font-extrabold">
                <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center text-xs font-black">14</span>
                <h2 className="text-lg md:text-xl font-black text-slate-900">Children’s Data</h2>
              </div>
              <div className="text-sm md:text-base text-slate-600 leading-relaxed pl-9">
                <p>
                  HemoTrack is intended for use by authorized institutional stakeholders and is not designed for use by children. Users must not knowingly submit personal data of minors except where lawfully required, properly authorized, and strictly necessary for legitimate institutional workflows. Any handling of minors’ data must comply with applicable law and institutional obligations.
                </p>
              </div>
            </div>

            {/* Section 15 */}
            <div id="sec-15" className="scroll-mt-24 space-y-4 border-b border-slate-100 pb-8">
              <div className="flex items-center gap-2 text-slate-800 font-extrabold">
                <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center text-xs font-black">15</span>
                <h2 className="text-lg md:text-xl font-black text-slate-900">Cross-Border Processing / Hosting</h2>
              </div>
              <div className="text-sm md:text-base text-slate-600 leading-relaxed pl-9">
                <p>
                  If HemoTrack uses cloud or technical infrastructure that processes data across jurisdictions, we will seek to do so subject to applicable law, contractual safeguards, and security practices. Users acknowledge that some service providers or infrastructure components may operate in multiple jurisdictions.
                </p>
              </div>
            </div>

            {/* Section 16 */}
            <div id="sec-16" className="scroll-mt-24 space-y-4 border-b border-slate-100 pb-8">
              <div className="flex items-center gap-2 text-slate-800 font-extrabold">
                <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center text-xs font-black">16</span>
                <h2 className="text-lg md:text-xl font-black text-slate-900">Third-Party Links and Integrations</h2>
              </div>
              <div className="text-sm md:text-base text-slate-600 leading-relaxed pl-9">
                <p>
                  The Platform may contain links to third-party services or may later integrate with third-party tools. HemoTrack is not responsible for the privacy practices of third-party websites, tools, or services not controlled by HemoTrack.
                </p>
              </div>
            </div>

            {/* Section 17 */}
            <div id="sec-17" className="scroll-mt-24 space-y-4 border-b border-slate-100 pb-8">
              <div className="flex items-center gap-2 text-slate-800 font-extrabold">
                <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center text-xs font-black">17</span>
                <h2 className="text-lg md:text-xl font-black text-slate-900">Breach Response and Incident Handling</h2>
              </div>
              <div className="text-sm md:text-base text-slate-600 leading-relaxed pl-9">
                <p>
                  If HemoTrack becomes aware of a material data security incident affecting personal data under its control, it will take commercially reasonable steps to assess, contain, investigate, and respond to the incident, and may notify affected parties or authorities where required by applicable law or contract. DPDP rules require breach notification obligations for covered entities.
                </p>
              </div>
            </div>

            {/* Section 18 */}
            <div id="sec-18" className="scroll-mt-24 space-y-4 border-b border-slate-100 pb-8">
              <div className="flex items-center gap-2 text-slate-800 font-extrabold">
                <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center text-xs font-black">18</span>
                <h2 className="text-lg md:text-xl font-black text-slate-900">Changes to This Privacy Policy</h2>
              </div>
              <div className="text-sm md:text-base text-slate-600 leading-relaxed pl-9">
                <p>
                  HemoTrack may update this Privacy Policy from time to time to reflect changes in the Platform, legal requirements, security practices, or operational processes. Updated versions will be posted on the Platform with a revised “Last Updated” date. Continued use of the Platform after changes may constitute acceptance of the updated policy, subject to applicable law.
                </p>
              </div>
            </div>

            {/* Section 19 */}
            <div id="sec-19" className="scroll-mt-24 space-y-4 border-b border-slate-100 pb-8">
              <div className="flex items-center gap-2 text-slate-800 font-extrabold">
                <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center text-xs font-black">19</span>
                <h2 className="text-lg md:text-xl font-black text-slate-900">Contact, Grievance, and Privacy Requests</h2>
              </div>
              <div className="text-sm md:text-base text-slate-600 leading-relaxed space-y-4 pl-9">
                <p>
                  For privacy-related questions, complaints, correction requests, deletion requests, or grievances, please contact:
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
                
                <p className="text-xs text-slate-500 italic">
                  If HemoTrack later appoints a dedicated Grievance Officer / Privacy Contact, this section should be updated accordingly.
                </p>
              </div>
            </div>

            {/* Section 20 */}
            <div id="sec-20" className="scroll-mt-24 space-y-4 pb-4">
              <div className="flex items-center gap-2 text-slate-800 font-extrabold">
                <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center text-xs font-black">20</span>
                <h2 className="text-lg md:text-xl font-black text-slate-900">Acknowledgment</h2>
              </div>
              <div className="text-sm md:text-base text-slate-600 leading-relaxed pl-9">
                <p>
                  By accessing or using HemoTrack, users acknowledge that they have read and understood this Privacy Policy and agree to the collection, use, and handling of information as described herein, subject to applicable law.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
