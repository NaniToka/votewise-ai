import type { UserResponse } from '../types/assistant';

export interface NextAction {
  id: string;
  text: string;
  priority: 'high' | 'medium' | 'low';
}

export interface RecommendationSummary {
  status: string;
  recommendations: string[];
  nextActions: NextAction[];
}

export const generatePlan = (responses: UserResponse[]): RecommendationSummary => {
  const responseMap = new Map(responses.map(r => [r.questionId, r.optionLabel.toLowerCase()]));
  
  const recommendations: string[] = [];
  const nextActions: NextAction[] = [];
  
  // Logic 1: First-time voter
  if (responseMap.get('first_time') === 'yes') {
    recommendations.push("Welcome to your first election! We'll guide you through each step.");
    nextActions.push({ id: 'guide', text: 'Read the Voting Day Guide', priority: 'medium' });
  }

  // Logic 2: Voter ID status
  if (responseMap.get('voter_id') === 'no') {
    recommendations.push("You mentioned you don't have a voter ID yet. This is your most urgent task.");
    nextActions.push({ id: 'register', text: 'Register & Apply for ID', priority: 'high' });
  } else if (responseMap.get('voter_id') === 'not sure') {
    recommendations.push("You're unsure about your ID status. Better safe than sorry—check it today.");
    nextActions.push({ id: 'check_status', text: 'Check Registration Status', priority: 'high' });
  }

  // Logic 3: Polling location
  if (responseMap.get('polling_location') === 'no') {
    recommendations.push("You don't know where to vote. Finding your station is key to avoiding delays.");
    nextActions.push({ id: 'find_poll', text: 'Find your polling station', priority: 'medium' });
  }

  // Logic 4: Deadlines
  if (responseMap.get('deadlines') === 'no') {
    recommendations.push("Don't miss out due to a date! Deadlines for mail-in ballots and registration approach fast.");
    nextActions.push({ id: 'timeline', text: 'View Election Timeline', priority: 'medium' });
  }

  // Logic 5: Home constituency (Student choice)
  if (responseMap.get('home_constituency') === 'no') {
    recommendations.push("Since you're away from home, you need to decide between absentee voting or local registration.");
    nextActions.push({ id: 'absentee', text: 'Research Absentee Voting', priority: 'medium' });
  }

  // Fallback if no specific logic hits
  if (recommendations.length === 0) {
    recommendations.push("You seem well-prepared! Review our final checklist to stay ready.");
    nextActions.push({ id: 'checklist', text: 'Check Final Checklist', priority: 'low' });
  }

  return {
    status: calculateStatus(nextActions),
    recommendations,
    nextActions
  };
};

const calculateStatus = (actions: NextAction[]): string => {
  const highPriority = actions.filter(a => a.priority === 'high').length;
  if (highPriority > 0) return 'Needs Urgent Action';
  if (actions.length > 2) return 'Almost Ready';
  return 'Ready to Vote!';
};
