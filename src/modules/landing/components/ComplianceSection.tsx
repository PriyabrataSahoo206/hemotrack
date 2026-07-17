import { motion } from 'motion/react';
import { SectionHeading } from './shared/SectionHeading';
import { ShieldCheck, Lock, History, ClipboardCheck, Info } from 'lucide-react';

export function ComplianceSection() {
  const safeguards = [
    {
      id: 'safe-stakeholders',
      title: 'Authorized Institution Workflows',
      description: 'The platform integrates only with registered, credentialed hospitals, state-sponsored blood banks, and verified clinical couriers. Patient identity mapping is never made public.',
      icon: ShieldCheck,
      color: 'text-red-600 bg-red-50 border-red-150',
    },
    {
      id: 'safe-roles',
      title: 'Role-Based Authorization Bridges',
      description: 'Specific clinical task permissions ensure that doctors, courier dispatchers, and state-appointed assessors see only the logistics telemetry relevant to their function.',
      icon: Lock,
      color: 'text-blue-600 bg-blue-50 border-blue-150',
    },
    {
      id: 'safe-traces',
      title: 'Audit Trails & Cold-Chain Records',
      description: 'Continuous temperature tag logs, receipt stamps, and courier routing histories are stored securely, serving as compliant chain-of-custody outputs.',
      icon: History,
      color: 'text-emerald-600 bg-emerald-50 border-emerald-150',
    },
    {
      id: 'safe-records',
      title: 'Operational Records Integrity',
      description: 'Replaces scattered paper ledger spreadsheets with centralized log registries. Facilitates fast preparation of audit evidence during monthly state evaluation checks.',
      icon: ClipboardCheck,
      color: 'text-amber-600 bg-amber-50 border-amber-150',
    },
  ];

  return (
    <section
      id="safety"
      className="py-16 md:py-24 bg-white relative overflow-hidden scroll-mt-6"
    >
      {/* Visual layouts */}
      <div className="absolute right-0 top-0 w-80 h-80 bg-red-400/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          title="Built with Safety, Traceability, and Accountability"
          subtitle="Medical logistics requires strict oversight. HemoTrack implements strict structural guardrails to satisfy state healthcare regulations and system transparency demands."
          badgeText="Regulatory & Guarantees"
        />

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {safeguards.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                id={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.45, delay: idx * 0.1 }}
                className="flex items-start gap-4 p-6 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-slate-100/50 transition-colors duration-250"
              >
                <div className={`p-3 rounded-xl border flex-shrink-0 ${item.color}`}>
                  <Icon size={20} />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs md:text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* SECURE DISCLAIMER BLOCK */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-slate-900 text-slate-150 rounded-2xl border border-slate-800 p-6 md:p-8 flex items-start gap-4 shadow-xl"
        >
          <div className="p-2.5 rounded-xl bg-slate-800 text-red-500 border border-slate-700/80 flex-shrink-0">
            <Info size={20} />
          </div>
          <div className="text-left">
            <h4 className="text-sm font-black text-white uppercase tracking-wider mb-2">
              Legal Support Platform Disclaimer
            </h4>
            <p className="text-xs md:text-sm text-slate-400 leading-relaxed">
              HemoTrack is designed as a digital coordination and logistics support platform for authorized institutions and stakeholders. Medical decision-making, blood eligibility checkups, and regulatory compliance remain the sole responsibility of licensed entities, physicians, and respective regulatory authorities. HemoTrack does not sell blood products, act as a broker, or replace critical medical discretion.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
