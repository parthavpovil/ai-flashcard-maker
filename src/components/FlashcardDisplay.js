import React from 'react';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';

const FlashcardDisplay = ({ flashcards, currentIndex, onDelete }) => {
  if (flashcards.length === 0) {
    return <p style={{ textAlign: 'center', color: '#666' }}>No flashcards available.</p>;
  }

  const card = flashcards[currentIndex];

  const downloadCard = async () => {
    const element = document.getElementById(`flashcard-content-${currentIndex}`);
    const canvas = await html2canvas(element);
    canvas.toBlob((blob) => {
      saveAs(blob, `flashcard-${currentIndex + 1}.png`);
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0 10px' }}>
      <div
        id={`flashcard-${currentIndex}`}
        style={{
          width: '100%',
          maxWidth: '300px',
          backgroundColor: 'white',
          borderRadius: '10px',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          transition: 'transform 0.3s',
          cursor: 'pointer'
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        <div id={`flashcard-content-${currentIndex}`}>
          <h3 style={{ fontSize: '18px', marginBottom: '10px', color: '#333' }}>{card.title || card.question}</h3>
          <p style={{ fontSize: '16px', color: '#666' }}>{card.content || card.answer}</p>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', maxWidth: '300px', marginTop: '15px' }}>
        <button
          onClick={downloadCard}
          style={{
            padding: '8px 15px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Download Flashcard
        </button>
        <button
          onClick={() => onDelete(currentIndex)}
          style={{
            padding: '8px 15px',
            backgroundColor: '#f44336',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Delete Card
        </button>
      </div>
    </div>
  );
};

export default FlashcardDisplay;