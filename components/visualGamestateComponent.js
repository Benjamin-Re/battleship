import { gamestate } from './state.js'

export function createStateLabel () {
    const stateLabel = document.createElement('div')
    stateLabel.textContent = gamestate.turn ? 'Player 1' : 'Player 2'
    stateLabel.setAttribute('class', 'stateLabel')
    return stateLabel
}
