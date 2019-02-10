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
    this.highlightedObjects = [];

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

        this.unhighlightObjects();

        const rectangle = this.createRectangleFromPointer(pointer);
        this.highlightObjects(rectangle);
      }
    });

    this.input.on('pointerdown', (pointer) => {
      this.unhighlightObjects();
      this.highlightObjects(new Phaser.Geom.Rectangle(pointer.x, pointer.y, 0, 0));
    });

    this.input.on('pointerup', () => {
      graphics.clear();
    });
  }

  createRectangleFromPointer(pointer) {
    let width = pointer.x - pointer.downX;
    let height = pointer.y - pointer.downY;
    let { downX, downY } = pointer;

    if (width < 0) {
      downX += width;
      width = Math.abs(width);
    }
    if (height < 0) {
      downY += height;
      height = Math.abs(height);
    }

    return new Phaser.Geom.Rectangle(downX, downY, width, height);
  }

  unhighlightObjects() {
    this.highlightedObjects.forEach(object => object.clearTint());
  }

  highlightObjects(rectangle) {
    const tintColor = 0x63a4dd;

    this.children.getChildren().forEach((object) => {
      try {
        if ((!Phaser.Geom.Rectangle.Intersection(object.getBounds(), rectangle).isEmpty())
          || Phaser.Geom.Rectangle.ContainsPoint(
            object.getBounds(), new Phaser.Geom.Point(rectangle.x, rectangle.y),
          )) {
          this.highlightedObjects.push(object);
          object.tint = tintColor;
        }
      } catch (err) {
        // GameObject does not have getBounds
      }
    });
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
