const gameBoard = document.querySelector("#gameboard");
const playerDisplay = document.querySelector("#player");
infoDisplay = document.querySelector("#info-display");
const width = 8;
let playerGo = "black";
playerDisplay.textContent = "black";
const startPieces = [
  rook,
  knight,
  bishop,
  queen,
  king,
  bishop,
  knight,
  rook,
  pawn,
  pawn,
  pawn,
  pawn,
  pawn,
  pawn,
  pawn,
  pawn,
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  pawn,
  pawn,
  pawn,
  pawn,
  pawn,
  pawn,
  pawn,
  pawn,
  rook,
  knight,
  bishop,
  queen,
  king,
  bishop,
  knight,
  rook,
];
const createBoard = () => {
  startPieces.forEach((startPiece, i) => {
    const square = document.createElement("div");
    square.classList.add("square");
    square.setAttribute("square-id", i);
    square.innerHTML = startPiece;
    square.firstChild?.setAttribute("draggable", true);
    square.classList.add("biege");
    const row = Math.floor((63 - i) / 8) + 1;
    if (row % 2 === 0) {
      square.classList.add(i % 2 == 0 ? "beige" : "brown");
    } else {
      square.classList.add(i % 2 == 0 ? "brown" : "beige");
    }
    if (i <= 15) {
      square.firstChild.firstChild.classList.add("black");
    }
    if (i >= 48) {
      square.firstChild.firstChild.classList.add("white");
    }
    gameBoard.append(square);
  });
};
createBoard();
const allSquares = document.querySelectorAll("#gameboard .square");
allSquares.forEach((square) => {
  square.addEventListener("dragstart", dragStart);
  square.addEventListener("dragover", dragOver);
  square.addEventListener("drop", dragDrop);
});
let StartPositionId;
let draggedElement;

function dragStart(e) {
  StartPositionId = e.target.parentNode.getAttribute("square-id");
  draggedElement = e.target;
}
function dragOver(e) {
  e.preventDefault();
}
function dragDrop(e) {
  e.stopPropagation();
  const taken = e.target.classList.contains("piece");
  const valid = checkIfValid(e.target);

  correctGo = draggedElement.firstChild.classList.contains(playerGo);
  const opponentGo = playerGo === "white" ? "black" : "white";
  const takenByOpponent = e.target.firstChild?.classList.contains(opponentGo);

  if (correctGo) {
    if (takenByOpponent && valid) {
      e.target.parentNode.append(draggedElement);
      e.target.remove();
      changePlayer();
      return;
    }
  }
  if (taken && !takenByOpponent) {
    infoDisplay.innerText = "You cannot go here";
    setTimeout(() => (infoDisplay.textContent = ""), 2000);
    return;
  }
  if (valid) {
    e.target.append(draggedElement);
    checkForWin()
    changePlayer();
    return;
  }
}

function changePlayer() {
  if (playerGo === "black") {
    reverseIds();
    playerGo = "white";
    playerDisplay.textContent = "white";
  } else {
    revertIds();
    playerGo = "black";
    playerDisplay.textContent = "black";
  }
}
function reverseIds() {
  const allSquares = document.querySelectorAll(".square");
  allSquares.forEach((square, i) => {
    square.setAttribute("square-id", width * width - 1 - i);
  });
}
function revertIds() {
  const allSquares = document.querySelectorAll(".square");
  allSquares.forEach((square, i) => {
    square.setAttribute("square-id", i);
  });
}
function checkIfValid(target) {
  const startId = Number(StartPositionId);
  const targetId = Number(
    target.getAttribute("square-id") ||
      Number(target.parentNode.getAttribute("square-id"))
  );
  const piece = draggedElement.id;
  console.log("targetID", targetId);
  console.log("StartId", startId);
  console.log("piece", piece);
  switch (piece) {
    case "pawn":
      const starterRow = [8, 9, 10, 11, 12, 13, 14, 15];
      if (
        (starterRow.includes(startId) && startId + width * 2 === targetId) ||
        startId + width === targetId ||
        (startId + width - 1 === targetId &&
          document.querySelector(`[square-id="${startId + width -1}"]`)
            .firstChild) ||
        (startId + width + 1 === targetId &&
          document.querySelector(`[square-id="${startId + width -1}"]`).firstChild)
      ) {
        return true;
      }
      break;
      case 'knight':
        if (startId + width*2 -1 === targetId ||
            startId + width*2 +1 === targetId ||
            startId + width-2  === targetId ||
            startId + width+2 === targetId ||
            startId - width*2 -1 === targetId ||
            startId - width*2 +1 === targetId ||
            startId - width-2  === targetId ||
            startId - width+2 === targetId
            ) {
                  return true;
                }
                break;
                case 'bishop':
                    if(
                        startId + width + 1 === targetId ||
                        startId + width*2 + 2 === targetId && !document.querySelector(`[square-id="${startId + width + 1}"]`.firstChild)||
                        startId + width*3 + 3 === targetId && !document.querySelector(`[square-id="${startId + width + 1}"]`.firstChild) && !document.querySelector(`[square-id="${startId + width *2 + 2}"]`.firstChild) ||
                        startId + width*4 + 4 === targetId && !document.querySelector(`[square-id="${startId + width + 1}"]`.firstChild) && !document.querySelector(`[square-id="${startId + width *2 + 2}"]`.firstChild)&& !document.querySelector(`[square-id="${startId + width *3 + 3}"]`.firstChild) ||
                        startId + width*5 + 5 === targetId && !document.querySelector(`[square-id="${startId + width + 1}"]`.firstChild) && !document.querySelector(`[square-id="${startId + width *2 + 2}"]`.firstChild)&& !document.querySelector(`[square-id="${startId + width *3 + 3}"]`.firstChild)&& !document.querySelector(`[square-id="${startId + width *4 + 4}"]`.firstChild) ||
                        startId + width*6 + 6 === targetId && !document.querySelector(`[square-id="${startId + width + 1}"]`.firstChild) && !document.querySelector(`[square-id="${startId + width *2 + 2}"]`.firstChild)&& !document.querySelector(`[square-id="${startId + width *3 + 3}"]`.firstChild)&& !document.querySelector(`[square-id="${startId + width *4 + 4}"]`.firstChild)&& !document.querySelector(`[square-id="${startId + width *5 + 5}"]`.firstChild) ||
                        startId + width*7 + 7 === targetId && !document.querySelector(`[square-id="${startId + width + 1}"]`.firstChild) && !document.querySelector(`[square-id="${startId + width *2 + 2}"]`.firstChild)&& !document.querySelector(`[square-id="${startId + width *3 + 3}"]`.firstChild)&& !document.querySelector(`[square-id="${startId + width *4 + 4}"]`.firstChild)&& !document.querySelector(`[square-id="${startId + width *5 + 5}"]`.firstChild)&& !document.querySelector(`[square-id="${startId + width *6 + 6}"]`.firstChild) ||
                        startId - width - 1 === targetId ||
                        startId - width*2 - 2 === targetId && !document.querySelector(`[square-id="${startId - width - 1}"]`.firstChild)||
                        startId - width*3 - 3 === targetId && !document.querySelector(`[square-id="${startId - width - 1}"]`.firstChild) && !document.querySelector(`[square-id="${startId - width *2 - 2}"]`.firstChild) ||
                        startId - width*4 - 4 === targetId && !document.querySelector(`[square-id="${startId - width - 1}"]`.firstChild) && !document.querySelector(`[square-id="${startId - width *2 - 2}"]`.firstChild)&& !document.querySelector(`[square-id="${startId - width *3 - 3}"]`.firstChild) ||
                        startId - width*5 - 5 === targetId && !document.querySelector(`[square-id="${startId - width - 1}"]`.firstChild) && !document.querySelector(`[square-id="${startId - width *2 - 2}"]`.firstChild)&& !document.querySelector(`[square-id="${startId - width *3 - 3}"]`.firstChild)&& !document.querySelector(`[square-id="${startId - width *4 - 4}"]`.firstChild) ||
                        startId - width*6 - 6 === targetId && !document.querySelector(`[square-id="${startId - width - 1}"]`.firstChild) && !document.querySelector(`[square-id="${startId - width *2 - 2}"]`.firstChild)&& !document.querySelector(`[square-id="${startId - width *3 - 3}"]`.firstChild)&& !document.querySelector(`[square-id="${startId - width *4 - 4}"]`.firstChild)&& !document.querySelector(`[square-id="${startId - width *5 - 5}"]`.firstChild) ||
                        startId - width*7 - 7 === targetId && !document.querySelector(`[square-id="${startId - width - 1}"]`.firstChild) && !document.querySelector(`[square-id="${startId - width *2 - 2}"]`.firstChild)&& !document.querySelector(`[square-id="${startId - width *3 - 3}"]`.firstChild)&& !document.querySelector(`[square-id="${startId - width *4 - 4}"]`.firstChild)&& !document.querySelector(`[square-id="${startId - width *5 - 5}"]`.firstChild)&& !document.querySelector(`[square-id="${startId - width *6 - 6}"]`.firstChild) ||
                        startId - width + 1 === targetId ||
                        startId - width*2 + 2 === targetId && !document.querySelector(`[square-id="${startId - width + 1}"]`.firstChild)||
                        startId - width*3 + 3 === targetId && !document.querySelector(`[square-id="${startId - width + 1}"]`.firstChild) && !document.querySelector(`[square-id="${startId - width *2 + 2}"]`.firstChild) ||
                        startId - width*4 + 4 === targetId && !document.querySelector(`[square-id="${startId - width + 1}"]`.firstChild) && !document.querySelector(`[square-id="${startId - width *2 + 2}"]`.firstChild)&& !document.querySelector(`[square-id="${startId - width *3 + 3}"]`.firstChild) ||
                        startId - width*5 + 5 === targetId && !document.querySelector(`[square-id="${startId - width + 1}"]`.firstChild) && !document.querySelector(`[square-id="${startId - width *2 + 2}"]`.firstChild)&& !document.querySelector(`[square-id="${startId - width *3 + 3}"]`.firstChild)&& !document.querySelector(`[square-id="${startId - width *4 + 4}"]`.firstChild) ||
                        startId - width*6 + 6 === targetId && !document.querySelector(`[square-id="${startId - width + 1}"]`.firstChild) && !document.querySelector(`[square-id="${startId - width *2 + 2}"]`.firstChild)&& !document.querySelector(`[square-id="${startId - width *3 + 3}"]`.firstChild)&& !document.querySelector(`[square-id="${startId - width *4 + 4}"]`.firstChild)&& !document.querySelector(`[square-id="${startId - width *5 + 5}"]`.firstChild) ||
                        startId - width*7 + 7 === targetId && !document.querySelector(`[square-id="${startId - width + 1}"]`.firstChild) && !document.querySelector(`[square-id="${startId - width *2 + 2}"]`.firstChild)&& !document.querySelector(`[square-id="${startId - width *3 + 3}"]`.firstChild)&& !document.querySelector(`[square-id="${startId - width *4 + 4}"]`.firstChild)&& !document.querySelector(`[square-id="${startId - width *5 + 5}"]`.firstChild)&& !document.querySelector(`[square-id="${startId - width *6 + 6}"]`.firstChild) ||
                        startId + width - 1 === targetId ||
                        startId + width*2 - 2 === targetId && !document.querySelector(`[square-id="${startId + width - 1}"]`.firstChild)||
                        startId + width*3 - 3 === targetId && !document.querySelector(`[square-id="${startId + width - 1}"]`.firstChild) && !document.querySelector(`[square-id="${startId + width *2 - 2}"]`.firstChild) ||
                        startId + width*4 - 4 === targetId && !document.querySelector(`[square-id="${startId + width - 1}"]`.firstChild) && !document.querySelector(`[square-id="${startId + width *2 - 2}"]`.firstChild)&& !document.querySelector(`[square-id="${startId + width *3 - 3}"]`.firstChild) ||
                        startId + width*5 - 5 === targetId && !document.querySelector(`[square-id="${startId + width - 1}"]`.firstChild) && !document.querySelector(`[square-id="${startId + width *2 - 2}"]`.firstChild)&& !document.querySelector(`[square-id="${startId + width *3 - 3}"]`.firstChild)&& !document.querySelector(`[square-id="${startId + width *4 - 4}"]`.firstChild) ||
                        startId + width*6 - 6 === targetId && !document.querySelector(`[square-id="${startId + width - 1}"]`.firstChild) && !document.querySelector(`[square-id="${startId + width *2 - 2}"]`.firstChild)&& !document.querySelector(`[square-id="${startId + width *3 - 3}"]`.firstChild)&& !document.querySelector(`[square-id="${startId + width *4 - 4}"]`.firstChild)&& !document.querySelector(`[square-id="${startId + width *5 - 5}"]`.firstChild) ||
                        startId + width*7 - 7 === targetId && !document.querySelector(`[square-id="${startId + width - 1}"]`.firstChild) && !document.querySelector(`[square-id="${startId + width *2 - 2}"]`.firstChild)&& !document.querySelector(`[square-id="${startId + width *3 - 3}"]`.firstChild)&& !document.querySelector(`[square-id="${startId + width *4 - 4}"]`.firstChild)&& !document.querySelector(`[square-id="${startId + width *5 - 5}"]`.firstChild)&& !document.querySelector(`[square-id="${startId + width *6 - 6}"]`.firstChild)
                       
                       ){
                        return true;
                    }
                    break;
                    case 'rook': 
                    if(startId + width === targetId ||
                    startId + width *2 === targetId && !document.querySelector(`[square-id="${startId + width}"]`.firstChild)||
                    startId + width *3 === targetId && !document.querySelector(`[square-id="${startId + width}"]`.firstChild)&& !document.querySelector(`[square-id="${startId + width *2}"]`.firstChild)||    
                    startId + width *4 === targetId && !document.querySelector(`[square-id="${startId + width}"]`.firstChild)&& !document.querySelector(`[square-id="${startId + width *2}"]`.firstChild) && !document.querySelector(`[square-id="${startId + width *3}"]`.firstChild)||
                    startId + width *5 === targetId && !document.querySelector(`[square-id="${startId + width}"]`.firstChild)&& !document.querySelector(`[square-id="${startId + width *2}"]`.firstChild) && !document.querySelector(`[square-id="${startId + width *3}"]`.firstChild) && !document.querySelector(`[square-id="${startId + width *4}"]`.firstChild)||
                    startId + width *6 === targetId && !document.querySelector(`[square-id="${startId + width}"]`.firstChild)&& !document.querySelector(`[square-id="${startId + width *2}"]`.firstChild) && !document.querySelector(`[square-id="${startId + width *3}"]`.firstChild)&& !document.querySelector(`[square-id="${startId + width *4}"]`.firstChild)&& !document.querySelector(`[square-id="${startId + width *5}"]`.firstChild)||
                    startId + width *7 === targetId && !document.querySelector(`[square-id="${startId + width}"]`.firstChild)&& !document.querySelector(`[square-id="${startId + width *2}"]`.firstChild) && !document.querySelector(`[square-id="${startId + width *3}"]`.firstChild)&& !document.querySelector(`[square-id="${startId + width *4}"]`.firstChild)&& !document.querySelector(`[square-id="${startId + width *5}"]`.firstChild) && !document.querySelector(`[square-id="${startId + width *6}"]`.firstChild)||
                    startId - width === targetId ||
                    startId - width *2 === targetId && !document.querySelector(`[square-id="${startId - width}"]`.firstChild)||
                    startId - width *3 === targetId && !document.querySelector(`[square-id="${startId - width}"]`.firstChild)&& !document.querySelector(`[square-id="${startId - width *2}"]`.firstChild)||    
                    startId - width *4 === targetId && !document.querySelector(`[square-id="${startId - width}"]`.firstChild)&& !document.querySelector(`[square-id="${startId - width *2}"]`.firstChild) && !document.querySelector(`[square-id="${startId - width *3}"]`.firstChild)||
                    startId - width *5 === targetId && !document.querySelector(`[square-id="${startId - width}"]`.firstChild)&& !document.querySelector(`[square-id="${startId - width *2}"]`.firstChild) && !document.querySelector(`[square-id="${startId - width *3}"]`.firstChild) && !document.querySelector(`[square-id="${startId - width *4}"]`.firstChild)||
                    startId - width *6 === targetId && !document.querySelector(`[square-id="${startId - width}"]`.firstChild)&& !document.querySelector(`[square-id="${startId - width *2}"]`.firstChild) && !document.querySelector(`[square-id="${startId - width *3}"]`.firstChild)&& !document.querySelector(`[square-id="${startId - width *4}"]`.firstChild)&& !document.querySelector(`[square-id="${startId - width *5}"]`.firstChild)||
                    startId - width *7 === targetId && !document.querySelector(`[square-id="${startId - width}"]`.firstChild)&& !document.querySelector(`[square-id="${startId - width *2}"]`.firstChild) && !document.querySelector(`[square-id="${startId - width *3}"]`.firstChild)&& !document.querySelector(`[square-id="${startId - width *4}"]`.firstChild)&& !document.querySelector(`[square-id="${startId - width *5}"]`.firstChild) && !document.querySelector(`[square-id="${startId - width *6}"]`.firstChild)||
                    startId + 1 === targetId ||
                    startId + 2 === targetId && !document.querySelector(`[square-id="${startId + 1}"]`.firstChild)||
                    startId + 3 === targetId && !document.querySelector(`[square-id="${startId + 1}"]`.firstChild)&& !document.querySelector(`[square-id="${startId + 2}"]`.firstChild)||    
                    startId + 4 === targetId && !document.querySelector(`[square-id="${startId + 1}"]`.firstChild)&& !document.querySelector(`[square-id="${startId + 2}"]`.firstChild) && !document.querySelector(`[square-id="${startId + 3}"]`.firstChild)||
                    startId + 5 === targetId && !document.querySelector(`[square-id="${startId + 1}"]`.firstChild)&& !document.querySelector(`[square-id="${startId + 2}"]`.firstChild) && !document.querySelector(`[square-id="${startId +  3}"]`.firstChild) && !document.querySelector(`[square-id="${startId + 4}"]`.firstChild)||
                    startId + 6 === targetId && !document.querySelector(`[square-id="${startId + 1}"]`.firstChild)&& !document.querySelector(`[square-id="${startId + 2}"]`.firstChild) && !document.querySelector(`[square-id="${startId + 3}"]`.firstChild)&& !document.querySelector(`[square-id="${startId + 4}"]`.firstChild)&& !document.querySelector(`[square-id="${startId + 5}"]`.firstChild)||
                    startId + 7 === targetId && !document.querySelector(`[square-id="${startId + 1}"]`.firstChild)&& !document.querySelector(`[square-id="${startId + 2}"]`.firstChild) && !document.querySelector(`[square-id="${startId + 3}"]`.firstChild)&& !document.querySelector(`[square-id="${startId + 4}"]`.firstChild)&& !document.querySelector(`[square-id="${startId + 5}"]`.firstChild) && !document.querySelector(`[square-id="${startId + 6}"]`.firstChild)||
                    startId - 1 === targetId ||
                    startId - 2 === targetId && !document.querySelector(`[square-id="${startId - 1}"]`.firstChild)||
                    startId - 3 === targetId && !document.querySelector(`[square-id="${startId - 1}"]`.firstChild)&& !document.querySelector(`[square-id="${startId - 2}"]`.firstChild)||    
                    startId - 4 === targetId && !document.querySelector(`[square-id="${startId - 1}"]`.firstChild)&& !document.querySelector(`[square-id="${startId - 2}"]`.firstChild) && !document.querySelector(`[square-id="${startId - 3}"]`.firstChild)||
                    startId - 5 === targetId && !document.querySelector(`[square-id="${startId - 1}"]`.firstChild)&& !document.querySelector(`[square-id="${startId - 2}"]`.firstChild) && !document.querySelector(`[square-id="${startId -  3}"]`.firstChild) && !document.querySelector(`[square-id="${startId - 4}"]`.firstChild)||
                    startId - 6 === targetId && !document.querySelector(`[square-id="${startId - 1}"]`.firstChild)&& !document.querySelector(`[square-id="${startId - 2}"]`.firstChild) && !document.querySelector(`[square-id="${startId - 3}"]`.firstChild)&& !document.querySelector(`[square-id="${startId - 4}"]`.firstChild)&& !document.querySelector(`[square-id="${startId - 5}"]`.firstChild)||
                    startId - 7 === targetId && !document.querySelector(`[square-id="${startId - 1}"]`.firstChild)&& !document.querySelector(`[square-id="${startId - 2}"]`.firstChild) && !document.querySelector(`[square-id="${startId - 3}"]`.firstChild)&& !document.querySelector(`[square-id="${startId - 4}"]`.firstChild)&& !document.querySelector(`[square-id="${startId - 5}"]`.firstChild) && !document.querySelector(`[square-id="${startId - 6}"]`.firstChild)
           
                    ){
                        return true;
                    }
                    break;
                    case 'queen': 
                    if(

                        startId + width + 1 === targetId ||
                        startId + width*2 + 2 === targetId && !document.querySelector(`[square-id="${startId + width + 1}"]`.firstChild)||
                        startId + width*3 + 3 === targetId && !document.querySelector(`[square-id="${startId + width + 1}"]`.firstChild) && !document.querySelector(`[square-id="${startId + width *2 + 2}"]`.firstChild) ||
                        startId + width*4 + 4 === targetId && !document.querySelector(`[square-id="${startId + width + 1}"]`.firstChild) && !document.querySelector(`[square-id="${startId + width *2 + 2}"]`.firstChild)&& !document.querySelector(`[square-id="${startId + width *3 + 3}"]`.firstChild) ||
                        startId + width*5 + 5 === targetId && !document.querySelector(`[square-id="${startId + width + 1}"]`.firstChild) && !document.querySelector(`[square-id="${startId + width *2 + 2}"]`.firstChild)&& !document.querySelector(`[square-id="${startId + width *3 + 3}"]`.firstChild)&& !document.querySelector(`[square-id="${startId + width *4 + 4}"]`.firstChild) ||
                        startId + width*6 + 6 === targetId && !document.querySelector(`[square-id="${startId + width + 1}"]`.firstChild) && !document.querySelector(`[square-id="${startId + width *2 + 2}"]`.firstChild)&& !document.querySelector(`[square-id="${startId + width *3 + 3}"]`.firstChild)&& !document.querySelector(`[square-id="${startId + width *4 + 4}"]`.firstChild)&& !document.querySelector(`[square-id="${startId + width *5 + 5}"]`.firstChild) ||
                        startId + width*7 + 7 === targetId && !document.querySelector(`[square-id="${startId + width + 1}"]`.firstChild) && !document.querySelector(`[square-id="${startId + width *2 + 2}"]`.firstChild)&& !document.querySelector(`[square-id="${startId + width *3 + 3}"]`.firstChild)&& !document.querySelector(`[square-id="${startId + width *4 + 4}"]`.firstChild)&& !document.querySelector(`[square-id="${startId + width *5 + 5}"]`.firstChild)&& !document.querySelector(`[square-id="${startId + width *6 + 6}"]`.firstChild) ||
                        startId - width - 1 === targetId ||
                        startId - width*2 - 2 === targetId && !document.querySelector(`[square-id="${startId - width - 1}"]`.firstChild)||
                        startId - width*3 - 3 === targetId && !document.querySelector(`[square-id="${startId - width - 1}"]`.firstChild) && !document.querySelector(`[square-id="${startId - width *2 - 2}"]`.firstChild) ||
                        startId - width*4 - 4 === targetId && !document.querySelector(`[square-id="${startId - width - 1}"]`.firstChild) && !document.querySelector(`[square-id="${startId - width *2 - 2}"]`.firstChild)&& !document.querySelector(`[square-id="${startId - width *3 - 3}"]`.firstChild) ||
                        startId - width*5 - 5 === targetId && !document.querySelector(`[square-id="${startId - width - 1}"]`.firstChild) && !document.querySelector(`[square-id="${startId - width *2 - 2}"]`.firstChild)&& !document.querySelector(`[square-id="${startId - width *3 - 3}"]`.firstChild)&& !document.querySelector(`[square-id="${startId - width *4 - 4}"]`.firstChild) ||
                        startId - width*6 - 6 === targetId && !document.querySelector(`[square-id="${startId - width - 1}"]`.firstChild) && !document.querySelector(`[square-id="${startId - width *2 - 2}"]`.firstChild)&& !document.querySelector(`[square-id="${startId - width *3 - 3}"]`.firstChild)&& !document.querySelector(`[square-id="${startId - width *4 - 4}"]`.firstChild)&& !document.querySelector(`[square-id="${startId - width *5 - 5}"]`.firstChild) ||
                        startId - width*7 - 7 === targetId && !document.querySelector(`[square-id="${startId - width - 1}"]`.firstChild) && !document.querySelector(`[square-id="${startId - width *2 - 2}"]`.firstChild)&& !document.querySelector(`[square-id="${startId - width *3 - 3}"]`.firstChild)&& !document.querySelector(`[square-id="${startId - width *4 - 4}"]`.firstChild)&& !document.querySelector(`[square-id="${startId - width *5 - 5}"]`.firstChild)&& !document.querySelector(`[square-id="${startId - width *6 - 6}"]`.firstChild) ||
                        startId - width + 1 === targetId ||
                        startId - width*2 + 2 === targetId && !document.querySelector(`[square-id="${startId - width + 1}"]`.firstChild)||
                        startId - width*3 + 3 === targetId && !document.querySelector(`[square-id="${startId - width + 1}"]`.firstChild) && !document.querySelector(`[square-id="${startId - width *2 + 2}"]`.firstChild) ||
                        startId - width*4 + 4 === targetId && !document.querySelector(`[square-id="${startId - width + 1}"]`.firstChild) && !document.querySelector(`[square-id="${startId - width *2 + 2}"]`.firstChild)&& !document.querySelector(`[square-id="${startId - width *3 + 3}"]`.firstChild) ||
                        startId - width*5 + 5 === targetId && !document.querySelector(`[square-id="${startId - width + 1}"]`.firstChild) && !document.querySelector(`[square-id="${startId - width *2 + 2}"]`.firstChild)&& !document.querySelector(`[square-id="${startId - width *3 + 3}"]`.firstChild)&& !document.querySelector(`[square-id="${startId - width *4 + 4}"]`.firstChild) ||
                        startId - width*6 + 6 === targetId && !document.querySelector(`[square-id="${startId - width + 1}"]`.firstChild) && !document.querySelector(`[square-id="${startId - width *2 + 2}"]`.firstChild)&& !document.querySelector(`[square-id="${startId - width *3 + 3}"]`.firstChild)&& !document.querySelector(`[square-id="${startId - width *4 + 4}"]`.firstChild)&& !document.querySelector(`[square-id="${startId - width *5 + 5}"]`.firstChild) ||
                        startId - width*7 + 7 === targetId && !document.querySelector(`[square-id="${startId - width + 1}"]`.firstChild) && !document.querySelector(`[square-id="${startId - width *2 + 2}"]`.firstChild)&& !document.querySelector(`[square-id="${startId - width *3 + 3}"]`.firstChild)&& !document.querySelector(`[square-id="${startId - width *4 + 4}"]`.firstChild)&& !document.querySelector(`[square-id="${startId - width *5 + 5}"]`.firstChild)&& !document.querySelector(`[square-id="${startId - width *6 + 6}"]`.firstChild) ||
                        startId + width - 1 === targetId ||
                        startId + width*2 - 2 === targetId && !document.querySelector(`[square-id="${startId + width - 1}"]`.firstChild)||
                        startId + width*3 - 3 === targetId && !document.querySelector(`[square-id="${startId + width - 1}"]`.firstChild) && !document.querySelector(`[square-id="${startId + width *2 - 2}"]`.firstChild) ||
                        startId + width*4 - 4 === targetId && !document.querySelector(`[square-id="${startId + width - 1}"]`.firstChild) && !document.querySelector(`[square-id="${startId + width *2 - 2}"]`.firstChild)&& !document.querySelector(`[square-id="${startId + width *3 - 3}"]`.firstChild) ||
                        startId + width*5 - 5 === targetId && !document.querySelector(`[square-id="${startId + width - 1}"]`.firstChild) && !document.querySelector(`[square-id="${startId + width *2 - 2}"]`.firstChild)&& !document.querySelector(`[square-id="${startId + width *3 - 3}"]`.firstChild)&& !document.querySelector(`[square-id="${startId + width *4 - 4}"]`.firstChild) ||
                        startId + width*6 - 6 === targetId && !document.querySelector(`[square-id="${startId + width - 1}"]`.firstChild) && !document.querySelector(`[square-id="${startId + width *2 - 2}"]`.firstChild)&& !document.querySelector(`[square-id="${startId + width *3 - 3}"]`.firstChild)&& !document.querySelector(`[square-id="${startId + width *4 - 4}"]`.firstChild)&& !document.querySelector(`[square-id="${startId + width *5 - 5}"]`.firstChild) ||
                        startId + width*7 - 7 === targetId && !document.querySelector(`[square-id="${startId + width - 1}"]`.firstChild) && !document.querySelector(`[square-id="${startId + width *2 - 2}"]`.firstChild)&& !document.querySelector(`[square-id="${startId + width *3 - 3}"]`.firstChild)&& !document.querySelector(`[square-id="${startId + width *4 - 4}"]`.firstChild)&& !document.querySelector(`[square-id="${startId + width *5 - 5}"]`.firstChild)&& !document.querySelector(`[square-id="${startId + width *6 - 6}"]`.firstChild)||
                        startId + width === targetId ||
                            startId + width *2 === targetId && !document.querySelector(`[square-id="${startId + width}"]`.firstChild)||
                            startId + width *3 === targetId && !document.querySelector(`[square-id="${startId + width}"]`.firstChild)&& !document.querySelector(`[square-id="${startId + width *2}"]`.firstChild)||    
                            startId + width *4 === targetId && !document.querySelector(`[square-id="${startId + width}"]`.firstChild)&& !document.querySelector(`[square-id="${startId + width *2}"]`.firstChild) && !document.querySelector(`[square-id="${startId + width *3}"]`.firstChild)||
                            startId + width *5 === targetId && !document.querySelector(`[square-id="${startId + width}"]`.firstChild)&& !document.querySelector(`[square-id="${startId + width *2}"]`.firstChild) && !document.querySelector(`[square-id="${startId + width *3}"]`.firstChild) && !document.querySelector(`[square-id="${startId + width *4}"]`.firstChild)||
                            startId + width *6 === targetId && !document.querySelector(`[square-id="${startId + width}"]`.firstChild)&& !document.querySelector(`[square-id="${startId + width *2}"]`.firstChild) && !document.querySelector(`[square-id="${startId + width *3}"]`.firstChild)&& !document.querySelector(`[square-id="${startId + width *4}"]`.firstChild)&& !document.querySelector(`[square-id="${startId + width *5}"]`.firstChild)||
                            startId + width *7 === targetId && !document.querySelector(`[square-id="${startId + width}"]`.firstChild)&& !document.querySelector(`[square-id="${startId + width *2}"]`.firstChild) && !document.querySelector(`[square-id="${startId + width *3}"]`.firstChild)&& !document.querySelector(`[square-id="${startId + width *4}"]`.firstChild)&& !document.querySelector(`[square-id="${startId + width *5}"]`.firstChild) && !document.querySelector(`[square-id="${startId + width *6}"]`.firstChild)||
                            startId - width === targetId ||
                            startId - width *2 === targetId && !document.querySelector(`[square-id="${startId - width}"]`.firstChild)||
                            startId - width *3 === targetId && !document.querySelector(`[square-id="${startId - width}"]`.firstChild)&& !document.querySelector(`[square-id="${startId - width *2}"]`.firstChild)||    
                            startId - width *4 === targetId && !document.querySelector(`[square-id="${startId - width}"]`.firstChild)&& !document.querySelector(`[square-id="${startId - width *2}"]`.firstChild) && !document.querySelector(`[square-id="${startId - width *3}"]`.firstChild)||
                            startId - width *5 === targetId && !document.querySelector(`[square-id="${startId - width}"]`.firstChild)&& !document.querySelector(`[square-id="${startId - width *2}"]`.firstChild) && !document.querySelector(`[square-id="${startId - width *3}"]`.firstChild) && !document.querySelector(`[square-id="${startId - width *4}"]`.firstChild)||
                            startId - width *6 === targetId && !document.querySelector(`[square-id="${startId - width}"]`.firstChild)&& !document.querySelector(`[square-id="${startId - width *2}"]`.firstChild) && !document.querySelector(`[square-id="${startId - width *3}"]`.firstChild)&& !document.querySelector(`[square-id="${startId - width *4}"]`.firstChild)&& !document.querySelector(`[square-id="${startId - width *5}"]`.firstChild)||
                            startId - width *7 === targetId && !document.querySelector(`[square-id="${startId - width}"]`.firstChild)&& !document.querySelector(`[square-id="${startId - width *2}"]`.firstChild) && !document.querySelector(`[square-id="${startId - width *3}"]`.firstChild)&& !document.querySelector(`[square-id="${startId - width *4}"]`.firstChild)&& !document.querySelector(`[square-id="${startId - width *5}"]`.firstChild) && !document.querySelector(`[square-id="${startId - width *6}"]`.firstChild)||
                            startId + 1 === targetId ||
                            startId + 2 === targetId && !document.querySelector(`[square-id="${startId + 1}"]`.firstChild)||
                            startId + 3 === targetId && !document.querySelector(`[square-id="${startId + 1}"]`.firstChild)&& !document.querySelector(`[square-id="${startId + 2}"]`.firstChild)||    
                            startId + 4 === targetId && !document.querySelector(`[square-id="${startId + 1}"]`.firstChild)&& !document.querySelector(`[square-id="${startId + 2}"]`.firstChild) && !document.querySelector(`[square-id="${startId + 3}"]`.firstChild)||
                            startId + 5 === targetId && !document.querySelector(`[square-id="${startId + 1}"]`.firstChild)&& !document.querySelector(`[square-id="${startId + 2}"]`.firstChild) && !document.querySelector(`[square-id="${startId +  3}"]`.firstChild) && !document.querySelector(`[square-id="${startId + 4}"]`.firstChild)||
                            startId + 6 === targetId && !document.querySelector(`[square-id="${startId + 1}"]`.firstChild)&& !document.querySelector(`[square-id="${startId + 2}"]`.firstChild) && !document.querySelector(`[square-id="${startId + 3}"]`.firstChild)&& !document.querySelector(`[square-id="${startId + 4}"]`.firstChild)&& !document.querySelector(`[square-id="${startId + 5}"]`.firstChild)||
                            startId + 7 === targetId && !document.querySelector(`[square-id="${startId + 1}"]`.firstChild)&& !document.querySelector(`[square-id="${startId + 2}"]`.firstChild) && !document.querySelector(`[square-id="${startId + 3}"]`.firstChild)&& !document.querySelector(`[square-id="${startId + 4}"]`.firstChild)&& !document.querySelector(`[square-id="${startId + 5}"]`.firstChild) && !document.querySelector(`[square-id="${startId + 6}"]`.firstChild)||
                            startId - 1 === targetId ||
                            startId - 2 === targetId && !document.querySelector(`[square-id="${startId - 1}"]`.firstChild)||
                            startId - 3 === targetId && !document.querySelector(`[square-id="${startId - 1}"]`.firstChild)&& !document.querySelector(`[square-id="${startId - 2}"]`.firstChild)||    
                            startId - 4 === targetId && !document.querySelector(`[square-id="${startId - 1}"]`.firstChild)&& !document.querySelector(`[square-id="${startId - 2}"]`.firstChild) && !document.querySelector(`[square-id="${startId - 3}"]`.firstChild)||
                            startId - 5 === targetId && !document.querySelector(`[square-id="${startId - 1}"]`.firstChild)&& !document.querySelector(`[square-id="${startId - 2}"]`.firstChild) && !document.querySelector(`[square-id="${startId -  3}"]`.firstChild) && !document.querySelector(`[square-id="${startId - 4}"]`.firstChild)||
                            startId - 6 === targetId && !document.querySelector(`[square-id="${startId - 1}"]`.firstChild)&& !document.querySelector(`[square-id="${startId - 2}"]`.firstChild) && !document.querySelector(`[square-id="${startId - 3}"]`.firstChild)&& !document.querySelector(`[square-id="${startId - 4}"]`.firstChild)&& !document.querySelector(`[square-id="${startId - 5}"]`.firstChild)||
                            startId - 7 === targetId && !document.querySelector(`[square-id="${startId - 1}"]`.firstChild)&& !document.querySelector(`[square-id="${startId - 2}"]`.firstChild) && !document.querySelector(`[square-id="${startId - 3}"]`.firstChild)&& !document.querySelector(`[square-id="${startId - 4}"]`.firstChild)&& !document.querySelector(`[square-id="${startId - 5}"]`.firstChild) && !document.querySelector(`[square-id="${startId - 6}"]`.firstChild)
                   
                       
                    ){
return true;
                    }
                    break;
                    case 'king':
                        if(startId +1  === targetId ||
                            startId -1  === targetId ||
                            startId +width  === targetId ||
                            startId -width  === targetId ||
                            startId +width -1  === targetId ||
                            startId +width +1  === targetId ||
                            startId -width -1  === targetId ||
                            startId -width +1  === targetId     
                           
                            ){
                            
                            return true;
                        }
  }

}
console.log(checkIfValid)
function checkForWin(){
const kings = document. Array.from(document.querySelectorAll('#king'))
console.log(kings)
if (kings.some(king=>king.firstChild.classList.contains('white'))){
    infoDisplay.innerHTML = 'Black player wins'
    const allSquares = document.querySelectorAll('.square')
    allSquares.forEach(square=>square.firstChild?.setAttribute('draggable', false))
}

if (kings.some(king=>king.firstChild.classList.contains('black'))){
    infoDisplay.innerHTML = 'White player wins'
    const allSquares = document.querySelectorAll('.square')
    allSquares.forEach(square=>square.firstChild?.setAttribute('draggable', false))
}

}
// function checkmate() {
//     const king = document.querySelector(`.${playerGo}.king`);
//     const kingSquareId = king.parentNode.getAttribute("square-id");
//     const opponentPieces = document.querySelectorAll(`.${playerGo === "white" ? "black" : "white"}.piece`);
  
//     // Check if the king is under attack
//     const isKingUnderAttack = Array.from(opponentPieces).some(piece => {
//       const pieceSquareId = piece.parentNode.getAttribute("square-id");
//       return checkIfValid(piece, pieceSquareId, kingSquareId);
//     });
  
//     if (isKingUnderAttack) {
//       // Check if the king can escape by moving to a different square
//       for (let i = 0; i < width * width; i++) {
//         if (checkIfValid(king, kingSquareId, i)) {
//           const potentialSquare = document.querySelector(`[square-id="${i}"]`);
//           const pieceOnPotentialSquare = potentialSquare.firstChild;
  
//           // Simulate moving the king to the potential square and check if it's still under attack
//           king.parentNode.removeChild(king);
//           potentialSquare.appendChild(king);
  
//           const isKingStillUnderAttack = Array.from(opponentPieces).some(piece => {
//             const pieceSquareId = piece.parentNode.getAttribute("square-id");
//             return checkIfValid(piece, pieceSquareId, i);
//           });
  
//           // Revert the changes
//           potentialSquare.removeChild(king);
//           king.parentNode.appendChild(king);
  
//           if (!isKingStillUnderAttack) {
//             return false; // King can escape, not checkmate
//           }
//         }
//       }
  
//       // Check if any friendly piece can capture the attacking piece
//       for (let i = 0; i < width * width; i++) {
//         const friendlyPiece = document.querySelector(`.${playerGo}.piece[square-id="${i}"]`);
//         if (friendlyPiece) {
//           const friendlyPieceSquareId = friendlyPiece.parentNode.getAttribute("square-id");
  
//           if (checkIfValid(friendlyPiece, friendlyPieceSquareId, kingSquareId)) {
//             // Simulate capturing the attacking piece and check if the king is still under attack
//             const attackingPiece = document.querySelector(`.${playerGo === "white" ? "black" : "white"}.piece[square-id="${kingSquareId}"]`);
//             attackingPiece.parentNode.removeChild(attackingPiece);
//             king.parentNode.removeChild(king);
//             friendlyPiece.parentNode.appendChild(king);
  
//             const isKingStillUnderAttack = Array.from(opponentPieces).some(piece => {
//               const pieceSquareId = piece.parentNode.getAttribute("square-id");
//               return checkIfValid(piece, pieceSquareId, friendlyPieceSquareId);
//             });
  
//             // Revert the changes
//             friendlyPiece.parentNode.removeChild(king);
//             friendlyPiece.parentNode.appendChild(friendlyPiece);
//             potentialSquare.appendChild(attackingPiece);
//             king.parentNode.appendChild(king);
  
//             if (!isKingStillUnderAttack) {
//               return false; // Attacking piece can be captured, not checkmate
//             }
//           }
//         }
//       }
  
//       return true; // King is in checkmate
//     }
  
//     return false; // King is not under attack
//   }
//   function castle(kingSquareId, rookSquareId) {
//     const king = document.querySelector(`.${playerGo}.king`);
//     const rook = document.querySelector(`.${playerGo}.rook[square-id="${rookSquareId}"]`);
  
//     // Check if the king and rook are in their initial positions
//     const isKingInInitialPosition = kingSquareId === "4";
//     const isRookInInitialPosition = rookSquareId === "0" || rookSquareId === "7";
  
//     // Check if there are no pieces between the king and rook
//     const isPathClear = Array.from(allSquares)
//       .slice(Math.min(kingSquareId, rookSquareId) + 1, Math.max(kingSquareId, rookSquareId))
//       .every(square => !square.firstChild);
  
//     // Check if the squares the king will move over and the square the king will end up in are not under attack
//     const opponentPieces = document.querySelectorAll(`.${playerGo === "white" ? "black" : "white"}.piece`);
//     const isPathSafe = Array.from(opponentPieces).every(piece => {
//       const pieceSquareId = piece.parentNode.getAttribute("square-id");
//       return !checkIfValid(piece, pieceSquareId, kingSquareId) && !checkIfValid(piece, pieceSquareId, rookSquareId);
//     });
  
//     if (isKingInInitialPosition && isRookInInitialPosition && isPathClear && isPathSafe) {
//       const kingDestination = document.querySelector(`[square-id="${rookSquareId}"]`);
//       const rookDestination = document.querySelector(`[square-id="${kingSquareId > rookSquareId ? kingSquareId - 1 : kingSquareId + 1}"]`);
  
//       // Perform the castle by moving the king and rook to their new positions
//       king.parentNode.removeChild(king);
//       rook.parentNode.removeChild(rook);
//       kingDestination.appendChild(king);
//       rookDestination.appendChild(rook);
//     }
//   }
  