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
    for (let i = 5; i > 0; i--) {
      let newState = cloneDeep(this.state)
      let statePosition = newState[position]
      if(statePosition[i] !== 0) {
        statePosition[i + 1] =  player
        this.children.push(new Node(this, newState, this.alpha, this.beta))
      }
    }
  }
}
