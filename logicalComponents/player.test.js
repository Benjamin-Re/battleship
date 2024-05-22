import { player } from './player'

test.only('Each player object should contain its own gameboard', () => {
    const testPlayer = player()
    const testPlayerGameboard = testPlayer.gameboard
    expect(testPlayerGameboard).not.toBe(null)
})