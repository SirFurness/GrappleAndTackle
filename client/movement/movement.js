import Phaser from '../phaser.min';
import * as utils from './movement_utils';
import calculateSeekAngularVelocity from './seek_movement';
import calculateSeparationAngularVelocity from './separation_movement';
import calculateAlignmentAngularVelocity from './alignment_movement';
import calculateCohesionAngularVelocity from './cohesion_movement';
import areNearbyAtDestination from './nearby_destination';

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
      const separationAngularVelocity = calculateSeparationAngularVelocity(
        this.object, this.scene.children.getChildren(),
      );
      const alignmentAngularVelocity = calculateAlignmentAngularVelocity(
        this.object, this.scene.children.getChildren(),
      );
      const cohesionAngularVelocity = calculateCohesionAngularVelocity(
        this.object, this.scene.children.getChildren(),
      );
      // TODO loop through neighbors once, calculate all neighbor based things on that go
      this.object.setAngularVelocity(
        seekAngularVelocity + separationAngularVelocity
        + alignmentAngularVelocity + cohesionAngularVelocity,
      );

      this.setVelocityBasedOnTankAngle();

      if (this.isAtDestination()
        || this.isLaterallyAtDestination()
        || areNearbyAtDestination(this.object, this.scene.children.getChildren())) {
        this.stopMoving();
      }
    }
  }

  isAtDestination() {
    const isBarrelNear = utils.fuzzyAtLocation(
      this.getBarrelLocation(), this.destination, this.positionTolerance,
    );
    const { centerX, centerY } = this.object.getBounds();
    const isCenterNear = utils.fuzzyAtLocation(
      { x: centerX, y: centerY }, this.destination, 2 * this.positionTolerance,
    );
    return isBarrelNear || isCenterNear;
  }

  isLaterallyAtDestination() {
    const minimumDistance = 100;
    if (Phaser.Math.Distance.Between(
      this.destX, this.destY,
      this.object.getBounds().centerX, this.object.getBounds().centerY,
    )
      > minimumDistance) {
      return false;
    }
    const angle = utils.convertToNormalAngle(this.object.rotation);

    const deltaX = this.destX - this.object.getBounds().centerX;

    const perpendicular = -Math.cos(angle) / Math.sin(angle) * deltaX + this.object.getBounds().centerY;
    const upper = perpendicular + this.object.getBounds().width / 2;
    const lower = perpendicular - this.object.getBounds().width / 2;

    if (this.destY <= upper && this.destY >= lower) {
      return true;
    }

    return false;
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
