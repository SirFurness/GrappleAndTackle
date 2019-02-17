import Phaser from './phaser.min';

function createRectangleFromPointer(pointer) {
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

function unhighlightObjects(scene) {
  scene.highlightedObjects.forEach((object) => {
    object.setDebug(false, false, 0);
    object.setData('highlighted', false);
  });
  scene.highlightedObjects = [];
}

function highlightObjects(scene, rectangle) {
  const debugColor = 0xed0909;

  scene.children.getChildren().forEach((object) => {
    try {
      if (!object.getData('highlighted') && ((!Phaser.Geom.Rectangle.Intersection(object.getBounds(), rectangle).isEmpty())
        || Phaser.Geom.Rectangle.ContainsPoint(
          object.getBounds(), new Phaser.Geom.Point(rectangle.x, rectangle.y),
        ))) {
        scene.highlightedObjects.push(object);
        object.setDebug(true, false, debugColor);
        object.setData('highlighted', true);
      }
    } catch (err) {
      // GameObject does not have getBounds
    }
  });
}

export default function createDragSelection(scene) {
  scene.highlightedObjects = [];

  const graphics = scene.add.graphics();
  const thickness = 2;
  const color = 0x007ae5;
  const alpha = 1;

  scene.input.on('pointermove', (pointer) => {
    if (pointer.isDown) {
      graphics.clear();
      graphics.lineStyle(thickness, color, alpha);

      graphics.strokeRect(pointer.downX, pointer.downY,
        pointer.x - pointer.downX, pointer.y - pointer.downY);

      unhighlightObjects(scene);

      const rectangle = createRectangleFromPointer(pointer);
      highlightObjects(scene, rectangle);
    }
  });

  const shiftKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
  const altKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ALT);
  scene.input.on('pointerdown', (pointer) => {
    if (!(shiftKey.isDown || altKey.isDown)) {
      unhighlightObjects(scene);
    }
    highlightObjects(scene, new Phaser.Geom.Rectangle(pointer.x, pointer.y, 0, 0));
  });

  scene.input.on('pointerup', () => {
    graphics.clear();
  });
}
