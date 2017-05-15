const _ = require('lodash')

const WIDTH = 7
const HEIGHT = 6

module.exports = class Node {
  constructor(parent, state, depth) {
    this.parent = parent
    this.state = state
    this.depth = depth
    this.ownPieces = this.findPieces(1)
    this.advPieces = this.findPieces(2)
  }

  createChild(position, player) {
    if (this.isColumnFull(position)) return undefined
    for (let i = 0; i < HEIGHT; i++) {
      let newState = _.cloneDeep(this.state)
      if (newState[i][position] !== 0) {
        newState[i - 1][position] = player
        return new Node(this, newState, this.depth + 1)
      }
      if (i === HEIGHT - 1) {
        newState[HEIGHT - 1][position] = player
        return new Node(this, newState, this.depth + 1)
      }
    }
  }

  isGameOver() {
    if (this.isBoardFull()) return true;
    for (let piece of this.ownPieces) {
      if (piece.length >= 4) return true
    }
    for (let piece of this.advPieces) {
      if (piece.length >= 4) return true
    }
    return false
  }

  isBoardFull() {
    for (let col = 0; col < HEIGHT; col++) {
      if (!this.isColumnFull(col)) return false;
    }
    return true;
  }

  isColumnFull(col) {
    return this.state[0][col] !== 0;
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
    for (let i = 0; i < HEIGHT; i++) {
      found = false;
      pieceSize = 0;
      for (var j = 0; j < WIDTH; j++) {
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
        if (found && j === WIDTH - 1 && pieceSize > 1) {
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
    for (let j = 0; j < WIDTH; j++) {
      found = false;
      pieceSize = 0;
      for (var i = 0; i < HEIGHT; i++) {
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
        if (found && i === HEIGHT - 1 && pieceSize > 1) {
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
    let score = 0;
    let pieces = [this.ownPieces, this.advPieces]
    for (let player of [1, 2]) {
      let playerPieces = pieces[player - 1]
      for (let piece of playerPieces) {
        let pieceLength = piece.length;
        let value = 0;
        if (pieceLength === 2) {
          // 420 for each piece
          value = 420;
        } else if (pieceLength === 3) {
          // 8820 for each piece
          value = 8820;
        } else if (pieceLength >= 4) {
          // 123480 for each piece
          value = 123480;
        }
        if (player === 1) score += value;
        else score -= value;
      }
    }
    return score;
  }

}
