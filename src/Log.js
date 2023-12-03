import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "./styles.css";

export default function Log() {
  const [winner, setWinner] = useState(""); 
  const [game, setGame] = useState(""); 
  const [date, setDate] = useState("");
  const [entries, setEntries] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [showPopup, setShowPopup] = useState(false);


  useEffect(() => {
    document.title = "Log Games";
  }, []);

  useEffect(() => {
    // fetch existing entries when the component mounts
    fetchEntries();
    console.log("Fetching existing entries in Log")
  }, []);

  useEffect(() => {
    // show the popup when a new entry is submitted
    if (submitted) {
      console.log("Popup rendered");
      setShowPopup(true);

      // hide the popup after 3 seconds
      const timeoutId = setTimeout(() => {
        setShowPopup(false);
      }, 3000);

      // clear timeout
      return () => clearTimeout(timeoutId);
    }
  }, [submitted]);
  

  const fetchEntries = async () => {
    try {
      const response = await fetch("http://localhost:3003/logWinner");
      const data = await response.json();
      setEntries(data.reverse());
    } catch (error) {
      console.error("Error fetching entries:", error);
    }
  };

  const handleSubmit = async () => {
    try {
      // upload data to server
      const response = await fetch("http://localhost:3003/logWinner", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          winner: winner,
          game: game,
          date: date,
        }),
        mode: 'cors',
      });

      const data = await response.json();
      console.log("Data submitted successfully", data);

      // update the entries and reset form fields
      setEntries([data, ...entries]);
      setSubmitted(true);
      setWinner("");
      setGame("");
      setDate("");
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const handleDelete = async (entryId) => {
    try {
      await fetch(`http://localhost:3003/logWinner/${entryId}`, {
        method: "DELETE",
        mode: 'cors',
      });

      // update the entries after deletion
      const updatedEntries = entries.filter((entry) => entry.id !== entryId);
      setEntries(updatedEntries);
      console.log("Data deleted successfully")
    } catch (error) {
      console.error("Error deleting entry:", error);
    }
  };

  return (
    <div>
      <div className="text">
        <h2>Log Game Night</h2>

        <div>
          <label htmlFor="winner">Winner:</label> 
          <input
            type="text"
            id="winner"
            value={winner}
            onChange={(e) => setWinner(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="game">Game:</label> 
          <input
            type="text"
            id="game"
            value={game}
            onChange={(e) => setGame(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="date">Date:</label>
          <input
            type="text"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <div>
          <button type="button" onClick={handleSubmit}>
            Submit
          </button>
        </div>

        {entries.length > 0 && (
          <div>
            <h2>Recent Entries:</h2>
            <ul>
              {entries.map((entry) => (
                <li key={entry.id}>
                  {entry.winner} - {entry.game} - {entry.date} 
                  <button onClick={() => handleDelete(entry.id)}>Delete</button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {showPopup && (
          <div className="popup">
            <p>Entry Added</p>
          </div>
        )}
      </div>

      <div>
          <Link to="/statistics" target="_blank">
            <button>See Statistics</button>
          </Link>
        </div>
    </div>
  );
}
