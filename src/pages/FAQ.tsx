import React from 'react';
import FAQAccordion from '../components/FAQ/FAQAccordion';
import './Pages.css';

const FAQ: React.FC = () => {
  return (
    <div className="container section animate-fade-in">
      <div className="section-header">
        <h2>Frequently Asked Questions</h2>
        <p>Common questions and clear answers about the voting process.</p>
      </div>
      <FAQAccordion />
    </div>
  );
};

export default FAQ;
