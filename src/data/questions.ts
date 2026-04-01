import type { RawSection } from '../types';

export const RAW_SECTIONS: RawSection[] = [
  {
    id: 'current-business',
    title: { en: 'Current Business' },
    questions: [
      {
        id: 'q1',
        text: {
          en: 'Are you already selling these products?',
        },
      },
      {
        id: 'q2',
        text: {
          en: 'Where do you sell them currently? (Amazon, retail, another website?)',
        },
      },
      {
        id: 'q3',
        text: {
          en: "What's your current monthly sales volume?",
        },
      },
      {
        id: 'q4',
        text: {
          en: "What's your average order value?",
        },
      },
    ],
  },
  {
    id: 'target-customer',
    title: { en: 'Target Customer' },
    questions: [
      {
        id: 'q5',
        text: {
          en: 'Who is your ideal customer? (profile, location)',
        },
      },
      {
        id: 'q6',
        text: {
          en: 'What concerns bring them to you? (child not sleeping, focus issues, etc.)',
        },
      },
      {
        id: 'q7',
        text: {
          en: 'Why do they choose you over competitors?',
        },
      },
    ],
  },
  {
    id: 'marketing',
    title: { en: 'Marketing' },
    questions: [
      {
        id: 'q8',
        text: {
          en: 'How do customers find you today? (ads, organic, word of mouth, social?)',
        },
      },
      {
        id: 'q9',
        text: {
          en: "What's your monthly ads budget?",
        },
      },
      {
        id: 'q10',
        text: {
          en: 'Is SEO a priority for you?',
        },
      },
      {
        id: 'q11',
        text: {
          en: 'Do you have an email list? How big?',
        },
      },
    ],
  },
  {
    id: 'project-expectations',
    title: { en: 'Project Expectations' },
    questions: [
      {
        id: 'q12',
        text: {
          en: 'How many products at launch? (just the 3 supplements?)',
        },
      },
      {
        id: 'q13',
        text: {
          en: 'Do you have product content ready? (descriptions, images, ingredients)',
        },
      },
      {
        id: 'q14',
        text: {
          en: "What's your expected order volume in the first few months?",
        },
      },
      {
        id: 'q15',
        text: {
          en: "What's your expected visitor traffic in the first few months?",
        },
      },
      {
        id: 'q16',
        text: {
          en: 'Are you running ads at launch or growing organically?',
        },
      },
    ],
  },
  {
    id: 'design',
    title: { en: 'Design' },
    questions: [
      {
        id: 'q17',
        text: {
          en: 'Is this mockup the final design or a rough concept?',
        },
      },
      {
        id: 'q18',
        text: {
          en: 'Will I need to design the website based on the mockup?',
        },
      },
      {
        id: 'q19',
        text: {
          en: 'Do you have brand assets? (logo files, fonts, color codes)',
        },
      },
      {
        id: 'q20',
        text: {
          en: 'Do you have product photography?',
        },
      },
    ],
  },
  {
    id: 'quiz-ai',
    title: { en: 'Quiz & AI' },
    questions: [
      {
        id: 'q21',
        text: {
          en: 'Is the recommendation logic already defined?',
        },
      },
      {
        id: 'q22',
        text: {
          en: 'Can you provide examples of how you want the recommendation explanations to sound?',
        },
      },
      {
        id: 'q23',
        text: {
          en: 'Do you need to save quiz results to a database for later analysis?',
        },
      },
    ],
  },
  {
    id: 'other',
    title: { en: 'Other Questions' },
    questions: [
      {
        id: 'q24',
        text: {
          en: 'Do customers need accounts, or guest checkout only?',
        },
      },
      {
        id: 'q25',
        text: {
          en: 'Do you have the copy ready? (page content, product descriptions, legal disclaimers, privacy policy, terms of service)',
        },
      },
    ],
  },
];
