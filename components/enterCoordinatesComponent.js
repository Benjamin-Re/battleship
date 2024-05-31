import { player1Gameboard, player2Gameboard } from "../main.js"
import { repaintGameboards } from "./gameboardComponent.js"
import {clickOnCoordinate } from './gameboardComponent.js'
import { gamestate } from './state.js'

export function createCoordinateForm() {
    const app = document.querySelector('.app')
    const formContainer = document.createElement('div')
    formContainer.classList.add('formContainer')
    const label = document.createElement('label')
    label.textContent = 'Enter coordinates'
    const input = document.createElement('input')
    input.type = 'text'
    input.id = 'coordinateInput'
    input.placeholder = 'startX, startY, endX, endY'
    const submitButton = document.createElement('button')
    submitButton.textContent = 'Submit'
    submitButton.onclick = submitCoordinates
    formContainer.append(label)
    formContainer.append(input)
    formContainer.append(submitButton)
    const selectPlayer = document.createElement('select');
    selectPlayer.classList.add('playerSelector')
    const option1 = document.createElement('option');
    option1.value = 'player1';
    option1.textContent = 'Player 1';
    const option2 = document.createElement('option');
    option2.value = 'player2';
    option2.textContent = 'Player 2';
    selectPlayer.appendChild(option1);
    selectPlayer.appendChild(option2);
    formContainer.append(selectPlayer)
    const randomizeButton = document.createElement('button')
    randomizeButton.textContent = 'randomize'
    randomizeButton.addEventListener('click', randomlyDistributeShips)
    formContainer.append(randomizeButton)
    const startComputerGameButton = document.createElement('button')
    startComputerGameButton.textContent = 'Start Computer Game'
    startComputerGameButton.addEventListener('click', startComputerGame)
    formContainer.append(startComputerGameButton)
    const checkboxContainer = document.createElement('div')
    checkboxContainer.setAttribute('class', 'checkboxContainer')
    const showShipsCheckbox = document.createElement('input')
    showShipsCheckbox.type = 'checkbox'
    showShipsCheckbox.id = 'showShipsCheckbox'
    showShipsCheckbox.name = 'showShipsCheckbox'
    showShipsCheckbox.value = 'showShips'
    showShipsCheckbox.addEventListener('click', toggleShowShips)
    checkboxContainer.append(showShipsCheckbox)
    const checkboxLabel = document.createElement('label');
    checkboxLabel.htmlFor = 'showShipsCheckbox'
    checkboxLabel.innerHTML = 'Show Ships'
    checkboxContainer.append(checkboxLabel)
    formContainer.append(checkboxContainer)
    app.append(formContainer)
}

function toggleShowShips () {
    const checkbox = document.getElementById('showShipsCheckbox');
    if (checkbox.checked) {
        gamestate.showShips = true
    } else {
        gamestate.showShips = false  
    }
    repaintGameboards()
}


function randomlyDistributeShips() {
    resetGame()
    let numShipsPlayer1 = 0
    while(numShipsPlayer1 < 3) {       
        const { randomStartRow, randomStartCol, randomEndRow, randomEndCol } = generateRandomCoordinates(numShipsPlayer1 + 2)
        if(player1Gameboard.placeShip(randomStartRow,randomStartCol,randomEndRow,randomEndCol)){
            numShipsPlayer1++
        }
    }
    let numShipsPlayer2 = 0
    while(numShipsPlayer2 < 3) {
        const { randomStartRow, randomStartCol, randomEndRow, randomEndCol } = generateRandomCoordinates(numShipsPlayer2 + 2)      
        if(player2Gameboard.placeShip(randomStartRow,randomStartCol,randomEndRow,randomEndCol)){
            numShipsPlayer2++
        }
    }
    repaintGameboards()
}

function generateRandomCoordinates(shipSize) {
    let randomStartRow, randomStartCol, randomEndRow, randomEndCol;
    const numRows = player1Gameboard.getMap().length
    const numCols = player1Gameboard.getMap()[0].length
    while (true) {
        randomStartRow = Math.floor(Math.random() * numRows);
        randomStartCol = Math.floor(Math.random() * numCols);
        randomEndRow = Math.floor(Math.random() * numRows);
        randomEndCol = Math.floor(Math.random() * numCols);

        const rowDifference = Math.abs(randomStartRow - randomEndRow);
        const colDifference = Math.abs(randomStartCol - randomEndCol);

        // Ensure the coordinates are shipSize - 1 apart either horizontally or vertically
        if ((rowDifference === shipSize - 1 && colDifference === 0) || 
            (colDifference === shipSize - 1 && rowDifference === 0)) {
            break;
        }
    }

    return { randomStartRow, randomStartCol, randomEndRow, randomEndCol };
}

function resetGame() {
    player1Gameboard.resetGameboard()
    player2Gameboard.resetGameboard()
    gamestate.gameover = false
    gamestate.isComputerGame = false
    gamestate.turn = true
    gamestate.attackLog = new Set()
    console.clear()
    console.log(`Gamestate.gameover: ${gamestate.gameover}, \
        gamestate.turn: ${gamestate.turn}, \
        gamestate.isComputerGame:${gamestate.isComputerGame}, \
        gamestate.attackLog: ${gamestate.attackLog}`)
}

function submitCoordinates() {
    const coordinates = document.getElementById('coordinateInput').value.split(',').map(Number)
    console.log(coordinates)
    const dropdownValue = document.getElementsByClassName('playerSelector')[0].value
    console.log('dropdown value ' + dropdownValue)
    const startX = coordinates[0]
    const startY = coordinates[1]
    const endX = coordinates[2]
    const endY = coordinates[3]
    if(dropdownValue === 'player1') {
        player1Gameboard.placeShip(startX, startY, endX, endY)
    }
    if(dropdownValue === 'player2') {
        player2Gameboard.placeShip(startX, startY, endX, endY)
    }
    repaintGameboards()
}

export function computerTurn() {
    if(!gamestate.gameover){
        let successfulHit = false
        const numRows = player1Gameboard.getMap().length
        const numCols = player1Gameboard.getMap()[0].length

        do {
            let randomRow = Math.floor(Math.random() * numRows)
            let randomCol = Math.floor(Math.random() * numCols)
            let coordinate = `${randomRow}${randomCol}`
            while(gamestate.attackLog.has(coordinate)){
                randomRow = Math.floor(Math.random() * numRows)
                randomCol = Math.floor(Math.random() * numCols)
                coordinate = `${randomRow}${randomCol}`
            }
            gamestate.attackLog.add(coordinate)
            console.log(`Computer attacks: ${randomRow}, ${randomCol}`);
            successfulHit = clickOnCoordinate(randomRow, randomCol, player1Gameboard, 'gameboard1');
            console.log(`Successful hit: ${successfulHit}`);
        } while (successfulHit)
    }
}

function startComputerGame() {    
    gamestate.isComputerGame = true
}

