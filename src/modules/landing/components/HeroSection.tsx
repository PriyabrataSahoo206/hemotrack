import React from 'react';
import { motion } from 'motion/react';
import { Play, ArrowRight, ShieldCheck, RefreshCw, Radio, Truck, Thermometer, Building, CheckCircle2, Heart } from 'lucide-react';
import { Badge } from './shared/Badge';
import { useNavigation } from '../context/NavigationContext';

export function HeroSection() {
  const { navigateTo } = useNavigation();


  return (
    <section
      id="home"
      className="relative pt-24 pb-16 md:pt-36 md:pb-24 bg-gradient-to-b from-slate-50 via-red-50/10 to-white overflow-hidden"
    >
      {/* Decorative Radial Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

      {/* Decorative Light Glows */}
      <div className="absolute -top-40 right-10 w-96 h-96 bg-red-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-20 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Hero copy panel */}
          <div className="col-span-1 lg:col-span-7 flex flex-col justify-center">
            {/* Soft Compliance Pilot Badge */}
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-1.5 px-3 py-1 mb-6 text-xs text-slate-800 font-semibold uppercase tracking-wider rounded-full bg-slate-100 border border-slate-200/80 w-fit"
            >
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
              </span>
              Operational Logistics Partner
            </motion.div>

            {/* Core Display Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-none"
            >
              Smarter Blood Logistics for{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-600 via-red-700 to-blue-600">
                Faster Emergency Coordination
              </span>
            </motion.h1>

            {/* Sub-headline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl"
            >
              HemoTrack helps hospitals, blood banks, delivery teams, and administrators coordinate blood requests, dispatch, tracking, and monitoring through one compliance-first digital platform.
            </motion.p>

            {/* Action buttons panel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-8 flex flex-col sm:flex-row flex-wrap gap-4 sm:items-center"
            >
              <button
                onClick={() => navigateTo('demo')}
                className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-2xl shadow-lg shadow-red-600/20 hover:shadow-xl hover:shadow-red-600/35 hover:-translate-y-0.5 transition-all duration-200 text-base cursor-pointer"
              >
                Request Demo
                <ArrowRight size={18} />
              </button>
              <button
                onClick={() => navigateTo('volunteer')}
                className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-red-50 text-red-700 hover:bg-red-100/80 font-semibold rounded-2xl border border-red-200/80 shadow-sm hover:shadow-md transition-all duration-200 text-base cursor-pointer"
              >
                Join as Volunteer
                <Heart size={18} className="text-red-600 animate-pulse" />
              </button>
              <button
                onClick={() => navigateTo('solution')}
                className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-white text-slate-800 border border-slate-200/80 hover:bg-slate-50 font-semibold rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 text-base cursor-pointer"
              >
                Explore Platform
                <Play className="fill-current text-slate-700" size={14} />
              </button>
            </motion.div>

            {/* Trust badges below CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="mt-10 pt-8 border-t border-slate-200/60"
            >
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                System Safeguards & Compliance
              </p>
              <div className="flex flex-wrap gap-2.5">
                <Badge variant="primary" size="sm" className="flex items-center gap-1">
                  <ShieldCheck size={13} />
                  Role-Based Access
                </Badge>
                <Badge variant="secondary" size="sm" className="flex items-center gap-1">
                  <Radio size={13} className="animate-pulse" />
                  Real-Time Visibility
                </Badge>
                <Badge variant="success" size="sm" className="flex items-center gap-1">
                  <CheckCircle2 size={13} />
                  Compliance-First Workflows
                </Badge>
              </div>
            </motion.div>
          </div>

          {/* Right Hero interactive visual dashboard */}
          <div className="col-span-1 lg:col-span-5 relative w-full flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full max-w-[460px] bg-slate-900 rounded-3xl shadow-2xl shadow-slate-900/50 border border-slate-800 p-5 font-sans text-slate-100 flex flex-col gap-4 relative"
            >
              {/* Inner subtle glow */}
              <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-white/5 to-transparent rounded-t-3xl pointer-events-none" />

              {/* Mock App Header */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                  <span className="text-xs font-bold tracking-widest uppercase text-slate-400">
                    Live Incident Map
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] bg-slate-800 px-2 py-1 rounded-md text-slate-300">
                  <RefreshCw size={10} className="animate-spin" />
                  Syncing: Live
                </div>
              </div>

              {/* Section 1: Live request telemetry card */}
              <div className="bg-slate-950/60 rounded-2xl border border-slate-800/80 p-3.5 flex flex-col gap-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400">Active Request #HMT-6029</span>
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-black uppercase bg-red-500/20 text-red-400 border border-red-500/30">
                    URGENT CRITICAL
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-slate-900/80 p-2 rounded-xl border border-slate-800/40">
                    <p className="text-[10px] text-slate-400 font-medium">Quantity requested</p>
                    <p className="text-base font-extrabold text-white mt-1">4 Units (O-Negative)</p>
                  </div>
                  <div className="bg-slate-900/80 p-2 rounded-xl border border-slate-800/40 text-right">
                    <p className="text-[10px] text-slate-400 font-medium">Recipient Facility</p>
                    <p className="text-xs font-bold text-white mt-1.5 truncate">Mercy Trauma Hub</p>
                  </div>
                </div>
              </div>

              {/* Section 2: Mock Route / Temperature widget */}
              <div className="bg-slate-950/60 rounded-2xl border border-slate-800/80 p-3.5 flex flex-col gap-3">
                <div className="flex items-center justify-between text-xs pb-1.5 border-b border-slate-800/40">
                  <div className="flex items-center gap-2 text-slate-300">
                    <Truck size={14} className="text-blue-400" />
                    <span className="font-semibold">Transit Route #TR-08</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">ETA: 11 mins</span>
                </div>

                {/* Vertical Process Timeline */}
                <div className="flex flex-col gap-2">
                  <div className="flex gap-2 items-center">
                    <div className="w-4 h-4 rounded-full bg-emerald-500/20 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    </div>
                    <div className="flex-1 text-[11px]">
                      <span className="font-bold text-slate-300">Hub Handover</span>
                      <span className="text-slate-500 text-[9px] ml-1.5">10:48 AM</span>
                    </div>
                  </div>
                  <div className="w-0.5 h-3 bg-emerald-500/30 ml-2" />
                  <div className="flex gap-2 items-center">
                    <div className="w-4 h-4 rounded-full bg-blue-500/20 flex items-center justify-center animate-pulse">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                    </div>
                    <div className="flex-1 text-[11px]">
                      <span className="font-bold text-blue-400">In Transit (Active)</span>
                      <span className="text-slate-400 text-[9px] ml-1.5">Sector 4 Expressway</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 3: Dual widget row */}
              <div className="grid grid-cols-2 gap-3">
                {/* Cold Chain Sensor Check */}
                <div className="bg-slate-950/60 rounded-2xl border border-slate-800/80 p-3 flex flex-col justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <Thermometer size={14} className="text-red-400" />
                    <span className="font-medium">Temp Sensor</span>
                  </div>
                  <div className="mt-2.5">
                    <span className="text-xl font-bold tracking-tight text-emerald-400">3.8°C</span>
                    <span className="text-[9px] block text-emerald-500 mt-0.5">✔ Normal Range</span>
                  </div>
                </div>

                {/* Stock Locator Check */}
                <div className="bg-slate-950/60 rounded-2xl border border-slate-800/80 p-3 flex flex-col justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <Building size={14} className="text-blue-400" />
                    <span className="font-medium">Blood Bank stocks</span>
                  </div>
                  <div className="mt-2.5">
                    <span className="text-lg font-bold text-white">9 Regional Hubs</span>
                    <span className="text-[9px] block text-slate-400 mt-0.5">Verify proximity availability</span>
                  </div>
                </div>
              </div>

              {/* Small Overlay Float - Safety Guarantee badge */}
              <div className="absolute -bottom-5 -right-4 bg-gradient-to-r from-red-600 to-blue-600 rounded-xl p-3 border border-white/10 shadow-lg text-xs flex items-center gap-2 max-w-[200px]">
                <ShieldCheck className="text-white flex-shrink-0" size={18} />
                <p className="font-semibold text-white leading-tight">
                  SLA monitored & compliant
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
