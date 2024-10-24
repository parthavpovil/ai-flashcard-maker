import React, { useState } from 'react';

const FlashcardForm = ({ onAddFlashcard }) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!question || !answer) return;
    onAddFlashcard(question, answer);
    setQuestion('');
    setAnswer('');
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <h2 style={{ fontSize: '24px', marginBottom: '10px', color: '#333' }}>Create Manual Flashcard</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '10px',
            borderRadius: '5px',
            border: '1px solid #ccc'
          }}
        />
        <input
          type="text"
          placeholder="Answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '10px',
            borderRadius: '5px',
            border: '1px solid #ccc'
          }}
        />
        <button 
          type="submit" 
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Add Flashcard
        </button>
      </form>
    </div>
  );
};

export default FlashcardForm;