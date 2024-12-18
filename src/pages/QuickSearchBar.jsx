import React, { useState } from "react";
import "../pages/QuickSearchBar.css";

export default function QuickSearchBar() {
  const [searchQuery, setSearchQuery] = useState(""); // State for User's search query
  const [result, setResult] = useState(null); // State for Search Results
  const [suggestions, setSuggestions] = useState([]); // State for suggestions
  const [error, setError] = useState(""); // State for validation errors

  // Mock data about search criteria
  const tips = {
    "compassionate leadership": [
      "Listen actively to your team.",
      "Show empathy towards challenges.",
      "Encourage open communication.",
      "Lead by example with kindness.",
      "Support personal and professional growth."
    ],
    "team motivation": [
      "Set clear and achievable goals.",
      "Recognize and reward achievements.",
      "Foster a collaborative environment.",
      "Provide constructive feedback.",
      "Encourage creativity and innovation."
    ],
    "stress management": [
      "Promote work-life balance.",
      "Encourage regular breaks.",
      "Provide resources for mental health.",
      "Lead relaxation or mindfulness activities.",
      "Create a supportive work culture."
    ]
  };

  // Function to validate input
  const validateInput = (input) => {
    if (!input.trim()) {
      setError("Search input cannot be empty.");
      return false;
    }
    if (input.trim().length < 3) {
      setError("Input must be at least 3 characters long.");
      return false;
    }
    if (!/^[a-zA-Z0-9 ]+$/.test(input)) {
      setError("Input contains invalid characters. Use letters and numbers only.");
      return false;
    }
    setError(""); // Clear errors if input is valid
    return true;
  };

  // Handle Search button click
  const handleSearch = () => {
    // Run validation before proceeding
    if (!validateInput(searchQuery)) return;

    // If valid, process search
    const filteredResults = Object.keys(tips).filter((key) =>
      key.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (filteredResults.length > 0) {
      setResult(filteredResults.map(key => tips[key]).flat()); // Merge all results into one array
    } else {
      setResult(["No tips found. Try another query."]);
    }
    setSuggestions([]);
  };

  // Handle real-time input change
  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Validate real-time input
    if (query.trim().length < 3) {
      setError("Keep typing... Minimum 3 characters required.");
      setSuggestions([]);
      return;
    } else {
      setError(""); // Clear the error
    }

    // Generate suggestions based on input
    const filteredSuggestions = Object.keys(tips).filter((key) =>
      key.toLowerCase().includes(query.toLowerCase())
    );
    setSuggestions(filteredSuggestions);
  };

  // Capitalize the first letter of each word
  function capitalizeWords(input) {
    let str = input.trim(); 
    return str
      .toLowerCase() // Ensure the rest of the letters are lowercase
      .split(" ") // Split the string into words
      .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
      .join(" "); // Join the words back into a single string
  }

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    setSuggestions([]);
    setError(""); // Clear any existing error
  };

  return (
    <>
      <div className="homepage-container">
        <div className="search-container">
          <div className="search-row">
            <input
              type="text"
              placeholder="Search tips (e.g., 'compassionate leadership')"
              value={searchQuery}
              onChange={handleInputChange}
            />
            <button onClick={handleSearch}>Search</button>
          </div>
          {error && <p className="error-message">{error}</p>}

          {suggestions.length > 0 && (
            <ul className="suggestions-list">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>

        {result && (
          <div className="result-container">
            <h4>{capitalizeWords(searchQuery)}</h4>
            <ul>
              {result.map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
