import createDragSelection from './drag_selection';
import createMoveOrder from './move_order';
import Tank from './tank';

class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MenuScene', physics: { default: 'arcade' }, active: true });
  }

  preload() {
    this.load.image('tank', 'assets/tank.png');
  }

  create() {
    this.tank = new Tank(this, 100, 100);
    this.add.existing(this.tank);
    this.tank.setScale(3);

    createDragSelection(this);
    createMoveOrder(this);
  }

  update() {
    this.tank.update();
  }
}

const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

const config = {
  width: WIDTH,
  height: HEIGHT,
  backgroundColor: '#7a7a7a',
  pixelArt: true,
  physics: {
    default: 'arcade',
  },
  audio: {
    disableWebAudio: true,
  },
  scene: [MenuScene],
};

const game = new Phaser.Game(config);
