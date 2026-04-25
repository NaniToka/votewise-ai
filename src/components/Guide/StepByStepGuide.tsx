import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, UserCheck, FileText, CheckCircle } from 'lucide-react';
import './StepByStepGuide.css';

const steps = [
  {
    icon: <MapPin size={32} />,
    title: "1. Find Your Polling Station",
    description: "Confirm your assigned location before you leave. They can change between elections."
  },
  {
    icon: <UserCheck size={32} />,
    title: "2. Check In",
    description: "Provide your name and ID to the poll worker. They will verify your registration."
  },
  {
    icon: <FileText size={32} />,
    title: "3. Receive Your Ballot",
    description: "You'll be given a paper ballot or access to a voting machine. Follow all instructions."
  },
  {
    icon: <CheckCircle size={32} />,
    title: "4. Cast Your Vote",
    description: "Mark your choices clearly. Once done, submit your ballot into the secure machine."
  }
];

const StepByStepGuide: React.FC = () => {
  return (
    <div className="guide-container">
      {steps.map((step, index) => (
        <motion.div 
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
          className="guide-step card"
        >
          <div className="step-icon">{step.icon}</div>
          <div className="step-content">
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default StepByStepGuide;
