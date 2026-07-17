import { motion } from 'motion/react';
import { MODULES } from '../data/landing.data';
import { SectionHeading } from './shared/SectionHeading';
import { IconRenderer } from './shared/IconRenderer';
import { Badge } from './shared/Badge';

export function ModulesSection() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  const getStatusBadge = (status: 'operational' | 'ready' | 'audit-ready') => {
    switch (status) {
      case 'operational':
        return (
          <Badge variant="success" size="sm" className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Active
          </Badge>
        );
      case 'ready':
        return (
          <Badge variant="secondary" size="sm" className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            Integrable
          </Badge>
        );
      case 'audit-ready':
        return (
          <Badge variant="primary" size="sm" className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
            Audit Secure
          </Badge>
        );
    }
  };

  return (
    <section
      id="modules"
      className="py-16 md:py-24 bg-white relative overflow-hidden border-b border-slate-100 scroll-mt-6"
    >
      {/* Visual background ambient glow vectors */}
      <div className="absolute right-0 top-10 w-96 h-96 bg-red-400/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          title="Platform Modules"
          subtitle="HemoTrack is built upon specialized, self-contained functional engines, ensuring compliance with strict healthcare-cybersecurity standards."
          badgeText="Modular System Infrastructure"
        />

        {/* Dynamic 8-Grid modules */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {MODULES.map((mod) => (
            <motion.div
              key={mod.id}
              id={mod.id}
              variants={cardVariants}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              className="bg-slate-50 hover:bg-white border border-slate-200/80 hover:border-slate-300 hover:shadow-md rounded-2xl p-5.5 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Module Metadata header */}
                <div className="flex items-center justify-between mb-5">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center border border-slate-200/20">
                    <IconRenderer name={mod.iconName} size={18} />
                  </div>
                  {getStatusBadge(mod.status)}
                </div>

                {/* Content Block */}
                <h4 className="text-base font-extrabold text-slate-900 tracking-tight">
                  {mod.title}
                </h4>
                <p className="mt-2.5 text-xs text-slate-500 leading-relaxed">
                  {mod.description}
                </p>
              </div>

              {/* Secure identifier label */}
              <div className="mt-5 pt-3.5 border-t border-slate-250/30 flex items-center justify-between text-[10px] font-mono text-slate-400">
                <span>MODULE UUID</span>
                <span>HMT_MOD_0{mod.id.charCodeAt(mod.id.length - 1) % 9}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
