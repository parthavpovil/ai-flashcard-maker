import React, { useState } from "react";
import FlashcardDisplay from "./components/FlashcardDisplay";
import FlashcardForm from "./components/FlashcardForm";
import AIGenerator from "./components/AIGenerator";

function App() {
  const [flashcards, setFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const addFlashcard = (question, answer) => {
    setFlashcards((prevCards) => [...prevCards, { question, answer }]);
  };

  const deleteCard = (index) => {
    setFlashcards((prevCards) => prevCards.filter((_, i) => i !== index));
    if (currentIndex >= flashcards.length - 1) {
      setCurrentIndex(Math.max(0, flashcards.length - 2));
    }
  };

  const deleteAllCards = () => {
    setFlashcards([]);
    setCurrentIndex(0);
  };

  const nextCard = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
  };

  const prevCard = () => {
    setCurrentIndex((prevIndex) =>
      (prevIndex - 1 + flashcards.length) % flashcards.length
    );
  };

  return (
    <div className="container">
      <h1 style={{ fontSize: '32px', marginBottom: '20px', textAlign: 'center', color: '#333' }}>Flashcards App</h1>
      <AIGenerator onAddFlashcard={addFlashcard} />
      <FlashcardForm onAddFlashcard={addFlashcard} />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
        <FlashcardDisplay
          flashcards={flashcards}
          currentIndex={currentIndex}
          onDelete={deleteCard}
        />
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <button
            onClick={prevCard}
            style={{
              padding: '10px 20px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              marginRight: '10px',
              cursor: 'pointer',
              opacity: flashcards.length === 0 ? 0.5 : 1
            }}
            disabled={flashcards.length === 0}
          >
            Previous
          </button>
          <button
            onClick={nextCard}
            style={{
              padding: '10px 20px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              opacity: flashcards.length === 0 ? 0.5 : 1
            }}
            disabled={flashcards.length === 0}
          >
            Next
          </button>
        </div>
        <button
          onClick={deleteAllCards}
          style={{
            padding: '10px 20px',
            backgroundColor: '#f44336',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            marginTop: '20px',
            cursor: 'pointer',
            opacity: flashcards.length === 0 ? 0.5 : 1
          }}
          disabled={flashcards.length === 0}
        >
          Delete All Cards
        </button>
      </div>
      <p style={{ textAlign: 'center', marginTop: '20px', color: '#666' }}>
        {flashcards.length > 0 ? `Card ${currentIndex + 1} of ${flashcards.length}` : 'No flashcards yet'}
      </p>
    </div>
  );
}

export default App;