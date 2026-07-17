import { motion } from 'motion/react';
import { TESTIMONIALS } from '../data/landing.data';
import { SectionHeading } from './shared/SectionHeading';
import { Quote } from 'lucide-react';

export function TestimonialsSection() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <section
      id="testimonials"
      className="py-16 md:py-24 bg-white relative overflow-hidden border-b border-slate-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          title="Endorsed by Clinical & Logistics Professionals"
          subtitle="Read the perspectives of on-the-ground operators who manage healthcare supply coordination every single day."
          badgeText="Operator Feedback Review"
        />

        {/* 3 columns grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {TESTIMONIALS.map((col) => (
            <motion.div
              key={col.id}
              id={col.id}
              variants={cardVariants}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6.5 relative flex flex-col justify-between hover:shadow-md transition-all duration-300"
            >
              {/* Top Quote Icon wrapper */}
              <div>
                <Quote className="text-red-500/10 mb-4 h-10 w-10" strokeWidth={1} />
                <p className="text-slate-600 text-xs md:text-sm leading-relaxed italic relative z-10">
                  “{col.quote}”
                </p>
              </div>

              {/* User Identity bottom footer */}
              <div className="mt-8 pt-5 border-t border-slate-200 flex items-center gap-3">
                {/* Custom Avatar initials with background color */}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${col.avatarColor}`}>
                  {col.author.split(' ').map((n) => n[0]).join('')}
                </div>
                <div>
                  <h4 className="text-xs md:text-sm font-extrabold text-slate-900 leading-tight">
                    {col.author}
                  </h4>
                  <p className="text-[10px] md:text-xs text-slate-500 font-medium leading-none mt-1">
                    {col.role}
                  </p>
                  <p className="text-[9px] text-blue-600 font-bold mt-1 tracking-wide uppercase">
                    {col.organization}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
