import { gameboard } from "./gameboard";
import Ship from './ship'

test('new gameboards map is empty', () => {
    let test_gameboard = gameboard()
    let emptyMap = [
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0],
    ] 
    expect(test_gameboard.getMap()).toEqual(emptyMap);
})

test('a ship can be placed on the map vertically', () => {
    let test_gameboard = gameboard()
    test_gameboard.placeShip(0,0,2,0)
    expect(test_gameboard.getMap()[0][0]).toBeInstanceOf(Ship) 

})

test('a ship can be placed on the map horizontally', () => {
    let test_gameboard = gameboard()
    test_gameboard.placeShip(0,0,0,2)
    expect(test_gameboard.getMap()[0][2]).toBeInstanceOf(Ship) 
})

test('checks if successful attack calls hit on the ship', () => {
    let test_gameboard = gameboard()
    test_gameboard.placeShip(0,0,0,2)
    const ship = test_gameboard.getMap()[0][1]
    test_gameboard.receiveAttack(0,1)
    // expect ship hit function to have been called once
    expect(ship.getNumHits()).toBe(1)
})

test('checks if missed attack is recorded', () => {
    let test_gameboard = gameboard()
    test_gameboard.placeShip(0,0,0,2)
    const ship = test_gameboard.getMap()[0][1]
    test_gameboard.receiveAttack(1,1)
    // expect ship hit function to have been called once
    expect(ship.getNumHits()).toBe(0)
    expect(test_gameboard.getMap()[1][1]).toBe('X')
})

test('reports if all ships have been sunk or not', () => {
    let test_gameboard = gameboard()
    test_gameboard.placeShip(0, 0, 0, 2)
    test_gameboard.receiveAttack(0,0)
    test_gameboard.receiveAttack(0,1)
    expect(test_gameboard.areAllShipsSunk()).toBe(false)
    test_gameboard.receiveAttack(0,2)
    expect(test_gameboard.areAllShipsSunk()).toBe(true)
})