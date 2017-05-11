const _ = require('lodash')

module.exports = class Node {
  constructor(parent, state, alpha, beta) {
    this.parent = parent
    this.state = state
    this.alpha = alpha
    this.beta = beta
    this.children = []
  }

  createChild(position, player) {
    for (let i = 0; i < this.state.length; i++) {
      let newState = _.cloneDeep(this.state)
      if (newState[i][position] !== 0) {
        newState[i - 1][position] = player
        this.children.push(new Node(this, newState, this.alpha, this.beta))
        return
      }
    }
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
    for (let i = 0; i < this.state.length; i++) {
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
    for (let j = 0; j < this.state[0].length; j++) {
      found = false;
      pieceSize = 0;
      for (var i = 0; i < this.state.length; i++) {
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
        if (found && i === this.state.length - 1 && pieceSize > 1) {
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
}
