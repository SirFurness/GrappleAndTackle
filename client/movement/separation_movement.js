import Phaser from '../phaser.min';
import * as utils from './movement_utils';

export default function calculateSeparationAngularVelocity(
  object, neighbors, currentRotation, currentBounds,
) {
  const angularVelocityScalar = 900000;
  let angularVelocity = 0;
  const minimumDistance = 100;

  neighbors.forEach((neighbor) => {
    if (neighbor.getData('type') === 'tank' && neighbor !== object) {
      const neighborPosition = {
        x: neighbor.getBounds().centerX,
        y: neighbor.getBounds().centerY,
      };
      const currentPosition = { x: currentBounds.centerX, y: currentBounds.centerY };

      const distanceBetween = Phaser.Math.Distance.Between(
        currentPosition.x, currentPosition.y,
        neighborPosition.x, neighborPosition.y,
      );

      if (distanceBetween < minimumDistance) {
        const rotationAmt = utils.calculateRotationAngle(
          currentPosition, neighborPosition, currentRotation,
        );
        const direction = -Math.sign(rotationAmt);

        angularVelocity += (direction * angularVelocityScalar) / (distanceBetween ** 2);
      }
    }
  });

  return angularVelocity;
}
