"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convertToGameAngle = convertToGameAngle;
exports.convertToNormalAngle = convertToNormalAngle;
exports.haveSameSign = haveSameSign;
exports.distanceToRotate = distanceToRotate;
exports.directionToRotate = directionToRotate;
exports.getVelocityFromAngle = getVelocityFromAngle;
exports.calculateRotationAngle = calculateRotationAngle;
exports.smallestDistanceBetweenRectangleVertices = smallestDistanceBetweenRectangleVertices;

var _phaser = _interopRequireDefault(require("../phaser.min"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function convertToGameAngle(angle) {
  return _phaser.default.Math.Angle.Wrap(Math.PI / 2 - angle);
}

function convertToNormalAngle(angle) {
  return _phaser.default.Math.Angle.Wrap(Math.PI / 2 - angle);
}

function haveSameSign(a1, a2) {
  return a1 >= 0 && a2 >= 0 || a1 < 0 && a2 < 0;
}

function distanceToRotate(a1, a2) {
  var distance = 0;

  if (haveSameSign(a1, a2)) {
    distance = Math.abs(a1 - a2);
  } else {
    var possibleDistance = Math.abs(a1) + Math.abs(a2);

    if (possibleDistance > Math.PI) {
      distance = 2 * Math.PI - possibleDistance;
    } else {
      distance = possibleDistance;
    }
  }

  return _phaser.default.Math.Angle.Wrap(distance);
} // determins if a1 should rotate clockwise or counterclockwise in order to get to a2


function directionToRotate(a1, a2) {
  var clockwise = true;

  if (haveSameSign(a1, a2)) {
    if (a1 > a2) {
      clockwise = false;
    }
  } else if (a1 >= 0) {
    if (Math.abs(a2) + a1 < Math.PI) {
      clockwise = false;
    }
  } else if (Math.abs(a1) + a2 > Math.PI) {
    clockwise = false;
  }

  return clockwise ? 1 : -1;
}

function getVelocityFromAngle(angle) {
  var normalAngle = convertToNormalAngle(angle);
  var xVel = Math.cos(normalAngle);
  var yVel = -Math.sin(normalAngle);
  return {
    xVel: xVel,
    yVel: yVel
  };
}

function calculateRotationAngle(initial, destination, currentRotation) {
  var x = initial.x,
      y = initial.y;
  var destX = destination.x,
      destY = destination.y;
  var deltaX = destX - x;
  var deltaY = -(destY - y);
  var angle = Math.atan2(deltaY, deltaX);
  var gameAngle = convertToGameAngle(angle);
  var angleChange = gameAngle - currentRotation;
  return _phaser.default.Math.Angle.Wrap(angleChange);
}

function smallestDistanceBetweenRectangleVertices(rect1, rect2) {
  if (rect1.width < 0 || rect1.height < 0 || rect2.width < 0 || rect2.height < 0) {
    console('movement_utils : smallestDistanceBetweenRectangleEdges = A rectangle had a negative dimension!'); // shouldn't happen, can be handled, but i'm lazy
  }

  var topLeft1 = {
    x: rect1.left,
    y: rect1.top
  };
  var topLeft2 = {
    x: rect2.left,
    y: rect2.top
  };
  var topRight1 = {
    x: rect1.right,
    y: rect1.top
  };
  var topRight2 = {
    x: rect2.right,
    y: rect2.top
  };
  var bottomLeft1 = {
    x: rect1.left,
    y: rect1.bottom
  };
  var bottomLeft2 = {
    x: rect2.left,
    y: rect2.bottom
  };
  var bottomRight1 = {
    x: rect1.right,
    y: rect1.bottom
  };
  var bottomRight2 = {
    x: rect2.right,
    y: rect2.bottom
  };
  var smallestDistance = Infinity;

  var changeDistance = function changeDistance(distance) {
    if (distance < smallestDistance) {
      smallestDistance = distance;
    }
  }; // There has to be a better way!
  // If you know of one other than just replicating this with a for loop, please tell me.


  if (rect1.right < rect2.left) {
    changeDistance(_phaser.default.Math.Distance.Between(topRight1.x, topRight1.y, topLeft2.x, topLeft2.y));
    changeDistance(_phaser.default.Math.Distance.Between(topRight1.x, topRight1.y, bottomLeft2.x, bottomLeft2.y));
    changeDistance(_phaser.default.Math.Distance.Between(bottomRight1.x, bottomRight1.y, topLeft2.x, topLeft2.y));
    changeDistance(_phaser.default.Math.Distance.Between(bottomRight1.x, bottomRight1.y, bottomLeft2.x, bottomLeft2.y));
  } else {
    changeDistance(_phaser.default.Math.Distance.Between(topRight2.x, topRight2.y, topLeft1.x, topLeft1.y));
    changeDistance(_phaser.default.Math.Distance.Between(topRight2.x, topRight2.y, bottomLeft1.x, bottomLeft1.y));
    changeDistance(_phaser.default.Math.Distance.Between(bottomRight2.x, bottomRight2.y, topLeft1.x, topLeft1.y));
    changeDistance(_phaser.default.Math.Distance.Between(bottomRight2.x, bottomRight2.y, bottomLeft1.x, bottomLeft1.y));
  }

  if (rect1.top > rect2.bottom) {
    changeDistance(_phaser.default.Math.Distance.Between(topLeft1.x, topLeft1.y, bottomLeft2.x, bottomLeft2.y));
    changeDistance(_phaser.default.Math.Distance.Between(topLeft1.x, topLeft1.y, bottomRight2.x, bottomRight2.y));
    changeDistance(_phaser.default.Math.Distance.Between(topRight1.x, topRight1.y, bottomLeft2.x, bottomLeft2.y));
    changeDistance(_phaser.default.Math.Distance.Between(topRight1.x, topRight1.y, bottomRight2.x, bottomRight2.y));
  } else {
    changeDistance(_phaser.default.Math.Distance.Between(topLeft2.x, topLeft2.y, bottomLeft1.x, bottomLeft1.y));
    changeDistance(_phaser.default.Math.Distance.Between(topLeft2.x, topLeft2.y, bottomRight1.x, bottomRight1.y));
    changeDistance(_phaser.default.Math.Distance.Between(topRight2.x, topRight2.y, bottomLeft1.x, bottomLeft1.y));
    changeDistance(_phaser.default.Math.Distance.Between(topRight2.x, topRight2.y, bottomRight1.x, bottomRight1.y));
  }

  return smallestDistance;
}
