import React from 'react';
import * as Icons from 'lucide-react';

interface IconRendererProps extends React.ComponentPropsWithoutRef<'svg'> {
  name: string;
  className?: string;
  size?: number;
}

export function IconRenderer({ name, className = '', size = 24, ...props }: IconRendererProps) {
  // Gracefully locate the dynamically referenced Lucide icon or fallback to a standard Shield icon
  const LucideIcon = (Icons as Record<string, React.ComponentType<{ className?: string; size?: number }>>)[name];

  if (!LucideIcon) {
    // Return a safe fallback icon
    return <Icons.ShieldAlert className={className} size={size} {...props} />;
  }

  return <LucideIcon className={className} size={size} {...props} />;
}
