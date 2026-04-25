import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ClipboardList, Copy, AlertCircle, CheckCircle2 } from 'lucide-react';

import { checklistCategories } from '../../data/checklist';
import Card from '../ui/Card';
import Button from '../ui/Button';
import './ChecklistItems.css';

const ChecklistItems: React.FC = () => {
  const [checkedIds, setCheckedIds] = useState<Set<string>>(new Set());
  const [copyFeedback, setCopyFeedback] = useState(false);

  const totalItems = checklistCategories.reduce((acc, cat) => acc + cat.items.length, 0);
  const checkedCount = checkedIds.size;
  const isReady = checkedCount === totalItems;

  const toggleItem = (id: string) => {
    const newChecked = new Set(checkedIds);
    if (newChecked.has(id)) {
      newChecked.delete(id);
    } else {
      newChecked.add(id);
    }
    setCheckedIds(newChecked);
  };

  const copyToClipboard = () => {
    const text = checklistCategories.map(cat => {
      const items = cat.items.map(item => {
        const status = checkedIds.has(item.id) ? '[x]' : '[ ]';
        return `${status} ${item.text}: ${item.description}`;
      }).join('\n');
      return `--- ${cat.name} ---\n${items}`;
    }).join('\n\n');

    navigator.clipboard.writeText(`My Voting Readiness Checklist:\n\n${text}`);
    setCopyFeedback(true);
    setTimeout(() => setCopyFeedback(false), 2000);
  };

  return (
    <div className="checklist-container">
      <Card className={`readiness-summary ${isReady ? 'ready' : 'attention'}`} hoverable={false}>
        <div className="summary-icon" aria-hidden="true">
          {isReady ? <CheckCircle2 size={32} /> : <AlertCircle size={32} />}
        </div>
        <div className="summary-text">
          <h2>{isReady ? "You are fully ready!" : "Almost there..."}</h2>
          <p>{checkedCount} of {totalItems} items confirmed.</p>
        </div>
        <Button 
          variant="outline" 
          size="sm"
          onClick={copyToClipboard}
          leftIcon={<Copy size={16} />}
        >
          {copyFeedback ? "Copied!" : "Copy List"}
        </Button>
      </Card>

      <div className="checklist-grid" role="list">
        {checklistCategories.map((category) => (
          <section key={category.id} className="checklist-category" aria-labelledby={`title-${category.id}`}>
            <div className="category-header">
              <ClipboardList size={22} className="text-accent" />
              <h3 id={`title-${category.id}`}>{category.name}</h3>
            </div>
            <div className="items-list">
              {category.items.map((item) => {
                const isChecked = checkedIds.has(item.id);
                return (
                  <motion.div 
                    key={item.id}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Card
                      className={`checklist-item ${isChecked ? 'checked' : ''}`}
                      onClick={() => toggleItem(item.id)}
                    >
                      <div 
                        className="checkbox" 
                        role="checkbox" 
                        aria-checked={isChecked}
                        aria-hidden="true"
                      >
                        {isChecked && <Check size={16} />}
                      </div>
                      <div className="item-content">
                        <span className="item-text">{item.text}</span>
                        <p className="item-desc">{item.description}</p>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default ChecklistItems;


