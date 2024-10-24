// FlashcardForm.js
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
    <form onSubmit={handleSubmit} className="mb-6 flex flex-col items-center">
      <input
        type="text"
        placeholder="Question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className="p-2 border rounded mb-2 w-64"
      />
      <input
        type="text"
        placeholder="Answer"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        className="p-2 border rounded mb-2 w-64"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Add Flashcard
      </button>
    </form>
  );
};

export default FlashcardForm;
