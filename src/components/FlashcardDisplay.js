// FlashcardDisplay.js
import React from 'react';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';

const FlashcardDisplay = ({ flashcards, currentIndex }) => {
  if (flashcards.length === 0) {
    return <p className="text-gray-500">No flashcards available.</p>;
  }

  const card = flashcards[currentIndex];

  const downloadCard = async () => {
    const element = document.getElementById(`flashcard-${currentIndex}`);
    const canvas = await html2canvas(element);
    canvas.toBlob((blob) => {
      saveAs(blob, `flashcard-${currentIndex + 1}.png`);
    });
  };

  return (
    <div className="flex justify-center mx-4">
      <div
        id={`flashcard-${currentIndex}`} // Add ID for downloading
        className="border border-gray-300 rounded-lg shadow-lg transition-transform duration-300"
        style={{
          width: '300px',  // Card size
          height: '300px', // Card size
          backgroundColor: '#f0f8ff', // Light color for readability
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px',
        }}
      >
        <p className="font-bold text-lg text-center">{card.title || card.question}</p>
        <p className="text-md text-center">{card.content || card.answer}</p>
        <button
          onClick={downloadCard}
          className="mt-4 bg-blue-500 text-white p-2 rounded"
        >
          Download Flashcard
        </button>
      </div>
    </div>
  );
};

export default FlashcardDisplay;
