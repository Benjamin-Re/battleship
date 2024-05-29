import Ship from '../logicalComponents/ship.js'
import { player1Gameboard, player2Gameboard } from '../main.js'
import { computerTurn } from './enterCoordinatesComponent.js'
import { gamestate } from './state.js' 

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
                createCoordinate(visualGameboard, row, col, true)
            } else {
                createCoordinate(visualGameboard, row, col, false)
            }
        }
    }
}

function createCoordinate (gameboard, row, col, isShip) {
    const coordinate = document.createElement('div')
    let coordinateColor = (gameboard == gameboard1) ? 'pink' : 'coral'
    if(gamestate.showShips){
        if(isShip){
            console.log('is a ship')
            coordinateColor = 'green'
        }
    }
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
    // Determine which player's turn it is based on gamestate.turn
    const currentGameboardToAttack = gamestate.turn ? player2Gameboard : player1Gameboard;
    const currentGameboardToAttackId = gamestate.turn ? 'gameboard2' : 'gameboard1';
    // Check if the clicked coordinate belongs to the current player's gameboard
    const clickedGameboardId = e.target.closest('.gameboard').id;
    if (clickedGameboardId === currentGameboardToAttackId) {
        // It's the current player's turn and they clicked on their own gameboard
        clickOnCoordinate(coordinates[0], coordinates[1], currentGameboardToAttack, currentGameboardToAttackId);
    }
    if(gamestate.isComputerGame && !gamestate.turn){
        computerTurn()
    }
}

export function clickOnCoordinate(row, col, gameboard, gameboardId) {
    let successfulHit = false
    console.log(`selector #${gameboardId} #coordinate-${row}${col}`)
    if(gameboard.getMap()[row][col] instanceof Ship){
        document.querySelector(`#${gameboardId} #coordinate-${row}${col}`).style.backgroundColor = 'blue'
    } else {
        document.querySelector(`#${gameboardId} #coordinate-${row}${col}`).style.backgroundColor = 'red'
    }
    if(gameboard.receiveAttack(row,col)){
        successfulHit = true
        // Dont change turns, after a successful hit the player gets another round
    } else {
        gamestate.turn = !(gamestate.turn)
        const stateLabel = document.getElementsByClassName('stateLabel')[0]
        stateLabel.textContent = gamestate.turn ? 'Player 1' : 'Player 2'
        successfulHit = false
    }
    if(gameboard.areAllShipsSunk()) {
        alert(`All ships of ${gameboardId} are sunk`)
        const winner = gameboardId === 'gameboard1' ? 'Player 2' : 'Player 1'
        gamestate.gameover = true
        const stateLabel = document.getElementsByClassName('stateLabel')[0];
        stateLabel.textContent = `Gameover. The winner is ${winner}`
    }
    return successfulHit
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