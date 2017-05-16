const prompt = require('prompt')
const Algorithm = require('./algorithm')
const State = require('./node')

const _ = require('lodash')
const schema = {
  properties: {
    position: {
      type: 'integer',
      message: 'Position should be a number between 1 and 7',
      required: true,
      minimum: 1,
      maximum: 7,
      before: function(value) { return value - 1; }
    }
  }
}

const NegInfinity = Math.log(0);
const HEIGHT = 6
const maxDepth = 2
const initialState = [
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0]
]

console.log(`This is the connect 4 board, try to defeat Guintzel (The Digital Boss): \n`)
printState(initialState)
prompt.start()
promptPlayer(initialState)

function promptPlayer(state) {
  prompt.get(schema, (err, result) => {
    if (err) throw err
    let playerState = createState(state, result.position, 2)
    if(!playerState) {
      console.log(`This is an invalid position, choose other position`)
      return promptPlayer(state)
    }
    console.log(`This was your move: \n`)
    printState(playerState)
    let playerNode = new State(undefined, playerState, 0)
    if (playerNode.isGameOver()) {
      console.log(`Congratulationzzzzzzzz !!!!!
                   The Guintzel Boss has been defeated !!!
                   Prepare yourself for the next boss :
                    Luiz Santos`)
      return
    }
    let computerPosition = Algorithm.minimax(playerNode, NegInfinity, Infinity, maxDepth).movePos
    let computerState = createState(playerState, computerPosition, 1)
    let node = new State(undefined, computerState, 0)
    setTimeout(() => {
      console.log(`This is Ms Guintzel move: \n`)
      printState(computerState)
      if (node.isGameOver()) {
        console.log(`You have lost !!!
                     Guintzel placed you at his Death Pipeline!!`)
         return
       }
      promptPlayer(computerState);
    }, 1000)
  })
}


function isColumnFull(state, col) {
  return state[0][col] !== 0;
}

function createState(state, position, player) {
  if (isColumnFull(state, position)) return undefined
  for (let i = 0; i < HEIGHT; i++) {
    let newState = _.cloneDeep(state)
    if (newState[i][position] !== 0) {
      newState[i - 1][position] = player
      return newState
    }
    if (i === HEIGHT - 1) {
      newState[HEIGHT - 1][position] = player
      return newState
    }
  }
}

function printState(state) {
  for (let line of state) {
    let string = '';
    for (let dot of line) {
      if (dot === 0) {
        string += '\x1b[37m_ '
      } else {
        string += (dot === 1) ? '\x1b[31mX ' : '\x1b[36mO '
      }
    }
    console.log(string)
  }
  console.log('1 2 3 4 5 6 7');
}
