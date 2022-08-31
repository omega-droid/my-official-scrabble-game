const board = document.querySelector(".board")
const showTileLeft = document.querySelector(".tileLeft")
const rack = document.querySelector(".rack")
const blankTileReplacementAndButtonHolder = document.querySelector(".blank-tileReplacements-button-Holder")
const blankTileReplacementHolder = document.querySelector(".replacement-tiles-Holder")
const doneSelectingReplacementTile = document.querySelector(".done-selecting-tile")
const cancelReplacementButton = document.querySelector(".cancel-selecting-tile")
const overLay = document.querySelector(".overLay")

//container that holds the total tile
let totalTile = [];
//to know when the rack should be refilled
let shouldRefillRack = true;
//an array of tile in the rack
let racktile = [];
//unique number for tile
let uniqueTileNum = 0;
//check if board box is empty or not
let isTileOnRackSelected;
//store the index of tile selected
let indexOfSelectedTile;
//array that store replacement of blank tile
let storeReplacementForBlankTile = [{letter: 'A', selected: false}, {letter: 'B', selected: false}, {letter: 'C', selected: false}, {letter: 'D', selected: false},
{letter: 'E', selected: false}, {letter: 'F', selected: false}, {letter: 'G', selected: false}, {letter: 'H', selected: false}, {letter: 'I', selected: false}, 
{letter: 'J', selected: false}, {letter: 'K', selected: false}, {letter: 'L', selected: false}, {letter: 'M', selected: false}, {letter: 'N', selected: false},
{letter: 'O', selected: false}, {letter: 'P', selected: false}, {letter: 'Q', selected: false}, {letter: 'R', selected: false}, {letter: 'S', selected: false}, 
{letter: 'T', selected: false}, {letter: 'V', selected: false}, {letter: 'W', selected: false}, {letter: 'X', selected: false}, {letter: 'Y', selected: false}, 
{letter: 'Z', selected: false}]

//creating tile holder
createTotalTile()
//render length of tile in total tile on showTile left
renderShowTileLeft() 
//auto refill rack when shouldRefillRack is true
refillRackWhenNewGameStart()
//creating the board
//creating the foundation of the board
boardFoundation = []
for (let i = 0; i <= 14; i++) {
   let array = []
    for (let j = 0; j <= 14; j++) {
        array.push(null)
    } 
    boardFoundation.push(array) 
}
//creating board for scrumble
createBox()

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
                                boxSpanClass = ""
                            }
                        }
                        return `
                            <div class=${boxClass} onclick="addAndRemoveTileOnBoard(${i}, ${j})">
                                <p class=${boxDecriptionClass}>${boxDescription}</p>
                                <span class=${boxSpanClass}>${tilepoint}</span>
                            </div>
                            `
                    }).join("")
                }
            </div>
        `
    }).join("")
}
cancelReplacingTile()

//auto refill rack when shouldRefillRack is true
function refillRackWhenNewGameStart() {
    if (shouldRefillRack) {
        while (racktile.length < 7) {
            let num = Math.floor(Math.random() * totalTile.length)
            totalTile[num].countTile = uniqueTileNum
            racktile.push(totalTile[num])
            totalTile.splice(num, 1)
            uniqueTileNum++
        }
        shouldRefillRack = false
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
            <div class=${classnameForTileInRack} onclick=(selectTileFromRack(${i}))>
                ${tile.letter}<span class=${classnameForTileInRackSpan}>${tile.point}</span>
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
    //checking if board box is empty to either add or remove tile
    if (boardFoundation[row][column] == null) {
        isTheBoardEmpty = true
    }else{
        isTheBoardEmpty = false
    }
    //checking wheather to remove or add tile to box 
    if (isTheBoardEmpty == true) {
        if (isTileOnRackSelected) {
            if (racktile[indexOfSelectedTile].point == 0 ) {
                CreateReplaceBlankTileInRack()
                //replace blank tile
                confirmSelectedReplacementTile(row, column) 
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
//function to confirm replacement tile
function confirmSelectedReplacementTile(i, j){
    doneSelectingReplacementTile.addEventListener('click', () => {
        let isReplacementTileSelected = false
        let replacingTileIndex
        storeReplacementForBlankTile.forEach((tile, index) =>{
            if (tile.selected == true) {
                isReplacementTileSelected = true
                replacingTileIndex = index
            }
        } )
        if (isReplacementTileSelected) {
            racktile[indexOfSelectedTile].letter = storeReplacementForBlankTile[replacingTileIndex].letter
            addTileToBoard(i, j)
            refreshReplacementTile()
            createBox()
            checkIfTileIsSelected()
        }
    })
}
//function to cancel replacement of tile
function cancelReplacingTile(){
    cancelReplacementButton.addEventListener("click", () => {
        refreshReplacementTile()
    }) 
}
//function to refresh replacement tile
function refreshReplacementTile() {
    storeReplacementForBlankTile.forEach(tile => {
        tile.selected = false
    })
    removeReplacementHolder()
}
//function to remove replacement holder
function removeReplacementHolder() {
    overLay.classList.remove("active")
    blankTileReplacementAndButtonHolder.classList.remove("active")
}
//function to display replacement holder
function displayReplacementHolder() {
    overLay.classList.add("active")
    blankTileReplacementAndButtonHolder.classList.add("active")
}
//function to add tile to replacement holder
function addingTileToReplacementHolder() {
    blankTileReplacementHolder.innerHTML = storeReplacementForBlankTile.map((tile, index) => {
        let classForReplacementTile
        if(tile.selected == true){
            classForReplacementTile = "replacement-tile-selected"
        }else {
            classForReplacementTile = "replacement-tile"
        }

        return `
            <div class=${classForReplacementTile} onclick="selectReplacementTile(${index})">${tile.letter}</div>
        `
    }).join("")
}
//function to select a replacementTile
function selectReplacementTile(i) {
    storeReplacementForBlankTile.forEach(tile => {
        tile.selected = false
    })
    storeReplacementForBlankTile[i].selected = true
    addingTileToReplacementHolder()
}

//function to add tile from rack to board
function addTileToBoard(i, j) {
    boardFoundation[i][j] = {...racktile[indexOfSelectedTile]}
    racktile.splice(indexOfSelectedTile, 1)
    renderTileOnRack()
}
//function to remove tile from board to rack
function removeOrSwapTileFromBoard(i, j) {
    if (isTileOnRackSelected) {
        swapTile(i, j) 
    }else{
        removeTile(i, j)
    }
    renderTileOnRack()
}
//function to swap tile on board
function swapTile(i, j) {
    let holdingRackTile = {...racktile[indexOfSelectedTile]}
    racktile[indexOfSelectedTile] = {...boardFoundation[i][j], isClicked: false}
    boardFoundation[i][j] = holdingRackTile
}
//function to remove tile
function removeTile(i, j) {
    racktile.push({...boardFoundation[i][j], isClicked: false})
    boardFoundation[i][j] = null
}
//function to check if a tile is selected
function checkIfTileIsSelected() {
    isTileOnRackSelected = false
    indexOfSelectedTile = null
    racktile.forEach((tile, i) => {
        if (tile.isClicked == true) {
            isTileOnRackSelected = true
            indexOfSelectedTile = i
        }
    })
}

//function to create tiles in total tiles
function createTotalTile() {
    for (let i = 0; i < 9; i++) {
        const A =  {
            letter: "A",
            point: 1,
            isClicked: false
        }
        const I =  {
            letter: "I",
            point: 1,
            isClicked: false
        }
        totalTile.push(I, A)
    }

    for (let i = 0; i < 3; i++) {
        const G =  {
            letter: "G",
            point: 2,
            isClicked: false
        }
    
        totalTile.push(G)
    }

    for (let i = 0; i < 8; i++) {
        const O =  {
            letter: "O",
            point: 1,
            isClicked: false
        }
    
        totalTile.push(O)
    }

    for (let i = 0; i < 12; i++) {
        const E =  {
            letter: "E",
            point: 1,
            isClicked: false
        }
    
        totalTile.push(E)
    }


    for (let i = 0; i < 2; i++) {
        const B =  {
            letter: "B",
            point: 3,
            isClicked: false
        }

        const C =  {
            letter: "C",
            point: 3,
            isClicked: false
        }

        const H =  {
            letter: "H",
            point: 4,
            isClicked: false
        }
        const F =  {
            letter: "F",
            point: 4,
            isClicked: false
        }

        const V =  {
            letter: "V",
            point: 4,
            isClicked: false
        } 

        const Y =  {
            letter: "Y",
            point: 4,
            isClicked: false
        }

        const M =  {
            letter: "M",
            point: 3,
            isClicked: false
        }

        const W =  {
            letter: "W",
            point: 4,
            isClicked: false
        }

        const P =  {
            letter: "P",
            point: 3,
            isClicked: false
        }

        const Blank =  {
            letter: "",
            point: 0,
            isClicked: false
        }

        totalTile.push(B, H, C, Blank, P, W, F, M, Y, V)
    }

    for (let i = 0; i < 6; i++) {
        const N  =  {
            letter: "N",
            point: 1,
            isClicked: false
        }
        const R =  {
            letter: "R",
            point: 1,
            isClicked: false
        }

        const T =  {
            letter: "T",
            point: 1,
            isClicked: false
        }
        totalTile.push(N, R, T)
    }

    for (let i = 0; i < 4; i++) {
        const D =  {
            letter: "D",
            point: 2,
            isClicked: false
        }
        const L =  {
            letter: "L",
            point: 1,
            isClicked: false
        }

        const S =  {
            letter: "T",
            point: 1,
            isClicked: false
        }

        const U =  {
            letter: "U",
            point: 1,
            isClicked: false
        }
        totalTile.push(D, L, S, U)
    }


    for (let i = 0; i < 1; i++) {
        const K =  {
            letter: "K",
            point: 5,
            isClicked: false
        }
        const X =  {
            letter: "X",
            point: 8,
            isClicked: false
        }

        const J =  {
            letter: "J",
            point: 8,
            isClicked: false
        }

        const Q =  {
            letter: "Q",
            point: 10,
            isClicked: false
        }

        const Z =  {
            letter: "Z",
            point: 10,
            isClicked: false
        }

        totalTile.push(K, X, J, Q, Z)
    }
}
