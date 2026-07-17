import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Quote, Shield, Award, Linkedin, ExternalLink } from 'lucide-react';
import { SectionHeading } from './shared/SectionHeading';
import { Badge } from './shared/Badge';

export function FounderSection() {
  const [imageSrc, setImageSrc] = useState('/founder_priyabrata_sahoo.jpg');

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <section
      id="founder"
      className="py-16 md:py-24 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden border-b border-slate-100 scroll-mt-6"
    >
      {/* Subtle geometric grid patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:20px_20px] opacity-60 pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-red-50/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-blue-50/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          title="Our Leadership & Vision"
          subtitle="Learn about the personal drive, founding values, and leadership behind HemoTrack's accountability systems."
          badgeText="Founder's Governance"
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-8"
        >
          {/* Left Side: Founder Profile Photo & Personal Contact Card */}
          <motion.div
            variants={itemVariants}
            className="col-span-1 lg:col-span-5 flex flex-col items-center"
          >
            <div className="w-full max-w-sm bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden group hover:border-slate-300 transition-all duration-300">
              {/* Image Frame Wrapper */}
              <div className="relative aspect-[3/4] w-full bg-slate-100 overflow-hidden flex items-center justify-center">
                {/* Fallback pattern in case image takes time or doesn't display */}
                <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-slate-100 flex flex-col items-center justify-center p-6 text-center">
                  <div className="w-20 h-20 rounded-full bg-red-600/10 flex items-center justify-center mb-3">
                    <span className="text-2xl font-black text-red-600">PS</span>
                  </div>
                  <h4 className="font-extrabold text-slate-800 text-base">Mr. Priyabrata Sahoo</h4>
                  <p className="text-xs text-slate-500 mt-1">Founder, HemoTrack</p>
                </div>

                {/* Profile Image with absolute positioning */}
                <img
                  src={imageSrc}
                  onError={() => {
                    // Fall back gracefully to a high-quality relevant placeholder if the local file is not found
                    setImageSrc('https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80');
                  }}
                  alt="Mr. Priyabrata Sahoo"
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                />

                {/* Interactive Status Overlay */}
                <div className="absolute bottom-4 left-4 right-4 bg-slate-950/80 backdrop-blur-md rounded-2xl p-3 border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
                    <span className="text-[10px] sm:text-xs font-bold text-white uppercase tracking-wider">
                      Founder Profile verified
                    </span>
                  </div>
                  <Shield size={14} className="text-blue-400" />
                </div>
              </div>


              {/* Founder Information & Contact Details */}
              <div className="p-6 space-y-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-black text-slate-900">
                      Mr. Priyabrata Sahoo
                    </h3>
                    <Award size={16} className="text-red-500 shrink-0" />
                  </div>
                  <p className="text-xs text-slate-500 font-semibold tracking-wide uppercase mt-0.5">
                    Founder, HemoTrack
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 space-y-3 text-xs md:text-sm">
                  {/* Founder Direct Email */}
                  <div className="flex items-center gap-3 text-slate-600 hover:text-slate-900 transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-red-50 border border-red-100 flex items-center justify-center text-red-600 shrink-0">
                      <Mail size={14} />
                    </div>
                    <div className="truncate">
                      <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide leading-none mb-0.5">
                        Direct Email Address
                      </span>
                      <a href="mailto:priyasahoo.2600@gmail.com" className="font-semibold text-slate-700 hover:text-red-600 transition-colors break-all">
                        priyasahoo.2600@gmail.com
                      </a>
                    </div>
                  </div>

                  {/* Founder Phone */}
                  <div className="flex items-center gap-3 text-slate-600 hover:text-slate-900 transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                      <Phone size={14} />
                    </div>
                    <div>
                      <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide leading-none mb-0.5">
                        Contact Number
                      </span>
                      <a href="tel:+918847857681" className="font-semibold text-slate-700 hover:text-blue-600 transition-colors">
                        +91 8847857681
                      </a>
                    </div>
                  </div>

                  {/* Operational HQ location */}
                  <div className="flex items-center gap-3 text-slate-600">
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                      <MapPin size={14} />
                    </div>
                    <div>
                      <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide leading-none mb-0.5">
                        Operational Headquarters
                      </span>
                      <span className="font-semibold text-slate-700">
                        Bhubaneswar, Odisha, India
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex gap-3">
                  <a
                    href="mailto:priyasahoo.2600@gmail.com"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl text-xs transition-colors shadow-sm"
                  >
                    <Mail size={12} />
                    Message Founder
                  </a>
                  <a
                    href="https://www.linkedin.com/in/priyabrata-sahoo-b19a31316/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 border border-slate-200 hover:bg-slate-50 text-slate-600 hover:text-slate-900 rounded-xl transition-colors"
                    aria-label="Founder Linkedin"
                  >
                    <Linkedin size={14} />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side: A Word from the Founder (Styled Letter) */}
          <motion.div
            variants={itemVariants}
            className="col-span-1 lg:col-span-7 flex flex-col"
          >
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 md:p-8 relative flex-1">
              <Quote className="absolute top-6 right-6 text-red-500/5 h-20 w-20 pointer-events-none" strokeWidth={1} />
              
              <Badge variant="primary" size="md" className="bg-red-500/10 text-red-700 border-red-200/50 mb-6">
                Direct Statement
              </Badge>

              <h3 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight leading-tight mb-6">
                A Word from the Founder
              </h3>

              {/* The founder letter paragraphs */}
              <div className="space-y-4 text-slate-600 text-xs sm:text-sm leading-relaxed font-sans">
                <p>
                  HemoTrack began with a simple but urgent observation: in critical healthcare moments, delays in coordination can create unnecessary stress for everyone involved. Hospitals, blood banks, transport teams, and administrators often work with fragmented information, limited visibility, and time-sensitive decisions. I wanted to build something that brings these moving parts together in a more transparent, organized, and accountable way.
                </p>
                <p>
                  As a solo founder, I started HemoTrack with the belief that healthcare logistics can be made smarter through better coordination, real-time visibility, and digital traceability. HemoTrack is designed as a compliance-first medical logistics platform that supports authorized stakeholders in managing blood requests, dispatch workflows, transport tracking, monitoring, and operational reporting through one unified system.
                </p>
                <p>
                  This is not just about technology—it is about building trust into critical operations. My goal with HemoTrack is to create a platform that helps institutions respond faster, work more efficiently, and maintain greater clarity across every stage of blood movement and coordination.
                </p>
                <p>
                  Thank you for visiting HemoTrack and being part of this journey toward safer, more connected, and more accountable healthcare logistics.
                </p>
              </div>

              {/* Founder Sign-off details */}
              <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h4 className="text-base font-black text-slate-900 leading-tight">
                    Priyabrata Sahoo
                  </h4>
                  <p className="text-xs text-slate-500 font-semibold tracking-wide uppercase mt-0.5">
                    Founder, HemoTrack
                  </p>
                </div>
                
                {/* Additional verification stamp */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-50 rounded-full border border-red-100">
                  <Shield size={12} className="text-red-600" />
                  <span className="text-[10px] font-bold text-red-700 uppercase tracking-wider">
                    Executive Desk
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Core Development & Design Leadership */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="mt-16 pt-12 border-t border-slate-150"
        >
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-[10px] font-bold text-red-600 uppercase tracking-widest block mb-1">
              Technology & Design
            </span>
            <h3 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
              Design & Interface Architecture
            </h3>
            <p className="text-xs text-slate-500 mt-2">
              Driving the development of accessible, compliant, and responsive healthcare interfaces.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 relative overflow-hidden shadow-sm hover:border-red-200 hover:shadow-md transition-all duration-300">
              <div className="absolute top-0 right-0 w-40 h-40 bg-red-50/20 rounded-full blur-3xl pointer-events-none" />
              <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
                {/* Stylized custom vector profile with initials - NO IMAGE as requested */}
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-red-500 via-rose-500 to-orange-500 flex items-center justify-center text-3xl font-black text-white shadow-md border border-red-400 shrink-0 relative">
                  SK
                  <div className="absolute -bottom-2 -right-2 bg-slate-950 text-[9px] font-black tracking-wider uppercase text-white px-2 py-0.5 rounded-full border border-red-400">
                    UI/UX
                  </div>
                </div>

                <div className="space-y-3 text-center md:text-left flex-1">
                  <div>
                    <h4 className="text-lg md:text-xl font-black text-slate-950">
                      Siddhi Kumari
                    </h4>
                    <p className="text-xs text-red-600 font-bold tracking-wide uppercase mt-0.5">
                      UI/UX & Frontend Developer
                    </p>
                  </div>

                  <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                    Siddhi directs the design strategy and frontend interface implementations for HemoTrack. She crafts highly interactive, intuitive, and accessible patient & stakeholder dashboards while ensuring responsive layouts, robust accessibility standards, and a modern, cohesive visual hierarchy.
                  </p>

                  <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-red-50 text-red-700 text-[10px] font-bold border border-red-100">
                      User Experience (UX)
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-orange-50/50 text-orange-700 text-[10px] font-bold border border-orange-100">
                      Frontend Engineering
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-50 text-slate-700 text-[10px] font-bold border border-slate-200">
                      Tailwind & React
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
