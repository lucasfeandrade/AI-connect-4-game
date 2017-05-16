//node --inspect --debug-brk debug.js
//node.js v8 inspector chrome
const _ = require('lodash')
const Inf = Infinity;
const NegInf = Math.log(0);
const State = require('./src/node')
const alg = require('./src/algorithm')

const initialState = [
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0]
]

const initialState2 = [
  [0, 0, 0, 0, 0, 1, 1],
  [0, 0, 0, 0, 2, 1, 2],
  [0, 0, 2, 1, 2, 2, 1],
  [1, 1, 2, 1, 1, 2, 2],
  [2, 1, 1, 2, 2, 2, 1],
  [2, 1, 2, 1, 2, 1, 2]
]



let inicio = +new Date();
let newNode = new State(undefined, initialState2, 0)
// let maxDepth = Math.round((_.flattenDeep(newNode.ownPieces).length / 2 + _.flattenDeep(newNode.advPieces).length / 2) / 4) + 6
// console.log(maxDepth);
console.log(alg.minimax(newNode, NegInf, Inf, 7));
let fim = +new Date();
console.log(`Tempo de execução: ${(fim-inicio)}ms`);
