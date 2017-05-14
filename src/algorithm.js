

function minimax(node, alpha, beta, player) {
  // if node.isLeaf(node)
    // return node.findUtility()

  // Creating all child
  for (let position = 0; position < 6; position++) {
    node.createChild(position, player)

  }


}
