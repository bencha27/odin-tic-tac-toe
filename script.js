// function Gameboard() {
//   const board = [];
//   for (let i = 0; i < 9; i++) {
//     board.push(Cell());
//   }

//   const getBoard = () => board;

//   const updateBoard = (cell, token) => {
//     if (board[cell].getValue() !== "_") {
//       return console.log("Invalid move");
//     }

//     board[cell].updateValue(token);
//   }

//   const printBoard = () => {
//     const boardWithValues = board.map(cell => cell.getValue());
//     console.log(`${boardWithValues[0]} ${boardWithValues[1]} ${boardWithValues[2]}
// ${boardWithValues[3]} ${boardWithValues[4]} ${boardWithValues[5]}
// ${boardWithValues[6]} ${boardWithValues[7]} ${boardWithValues[8]}`);
//   }

//   return { getBoard, updateBoard, printBoard };
// }

function Gameboard() {
  const board = {
    A1: "_", 
    B1: "_", 
    C1: "_", 
    A2: "_", 
    B2: "_", 
    C2: "_", 
    A3: "_", 
    B3: "_", 
    C3: "_", 
  };

  const getBoard = () => board;

  const updateBoard = (cell, token) => {
    // if (board[cell] !== "_") {
    //   return console.log("Invalid move"); // Replace 
    // }
    board[cell] = token;
  }

  const printBoard = () => {
    console.log(
`  A B C
1 ${board.A1} ${board.B1} ${board.C1}
2 ${board.A2} ${board.B2} ${board.C2}
3 ${board.A3} ${board.B3} ${board.C3}`
    );
  }

  return { getBoard, updateBoard, printBoard };
}

// function Cell() {
//   let value = "_";

//   const updateValue = (playerToken) => {
//     value = playerToken;
//   }

//   const getValue = () => value;

//   return { updateValue, getValue };
// }




// function GameController() {
//   const player1 = Player("Player 1", "X");
//   const player2 = Player("Player 2", "O");
  
//   const startGame = () => Game(player1, player2);

//   return { startGame };
// }

const gameController = (function () {
  const player1 = Player("Player 1", "X");
  const player2 = Player("Player 2", "O");
  
  const startGame = () => Game(player1, player2);

  return { startGame };
})();




function Game(player1, player2) {
  let status = true;

  const board = Gameboard();
  const getGameboard = () => board.getBoard();
  const printGameboard = () => board.printBoard();
  
  let activePlayer = player1;
  const getActivePlayer = () => activePlayer.getName();

  console.log(`${activePlayer.getName()}'s turn`);

  const switchPlayer = () => {
    activePlayer = activePlayer === player1 ? player2 : player1;
    console.log(`${activePlayer.getName()}'s turn`);
  }
  
  const validateMove = (cell) => {
    if (board.getBoard()[cell] !== "_") return false;
    else return true;
  }
  
  let turn = 1;
  let winner;
  const playTurn = (cell) => {
    if (status === false) return;

    if (!validateMove(cell)) return;
    
    board.updateBoard(cell, activePlayer.getToken());
    activePlayer.addCell(cell);
    board.printBoard();
    
    if (turn > 4) {
      if (activePlayer.checkWin()) {
        winner = activePlayer;
        return endGame();
      }

      if (turn === 9) return endGame();
    }
    
    switchPlayer();
    turn++;
  }
  
  const endGame = () => {
    if (winner) {
      console.log(`${activePlayer.getName()} wins!`);
    } else {
      console.log("Cat's game!");
    }
    console.log("GAME OVER");
    status = false;
  }

  return { player1, player2, getGameboard, printGameboard, getActivePlayer, playTurn };
}




function Player(name, token) {
  name;
  token;

  const cells = new Set();

  const getCells = () => cells;

  const getName = () => name;

  const getToken = () => token;

  const addCell = (cell) => cells.add(cell);

  const checkWin = () => {
    if (cells.has("A1")) {
      if (cells.has("B1")) {
        if (cells.has("C1")) return true;
      } else if (cells.has("A2")) {
        if (cells.has("A3")) return true;
      } else if (cells.has("B2")) {
        if (cells.has("C3")) return true;
      }
    } else if (cells.has("B2")) {
      if (cells.has("A2")) {
        if (cells.has("C2")) return true;
      } else if (cells.has("B1")) {
        if (cells.has("B3")) return true;
      } else if (cells.has("C1")) {
        if (cells.has("A3")) return true;
      }
    } else if (cells.has("C3")) {
      if (cells.has("A3")) {
        if (cells.has("B3")) return true;
      } else if (cells.has("C1")) {
        if (cells.has("C2")) return true;
      }
    }
    return false;
  }

  return { getCells, getName, getToken, addCell, checkWin };
}