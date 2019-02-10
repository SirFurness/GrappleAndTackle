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

    this.createDragSelection();
  }

  createDragSelection() {
    const graphics = this.add.graphics();
    const thickness = 2;
    const color = 0x007ae5;
    const alpha = 1;

    this.input.on('pointermove', (pointer) => {
      if (pointer.isDown) {
        graphics.clear();
        graphics.lineStyle(thickness, color, alpha);
        graphics.strokeRect(pointer.downX, pointer.downY,
          pointer.x - pointer.downX, pointer.y - pointer.downY);
      }
    });

    this.input.on('pointerup', () => graphics.clear());
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
