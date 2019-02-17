import Phaser from './phaser.min';
import Movement from './movement/movement';

export default class Tank extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y);

    this.movement = new Movement(scene, this);
    this.setData('type', 'tank');

    this.setTexture('tank');
    this.setPosition(x, y);
  }

  update() {
    this.movement.update();
  }
}
