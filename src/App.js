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

  const nextCard = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
  };

  const prevCard = () => {
    setCurrentIndex((prevIndex) =>
      (prevIndex - 1 + flashcards.length) % flashcards.length
    );
  };

  return (
    <div className="App flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">Flashcards App</h1>
      <FlashcardForm onAddFlashcard={addFlashcard} />
      <AIGenerator onAddFlashcard={addFlashcard} />
      <div className="flex items-center mt-4">
        <button
          onClick={prevCard}
          className="bg-blue-500 text-white p-4 rounded-l-md transition-all duration-300 hover:bg-blue-600"
          disabled={flashcards.length === 0}
        >
          Previous
        </button>
        <FlashcardDisplay
          flashcards={flashcards}
          currentIndex={currentIndex}
        />
        <button
          onClick={nextCard}
          className="bg-blue-500 text-white p-4 rounded-r-md transition-all duration-300 hover:bg-blue-600"
          disabled={flashcards.length === 0}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
