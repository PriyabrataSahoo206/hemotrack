import React from 'react';
import { motion } from 'motion/react';
import { IconRenderer } from './IconRenderer';

interface MetricCardProps {
  value: string;
  label: string;
  sublabel: string;
  iconName: string;
  className?: string;
  id?: string;
  key?: string;
}


export function MetricCard({
  value,
  label,
  sublabel,
  iconName,
  className = '',
  id,
}: MetricCardProps) {
  return (
    <motion.div
      id={id}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className={`bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between ${className}`}
    >
      <div>
        {/* Metric Icon Indicator */}
        <div className="w-10 h-10 rounded-lg bg-red-50 text-red-600 flex items-center justify-center mb-5 border border-red-150">
          <IconRenderer name={iconName} size={18} />
        </div>

        {/* Display High Metric Ratio */}
        <div className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-none">
          {value}
        </div>

        {/* Bold Title label */}
        <h4 className="text-sm md:text-base font-extrabold text-slate-800 tracking-tight mt-3">
          {label}
        </h4>

        {/* Informative Sub-label */}
        <p className="text-xs md:text-sm text-slate-500 mt-2 leading-relaxed">
          {sublabel}
        </p>
      </div>

      {/* Decorative clean footer status check */}
      <div className="mt-5 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[10px] font-mono text-emerald-600 font-bold uppercase">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        Verified KPI Log
      </div>
    </motion.div>
  );
}
