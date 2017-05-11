const assert = require('chai').assert;
const expect = require('chai').expect;
const State = require('../src/node')


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
      let newNode = new State(undefined, initialState, 0, 0)
      newNode.createChild(2, 1)
      let newChild = newNode.children.shift()
      assert.equal(typeof newNode, typeof newChild)
    });

    it('should put player one at third column', function() {
      let newNode = new State(undefined, initialState, 0, 0)
      newNode.createChild(2, 1)
      let newChild = newNode.children.shift()
      assert.deepEqual(finalState, newChild.state)
    });
  });

  describe('findPieces', function() {
    const initialState = [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [2, 2, 2, 0, 2, 2, 2]
    ]

    it('should find a 3-piece', function() {
      let newNode = new State(undefined, initialState, 0, 0)
      let pieces = newNode.findPieces(2)
      console.log(pieces);
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

});
