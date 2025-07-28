import React from 'react';

const WordCard = ({ word, mode, showAnswer, hintLetters, isCorrect }) => {
  if (!word) return null;

  const getHint = (word, letters) => {
    return word.slice(0, letters) + '_'.repeat(word.length - letters);
  };

  return (
    <div className={`word-card ${isCorrect !== null ? (isCorrect ? 'correct' : 'incorrect') : ''}`}>
      <div className="word-display">
        <h2>
          {mode === 'en-ru' ? word.english : word.russian}
        </h2>
        <div className="translation">
          {showAnswer ? (
            <p>{mode === 'en-ru' ? word.russian : word.english}</p>
          ) : (
            <p className="hint">
              {mode === 'en-ru' 
                ? getHint(word.english, hintLetters) 
                : getHint(word.russian, hintLetters)}
            </p>
          )}
        </div>
      </div>
      <div className="word-level">
        <span className={`level-badge ${word.level}`}>{word.level}</span>
      </div>
    </div>
  );
};

export default WordCard;
