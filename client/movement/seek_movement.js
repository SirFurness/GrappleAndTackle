import * as utils from './movement_utils';

export default function calculateSeekAngularVelocity(
  currentRotation, currentPosition, destinationPosition,
) {
  const angularVelocityScalar = 100;
  const rotationAmt = utils.calculateRotationAngle(
    currentPosition, destinationPosition, currentRotation,
  );
  const directionToRotate = rotationAmt < 0 ? -1 : 1;

  let angularVelocity = directionToRotate * angularVelocityScalar;

  if (Math.abs(rotationAmt) < angularVelocityScalar / 60 * Math.PI / 180) {
    angularVelocity = rotationAmt * 60 * 180 / Math.PI;
  }

  return angularVelocity;
}
