import React, { useState, useRef } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import FlashcardDisplay from "./FlashcardDisplay";
import html2canvas from "html2canvas"; // Import html2canvas

// Card Component for displaying AI-generated content
const Card = ({ title, content }) => (
  <div
    style={{
      border: "1px solid #ccc",
      borderRadius: "8px",
      padding: "15px",
      margin: "10px 0",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "flex-start",
      width: "300px", // Fixed width for square appearance
    }}
  >
    <h3 style={{ margin: "0 0 10px 0" }}>{title}</h3>
    <p style={{ margin: 0 }}>{content}</p>
  </div>
);

// Button component for reusable styles
const Button = ({ onClick, children, style }) => (
  <button
    onClick={onClick}
    style={{
      backgroundColor: "#007bff",
      color: "white",
      border: "none",
      borderRadius: "5px",
      padding: "10px 15px",
      margin: "5px",
      cursor: "pointer",
      transition: "background-color 0.3s",
      ...style,
    }}
    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#0056b3")}
    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#007bff")}
  >
    {children}
  </button>
);

const AIGenerator = () => {
  const [inputText, setInputText] = useState(""); // State for user input
  const [aiCards, setAICards] = useState([]); // Store AI-generated flashcards
  const [manualCards, setManualCards] = useState([]); // Store manual flashcards
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [error, setError] = useState("");
  const cardsRef = useRef(); // Ref to the flashcards container

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setAICards([]);
    setCurrentCardIndex(0); // Reset index for new submission

    try {
      const genAI = new GoogleGenerativeAI("AIzaSyDaYFh_n9WVsA62klkxIcS9aBLnn2NOAWc"); // Replace with your actual API key
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const defaultPrompt = "Provide 5 educational key points on the topic below, ensuring that the content is appropriate and informative: ";
      const finalPrompt = `${defaultPrompt}${inputText}`;

      const result = await model.generateContent(finalPrompt);
      const text = result.response.text();

      // Remove all asterisks from the text
      const cleanedText = text.replace(/\*/g, "");

      const lines = cleanedText.split("\n").filter((line) => line.trim() !== "");

      // Map through the lines and create card data
      const cardData = lines.map((line, index) => ({
        title: ` Key Point ${index + 1}`, // Title for each AI point
        content: line.trim() || "No content available.", // Content from the AI response
      }));

      // Set AI cards but skip the first one
      setAICards(cardData.slice(1, 6)); // Skip the first card
    } catch (err) {
      console.error("Error generating text: ", err);
      setError("An error occurred while generating text.");
    }
  };

  const handleAddManualCard = (question, answer) => {
    setManualCards((prevManualCards) => [
      ...prevManualCards,
      { title: question, content: answer },
    ]);
  };

  // Combine AI and Manual cards for display
  const combinedCards = [...aiCards, ...manualCards];

  const handleNextCard = () => {
    if (currentCardIndex < combinedCards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    } else {
      setCurrentCardIndex(0); // Loop back to the first card
    }
  };

  // Function to download the flashcards as PNG
  const downloadCardsAsPNG = () => {
    html2canvas(cardsRef.current).then((canvas) => {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "flashcards.png"; // File name for download
      link.click();
    });
  };

  return (
    <div>
      <h1>AI Flashcard Generator</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter your prompt here"
          style={{ width: "300px", padding: "10px", margin: "10px 0" }}
        />
        <button type="submit" style={{ margin: "5px" }}>Generate Text</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Flashcards container with ref for html2canvas */}
      <div ref={cardsRef}>
        {/* Display combined flashcards */}
        {combinedCards.length > 0 && (
          <FlashcardDisplay
            flashcards={combinedCards}
            currentIndex={currentCardIndex}
          />
        )}

        {/* Next Button */}
        {combinedCards.length > 0 && (
          <Button onClick={handleNextCard}>
            Next
          </Button>
        )}

        {/* Download Button */}
        {combinedCards.length > 0 && (
          <Button onClick={downloadCardsAsPNG}>
            Download Cards as PNG
          </Button>
        )}
      </div>
    </div>
  );
};

export default AIGenerator;
