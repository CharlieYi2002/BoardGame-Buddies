import React, { useState, useEffect } from "react";
import "./styles.css";

export default function Statistics() {
  const [entries, setEntries] = useState([]);
  const [winnerPercentages, setWinnerPercentages] = useState([]);
  const [mostFrequentWinners, setMostFrequentWinners] = useState([]);

  useEffect(() => {
    document.title = "Statistics";
  }, []);

  useEffect(() => {
    // fetch existing entries when the component mounts
    fetchEntries();
    console.log("Fetching existing entries in statistics");
  }, []);

  useEffect(() => {
    // recalculate percentages and most frequent winners whenever entries change in the log
    calculateWinnerStatistics();
    console.log("Updating winner statistics");
  }, [entries]);

  const fetchEntries = async () => {
    try {
      const response = await fetch("http://localhost:3003/logWinner");
      const data = await response.json();
      setEntries(data.reverse());
    } catch (error) {
      console.error("Error fetching entries:", error);
    }
  };

  const calculateWinnerStatistics = () => {
    const winnerCounts = {};
    const mostFrequentWinnersMap = {};

    entries.forEach((entry) => {
      // calculate winner percentages
      winnerCounts[entry.winner] = (winnerCounts[entry.winner] || 0) + 1;

      // calculate most frequent winners for each game
      if (!mostFrequentWinnersMap[entry.game]) {
        mostFrequentWinnersMap[entry.game] = {};
      }

      mostFrequentWinnersMap[entry.game][entry.winner] =
        (mostFrequentWinnersMap[entry.game][entry.winner] || 0) + 1;
    });

    const totalEntries = entries.length;

    const percentages = Object.keys(winnerCounts).map((winner) => ({
      winner,
      percentage: (winnerCounts[winner] / totalEntries) * 100,
    }));

    setWinnerPercentages(percentages);

    const mostFrequentWinnersArray = Object.keys(mostFrequentWinnersMap).map(
      (game) => {
        const winnersCount = mostFrequentWinnersMap[game];
        const mostFrequentWinner = Object.keys(winnersCount).reduce(
          (prevWinner, currentWinner) =>
            winnersCount[currentWinner] > winnersCount[prevWinner]
              ? currentWinner
              : prevWinner,
          Object.keys(winnersCount)[0]
        );

        return { game, mostFrequentWinner };
      }
    );

    setMostFrequentWinners(mostFrequentWinnersArray);
  };

  return (
    <div>
      <div className="text">
        <h2>Statistics</h2>
        {entries.length > 0 && (
          <div>
            <h2>Winners:</h2>
            <ul>
              {entries.map((entry) => (
                <li key={entry.id}>
                  {entry.winner} - {entry.game} - {entry.date}
                </li>
              ))}
            </ul>
          </div>
        )}

        {winnerPercentages.length > 0 && (
          <div>
            <h2>Winners' Percentages:</h2>
            <ul>
              {winnerPercentages.map((item) => (
                <li key={item.winner}>
                  {item.winner}: {item.percentage.toFixed(2)}%
                </li>
              ))}
            </ul>
          </div>
        )}

        {mostFrequentWinners.length > 0 && (
          <div>
            <h2>Most Frequent Winners for Each Game:</h2>
            <ul>
              {mostFrequentWinners.map((item) => (
                <li key={item.game}>
                  {item.game}: {item.mostFrequentWinner}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
