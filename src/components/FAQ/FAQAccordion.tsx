import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search } from 'lucide-react';

import { faqItems } from '../../data/faq';
import Card from '../ui/Card';
import './FAQAccordion.css';

const FAQAccordion: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filteredItems = faqItems.filter(item =>
    item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="faq-container">
      <div className="faq-search-container">
        <div className="faq-search-input-wrapper">
          <Search size={22} className="search-icon" />
          <input
            type="text"
            className="faq-search-input"
            placeholder="Search FAQs (e.g., student ID, residency)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search frequently asked questions"
          />
        </div>
      </div>

      <div className="faq-list">
        {filteredItems.map((item, index) => (
          <Card 
            key={index} 
            className={`faq-item ${openIndex === index ? 'open' : ''}`}
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          >
            <div className="faq-header">
              <h3>{item.question}</h3>
              <ChevronDown 
                size={22} 
                className={`chevron ${openIndex === index ? 'rotate' : ''}`} 
              />
            </div>
            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="faq-body"
                >
                  <p>{item.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        ))}

        {filteredItems.length === 0 && (
          <div className="no-results">
            <p>No matching questions found. Try different keywords.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FAQAccordion;

