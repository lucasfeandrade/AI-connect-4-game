//node --inspect --debug-brk debug.js
//node.js v8 inspector chrome
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
let newNode = new State(undefined, initialState, 0)
console.log(alg.minimax(newNode, NegInf, Inf));
let fim = +new Date();
console.log(`Tempo de execução: ${(fim-inicio)}ms`);
