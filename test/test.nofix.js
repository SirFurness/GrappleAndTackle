const assert = require('assert')
const movement_utils = require('./movement_utils');
const Phaser = require('./phaser.min');

function fuzzyEqual(a, b, tolerance) {
  return Math.abs(a-b) < tolerance
}

describe('calculateRotationAngle', function() {
  it('should give proper rotatation', function() {
    let initial = {x: 100, y: 100}
    let destination = {x: 200, y: 200}
    let currentRotation = 0;

    let expected = 3/4*Math.PI
    const tolerance = 0.0001
    
    let actual = movement_utils.calculateRotationAngle(initial, destination, currentRotation)
    assert(fuzzyEqual(actual, expected, tolerance))

    destination = {x: 0, y: 0}
    expected = -Math.PI/4

    actual = movement_utils.calculateRotationAngle(initial, destination, currentRotation)
    assert(fuzzyEqual(actual, expected, tolerance))
  })
})
