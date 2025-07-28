import React from 'react';

const ProgressBar = ({ current, total, correct, attempts }) => {
  const progress = Math.round((current / total) * 100);
  const accuracy = attempts > 0 ? Math.round((correct / attempts) * 100) : 0;

  return (
    <div className="progress-container">
      <div className="progress-stats">
        <span>Word: {current}/{total}</span>
        <span>Correct: {correct}</span>
        <span>Accuracy: {accuracy}%</span>
      </div>
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
