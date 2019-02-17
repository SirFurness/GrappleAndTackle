import Phaser from './phaser.min';
import * as utils from './movement_utils';
import calculateSeekAngularVelocity from './seek_movement';
import calculateSeparationAngularVelocity from './separation_movement';

export default class Movement {
  constructor(scene, gameObject) {
    this.scene = scene;
    this.object = gameObject;

    this.isMoving = false;

    this.xVelMagnitude = 100;
    this.yVelMagnitude = 100;
    this.positionTolerance = 2.0;

    this.angularVelocity = 100;
    this.angularTolerance = 0.01;
  }

  moveTo(destX, destY) {
    this.isMoving = true;
    this.destination = { x: destX, y: destY };
    this.destX = destX;
    this.destY = destY;


    if (this.isDestinationInsideTank()) {
      this.stopMoving();
    }
  }

  stopMoving() {
    this.isMoving = false;
    this.object.setAcceleration(0, 0);
    this.object.setAngularAcceleration(0, 0);
    this.object.setVelocity(0, 0);
    this.object.setAngularVelocity(0);
  }

  update() {
    if (this.isMoving) {
      const bounds = this.object.getBounds();
      const seekAngularVelocity = calculateSeekAngularVelocity(
        this.object.rotation, { x: bounds.centerX, y: bounds.centerY }, this.destination,
      );
      // const separationAngularVelocity = calculateSeparationAngularVelocity(
      //  this.object, this.scene.children.getChildren(), this.object.rotation, this.object.getBounds(),
      // );

      this.object.setAngularVelocity(seekAngularVelocity);

      this.setVelocityBasedOnTankAngle();

      if (this.isAtDestination()) {
        this.stopMoving();
      }
    }
  }

  isAtDestination() {
    const { x, y } = this.getBarrelLocation();
    return (Math.abs(x - this.destX) < this.positionTolerance
      && Math.abs(y - this.destY) < this.positionTolerance);
  }


  setVelocityBasedOnTankAngle() {
    const { xVel, yVel } = utils.getVelocityFromAngle(this.object.rotation);
    this.object.setVelocity(xVel * this.xVelMagnitude, yVel * this.yVelMagnitude);
  }

  isDestinationInsideTank() {
    return (Phaser.Geom.Rectangle.ContainsPoint(this.object.getBounds(),
      new Phaser.Geom.Point(this.destX, this.destY)));
  }

  getBarrelLocation() {
    const bounds = this.object.getBounds();
    const normalRotationAngle = utils.convertToNormalAngle(this.object.rotation);
    const x = bounds.width / 2 * Math.cos(normalRotationAngle) + bounds.centerX;
    const y = -bounds.height / 2 * Math.sin(normalRotationAngle) + bounds.centerY;

    return { x, y };
  }
}
