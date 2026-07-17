import React from 'react';
import { motion } from 'motion/react';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  badgeText?: string;
  align?: 'left' | 'center';
  className?: string;
  id?: string;
}

export function SectionHeading({
  title,
  subtitle,
  badgeText,
  align = 'center',
  className = '',
  id,
}: SectionHeadingProps) {
  const isCenter = align === 'center';

  return (
    <div
      id={id}
      className={`max-w-3xl mb-12 md:mb-16 ${isCenter ? 'mx-auto text-center' : 'text-left'} ${className}`}
    >
      {badgeText && (
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-1.5 px-3 py-1 mb-4 text-xs font-semibold tracking-wider uppercase rounded-full bg-red-50 text-red-600 border border-red-200/50"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
          {badgeText}
        </motion.span>
      )}

      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight"
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-4 text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto"
          style={{ marginLeft: isCenter ? 'auto' : '0', marginRight: isCenter ? 'auto' : '0' }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
