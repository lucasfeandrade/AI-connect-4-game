//node --inspect --debug-brk debug.js
//node.js v8 inspector chrome

const State = require('./src/node')
const initialState = [
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [2, 2, 2, 0, 2, 2, 2]
]

let newNode = new State(undefined, initialState, 0, 0)
let pieces = newNode.findPieces(2)
console.log(pieces);
