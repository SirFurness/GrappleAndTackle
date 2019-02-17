import Phaser from './phaser.min';
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
    this.tanks = this.physics.add.group();
    this.physics.add.collider(this.tanks, this.tanks);
    this.tanks.createFromConfig({
      classType: Tank, repeat: 3, setXY: { x: 100, y: 100, stepY: 100 }, key: 'tank',
    })
      .forEach((tank) => {
        tank.setScale(3);
        tank.setMass(10);
        tank.setDebug(false, false, 0);
        tank.setCollideWorldBounds(true);
        tank.setDamping(true);
        tank.setDrag(0.99);
      });
    this.tanks.runChildUpdate = true;

    createDragSelection(this);
    createMoveOrder(this);
  }

  update() {
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
    arcade: {
      debug: true,
    },
  },
  audio: {
    disableWebAudio: true,
  },
  scene: [MenuScene],
};

const game = new Phaser.Game(config);
