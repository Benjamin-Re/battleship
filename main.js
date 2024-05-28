import { player } from './logicalComponents/player.js'
import { createVisualGameboard, addVisualCoordinatesToGameboard, repaintGameboards } from './components/gameboardComponent.js'
import { createCoordinateForm } from './components/enterCoordinatesComponent.js'
import { createStateLabel } from './components/visualGamestateComponent.js'

const player1 = player('Peter', 'real')
const player2 = player('Laura', 'real')
const app = document.querySelector('.app')

export const player1Gameboard = player1.gameboard
export const player2Gameboard = player2.gameboard

createCoordinateForm()

const gameboardContainer = document.createElement('div')
gameboardContainer.classList.add('gameboardContainer')
const gameboard1 = createVisualGameboard('gameboard1')
const gameboard2 = createVisualGameboard('gameboard2')
gameboardContainer.appendChild(gameboard1)
gameboardContainer.appendChild(gameboard2)
app.append(gameboardContainer)

addVisualCoordinatesToGameboard(player1Gameboard, gameboard1)
addVisualCoordinatesToGameboard(player2Gameboard, gameboard2)

const stateLabel = createStateLabel()
app.append(stateLabel)

