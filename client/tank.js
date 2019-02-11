import Movement from './movement';

export default class Tank extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y);

    this.movement = new Movement(scene, this);

    this.setTexture('tank');
    this.setPosition(x, y);
  }

  update() {
    this.movement.update();
  }
}
