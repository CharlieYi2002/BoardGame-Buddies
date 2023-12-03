const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
const PORT = 3003;

// Mock database for storing entries
let entries = [];

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, DELETE"); // Include DELETE method
  next();
});

app.get("/logWinner", (req, res) => { // Updated endpoint name
  // return entries
  res.status(200).json(entries);
});

app.post("/logWinner", (req, res) => {
  try {
    const { winner, game, date } = req.body;

    // databases
    const newEntry = {
      id: Date.now(),
      winner: winner, 
      game: game,
      date: date,
    };

    entries.unshift(newEntry);

    console.log("Entry added successfully:", newEntry);

    res.status(201).json(newEntry);
  } catch (error) {
    console.error("Error adding entry:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

app.delete("/logWinner/:id", (req, res) => { //endpoint
  try {
    const entryId = parseInt(req.params.id, 10);

    
    const index = entries.findIndex((entry) => entry.id === entryId);

    if (index !== -1) {
      // remove the entry from the list
      const deletedEntry = entries.splice(index, 1)[0];
      console.log("Entry deleted successfully:", deletedEntry);

      res.status(200).json({ success: true, message: "Entry deleted successfully" });
    } else {
      res.status(404).json({ success: false, message: "Entry not found" });
    }
  } catch (error) {
    console.error("Error deleting entry:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
