import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'info' | 'gray';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  id?: string;
}

export function Badge({
  children,
  variant = 'gray',
  size = 'md',
  className = '',
  id,
}: BadgeProps) {
  const baseStyles = 'inline-flex items-center font-medium rounded-full transition-colors duration-150';

  const variantStyles = {
    primary: 'bg-red-50 text-red-700 border border-red-200/60 font-semibold',
    secondary: 'bg-blue-50 text-blue-700 border border-blue-200/60 font-semibold',
    success: 'bg-emerald-50 text-emerald-700 border border-emerald-200/60 font-semibold',
    warning: 'bg-amber-50 text-amber-700 border border-amber-200/60 font-semibold',
    info: 'bg-sky-50 text-sky-700 border border-sky-200/60 font-semibold',
    gray: 'bg-slate-100 text-slate-700 border border-slate-200 font-semibold',
  };

  const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-0.5 text-xs md:text-sm',
    lg: 'px-3.5 py-1 text-sm',
  };

  return (
    <span
      id={id}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {children}
    </span>
  );
}
