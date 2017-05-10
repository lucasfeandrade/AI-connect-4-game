const cloneDeep = require('clone-deep');

module.exports = class Node {
  constructor(parent, state, alpha, beta) {
    this.parent = parent
    this.state = state
    this.alpha = alpha
    this.beta = beta
    this.children = []
  }

  createChild(position, player) {
    // console.log(this.state);
    for (let i = 0; i < this.state.length; i++) {
      let newState = cloneDeep(this.state)
      if (newState[i][position] !== 0) {
        newState[i - 1][position] = player
        this.children.push(new Node(this, newState, this.alpha, this.beta))
        return
      }
    }
  }
}
