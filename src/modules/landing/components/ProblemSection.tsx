import { motion } from 'motion/react';
import { PROBLEMS } from '../data/landing.data';
import { SectionHeading } from './shared/SectionHeading';
import { IconRenderer } from './shared/IconRenderer';

export function ProblemSection() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <section
      id="problem"
      className="py-16 md:py-24 bg-white border-y border-slate-100 relative overflow-hidden"
    >
      {/* Background visual asset */}
      <div className="absolute right-0 bottom-0 w-80 h-80 bg-red-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          title="Why HemoTrack Matters"
          subtitle="Legacy blood movement workflows depend on legacy tools. The challenges of manual logistics introduce unacceptable coordination overheads when minutes determine lives."
          badgeText="The Operational Friction"
        />

        {/* Highlight Banner / Friction summary */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="mb-12 bg-red-50/50 border border-red-100 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
        >
          <div className="max-w-2xl">
            <h3 className="text-lg font-bold text-red-950">
              The Reality: Manual Operations Introduce Unacceptable Risk
            </h3>
            <p className="mt-1.5 text-sm md:text-base text-red-900/80 leading-relaxed">
              Every logistics breakdown, untracked delivery van, or temperature breach wastes valuable institutional resources, creates severe friction for dispatchers, and complicates state audit requirements.
            </p>
          </div>
          <div className="flex-shrink-0 bg-red-600 text-white font-extrabold px-4.5 py-2.5 rounded-xl text-sm tracking-wide">
            Critical Bottlenecks Identified
          </div>
        </motion.div>

        {/* 4 Problem cards grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {PROBLEMS.map((problem, idx) => (
            <motion.div
              key={problem.id}
              id={problem.id}
              variants={cardVariants}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="bg-slate-50 hover:bg-slate-100/70 border border-slate-200/60 hover:border-slate-300 rounded-2xl p-6.5 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-red-100/80 text-red-600 flex items-center justify-center mb-6 border border-red-200/30">
                  <IconRenderer name={problem.iconName} size={22} />
                </div>
                <h4 className="text-lg font-bold text-slate-900 tracking-tight">
                  <span className="text-red-500 font-mono text-sm block mb-1">0{idx + 1}.</span>
                  {problem.title}
                </h4>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                  {problem.description}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200/50 flex items-center gap-1.5 text-xs font-bold text-red-600 uppercase tracking-wide">
                <span>Core pain point</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
