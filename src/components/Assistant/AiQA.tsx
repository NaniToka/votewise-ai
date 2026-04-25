import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, Sparkles, AlertCircle, Loader2 } from 'lucide-react';
import { askGemini } from '../../utils/gemini';
import './AiQA.css';

interface AiQAProps {
  context: string;
}

const AiQA: React.FC<AiQAProps> = ({ context }) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setAnswer('');
    
    if (!question.trim()) return;

    setLoading(true);
    try {
      const response = await askGemini(question, context);
      setAnswer(response);
    } catch (err: any) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ai-qa-section card">
      <div className="ai-qa-header">
        <Sparkles size={20} className="text-accent" />
        <h3>Have a specific question?</h3>
      </div>
      <p className="ai-qa-hint">Ask our AI about anything you're still confused about.</p>

      <form className="ai-qa-form" onSubmit={handleAsk}>
        <div className="input-wrapper">
          <input 
            type="text" 
            placeholder="e.g. My student ID doesn't have an address, is that okay?" 
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            disabled={loading}
          />
          <button type="submit" disabled={loading || !question.trim()} className="btn btn-primary btn-icon">
            {loading ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
          </button>
        </div>
      </form>

      <AnimatePresence>
        {error && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="ai-error"
          >
            <AlertCircle size={18} />
            <p>{error}</p>
          </motion.div>
        )}

        {answer && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="ai-answer"
          >
            <div className="answer-header">
              <MessageSquare size={16} />
              <span>AI Guidance</span>
            </div>
            <div className="answer-content">
              {answer.split('\n').map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AiQA;
