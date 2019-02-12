import * as utils from './movement_utils';

export default class Movement {
  constructor(scene, gameObject) {
    this.scene = scene;
    this.object = gameObject;

    this.isMoving = false;

    this.xVelMagnitude = 100;
    this.yVelMagnitude = 100;
    this.positionTolerance = 5.0;

    this.angularVelocity = 100;
    this.angularTolerance = 0.01;
  }

  moveTo(destX, destY) {
    this.isMoving = true;
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
      const seekAngularVelocity = this.calculateSeekAngularVelocity();
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

  calculateSeekAngularVelocity() {
    const destAngle = this.calculateRotationAngle();

    let angularVelocity = utils.directionToRotate(this.object.rotation, destAngle)
      * this.angularVelocity;

    const distanceToRotate = utils.distanceToRotate(this.object.rotation, destAngle);
    if (distanceToRotate < this.angularVelocity / 60 * Math.PI / 180) {
      angularVelocity = 0;
      this.object.rotation = destAngle;
    }

    return angularVelocity;
  }

  setVelocityBasedOnTankAngle() {
    const { xVel, yVel } = utils.getVelocityFromAngle(this.object.rotation);
    this.object.setVelocity(xVel * this.xVelMagnitude, yVel * this.yVelMagnitude);
  }

  isDestinationInsideTank() {
    return (Phaser.Geom.Rectangle.ContainsPoint(this.object.getBounds(),
      new Phaser.Geom.Point(this.destX, this.destY)));
  }

  calculateRotationAngle() {
    const { x, y } = this.getBarrelLocation();
    const deltaX = this.destX - x;
    const deltaY = -(this.destY - y);

    const angle = Math.atan2(deltaY, deltaX);
    return utils.convertToGameAngle(angle);
  }

  getBarrelLocation() {
    const bounds = this.object.getBounds();
    const normalRotationAngle = utils.convertToNormalAngle(this.object.rotation);
    const x = bounds.width / 2 * Math.cos(normalRotationAngle) + bounds.centerX;
    const y = -bounds.height / 2 * Math.sin(normalRotationAngle) + bounds.centerY;

    return { x, y };
  }
}
