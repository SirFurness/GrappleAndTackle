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

export function calculateRotationAngle(initial, destination) {
  const { x, y } = initial;
  const { x: destX, y: destY } = destination;
  const deltaX = destX - x;
  const deltaY = -(destY - y);

  const angle = Math.atan2(deltaY, deltaX);
  return convertToGameAngle(angle);
}
