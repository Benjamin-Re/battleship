import Ship from '../logicalComponents/ship.js'
import { player1Gameboard, player2Gameboard } from '../main.js'
import { computerTurn } from './enterCoordinatesComponent.js'

export const gamestate = { 
    gameover: false,
    turn: true,
    isComputerGame: false
 }

export function createVisualGameboard(name) {
    const gameboard = document.createElement('div')
    gameboard.setAttribute('class','gameboard')
    gameboard.setAttribute('id',`${name}`)
    return gameboard
}

export function addVisualCoordinatesToGameboard(playerGameboard, visualGameboard) {
    for(let row = 0; row < playerGameboard.getMap().length; row++) {
        for(let col = 0; col < playerGameboard.getMap()[row].length; col++) {
            if(playerGameboard.getMap()[row][col] instanceof Ship) {
                createCoordinate(visualGameboard, row, col)
            } else {
                createCoordinate(visualGameboard, row, col)
            }
        }
    }
}

function createCoordinate (gameboard, row, col) {
    const coordinate = document.createElement('div')
    let coordinateColor = (gameboard == gameboard1) ? 'gray' : 'lightgray'
    coordinate.style.backgroundColor = coordinateColor
    coordinate.setAttribute('class', 'coordinate')
    coordinate.addEventListener('click', onClick)
    const coordinateId = `coordinate-${row}${col}`
    coordinate.setAttribute('id', coordinateId)
    gameboard.appendChild(coordinate)
}


function onClick(e) {   
    const coordinates = e.target.id.substr(11).split('').map(Number)
    console.log(coordinates)
    if(e.target.parentNode.id==='gameboard1'){
        clickOnCoordinate(coordinates[0],coordinates[1],player1Gameboard, 'gameboard1')
    }
    if(e.target.parentNode.id==='gameboard2'){
        clickOnCoordinate(coordinates[0],coordinates[1],player2Gameboard, 'gameboard2')
    }
    console.log(gamestate.isComputerGame)
    if(gamestate.isComputerGame){
        computerTurn()
    }
}

export function clickOnCoordinate(row, col, gameboard, gameboardId) {
    console.log(`selector #${gameboardId} #coordinate-${row}${col}`)
    if(gameboard.getMap()[row][col] instanceof Ship){
        document.querySelector(`#${gameboardId} #coordinate-${row}${col}`).style.backgroundColor = 'blue'
    } else {
        document.querySelector(`#${gameboardId} #coordinate-${row}${col}`).style.backgroundColor = 'red'
    }
    gameboard.receiveAttack(row,col)
    if(gameboard.areAllShipsSunk()) {
        alert(`All ships of ${gameboardId} are sunk`)
        gamestate.gameover = true
    }
    gamestate.turn = !gamestate.turn
}

export function repaintGameboards() {
    clearGameboards();
    addVisualCoordinatesToGameboard(player1Gameboard, gameboard1);
    addVisualCoordinatesToGameboard(player2Gameboard, gameboard2);
}

function clearGameboards() {
    gameboard1.innerHTML = '';
    gameboard2.innerHTML = '';
}