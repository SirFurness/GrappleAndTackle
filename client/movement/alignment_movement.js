import * as utils from './movement_utils';

export default function calculateAlignmentAngularVelocity(
  object, neighbors,
) {
  const angularVelocityScalar = 200;
  let angularVelocity = 0;
  const minimumDistance = 200;

  let totalRotation = 0;
  let numberOfNeighbors = 0;

  neighbors.forEach((neighbor) => {
    if (neighbor.getData('type') === 'tank' && neighbor !== object && neighbor.movement.isMoving === true) {
      const distanceBetween = utils.distanceBetweenBounds(neighbor.getBounds(), object.getBounds());

      if (distanceBetween < minimumDistance) {
        numberOfNeighbors += 1;
        totalRotation += neighbor.rotation;
      }
    }
  });

  if (numberOfNeighbors > 0) {
    const averageRotation = totalRotation / numberOfNeighbors;
    const rotationDiff = averageRotation - object.rotation;
    angularVelocity = rotationDiff * angularVelocityScalar;
  }

  return angularVelocity;
}
