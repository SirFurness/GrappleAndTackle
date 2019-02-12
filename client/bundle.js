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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return createDragSelection; });\nfunction createRectangleFromPointer(pointer) {\n  let width = pointer.x - pointer.downX;\n  let height = pointer.y - pointer.downY;\n  let { downX, downY } = pointer;\n\n  if (width < 0) {\n    downX += width;\n    width = Math.abs(width);\n  }\n  if (height < 0) {\n    downY += height;\n    height = Math.abs(height);\n  }\n\n  return new Phaser.Geom.Rectangle(downX, downY, width, height);\n}\n\nfunction unhighlightObjects(scene) {\n  scene.highlightedObjects.forEach((object) => {\n    object.setDebug(false, false, 0);\n    object.setData('highlighted', false);\n  });\n  scene.highlightedObjects = [];\n}\n\nfunction highlightObjects(scene, rectangle) {\n  const debugColor = 0xed0909;\n\n  scene.children.getChildren().forEach((object) => {\n    try {\n      if (!object.getData('highlighted') && ((!Phaser.Geom.Rectangle.Intersection(object.getBounds(), rectangle).isEmpty())\n        || Phaser.Geom.Rectangle.ContainsPoint(\n          object.getBounds(), new Phaser.Geom.Point(rectangle.x, rectangle.y),\n        ))) {\n        scene.highlightedObjects.push(object);\n        object.setDebug(true, false, debugColor);\n        object.setData('highlighted', true);\n      }\n    } catch (err) {\n      // GameObject does not have getBounds\n    }\n  });\n}\n\nfunction createDragSelection(scene) {\n  scene.highlightedObjects = [];\n\n  const graphics = scene.add.graphics();\n  const thickness = 2;\n  const color = 0x007ae5;\n  const alpha = 1;\n\n  scene.input.on('pointermove', (pointer) => {\n    if (pointer.isDown) {\n      graphics.clear();\n      graphics.lineStyle(thickness, color, alpha);\n\n      graphics.strokeRect(pointer.downX, pointer.downY,\n        pointer.x - pointer.downX, pointer.y - pointer.downY);\n\n      unhighlightObjects(scene);\n\n      const rectangle = createRectangleFromPointer(pointer);\n      highlightObjects(scene, rectangle);\n    }\n  });\n\n  const shiftKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);\n  const altKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ALT);\n  scene.input.on('pointerdown', (pointer) => {\n    if (!(shiftKey.isDown || altKey.isDown)) {\n      unhighlightObjects(scene);\n    }\n    highlightObjects(scene, new Phaser.Geom.Rectangle(pointer.x, pointer.y, 0, 0));\n  });\n\n  scene.input.on('pointerup', () => {\n    graphics.clear();\n  });\n}\n\n\n//# sourceURL=webpack:///./client/drag_selection.js?");

/***/ }),

/***/ "./client/game.js":
/*!************************!*\
  !*** ./client/game.js ***!
  \************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _drag_selection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./drag_selection */ \"./client/drag_selection.js\");\n/* harmony import */ var _move_order__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./move_order */ \"./client/move_order.js\");\n/* harmony import */ var _tank__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tank */ \"./client/tank.js\");\n\n\n\n\nclass MenuScene extends Phaser.Scene {\n  constructor() {\n    super({ key: 'MenuScene', physics: { default: 'arcade' }, active: true });\n  }\n\n  preload() {\n    this.load.image('tank', 'assets/tank.png');\n  }\n\n  create() {\n    this.tanks = this.physics.add.group();\n    this.physics.add.collider(this.tanks, this.tanks);\n    this.tanks.createFromConfig({\n      classType: _tank__WEBPACK_IMPORTED_MODULE_2__[\"default\"], repeat: 3, setXY: { x: 100, y: 100, stepY: 100 }, key: 'tank',\n    })\n      .forEach((tank) => {\n        tank.setScale(3);\n        tank.setMass(10);\n        tank.setDebug(false, false, 0);\n        tank.setCollideWorldBounds(true);\n        tank.setDamping(true);\n        tank.setDrag(0.99);\n      });\n    this.tanks.runChildUpdate = true;\n\n    Object(_drag_selection__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this);\n    Object(_move_order__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(this);\n  }\n\n  update() {\n  }\n}\n\nconst WIDTH = window.innerWidth;\nconst HEIGHT = window.innerHeight;\n\nconst config = {\n  width: WIDTH,\n  height: HEIGHT,\n  backgroundColor: '#7a7a7a',\n  pixelArt: true,\n  physics: {\n    default: 'arcade',\n    arcade: {\n      debug: true,\n    },\n  },\n  audio: {\n    disableWebAudio: true,\n  },\n  scene: [MenuScene],\n};\n\nconst game = new Phaser.Game(config);\n\n\n//# sourceURL=webpack:///./client/game.js?");

/***/ }),

/***/ "./client/move_order.js":
/*!******************************!*\
  !*** ./client/move_order.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return createMoveOrder; });\nfunction createMoveOrder(scene) {\n  const alt = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ALT);\n  scene.input.on('pointerdown', (pointer) => {\n    if (alt.isDown) {\n      scene.events.emit('move_order', { x: pointer.x, y: pointer.y });\n    }\n  });\n\n  scene.events.on('move_order', (destination) => {\n    console.log(scene.highlightedObjects);\n    scene.highlightedObjects.forEach(\n      object => object.movement.moveTo(destination.x, destination.y),\n    );\n  });\n}\n\n\n//# sourceURL=webpack:///./client/move_order.js?");

/***/ }),

/***/ "./client/movement.js":
/*!****************************!*\
  !*** ./client/movement.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Movement; });\n/* harmony import */ var _movement_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./movement_utils */ \"./client/movement_utils.js\");\n\n\nclass Movement {\n  constructor(scene, gameObject) {\n    this.scene = scene;\n    this.object = gameObject;\n\n    this.isMoving = false;\n\n    this.xVelMagnitude = 100;\n    this.yVelMagnitude = 100;\n    this.positionTolerance = 5.0;\n\n    this.angularVelocity = 100;\n    this.angularTolerance = 0.01;\n  }\n\n  moveTo(destX, destY) {\n    this.isMoving = true;\n    this.destX = destX;\n    this.destY = destY;\n\n\n    if (this.isDestinationInsideTank()) {\n      this.stopMoving();\n    }\n  }\n\n  stopMoving() {\n    this.isMoving = false;\n    this.object.setAcceleration(0, 0);\n    this.object.setAngularAcceleration(0, 0);\n    this.object.setVelocity(0, 0);\n    this.object.setAngularVelocity(0);\n  }\n\n  update() {\n    if (this.isMoving) {\n      const seekAngularVelocity = this.calculateSeekAngularVelocity();\n      this.object.setAngularVelocity(seekAngularVelocity);\n\n      this.setVelocityBasedOnTankAngle();\n\n      if (this.isAtDestination()) {\n        this.stopMoving();\n      }\n    }\n  }\n\n  isAtDestination() {\n    const { x, y } = this.getBarrelLocation();\n    return (Math.abs(x - this.destX) < this.positionTolerance\n      && Math.abs(y - this.destY) < this.positionTolerance);\n  }\n\n  calculateSeekAngularVelocity() {\n    const destAngle = this.calculateRotationAngle();\n\n    let angularVelocity = _movement_utils__WEBPACK_IMPORTED_MODULE_0__[\"directionToRotate\"](this.object.rotation, destAngle)\n      * this.angularVelocity;\n\n    const distanceToRotate = _movement_utils__WEBPACK_IMPORTED_MODULE_0__[\"distanceToRotate\"](this.object.rotation, destAngle);\n    if (distanceToRotate < this.angularVelocity / 60 * Math.PI / 180) {\n      angularVelocity = 0;\n      this.object.rotation = destAngle;\n    }\n\n    return angularVelocity;\n  }\n\n  setVelocityBasedOnTankAngle() {\n    const { xVel, yVel } = _movement_utils__WEBPACK_IMPORTED_MODULE_0__[\"getVelocityFromAngle\"](this.object.rotation);\n    this.object.setVelocity(xVel * this.xVelMagnitude, yVel * this.yVelMagnitude);\n  }\n\n  isDestinationInsideTank() {\n    return (Phaser.Geom.Rectangle.ContainsPoint(this.object.getBounds(),\n      new Phaser.Geom.Point(this.destX, this.destY)));\n  }\n\n  calculateRotationAngle() {\n    const { x, y } = this.getBarrelLocation();\n    const deltaX = this.destX - x;\n    const deltaY = -(this.destY - y);\n\n    const angle = Math.atan2(deltaY, deltaX);\n    return _movement_utils__WEBPACK_IMPORTED_MODULE_0__[\"convertToGameAngle\"](angle);\n  }\n\n  getBarrelLocation() {\n    const bounds = this.object.getBounds();\n    const normalRotationAngle = _movement_utils__WEBPACK_IMPORTED_MODULE_0__[\"convertToNormalAngle\"](this.object.rotation);\n    const x = bounds.width / 2 * Math.cos(normalRotationAngle) + bounds.centerX;\n    const y = -bounds.height / 2 * Math.sin(normalRotationAngle) + bounds.centerY;\n\n    return { x, y };\n  }\n}\n\n\n//# sourceURL=webpack:///./client/movement.js?");

/***/ }),

/***/ "./client/movement_utils.js":
/*!**********************************!*\
  !*** ./client/movement_utils.js ***!
  \**********************************/
/*! exports provided: convertToGameAngle, convertToNormalAngle, haveSameSign, distanceToRotate, directionToRotate, getVelocityFromAngle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"convertToGameAngle\", function() { return convertToGameAngle; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"convertToNormalAngle\", function() { return convertToNormalAngle; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"haveSameSign\", function() { return haveSameSign; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"distanceToRotate\", function() { return distanceToRotate; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"directionToRotate\", function() { return directionToRotate; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getVelocityFromAngle\", function() { return getVelocityFromAngle; });\nfunction convertToGameAngle(angle) {\n  return Phaser.Math.Angle.Wrap(Math.PI / 2 - angle);\n}\n\nfunction convertToNormalAngle(angle) {\n  return Phaser.Math.Angle.Wrap(Math.PI / 2 - angle);\n}\n\nfunction haveSameSign(a1, a2) {\n  return (a1 >= 0 && a2 >= 0) || (a1 < 0 && a2 < 0);\n}\n\nfunction distanceToRotate(a1, a2) {\n  let distance = 0;\n  if (haveSameSign(a1, a2)) {\n    distance = Math.abs(a1 - a2);\n  } else {\n    const possibleDistance = Math.abs(a1) + Math.abs(a2);\n    if (possibleDistance > Math.PI) {\n      distance = 2 * Math.PI - possibleDistance;\n    } else {\n      distance = possibleDistance;\n    }\n  }\n  return Phaser.Math.Angle.Wrap(distance);\n}\n\n// determins if a1 should rotate clockwise or counterclockwise in order to get to a2\nfunction directionToRotate(a1, a2) {\n  let clockwise = true;\n\n  if (haveSameSign(a1, a2)) {\n    if (a1 > a2) {\n      clockwise = false;\n    }\n  } else if (a1 >= 0) {\n    if (Math.abs(a2) + a1 < Math.PI) {\n      clockwise = false;\n    }\n  } else if (Math.abs(a1) + a2 > Math.PI) {\n    clockwise = false;\n  }\n  return clockwise ? 1 : -1;\n}\n\nfunction getVelocityFromAngle(angle) {\n  const normalAngle = convertToNormalAngle(angle);\n  const xVel = Math.cos(normalAngle);\n  const yVel = -Math.sin(normalAngle);\n\n  return { xVel, yVel };\n}\n\n\n//# sourceURL=webpack:///./client/movement_utils.js?");

/***/ }),

/***/ "./client/tank.js":
/*!************************!*\
  !*** ./client/tank.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Tank; });\n/* harmony import */ var _movement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./movement */ \"./client/movement.js\");\n\n\nclass Tank extends Phaser.Physics.Arcade.Sprite {\n  constructor(scene, x, y) {\n    super(scene, x, y);\n\n    this.movement = new _movement__WEBPACK_IMPORTED_MODULE_0__[\"default\"](scene, this);\n\n    this.setTexture('tank');\n    this.setPosition(x, y);\n  }\n\n  update() {\n    this.movement.update();\n  }\n}\n\n\n//# sourceURL=webpack:///./client/tank.js?");

/***/ })

/******/ });