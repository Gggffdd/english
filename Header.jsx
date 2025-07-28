import React from 'react';

const Header = ({ mode, toggleMode }) => {
  return (
    <header className="app-header">
      <h1>English Vocabulary Trainer</h1>
      <div className="mode-switcher">
        <button 
          onClick={toggleMode}
          className={`mode-button ${mode === 'en-ru' ? 'active' : ''}`}
        >
          English → Russian
        </button>
        <button 
          onClick={toggleMode}
          className={`mode-button ${mode === 'ru-en' ? 'active' : ''}`}
        >
          Russian → English
        </button>
      </div>
    </header>
  );
};

export default Header;
