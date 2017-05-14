
// Player 1 = Human
// Player 2 = Computer
function minimax(node, alpha, beta, player) {
  if node.isLeaf(node)
    return node.findUtility()
    // Creating all child
    if (player === 1) {
      let value = 1000000000
      for (let position = 0; position < 6; position++) {
        node.createChild(position, player)
        value = Math.min(value, minimax(CHILD, alpha, beta, player))
        beta = Math.min(beta, value)
        if (beta <= alpha)
          break
      }
    }
    else {
      let value = 0
      for (let position = 0; position < 6; position++) {
        node.createChild(position, player)
        // Estava pensando em fazer assim, mas para funcionar bem acredito q a
        // funcao createChild deve retornar o filho criado para substituir no CHILD
        value = Math.max(value, minimax(CHILD, alpha, beta, player))
        alpha = Math.max(alpha, value)
        if (beta <= alpha)
          break
        }
    }
}
