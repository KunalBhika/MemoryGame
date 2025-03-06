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

  const checkIfMatched = (secondId) => {
    let firstNumber = -1,
      secondNumber = -1;

    cards.forEach((element) => {
      if (element.id === flipped[0]) firstNumber = element.number;
      if (element.id === secondId) secondNumber = element.number;
    });

    return firstNumber === secondNumber;
  };

  const handleClick = (id) => {
    if (disabled || won) return;

    if (flipped.length === 0) {
      setFlipped([id]);
      return;
    }

    if (flipped.length === 1) {
      setDisabled(true);
      if (id !== flipped[0]) {
        setFlipped([...flipped, id]);
        if (checkIfMatched(id)) {
          setSolved([...solved, flipped[0], id]);
          console.log(solved.length , (gridSize * gridSize));
          if(parseInt(solved.length+2) === parseInt(gridSize * gridSize)) setWon(true);
        }

        // if not match reflip card after 1 sec delay
        setTimeout(() => {
          setFlipped([]);
          setDisabled(false);
        }, 1000);

      } else {
        setFlipped([]);
        setDisabled(false);
      }
    }
  };

  const resetGame = () => {
    setFlipped([]);
    setDisabled(false);
    setWon(false);
    setSolved([]);
  }

  const isFlipped = (id) => {
    return flipped.includes(id);
  };

  const isSolved = (id) => {
    return solved.includes(id);
  };

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

      {gridSize % 2 !== 0 ? (
        <h2>Grid Size should be multiple of 2</h2>
      ) : (
        <div
          className={`grid gap-3`}
          style={{
            gridTemplateColumns: `repeat( ${gridSize} , 1fr )`,
            width: `min(100% , ${gridSize * 5.5}rem)`,
          }}
        >
          {cards.map((card) => {
            return (
              <div
                className={`aspect-square text-xl font-bold flex justify-center items-center 
              rounded-lg cursor-pointer transition-all duration-300 ${
                isSolved(card.id)
                  ? "bg-green-500 text-white"
                  : isFlipped(card.id)
                  ? "bg-yellow-500 text-white"
                  : "bg-gray-200 text-gray-400"
              }`}
                key={card.id}
                onClick={() => handleClick(card.id)}
              >
                {isSolved(card.id)
                  ? card.number
                  : isFlipped(card.id)
                  ? card.number
                  : "?"}
              </div>
            );
          })}
        </div>
      )}

      {won ? <h1 className="m-5 text-green-500 font-bold text-3xl">You Won!!</h1> : <span></span>}

      <button
        type="button"
        onClick={resetGame}
        className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 
        focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 m-5 cursor-pointer
        dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
      >
        Reset Game
      </button>
    </div>
  );
}

export default MemoryGame;
