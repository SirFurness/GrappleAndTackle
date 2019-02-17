import * as utils from './movement_utils';

export default function areNearbyAtDestination(object, neighbors) {
  const minimumDistance = 100;

  for (let i = 0; i < neighbors.length; i += 1) {
    const neighbor = neighbors[i];
    if (neighbor.getData('type') === 'tank' && neighbor !== object && neighbor.movement.isMoving === false) {
      const distanceBetween = utils.distanceBetweenBounds(object.getBounds(), neighbor.getBounds());

      if (distanceBetween < minimumDistance) {
        if (neighbor.destination === object.destination) {
          return true;
        }
      }
    }
  }

  return false;
}
