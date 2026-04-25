export interface ChecklistCategory {
  id: string;
  name: string;
  items: ChecklistItem[];
}

export interface ChecklistItem {
  id: string;
  text: string;
  description: string;
}

export const checklistCategories: ChecklistCategory[] = [
  {
    id: 'student-registration',
    name: 'Student Registration Needs',
    items: [
      { id: 's1', text: 'School Housing Address', description: 'Your dorm name and room number.' },
      { id: 's2', text: 'Proof of Enrollment', description: 'A tuition bill or official school schedule.' },
      { id: 's3', text: 'Social Security Number', description: 'Be ready to provide the last 4 digits.' }
    ]
  },
  {
    id: 'voting-essentials',
    name: 'Voting Day (First-Timers)',
    items: [
      { id: 'v1', text: 'Acceptable Photo ID', description: 'Check if your Student ID works in your state.' },
      { id: 'v2', text: 'Poll Location Name', description: 'Write down the name of your campus or local voting center.' },
      { id: 'v3', text: 'Your Sample Ballot', description: 'Download or print it so you know the candidates ahead of time.' }
    ]
  }
];
