const assert = require('assert');
const Node = require('../src/node')


describe('Testing Node Class', function() {

  describe('createChild', function() {
    const initialState = [
      [0 , 0 ,0 , 0, 0, 0, 0],
      [0 , 0 ,0 , 0, 0, 0, 0],
      [0 , 0 ,0 , 0, 0, 0, 0],
      [0 , 0 ,0 , 0, 0, 0, 0],
      [0 , 0 ,0 , 0, 0, 0, 0],
      [0 , 0 ,2 , 0, 0, 0, 0],
      [0 , 0 ,2 , 0, 0, 0, 0]
    ]
    const finalState = [
      [0 , 0 ,0 , 0, 0, 0, 0],
      [0 , 0 ,0 , 0, 0, 0, 0],
      [0 , 0 ,0 , 0, 0, 0, 0],
      [0 , 0 ,0 , 0, 0, 0, 0],
      [0 , 0 ,1 , 0, 0, 0, 0],
      [0 , 0 ,2 , 0, 0, 0, 0],
      [0 , 0 ,2 , 0, 0, 0, 0]
    ]

    it('should create a child', function() {
          let newNode = new Node(null, initialState, 0, 0)
          newNode.createChild(3, 1)
          let newChild = newNode.children.shift()
          assert.equal(typeof newChild, typeof newNode)
    });

    it('should put player one at third column', function() {
        let newNode = new Node(null, initialState, 0, 0)
        newNode.createChild(3, 1)
        let newChild = newNode.children.shift()
        assert.equal(finalState, newChild.state)
    });


  });
});
