import { gameboard } from './gameboard.js'

export const player = (name, type) => {
    
    return {
        type: type,
        name: name,
        gameboard: gameboard()
    }
}