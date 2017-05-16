const Inf = Infinity;
const NegInfinity = Math.log(0);
const maxDepth = 8;

function minimax(node, alpha, beta, maxDepth) {
  'use strict'

  let isMax = node.depth % 2 === 0;
  let player = (node.depth % 2) + 1;
  let value = (isMax) ? NegInfinity : Infinity;

  let movePos;

  if (node.isGameOver() || node.depth >= maxDepth)
    return { value: node.findUtility(), movePos: undefined };
  for (let pos of [3, 4, 2, 5, 1, 6, 0]) {
    let nodeChild = node.createChild(pos, player);
    if (nodeChild) {
      let childValue = minimax(nodeChild, alpha, beta, maxDepth).value;
      if (isMax) {
        if (childValue > value) {
          value = childValue;
          movePos = pos;
        }
        alpha = Math.max(alpha, value)
      } else {
        if (childValue < value) {
          value = childValue;
          movePos = pos;
        }
        beta = Math.min(beta, value)
      }
      if (alpha >= beta) {
        return { value, movePos };
      }
    }
  }
  return { value, movePos };
}

module.exports = { minimax }
