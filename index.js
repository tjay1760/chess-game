const gameBoard = document.querySelector('#gameboard')
const playerDisplay = document.querySelector('#player')
infoDisplay = document.querySelector('#info-display')
const width = 8
let playerGo = 'black'
playerDisplay.textContent = 'black'
const startPieces =[
rook,knight,bishop,queen, king,bishop,knight,rook,
pawn,pawn,pawn,pawn,pawn,pawn,pawn,pawn,
'','','','','','','','',
'','','','','','','','',
'','','','','','','','',
'','','','','','','','',
pawn,pawn,pawn,pawn,pawn,pawn,pawn,pawn,
rook,knight,bishop,queen, king,bishop,knight,rook
]
const createBoard = () => {
 startPieces.forEach((startPiece,i) =>{
    const square = document.createElement('div');
    square. classList.add('square');
    square.setAttribute('square-id', i);
    square.innerHTML = startPiece
    square.firstChild?.setAttribute('draggable',true)
    square.classList.add('beige');
    const row = Math.floor((63-i)/8)+ 1
    if(row%2===0){
        square.classList.add(i%2==0?'beige':'brown');
    }
    else{
            square.classList.add(i%2==0?'brown':'beige');
        }
    if(i<=15){
        square.firstChild.firstChild.classList.add('black')
    }
    if(i>=48){
        square.firstChild.firstChild.classList.add('white')
    }
    gameBoard.append(square);
 });    
}
createBoard();
const allSquares = document.querySelectorAll('#gameboard .square')
allSquares.forEach(
    square => {
        square.addEventListener('dragstart', dragStart);
    square.addEventListener('dragover', dragOver)
    square.addEventListener('drop', dragDrop);
    }
);
let StartPositionId;
let draggedElement;

function dragStart(e){
StartPositionId=e.target.parentNode.getAttribute('square-id');
draggedElement=e.target;
}
function dragOver(e){
    e.preventDefault();
}
function dragDrop(e){
    const taken = e.target.classList.contains('piece');
    e.stopPropagation();
    correctGo = draggedElement.firstChild.classList.contains(playerGo);
    const opponentGo = playerGo === 'white'?'black':'white';
    const takenByOpponent = e.target.firstChild?.classList.contains(opponentGo);
if(correctGo){
    if(takenByOpponent && valid){
    e.target.parentNode.append(draggedElement);
    e.target.remove();
    changePlayer()  
    return
}
    }
    if(taken){
        infoDisplay.innerText = 'You cannot go here'
        setTimeout(()=>infoDisplay.textContent = "", 200)
        return  
    }
}

    //e.target.append(draggedElement);
    
function changePlayer(){
    if(playerGo==='black'){
        reverseIds()
        playerGo = 'white';
        playerDisplay.textContent = 'white'
    } else {
        revertIds()
        playerGo = 'black';
        playerDisplay.textContent = 'black'
    }
}
function reverseIds(){
    const allSquares = document.querySelectorAll(".square")
    allSquares.forEach(
        (square, i) => {
            square.setAttribute('square-id', (width *  width -1) -i);
        }
    )
}
function revertIds(){
    const allSquares = document.querySelectorAll(".square")
    allSquares.forEach(
        (square, i) => {
            square.setAttribute('square-id', i);
        }
    )
}