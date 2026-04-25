import React from 'react';
import ChecklistItems from '../components/Checklist/ChecklistItems';
import './Pages.css';

const Checklist: React.FC = () => {
  return (
    <div className="container section animate-fade-in">
      <div className="section-header">
        <h2>Document Checklist</h2>
        <p>Make sure you have everything ready before registration or heading to the polls.</p>
      </div>
      <ChecklistItems />
    </div>
  );
};

export default Checklist;
