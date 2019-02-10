import createDragSelection from './drag_selection';

class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MenuScene', physics: { default: 'arcade' }, active: true });
  }

  preload() {
    this.load.image('tank', 'assets/tank.png');
  }

  create() {
    this.tank = this.physics.add.sprite(100, 100, 'tank');
    this.tank.setScale(3);

    createDragSelection(this);
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
  },
  audio: {
    disableWebAudio: true,
  },
  scene: [MenuScene],
};

const game = new Phaser.Game(config);
