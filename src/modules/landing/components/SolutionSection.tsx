import { motion } from 'motion/react';
import { FEATURES } from '../data/landing.data';
import { SectionHeading } from './shared/SectionHeading';
import { IconRenderer } from './shared/IconRenderer';

export function SolutionSection() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <section
      id="features"
      className="py-16 md:py-24 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden scroll-mt-6"
    >
      {/* Decorative Blur Spheres */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-red-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          title="One Unified Platform for Blood Coordination"
          subtitle="HemoTrack acts as an operational coordination overlay, bringing robust digital workflows, compliance guardrails, and logistics monitoring to authorized entities."
          badgeText="Our Solution"
        />

        {/* 6 Grid Feature Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {FEATURES.map((feature) => (
            <motion.div
              key={feature.id}
              id={feature.id}
              variants={cardVariants}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="bg-white hover:bg-slate-50 border border-slate-200/80 hover:border-slate-300 rounded-2xl p-6.5 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Highlight Icon wrapper using dynamic dual theme (red and blue gradients wrapper) */}
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100/60 text-blue-600 flex items-center justify-center mb-6 border border-blue-200/40">
                  <IconRenderer name={feature.iconName} size={22} />
                </div>

                <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                  {feature.title}
                </h3>

                <p className="mt-3.5 text-sm text-slate-600 leading-relaxed">
                  {feature.description}
                </p>

                {feature.longDescription && (
                  <p className="mt-3.5 text-xs text-slate-400 leading-normal italic border-l-2 border-slate-200 pl-2.5">
                    {feature.longDescription}
                  </p>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-blue-600">
                <span className="uppercase tracking-wide text-[10px]">Secure Logistics Module</span>
                <span className="text-slate-400 group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
