import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SectionHeading } from './shared/SectionHeading';
import { Badge } from './shared/Badge';
import {
  Hospital,
  Building,
  Truck,
  ShieldCheck,
  PlusCircle,
  Thermometer,
  AlertTriangle,
  Clock,
  CheckCircle2,
  GitCommit,
  Layers,
  MapPin
} from 'lucide-react';

type PreviewTab = 'hospital' | 'bloodbank' | 'delivery' | 'admin';

export function DashboardPreviewSection() {
  const [activeTab, setActiveTab] = useState<PreviewTab>('hospital');

  const tabs = [
    { id: 'hospital' as PreviewTab, label: 'Hospital View', icon: Hospital },
    { id: 'bloodbank' as PreviewTab, label: 'Blood Bank View', icon: Building },
    { id: 'delivery' as PreviewTab, label: 'Delivery View', icon: Truck },
    { id: 'admin' as PreviewTab, label: 'Network Admin View', icon: ShieldCheck },
  ];

  return (
    <section
      id="dashboard-preview"
      className="py-16 md:py-24 bg-slate-50 relative overflow-hidden border-b border-slate-100"
    >
      {/* Decorative vectors */}
      <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-blue-400/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          title="Designed for Operational Clarity"
          subtitle="Experience the dedicated, role-specific interfaces engineered to eliminate guessing and accelerate critical responses."
          badgeText="Product Interface Simulator"
        />

        {/* Tab Selection Row */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2.5 px-5 py-3 rounded-xl text-xs md:text-sm font-bold border transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-slate-900 border-slate-900 text-white shadow-md shadow-slate-900/10'
                    : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300'
                }`}
              >
                <Icon size={16} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Dynamic Display area containing absolute dashboard mocks */}
        <div className="w-full max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            {activeTab === 'hospital' && (
              <motion.div
                key="hospital-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden"
              >
                {/* Simulated Header */}
                <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
                  <div className="flex items-center gap-3">
                    <Hospital size={18} className="text-red-500" />
                    <div>
                      <span className="font-extrabold text-sm tracking-tight block">HemoTrack Hospital Desk</span>
                      <span className="text-[10px] text-slate-400">Hub Location: Metro Trauma Unit C</span>
                    </div>
                  </div>
                  <Badge variant="primary" size="sm" className="flex items-center gap-1.5 bg-red-950/40 text-red-400 border-red-500/20">
                    <PlusCircle size={12} />
                    Raise Order
                  </Badge>
                </div>

                {/* Dashboard body grids */}
                <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Left Column stats */}
                  <div className="md:col-span-1 space-y-4">
                    <div className="bg-slate-50 border border-slate-200/60 p-4.5 rounded-2xl">
                      <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wide">Active Inbound Supplies</span>
                      <span className="text-3xl font-black text-slate-900 block mt-1">2 Shipments</span>
                    </div>

                    <div className="bg-slate-50 border border-slate-200/60 p-4.5 rounded-2xl">
                      <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wide">Daily Fulfilled Orders</span>
                      <span className="text-3xl font-black text-slate-900 block mt-1">14 Deliveries</span>
                    </div>

                    {/* Stock Alert Warning indicator */}
                    <div className="bg-amber-50/50 border border-amber-200/50 p-4 rounded-xl flex items-start gap-2.5">
                      <AlertTriangle className="text-amber-600 mt-0.5" size={16} />
                      <div>
                        <span className="text-xs font-bold text-amber-950 block">Inventory Warning Alert</span>
                        <span className="text-[11px] text-amber-800 leading-normal block mt-1">
                          O-Negative matching reserve is below 24h average regional baseline levels.
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column details list */}
                  <div className="md:col-span-2 space-y-4">
                    <div className="border border-slate-200/60 rounded-2xl overflow-hidden">
                      <div className="bg-slate-100/60 px-4 py-2.5 border-b border-slate-200/60 flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-700">Track Inbound Transport Pipelines</span>
                        <span className="text-[10px] font-bold text-slate-400 tracking-wider">SECURE LINK</span>
                      </div>

                      {/* Item Row 1 */}
                      <div className="p-4 border-b border-slate-100 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-red-100 flex items-center justify-center font-bold text-red-600 text-xs">
                            O-
                          </div>
                          <div>
                            <span className="text-xs font-bold text-slate-900 block">3x Whole Blood Units</span>
                            <span className="text-[10px] text-slate-500">Sender: Central Blood Depot</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant="secondary" size="sm" className="mb-1">In Transit</Badge>
                          <span className="text-[11px] text-slate-500 font-bold block">ETA ~9 Mins</span>
                        </div>
                      </div>

                      {/* Item Row 2 */}
                      <div className="p-4 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-600 text-xs">
                            A+
                          </div>
                          <div>
                            <span className="text-xs font-bold text-slate-900 block">2x Packed Red Cells</span>
                            <span className="text-[10px] text-slate-500">Sender: Regional Donor Center</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant="success" size="sm" className="mb-1">Accepted</Badge>
                          <span className="text-[10px] text-slate-400 font-semibold block">Delivered 10:32 AM</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'bloodbank' && (
              <motion.div
                key="bloodbank-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden"
              >
                {/* Simulated Header */}
                <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
                  <div className="flex items-center gap-3">
                    <Building size={18} className="text-blue-500" />
                    <div>
                      <span className="font-extrabold text-sm tracking-tight block">HemoTrack Bank Hub</span>
                      <span className="text-[10px] text-slate-400">Inventory Registry & Allocation System</span>
                    </div>
                  </div>
                  <Badge variant="success" size="sm">Hub Secured</Badge>
                </div>

                {/* Dashboard body grids */}
                <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-6">
                  {/* Left Column - Stock Volume levels */}
                  <div className="md:col-span-5 space-y-4">
                    <div className="bg-slate-50 border border-slate-200/60 p-5 rounded-2xl space-y-4">
                      <span className="text-xs font-black text-slate-900 block">Unallocated Stock Capacity (U)</span>

                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                            <span>O-Negative (Critical Need)</span>
                            <span>4 / 15 Units</span>
                          </div>
                          <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                            <div className="h-full bg-red-600 rounded-full" style={{ width: '27%' }} />
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                            <span>A-Positive (Safe Level)</span>
                            <span>12 / 15 Units</span>
                          </div>
                          <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500 rounded-full" style={{ width: '80%' }} />
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                            <span>B-Positive (Normal Level)</span>
                            <span>9 / 15 Units</span>
                          </div>
                          <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-400 rounded-full" style={{ width: '60%' }} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Incoming pending review requests */}
                  <div className="md:col-span-7 space-y-4">
                    <div className="border border-slate-200/60 rounded-2xl p-4 space-y-3">
                      <span className="text-xs font-black text-slate-900 block pb-1 border-b border-slate-100">
                        Pending Incoming Demands
                      </span>

                      {/* Request item */}
                      <div className="bg-red-50/20 border border-red-100 rounded-xl p-3 flex justify-between items-center">
                        <div>
                          <span className="text-xs font-bold text-slate-900 block">Request #REQ-882 (Urgent Trauma SOS)</span>
                          <span className="text-[10px] text-slate-500 block mt-0.5">Dest: St. Paul Cardiac Center</span>
                        </div>
                        <div className="flex gap-2">
                          <button className="px-2.5 py-1.5 bg-red-600 text-white font-bold text-[10px] rounded-lg">
                            Dispatch Ready
                          </button>
                        </div>
                      </div>

                      {/* Request item */}
                      <div className="bg-slate-50 border border-slate-200/40 rounded-xl p-3 flex justify-between items-center">
                        <div>
                          <span className="text-xs font-bold text-slate-700 block">Request #REQ-841 (Routine)</span>
                          <span className="text-[10px] text-slate-500 block mt-0.5">Dest: City Maternity Hub</span>
                        </div>
                        <span className="px-2 py-1 bg-slate-100 text-slate-500 text-[9px] font-black uppercase rounded-lg border border-slate-200">
                          Awaiting pickup
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'delivery' && (
              <motion.div
                key="delivery-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden"
              >
                {/* Simulated Header */}
                <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
                  <div className="flex items-center gap-3">
                    <Truck size={18} className="text-blue-500" />
                    <div>
                      <span className="font-extrabold text-sm tracking-tight block">HemoTrack Courier Tracker</span>
                      <span className="text-[10px] text-slate-400">Courier ID: Pilot-44R</span>
                    </div>
                  </div>
                  <Badge variant="warning" size="sm" className="bg-amber-950/40 text-amber-400 border-amber-500/20 flex items-center gap-1.5 font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                    On Route
                  </Badge>
                </div>

                {/* Dashboard body grids */}
                <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Left Column GPS / Position details */}
                  <div className="md:col-span-1 space-y-4">
                    <div className="bg-slate-50 border border-slate-200/60 p-4.5 rounded-2xl space-y-3.5">
                      <div>
                        <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wide">Transit ETA</span>
                        <span className="text-2xl font-black text-slate-900 block mt-0.5">14 Mins</span>
                      </div>

                      <div className="pt-3.5 border-t border-slate-200/60">
                        <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wide">Target Facility</span>
                        <span className="text-xs font-bold text-slate-700 block mt-0.5">St. Jude Trauma West</span>
                      </div>
                    </div>

                    {/* Cold chain status telemetry bar */}
                    <div className="bg-emerald-50/50 border border-emerald-200/50 p-4.5 rounded-2xl flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Thermometer className="text-emerald-600" size={18} />
                        <div>
                          <span className="text-sm font-bold text-emerald-950 block">Cold-Chain Status</span>
                          <span className="text-[10px] text-emerald-600">3.4°C (Normal)</span>
                        </div>
                      </div>
                      <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-200">
                        SECURE
                      </span>
                    </div>
                  </div>

                  {/* Right Column Step Tracking timeline */}
                  <div className="md:col-span-2 border border-slate-250/30 rounded-2xl p-5 space-y-4.5 bg-slate-950 text-white shadow-inner">
                    <span className="text-xs font-black text-slate-400 block pb-1 border-b border-slate-800">
                      Step Checklist & Handover
                    </span>

                    <div className="space-y-4.5 font-sans">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 size={16} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="text-xs font-bold text-slate-300 block">Match Verification Complete</span>
                          <span className="text-[10px] text-slate-500">Dual digital checkoffs stored</span>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <CheckCircle2 size={16} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="text-xs font-bold text-slate-300 block">Logistical Container Sealed</span>
                          <span className="text-[10px] text-slate-500">Digital tag binding executed</span>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-4 h-4 rounded-full bg-blue-500/20 border border-blue-500/50 flex items-center justify-center mt-0.5 animate-pulse flex-shrink-0">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                        </div>
                        <div>
                          <span className="text-xs font-bold text-blue-400 block">Fulfillment Cargo in Transit</span>
                          <span className="text-[10px] text-slate-400">Cellular coordinates updating every 5s</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'admin' && (
              <motion.div
                key="admin-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden"
              >
                {/* Simulated Header */}
                <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
                  <div className="flex items-center gap-3">
                    <ShieldCheck size={18} className="text-emerald-500" />
                    <div>
                      <span className="font-extrabold text-sm tracking-tight block">HemoTrack Admin Center</span>
                      <span className="text-[10px] text-slate-400">Total System Oversight Dashboard</span>
                    </div>
                  </div>
                  <Badge variant="primary" size="sm">OVERSIGHT MODE</Badge>
                </div>

                {/* Dashboard body grids */}
                <div className="p-6 space-y-6">
                  {/* Stats Summary row */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-slate-50 border border-slate-200/50 p-4 rounded-xl text-center">
                      <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wide">Registered Stations</span>
                      <span className="text-2xl font-black text-slate-900 block mt-1">42 Facilities</span>
                    </div>

                    <div className="bg-slate-50 border border-slate-200/50 p-4 rounded-xl text-center">
                      <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wide">Authorized Couriers</span>
                      <span className="text-2xl font-black text-slate-900 block mt-1">118 Drivers</span>
                    </div>

                    <div className="bg-slate-50 border border-slate-200/50 p-4 rounded-xl text-center">
                      <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wide">System SLA Performance</span>
                      <span className="text-2xl font-black text-emerald-600 block mt-1">99.85%</span>
                    </div>

                    <div className="bg-slate-50 border border-slate-200/50 p-4 rounded-xl text-center">
                      <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wide">Total Audited Travels</span>
                      <span className="text-2xl font-black text-slate-900 block mt-1">3,490 Trips</span>
                    </div>
                  </div>

                  {/* Operational status alerts row */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    {/* Live Incidents panel */}
                    <div className="md:col-span-7 border border-slate-230 rounded-2xl p-4.5 space-y-3">
                      <span className="text-xs font-black text-slate-900 block pb-2 border-b border-slate-100 flex items-center justify-between">
                        <span>Incident Log alerts (Live)</span>
                        <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                      </span>

                      <div className="flex gap-3 bg-red-50/20 border border-red-100 rounded-xl p-3 items-start">
                        <AlertTriangle className="text-red-500 flex-shrink-0 mt-0.5" size={16} />
                        <div>
                          <span className="text-xs font-bold text-red-950 block">Delay Alert: Route #TR-08</span>
                          <span className="text-[11px] text-red-800 leading-normal block mt-1">
                            Courier Pilot-19 slowed by congestion. Escalation route assigned automatically.
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Registry System Log checklist */}
                    <div className="md:col-span-5 bg-slate-900 text-white rounded-2xl p-4.5 space-y-3 shadow-inner">
                      <span className="text-xs font-black text-slate-400 block pb-1 border-b border-slate-800">
                        Cryptographic Audit Entries
                      </span>

                      <div className="space-y-3 font-mono text-[9px]">
                        <div className="flex items-center justify-between text-slate-400">
                          <span>CLOSE SHA-256 LOG</span>
                          <span className="text-emerald-400">SUCCESS</span>
                        </div>
                        <div className="flex items-center justify-between text-slate-400">
                          <span>CHECK SEAL VERIFY</span>
                          <span className="text-emerald-400">SUCCESS</span>
                        </div>
                        <div className="flex items-center justify-between text-slate-400">
                          <span>BLUETOOTH TAG BIND</span>
                          <span className="text-emerald-400">SUCCESS</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
