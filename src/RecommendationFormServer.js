const express = require("express");
const bodyParser = require("body-parser");
//const cors = require("cors");

const app = express();
const PORT = 3002;

app.use(bodyParser.json());
//app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});




const comments = [
  {
    id: 1,
    name: "Charlie Yi",
    recommendation: "Terraforming Mars",
    timestamp: "12/2/2023, 9:04:40 PM",
  },
];

app.get("/comments", (req, res) => {
  res.json(comments);
  console.log("Getting comments in RecommendationFormServer")
});

app.post("/comments", (req, res) => {
  const newComment = {
    id: comments.length + 1,
    name: req.body.name,
    recommendation: req.body.recommendation,
    timestamp: new Date().toLocaleString(),
  };

  comments.push(newComment);
  res.json(newComment);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
