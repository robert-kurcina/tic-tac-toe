let playerId = 0;
let isGameOver = false;
let movesRemaining = 9;
const subgrids = [
    [[0,0], [1,1], [2,2]], 
    [[0,0], [0,1], [0,2]],
    [[1,0], [1,1], [1,2]],
    [[2,0], [2,1], [2,2]], 
    [[0,0], [1,0], [2,0]],
    [[0,1], [1,1], [2,1]],
    [[0,2], [1,2], [2,2]],
    [[0,2], [1,1], [2,0]],
];

const containerElem = document.getElementById("container");
const handleContainerClick = function(e){
    if(isGameOver){
        return;
    }

    const cellElem = e.target;
    const dataCell = e.target.attributes[1];//e.target["data-cell"]
    const isLegalMove = checkLegalMove(cellElem);

    if(isLegalMove){
        const revisedMovesRemaining = decrementMoves(movesRemaining);
        movesRemaining = revisedMovesRemaining;
        
        const playerSymbol = getPlayerSymbol(cellElem);
        setCellValue(cellElem, playerSymbol);

        const revisedPlayerId = incrementPlayer(playerId);
        playerId = revisedPlayerId;
        
        const isWinner = checkWinner(playerSymbol, containerElem, subgrids);
        const isDraw = checkDraw(movesRemaining);

       if (isWinner){
           showWinner();
           isGameOver = true;
       }
       else if(isDraw){
           showDraw();
           isGameOver = true;
       }
       else{
        updateDisplay(playerId);
       }
    } 
}

const updateDisplay = function(givenPlayerId){
    const playerTurnElem = document.getElementById("playerTurn");
    const revisedCellValue = getPlayerSymbol(givenPlayerId);
    playerTurnElem.innerText = revisedCellValue + "'s Turn";
}

const setCellValue = function (cellElem, cellValue){
    cellElem.innerText = cellValue;
    cellElem.classList.add("checked");
};

const decrementMoves = function(movesRemaining){
    return movesRemaining - 1;
}

const getPlayerSymbol = function(givenPlayerId){
    if(playerId === 0){
        return "X";
    }
    return "O";
}

const incrementPlayer = function(givenPlayerId){
    if(givenPlayerId === 0){
        return 1;
    }

    return 0;
}

const checkLegalMove = function(givenCellElem){
    const currentValue = givenCellElem.innerText;
    const isLegal = currentValue === ".";
   
    return isLegal;
}

const checkWinner = function(givenPlayerSymbol, givenContainerElem, givenSubgrids){
    let result = false;
    let winCount = 0;
    const desiredCount = givenSubgrids[0].length;
    const numSubgrids = givenSubgrids.length;

    givenSubgrids.map(subgrid => {
        subgrid.map(cell => {
            let cellValue = getCellValueAtCoord(cell);
            if (cellValue === givenPlayerSymbol){
                winCount = winCount + 1;
            }
        });

        if(winCount === desiredCount){
            result = true;
        }
        else {
            winCount = 0
        }
    })
    

    return result;
}

const getCellValueAtCoord = function(givenCellCoord){
    const x = givenCellCoord[0];
    const y = givenCellCoord[1];
    const scalar = x + "," + y;
    const targetElem = document.querySelector("[data-cell='" + scalar + "']");
    const cellValue = targetElem.innerText;

    return cellValue;
}

const checkDraw = function(givenMovesRemaining){
    if (givenMovesRemaining === 0){
        return true;
    } 
    return false;
}

const showWinner = function(){
    const gameResultElem = document.getElementById("gameResult");
    gameResultElem.innerText = "You Win!";
}

const showDraw = function(){
    const gameResultElem = document.getElementById("gameResult");
    gameResultElem.innerText = "It's a Draw!";
}

containerElem.addEventListener("click", handleContainerClick);