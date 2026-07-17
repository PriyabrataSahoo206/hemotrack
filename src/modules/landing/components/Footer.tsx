import React from 'react';
import { Activity, Shield, Mail, Phone, MapPin, Linkedin, Github } from 'lucide-react';
import { useNavigation, PageId } from '../context/NavigationContext';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { navigateTo } = useNavigation();

  const handlePageChange = (e: React.MouseEvent<HTMLAnchorElement>, pageId: PageId) => {
    e.preventDefault();
    navigateTo(pageId);
  };

  return (
    <footer className="bg-slate-950 text-slate-400 pt-16 pb-8 border-t border-slate-900 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 mb-12">
          {/* Column 1 Logo details */}
          <div className="md:col-span-4 space-y-4">
            <a
              href="#home"
              onClick={(e) => handlePageChange(e, 'home')}
              className="flex items-center gap-2 group focus:outline-none"
              aria-label="HemoTrack Main Page Bottom"
            >
              <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-red-600 to-red-700 shadow-md">
                <Activity className="text-white w-5 h-5" />
                <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-blue-600 rounded-full border border-white flex items-center justify-center">
                  <Shield className="text-[6px] text-white w-1.5 h-1.5" />
                </div>
              </div>
              <div>
                <span className="text-lg font-black text-white tracking-tight block">
                  Hemo<span className="text-red-500">Track</span>
                </span>
                <span className="text-[9px] font-bold text-slate-500 tracking-widest uppercase block -mt-1">
                  Logistics & Guard
                </span>
              </div>
            </a>

            <p className="text-xs md:text-sm text-slate-400 leading-relaxed max-w-sm">
              Compliance-first blood logistics and coordination platform helping authorized hospitals, blood banks, administrators, and regulators maintain total operational visibility.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3 pt-2">
              <a href="https://www.linkedin.com/in/priyabrata-sahoo-b19a31316/" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors">
                <Linkedin size={16} />
              </a>
              <a href="#" className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors">
                <Github size={16} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-xs font-black text-white uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs md:text-sm">
              <li>
                <a
                  href="#home"
                  onClick={(e) => handlePageChange(e, 'home')}
                  className="hover:text-white transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#solution"
                  onClick={(e) => handlePageChange(e, 'solution')}
                  className="hover:text-white transition-colors"
                >
                  Solution & Modules
                </a>
              </li>
              <li>
                <a
                  href="#how-it-works"
                  onClick={(e) => handlePageChange(e, 'how-it-works')}
                  className="hover:text-white transition-colors"
                >
                  How It Works
                </a>
              </li>
              <li>
                <a
                  href="#leadership"
                  onClick={(e) => handlePageChange(e, 'leadership')}
                  className="hover:text-white transition-colors"
                >
                  Leadership & Vision
                </a>
              </li>
              <li>
                <a
                  href="#drive"
                  onClick={(e) => handlePageChange(e, 'drive')}
                  className="hover:text-white transition-colors"
                >
                  Drive Vault Workspace
                </a>
              </li>
              <li>
                <a
                  href="#volunteer"
                  onClick={(e) => handlePageChange(e, 'volunteer')}
                  className="hover:text-slate-200 text-red-400 hover:text-white transition-colors font-medium"
                >
                  Join as Volunteer
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Platform Modules */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-black text-white uppercase tracking-wider">
              Core Modules
            </h4>
            <ul className="space-y-2 text-xs md:text-sm">
              <li>
                <a
                  href="#solution"
                  onClick={(e) => handlePageChange(e, 'solution')}
                  className="hover:text-white transition-colors"
                >
                  Auth & Access Gates
                </a>
              </li>
              <li>
                <a
                  href="#solution"
                  onClick={(e) => handlePageChange(e, 'solution')}
                  className="hover:text-white transition-colors"
                >
                  Transport Tracking Engine
                </a>
              </li>
              <li>
                <a
                  href="#safety"
                  onClick={(e) => handlePageChange(e, 'safety')}
                  className="hover:text-white transition-colors"
                >
                  Temperature Monitoring
                </a>
              </li>
              <li>
                <a
                  href="#safety"
                  onClick={(e) => handlePageChange(e, 'safety')}
                  className="hover:text-white transition-colors"
                >
                  Audit Trails & Logs
                </a>
              </li>
            </ul>
          </div>


          {/* Column 4: Contact support details */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-black text-white uppercase tracking-wider">
              Operational Contacts
            </h4>
            <ul className="space-y-3 text-xs md:text-sm">
              <li className="flex items-start gap-2">
                <MapPin size={15} className="mt-0.5 text-red-500 shrink-0" />
                <span>Bhubaneswar, Khordha, Odisha, India, 752054</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={15} className="text-blue-500 shrink-0" />
                <span className="truncate">
                  <a href="mailto:hemotrack323@gmail.com" className="hover:text-white transition-colors">
                    hemotrack323@gmail.com
                  </a>
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={15} className="text-emerald-500 shrink-0" />
                <span>
                  <a href="tel:+918763871977" className="hover:text-white transition-colors">
                    +91 8763871977
                  </a>
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Separator and fine disclaimers bottom row */}
        <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <p>© {currentYear} HemoTrack Platform. All Rights Reserved. ISO 27001 Certified & Compliance-First Workflows.</p>
          <div className="flex gap-4">
            <a 
              href="#privacy" 
              onClick={(e) => handlePageChange(e, 'privacy')} 
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </a>
            <span>•</span>
            <a 
              href="#terms" 
              onClick={(e) => handlePageChange(e, 'terms')} 
              className="hover:text-white transition-colors"
            >
              Terms of Coordination
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
