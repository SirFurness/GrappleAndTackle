function haveSameSign(a1, a2) {
  return (a1 >= 0 && a2 >= 0) || (a1 < 0 && a2 < 0);
}

// determins if a1 should rotate clockwise or counterclockwise in order to get to a2
function directionToRotate(a1, a2) {
  let clockwise = true;

  if (haveSameSign(a1, a2)) {
    if (a1 > a2) {
      clockwise = false;
    }
  } else if (a1 >= 0) {
    if (Math.abs(a2) + a1 < Math.PI) {
      clockwise = false;
    }
  } else if (Math.abs(a1) + a2 > Math.PI) {
    clockwise = false;
  }
  return clockwise ? 1 : -1;
}

// Takes an angle where x-axis is between quadrants I and IV
// to equivalent angle for x-axis between quadrants I and II
function convertToGameAngle(angle) {
  if (angle <= -Math.PI / 2) {
    return -(3 * Math.PI / 2 + angle);
  }
  return Math.PI / 2 - angle;
}

export default class Movement {
  constructor(scene, gameObject) {
    this.scene = scene;
    this.object = gameObject;

    this.isMoving = false;
    this.isRotated = false;
    this.isAtDestination = false;
    this.hasCalculatedRotationAngle = false;
    this.hasCalculatedVelocity = false;

    this.defaultVelX = 1;
    this.defaultVelY = 1;
    this.velX = this.defaultVelX;
    this.velY = this.defaultVelY;

    this.rotationAngle = 0;
    this.angularVelocity = 0.03;
  }

  resetVariables() {
    this.isMoving = false;
    this.isRotated = false;
    this.isAtDestination = false;
    this.hasCalculatedRotationAngle = false;
    this.hasCalculatedVelocity = false;
  }


  moveTo(destX, destY) {
    this.resetVariables();

    this.isMoving = true;
    this.destX = destX;
    this.destY = destY;

    const { x, y } = this.object.getCenter();
    this.deltaX = this.destX - x;
    this.deltaY = -(this.destY - y);


    if (this.isDestinationInsideTank()) {
      this.isMoving = false;
    }
  }

  update() {
    if (this.isMoving) {
      if (!this.isRotated) {
        this.rotate();
      } else if (!this.isAtDestination) {
        this.moveToDestination();
      }
    }
  }

  moveToDestination() {
    if (!this.hasCalculatedVelocity) {
      this.calculateVelocity();
      this.hasCalculatedVelocity = true;
    }
    if (Math.abs(this.object.x - this.destX) < Math.abs(this.velX)
      && Math.abs(this.object.y - this.destY) < Math.abs(this.velY)) {
      this.isAtDestination = true;
    } else {
      this.object.setPosition(this.object.x + this.velX, this.object.y + this.velY);
    }
  }

  calculateVelocity() {
    this.velX = this.defaultVelX * Math.cos(this.rotationAngle);
    this.velY = -this.defaultVelY * Math.sin(this.rotationAngle);
  }

  rotate() {
    if (!this.hasCalculatedRotationAngle) {
      this.calculateRotationAngle();
      this.setAngularVelocity();
      this.hasCalculatedRotationAngle = true;
    }
    if (Math.abs(this.object.rotation - convertToGameAngle(this.rotationAngle))
      < 2 * Math.abs(this.angularVelocity)) {
      this.isRotated = true;
    } else {
      this.object.setRotation(this.object.rotation + this.angularVelocity);
    }
  }

  isDestinationInsideTank() {
    return (Phaser.Geom.Rectangle.ContainsPoint(this.object.getBounds(),
      new Phaser.Geom.Point(this.destX, this.destY)));
  }


  calculateRotationAngle() {
    const angle = Math.atan2(this.deltaY, this.deltaX);
    this.rotationAngle = angle;
  }

  setAngularVelocity() {
    this.angularVelocity = Math.abs(this.angularVelocity);
    const gameAngle = convertToGameAngle(this.rotationAngle);
    this.angularVelocity = directionToRotate(this.object.rotation, gameAngle)
      * this.angularVelocity;
  }
}
