import Ship from './ship'

test('Ship of length two to be sunk after two hits', () => {
    let ship1 = new Ship(2)
    ship1.hit()
    ship1.hit()
    expect(ship1.isSunk()).toBe(true)
})