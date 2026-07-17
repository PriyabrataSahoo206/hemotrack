import { motion } from 'motion/react';
import { STAKEHOLDERS } from '../data/landing.data';
import { SectionHeading } from './shared/SectionHeading';
import { IconRenderer } from './shared/IconRenderer';
import { Check, ShieldCheck } from 'lucide-react';

export function StakeholdersSection() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <section
      id="stakeholders"
      className="py-16 md:py-24 bg-slate-50 relative overflow-hidden border-b border-slate-100 scroll-mt-6"
    >
      {/* Visual backgrounds */}
      <div className="absolute left-0 top-1/3 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          title="Built for Every Critical Stakeholder"
          subtitle="A successful medical logistics loop relies on synchronous execution between decentralized stakeholders. HemoTrack coordinates interactions with custom-tailored user views."
          badgeText="Roles & Access Roles"
        />

        {/* 5 columns of Role-based Access cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6"
        >
          {STAKEHOLDERS.map((stakeholder) => (
            <motion.div
              key={stakeholder.id}
              id={stakeholder.id}
              variants={cardVariants}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5.5 transition-all duration-300 flex flex-col justify-between hover:shadow-md"
            >
              <div>
                {/* Header Row */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-black text-blue-600 uppercase tracking-widest">
                    Role Tier
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center border border-slate-200/40">
                    <IconRenderer name={stakeholder.iconName} size={18} />
                  </div>
                </div>

                {/* Role Title and Tagline */}
                <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
                  {stakeholder.role}
                </h3>
                <p className="mt-2 text-xs text-slate-500 leading-normal mb-5 min-h-[44px]">
                  {stakeholder.tagline}
                </p>

                {/* Subtask / Responsibilities checklists */}
                <div className="border-t border-slate-100 pt-4 space-y-3">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Assigned Task Actions
                  </span>
                  <ul className="space-y-2.5">
                    {stakeholder.responsibilities.map((task, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="text-red-500 mt-0.5 w-4 h-4 flex-shrink-0" />
                        <span className="text-xs text-slate-700 leading-relaxed font-medium">
                          {task}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Unique Role Dashboard telemetry variables */}
              <div className="mt-6 pt-4 border-t border-slate-100 bg-slate-50/75 p-3 rounded-xl border border-slate-200/30">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-2">
                  Role SLA Metrics
                </span>
                <div className="grid grid-cols-2 gap-2 text-center text-[10px]">
                  {stakeholder.capabilities.map((cap, capIdx) => (
                    <div key={capIdx} className="bg-white rounded-md border border-slate-200/40 p-1.5 shadow-2xs">
                      <p className="text-slate-400 font-medium leading-none truncate">{cap.label}</p>
                      <p className="text-slate-900 font-extrabold mt-1">{cap.value}</p>
                    </div>
                  ))}
                </div>
                {/* Visual badge of audit safe */}
                <div className="mt-3 flex items-center gap-1 text-[9px] text-slate-500 font-semibold justify-center">
                  <ShieldCheck size={11} className="text-emerald-500" />
                  Role restricted permission
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
