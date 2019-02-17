import * as utils from './movement_utils';

export default function calculateSeparationAngularVelocity(
  object, neighbors, currentRotation, currentBounds,
) {
  const angularVelocityScalar = 100;
  let angularVelocity = 0;
  const minimumDistance = 100;

  neighbors.forEach((neighbor) => {
    if (neighbor !== object) {
      try {
        const distanceBetween = utils.smallestDistanceBetweenRectangleVertices(
          neighbor.getBounds(), currentBounds,
        );

        if (distanceBetween < minimumDistance) {
          const destAngle = Phaser.Math.Angle.Wrap(
            utils.calculateRotationAngle(neighbor.getBounds(), currentBounds),
          );

          console.log(destAngle);

          const direction = utils.directionToRotate(currentRotation, destAngle);

          angularVelocity += direction * angularVelocityScalar;// * (distanceBetween ** 2);
        }
      } catch (err) {
      // Object doesn't have getBounds()
      }
    }
  });
  return angularVelocity;
}
