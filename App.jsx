import React, { useState, useEffect } from 'react';
import wordsData from './data/words.json';
import WordCard from './components/WordCard';
import Header from './components/Header';
import Footer from './components/Footer';
import ProgressBar from './components/ProgressBar';
import './styles/main.css';

const App = () => {
  const [words, setWords] = useState([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [mode, setMode] = useState('en-ru'); // 'en-ru' или 'ru-en'
  const [showAnswer, setShowAnswer] = useState(false);
  const [hintLetters, setHintLetters] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);

  useEffect(() => {
    // Перемешиваем слова при загрузке
    const shuffledWords = [...wordsData].sort(() => Math.random() - 0.5);
    setWords(shuffledWords);
  }, []);

  const currentWord = words[currentWordIndex];

  const checkAnswer = () => {
    if (!currentWord) return;
    
    const userAnswer = userInput.trim().toLowerCase();
    let correctAnswer, isCorrect;
    
    if (mode === 'en-ru') {
      correctAnswer = currentWord.russian.toLowerCase();
      isCorrect = userAnswer === correctAnswer;
    } else {
      correctAnswer = currentWord.english.toLowerCase();
      isCorrect = userAnswer === correctAnswer;
    }
    
    setIsCorrect(isCorrect);
    setTotalAttempts(totalAttempts + 1);
    
    if (isCorrect) {
      setCorrectAnswers(correctAnswers + 1);
    }
  };

  const nextWord = () => {
    setCurrentWordIndex((prevIndex) => 
      prevIndex === words.length - 1 ? 0 : prevIndex + 1
    );
    setShowAnswer(false);
    setHintLetters(0);
    setUserInput('');
    setIsCorrect(null);
  };

  const giveHint = () => {
    if (hintLetters < (mode === 'en-ru' 
      ? currentWord.english.length 
      : currentWord.russian.length)) {
      setHintLetters(hintLetters + 1);
    }
  };

  const toggleMode = () => {
    setMode(mode === 'en-ru' ? 'ru-en' : 'en-ru');
    setShowAnswer(false);
    setHintLetters(0);
    setUserInput('');
    setIsCorrect(null);
  };

  if (!currentWord) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="app">
      <Header mode={mode} toggleMode={toggleMode} />
      
      <main className="main-content">
        <ProgressBar 
          current={currentWordIndex + 1} 
          total={words.length} 
          correct={correctAnswers} 
          attempts={totalAttempts} 
        />
        
        <WordCard 
          word={currentWord} 
          mode={mode} 
          showAnswer={showAnswer} 
          hintLetters={hintLetters} 
          isCorrect={isCorrect}
        />
        
        <div className="input-section">
          {!showAnswer && (
            <>
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder={
                  mode === 'en-ru' 
                    ? 'Введите перевод...' 
                    : 'Enter the translation...'
                }
                className="answer-input"
              />
              <button onClick={checkAnswer} className="check-button">
                Проверить
              </button>
            </>
          )}
          
          {showAnswer && (
            <button onClick={nextWord} className="next-button">
              Следующее слово →
            </button>
          )}
          
          {!showAnswer && (
            <button onClick={giveHint} className="hint-button" disabled={hintLetters >= (
              mode === 'en-ru' 
                ? currentWord.english.length 
                : currentWord.russian.length
            )}>
              Подсказка ({3 - hintLetters} осталось)
            </button>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default App;
