import * as utils from './movement_utils';

export default function calculateSeekAngularVelocity(
  currentRotation, currentPosition, destinationPosition,
) {
  const angularVelocityScalar = 100;
  const destAngle = utils.calculateRotationAngle(currentPosition, destinationPosition);

  const directionToRotate = utils.directionToRotate(currentRotation, destAngle);
  let angularVelocity = directionToRotate * angularVelocityScalar;

  const distanceToRotate = utils.distanceToRotate(currentRotation, destAngle);
  if (distanceToRotate < angularVelocityScalar / 60 * Math.PI / 180) {
    angularVelocity = directionToRotate * distanceToRotate * 60 * 180 / Math.PI;
  }

  return angularVelocity;
}
