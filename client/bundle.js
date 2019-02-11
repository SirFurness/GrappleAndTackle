/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./client/game.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./client/drag_selection.js":
/*!**********************************!*\
  !*** ./client/drag_selection.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return createDragSelection; });\nfunction createRectangleFromPointer(pointer) {\n  let width = pointer.x - pointer.downX;\n  let height = pointer.y - pointer.downY;\n  let { downX, downY } = pointer;\n\n  if (width < 0) {\n    downX += width;\n    width = Math.abs(width);\n  }\n  if (height < 0) {\n    downY += height;\n    height = Math.abs(height);\n  }\n\n  return new Phaser.Geom.Rectangle(downX, downY, width, height);\n}\n\nfunction unhighlightObjects(scene) {\n  scene.highlightedObjects.forEach(object => object.clearTint());\n}\n\nfunction highlightObjects(scene, rectangle) {\n  const tintColor = 0x63a4dd;\n\n  scene.children.getChildren().forEach((object) => {\n    try {\n      if ((!Phaser.Geom.Rectangle.Intersection(object.getBounds(), rectangle).isEmpty())\n        || Phaser.Geom.Rectangle.ContainsPoint(\n          object.getBounds(), new Phaser.Geom.Point(rectangle.x, rectangle.y),\n        )) {\n        scene.highlightedObjects.push(object);\n        object.tint = tintColor;\n      }\n    } catch (err) {\n      // GameObject does not have getBounds\n    }\n  });\n}\n\nfunction createDragSelection(scene) {\n  scene.highlightedObjects = [];\n\n  const graphics = scene.add.graphics();\n  const thickness = 2;\n  const color = 0x007ae5;\n  const alpha = 1;\n\n  scene.input.on('pointermove', (pointer) => {\n    if (pointer.isDown) {\n      graphics.clear();\n      graphics.lineStyle(thickness, color, alpha);\n\n      graphics.strokeRect(pointer.downX, pointer.downY,\n        pointer.x - pointer.downX, pointer.y - pointer.downY);\n\n      unhighlightObjects(scene);\n\n      const rectangle = createRectangleFromPointer(pointer);\n      highlightObjects(scene, rectangle);\n    }\n  });\n\n  const shiftKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);\n  scene.input.on('pointerdown', (pointer) => {\n    if (!shiftKey.isDown) {\n      unhighlightObjects(scene);\n    }\n    highlightObjects(scene, new Phaser.Geom.Rectangle(pointer.x, pointer.y, 0, 0));\n  });\n\n  scene.input.on('pointerup', () => {\n    graphics.clear();\n  });\n}\n\n\n//# sourceURL=webpack:///./client/drag_selection.js?");

/***/ }),

/***/ "./client/game.js":
/*!************************!*\
  !*** ./client/game.js ***!
  \************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _drag_selection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./drag_selection */ \"./client/drag_selection.js\");\n/* harmony import */ var _move_order__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./move_order */ \"./client/move_order.js\");\n/* harmony import */ var _tank__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tank */ \"./client/tank.js\");\n\n\n\n\nclass MenuScene extends Phaser.Scene {\n  constructor() {\n    super({ key: 'MenuScene', physics: { default: 'arcade' }, active: true });\n  }\n\n  preload() {\n    this.load.image('tank', 'assets/tank.png');\n  }\n\n  create() {\n    this.tank = new _tank__WEBPACK_IMPORTED_MODULE_2__[\"default\"](this, 100, 100);\n    this.add.existing(this.tank);\n    this.tank.setScale(3);\n\n    Object(_drag_selection__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this);\n    Object(_move_order__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(this);\n  }\n\n  update() {\n    this.tank.update();\n  }\n}\n\nconst WIDTH = window.innerWidth;\nconst HEIGHT = window.innerHeight;\n\nconst config = {\n  width: WIDTH,\n  height: HEIGHT,\n  backgroundColor: '#7a7a7a',\n  pixelArt: true,\n  physics: {\n    default: 'arcade',\n  },\n  audio: {\n    disableWebAudio: true,\n  },\n  scene: [MenuScene],\n};\n\nconst game = new Phaser.Game(config);\n\n\n//# sourceURL=webpack:///./client/game.js?");

/***/ }),

/***/ "./client/move_order.js":
/*!******************************!*\
  !*** ./client/move_order.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return createMoveOrder; });\nfunction createMoveOrder(scene) {\n  const alt = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ALT);\n  scene.input.on('pointerdown', (pointer) => {\n    if (alt.isDown) {\n      console.log('MOVE');\n      scene.events.emit('move_order', { x: pointer.x, y: pointer.y });\n    }\n  });\n\n  scene.events.on('move_order', (destination) => {\n    console.log(destination);\n    scene.highlightedObjects.forEach(\n      object => object.movement.moveTo(destination.x, destination.y),\n    );\n  });\n}\n\n\n//# sourceURL=webpack:///./client/move_order.js?");

/***/ }),

/***/ "./client/movement.js":
/*!****************************!*\
  !*** ./client/movement.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Movement; });\nfunction haveSameSign(a1, a2) {\n  return (a1 >= 0 && a2 >= 0) || (a1 < 0 && a2 < 0);\n}\n\n// determins if a1 should rotate clockwise or counterclockwise in order to get to a2\nfunction directionToRotate(a1, a2) {\n  let clockwise = true;\n\n  if (haveSameSign(a1, a2)) {\n    if (a1 > a2) {\n      clockwise = false;\n    }\n  } else if (a1 >= 0) {\n    if (Math.abs(a2) + a1 < Math.PI) {\n      clockwise = false;\n    }\n  } else if (Math.abs(a1) + a2 > Math.PI) {\n    clockwise = false;\n  }\n  return clockwise ? 1 : -1;\n}\n\n// Takes an angle where x-axis is between quadrants I and IV\n// to equivalent angle for x-axis between quadrants I and II\nfunction convertToGameAngle(angle) {\n  if (angle <= -Math.PI / 2) {\n    return -(3 * Math.PI / 2 + angle);\n  }\n  return Math.PI / 2 - angle;\n}\n\nclass Movement {\n  constructor(scene, gameObject) {\n    this.scene = scene;\n    this.object = gameObject;\n\n    this.isMoving = false;\n    this.isRotated = false;\n    this.isAtDestination = false;\n    this.hasCalculatedRotationAngle = false;\n    this.hasCalculatedVelocity = false;\n\n    this.defaultVelX = 1;\n    this.defaultVelY = 1;\n    this.velX = this.defaultVelX;\n    this.velY = this.defaultVelY;\n\n    this.rotationAngle = 0;\n    this.angularVelocity = 0.03;\n  }\n\n  resetVariables() {\n    this.isMoving = false;\n    this.isRotated = false;\n    this.isAtDestination = false;\n    this.hasCalculatedRotationAngle = false;\n    this.hasCalculatedVelocity = false;\n  }\n\n\n  moveTo(destX, destY) {\n    this.resetVariables();\n\n    this.isMoving = true;\n    this.destX = destX;\n    this.destY = destY;\n\n    const { x, y } = this.object.getCenter();\n    this.deltaX = this.destX - x;\n    this.deltaY = -(this.destY - y);\n\n\n    if (this.isDestinationInsideTank()) {\n      this.isMoving = false;\n    }\n  }\n\n  update() {\n    if (this.isMoving) {\n      if (!this.isRotated) {\n        this.rotate();\n      } else if (!this.isAtDestination) {\n        this.moveToDestination();\n      }\n    }\n  }\n\n  moveToDestination() {\n    if (!this.hasCalculatedVelocity) {\n      this.calculateVelocity();\n      this.hasCalculatedVelocity = true;\n    }\n    if (Math.abs(this.object.x - this.destX) < Math.abs(this.velX)\n      && Math.abs(this.object.y - this.destY) < Math.abs(this.velY)) {\n      this.isAtDestination = true;\n    } else {\n      this.object.setPosition(this.object.x + this.velX, this.object.y + this.velY);\n    }\n  }\n\n  calculateVelocity() {\n    this.velX = this.defaultVelX * Math.cos(this.rotationAngle);\n    this.velY = -this.defaultVelY * Math.sin(this.rotationAngle);\n  }\n\n  rotate() {\n    if (!this.hasCalculatedRotationAngle) {\n      this.calculateRotationAngle();\n      this.setAngularVelocity();\n      this.hasCalculatedRotationAngle = true;\n    }\n    if (Math.abs(this.object.rotation - convertToGameAngle(this.rotationAngle))\n      < 2 * Math.abs(this.angularVelocity)) {\n      this.isRotated = true;\n    } else {\n      this.object.setRotation(this.object.rotation + this.angularVelocity);\n    }\n  }\n\n  isDestinationInsideTank() {\n    return (Phaser.Geom.Rectangle.ContainsPoint(this.object.getBounds(),\n      new Phaser.Geom.Point(this.destX, this.destY)));\n  }\n\n\n  calculateRotationAngle() {\n    const angle = Math.atan2(this.deltaY, this.deltaX);\n    this.rotationAngle = angle;\n  }\n\n  setAngularVelocity() {\n    this.angularVelocity = Math.abs(this.angularVelocity);\n    const gameAngle = convertToGameAngle(this.rotationAngle);\n    this.angularVelocity = directionToRotate(this.object.rotation, gameAngle)\n      * this.angularVelocity;\n  }\n}\n\n\n//# sourceURL=webpack:///./client/movement.js?");

/***/ }),

/***/ "./client/tank.js":
/*!************************!*\
  !*** ./client/tank.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Tank; });\n/* harmony import */ var _movement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./movement */ \"./client/movement.js\");\n\n\nclass Tank extends Phaser.GameObjects.Sprite {\n  constructor(scene, x, y) {\n    super(scene, x, y);\n\n    this.movement = new _movement__WEBPACK_IMPORTED_MODULE_0__[\"default\"](scene, this);\n\n    this.setTexture('tank');\n    this.setPosition(x, y);\n  }\n\n  update() {\n    this.movement.update();\n  }\n}\n\n\n//# sourceURL=webpack:///./client/tank.js?");

/***/ })

/******/ });