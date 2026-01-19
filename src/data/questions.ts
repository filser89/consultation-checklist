import type { RawSection } from '../types';

export const RAW_SECTIONS: RawSection[] = [
  {
    id: 'vision',
    title: { en: 'Product Vision' },
    questions: [
      {
        id: 'q1',
        text: {
          en: 'Child experience: plays -> their location is recorded',
        },
      },
      {
        id: 'q2',
        text: {
          en: 'AI generated reports based on child records',
        },
      },
      {
        id: 'q3',
        text: {
          en: 'Admin dashboard + parent-facing app for reports',
        },
      },
      {
        id: 'q4',
        text: {
          en: 'Ask to confirm the vision',
        },
      },
      {
        id: 'q5',
        text: {
          en: 'Technical explanation (event created, updated and stored in local device, syncs with server when needed). Mention that this is based on the Tech Spec',
        },
      },
      {
        id: 'q6',
        text: {
          en: 'Ask to confirm that this is the way',
        },
      },
      {
        id: 'q7',
        text: {
          en: 'Confirm that the wrist band should also record pulse',
        },
      },
    ],
  },
  {
    id: 'business',
    title: { en: 'Understand His Business' },
    questions: [
      {
        id: 'q8',
        text: {
          en: 'How many kids visit per day on average?',
        },
      },
      {
        id: 'q9',
        text: {
          en: 'How many kids are in the space at the same time (peak)?',
        },
      },
      {
        id: 'q10',
        text: {
          en: 'How long does an average visit last?',
        },
      },
      {
        id: 'q11',
        text: {
          en: 'How many distinct zones/areas do you have?',
        },
      },
      {
        id: 'q12',
        text: {
          en: 'How often do kids move between zones? (Every few minutes? Every 15-30 mins?)',
        },
      },
      {
        id: 'q13',
        text: {
          en: 'Do you have WiFi/internet throughout the space?',
        },
      },
    ],
  },
  {
    id: 'technical',
    title: { en: 'Explain The Core Technical Challenge' },
    questions: [
      {
        id: 'q14',
        text: {
          en: 'Entry/exit tracking is easy - RFID scan at door',
        },
      },
      {
        id: 'q15',
        text: {
          en: 'Tracking which SPECIFIC kid is in which zone is the hard part',
        },
      },
      {
        id: 'q16',
        text: {
          en: 'Simple motion sensors can only count people, not identify individuals',
        },
      },
      {
        id: 'q17',
        text: {
          en: 'Explain the three options: BLE/UWB tags ($5K-15K), Computer Vision ($30K-100K+), RFID at every zone (expensive + unreliable)',
        },
      },
      {
        id: 'q18',
        text: {
          en: 'Each approach has different costs, accuracy, and complexity',
        },
      },
    ],
  },
  {
    id: 'budget',
    title: { en: 'Critical Business Questions' },
    questions: [
      {
        id: 'q19',
        text: {
          en: "What's your timeline expectation? (3 months? 6 months? 1 year?)",
        },
      },
      {
        id: 'q20',
        text: {
          en: 'How much are you ready to invest monthly?',
        },
      },
      {
        id: 'q21',
        text: {
          en: "What's your total project budget including hardware?",
        },
      },
      {
        id: 'q22',
        text: {
          en: 'Would parents pay extra for this feature? How much?',
        },
      },
    ],
  },
  {
    id: 'planning',
    title: { en: 'Propose Planning Phase' },
    questions: [
      {
        id: 'q23',
        text: {
          en: 'I see the most important thing now is to plan everything properly. Because quick decisions cost a lot especially when we are dealing with hardware.',
        },
      },
      {
        id: 'q24',
        text: {
          en: 'The project logically can be broken down into 3 parts: 1. Hardware 2. Server + AI 3. Admin + parents app',
        },
      },
      {
        id: 'q25',
        text: {
          en: 'For each of 3 parts we need to do same things:',
        },
      },
      {
        id: 'q26',
        text: {
          en: 'First of all, write up clear requirements. Because before we start looking for something we need to understand what it is. This is the ideal option.',
        },
      },
      {
        id: 'q27',
        text: {
          en: 'Then we mark the must-have requirements and nice to have. Or we can use the points system.',
        },
      },
      {
        id: 'q28',
        text: {
          en: 'Then we find solutions on the market. Understand which we can adapt. Understand the trade offs, pros and cons.',
        },
      },
      {
        id: 'q29',
        text: {
          en: 'For hardware also: Check different suppliers. What they offer, minimal order quantity.',
        },
      },
      {
        id: 'q30',
        text: {
          en: 'Then we evaluate custom-built solution. We will not be able to estimate this precisely, but at least we will know what to expect.',
        },
      },
      {
        id: 'q31',
        text: {
          en: "So this is a very brief explanation of what needs to be done. If you are interested in this plan, let's meet again on Monday evening and I will prepare the offer for you.",
        },
      },
    ],
  },
  {
    id: 'gauge',
    title: { en: 'Listen & Gauge Interest' },
    questions: [
      {
        id: 'q32',
        text: {
          en: "If agrees: 'Great, I'll send proposal by [date]'",
        },
      },
      {
        id: 'q33',
        text: {
          en: "If hesitates: 'What concerns do you have about starting with planning?'",
        },
      },
      {
        id: 'q34',
        text: {
          en: "If says too expensive: 'What budget did you have in mind for the whole project?'",
        },
      },
      {
        id: 'q35',
        text: {
          en: "If says need to think: 'What questions can I answer to help you decide?'",
        },
      },
    ],
  },
];
