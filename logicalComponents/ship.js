class Ship {
    length
    numHits
    constructor(length){
        this.length = length
        this.numHits = 0
    }
    hit(){
        this.numHits+=1
        console.log(`Number of htis taken: ${this.numHits}, vs ship length: ${this.length}`)
        if(this.isSunk()){console.log(this+' is sunk')}
    }
    isSunk(){
        return this.numHits >= this.length
    }
    getNumHits(){
        return this.numHits
    }

}

export default Ship