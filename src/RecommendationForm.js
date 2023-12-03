import React, { useState, useEffect } from "react";

function RecommendationForm() {
  const [name, setName] = useState("");
  const [recommendation, setRecommendation] = useState("");
  const [comments, setComments] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    // fetch existing comments
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      console.log("Fetching comments in RecommendationForm");
      const response = await fetch("http://localhost:3002/comments");
      const data = await response.json();
      setComments(data.reverse());
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const submitForm = async () => {
    // check for both fields
    if (!name || !recommendation) {
      setError("Both fields are required");
      return;
    }

    const timestamp = new Date().toLocaleString();

    const newComment = {
      name: name,
      recommendation: recommendation,
      timestamp: timestamp,
    };

    try {
      // Send a POST request to add a new comment
      await fetch("http://localhost:3002/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newComment),
        mode: 'cors',
      });

      // Clear error and form fields
      setError("");
      setName("");
      setRecommendation("");

      // Fetch updated comments
      fetchComments();

      console.log("Submission successful");
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  

  return (
    <div>
      <h1>Game Recommendation Form</h1>
      <form>
        <label htmlFor="name">Your Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <br />

        <label htmlFor="recommendation">Game Recommendation:</label>
        <input
          type="text"
          id="recommendation"
          value={recommendation}
          onChange={(e) => setRecommendation(e.target.value)}
          required
        />
        <br />

        <button type="button" onClick={submitForm}>
          Submit
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {comments.length > 0 && (
        <div>
          <h2>Recent Recommendations:</h2>
          <ul>
            {comments.map((comment) => (
              <li key={comment.id}>
                <strong>{comment.name}</strong> recommended "
                {comment.recommendation}" - {comment.timestamp}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default RecommendationForm;
