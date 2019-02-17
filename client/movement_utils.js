import Phaser from './phaser.min';

export function convertToGameAngle(angle) {
  return Phaser.Math.Angle.Wrap(Math.PI / 2 - angle);
}

export function convertToNormalAngle(angle) {
  return Phaser.Math.Angle.Wrap(Math.PI / 2 - angle);
}

export function haveSameSign(a1, a2) {
  return (a1 >= 0 && a2 >= 0) || (a1 < 0 && a2 < 0);
}

export function distanceToRotate(a1, a2) {
  let distance = 0;
  if (haveSameSign(a1, a2)) {
    distance = Math.abs(a1 - a2);
  } else {
    const possibleDistance = Math.abs(a1) + Math.abs(a2);
    if (possibleDistance > Math.PI) {
      distance = 2 * Math.PI - possibleDistance;
    } else {
      distance = possibleDistance;
    }
  }
  return Phaser.Math.Angle.Wrap(distance);
}

// determins if a1 should rotate clockwise or counterclockwise in order to get to a2
export function directionToRotate(a1, a2) {
  let clockwise = true;

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

export function getVelocityFromAngle(angle) {
  const normalAngle = convertToNormalAngle(angle);
  const xVel = Math.cos(normalAngle);
  const yVel = -Math.sin(normalAngle);

  return { xVel, yVel };
}

export function calculateRotationAngle(initial, destination, currentRotation) {
  const { x, y } = initial;
  const { x: destX, y: destY } = destination;
  const deltaX = destX - x;
  const deltaY = -(destY - y);

  const angle = Math.atan2(deltaY, deltaX);
  const gameAngle = convertToGameAngle(angle);
  const angleChange = gameAngle - currentRotation;

  return Phaser.Math.Angle.Wrap(angleChange);
}

export function smallestDistanceBetweenRectangleVertices(rect1, rect2) {
  if (rect1.width < 0 || rect1.height < 0 || rect2.width < 0 || rect2.height < 0) {
    console('movement_utils : smallestDistanceBetweenRectangleEdges = A rectangle had a negative dimension!');
    // shouldn't happen, can be handled, but i'm lazy
  }

  const topLeft1 = { x: rect1.left, y: rect1.top };
  const topLeft2 = { x: rect2.left, y: rect2.top };

  const topRight1 = { x: rect1.right, y: rect1.top };
  const topRight2 = { x: rect2.right, y: rect2.top };

  const bottomLeft1 = { x: rect1.left, y: rect1.bottom };
  const bottomLeft2 = { x: rect2.left, y: rect2.bottom };

  const bottomRight1 = { x: rect1.right, y: rect1.bottom };
  const bottomRight2 = { x: rect2.right, y: rect2.bottom };

  let smallestDistance = Infinity;

  const changeDistance = (distance) => {
    if (distance < smallestDistance) {
      smallestDistance = distance;
    }
  };

  // There has to be a better way!
  // If you know of one other than just replicating this with a for loop, please tell me.

  if (rect1.right < rect2.left) {
    changeDistance(Phaser.Math.Distance.Between(topRight1.x, topRight1.y, topLeft2.x, topLeft2.y));
    changeDistance(Phaser.Math.Distance.Between(topRight1.x, topRight1.y, bottomLeft2.x, bottomLeft2.y));
    changeDistance(Phaser.Math.Distance.Between(bottomRight1.x, bottomRight1.y, topLeft2.x, topLeft2.y));
    changeDistance(Phaser.Math.Distance.Between(bottomRight1.x, bottomRight1.y, bottomLeft2.x, bottomLeft2.y));
  } else {
    changeDistance(Phaser.Math.Distance.Between(topRight2.x, topRight2.y, topLeft1.x, topLeft1.y));
    changeDistance(Phaser.Math.Distance.Between(topRight2.x, topRight2.y, bottomLeft1.x, bottomLeft1.y));
    changeDistance(Phaser.Math.Distance.Between(bottomRight2.x, bottomRight2.y, topLeft1.x, topLeft1.y));
    changeDistance(Phaser.Math.Distance.Between(bottomRight2.x, bottomRight2.y, bottomLeft1.x, bottomLeft1.y));
  }

  if (rect1.top > rect2.bottom) {
    changeDistance(Phaser.Math.Distance.Between(topLeft1.x, topLeft1.y, bottomLeft2.x, bottomLeft2.y));
    changeDistance(Phaser.Math.Distance.Between(topLeft1.x, topLeft1.y, bottomRight2.x, bottomRight2.y));
    changeDistance(Phaser.Math.Distance.Between(topRight1.x, topRight1.y, bottomLeft2.x, bottomLeft2.y));
    changeDistance(Phaser.Math.Distance.Between(topRight1.x, topRight1.y, bottomRight2.x, bottomRight2.y));
  } else {
    changeDistance(Phaser.Math.Distance.Between(topLeft2.x, topLeft2.y, bottomLeft1.x, bottomLeft1.y));
    changeDistance(Phaser.Math.Distance.Between(topLeft2.x, topLeft2.y, bottomRight1.x, bottomRight1.y));
    changeDistance(Phaser.Math.Distance.Between(topRight2.x, topRight2.y, bottomLeft1.x, bottomLeft1.y));
    changeDistance(Phaser.Math.Distance.Between(topRight2.x, topRight2.y, bottomRight1.x, bottomRight1.y));
  }

  return smallestDistance;
}
