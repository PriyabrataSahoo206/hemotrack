export interface ProblemCard {
  id: string;
  title: string;
  description: string;
  iconName: string; // Used to dynamically map Lucide Icons
}

export interface FeatureCard {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  iconName: string;
}

export interface StepItem {
  stepNumber: number;
  title: string;
  description: string;
}

export interface StakeholderRole {
  id: string;
  role: string;
  tagline: string;
  iconName: string;
  responsibilities: string[];
  capabilities: {
    label: string;
    value: string;
  }[];
}

export interface ModuleItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  status: 'operational' | 'ready' | 'audit-ready';
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  organization: string;
  avatarColor: string; // Tailwind bg color class
}

export interface MetricItem {
  id: string;
  value: string;
  label: string;
  sublabel: string;
  iconName: string;
}
