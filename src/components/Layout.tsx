import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Vote, Settings, Eye, Type } from 'lucide-react';
import Button from './ui/Button';
import './Layout.css';

const Layout: React.FC = () => {
  const location = useLocation();
  const [showSettings, setShowSettings] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [largeText, setLargeText] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', highContrast ? 'high-contrast' : 'default');
    document.documentElement.setAttribute('data-size', largeText ? 'large' : 'default');
  }, [highContrast, largeText]);

  return (
    <div className="app-container">
      <header className="header">
        <div className="container header-content">
          <Link to="/" className="logo">
            <Vote size={32} className="text-accent" />
            <span className="logo-text">VoteWise AI</span>
          </Link>
          
          <nav className="nav" aria-label="Main Navigation">
            <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
            <Link to="/timeline" className={location.pathname === '/timeline' ? 'active' : ''}>Timeline</Link>
            <Link to="/checklist" className={location.pathname === '/checklist' ? 'active' : ''}>Documents</Link>
            <Link to="/faq" className={location.pathname === '/faq' ? 'active' : ''}>FAQ</Link>
          </nav>

          <div className="header-actions">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setShowSettings(!showSettings)}
              aria-expanded={showSettings}
              aria-label="Accessibility Settings"
              leftIcon={<Settings size={20} />}
            />
            
            {showSettings && (
              <div className="settings-dropdown card">
                <h4>Accessibility</h4>
                <button 
                  className={`settings-item ${highContrast ? 'active' : ''}`}
                  onClick={() => setHighContrast(!highContrast)}
                  aria-pressed={highContrast}
                >
                  <Eye size={18} />
                  <span>High Contrast</span>
                </button>
                <button 
                  className={`settings-item ${largeText ? 'active' : ''}`}
                  onClick={() => setLargeText(!largeText)}
                  aria-pressed={largeText}
                >
                  <Type size={18} />
                  <span>Large Text</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="main-content">
        <Outlet />
      </main>

      <footer className="footer">
        <div className="container footer-content">
          <div className="footer-info">
            <div className="logo grayscale">
              <Vote size={24} />
              <span>VoteWise AI</span>
            </div>
            <p>Empowering first-time voters with clarity and confidence.</p>
          </div>
          <div className="footer-links">
            <p>© 2026 VoteWise AI. Built for PromptWars.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
