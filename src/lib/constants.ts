export const COMPANY = {
  name: 'Sai Saktheeswari Security & Staffing Services',
  shortName: 'Sai Saktheeswari',
  tagline: 'Sourcing Our Staffs for Shaping Your Success',
  established: 1991,
  phone: {
    primary: '+91 93676 26855',
    whatsapp: '919367626855',
    office: ['+91 4142 91855', '+91 93606 26855', '+91 93616 26855', '+91 93646 26855', '+91 77082 36555'],
  },
  email: 'saisaktheeswari@gmail.com',
  address: {
    head: { label: 'Head Office — Cuddalore', text: 'Sai Saktheeswari Tower, #16A Nellikuppam Main Road, S.N Chavadi, Cuddalore – 607006' },
    branch: { label: 'Branch Office — Puducherry', text: '#18, First Floor, 100 Feet Road, Ellaipillaichavadi, Puducherry – 5' },
  },
  stats: [
    { value: 35, suffix: '+', label: 'Years in Business', icon: '🏆' },
    { value: 500, suffix: '+', label: 'Workforce Deployed', icon: '👥' },
    { value: 100, suffix: '+', label: 'Partner Businesses', icon: '🤝' },
    { value: 2, suffix: '', label: 'Office Locations', icon: '🏢' },
    { value: 5, suffix: '', label: 'Industries Served', icon: '🏭' },
  ],
};

export const SERVICES = [
  {
    id: 'security',
    icon: '🛡️',
    title: 'Security Personnel',
    short: 'Professional guards for factories, campuses & events',
    desc: 'Trained, uniformed, and disciplined security personnel deployed for corporate campuses, factories, educational institutions, hospitals, and special events across Tamil Nadu.',
    href: '/services/security-personnel',
  },
  {
    id: 'labour',
    icon: '👷',
    title: 'Labour Outsourcing',
    short: 'Verified manpower for industrial operations',
    desc: 'Reliable, background-verified labour supplied for manufacturing, construction, and logistics operations. Seasonal scale-up supported with 48-72hr deployment.',
    href: '/services/labour-outsourcing',
  },
  {
    id: 'contract',
    icon: '📋',
    title: 'Contract Workforce',
    short: 'Flexible staffing with full HR management',
    desc: 'Long-term SLA-backed contract workforce management with complete attendance, payroll, and performance monitoring handled by our team.',
    href: '/services/contract-workforce',
  },
  {
    id: 'compliance',
    icon: '⚖️',
    title: 'Statutory HR Compliance',
    short: 'PF, ESI & Contract Labour Act handled',
    desc: 'End-to-end statutory compliance: Provident Fund (PF), Employee State Insurance (ESI), Bonus Act, and Contract Labour Act — fully managed, zero risk to your business.',
    href: '/services/statutory-compliance',
  },
];

export const INDUSTRIES = [
  { icon: '🏭', name: 'Manufacturing', desc: 'Factory floor security & skilled labour for production plants' },
  { icon: '🚛', name: 'Logistics', desc: 'Warehouse security & distribution centre manpower' },
  { icon: '🏗️', name: 'Construction', desc: 'Site security, access control & contract labour' },
  { icon: '🏬', name: 'Commercial Facilities', desc: 'Malls, hospitals, hotels & commercial complexes' },
  { icon: '🏢', name: 'Corporate Offices', desc: 'Professional building security & support staff' },
  { icon: '🎓', name: 'Educational Institutions', desc: 'Campus security & event management for colleges & schools' },
];

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Industries', href: '/industries' },
  { label: 'Training', href: '/training' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact', href: '/contact' },
];

export const FAQS = [
  { q: 'What staffing services does Sai Saktheeswari provide?', a: 'Security personnel deployment, labour outsourcing, contract workforce management, temporary staffing, and full statutory HR compliance (PF, ESI, Bonus Act, Contract Labour Act) for businesses across Tamil Nadu and Puducherry.' },
  { q: 'How long has Sai Saktheeswari been in business?', a: 'Established in 1991 — over 35 years of continuous, trusted operation. One of the oldest and most experienced staffing companies in Cuddalore.' },
  { q: 'Which areas do you serve?', a: 'Primarily Cuddalore and Puducherry, with workforce deployments across Tamil Nadu. Head office at S.N Chavadi, Cuddalore and branch office at Ellaipillaichavadi, Puducherry.' },
  { q: 'How quickly can you deploy workers?', a: 'Standard deployment within 48–72 hours. For urgent requirements, contact us directly on WhatsApp for same-day response.' },
  { q: 'Do you handle PF and ESI for outsourced staff?', a: 'Yes. PF, ESI, Bonus Act and Contract Labour Act compliance are managed end-to-end by our in-house team — zero compliance burden on your business.' },
  { q: 'Are your security guards specially trained?', a: 'Every guard completes our structured training programme covering security protocols, emergency response, access control, professional conduct, and grooming. Training is overseen by our senior training supervisors.' },
  { q: 'Do you deploy female security staff?', a: 'Yes. We deploy trained female security personnel for campuses, hospitals, commercial complexes, and events requiring women security officers.' },
  { q: 'How do I get a quote or make a requirement?', a: 'Call or WhatsApp +91 93676 26855, email saisaktheeswari@gmail.com, or submit the form on our Contact page. We respond within 24 hours.' },
];
