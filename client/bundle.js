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
/*! no static exports found */
/***/ (function(module, exports) {

eval("function createRectangleFromPointer(pointer) {\n  let width = pointer.x - pointer.downX;\n  let height = pointer.y - pointer.downY;\n  let { downX, downY } = pointer;\n\n  if (width < 0) {\n    downX += width;\n    width = Math.abs(width);\n  }\n  if (height < 0) {\n    downY += height;\n    height = Math.abs(height);\n  }\n\n  return new Phaser.Geom.Rectangle(downX, downY, width, height);\n}\n\nfunction unhighlightObjects(scene) {\n  scene.highlightedObjects.forEach(object => object.clearTint());\n}\n\nfunction highlightObjects(scene, rectangle) {\n  const tintColor = 0x63a4dd;\n\n  scene.children.getChildren().forEach((object) => {\n    try {\n      if ((!Phaser.Geom.Rectangle.Intersection(object.getBounds(), rectangle).isEmpty())\n        || Phaser.Geom.Rectangle.ContainsPoint(\n          object.getBounds(), new Phaser.Geom.Point(rectangle.x, rectangle.y),\n        )) {\n        scene.highlightedObjects.push(object);\n        object.tint = tintColor;\n      }\n    } catch (err) {\n      // GameObject does not have getBounds\n    }\n  });\n}\n\nfunction createDragSelection(scene) {\n  scene.highlightedObjects = [];\n\n  const graphics = scene.add.graphics();\n  const thickness = 2;\n  const color = 0x007ae5;\n  const alpha = 1;\n\n  scene.input.on('pointermove', (pointer) => {\n    if (pointer.isDown) {\n      graphics.clear();\n      graphics.lineStyle(thickness, color, alpha);\n\n      graphics.strokeRect(pointer.downX, pointer.downY,\n        pointer.x - pointer.downX, pointer.y - pointer.downY);\n\n      unhighlightObjects(scene);\n\n      const rectangle = createRectangleFromPointer(pointer);\n      highlightObjects(scene, rectangle);\n    }\n  });\n\n  const shiftKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);\n  scene.input.on('pointerdown', (pointer) => {\n    if (!shiftKey.isDown) {\n      unhighlightObjects(scene);\n    }\n    highlightObjects(scene, new Phaser.Geom.Rectangle(pointer.x, pointer.y, 0, 0));\n  });\n\n  scene.input.on('pointerup', () => {\n    graphics.clear();\n  });\n}\n\nmodule.exports = createDragSelection;\n\n\n//# sourceURL=webpack:///./client/drag_selection.js?");

/***/ }),

/***/ "./client/game.js":
/*!************************!*\
  !*** ./client/game.js ***!
  \************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _drag_selection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./drag_selection */ \"./client/drag_selection.js\");\n/* harmony import */ var _drag_selection__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_drag_selection__WEBPACK_IMPORTED_MODULE_0__);\n\n\nclass MenuScene extends Phaser.Scene {\n  constructor() {\n    super({ key: 'MenuScene', physics: { default: 'arcade' }, active: true });\n  }\n\n  preload() {\n    this.load.image('tank', 'assets/tank.png');\n  }\n\n  create() {\n    this.tank = this.physics.add.sprite(100, 100, 'tank');\n    this.tank.setScale(3);\n\n    _drag_selection__WEBPACK_IMPORTED_MODULE_0___default()(this);\n  }\n\n  update() {\n  }\n}\n\nconst WIDTH = window.innerWidth;\nconst HEIGHT = window.innerHeight;\n\nconst config = {\n  width: WIDTH,\n  height: HEIGHT,\n  backgroundColor: '#7a7a7a',\n  pixelArt: true,\n  physics: {\n    default: 'arcade',\n  },\n  audio: {\n    disableWebAudio: true,\n  },\n  scene: [MenuScene],\n};\n\nconst game = new Phaser.Game(config);\n\n\n//# sourceURL=webpack:///./client/game.js?");

/***/ })

/******/ });