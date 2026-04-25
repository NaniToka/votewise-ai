export interface TimelineEvent {
  id: string;
  stage: string;
  title: string;
  description: string;
  action: string;
  status: 'completed' | 'current' | 'upcoming';
}

export const timelineEvents: TimelineEvent[] = [
  {
    id: 'stage-1',
    stage: 'Preparation',
    title: 'Self-Readiness Check',
    description: 'The first step is deciding to participate. This stage involves understanding the impact of your vote and clarifying your residence.',
    action: 'Decide if you will vote from your home address or your school campus address.',
    status: 'completed'
  },
  {
    id: 'stage-2',
    stage: 'Registration',
    title: 'Checking Eligibility',
    description: 'Ensure you are eligible and officially registered. Without registration, you cannot cast a regular ballot in most regions.',
    action: 'Visit your local govt portal and confirm your registration status today.',
    status: 'current'
  },
  {
    id: 'stage-3',
    stage: 'Readiness',
    title: 'Document Preparation',
    description: 'Gather the necessary identification documents. Rules change frequently, so double-check what is valid current ID.',
    action: 'Check our "Documents" section to see if your student ID is acceptable.',
    status: 'upcoming'
  },
  {
    id: 'stage-4',
    stage: 'Polling Day',
    title: 'Casting Your Ballot',
    description: 'The main event. Head to your assigned polling location during opening hours to cast your vote in person.',
    action: 'Plan your route to the polls and set a reminder on your calendar.',
    status: 'upcoming'
  },
  {
    id: 'stage-5',
    stage: 'Post-Vote',
    title: 'Result Awareness',
    description: 'Voting is the start, but staying aware of results and community impacts is the long-term goal of an active citizen.',
    action: 'Follow official election result channels and stay engaged with your local leaders.',
    status: 'upcoming'
  }
];
