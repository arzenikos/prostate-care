export const brand = {
  name: 'PAMANA',
  tagline: 'Prostate Cancer Support Website',
  teReo: 'Te tautoko mō te matepukupuku repe tāne',
};

export const footerLinks = [
  {
    label: 'Documentation',
    href: 'https://github.com/arzenikos/prostate-care',
    icon: 'github' as const,
    external: true,
  },
  {
    label: 'Style Guide',
    href: '/style-guide',
    icon: 'figma' as const,
    external: false,
  },
];

export const landing = {
  heading: 'Welcome. How can we help you today?',
  instruction: 'Choose the path that fits where you are. Each one opens resources written for you.',
  aiPrompt: 'Ask Prometheus AI',
  paths: [
    {
      id: 'research',
      href: '/researcher-hub',
      title: 'I am looking for clinical data or research',
      body: 'For researchers, clinicians, and students seeking peer-reviewed journals, news articles, and statistics.',
      thumbnail: 'path-cards/path-researcher-hub.png',
      iconLabel: 'Researcher hub',
    },
    {
      id: 'patient',
      href: '/patient-space',
      title: 'I am navigating my own diagnosis',
      body: 'For those looking to understand prostate cancer, explore treatment choices, or manage daily health.',
      thumbnail: 'path-cards/path-patient-space.png',
      iconLabel: 'Patient space',
    },
    {
      id: 'whanau',
      href: '/family-support',
      title: 'I am supporting a loved one',
      body: 'For whānau, partners, and friends looking for guides on caring, coordinating treatments, & finding support.',
      thumbnail: 'path-cards/path-family-corner.png',
      iconLabel: 'Family corner',
    },
  ],
};

export const hubs = {
  patient: {
    kicker: 'PATIENT SUPPORT HUB',
    subtitle: 'Prostate Cancer Support Website',
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Navigating Your Diagnosis', href: '/patient-hub' },
    ],
    heading: "Every journey is different. Let's find the information you need.",
    intro:
      'To help you find the right answers without the noise, please select the clinical state or treatment stage that best describes where you or your loved one are today. We will instantly tailor the page to show only what is relevant to you.',
    prompt: 'I am looking for information on...',
    illustration: 'path-cards/path-patient-space',
  },
  whanau: {
    kicker: 'WHĀNAU SUPPORT HUB',
    subtitle: 'Prostate Cancer Support Website',
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Supporting a loved one', href: '/caregiver' },
    ],
    heading: 'Whānau & Friends Support Hub',
    intro:
      'To help you find the right answers without the noise, please select the clinical state or treatment stage that best describes where you or your loved one are today. We will instantly tailor the page to show only what is relevant to you.',
    sectionTitle: 'The Basics You Need',
    illustration: 'path-cards/path-family-corner',
  },
  research: {
    kicker: 'RESEARCH KNOWLEDGE HUB',
    subtitle: 'Prostate Cancer Support Website',
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Looking for academic and clinical research', href: '/researcher' },
    ],
    heading: 'Research & Student Hub',
    intro:
      'Explore peer-reviewed clinical trial data, pharmacokinetic analyses, and epidemiological statistics shaping modern prostate oncology.',
    cta: 'View NZ and global data',
    ctaHref: '/blueprint/bluestats',
    illustration: 'path-cards/path-researcher-hub',
  },
};

export const overlays = {
  newsletter: {
    id: 'newsletter',
    heading: "Let's navigate this together.",
    body: 'Sign up to receive monthly guides, community stories, and the latest clinical insights to support you, your whānau, and your healthcare team.',
    footerLink: { label: 'See all newsletters', href: '/newsletters' },
  },
  clinics: {
    id: 'clinics',
    heading: 'Find a clinic near me',
    body: 'Find a healthcare team, seek a second opinion, and search for accredited urologists and cancer centres across New Zealand.',
    footerLink: { label: 'Search clinics', href: '/clinics' },
  },
  node: {
    id: 'node',
    heading: 'Explore Blue Node',
    body: "Explore the full picture — tap into BlueNode's interactive mind map to see how every piece of prostate cancer knowledge connects",
    footerLink: { label: 'Explore BlueNode', href: '/bluenode' },
  },
  help: {
    id: 'help',
    heading: 'How can we help?',
    body: 'Use the three paths on the home page to find resources written for researchers, people navigating a diagnosis, or whānau supporting a loved one. Each hub then filters information by stage and topic.',
    footerLink: { label: 'Open the user guide', href: '/footer/user-guide' },
  },
  accessibility: {
    id: 'accessibility',
    heading: 'Accessibility options',
    body: 'Adjust text size and contrast to make this site easier to read. Your choices stay on this device.',
  },
};

export type HubId = keyof typeof hubs;
