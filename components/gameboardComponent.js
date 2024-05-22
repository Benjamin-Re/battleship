import Ship from '../logicalComponents/ship.js'
import { player1Gameboard, player2Gameboard } from '../main.js'


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
    let coordinateColor = (gameboard == gameboard1) ? 'gray' : 'lightgray'
    coordinate.style.backgroundColor = coordinateColor
    coordinate.setAttribute('class', 'coordinate')
    coordinate.addEventListener('click', onClick)
    const coordinateId = [row, col]
    coordinate.setAttribute('id', coordinateId)
    coordinate.setAttribute('isship', isShip)
    gameboard.appendChild(coordinate)
}

function onClick(e) {   
    const coordinates = e.target.id.split(',').map(Number)
    console.log(coordinates)
    if(e.target.parentNode.id==='gameboard1'){
        if(player1Gameboard.getMap()[coordinates[0]][coordinates[1]] instanceof Ship){
            e.target.style.backgroundColor = 'blue'
        } else {
            e.target.style.backgroundColor = 'red'
        }
        player1Gameboard.receiveAttack(coordinates[0],coordinates[1])
        if(player1Gameboard.areAllShipsSunk()) {
            alert('All ships of player 1 are sunk')
        }
    }
    if(e.target.parentNode.id==='gameboard2'){
        if(player2Gameboard.getMap()[coordinates[0]][coordinates[1]] instanceof Ship){
            e.target.style.backgroundColor = 'blue'
        } else {
            e.target.style.backgroundColor = 'red'
        }
        player2Gameboard.receiveAttack(coordinates[0],coordinates[1])
        if(player2Gameboard.areAllShipsSunk()) {
            alert('All ships of player 2 are sunk')
        }
    }
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