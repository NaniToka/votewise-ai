import type { Question } from '../types/assistant';

export const questions: Question[] = [
  {
    id: 'first_time',
    text: 'Are you a first-time voter?',
    options: [
      { label: 'Yes', nextQuestionId: 'voter_id' },
      { label: 'No', nextQuestionId: 'voter_id' }
    ]
  },
  {
    id: 'voter_id',
    text: 'Do you already have a valid voter ID?',
    options: [
      { label: 'Yes', nextQuestionId: 'polling_location' },
      { label: 'No', nextQuestionId: 'polling_location' },
      { label: 'Not sure', nextQuestionId: 'polling_location' }
    ]
  },
  {
    id: 'polling_location',
    text: 'Do you know your assigned polling location?',
    options: [
      { label: 'Yes', nextQuestionId: 'deadlines' },
      { label: 'No', nextQuestionId: 'deadlines' }
    ]
  },
  {
    id: 'deadlines',
    text: 'Are you aware of the upcoming election deadlines?',
    options: [
      { label: 'Yes', nextQuestionId: 'home_constituency' },
      { label: 'No', nextQuestionId: 'home_constituency' }
    ]
  },
  {
    id: 'home_constituency',
    text: 'Are you voting from your home constituency (address on ID)?',
    options: [
      { label: 'Yes', nextQuestionId: 'end' },
      { label: 'No', nextQuestionId: 'end' }
    ]
  }
];
