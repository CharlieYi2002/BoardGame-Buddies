import React, { useState, useEffect } from "react";
import "./styles.css";
import boardGamesData from "./game_list.json";
import RecommendationForm from "./RecommendationForm";

const Games = () => {
  useEffect(() => {
    document.title = "Games";
    console.log("Path to Games successful. Document title updated.")
  }, []);

  const [boardGames, setBoardGames] = useState(boardGamesData);

  const topPicks = boardGames.filter((game) => game.topPick === true);
  const classics = boardGames.filter((game) => game.classic === true);

  return (
    <div className="text">
      <h2>Top Picks</h2>
      <div className="games-container">
        {topPicks.map((game) => (
          <div key={game.id} className="game-card">
            <h3>{game.title}</h3>
            <p>Price: ${game.price}</p>
            <a href={game.link} target="_blank" rel="link to amazon">
              Buy on Amazon
            </a>
            <img src={game["image-link"]} alt={game.title} />
          </div>
        ))}
      </div>
      <h2>Classics</h2>
      <div className="games-container">
        {classics.map((game) => (
          <div key={game.id} className="game-card">
            <h3>{game.title}</h3>
            <p>Price: ${game.price}</p>
            <a href={game.link} target="_blank" rel="link to amazon">
              Buy on Amazon
            </a>
            <img src={game["image-link"]} alt={game.title} />
          </div>
        ))}
      </div>
      <h2>Want to Recommend a Game?</h2>
      <RecommendationForm />
    </div>
  );
};

export default Games;
