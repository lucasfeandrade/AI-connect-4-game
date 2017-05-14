

function minimax(node, alpha, beta, player) {
  if (node.isGameOver()) return node.findUtility()
    if (player === 1) {
      let value = 1000000000
      for (let position = 0; position < 6; position++) {
        //TODO Ele ta retornando sempre undefined, mas no teste funciona
        let nodeChild = node.createChild(position, player)
        if (nodeChild !== undefined) {
          // TODO : confirma se faz sentido trocar sempre o jogador
          player = (player === 1) ? 2 : 1
          value = Math.min(value, minimax(nodeChild, alpha, beta, player))
          beta = Math.min(beta, value)
        }
        if (beta <= alpha)
          break
      }
    }
    else {
      let value = 0
      for (let position = 0; position < 6; position++) {
        //TODO Ele ta retornando sempre undefined, mas no teste funciona
        let nodeChild = node.createChild(position, player)

        if (nodeChild !== undefined) {
          // TODO : confirma se faz sentido trocar sempre o jogador
          player = (player === 1) ? 2 : 1
          value = Math.max(value, minimax(nodeChild, alpha, beta, player))
          alpha = Math.max(alpha, value)
        }
        if (beta <= alpha)
          break
        }
    }
}

module.exports = minimax
