import {
  ProblemCard,
  FeatureCard,
  StepItem,
  StakeholderRole,
  ModuleItem,
  TestimonialItem,
  MetricItem
} from '../types/landing.types';

export const PROBLEMS: ProblemCard[] = [
  {
    id: 'prob-fragmentation',
    title: 'Fragmented Coordination',
    description: 'Hospitals and blood banks rely on outdated phone calls and unsynchronized spreadsheets for life-critical inquiries, creating severe communication bottlenecks.',
    iconName: 'PhoneOff'
  },
  {
    id: 'prob-delays',
    title: 'Emergency Response Delays',
    description: 'Manual verification protocols and dispatch workflows during acute crises slow down the dispatch speed, putting patient outcomes at risk.',
    iconName: 'AlertTriangle'
  },
  {
    id: 'prob-visibility',
    title: 'No Transport Visibility',
    description: 'Once blood specimens leave a facility, administrators have zero real-time insight into courier location, transit ETA, or cold-chain compliance status.',
    iconName: 'EyeOff'
  },
  {
    id: 'prob-tracking',
    title: 'Limited Auditing & Records',
    description: 'Retroactive compliance logging is disorganized. Regulators and coordinators struggle to reconstruct chain-of-custody trails after deliveries.',
    iconName: 'FileX'
  }
];

export const FEATURES: FeatureCard[] = [
  {
    id: 'feat-request',
    title: 'Blood Request Management',
    description: 'Digital request entry with automatic urgency tiering, verified digital signatures, and automated validation against facility limits.',
    longDescription: 'Establish secure, formal blood logistics requests with strict diagnostic inputs, instantly dispatching push tasks to matching providers.',
    iconName: 'FileSpreadsheet'
  },
  {
    id: 'feat-availability',
    title: 'Real-Time Availability Visibility',
    description: 'Instantly view matching, unallocated inventory coordinates of authorized regional blood banks to avoid blind inquiries.',
    longDescription: 'Real-time visibility into regional blood supply status without sharing sensitive donor identities or commercial inventories.',
    iconName: 'Building2'
  },
  {
    id: 'feat-dispatch',
    title: 'Logistics & Delivery Tracking',
    description: 'Live GPS coordinate mapping and multi-stage status tracking from dispatch handover to physical delivery receipt.',
    longDescription: 'Monitor active transport couriers on clean regional maps, with dynamic ETA calculations adjusted specifically for emergency conditions.',
    iconName: 'Route'
  },
  {
    id: 'feat-activation',
    title: 'Emergency Activation Support',
    description: 'Instant notification routing to certified local volunteer squads and partner agencies when urgent rare typing is requested.',
    longDescription: 'Leverage compliance-approved dispatch rules to signal readiness requirements to on-demand logistical support networks.',
    iconName: 'BellRing'
  },
  {
    id: 'feat-temperature',
    title: 'Transport Temp Monitoring',
    description: 'Continuous validation checklogs of thermal containment tags, tracking compliance with strictly guided medical cargo temperatures.',
    longDescription: 'Continuous telemetry logging of transport coolers ensures compliance with standard medical range storage rules.',
    iconName: 'ThermometerSnowflake'
  },
  {
    id: 'feat-audit',
    title: 'Regulator Audit Visibility',
    description: 'Immutable transaction trails and compliance dashboards designed for healthcare inspectors, state-appointed auditors, and boards.',
    longDescription: 'Provides fully transparent oversight portals where regulators can inspect compliance scorecards, audit histories, and transit logs.',
    iconName: 'ShieldCheck'
  }
];

export const STEPS: StepItem[] = [
  {
    stepNumber: 1,
    title: 'Verified Request Created',
    description: 'An authorized physician or blood coordinator enters a verified emergency request containing strict blood specifications via the clinical interface.'
  },
  {
    stepNumber: 2,
    title: 'Blood Bank Dispatch Preparation',
    description: 'An authorized regional blood bank approves the requested supply matching, packs the standard medical cooler container, and attaches the digital tag.'
  },
  {
    stepNumber: 3,
    title: 'Logistics Partner Route Pickup',
    description: 'An approved medical transport partner accepts the pickup request on their mobile terminal and scans the barcode to bind ownership and start transit.'
  },
  {
    stepNumber: 4,
    title: 'Continuous Tracking & Telemetry',
    description: 'Our platform tracks live sensor signals, coordinates, and physical custody transitions. Both dispatch centers monitor visual transport progress.'
  },
  {
    stepNumber: 5,
    title: 'Secure Delivery & Audit Log Close',
    description: 'The receiving clinical staff verifies container seal integrity, scans the receipt confirmation code, and the transaction is committed to immutable audit logs.'
  }
];

export const STAKEHOLDERS: StakeholderRole[] = [
  {
    id: 'role-hospital',
    role: 'Hospitals',
    tagline: 'Streamline procurement and incoming critical logistics verification.',
    iconName: 'Hospital',
    responsibilities: [
      'Raise urgent or scheduled blood supply requests',
      'Track incoming live delivery routes & transit ETAs',
      'Verify digital hand-overs and confirm cold-chain seals'
    ],
    capabilities: [
      { label: 'Avg Request Time', value: '< 2 Mins' },
      { label: 'Courier Tracker UI', value: 'Live 1s Ping' }
    ]
  },
  {
    id: 'role-bank',
    role: 'Blood Banks',
    tagline: 'Manage incoming demand, streamline dispatch, and control visibility.',
    iconName: 'Building',
    responsibilities: [
      'Review and safely dispatch matched emergency supply requests',
      'Monitor real-time demand logs from regional hospitals',
      'Register outgoing courier containers and thermal tags'
    ],
    capabilities: [
      { label: 'Dispatch Handover', value: 'Instant API' },
      { label: 'Fulfillment Efficiency', value: '+45% Speedup' }
    ]
  },
  {
    id: 'role-delivery',
    role: 'Delivery Partners',
    tagline: 'Receive guided routing and provide reliable custody tracking.',
    iconName: 'Truck',
    responsibilities: [
      'Receive instant emergency routing & pickup assignments',
      'Streamline handovers using structured camera barcode scanning',
      'Log immediate incident alerts if traffic bottlenecks occur'
    ],
    capabilities: [
      { label: 'Turnaround Target', value: 'Zero Manual Calls' },
      { label: 'Mobile Compliance', value: '100% Android/iOS' }
    ]
  },
  {
    id: 'role-admin',
    role: 'Administrators',
    tagline: 'Oversee entire network ops and solve logistics incidents.',
    iconName: 'Users',
    responsibilities: [
      'Coordinate and monitor real-time network transaction maps',
      'Step in to handle transit warnings and temperature alerts',
      'Manage global access controls and verify partner credentials'
    ],
    capabilities: [
      { label: 'Active Map View', value: 'Regional Hub' },
      { label: 'SLA Alert Timeout', value: '90 Seconds' }
    ]
  },
  {
    id: 'role-regulator',
    role: 'Regulators & Auditors',
    tagline: 'Maintain total oversight without manual spreadsheet reviews.',
    iconName: 'Shield',
    responsibilities: [
      'Oversight portal displaying regional logistics health status',
      'Download pre-compiled digital cold-chain compliance exports',
      'Run seamless audit checklists of historic transport files'
    ],
    capabilities: [
      { label: 'Access Control', value: 'Read-Only Audit' },
      { label: 'Data Verification', value: 'SECURE / TLS' }
    ]
  }
];

export const MODULES: ModuleItem[] = [
  {
    id: 'mod-auth',
    title: 'Auth & Role Access',
    description: 'Highly secure identity portal ensuring ONLY registered, verified clinical coordinators, couriers, and administrators gain operational access.',
    iconName: 'LockKeyhole',
    status: 'audit-ready'
  },
  {
    id: 'mod-request',
    title: 'Request Management',
    description: 'Dynamic wizards allowing hospital team members to raise verified needs with explicit urgency level, type matching, and delivery guidelines.',
    iconName: 'FilePlus2',
    status: 'operational'
  },
  {
    id: 'mod-approval',
    title: 'Approval Workflow',
    description: 'Standardized protocols ensuring request validation, digital double-signature checkoffs, and secure data release to approved blood centers.',
    iconName: 'CheckSquare',
    status: 'operational'
  },
  {
    id: 'mod-logis',
    title: 'Logistics & Dispatch',
    description: 'Automated job sorting that matches outgoing shipments with closest certified transport couriers based on readiness level.',
    iconName: 'ClipboardSignature',
    status: 'ready'
  },
  {
    id: 'mod-tracking',
    title: 'Tracking Engine',
    description: 'Combines cellular, GPS, and beacon telemetry to form a continuous live tracking trajectory map available on both sender and receiver dashboard screens.',
    iconName: 'Map',
    status: 'operational'
  },
  {
    id: 'mod-temp',
    title: 'Temperature Monitoring',
    description: 'Collects Bluetooth sensor telemetry from medical grade coolers, triggering proactive push notifications if a thermal envelope is breached.',
    iconName: 'Snowflake',
    status: 'ready'
  },
  {
    id: 'mod-incident',
    title: 'Incident Management',
    description: 'Built-in escalation channels to route delayed couriers, vehicle incidents, or dispatch issues directly to emergency backup logistics units.',
    iconName: 'TrafficCone',
    status: 'ready'
  },
  {
    id: 'mod-reports',
    title: 'Reports & Audit',
    description: 'Compiles exact audit files of transportation timestamps, signatures, temperature checklists, and route coordinates into certified medical reports.',
    iconName: 'ShieldAlert',
    status: 'audit-ready'
  }
];

export const METRICS: MetricItem[] = [
  {
    id: 'metric-coordination',
    value: '5x',
    label: 'Faster Coordination Visibility',
    sublabel: 'Reduces manual telephone ping-pong and status checks between hospitals and blood banks.',
    iconName: 'Zap'
  },
  {
    id: 'metric-traceability',
    value: '100%',
    label: 'Traceable Transit Status Logs',
    sublabel: 'Comprehensive, immutable records spanning courier identity, physical custody, and path timestamps.',
    iconName: 'History'
  },
  {
    id: 'metric-monitoring',
    value: '24/7',
    label: 'Operational Monitoring Interface',
    sublabel: 'Always-on logistics oversight mapping active routes, cold-chain checks, and pending orders.',
    iconName: 'Clock'
  },
  {
    id: 'metric-stakeholder',
    value: 'Multi',
    label: 'Stakeholder Workflow Support',
    sublabel: 'Tailored interfaces and dashboards custom-made for administrative, clinical, and transport roles.',
    iconName: 'Users'
  }
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'test-1',
    quote: "Prior to using HemoTrack, coordinating emergency deliveries to our trauma ward required multiple phone calls with zero location transparency. Now, our emergency response center monitors the transport route and temperature status live via a single high-visibility layout—saving critical coordination minutes.",
    author: "Dr. Sarah Sterling",
    role: "Director of Clinical Operations & Trauma Coordination",
    organization: "Metro General Hospital Center",
    avatarColor: "bg-red-100 text-red-700"
  },
  {
    id: 'test-2',
    quote: "Ensuring compliance and cold-chain integrity during emergency logistics is an absolute regulatory mandate for us. HemoTrack provides my logistics team with digital hand-overs and continuous cooler tags feedback, converting legacy manual ledger entries into absolute, bulletproof audit transparency.",
    author: "Marcus Rivera",
    role: "Regional Blood Bank Logistics & Distribution Director",
    organization: "Tri-State Blood Reserve Authority",
    avatarColor: "bg-blue-100 text-blue-700"
  },
  {
    id: 'test-3',
    quote: "When a critical request is dispatched, there is no time for guessing which route is clear or which driver is nearby. The tracking and incident management dashboards enable our dispatch desk to quickly handle transport obstructions, ensuring seamless coordination with hospitals and couriers alike.",
    author: "Elena Rostov",
    role: "Emergency Support & Transport Dispatch Supervisor",
    organization: "Apex Medical Cargo Express",
    avatarColor: "bg-amber-100 text-amber-700"
  }
];
