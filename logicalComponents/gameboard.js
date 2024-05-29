import Ship from './ship.js'

export const gameboard = (m,n) => {
    
    // Empty map to start with
    let map = [];
    
    for (let i = 0; i < m; i++) {
        let row = [];
        for (let j = 0; j < n; j++) {
            row.push(0);
        }
        map.push(row);
    }

    const resetGameboard = (map, m, n) => {   
        for (let i = 0; i < m; i++) {
            for (let j = 0; j < n; j++) {
                map[i][j] = 0;
            }
        }
    };

    // place ships on specific coordinates, eg (01,03), so a ship with length of three vertically in the top left
    const placeShip = (startRow, startCol, endRow, endCol) => {
        console.log(`About to place a ship at coordinates (${startRow}, ${startCol}/${endRow}, ${endCol})`)
        if(!areCoordinatesValid(startRow, startCol, endRow, endCol)){
            console.log('invalid coordinates')
            return false
        }

        // Normalize coordinates to ensure startRow <= endRow and startCol <= endCol
        if (startRow > endRow) [startRow, endRow] = [endRow, startRow];
        if (startCol > endCol) [startCol, endCol] = [endCol, startCol];

        const isVertical = startCol === endCol;

        // Check for overlapping ships
        if (isVertical) {
            for (let row = startRow; row <= endRow; row++) {
                if (map[row][startCol] instanceof Ship) {
                    console.log('Overlap detected at', row, startCol);
                    return false;
                }
            }
        } else {
            for (let col = startCol; col <= endCol; col++) {
                if (map[startRow][col] instanceof Ship) {
                    console.log('Overlap detected at', startRow, col);
                    return false;
                }
            }
        }

        // Place the ship
        const shipLength = isVertical ? (endRow - startRow + 1) : (endCol - startCol + 1);
        const newShip = new Ship(shipLength);

        if (isVertical) {
            for (let row = startRow; row <= endRow; row++) {
                map[row][startCol] = newShip;
            }
        } else {
            for (let col = startCol; col <= endCol; col++) {
                map[startRow][col] = newShip;
            }
        }

        console.log(`Created ship of length ${shipLength}`);
        return true  
    }

        const areCoordinatesValid = (startRow, startCol, endRow, endCol) => {
            // Coordinates can't be outside the grid
            if(startRow < 0 || startRow > m || startCol < 0 || startCol > n || endRow < 0 || endRow > m || endCol < 0 || endCol > n ){
                return false
            } 
            // Coordinates must form a either horizontal or vertical line
            const isVertical = startCol === endCol;
            if(isVertical){
                // if its vertical then the start and end column must be the same
                if(startCol !== endCol) {
                    return false
                }
            } else {
                if(startRow !== endRow) {
                    return false
                }
            }
        return true
    }

    const receiveAttack = (x, y) => {
        const isShip = map[x][y] instanceof Ship
        if(isShip){
            const ship = map[x][y]
            ship.hit()
            return true
        } else {
            map[x][y] = 'X'
            return false
        }
    }

    const getMap = () => {
        return map
    }

    const areAllShipsSunk = () => {
        let returnValue = true
        for(let row = 0; row < map.length; row++) {
            for(let col = 0; col < map[row].length; col++) {
                if(map[row][col] instanceof Ship) {
                    if(!map[row][col].isSunk()){
                        returnValue = false
                    }
                }
            }
        }
        return returnValue
    }

    return {
        placeShip,
        getMap,
        receiveAttack,
        areAllShipsSunk,
        areCoordinatesValid,
        resetGameboard
    }
}