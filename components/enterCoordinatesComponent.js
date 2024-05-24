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
    app.append(formContainer)
}

function randomlyDistributeShips() {
    resetGame()
    let numShipsPlayer1 = 0
    while(numShipsPlayer1 < 3) {
        const randomStartRow = Math.floor(Math.random() * (4 + 1))
        const randomStartCol = Math.floor(Math.random() * (4 + 1))
        const randomEndRow = Math.floor(Math.random() * (4 + 1))
        const randomEndCol = Math.floor(Math.random() * (4 + 1))       
        if(player1Gameboard.placeShip(randomStartRow,randomStartCol,randomEndRow,randomEndCol)){
            numShipsPlayer1++
        }
    }
    let numShipsPlayer2 = 0
    while(numShipsPlayer2 < 3) {
        const randomStartRow = Math.floor(Math.random() * (4 + 1))
        const randomStartCol = Math.floor(Math.random() * (4 + 1))
        const randomEndRow = Math.floor(Math.random() * (4 + 1))
        const randomEndCol = Math.floor(Math.random() * (4 + 1))       
        if(player2Gameboard.placeShip(randomStartRow,randomStartCol,randomEndRow,randomEndCol)){
            numShipsPlayer2++
        }
    }
}

function resetGame() {
    repaintGameboards()
    gamestate.gameover = false
    gamestate.isComputerGame = false
    gamestate.turn = true
    console.clear()
    console.log(`Gamestate.gameover: ${gamestate.gameover}, gamestate.turn: ${gamestate.turn}, gamestate.isComputerGame:${gamestate.isComputerGame}`)
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
        do {
            const randomRow = Math.floor(Math.random() * (4 + 1))
            const randomCol = Math.floor(Math.random() * (4 + 1))
            console.log(`Computer attacks: ${randomRow}, ${randomCol}`);
            successfulHit = clickOnCoordinate(randomRow, randomCol, player1Gameboard, 'gameboard1');
            console.log(`Successful hit: ${successfulHit}`);
        } while (successfulHit)
    }
}

function startComputerGame() {    
    gamestate.isComputerGame = true
}

