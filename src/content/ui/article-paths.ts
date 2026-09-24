export type TopicCard = {
  label: string;
  href: string;
  iconLabel: string;
};

export type TopicGroup = {
  title: string;
  cards: TopicCard[];
};

export type PathSection = {
  id: string;
  title: string;
  groups: TopicGroup[];
};

export const patientSections: PathSection[] = [
  {
    id: 'general',
    title: 'Prostate cancer basics, tests, recurrence, & support',
    groups: [
      {
        title: 'Risk, testing & prevention',
        cards: [
          { label: 'What you need to know early', href: 'what-you-need-to-know-early', iconLabel: 'Placeholder: early knowledge icon' },
          { label: 'Should I get screened?', href: 'should-i-get-screened', iconLabel: 'Placeholder: screening icon' },
          { label: 'Small choices, big impact', href: 'small-choices-big-impact', iconLabel: 'Placeholder: lifestyle icon' },
        ],
      },
      {
        title: 'Managing recurrent prostate cancer',
        cards: [
          { label: 'Understanding your diagnosis', href: 'understanding-your-diagnosis', iconLabel: 'Placeholder: diagnosis icon' },
          { label: 'Navigating your options', href: 'navigating-your-options', iconLabel: 'Placeholder: options icon' },
          { label: "Making every doctor's visit count", href: 'doctor-time-making-every-visit-count', iconLabel: 'Placeholder: care team icon' },
        ],
      },
      {
        title: 'Living well & support',
        cards: [
          { label: 'Understanding your diagnosis', href: 'understanding-your-diagnosis', iconLabel: 'Placeholder: diagnosis icon' },
          { label: 'Navigating your options', href: 'navigating-your-options', iconLabel: 'Placeholder: options icon' },
          { label: "Making every doctor's visit count", href: 'doctor-time-making-every-visit-count', iconLabel: 'Placeholder: care team icon' },
        ],
      },
    ],
  },
  {
    id: 'stage-1',
    title: 'Stage 1: Early-stage and localised options',
    groups: [
      {
        title: '',
        cards: [
          { label: 'Understanding your diagnosis', href: 'understanding-your-diagnosis', iconLabel: 'Placeholder: diagnosis icon' },
          { label: 'Navigating your options', href: 'navigating-your-options', iconLabel: 'Placeholder: options icon' },
          { label: "Making every doctor's visit count", href: 'doctor-time-making-every-visit-count', iconLabel: 'Placeholder: appointment icon' },
          { label: 'Understanding your diagnosis', href: 'understanding-your-diagnosis', iconLabel: 'Placeholder: diagnosis icon' },
        ],
      },
    ],
  },
  {
    id: 'stage-2',
    title: 'Stage 2: Intermediate-risk prostate cancer',
    groups: [
      {
        title: 'Navigating your options',
        cards: [
          { label: 'Your body, your needs', href: 'your-body-your-needs', iconLabel: 'Placeholder: treatment paths icon' },
          { label: 'Working with your medical team', href: 'doctor-time-making-every-visit-count', iconLabel: 'Placeholder: medical team icon' },
          { label: 'What to expect', href: 'staying-grounded-through-it-all', iconLabel: 'Placeholder: expectations icon' },
        ],
      },
      {
        title: 'Staying emotionally steady',
        cards: [
          { label: 'Staying grounded through it all', href: 'staying-grounded-through-it-all', iconLabel: 'Placeholder: mental health icon' },
        ],
      },
      {
        title: "Your body's needs",
        cards: [
          { label: 'Body care that builds you up', href: 'body-care-that-builds-you-up', iconLabel: 'Placeholder: side effects icon' },
        ],
      },
    ],
  },
  {
    id: 'stage-3',
    title: 'Stage 3: Locally advanced prostate cancer',
    groups: [
      {
        title: '',
        cards: [
          { label: 'What to expect now', href: 'what-to-expect-now', iconLabel: 'Placeholder: stage 3 overview icon' },
          { label: 'Caring for a tired body', href: 'caring-for-a-tired-body', iconLabel: 'Placeholder: tired body icon' },
          { label: 'Finding your ground', href: 'finding-your-ground', iconLabel: 'Placeholder: grounding icon' },
        ],
      },
    ],
  },
  {
    id: 'stage-4',
    title: 'Stage 4: Living well with advanced prostate cancer',
    groups: [
      {
        title: '',
        cards: [
          { label: 'The care that fits you', href: 'the-care-that-fits-you', iconLabel: 'Placeholder: care plan icon' },
          { label: 'Support for the day-to-day', href: 'support-for-the-day-to-day', iconLabel: 'Placeholder: daily support icon' },
          { label: 'Honouring your life', href: 'honouring-your-life', iconLabel: 'Placeholder: legacy icon' },
        ],
      },
    ],
  },
];

export const whanauCards: TopicCard[] = [
  { label: 'Understanding your support role', href: 'first-post', iconLabel: 'Placeholder: dancing figures icon' },
  { label: 'Supporting daily life & well-being', href: 'second-post', iconLabel: 'Placeholder: dancing figures icon' },
  { label: 'Emotional support & communication', href: 'third-post', iconLabel: 'Placeholder: dancing figures icon' },
];

export const researchFeed = {
  title: 'Research Title',
  date: '5 July 2026',
  author: 'Iqhwa Redstone',
  affiliation: 'University of Canterbury',
  description: 'Short description',
  tags: ['Exercise', 'Diet', 'Medications'],
  href: 'first-post',
};
