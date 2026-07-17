import { motion } from 'motion/react';
import { STEPS } from '../data/landing.data';
import { SectionHeading } from './shared/SectionHeading';
import { CheckCircle2, ShieldCheck, MapPin, Truck, HelpCircle } from 'lucide-react';

export function HowItWorksSection() {
  const getStepIcon = (index: number) => {
    switch (index) {
      case 0:
        return <ShieldCheck className="w-5 h-5 text-red-600" />;
      case 1:
        return <CheckCircle2 className="w-5 h-5 text-red-600" />;
      case 2:
        return <Truck className="w-5 h-5 text-red-600" />;
      case 3:
        return <MapPin className="w-5 h-5 text-red-600" />;
      case 4:
        return <CheckCircle2 className="w-5 h-5 text-blue-600" />;
      default:
        return <HelpCircle className="w-5 h-5 text-slate-600" />;
    }
  };

  return (
    <section
      id="how-it-works"
      className="py-16 md:py-24 bg-white border-y border-slate-100 relative overflow-hidden scroll-mt-6"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          title="How HemoTrack Works"
          subtitle="Our digital workflow operates with strict, regulatory-safe protocols to ensure that critical medical courier tasks are logged, validated, and monitored seamlessly."
          badgeText="Operational Workflow"
        />

        {/* Desktop View Timeline - Horizontal Layout */}
        <div className="hidden lg:block relative mt-8">
          {/* Connector Line behind steps */}
          <div className="absolute top-10 left-12 right-12 h-1 bg-gradient-to-r from-red-200 to-blue-200 pointer-events-none" />

          <div className="grid grid-cols-5 gap-6">
            {STEPS.map((step, idx) => {
              const isLast = idx === STEPS.length - 1;
              return (
                <motion.div
                  key={step.stepNumber}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  className="flex flex-col items-center text-center relative"
                >
                  {/* Step Bubble Node */}
                  <div
                    className={`w-14 h-14 rounded-full flex items-center justify-center font-bold z-10 shadow-lg border-4 transition-all duration-300 ${
                      isLast
                        ? 'bg-blue-50 border-blue-200 text-blue-700'
                        : 'bg-red-50 border-red-200 text-red-700'
                    }`}
                  >
                    <span className="text-sm font-black">0{step.stepNumber}</span>
                  </div>

                  {/* Icon Indicator Badge */}
                  <div className="mt-3 bg-slate-100 p-1.5 rounded-full border border-slate-200">
                    {getStepIcon(idx)}
                  </div>

                  {/* Card Content block */}
                  <div className="mt-5 p-4 bg-slate-50 border border-slate-200/50 rounded-2xl flex-1 flex flex-col justify-between">
                    <h4 className="text-base font-bold text-slate-900 leading-tight">
                      {step.title}
                    </h4>
                    <p className="mt-2.5 text-xs text-slate-500 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Mobile View Timeline - Vertical Layout */}
        <div className="block lg:hidden relative mt-4">
          <div className="absolute top-4 bottom-4 left-6 w-0.5 bg-gradient-to-b from-red-600 to-blue-600 pointer-events-none" />

          <div className="space-y-8">
            {STEPS.map((step, idx) => {
              const isLast = idx === STEPS.length - 1;
              return (
                <motion.div
                  key={step.stepNumber}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className="flex gap-4 relative"
                >
                  {/* Circle Hub node */}
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold relative z-10 flex-shrink-0 shadow-md ${
                      isLast
                        ? 'bg-blue-600 text-white border-2 border-blue-400'
                        : 'bg-red-600 text-white border-2 border-red-400'
                    }`}
                  >
                    0{step.stepNumber}
                  </div>

                  {/* Text Container Card */}
                  <div className="flex-1 bg-slate-50 rounded-2xl border border-slate-200/60 p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="bg-white p-1 rounded-full border border-slate-200">
                        {getStepIcon(idx)}
                      </div>
                      <h4 className="text-base font-bold text-slate-900 leading-tight">
                        {step.title}
                      </h4>
                    </div>
                    <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
