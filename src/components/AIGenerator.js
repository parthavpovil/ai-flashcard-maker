import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const AIGenerator = ({ onAddFlashcard }) => {
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const genAI = new GoogleGenerativeAI("AIzaSyDaYFh_n9WVsA62klkxIcS9aBLnn2NOAWc");
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const defaultPrompt = "Provide 5 educational key points on the topic below, ensuring that the content is appropriate and informative: ";
      const finalPrompt = `${defaultPrompt}${inputText}`;

      const result = await model.generateContent(finalPrompt);
      const text = result.response.text();
      const cleanedText = text.replace(/\*/g, "");
      const lines = cleanedText.split("\n").filter((line) => line.trim() !== "");

      lines.slice(1, 6).forEach((line, index) => {
        onAddFlashcard(`Key Point ${index + 1}`, line.trim() || "No content available.");
      });
    } catch (err) {
      console.error("Error generating text: ", err);
      setError("An error occurred while generating text.");
    } finally {
      setIsLoading(false);
      setInputText("");
    }
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <h2 style={{ fontSize: '24px', marginBottom: '10px', color: '#333' }}>AI Flashcard Generator</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter your topic here"
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
            cursor: 'pointer',
            opacity: isLoading ? 0.7 : 1
          }}
          disabled={isLoading}
        >
          {isLoading ? 'Generating...' : 'Generate Flashcards'}
        </button>
      </form>
      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
    </div>
  );
};

export default AIGenerator;