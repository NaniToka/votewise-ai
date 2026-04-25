import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, UserCheck, Calendar, FileText, Vote, ChevronLeft } from 'lucide-react';

import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import AssistantFlow from '../components/Assistant/AssistantFlow';
import './Pages.css';

const Home: React.FC = () => {
  const [showAssistant, setShowAssistant] = useState(false);
  const navigate = useNavigate();

  const entryActions = [
    {
      id: 'readiness',
      title: 'Voting Readiness',
      description: 'Find out if you are ready to vote in 2 minutes.',
      icon: <UserCheck size={24} />,
      action: () => setShowAssistant(true),
      primary: true
    },
    {
      id: 'timeline',
      title: 'Election Timeline',
      description: 'See the key dates for registration and voting.',
      icon: <Calendar size={24} />,
      action: () => navigate('/timeline')
    },
    {
      id: 'documents',
      title: 'Documents List',
      description: 'A simple list of what to bring to the polls.',
      icon: <FileText size={24} />,
      action: () => navigate('/checklist')
    },
    {
      id: 'guide',
      title: 'Voting Day Guide',
      description: 'A step-by-step walk through the process.',
      icon: <Vote size={24} />,
      action: () => navigate('/guide')
    }
  ];

  if (showAssistant) {
    return (
      <div className="page container section">
        <div className="section-header">
          <Button 
            variant="ghost" 
            size="sm" 
            className="btn-back"
            onClick={() => setShowAssistant(false)}
            leftIcon={<ChevronLeft size={18} />}
          >
            Back to Home
          </Button>
          <h2 className="section-title">Voting Readiness Check</h2>
        </div>
        <AssistantFlow />
      </div>
    );
  }

  return (
    <div className="home-page animate-fade-in">
      <section className="hero">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="container hero-content"
        >
          <div className="hero-badge">
            <Sparkles size={16} />
            <span>Student & First-Time Voter Guide</span>
          </div>
          <h1>Helping the next generation <span className="text-accent">vote with ease.</span></h1>
          <p className="hero-description">
            Navigating your first election can be complex. We simplify the rules, deadlines, and requirements so you can make your voice heard with confidence.
          </p>
          
          <div className="entry-grid">
            {entryActions.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card 
                  className={`entry-card ${item.primary ? 'entry-primary' : ''}`}
                  onClick={item.action}
                >
                  <div className="entry-icon">{item.icon}</div>
                  <div className="entry-text">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                  <ArrowRight size={20} className="entry-arrow" />
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="container section">
        <Card className="promo-card" hoverable={false}>
          <div className="promo-content">
            <h2>Why VoteWise AI?</h2>
            <p>We've tailored every feature for the unique challenges students face—from dorm residency rules to acceptable student IDs. No jargon, just clarity.</p>
          </div>
        </Card>
      </section>
    </div>
  );
};

export default Home;

