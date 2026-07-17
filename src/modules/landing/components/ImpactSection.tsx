import { motion } from 'motion/react';
import { METRICS } from '../data/landing.data';
import { SectionHeading } from './shared/SectionHeading';
import { MetricCard } from './shared/MetricCard';

export function ImpactSection() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <section
      id="impact"
      className="py-16 md:py-24 bg-slate-50 relative overflow-hidden border-b border-slate-100"
    >
      {/* Visual background ambient grids */}
      <div className="absolute right-0 bottom-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          title="Why Teams Choose HemoTrack"
          subtitle="HemoTrack transforms fragmented logistics into unified pipeline oversight. These key metrics demonstrate how we serve operational coordination speed."
          badgeText="System Impact Performance"
        />

        {/* Metric grids */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {METRICS.map((metric) => (
            <MetricCard
              key={metric.id}
              id={metric.id}
              value={metric.value}
              label={metric.label}
              sublabel={metric.sublabel}
              iconName={metric.iconName}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
