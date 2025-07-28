import React from 'react';

const Footer = () => {
  return (
    <footer className="app-footer">
      <p>© {new Date().getFullYear()} English Vocabulary App</p>
      <p>Created with React and ❤️</p>
    </footer>
  );
};

export default Footer;
