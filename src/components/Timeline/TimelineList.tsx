import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Clock } from 'lucide-react';

import { timelineEvents } from '../../data/timeline';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import './TimelineList.css';

const TimelineList: React.FC = () => {
  return (
    <div className="timeline-list">
      {timelineEvents.map((event, index) => (
        <motion.div 
          key={event.id}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
          className={`timeline-item ${event.status}`}
        >
          <div className="timeline-marker-container">
            <div className="timeline-marker">
              {event.status === 'completed' && <CheckCircle2 size={20} />}
              {event.status === 'current' && <Clock size={20} />}
              {event.status === 'upcoming' && <div className="dot" />}
            </div>
            {index < timelineEvents.length - 1 && <div className="timeline-line" />}
          </div>
          
          <Card className="timeline-content" hoverable={false}>
            <div className="timeline-header-meta">
              <span className="event-stage">{event.stage}</span>
              <Badge 
                variant={event.status === 'completed' ? 'success' : event.status === 'current' ? 'primary' : 'muted'}
              >
                {event.status}
              </Badge>
            </div>
            <h3>{event.title}</h3>
            <p className="event-description">{event.description}</p>
            
            <div className="action-note">
              <strong>Your Action:</strong> {event.action}
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default TimelineList;

