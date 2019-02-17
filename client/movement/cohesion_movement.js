import * as utils from './movement_utils';
import calculateSeekAngularVelocity from './seek_movement';

export default function calculateCohesionAngularVelocity(
  object, neighbors,
) {
  const angularVelocityScalar = 0.5;
  let angularVelocity = 0;
  const minimumDistance = 200;

  let totalX = 0;
  let totalY = 0;
  let numberOfNeighbors = 0;

  neighbors.forEach((neighbor) => {
    if (neighbor.getData('type') === 'tank' && neighbor !== object && neighbor.movement.isMoving === true) {
      const distanceBetween = utils.distanceBetweenBounds(neighbor.getBounds(), object.getBounds());

      if (distanceBetween < minimumDistance) {
        numberOfNeighbors += 1;
        totalX += neighbor.getBounds().centerX;
        totalY += neighbor.getBounds().centerY;
      }
    }
  });

  if (numberOfNeighbors > 0) {
    const averageX = totalX / numberOfNeighbors;
    const averageY = totalY / numberOfNeighbors;

    const averagePosition = { x: averageX, y: averageY };

    const currentPosition = { x: object.getBounds().centerX, y: object.getBounds().centerY };
    angularVelocity = calculateSeekAngularVelocity(
      object.rotation, currentPosition, averagePosition,
    ) * angularVelocityScalar;
  }

  return angularVelocity;
}
