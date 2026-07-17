import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trophy, 
  Calendar, 
  MapPin, 
  Users, 
  Mail, 
  ArrowRight, 
  GraduationCap, 
  Heart, 
  Sparkles, 
  Clock, 
  Video, 
  Building2, 
  BookOpen, 
  HeartHandshake, 
  ArrowUpRight, 
  Check, 
  ChevronRight, 
  FileText,
  User,
  ShieldAlert,
  Info
} from 'lucide-react';

// Team members data from the PDF
const TEAM_MEMBERS = [
  {
    name: 'Priyabrata Sahoo',
    regNo: '2401020370',
    mobile: '+91 8847857681',
    branch: 'CSE(AIML)',
    group: '4',
    photo: '/founder_priyabrata_sahoo.jpg',
    role: 'Lead Ideator & Technical Architect',
    bio: 'Drives the overarching system architecture, algorithmic frameworks, and technical pathways for blood tracking.'
  },
  {
    name: 'Omprakash Sahoo',
    regNo: '2401021124',
    mobile: '+91 86588 18888',
    branch: 'CSE(AIML)',
    group: '11',
    photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200&h=200',
    role: 'Co-Ideator & UI/UX Specialist',
    bio: 'Designs compliance interfaces and seamless visual systems that translate high-stress situations into actionable UI layouts.'
  },
  {
    name: 'Sahil Aggarwal',
    regNo: '2401020573',
    mobile: '+91 62003 88338',
    branch: 'CSDS',
    group: '11',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200',
    role: 'Data Science & Analytics',
    bio: 'Specializes in mathematical optimization for route planning and real-time cold-chain decay models.'
  },
  {
    name: 'Kirtika Singh',
    regNo: '2401020017',
    mobile: '+91 7209093166',
    branch: 'CSE(Core)',
    group: '2',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200&h=200',
    role: 'Quality Standards & Compliance Specialist',
    bio: 'Spearheads verification models, regulatory frameworks alignment (FDA/ISO), and public-health integration strategies.'
  },
  {
    name: 'Ankita Meher',
    regNo: '2401020537',
    mobile: '+91 70085 97292',
    branch: 'CSE(DS)',
    group: '4',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200&h=200',
    role: 'Systems Analyst & Researcher',
    bio: 'Focuses on structural database schemas, compliance auditing requirements, and stakeholder-centric research.'
  }
];

const getInitials = (name: string) => {
  return name.split(' ').map(n => n[0]).join('');
};

export function JourneySection() {
  const [activeTab, setActiveTab] = useState<'overview' | 'team' | 'emails' | 'grandfinale'>('overview');
  const [selectedMember, setSelectedMember] = useState<typeof TEAM_MEMBERS[0]>(TEAM_MEMBERS[0]);
  const [presentationImage, setPresentationImage] = useState('/Screenshot 2026-06-24 233726.png');

  return (
    <section className="bg-slate-50 min-h-screen py-12 md:py-20 text-slate-800" id="journey-portal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Indicator / Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-red-50 border border-red-100 rounded-full text-red-600 text-xs font-bold uppercase tracking-wider mb-4"
          >
            <Trophy className="w-4.5 h-4.5 animate-bounce text-red-600" />
            IIT Delhi Youth Ideathon Top 100 Innovation
          </motion.div>
          
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-none">
            Our Journey: <span className="text-red-600 bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent">Raktsetu to HemoTrack</span>
          </h1>
          
          <p className="mt-4 text-sm md:text-base text-slate-500 font-medium leading-relaxed">
            From an award-winning student prototype at the prestigious National Youth Ideathon 2025 to a production-ready enterprise compliance ecosystem. Discover our origin, our team, and our milestones.
          </p>
        </div>

        {/* Dynamic Category Selector Menu */}
        <div className="flex flex-wrap justify-center gap-2 mb-12" id="journey-tabs">
          {[
            { id: 'overview', label: '1. Genesis & Context', icon: BookOpen },
            { id: 'team', label: '2. The Team (Technum)', icon: Users },
            { id: 'emails', label: '3. National Selection (Emails)', icon: Mail },
            { id: 'grandfinale', label: '4. IIT Delhi Grand Finale', icon: Trophy },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-extrabold transition-all border duration-200 cursor-pointer ${
                  isActive 
                    ? 'bg-red-600 border-red-600 text-white shadow-lg shadow-red-600/20 -translate-y-0.5' 
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content Panels */}
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              {/* Left Column: Story text */}
              <div className="lg:col-span-7 space-y-6">
                <div className="p-6 bg-white border border-slate-100 rounded-3xl shadow-sm">
                  <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2 mb-3">
                    <Sparkles className="w-5 h-5 text-red-500" />
                    Introduction
                  </h3>
                  <p className="text-xs md:text-sm text-slate-500 font-medium leading-relaxed">
                    The College Youth Ideathon Grand Finale, held on <strong>April 5th and 6th, 2025</strong>, at the prestigious <strong>IIT Delhi</strong>, brought together the top 100 student teams from across the country. It was an incredible honor for our team to be selected for this grand platform, where creativity, innovation, and impactful ideas were celebrated. Representing our institution in such a competitive and inspiring environment was a proud moment for each of us.
                  </p>
                </div>

                <div className="p-6 bg-white border border-slate-100 rounded-3xl shadow-sm">
                  <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2 mb-3">
                    <Building2 className="w-5 h-5 text-slate-500" />
                    About The Event
                  </h3>
                  <p className="text-xs md:text-sm text-slate-500 font-medium leading-relaxed">
                    The Ideathon is a nationwide initiative aimed at identifying and nurturing innovative minds among college students. Organized annually, the event provides a platform for young individuals to present their entrepreneurial and social innovation ideas. The 2025 edition witnessed overwhelming participation from various colleges and universities, culminating in a grand finale hosted at <strong>IIT Delhi’s Lecture Hall Complex</strong>.
                  </p>
                </div>

                <div className="p-6 bg-gradient-to-br from-red-600 to-rose-700 rounded-3xl shadow-lg shadow-red-500/10 text-white">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                      <Trophy className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="text-base font-extrabold">Originating as Raktsetu</h3>
                  </div>
                  <p className="text-xs text-red-50 font-medium leading-relaxed">
                    Before HemoTrack was built into a high-scale React system with cryptographic validation, our core model was christened <strong>Raktsetu</strong> ("The Blood Bridge"). Focused on the fundamental problem of critical transit delays, Raktsetu stood out due to its actionable cold-chain sensor models and real-time transit telemetry, winning national honors.
                  </p>
                </div>
              </div>

              {/* Right Column: Visual Poster Mockup representation */}
              <div className="lg:col-span-5 space-y-6">
                {/* Raktsetu App Poster Recreated in Beautiful SVG/CSS */}
                <div className="p-1 bg-gradient-to-b from-red-500 to-rose-700 rounded-3xl shadow-xl overflow-hidden relative group">
                  <div className="bg-slate-900 rounded-[22px] p-6 text-white relative overflow-hidden aspect-[3/4] flex flex-col justify-between">
                    
                    {/* SVG Futuristic Grid Overlay */}
                    <div className="absolute inset-0 opacity-15 pointer-events-none">
                      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                          <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
                            <path d="M 30 0 L 0 0 0 30" fill="none" stroke="currentColor" strokeWidth="0.5" />
                          </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#grid)" />
                      </svg>
                    </div>

                    {/* Outer Glow Lights */}
                    <div className="absolute -top-12 -left-12 w-32 h-32 bg-red-600 rounded-full blur-[80px]" />
                    <div className="absolute -bottom-16 -right-16 w-36 h-36 bg-red-500 rounded-full blur-[90px]" />

                    {/* Logo/Tech Name Panel */}
                    <div className="relative flex justify-between items-start">
                      <div>
                        <span className="text-[10px] font-bold text-red-500 tracking-widest uppercase block">
                          Technum Presents
                        </span>
                        <h2 className="text-2xl font-black tracking-tight mt-0.5 font-sans">
                          RAKTSETU
                        </h2>
                      </div>
                      <div className="px-2 py-0.5 rounded bg-red-600/20 border border-red-500/30 text-[8px] font-bold tracking-widest text-red-400 font-mono uppercase">
                        Version 1.0 Alpha
                      </div>
                    </div>

                    {/* Central Glowing Shield Droplet Visualization */}
                    <div className="relative flex flex-col items-center justify-center my-auto py-4">
                      {/* Interactive pulse rings */}
                      <div className="absolute w-36 h-36 rounded-full border border-red-600/30 animate-ping" />
                      <div className="absolute w-24 h-24 rounded-full bg-red-600/10 border border-red-500/20" />
                      
                      {/* Blood Droplet with ECG Wave integrated inside Shield */}
                      <div className="relative w-20 h-20 bg-gradient-to-b from-red-500 to-rose-600 rounded-full flex items-center justify-center shadow-lg shadow-red-500/40 border border-red-400">
                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                        <div className="absolute bottom-2 font-mono text-[8px] font-black tracking-widest text-white/80">
                          S.O.S
                        </div>
                      </div>

                      {/* Waveform below droplet */}
                      <svg className="w-28 h-8 text-red-500/80 mt-4" viewBox="0 0 100 25" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M0,12.5 L30,12.5 L35,5 L40,20 L45,12.5 L100,12.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>

                    {/* Slogan & Info Footer */}
                    <div className="relative border-t border-slate-800/80 pt-3 flex items-end justify-between">
                      <div>
                        <span className="text-[10px] font-semibold text-slate-400 tracking-wider block">
                          SYSTEM DIRECTIVE
                        </span>
                        <p className="text-xs font-bold text-white tracking-tight mt-0.5">
                          Saving Life By Saving Time
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-[8px] font-mono text-red-400 uppercase tracking-widest block">
                          Ideathon Finalist
                        </span>
                        <span className="text-[10px] font-bold font-mono text-slate-200">
                          IIT Delhi
                        </span>
                      </div>
                    </div>

                  </div>
                </div>
                <div className="text-center">
                  <p className="text-[11px] text-slate-400 font-mono italic">
                    Original Concept Poster: "Raktsetu - Saving Life by Saving Time" (Represented as a live high-tech vector component)
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'team' && (
            <motion.div
              key="team"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-12"
            >
              {/* College & Team Details Card */}
              <div className="bg-slate-900 text-white rounded-3xl p-6 md:p-8 border border-slate-800 relative overflow-hidden shadow-xl flex flex-col md:flex-row gap-6 justify-between items-center">
                <div className="absolute -top-16 -right-16 w-36 h-36 bg-blue-600/10 rounded-full blur-[60px]" />
                <div className="absolute -bottom-16 -left-16 w-36 h-36 bg-red-600/10 rounded-full blur-[60px]" />
                
                <div className="space-y-2 relative text-center md:text-left">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-red-500/15 border border-red-500/20 text-red-400 rounded-lg text-[10px] font-black uppercase tracking-wider">
                    Our Identity
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black">TEAM TECHNUM</h2>
                  <p className="text-xs text-slate-400 font-medium">
                    Sponsered & Sponsored by <strong>C.V. Raman Global University, Bhubaneswar</strong>
                  </p>
                  <p className="text-[11px] text-slate-500 font-mono uppercase tracking-wider">
                    UID: CYIF20890 • CITY: BHUBANESWAR
                  </p>
                </div>

                <div className="flex flex-col items-center md:items-end gap-2 relative">
                  <span className="text-xs text-slate-400 font-bold tracking-widest uppercase">
                    Innovators Poster Showcase
                  </span>
                  <div className="flex gap-1 flex-wrap justify-center md:justify-end">
                    {TEAM_MEMBERS.map((member) => (
                      <button
                        key={member.name}
                        onClick={() => setSelectedMember(member)}
                        className={`w-10 h-10 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all duration-200 cursor-pointer ${
                          selectedMember.name === member.name 
                            ? 'border-red-500 bg-red-600 text-white scale-110 shadow-lg shadow-red-500/20' 
                            : 'border-slate-700 bg-slate-800 text-slate-300 hover:border-slate-500 hover:text-white'
                        }`}
                        title={member.name}
                      >
                        {getInitials(member.name)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Individual Poster representation & Bio */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left: Bio & Details of Selected Member */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="bg-white border border-slate-150 rounded-3xl p-6 shadow-sm space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center text-lg font-black text-white shadow-sm border border-red-400">
                        {getInitials(selectedMember.name)}
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-red-600 uppercase tracking-widest block mb-0.5">
                          {selectedMember.role}
                        </span>
                        <h3 className="text-xl font-black text-slate-900">
                          {selectedMember.name}
                        </h3>
                        <p className="text-xs text-slate-500 font-bold">
                          {selectedMember.branch} • CV Raman Global University
                        </p>
                      </div>
                    </div>

                    <p className="text-xs md:text-sm text-slate-600 font-medium leading-relaxed italic bg-slate-50 p-4 rounded-2xl border border-slate-100">
                      "{selectedMember.bio}"
                    </p>

                    {/* Metadata Specs Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Registration No</span>
                        <span className="text-xs font-bold text-slate-800 font-mono mt-0.5 block">{selectedMember.regNo}</span>
                      </div>
                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Group Assignment</span>
                        <span className="text-xs font-bold text-slate-800 font-mono mt-0.5 block">Group #{selectedMember.group}</span>
                      </div>
                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Ideathon Status</span>
                        <span className="text-xs font-bold text-emerald-600 font-semibold mt-0.5 block flex items-center gap-1">
                          <Check className="w-3 h-3 text-emerald-500 stroke-[3]" /> Top 100
                        </span>
                      </div>
                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Project Branch</span>
                        <span className="text-xs font-bold text-slate-800 mt-0.5 block">{selectedMember.branch.replace("CSE", "") || "Core"}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: The exact Individual Poster mockup as per page 2-4 */}
                <div className="lg:col-span-5 flex justify-center">
                  <div className="p-1 bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 rounded-[32px] shadow-2xl overflow-hidden relative w-full max-w-sm aspect-[3/4]">
                    
                    {/* Animated background highlights */}
                    <div className="absolute inset-0 bg-slate-950 text-white flex flex-col justify-between p-6 overflow-hidden">
                      <div className="absolute -top-16 -right-16 w-32 h-32 bg-purple-500/20 rounded-full blur-[40px]" />
                      <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-indigo-500/20 rounded-full blur-[40px]" />
                      
                      {/* Ribbon / Top Label */}
                      <div className="relative text-center border-b border-white/10 pb-3">
                        <span className="text-[11px] font-black text-indigo-300 tracking-wider uppercase block">
                          A PROUD MEMBER OF INDIA'S
                        </span>
                        <h3 className="text-sm font-black text-white tracking-widest mt-0.5 uppercase">
                          TOP 1000 STUDENT INNOVATORS!
                        </h3>
                      </div>

                      {/* Stylized Avatar / Centered Shield */}
                      <div className="relative flex flex-col items-center my-auto">
                        <div className="relative w-36 h-36 rounded-full p-1 bg-gradient-to-tr from-purple-500 to-pink-500 shadow-xl flex items-center justify-center">
                          <div className="w-full h-full rounded-full bg-slate-900 border-4 border-slate-900 flex items-center justify-center">
                            <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-tr from-purple-400 to-pink-400">
                              {getInitials(selectedMember.name)}
                            </span>
                          </div>
                        </div>

                        <div className="mt-4 text-center">
                          <h2 className="text-lg font-black tracking-tight uppercase text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-orange-300 to-pink-300">
                            {selectedMember.name}
                          </h2>
                          <p className="text-[9px] font-extrabold text-slate-300 tracking-wider mt-0.5">
                            C.V. RAMAN GLOBAL UNIVERSITY
                          </p>
                          <p className="text-[10px] font-black text-indigo-400 mt-1 uppercase tracking-widest">
                            Nayi Soch, Naya Bharat
                          </p>
                        </div>
                      </div>

                      {/* Event Sponsors Panel in Footer */}
                      <div className="relative border-t border-white/10 pt-3 flex items-center justify-between text-[7px] text-slate-400 font-mono tracking-widest uppercase">
                        <span className="flex items-center gap-1 font-sans text-[8px] font-extrabold text-slate-300">
                          <span className="w-2 h-2 rounded-full bg-blue-500 inline-block" /> SBI
                        </span>
                        <span className="font-semibold">MEPSC</span>
                        <span className="font-semibold">THINK STARTUP</span>
                        <span className="flex items-center gap-0.5 font-sans text-[8px] font-extrabold text-slate-300">
                          IIT Delhi
                        </span>
                      </div>

                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          )}

          {activeTab === 'emails' && (
            <motion.div
              key="emails"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
              {/* Congratulations Email 1 (Round 2 Selection) */}
              <div className="bg-white border border-slate-150 rounded-3xl p-5 md:p-6 shadow-sm flex flex-col justify-between">
                <div>
                  {/* Email header details */}
                  <div className="flex justify-between items-start border-b border-slate-100 pb-3 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center font-bold text-sm">
                        M
                      </div>
                      <div>
                        <h4 className="text-xs font-black text-slate-900">Mansi Jain</h4>
                        <p className="text-[10px] text-slate-400 font-medium">
                          &lt;mansi@thinkstartup.in&gt; to priyasahoo.26...
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono bg-slate-50 px-2 py-0.5 rounded border">
                      Fri, 7 Mar, 2025 • 9:40 pm
                    </span>
                  </div>

                  {/* Email body text */}
                  <div className="space-y-3 text-xs md:text-sm text-slate-600 font-medium leading-relaxed">
                    <div className="font-bold text-slate-900 text-sm flex items-center gap-1.5 text-orange-600 mb-1">
                      🎉 Congratulations on Making it to Round 2!
                    </div>
                    <p>We are excited to announce that you have been selected for the <strong>2nd round</strong>!</p>
                    <p>A big congratulations to all the selected participants! Your hard work and dedication have truly stood out. 🌟</p>
                    <p className="text-[11px] bg-slate-50 p-2.5 rounded-xl border border-slate-100 font-mono text-slate-500">
                      🔗 Results URL: <a href="https://youthideathon.in/college-youth-ideathon-results/" className="text-red-500 underline">youthideathon.in/results</a>
                    </p>
                    <p>Wishing you all the best for the journey ahead! 🚀</p>
                    <p className="text-slate-400 text-[10px] mt-4 font-mono leading-none">
                      Team College Youth Ideathon<br />9873474756
                    </p>
                  </div>
                </div>

                <div className="border-t border-slate-100 mt-5 pt-3 text-[10px] text-slate-400 font-mono flex items-center gap-1">
                  <Info className="w-3.5 h-3.5 text-slate-400" /> Verify: College Youth Ideathon Round 2 Admission Notice
                </div>
              </div>

              {/* Congratulations Email 2 (Top 100 Selection) */}
              <div className="bg-white border border-slate-150 rounded-3xl p-5 md:p-6 shadow-sm flex flex-col justify-between">
                <div>
                  {/* Email header details */}
                  <div className="flex justify-between items-start border-b border-slate-100 pb-3 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-red-50 text-red-600 flex items-center justify-center font-bold text-sm">
                        M
                      </div>
                      <div>
                        <h4 className="text-xs font-black text-slate-900">Mansi Jain</h4>
                        <p className="text-[10px] text-slate-400 font-medium">
                          &lt;mansi@thinkstartup.in&gt; to kirtika.singh...
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono bg-slate-50 px-2 py-0.5 rounded border">
                      Fri, 21 Mar, 2025 • 1:00 pm
                    </span>
                  </div>

                  {/* Email body text */}
                  <div className="space-y-3 text-xs md:text-sm text-slate-600 font-medium leading-relaxed">
                    <div className="font-bold text-slate-900 text-sm flex items-center gap-1.5 text-red-600 mb-1">
                      🏆 Congratulations on Making it to the TOP 100!
                    </div>
                    <p>We are thrilled to announce that you have been selected among the <strong>TOP 100 teams</strong> for the <strong>College Youth Ideathon Grand Finale</strong>.</p>
                    <p>A huge congratulations to all the selected participants! Your hard work, creativity, and dedication have truly set you apart.</p>
                    <p className="text-[11px] bg-slate-50 p-2.5 rounded-xl border border-slate-100 font-mono text-slate-500">
                      📍 Venue: IIT Delhi (Lecture Hall Complex)<br />
                      📅 Dates: 5th and 6th April 2025<br />
                      ⏰ Time: 08:00 AM both days
                    </p>
                    <p>Wishing you all the best for the exciting journey ahead. Let's make a real difference! 🚀</p>
                  </div>
                </div>

                <div className="border-t border-slate-100 mt-5 pt-3 text-[10px] text-slate-400 font-mono flex items-center gap-1">
                  <Info className="w-3.5 h-3.5 text-slate-400" /> Verify: National Finalist Official Confirmation Code
                </div>
              </div>

              {/* 3 Change Makers Posters representation at the bottom */}
              <div className="lg:col-span-2 mt-4 space-y-4">
                <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest text-center">
                  National "100 Change Makers" Elite Certificates
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {[
                    { name: 'Priyabrata Sahoo', desc: 'System Architect', color: 'from-red-600 to-rose-600' },
                    { name: 'Omprakash Sahoo', desc: 'UI/UX Specialist', color: 'from-blue-600 to-indigo-600' },
                    { name: 'Siddhi Kumari', desc: 'UI/UX & Frontend Developer', color: 'from-purple-600 to-fuchsia-600' },
                    { name: 'Sahil Aggarwal', desc: 'Data Analytics', color: 'from-teal-600 to-emerald-600' },
                    { name: 'Kirtika Singh', desc: 'Compliance Specialist', color: 'from-orange-500 to-rose-500' },
                    { name: 'Ankita Meher', desc: 'Operations Lead', color: 'from-pink-600 to-red-600' }
                  ].map((cm) => (
                    <div 
                      key={cm.name}
                      className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 text-white border border-slate-800 text-center relative overflow-hidden group shadow-md flex flex-col justify-between"
                    >
                      <div className="absolute top-0 right-0 w-16 h-16 bg-red-600/10 rounded-full blur-xl group-hover:scale-150 transition-all" />
                      <div>
                        <div className="w-10 h-10 rounded-full bg-red-600/20 border border-red-500/30 flex items-center justify-center mx-auto mb-3">
                          <Trophy className="w-5 h-5 text-red-500" />
                        </div>
                        <span className="text-[8px] font-black text-red-400 uppercase tracking-widest block mb-1">
                          100 Change Makers
                        </span>
                        <h5 className="text-xs font-black text-white uppercase tracking-tight">{cm.name}</h5>
                        <p className="text-[9px] text-slate-400 font-semibold mt-1">{cm.desc}</p>
                      </div>
                      <div className="mt-3.5 px-2.5 py-0.5 rounded bg-white/5 border border-white/10 text-[7px] font-mono tracking-widest uppercase text-slate-300 inline-block">
                        SBI Youth Ideathon 2025
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'grandfinale' && (
            <motion.div
              key="grandfinale"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-8"
            >
              {/* Grand Finale Experience */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-7 space-y-6">
                  <div className="bg-white border border-slate-150 rounded-3xl p-6 shadow-sm">
                    <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2 mb-3">
                      <Trophy className="w-5 h-5 text-red-600" />
                      The Grand Finale Experience
                    </h3>
                    <p className="text-xs md:text-sm text-slate-500 font-medium leading-relaxed">
                      The atmosphere at <strong>IIT Delhi</strong> was electric. On both days, from 8:00 AM onward, sessions included keynote speeches by industry leaders, workshops on design thinking, startup mentoring, and project presentations. We had the opportunity to present our idea before esteemed judges, receive live feedback, and connect with like-minded peers.
                    </p>
                  </div>

                  <div className="bg-white border border-slate-150 rounded-3xl p-6 shadow-sm">
                    <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2 mb-3">
                      <FileText className="w-5 h-5 text-indigo-600" />
                      Project Presentation & Feedback
                    </h3>
                    <p className="text-xs md:text-sm text-slate-500 font-medium leading-relaxed">
                      The panel appreciated our innovative approach and the detailed research behind our solution. We also received valuable insights on scalability and implementation, which we plan to incorporate in the future. The interactive session helped us view our idea from multiple perspectives.
                    </p>
                  </div>
                </div>

                {/* Right side: Realistic mockup of the team presentation photo & Raktsetu logo */}
                <div className="lg:col-span-5 space-y-6">
                  {/* Styled presentation team photograph mockup */}
                  <div className="p-4 bg-white border border-slate-200 rounded-3xl shadow-lg relative overflow-hidden group">
                    <div className="bg-slate-100 rounded-2xl aspect-[16/10] overflow-hidden relative flex items-center justify-center text-slate-400">
                      {/* Photo representing the team on stage */}
                      <img
                        src={presentationImage}
                        onError={() => {
                          // Fallback to a high-quality relevant stock stage image if local file is not found
                          setPresentationImage('https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1000&q=80');
                        }}
                        alt="National Finals Presentation • Team Technum"
                        referrerPolicy="no-referrer"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                      />
                      
                      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/30 via-transparent to-slate-900/40 z-5" />
                      
                      {/* Interactive Visual Overlay mimicking physical photo */}
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/85 to-transparent p-4 text-white z-10">
                        <span className="text-[9px] font-black text-red-400 uppercase tracking-widest block mb-0.5">
                          IIT Delhi Auditorium Stage
                        </span>
                        <h4 className="text-xs font-black">National Finals Presentation • Team Technum</h4>
                        <p className="text-[10px] text-slate-300 font-semibold leading-normal mt-0.5">
                          Receiving official finalist certificates from the National MEPSC & Think Startup Board.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Collaborative Meeting & Learning Section */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-5">
                  {/* Google Meet Interface Mockup */}
                  <div className="p-3 bg-slate-950 text-white rounded-3xl border border-slate-800 shadow-2xl overflow-hidden aspect-[16/10] flex flex-col justify-between">
                    <div className="flex items-center justify-between border-b border-white/5 pb-2 text-[8px] font-mono text-slate-400">
                      <span className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-ping" />
                        REC • nzt-aaoc-nww
                      </span>
                      <span>HemoTrack Development Scrum</span>
                    </div>

                    {/* Google Meet User Video Grid */}
                    <div className="grid grid-cols-3 gap-2 py-3 my-auto">
                      {[
                        { name: 'Priyabrata', status: 'Speaking' },
                        { name: 'Kirtika', status: 'Muted' },
                        { name: 'Omprakash', status: 'Muted' },
                        { name: 'Sahil', status: 'Muted' },
                        { name: 'Ankita', status: 'Muted' },
                        { name: 'University Lab', status: 'Muted' },
                      ].map((u) => (
                        <div key={u.name} className="bg-white/5 rounded-xl p-2 border border-white/10 relative overflow-hidden text-center aspect-[4/3] flex flex-col items-center justify-center">
                          <div className="w-7 h-7 rounded-full bg-slate-800 flex items-center justify-center text-[10px] font-extrabold text-white uppercase shadow border border-white/15">
                            {u.name.substring(0, 1)}
                          </div>
                          <span className="text-[8px] font-bold mt-1.5 block leading-none">{u.name}</span>
                          <span className={`text-[6px] font-mono mt-0.5 px-1 py-0.2 rounded leading-none ${u.status === 'Speaking' ? 'bg-red-500 text-white' : 'bg-white/5 text-slate-400'}`}>
                            {u.status}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Meet Action Bar */}
                    <div className="flex justify-center gap-1.5 border-t border-white/5 pt-2">
                      <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center"><Video className="w-2.5 h-2.5" /></div>
                      <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-[8px] font-bold">End</div>
                    </div>
                  </div>
                  <div className="text-center mt-2">
                    <p className="text-[11px] text-slate-400 font-mono italic">
                      Google Meet Collaboration Interface (Represented in live responsive UI layout)
                    </p>
                  </div>
                </div>

                <div className="lg:col-span-7 space-y-6">
                  <div className="bg-white border border-slate-150 rounded-3xl p-6 shadow-sm">
                    <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2 mb-3">
                      <HeartHandshake className="w-5 h-5 text-red-500" />
                      Learning & Growth
                    </h3>
                    <p className="text-xs md:text-sm text-slate-500 font-medium leading-relaxed">
                      Participating in the Ideathon helped us enhance our skills in problem-solving, teamwork, and public speaking. It also encouraged us to think critically about real-world issues and explore practical solutions. The exposure and networking at the event were invaluable, and the mentorship we received added significantly to our learning.
                    </p>
                  </div>

                  <div className="bg-white border border-slate-150 rounded-3xl p-6 shadow-sm">
                    <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2 mb-3">
                      <Building2 className="w-5 h-5 text-slate-500" />
                      Role of C.V. Raman Global University
                    </h3>
                    <p className="text-xs md:text-sm text-slate-500 font-medium leading-relaxed">
                      We are deeply thankful to <strong>C.V. Raman Global University</strong>, our parent institution, for sponsoring our travel expenses to attend the event. Their generous support made it possible for us to participate in the Grand Finale without financial constraints. Their belief in our potential and encouragement throughout the journey has been truly motivating.
                    </p>
                  </div>
                </div>
              </div>

              {/* Reflections & Gratitude */}
              <div className="p-6 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 rounded-[2rem] border border-slate-800 text-white relative overflow-hidden shadow-xl">
                <div className="absolute top-0 right-0 w-48 h-48 bg-red-600/5 rounded-full blur-[80px]" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-600/5 rounded-full blur-[80px]" />

                <div className="max-w-3xl mx-auto text-center space-y-4 relative">
                  <span className="text-[10px] font-black text-red-400 uppercase tracking-widest block">
                    Reflections & Conclusion
                  </span>
                  <h3 className="text-xl md:text-2xl font-black">"A Milestone in Our Innovation Journey"</h3>
                  <p className="text-xs md:text-sm text-slate-400 font-medium leading-relaxed">
                    This experience will always remain a milestone in our academic journey. It was not just about competition but also about innovation, collaboration, and personal growth. We made memories, learned immensely, and built connections that will last a lifetime.
                  </p>
                  <p className="text-xs md:text-sm text-slate-400 font-medium leading-relaxed">
                    In conclusion, the College Youth Ideathon Grand Finale was an unforgettable experience that shaped our perspectives and broadened our horizons. We thank C.V. Raman Global University for their continuous support and encouragement. We look forward to more such opportunities where we can continue to learn, grow, and contribute meaningfully to society.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
