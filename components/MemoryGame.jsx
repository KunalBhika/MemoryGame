import React, { useState, useEffect } from "react";

function MemoryGame() {
  const [gridSize, setGridSize] = useState(4);
  const [cards, setCards] = useState([]);

  const [flipped, setFlipped] = useState([]);
  const [solved, setSolved] = useState([]);
  const [disabled, setDisabled] = useState(false);

  const [won, setWon] = useState(false);

  const handleGridSizeChange = (e) => {
    const size = parseInt(e.target.value);
    if (size >= 2 && size <= 10) setGridSize(size);
  };

  const initializeGame = () => {
    const totalCards = gridSize * gridSize;
    const pairCount = Math.floor(totalCards / 2);
    const numbers = [...Array(pairCount).keys()].map((n) => n + 1);
    const shuffledCards = [...numbers, ...numbers]
      .sort(() => Math.random() - 0.5)
      .map((number, index) => ({ id: index, number }));
    setCards(shuffledCards);

    setFlipped([]);
    setSolved([]);
    setWon(false);
  };

  useEffect(() => {
    initializeGame();
  }, [gridSize]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen  bg-gray-100">
      <div className="text-3xl font-bold mb-5">MEMORY GAME</div>

      <div className="mb-4">
        <label htmlFor="gridSize"> Grid Size : </label>
        <input
          type="number"
          name="gridSize"
          id="gridSize"
          min={2}
          max={10}
          value={gridSize}
          onChange={handleGridSizeChange}
          className="border-2 rounded bg-white border-gray-100 px-4"
        />
      </div>

      <div
        className={`grid gap-2`}
        style={{ gridTemplateColumns: `repeat( ${gridSize} , 1fr )` }}
      >
        {cards.map((card) => {
          return (
            <div
              className="bg-gray-200 text-gray-400 text-xl font-bold flex justify-center items-center rounded-lg cursor-pointer transition-all duration-300"
              key={card.id}
              style={{ width: "100px", height: "100px" }}
            >
              {card.number}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MemoryGame;
