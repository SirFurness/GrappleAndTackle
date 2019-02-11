export default function createMoveOrder(scene) {
  const alt = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ALT);
  scene.input.on('pointerdown', (pointer) => {
    if (alt.isDown) {
      console.log('MOVE');
      scene.events.emit('move_order', { x: pointer.x, y: pointer.y });
    }
  });

  scene.events.on('move_order', (destination) => {
    console.log(destination);
    scene.highlightedObjects.forEach(
      object => object.movement.moveTo(destination.x, destination.y),
    );
  });
}
