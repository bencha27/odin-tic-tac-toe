function Gameboard() {
  const board = [];
  for (let i = 0; i < 9; i++) {
    board.push(Cell());
  }

  const getBoard = () => board;

  const updateBoard = (cell, token) => {
    if (board[cell].getCell() !== "_") {
      console.log("Invalid move");
    }

    board[cell].updateCell(token);
  }

  const printBoard = () => {
    const boardWithValues = board.map(cell => cell.getCell());
    console.log(`${boardWithValues[0]} ${boardWithValues[1]} ${boardWithValues[2]}
${boardWithValues[3]} ${boardWithValues[4]} ${boardWithValues[5]}
${boardWithValues[6]} ${boardWithValues[7]} ${boardWithValues[8]}`);
  }

  return { getBoard, updateBoard, printBoard };
}

function Cell() {
  let value = "_";

  const updateCell = (playerToken) => {
    value = playerToken;
  }

  const getCell = () => value;

  return { updateCell, getCell };
}