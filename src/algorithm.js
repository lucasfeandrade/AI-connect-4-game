const Inf = Infinity;
const NegInf = Math.log(0);

function minimax(node, alpha, beta, maxDepth) {
  'use strict'

  let isMax = node.depth % 2 === 0;
  let player = (node.depth % 2) + 1;
  let value = (isMax) ? NegInf : Inf;
  let movePos;


  if (node.isGameOver()) return [node.findUtility(), undefined]
  if (node.depth >= maxDepth) return [node.findUtility(), undefined]
  for (let pos of [3, 4, 2, 5, 1, 6, 0]) {
    let nodeChild = node.createChild(pos, player);
    if (nodeChild) {
      let childValue = minimax(nodeChild, alpha, beta, maxDepth)[0];
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
        return [value, movePos];
      }
    }
  }
  return [value, movePos];
}

module.exports = { minimax }
