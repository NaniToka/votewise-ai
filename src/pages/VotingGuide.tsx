import React from 'react';
import StepByStepGuide from '../components/Guide/StepByStepGuide';
import './Pages.css';

const VotingGuide: React.FC = () => {
  return (
    <div className="container section animate-fade-in">
      <div className="section-header">
        <h2>Voting Day Guide</h2>
        <p>A step-by-step walkthrough of what happens at the polling station.</p>
      </div>
      <StepByStepGuide />
    </div>
  );
};

export default VotingGuide;
