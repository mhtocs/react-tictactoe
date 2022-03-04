import Square from "./Square";
import { useEffect, useState } from "react";

let Board = () => {
  const [squares, setSquares] = useState(
    //2d 3x3 array
    Array.from(Array(3), (f) => Array(3).fill(null))
  );

  const [status, setStatus] = useState(null);

  const [isX, setIsX] = useState(true);
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    setStatus(`Next player: ${isX ? "X" : "O"}`);
    if (winner != null) setStatus(`Winner: ${winner}`);
  }, [isX, winner]);

  const handleClick = (x, y) => {
    if (squares[x][y]) return;
    squares[x][y] = isX ? "X" : "O";
    setIsX((isX) => !isX);

    let winner = getWinner(x, y);
    if (winner) {
      setWinner(winner);
    }
  };

  const isGameOver = () => {
    for (let i = 0; i < 3; i += 1) {
      for (let j = 0; j < 3; j += 1) {
        if (!squares[i][j]) return false;
      }
    }

    return true;
  };

  const getWinner = (x, y) => {
    let matchedOnHorizontalLine =
      squares[x][0] === squares[x][1] && squares[x][1] === squares[x][2];

    let matchedOnVerticalLine =
      squares[0][y] === squares[1][y] && squares[1][y] === squares[2][y];

    let matchedOnDiagnolLine =
      x === y &&
      squares[0][0] === squares[1][1] &&
      squares[0][0] === squares[2][2];

    let matchedOnOppositeDiagnolLine =
      x + y === 2 &&
      squares[0][2] === squares[1][1] &&
      squares[1][1] === squares[2][0];

    if (
      matchedOnHorizontalLine ||
      matchedOnVerticalLine ||
      matchedOnDiagnolLine ||
      matchedOnOppositeDiagnolLine
    )
      return squares[x][y];

    return null;
  };

  const renderSquare = (x, y) => {
    return <Square value={squares[x][y]} onClick={() => handleClick(x, y)} />;
  };

  const restartGame = () => {
    setIsX(true);
    setSquares(Array.from(Array(3), (f) => Array(3).fill(null)));
  };
  return (
    <div className="board">
      <div className="board-row">
        {renderSquare(0, 0)}
        {renderSquare(0, 1)}
        {renderSquare(0, 2)}
      </div>
      <div className="board-row">
        {renderSquare(1, 0)}
        {renderSquare(1, 1)}
        {renderSquare(1, 2)}
      </div>
      <div className="board-row">
        {renderSquare(2, 0)}
        {renderSquare(2, 1)}
        {renderSquare(2, 2)}
      </div>
      <div className="status">{status}</div>
      <button className="restart" onClick={() => restartGame()}>
        Restart Game!
      </button>
    </div>
  );
};

export default Board;
