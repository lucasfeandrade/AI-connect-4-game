const assert = require('chai').assert;
const expect = require('chai').expect;
const State = require('../src/node')
const minimax = require('../src/algorithm')

describe('Testing Node Class', function() {
  'use strict'

  describe('createChild', function() {

    const initialState = [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 2, 0, 0, 0, 0]
    ]
    const finalState = [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0, 0, 0],
      [0, 0, 2, 0, 0, 0, 0]
    ]

    it('should create a child', function() {
      let newNode = new State(undefined, initialState, 0, 0, 0)
      let newChild = newNode.createChild(2, 1)
      assert.equal(typeof newNode, typeof newChild)
    });

    it('should put player one at third column', function() {
      let newNode = new State(undefined, initialState, 0, 0, 0)
      let newChild = newNode.createChild(2, 1)
      assert.deepEqual(finalState, newChild.state)
    });
  });

  describe('findPieces', function() {
    const initialState = [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 2, 0, 0, 0, 0],
      [0, 0, 2, 0, 0, 0, 0],
      [0, 0, 2, 0, 0, 0, 0],
      [2, 2, 2, 0, 2, 2, 2]
    ]

    it('should find a 3-piece', function() {
      let newNode = new State(undefined, initialState, 0, 0, 2)
      let pieces = newNode.findPieces(2)
      let expPieces = [
        [
          [0, 5],
          [1, 5],
          [2, 5],
        ],
        [
          [4, 5],
          [5, 5],
          [6, 5],
        ]
      ]
      // assert.sameDeepMembers(expPieces[1], pieces[1])
      expect(pieces[0]).to.deep.have.members(expPieces[0])
      expect(pieces[1]).to.deep.have.members(expPieces[1])
    });
  });

  describe('findUtility', function() {
    const initialState = [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 2, 1, 0, 0, 0, 0],
      [1, 0, 1, 0, 1, 1, 1]
    ]

    let newNode = new State(undefined, initialState, 0, 0, 1)
    let value = newNode.findUtility()
    it('return value expected value for one vertical pair and one horizontal triple', function() {
      assert.equal(value, 420 + 8820)
    });
  });

  describe('isColumnFull', function() {
    const initialState = [
      [2, 2, 1, 2, 1, 2, 1],
      [1, 2, 1, 1, 1, 2, 2],
      [2, 2, 1, 2, 1, 2, 2],
      [2, 2, 1, 1, 1, 2, 2],
      [2, 1, 2, 2, 2, 2, 2],
      [2, 1, 2, 1, 2, 1, 2]
    ]
    const secondState = [
      [2, 2, 0, 2, 1, 2, 1],
      [1, 2, 1, 1, 1, 2, 2],
      [2, 2, 1, 2, 1, 2, 2],
      [2, 2, 1, 1, 1, 2, 2],
      [2, 1, 2, 2, 2, 2, 2],
      [2, 1, 2, 1, 2, 1, 2]
    ]

    let firstNode = new State(undefined, initialState, 0, 0, 2)
    let secondNode = new State(undefined, secondState, 0, 0, 2)

    it('should return true for all columns', function() {
      for (let position = 0; position < 6; position++) {
        assert.equal(firstNode.isColumnFull(position), true)
      }
    });
    it('should return false for column 3', function() {
      assert.equal(secondNode.isColumnFull(2), false)
    });
  });

  describe('isBoardFull', function() {
    const initialState = [
      [2, 2, 1, 2, 1, 2, 1],
      [1, 2, 1, 1, 1, 2, 2],
      [2, 2, 1, 2, 1, 2, 2],
      [2, 2, 1, 1, 1, 2, 2],
      [2, 1, 2, 2, 2, 2, 2],
      [2, 1, 2, 1, 2, 1, 2]
    ]
    const secondState = [
      [2, 2, 0, 2, 1, 2, 1],
      [1, 2, 1, 1, 1, 2, 2],
      [2, 2, 1, 2, 1, 2, 2],
      [2, 2, 1, 1, 1, 2, 2],
      [2, 1, 2, 2, 2, 2, 2],
      [2, 1, 2, 1, 2, 1, 2]
    ]

    let firstNode = new State(undefined, initialState, 0, 0, 2)
    let secondNode = new State(undefined, secondState, 0, 0, 2)

    it('should return true', function() {
      assert.equal(firstNode.isBoardFull(), true)
    });
    it('should return false', function() {
      assert.equal(secondNode.isBoardFull(), false)
    });
  });

  describe('isGameOver', function() {
    const startState = [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0]
    ]
    const quadraState = [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [2, 0, 0, 0, 0, 0, 0],
      [2, 0, 0, 0, 0, 0, 0],
      [2, 0, 0, 2, 1, 0, 1],
      [2, 0, 0, 1, 1, 2, 2]
    ]
    const fullState = [
      [1, 2, 2, 1, 1, 2, 1],
      [2, 1, 1, 1, 2, 2, 2],
      [2, 1, 2, 2, 1, 2, 1],
      [2, 1, 1, 2, 1, 1, 2],
      [1, 2, 1, 2, 2, 1, 2],
      [2, 2, 2, 1, 2, 1, 1]
    ]
    const notFinishedState = [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [2, 0, 0, 0, 0, 0, 0],
      [2, 0, 0, 2, 1, 0, 1],
      [2, 0, 0, 1, 1, 2, 2]
    ]

    let startNode = new State(undefined, startState, 0, 0, 0)
    let firstNode = new State(undefined, quadraState, 0, 0, 0)
    let notFinishedNode = new State(undefined, notFinishedState, 0, 0, 0)
    let fullNode = new State(undefined, fullState, 0, 0, 0)

    it('should return false (empty board)', function() {
      assert.equal(startNode.isGameOver(), false)
    });
    it('should return true (it has a quadra and is not full)', function() {
      assert.equal(firstNode.isGameOver(), true)
    });
    it('should return false (there is no quadra and is not full)', function() {
      assert.equal(notFinishedNode.isGameOver(), false)
    });
    it('should return true (there is no quadra and but it is full)', function() {
      assert.equal(fullNode.isGameOver(), true)
    });
  });

  // describe('minimax', function() {
  //   const startState = [
  //     [0, 0, 0, 0, 0, 0, 0],
  //     [0, 0, 0, 0, 0, 0, 0],
  //     [0, 0, 0, 0, 0, 0, 0],
  //     [0, 0, 0, 0, 0, 0, 0],
  //     [0, 0, 0, 0, 0, 0, 0],
  //     [0, 0, 0, 1, 0, 0, 0]
  //   ]
  //   const finalState = [
  //     [0, 0, 0, 0, 0, 0, 0],
  //     [0, 0, 0, 0, 0, 0, 0],
  //     [0, 0, 0, 0, 0, 0, 0],
  //     [0, 0, 0, 0, 0, 0, 0],
  //     [0, 0, 0, 2, 0, 0, 0],
  //     [0, 0, 0, 1, 0, 0, 0]
  //   ]
  //   let startNode = new State(undefined, startState, 0, 0, 0)
  //   let children = startNode.createChild(3, 2)
  //   //TODO precisa criar um teste que faca sentido
  //   it('should do something', function() {
  //     assert.equal(minimax(startNode, 100000, 1, 2), true)
  //   });
  // });

});
