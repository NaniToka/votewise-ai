import React from 'react';
import TimelineList from '../components/Timeline/TimelineList';
import './Pages.css';

const Timeline: React.FC = () => {
  return (
    <div className="container section animate-fade-in">
      <div className="section-header">
        <h2>Election Timeline</h2>
        <p>Key dates and milestones you need to know for the upcoming election.</p>
      </div>
      <TimelineList />
    </div>
  );
};

export default Timeline;
