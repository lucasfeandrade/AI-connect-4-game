const _ = require('lodash')

module.exports = class Node {
  constructor(parent, state, alpha, beta, player) {
    this.parent = parent
    this.state = state
    this.alpha = alpha
    this.beta = beta
    this.children = []
    this.pieces = this.findPieces(player)
  }

  createChild(position, player) {
    let stateLength = this.state.length
    for (let i = 0; i < stateLength ; i++) {
      let newState = _.cloneDeep(this.state)
      if (newState[i][position] !== 0) {
        newState[i - 1][position] = player
        //Ve se faz sentido isso Giuseppe
        if (player === 1)
          this.children.push(new Node(this, newState, this.alpha, this.beta, 2))
        if (player === 2)
          this.children.push(new Node(this, newState, this.alpha, this.beta, 1))
        return
      }
    }
  }

  isLeaf() {
    console.log('inside is leaf')
    let pieces = this.pieces
    for(let position = 0; position < 6; position ++) {
      if (this.isColumnFull(position))
        return true
    }
    for (let piece of pieces) {
      if ( piece.length === 4 )
        return true
    }
    return false
  }

  isColumnFull(position){
    return this.state[0][position] !== 0 ? true : false
  }

  findPieces(player) {
    let pieces = [];
    this.horizontalSearch(player).forEach((piece) => {
      pieces.push(piece);
    });
    this.verticalSearch(player).forEach((piece) => {
      pieces.push(piece);
    });
    return pieces;
  }

  horizontalSearch(player) {
    let found = false;
    let pieceSize = 0;
    let pieces = [];
    let stateLength = this.state.length;
    for (let i = 0; i < stateLength; i++) {
      found = false;
      pieceSize = 0;
      for (var j = 0; j < this.state[i].length; j++) {
        if (this.state[i][j] === player) {
          found = true;
          pieceSize++;
        } else {
          found = false;
          if (pieceSize > 1) {
            let temp = [];
            for (let k of _.range(1, pieceSize + 1)) {
              temp.push([j - k, i]);
            }
            pieces.push(temp);
          }
          pieceSize = 0;
        }
        if (found && j === this.state[i].length - 1 && pieceSize > 1) {
          let temp = [];
          for (let k of _.range(pieceSize)) {
            temp.push([j - k, i]);
          }
          pieces.push(temp);
        }
      }
    }
    return pieces;
  }

  verticalSearch(player) {
    let found = false;
    let pieceSize = 0;
    let pieces = [];
    let stateLength = this.state.length;
    for (let j = 0; j < this.state[0].length; j++) {
      found = false;
      pieceSize = 0;
      for (var i = 0; i < stateLength; i++) {
        if (this.state[i][j] === player) {
          found = true;
          pieceSize++;
        } else {
          found = false;
          if (pieceSize > 1) {
            let temp = [];
            for (let k of _.range(1, pieceSize + 1)) {
              temp.push([j, i - k]);
            }
            pieces.push(temp);
          }
          pieceSize = 0;
        }
        if (found && i === stateLength - 1 && pieceSize > 1) {
          let temp = [];
          for (let k of _.range(pieceSize)) {
            temp.push([j, i - k]);
          }
          pieces.push(temp);
        }
      }
    }
    return pieces;
  }

  findUtility() {
    let pieces = this.pieces
    let value = 0
    for (let piece of pieces) {
      let pieceLength = piece.length
      if (pieceLength === 2) {
        // 420 for each piece
        value = value + 420
      }
      if (pieceLength === 3) {
        // 8820 for each piece
        value = value + 8820
      }

      if (pieceLength >= 4) {
        // 123480 for each piece
        value = value + 123480
      }
    }
    return value
  }

}
