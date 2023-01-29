const board = document.querySelector(".board")
const showTileLeft = document.querySelector(".tileLeft")
const rack = document.querySelector(".rack")
const blankTileReplacementAndButtonHolder = document.querySelector(".blank-tileReplacements-button-Holder")
const blankTileReplacementHolder = document.querySelector(".replacement-tiles-Holder")
const doneSelectingReplacementTile = document.querySelector(".done-selecting-tile")
const cancelReplacementButton = document.querySelector(".cancel-selecting-tile")
const overLay = document.querySelector(".overLay")
const check = document.querySelector(".check-word")
//container that holds the total tile
let totalTile = [];

//to know when the rack should be refilled
let refillRack = true;

//an array of tile in the rack
let racktile = [];

//array to keep track of where was clicked on the board
let currentBoardLocation = []

//unique number for tile
let uniqueTileNum = 0;

//variable for storing selected index position 
let indextoreplaceboard

let storeWords = []

let storeBranchIndex = []


//array that store replacement of blank tile
let storeReplacementForBlankTile = [{letter: 'A', selected: false}, {letter: 'B', selected: false}, {letter: 'C', selected: false}, {letter: 'D', selected: false},
{letter: 'E', selected: false}, {letter: 'F', selected: false}, {letter: 'G', selected: false}, {letter: 'H', selected: false}, {letter: 'I', selected: false}, 
{letter: 'J', selected: false}, {letter: 'K', selected: false}, {letter: 'L', selected: false}, {letter: 'M', selected: false}, {letter: 'N', selected: false},
{letter: 'O', selected: false}, {letter: 'P', selected: false}, {letter: 'Q', selected: false}, {letter: 'R', selected: false}, {letter: 'S', selected: false}, 
{letter: 'T', selected: false}, {letter: 'V', selected: false}, {letter: 'W', selected: false}, {letter: 'X', selected: false}, {letter: 'Y', selected: false}, 
{letter: 'Z', selected: false}]

//function to create board for scrumble
function createBox() {
    board.innerHTML = boardFoundation.map((square, i) => {
        return `
            <div class="row">
            ${
                    square.map((box, j) => {
                        let boxClass = "box"
                        let boxDescription = ""
                        let boxDecriptionClass = "boxDecription"
                        let boxSpanClass
                        let tilepoint = ""
                        if(i == 0 && j == 0 | j == 7 | j == 14  || i == 7 && j == 0 | j == 14 ||
                            i == 14 && j == 0 | j == 7 | j == 14){
                            if (box == null) {
                                boxClass = "trippleWordBox"
                                boxDescription = "TW" 
                            }else {
                                boxClass = "filledTrippleWordBoxBox"
                                boxDescription = `${box.letter}`
                                tilepoint = `${box.point}`
                            }
                        }else if(i == 1 && j == 1 | j == 13 || i == 2 && j == 2 | j == 12 || i == 3 && j == 3 | j == 11 ||
                            i == 4 && j == 4 | j == 10 || i == 10 && j == 4 | j == 10 || i == 11 && j == 3 | j == 11 ||
                            i == 12 && j == 2 | j == 12 || i == 13 && j == 1 | j == 13){
                            if (box == null) {
                                boxClass = "doubleWordBox"
                                boxDescription = "DW"
                            }else {
                                boxClass = "filledDoubleWordBox"
                                boxDescription = `${box.letter}`
                                tilepoint = `${box.point}`
                            }
                        }else if (i == 0 && j == 3 | j == 11 || i == 2 && j == 6 | j == 8 || i == 3 && j == 0 | j == 7 | j == 14 ||
                            i == 6 && j == 2 | j == 6 | j == 8 | j == 12 || i == 7 && j == 3 | j == 11 ||
                            i == 8 && j == 2 | j == 6 | j == 8 | j == 12 || i == 11 && j == 0 | j == 7 | j == 14 ||
                            i == 12 && j == 6 | j == 8 || i == 14 && j == 3 | j == 11) {
                            if (box == null) {
                                boxClass = "doubleletterBox"
                                boxDescription = "DL"
                            }else {
                                boxClass = "filledDoubleLetterBox"
                                boxDescription = `${box.letter}`
                                tilepoint = `${box.point}`
                            }
                        
                        }else if (i == 1 && j == 5 | j == 9 || i == 5 && j == 1 | j == 5 | j == 9 | j == 13 ||
                            i == 9 && j == 1 | j == 5 | j == 9 | j == 13 || i == 13 && j == 5 | j == 9) {
                            if (box == null) {
                                boxClass = "trippleletterBox"
                                boxDescription = "TL"
                            }else {
                                boxClass = "filledTrippleLetterBox"
                                boxDescription = `${box.letter}`
                                tilepoint = `${box.point}`
                            }

                        }else if (i == 7 && j == 7) {
                            if (box == null) {
                                boxClass = "middleBox"
                                boxDescription = "&#9733"
                                boxDecriptionClass = "middleBoxDescriptionClass"
                            }else{
                                boxClass = "filledBox"
                                boxDescription = `${box.letter}`
                                tilepoint = `${box.point}`
                            }
                        }else{
                            if (box == null) {
                                boxClass = "box"
                                boxDescription = ""
                            }else{
                                boxClass = "filledBox"
                                boxDescription = `${box.letter}`
                                tilepoint = `${box.point}`
                            }
                        }

                        if (box != null) {
                            if (box.point == 0) {
                                boxSpanClass = "blankBoardTile"
                            }else{
                                boxSpanClass = "none"
                            }
                        }
                        return `
                            <div class=${boxClass} data-row=${i} data-column=${j} data-id="bt">
                                <p class=${boxDecriptionClass} data-row=${i} data-column=${j} data-id="bt">${boxDescription}</p>
                                <span class=${boxSpanClass} data-row=${i} data-column=${j} data-id="bt">${tilepoint}</span>
                            </div>
                            `
                    }).join("")
                }
            </div>
        `
    }).join("")
}
//auto refill rack when shouldRefillRack is true
function refillRackWhenNewGameStart(shouldRefillRack) {
    if (shouldRefillRack) {
        while (racktile.length < 7) {
            let num = Math.floor(Math.random() * totalTile.length)
            totalTile[num].countTile = uniqueTileNum
            racktile.push(totalTile[num])
            totalTile.splice(num, 1)
            uniqueTileNum++
        }
        renderShowTileLeft() 
        renderTileOnRack()
    }
}

//function to render how many tile is left
function renderShowTileLeft() {
    showTileLeft.innerHTML = `<h1>${totalTile.length} Tile Left</h1>`
}

//building rack*****************************
//function to render tiles in rack
function renderTileOnRack() {
    rack.innerHTML = racktile.map((tile, i) => {
        let classnameForTileInRack
        let classnameForTileInRackSpan = "rackTileSpan"
        if (tile.isClicked) {
            classnameForTileInRack = "selectedRackTile"
        }else{
            classnameForTileInRack = "rackTile"
        }
        if (tile.point == 0) {
            classnameForTileInRackSpan = "blankTileSpan"
        }else{
            classnameForTileInRackSpan = "rackTileSpan"
        }
        return `
            <div class=${classnameForTileInRack} data-id="rt" data-index=${i}>
                ${tile.letter}
                <span class=${classnameForTileInRackSpan} data-id="rt" data-index=${i}>${tile.point}</span>
            </div>
        `
    }).join("")
}

//function to select tile from rack
function selectTileFromRack(index) {
    racktile.forEach(tile => {
        tile.isClicked = false
    })
    racktile[index].isClicked = true
    checkIfTileIsSelected()
    renderTileOnRack()
}

//function to check if board is empty to either remove or add tile
function addAndRemoveTileOnBoard(row, column) {
    let isTheBoardEmpty;
    let isTileOnRackSelected = checkIfTileIsSelected()
    currentBoardLocation = [row, column]
    //checking if board box is empty to either add or remove tile
    if (boardFoundation[row][column] == null) {
        isTheBoardEmpty = true
    }else{
        isTheBoardEmpty = false
    }
    //checking wheather to remove or add tile to box 
    if (isTheBoardEmpty == true) {
        if (isTileOnRackSelected) {
            //store the index of tile selected on rack
            let indexOfSelectedTile = checkForSelectedTileIndex()
            if (racktile[indexOfSelectedTile].point == 0 ) {
                CreateReplaceBlankTileInRack()
                //replace blank tile 
            }else {
                addTileToBoard(row, column)
            }
        }
    }else{
        if (boardFoundation[row][column].point == 0 ) {
            boardFoundation[row][column].letter = ""
            removeOrSwapTileFromBoard(row, column)
        }else{      
            removeOrSwapTileFromBoard(row, column)
        }
    }
    createBox()
    checkIfTileIsSelected()
}
//function to replace blank tile in rack 
function CreateReplaceBlankTileInRack(){
    displayReplacementHolder()
    addingTileToReplacementHolder()
}
function refreshAndRemoveReplacementTile() {
    if (indextoreplaceboard !== null) {
        indextoreplaceboard = null
    }
    storeReplacementForBlankTile.forEach(tile => {
        tile.selected = false
    })
    overLay.classList.remove("active")
    blankTileReplacementAndButtonHolder.classList.remove("active")

}
function displayReplacementHolder() {
    overLay.classList.add("active")
    blankTileReplacementAndButtonHolder.classList.add("active")

}

//function to create replacement tile selection card
function addingTileToReplacementHolder() {
    blankTileReplacementHolder.innerHTML = storeReplacementForBlankTile.map((tile, index) => {
        let classForReplacementTile
        if(tile.selected == true){
            classForReplacementTile = "replacement-tile-selected"
        }else {
            classForReplacementTile = "replacement-tile"
        }

        return `
            <div class=${classForReplacementTile} id="rep" data-i=${index}>${tile.letter}</div>
        `
    }).join("")
}
function selectReplacementTile(i) {
    storeReplacementForBlankTile.forEach(tile => {
        tile.selected = false
    })
    storeReplacementForBlankTile[i].selected = true
    addingTileToReplacementHolder()
}

function addTileToBoard(i, j) {
    let indexOfSelectedTile = checkForSelectedTileIndex()
    boardFoundation[i][j] = {...racktile[indexOfSelectedTile]}
    racktile.splice(indexOfSelectedTile, 1)
    renderTileOnRack()
}

function removeOrSwapTileFromBoard(i, j) {
    let isTileOnRackSelected = checkIfTileIsSelected()
    if (isTileOnRackSelected) {
        isBlankTile(i, j) 
    }else{
        removeTile(i, j)
    }
    renderTileOnRack()
}

//function to swap tile on board
function swapTile(i, j) {
    let indexOfSelectedTile = checkForSelectedTileIndex()
    let holdingRackTile = {...racktile[indexOfSelectedTile]}
    racktile[indexOfSelectedTile] = {...boardFoundation[i][j], isClicked: false}
    boardFoundation[i][j] = holdingRackTile
}

function isBlankTile(i, j) {
    let indexOfSelectedTile = checkForSelectedTileIndex()
    if (racktile[indexOfSelectedTile].point == 0) {
        CreateReplaceBlankTileInRack()
        indextoreplaceboard = [i, j]
    }else{
        swapTile(i, j)
    }  
}

//function to remove tile
function removeTile(i, j) {
    racktile.push({...boardFoundation[i][j], isClicked: false})
    boardFoundation[i][j] = null
}
//function to check for the selected tile index on rack
function checkForSelectedTileIndex() {
    let getIndexOfSelectedTile = null
    racktile.forEach((tile, i) => {
        if (tile.isClicked == true) {
            getIndexOfSelectedTile = i
        }
    })
    return getIndexOfSelectedTile
}
//function to check if tile is selected on rack
function checkIfTileIsSelected() {
    let checkSelectedTile = false
    racktile.forEach((tile) => {
        if (tile.isClicked == true) {
            checkSelectedTile = true
        }
    })
    return checkSelectedTile

}

function doneReplacingBlankTilebuttonFun() {
    let isReplacementTileSelected = false
    let replacingTileIndex
    let indexOfSelectedTile = checkForSelectedTileIndex()
    storeReplacementForBlankTile.forEach((tile, index) =>{
        if (tile.selected == true) {
            isReplacementTileSelected = true
            replacingTileIndex = index
        }
    } )
    if (isReplacementTileSelected) {
        racktile[indexOfSelectedTile].letter = storeReplacementForBlankTile[replacingTileIndex].letter

        if(indextoreplaceboard !== null && boardFoundation[indextoreplaceboard[0]][indextoreplaceboard[1]]){
            swapTile(indextoreplaceboard[0], indextoreplaceboard[1])
            renderTileOnRack()
        }else{
            addTileToBoard(currentBoardLocation[0], currentBoardLocation[1])
        }
        refreshAndRemoveReplacementTile()
        createBox()
    }

}

//check whether tiles are correctly placed and calculate score****************************************
function scanLeftRight(startPos, shouldCheckBranch) {
    if (shouldCheckBranch) {
        storeBranchIndex = []
    }
    let wordObj = {
        word: '',
        point: 0,
        specialTile: 1
    }

    let left = ''
    let right = ''
    let currRow = startPos[0]
    let currCol = startPos[1]
    
    if (boardFoundation[currRow][currCol+1] !== null) {
        let startright = currCol+1
        while (boardFoundation[currRow][startright] !== null && startright <= 14) {
            right = right + boardFoundation[currRow][startright].letter
            wordObj.point = wordObj.point + boardFoundation[currRow][startright].point
 
            if (shouldCheckBranch && (boardFoundation[currRow][startright].isClicked == true && (boardFoundation[currRow-1][startright] !== null
                 || boardFoundation[currRow+1][startright] !== null))) {
                     storeBranchIndex.push([currRow, startright]) 
            } 
            
            startright = startright + 1
         }
 
         
    }

    if (boardFoundation[currRow][currCol-1] !== null) {
        let startleft = currCol-1
        while (boardFoundation[currRow][startleft] !== null && startleft >= 0) {
            left = boardFoundation[currRow][startleft].letter + left
            wordObj.point = wordObj.point + boardFoundation[currRow][startleft].point
 
            if (shouldCheckBranch == true && (boardFoundation[currRow][currCol].isClicked == true && (boardFoundation[currRow-1][startleft] !== null
                 || boardFoundation[currRow+1][startleft] !== null))) {
                     storeBranchIndex.push([currRow, startleft]) 
            } 
            
            startleft = startleft - 1
         }
         
    }

    if (shouldCheckBranch == true && (boardFoundation[currRow-1][currCol] !== null || boardFoundation[currRow+1][currCol] !== null)) {
        storeBranchIndex.push([currRow, currCol])
    }

    wordObj.word = left + boardFoundation[currRow][currCol].letter + right
    wordObj.point += boardFoundation[currRow][currCol].point

    storeWords.push(wordObj)

    if (storeBranchIndex.length > 0 && shouldCheckBranch) {
        let place
        for (let i = 0; i < storeBranchIndex.length; i++) {
            place = [storeBranchIndex[i][0], storeBranchIndex[i][1]]
            scanTopBottom(place, false)
        }
    }
    console.log(storeWords)
}

function scanTopBottom(startPos, shouldCheckBranch) {
    if (shouldCheckBranch) {
        storeBranchIndex = []
    }
    let wordObj = {
        word: '',
        point: 0,
        specialTile: 1
    }

    let top = ''
    let bottom = ''
    let currRow = startPos[0]
    let currCol = startPos[1]
    
    if (boardFoundation[currRow+1][currCol] !== null) {
        let startbottom = currRow+1
        while (boardFoundation[startbottom][currCol] !== null && startbottom <= 14) {
            bottom = bottom + boardFoundation[startbottom][currCol].letter
            wordObj.point = wordObj.point + boardFoundation[startbottom][currCol].point
 
            if (shouldCheckBranch && (boardFoundation[startbottom][currCol].isClicked == true && (boardFoundation[startbottom][currCol-1] !== null
                 || boardFoundation[startbottom][currCol+1] !== null))) {
                     storeBranchIndex.push([startbottom, currCol]) 
            } 
            
            startbottom = startbottom + 1
         }
    }

    if (boardFoundation[currRow-1][currCol] !== null) {
        let startTop = currRow-1
        while (boardFoundation[startTop][currCol] !== null && startTop >= 0) {
            top = boardFoundation[startTop][currCol].letter + top
            wordObj.point = wordObj.point + boardFoundation[startTop][currCol].point
 
            if ( shouldCheckBranch == true && (boardFoundation[startTop][currCol].isClicked == true && (boardFoundation[startTop][currCol-1] !== null
                 || boardFoundation[startTop][currCol+1] !== null))) {
                     storeBranchIndex.push([startTop, currCol]) 
            } 
            
            startTop = startTop - 1
         }
         
    }

    if (shouldCheckBranch == true && (boardFoundation[currRow][currCol-1] !== null || boardFoundation[currRow][currCol+1] !== null)) {
        storeBranchIndex.push([currRow, currCol])
    }

    wordObj.word = top + boardFoundation[currRow][currCol].letter + bottom
    wordObj.point += boardFoundation[currRow][currCol].point
    storeWords.push(wordObj)

    if (storeBranchIndex.length > 0 && shouldCheckBranch) {
        console.log('why')
        let place
        for (let i = 0; i < storeBranchIndex.length; i++) {
            place = [storeBranchIndex[i][0], storeBranchIndex[i][1]]
            scanLeftRight(place, false)
        }
    }

    console.log(storeWords)
    
}



//function to scan tile
function scanTile(dir, startPos) {

    if (dir == 'LR'){
        scanLeftRight(startPos, true)  
    }else{
        scanTopBottom(startPos, true)
    }
    
    refillRackWhenNewGameStart(refillRack)
    for (let i = 0; i < boardFoundation.length; i++) {
        for (let j = 0; j < boardFoundation[i].length; j++) {
            if (boardFoundation[i][j] !== null && boardFoundation[i][j].isClicked == true) {
                boardFoundation[i][j].isClicked = false
            }
    
        }   
    }
}


//check if tile a correctly placed
function checkTiles() {
    let isDirection = false
    let direction
    let startScanPos
    let prevIndex = []

    for (let i = 0; i < boardFoundation.length; i++) {
        for (let j = 0; j < boardFoundation[i].length; j++) {
            if (direction == 'LR' && boardFoundation[i][j] !== null && boardFoundation[i][j].isClicked == true) {
                if (j - prevIndex[prevIndex.length-1] !== 1) {
                    return
                }
                prevIndex.push(j)
            }else if (direction == 'TD' && (boardFoundation[i][j] !== null && boardFoundation[i][j].isClicked == true)) {
                if (j - prevIndex[prevIndex.length-1] !== 0) {
                    console.log(direction)
                    return
                }
                prevIndex.push(j)
            }

            if (boardFoundation[i][j] !== null && boardFoundation[i][j].isClicked == true && isDirection == false) {
                if (boardFoundation[i][j+1] !== null && boardFoundation[i][j+1].isClicked == true) {
                    direction = 'LR'
                    prevIndex.push(j)
                }else if (boardFoundation[i+1][j] !== null && boardFoundation[i+1][j].isClicked == true) {
                    direction = 'TD'
                    prevIndex.push(j)
                }
                startScanPos = [i, j]
                isDirection = true
            }
    
        }
        
    }
    if (startScanPos == null) {
       return 
    }
    scanTile(direction, startScanPos)
}



createTotalTile()
renderShowTileLeft() 
refillRackWhenNewGameStart(refillRack)

//creating the array to create the board
let boardFoundation = []
for (let i = 0; i <= 14; i++) {
let array = []
    for (let j = 0; j <= 14; j++) {
        array.push(null)
    } 
    boardFoundation.push(array) 
}
createBox()
board.addEventListener('click', (e)=>{
    if (e.target.dataset.id == "bt") {
        let row = parseInt(e.target.dataset.row)
        let column = parseInt(e.target.dataset.column)
        addAndRemoveTileOnBoard(row, column)   
    } 
})
rack.addEventListener('click', (e)=>{
    if (e.target.dataset.id == 'rt') {
        let index = parseInt(e.target.dataset.index)
        selectTileFromRack(index)   
    }else {
        return
    }
})
blankTileReplacementHolder.addEventListener('click', (e)=>{
    if (e.target.id == 'rep') {
        let index = e.target.dataset.i
        selectReplacementTile(index)   
    }else{
        return
    }
})
doneSelectingReplacementTile.addEventListener('click', doneReplacingBlankTilebuttonFun)
cancelReplacementButton.addEventListener("click", () => { refreshAndRemoveReplacementTile() }) 

check.addEventListener('click', checkTiles)

//function to create tiles in total tiles
function createTotalTile() {
    for (let i = 0; i < 100; i++) {
        totalTile.push(
            {
                letter: i < 9 ? 'A' : i >= 9 && i < 18 ? 'I' 
                            : i >= 18 && i < 20 ? 'B' : i >= 20 && i < 22 ? 'C' 
                                : i >= 22 && i < 26 ? 'D' : i >= 26 && i < 38 ? 'E' 
                                    : i >= 38 && i < 40 ? 'F' : i >= 40 && i < 43 ? 'G' 
                                        : i >= 43 && i < 45 ? 'H' : i >= 45 && i < 46 ? 'J' 
                                            : i >= 46 && i < 47 ? 'K' : i >= 47 && i < 51 ? 'L' 
                                                : i >= 51 && i < 53 ? 'M' : i >= 53 && i < 59 ? 'N'
                                                    : i >= 59 && i < 67 ? 'O': i >= 67 && i < 69 ? 'P' 
                                                        : i >= 69 && i < 70 ? 'Q' : i >= 70 && i < 76 ? 'R' 
                                                            : i >= 76 && i < 80 ? 'S' : i >= 80 && i < 86 ? 'T'
                                                                : i >= 86 && i < 89 ? 'U' : i >= 89 && i < 91 ? 'V'
                                                                    : i >= 91 && i < 93 ? 'W' :i >= 93 && i < 94 ? 'X' 
                                                                        : i >= 94 && i < 96 ? 'Y' : i >= 96 && i < 97 ? 'Z' : '',
                point: i < 9 ? 1 : i >= 9 && i < 18 ? 1 
                : i >= 18 && i < 20 ? 3 : i >= 20 && i < 22 ? 3 
                    : i >= 22 && i < 26 ? 2 : i >= 26 && i < 38 ? 1 
                        : i >= 38 && i < 40 ? 4 : i >= 40 && i < 43 ? 2
                            : i >= 43 && i < 45 ? 4 : i >= 45 && i < 46 ? 8 
                                : i >= 46 && i < 47 ? 5 : i >= 47 && i < 51 ? 1 
                                    : i >= 51 && i < 53 ? 3 : i >= 53 && i < 59 ? 1
                                        : i >= 59 && i < 67 ? 1: i >= 67 && i < 69 ? 3 
                                            : i >= 69 && i < 70 ? 10 : i >= 70 && i < 76 ? 1
                                                : i >= 76 && i < 80 ? 1 : i >= 80 && i < 86 ? 1
                                                    : i >= 86 && i < 89 ? 1 : i >= 89 && i < 91 ? 4
                                                        : i >= 91 && i < 93 ? 4 :i >= 93 && i < 94 ? 8 
                                                            : i >= 94 && i < 96 ? 4 : i >= 96 && i < 97 ? 10 : 0,
                isClicked: false
            }
        
        )
    }
    
}


