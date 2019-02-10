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
  scene.highlightedObjects.forEach(object => object.clearTint());
}

function highlightObjects(scene, rectangle) {
  const tintColor = 0x63a4dd;

  scene.children.getChildren().forEach((object) => {
    try {
      if ((!Phaser.Geom.Rectangle.Intersection(object.getBounds(), rectangle).isEmpty())
        || Phaser.Geom.Rectangle.ContainsPoint(
          object.getBounds(), new Phaser.Geom.Point(rectangle.x, rectangle.y),
        )) {
        scene.highlightedObjects.push(object);
        object.tint = tintColor;
      }
    } catch (err) {
      // GameObject does not have getBounds
    }
  });
}

function createDragSelection(scene) {
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
  scene.input.on('pointerdown', (pointer) => {
    if (!shiftKey.isDown) {
      unhighlightObjects(scene);
    }
    highlightObjects(scene, new Phaser.Geom.Rectangle(pointer.x, pointer.y, 0, 0));
  });

  scene.input.on('pointerup', () => {
    graphics.clear();
  });
}

module.exports = createDragSelection;
