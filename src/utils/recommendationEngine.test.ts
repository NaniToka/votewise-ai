import { describe, it, expect } from 'vitest';
import { generatePlan } from './recommendationEngine';
import type { UserResponse } from '../types/assistant';

describe('recommendationEngine', () => {
  it('identifies first-time voters and suggests the guide', () => {
    const responses: UserResponse[] = [
      { questionId: 'first_time', optionLabel: 'Yes' }
    ];
    
    const plan = generatePlan(responses);
    
    expect(plan.recommendations.some(r => r.includes('Welcome to your first election'))).toBe(true);
    expect(plan.nextActions.some(a => a.id === 'guide')).toBe(true);
  });

  it('flags missing voter ID as urgent high priority', () => {
    const responses: UserResponse[] = [
      { questionId: 'voter_id', optionLabel: 'No' },
      { questionId: 'polling_location', optionLabel: 'Yes' }
    ];
    
    const plan = generatePlan(responses);
    
    expect(plan.status).toBe('Needs Urgent Action');
    expect(plan.nextActions.some(a => a.id === 'register' && a.priority === 'high')).toBe(true);
  });

  it('suggests checking polling location if unknown', () => {
    const responses: UserResponse[] = [
      { questionId: 'voter_id', optionLabel: 'Yes' },
      { questionId: 'polling_location', optionLabel: 'No' }
    ];
    
    const plan = generatePlan(responses);
    
    expect(plan.nextActions.some(a => a.id === 'find_poll')).toBe(true);
  });

  it('handles a fully ready voter correctly', () => {
    const responses: UserResponse[] = [
      { questionId: 'first_time', optionLabel: 'No' },
      { questionId: 'voter_id', optionLabel: 'Yes' },
      { questionId: 'polling_location', optionLabel: 'Yes' },
      { questionId: 'deadlines', optionLabel: 'Yes' },
      { questionId: 'home_constituency', optionLabel: 'Yes' }
    ];
    
    const plan = generatePlan(responses);
    
    expect(plan.status).toBe('Ready to Vote!');
    expect(plan.nextActions.some(a => a.id === 'checklist')).toBe(true);
  });

  it('handles incomplete or empty responses gracefully', () => {
    const responses: UserResponse[] = [];
    const plan = generatePlan(responses);
    
    expect(plan).toBeDefined();
    expect(plan.status).toBe('Ready to Vote!'); // Default fallback
    expect(plan.recommendations.length).toBeGreaterThan(0);
  });
});
