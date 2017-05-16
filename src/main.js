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

console.log(`This is the connect 4 board: `)
showBoard(initialState)
let node = new State(undefined, initialState, 0)
let playerNode
let newState
let computerPosition
let notPrompting = true
prompt.start()

while (!node.isGameOver() && notPrompting) {
  notPrompting = false
  prompt.get(schema, (err, result) => {
    if (err) throw err
      playerState = createState(initialState, result.position, 1)
      showBoard(playerState)
      playerNode = new State(undefined, playerState, 0)
      computerPosition = Algorithm.minimax(playerNode, NegInfinity, Infinity, maxDepth)
      computerState = createState(playerState, computerPosition, 2)
      node = new State(undefined, computerState, 0)
      notPrompting = true
  })
}


function isColumnFull(state, col) {
  return state[0][col] !== 0;
}

function showBoard(state) {
  for (var i = 0; i < state.length; i++) {
    console.log(JSON.stringify(state[i]))
  }
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
