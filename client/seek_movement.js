import * as utils from './movement_utils';

export default function calculateSeekAngularVelocity(
  currentRotation, currentPosition, destinationPosition,
) {
  const angularVelocityScalar = 100;
  const destAngle = utils.calculateRotationAngle(currentPosition, destinationPosition);

  let angularVelocity = utils.directionToRotate(currentRotation, destAngle) * angularVelocityScalar;

  const distanceToRotate = utils.distanceToRotate(currentRotation, destAngle);
  if (distanceToRotate < angularVelocityScalar / 60 * Math.PI / 180) {
    angularVelocity = angularVelocity / angularVelocityScalar
        * distanceToRotate * 60 * 180 / Math.PI;
  }

  return angularVelocity;
}
