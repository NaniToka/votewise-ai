import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, RotateCcw, ArrowRight } from 'lucide-react';

import { questions } from '../../data/questions';
import { generatePlan, type RecommendationSummary } from '../../utils/recommendationEngine';
import type { UserResponse } from '../../types/assistant';

import Button from '../ui/Button';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import AiQA from './AiQA';
import './AssistantFlow.css';

const AssistantResults: React.FC<{ 
  plan: RecommendationSummary; 
  aiContext: string;
  onReset: () => void; 
}> = ({ plan, aiContext, onReset }) => {
  const navigate = useNavigate();
  
  const statusVariant = plan.status.toLowerCase().includes('urgent') 
    ? 'error' 
    : plan.status.toLowerCase().includes('ready') ? 'success' : 'warning';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="assistant-results-container"
    >
      <Card className="assistant-results" hoverable={false}>
        <div className="results-header">
          <Badge variant={statusVariant} size="md">
            {plan.status}
          </Badge>
          <h2>Your Voting Plan</h2>
          <p>Prioritized items to get you prepared for the polls.</p>
        </div>

        <div className="results-section">
          <h3>Recommendations</h3>
          <ul className="recommendations-list">
            {plan.recommendations.map((rec, i) => (
              <li key={i} className="recommendation-item">
                <span className="dot" aria-hidden="true" />
                <p>{rec}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="results-section">
          <h3>Next Actions</h3>
          <div className="actions-grid">
            {plan.nextActions.map((action) => (
              <Card 
                key={action.id} 
                className={`action-card ${action.priority}`}
                onClick={() => navigate(`/${action.id === 'register' ? 'checklist' : action.id}`)}
              >
                <div className="action-info">
                  <span className="priority-label">{action.priority} priority</span>
                  <span className="action-text">{action.text}</span>
                </div>
                <ArrowRight size={18} />
              </Card>
            ))}
          </div>
        </div>

        <div className="results-footer">
          <Button variant="outline" onClick={onReset} leftIcon={<RotateCcw size={18} />}>
            Start Over
          </Button>
        </div>
      </Card>

      <AiQA context={aiContext} />
    </motion.div>
  );
};

const AssistantFlow: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState<UserResponse[]>([]);
  const [isFinished, setIsFinished] = useState(false);
  
  const currentQuestion = questions[currentIndex];

  const handleOptionClick = (optionLabel: string, nextQuestionId?: string) => {
    // Basic safety: ensuring we have a valid question object
    if (!currentQuestion) return;

    const newResponses = [...responses, { questionId: currentQuestion.id, optionLabel }];
    setResponses(newResponses);

    if (nextQuestionId === 'end' || !nextQuestionId) {
      setIsFinished(true);
    } else {
      const nextIndex = questions.findIndex(q => q.id === nextQuestionId);
      if (nextIndex !== -1) {
        setCurrentIndex(nextIndex);
      } else {
        setIsFinished(true);
      }
    }
  };

  if (isFinished) {
    const plan = generatePlan(responses);
    const aiContext = responses.map(r => {
      const q = questions.find(q => q.id === r.questionId);
      return `Q: ${q?.text || 'Unknown'} A: ${r.optionLabel}`;
    }).join('\n');
    
    return (
      <AssistantResults 
        plan={plan} 
        aiContext={aiContext} 
        onReset={() => {
          setCurrentIndex(0);
          setResponses([]);
          setIsFinished(false);
        }} 
      />
    );
  }

  return (
    <div className="assistant-flow">
      <div className="progress-bar" role="progressbar" aria-valuenow={(currentIndex / questions.length) * 100} aria-valuemin={0} aria-valuemax={100}>
        <div 
          className="progress-fill" 
          style={{ width: `${(currentIndex / questions.length) * 100}%` }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="question-container" hoverable={false}>
            <span className="question-count">Step {currentIndex + 1} of {questions.length}</span>
            <h2>{currentQuestion.text}</h2>

            <div className="options-grid">
              {currentQuestion.options.map((option, i) => (
                <Button
                  key={i}
                  variant="outline"
                  className="option-btn"
                  onClick={() => handleOptionClick(option.label, option.nextQuestionId)}
                  rightIcon={<ChevronRight size={18} />}
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default AssistantFlow;
