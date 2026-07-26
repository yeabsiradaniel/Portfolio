// Bundled fallback project data, rendered when /api/projects is unreachable
// or returns an unexpected shape. Facts match the resume — never invent more.
const fallbackProjects = [
  {
    _id: 'fallback-shegerwalk',
    title: 'ShegerWalk',
    description:
      'Gamified step-tracking fitness app built with Flutter, Django, PostgreSQL, and Firebase Cloud Messaging. Integrates the native pedometer via platform channels, GPS-mapped walking routes, and a milestone challenge system. Currently in Google Play beta with a CI/CD release pipeline.',
    techStack: ['Flutter', 'Django', 'PostgreSQL', 'Firebase'],
    imageUrl: null,
    liveLink: null,
    githubLink: null,
    featured: true,
  },
  {
    _id: 'fallback-gebeta-maps',
    title: 'Gebeta Maps',
    description:
      'Frontend lead for a production navigation API platform. Built interactive map interfaces serving delivery clients including Adika and Tikus in Addis Ababa, with REST API integration and real-time location features.',
    techStack: ['React', 'JavaScript', 'REST APIs', 'Tailwind CSS'],
    imageUrl: '/images/gebeta-maps-screenshot.png',
    liveLink: "https://gebeta.app",
    githubLink: null,
    featured: false,
  },
  {
    _id: 'fallback-salespulse',
    title: 'SalesPulse',
    description:
      'Real-time sales CRM with a drag-and-drop Kanban pipeline, live Recharts dashboard, and WebSocket-driven activity feed. JWT authentication with refresh token rotation, role-based access, rate limiting, and team management.',
    techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Socket.io'],
    imageUrl: null,
    liveLink: null,
    githubLink: null,
    featured: false,
  },
  {
    _id: 'fallback-genzebe',
    title: 'Genzebe',
    description:
      'Personal finance app that parses bank SMS from multiple Ethiopian banks, auto-categorizes transactions, and enforces 50/30/20 budgets. Includes a visual SMS template builder with smart tokenization and auto-regex generation.',
    techStack: ['Flutter', 'Dart', 'Riverpod', 'Hive'],
    imageUrl: null,
    liveLink: null,
    githubLink: null,
    featured: false,
  },
];

export default fallbackProjects;
