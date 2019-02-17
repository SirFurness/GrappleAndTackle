import * as utils from './movement_utils';

export default function calculateSeparationAngularVelocity(
  object, neighbors,
) {
  const angularVelocityScalar = 900000;
  let angularVelocity = 0;
  const minimumDistance = 100;

  neighbors.forEach((neighbor) => {
    if (neighbor.getData('type') === 'tank' && neighbor !== object && neighbor.movement.isMoving === true) {
      const neighborPosition = {
        x: neighbor.getBounds().centerX,
        y: neighbor.getBounds().centerY,
      };
      const currentPosition = { x: object.getBounds().centerX, y: object.getBounds().centerY };

      const distanceBetween = utils.distanceBetweenBounds(neighbor.getBounds(), object.getBounds());

      if (distanceBetween < minimumDistance) {
        const rotationAmt = utils.calculateRotationAngle(
          currentPosition, neighborPosition, object.rotation,
        );
        const direction = -Math.sign(rotationAmt);

        angularVelocity += (direction * angularVelocityScalar) / (distanceBetween ** 2);
      }
    }
  });

  return angularVelocity;
}
