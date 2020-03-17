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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/canvas.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/Ball.js":
/*!************************!*\
  !*** ./src/js/Ball.js ***!
  \************************/
/*! exports provided: Ball */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Ball", function() { return Ball; });
/* harmony import */ var _canvas__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./canvas */ "./src/js/canvas.js");
/* harmony import */ var _Engine__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Engine */ "./src/js/Engine.js");
/* harmony import */ var _Vec2__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Vec2 */ "./src/js/Vec2.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }




var gravity = 0.2;
var friction = 0.7;
var Ball = /*#__PURE__*/function () {
  function Ball(x, y, dx, dy, radius, color, placeHolder) {
    _classCallCheck(this, Ball);

    this.x = x;
    this.y = y;
    this.velocity = new _Vec2__WEBPACK_IMPORTED_MODULE_2__["Vec2"](dx, dy);
    this.radius = radius;
    this.color = color;
    this.mass = 1;
    this.placeHolder = placeHolder;
  }

  _createClass(Ball, [{
    key: "update",
    value: function update(balls, rectArray) {
      if (!this.placeHolder) {
        var coll = false;

        for (var i = 0; i < balls.length; i++) {
          if (this === balls[i] || balls[i].placeHolder) continue;
          var prev = balls[i];

          if (Object(_canvas__WEBPACK_IMPORTED_MODULE_0__["distance"])(this.x + this.velocity.x, this.y + this.velocity.y, prev.x, prev.y) - this.radius * 2 < 0) {
            Object(_Engine__WEBPACK_IMPORTED_MODULE_1__["ballToBallCollision"])(this, balls[i]);
            coll = true;
          }
        }

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = rectArray[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var rect = _step.value;

            if (Object(_Engine__WEBPACK_IMPORTED_MODULE_1__["rectCircleCollision"])(rect, this)) {
              Object(_Engine__WEBPACK_IMPORTED_MODULE_1__["circleRectCollisionResponse"])(rect, this);
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        if (this.x - this.radius <= 0 || this.x + this.radius >= innerWidth) {
          this.velocity.x = -this.velocity.x;
        }

        if (this.y - this.radius + this.velocity.y <= 0 || this.y + this.radius + this.velocity.y >= innerHeight) {
          this.velocity.y = -this.velocity.y;
          this.velocity.y = this.velocity.y * friction;
          this.velocity.x = this.velocity.x * friction;
        } else {
          if (!coll) {
            this.velocity.y += gravity;
          } else {}
        }

        this.x += this.velocity.x;
        this.y += this.velocity.y;
      }

      this.draw();
    }
  }, {
    key: "draw",
    value: function draw() {
      _canvas__WEBPACK_IMPORTED_MODULE_0__["c"].beginPath();
      _canvas__WEBPACK_IMPORTED_MODULE_0__["c"].arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      _canvas__WEBPACK_IMPORTED_MODULE_0__["c"].strokeStyle = this.color;
      _canvas__WEBPACK_IMPORTED_MODULE_0__["c"].stroke();
      _canvas__WEBPACK_IMPORTED_MODULE_0__["c"].closePath();
    }
  }]);

  return Ball;
}();

/***/ }),

/***/ "./src/js/CollisionInfo.js":
/*!*********************************!*\
  !*** ./src/js/CollisionInfo.js ***!
  \*********************************/
/*! exports provided: CollisionInfo */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CollisionInfo", function() { return CollisionInfo; });
/* harmony import */ var _Vec2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Vec2 */ "./src/js/Vec2.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


var CollisionInfo = /*#__PURE__*/function () {
  function CollisionInfo() {
    _classCallCheck(this, CollisionInfo);

    this.mDepth = 0;
    this.mNormal = new _Vec2__WEBPACK_IMPORTED_MODULE_0__["Vec2"](0, 0);
    this.mStart = new _Vec2__WEBPACK_IMPORTED_MODULE_0__["Vec2"](0, 0);
    this.mEnd = new _Vec2__WEBPACK_IMPORTED_MODULE_0__["Vec2"](0, 0);
  }

  _createClass(CollisionInfo, [{
    key: "setDepth",
    value: function setDepth(s) {
      this.mDepth = s;
    }
  }, {
    key: "setNormal",
    value: function setNormal(s) {
      this.mNormal = s;
    }
  }, {
    key: "getDepth",
    value: function getDepth() {
      return this.mDepth;
    }
  }, {
    key: "getNormal",
    value: function getNormal() {
      return this.mNormal;
    }
  }, {
    key: "setInfo",
    value: function setInfo(d, n, s) {
      this.mDepth = d;
      this.mNormal = n;
      this.mStart = s;
      this.mEnd = s.add(n.scale(d));
    }
  }, {
    key: "changeDir",
    value: function changeDir() {
      this.mNormal = this.mNormal.scale(-1);
      var n = this.mStart;
      this.mStart = this.mEnd;
      this.mEnd = n;
    }
  }]);

  return CollisionInfo;
}();

/***/ }),

/***/ "./src/js/Engine.js":
/*!**************************!*\
  !*** ./src/js/Engine.js ***!
  \**************************/
/*! exports provided: playerRectCollision, rectCircleCollision, circleRectCollisionResponse, ballToBallCollision */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "playerRectCollision", function() { return playerRectCollision; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rectCircleCollision", function() { return rectCircleCollision; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "circleRectCollisionResponse", function() { return circleRectCollisionResponse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ballToBallCollision", function() { return ballToBallCollision; });
/* harmony import */ var _Vec2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Vec2 */ "./src/js/Vec2.js");

var playerRectCollision = function playerRectCollision(player, rect) {
  if (player.velocity.y >= 0 && player.center.y + player.height + player.velocity.y >= rect.center.y - rect.height / 2 && player.center.y - player.height <= rect.center.y && player.center.x <= rect.center.x + rect.width - player.width && player.center.x + player.width >= rect.center.x) {
    player.center.y = rect.center.y - player.height - rect.height / 2;
    player.velocity.y = 0;
  }
};
var rectCircleCollision = function rectCircleCollision(player, circle) {
  var distX = Math.abs(circle.x - player.center.x - player.width / 2);
  var distY = Math.abs(circle.y - player.center.y - player.height / 2);

  if (distX > player.width / 2 + circle.radius) {
    return false;
  }

  if (distY > player.height / 2 + circle.radius) {
    return false;
  }

  if (distX <= player.width / 2) {
    return true;
  }

  if (distY <= player.height / 2) {
    return true;
  }

  var dx = distX - player.width / 2;
  var dy = distY - player.height / 2;
  return dx * dx + dy * dy <= circle.radius * circle.radius;
};
var circleRectCollisionResponse = function circleRectCollisionResponse(rect, circle) {};
var ballToBallCollision = function ballToBallCollision(ball, otherBall) {
  var xVelocityDiff = ball.velocity.x - otherBall.velocity.x;
  var yVelocityDiff = ball.velocity.y - otherBall.velocity.y;
  var xDist = otherBall.x - ball.x;
  var yDist = otherBall.y - ball.y; // Prevent accidental overlap of particles

  if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {
    // Grab angle between the two colliding particles
    var angle = -Math.atan2(otherBall.y - ball.y, otherBall.x - ball.x); // Store mass in var for better readability in collision equation

    var m1 = ball.mass;
    var m2 = otherBall.mass; // Velocity before equation

    var u1 = rotate(ball.velocity, angle);
    var u2 = rotate(otherBall.velocity, angle); // Velocity after 1d collision equation

    var v1 = {
      x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2),
      y: u1.y
    };
    var v2 = {
      x: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2),
      y: u2.y
    }; // Final velocity after rotating axis back to original location

    var vFinal1 = rotate(v1, -angle);
    var vFinal2 = rotate(v2, -angle); // Swap particle velocities for realistic bounce effect

    ball.velocity.x = vFinal1.x;
    ball.velocity.y = vFinal1.y;
    otherBall.velocity.x = vFinal2.x;
    otherBall.velocity.y = vFinal2.y;
  }
};

var rotate = function rotate(velocity, angle) {
  var rotatedVelocities = {
    x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
    y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
  };
  return rotatedVelocities;
};

/***/ }),

/***/ "./src/js/Player.js":
/*!**************************!*\
  !*** ./src/js/Player.js ***!
  \**************************/
/*! exports provided: Player */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Player", function() { return Player; });
/* harmony import */ var _Vec2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Vec2 */ "./src/js/Vec2.js");
/* harmony import */ var _canvas__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./canvas */ "./src/js/canvas.js");
/* harmony import */ var _Engine__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Engine */ "./src/js/Engine.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }




var gravity = 1.5;
var friction = 0.4;
var Player = /*#__PURE__*/function () {
  function Player(center, width, height, velocity, color, angle) {
    _classCallCheck(this, Player);

    this.moving = {
      left: false,
      right: false,
      up: false
    };
    this.jumping = false;
    this.center = center;
    this.width = width;
    this.height = height;
    this.angle = angle;
    this.velocity = velocity;
    this.mass = 1;
    this.color = color;
    this.vertexes = [new _Vec2__WEBPACK_IMPORTED_MODULE_0__["Vec2"](center.x - height / 2, center.y - height / 2), new _Vec2__WEBPACK_IMPORTED_MODULE_0__["Vec2"](center.x + height / 2, center.y - height / 2), new _Vec2__WEBPACK_IMPORTED_MODULE_0__["Vec2"](center.x + height / 2, center.y + height / 2), new _Vec2__WEBPACK_IMPORTED_MODULE_0__["Vec2"](center.x - height / 2, center.y + height / 2)];
  }

  _createClass(Player, [{
    key: "controll",
    value: function controll(key, value) {
      if (key === 'a') {
        this.moving.left = value;
      } else if (key === 'd') {
        this.moving.right = value;
      } else if (key === ' ' || key === 'w') {
        this.moving.up = value;
      }
    }
  }, {
    key: "update",
    value: function update(rectArray, ballArray) {
      this.velocity.y += gravity;
      this.velocity.x *= 0.9; // Check if player died

      if (this.center.y >= _canvas__WEBPACK_IMPORTED_MODULE_1__["canvas"].height) {
        Object(_canvas__WEBPACK_IMPORTED_MODULE_1__["init"])();
      }

      if (rectArray) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = rectArray[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var rect = _step.value;

            if (this.velocity.y >= 0) {
              Object(_Engine__WEBPACK_IMPORTED_MODULE_2__["playerRectCollision"])(this, rect);
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }

      if (ballArray) {
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = ballArray[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var circle = _step2.value;

            if (Object(_Engine__WEBPACK_IMPORTED_MODULE_2__["rectCircleCollision"])(this, circle)) {
              console.log('collision');
            }
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
              _iterator2["return"]();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }
      }

      if (this.center.x - this.width / 2 + this.velocity.x <= 0 || this.center.x + this.width / 2 + this.velocity.x >= innerWidth) {
        this.velocity.x = -this.velocity.x;
        this.velocity.x = this.velocity.x * friction;
      }

      if (this.moving.left) {
        this.velocity.x -= 1;
      } else if (this.moving.right) {
        this.velocity.x += 1;
      } else if (this.moving.up) {
        this.velocity.y = -20;
      }

      this.center.x += this.velocity.x;
      this.center.y += this.velocity.y;
      this.draw();
    }
  }, {
    key: "draw",
    value: function draw() {
      _canvas__WEBPACK_IMPORTED_MODULE_1__["c"].beginPath();
      _canvas__WEBPACK_IMPORTED_MODULE_1__["c"].rect(this.center.x, this.center.y, this.width, this.height);
      _canvas__WEBPACK_IMPORTED_MODULE_1__["c"].fill();
      _canvas__WEBPACK_IMPORTED_MODULE_1__["c"].strokeStyle = "blue";
      _canvas__WEBPACK_IMPORTED_MODULE_1__["c"].lineWidth = 4;
      _canvas__WEBPACK_IMPORTED_MODULE_1__["c"].stroke();
    }
  }]);

  return Player;
}();

/***/ }),

/***/ "./src/js/Rectangle.js":
/*!*****************************!*\
  !*** ./src/js/Rectangle.js ***!
  \*****************************/
/*! exports provided: Rectangle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Rectangle", function() { return Rectangle; });
/* harmony import */ var _Vec2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Vec2 */ "./src/js/Vec2.js");
/* harmony import */ var _canvas__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./canvas */ "./src/js/canvas.js");
/* harmony import */ var _CollisionInfo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CollisionInfo */ "./src/js/CollisionInfo.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



 // import { CollisionInfo } from "./CollisionInfo";

var gravity = 0.2;
var friction = 0.9;
var Rectangle = /*#__PURE__*/function () {
  function Rectangle(center, width, height, velocity, color, angle) {
    _classCallCheck(this, Rectangle);

    this.center = center;
    this.x = center.x;
    this.y = center.y;
    this.width = width;
    this.height = height;
    this.angle = angle;
    this.velocity = velocity;
    this.mass = 1;
    this.color = color;
    this.vertexes = [new _Vec2__WEBPACK_IMPORTED_MODULE_0__["Vec2"](center.x - height / 2, center.y - height / 2), new _Vec2__WEBPACK_IMPORTED_MODULE_0__["Vec2"](center.x + height / 2, center.y - height / 2), new _Vec2__WEBPACK_IMPORTED_MODULE_0__["Vec2"](center.x + height / 2, center.y + height / 2), new _Vec2__WEBPACK_IMPORTED_MODULE_0__["Vec2"](center.x - height / 2, center.y + height / 2)];
    this.faceNormal = [];
    this.faceNormal[0] = this.vertexes[1].subtract(this.vertexes[2]);
    this.faceNormal[0] = this.faceNormal[0].normalize();
    this.faceNormal[1] = this.vertexes[2].subtract(this.vertexes[3]);
    this.faceNormal[1] = this.faceNormal[1].normalize();
    this.faceNormal[2] = this.vertexes[3].subtract(this.vertexes[0]);
    this.faceNormal[2] = this.faceNormal[2].normalize();
    this.faceNormal[3] = this.vertexes[0].subtract(this.vertexes[1]);
    this.faceNormal[3] = this.faceNormal[3].normalize();
    this.kFPS = 60; // Frames per second

    this.kFrameTime = 1 / this.kFPS;
    this.mUpdateIntervalInSeconds = this.kFrameTime;
  }

  _createClass(Rectangle, [{
    key: "update",
    value: function update() {
      this.draw();
    }
  }, {
    key: "move",
    value: function move(v) {
      for (var i = 0; i < this.vertexes.length; i++) {
        this.vertexes[i] = this.vertexes[i].add(v);
      }

      this.center = this.center.add(v);
    }
  }, {
    key: "draw",
    value: function draw() {
      _canvas__WEBPACK_IMPORTED_MODULE_1__["c"].save();
      _canvas__WEBPACK_IMPORTED_MODULE_1__["c"].translate(this.vertexes[0].x, this.vertexes[0].y);
      _canvas__WEBPACK_IMPORTED_MODULE_1__["c"].rotate(this.angle);
      _canvas__WEBPACK_IMPORTED_MODULE_1__["c"].strokeStyle = this.color;
      _canvas__WEBPACK_IMPORTED_MODULE_1__["c"].strokeRect(0, 0, this.width, this.height);
      _canvas__WEBPACK_IMPORTED_MODULE_1__["c"].restore();
    }
  }]);

  return Rectangle;
}();
;

/***/ }),

/***/ "./src/js/StickBox.js":
/*!****************************!*\
  !*** ./src/js/StickBox.js ***!
  \****************************/
/*! exports provided: StickBox */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StickBox", function() { return StickBox; });
/* harmony import */ var _canvas__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./canvas */ "./src/js/canvas.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


var gravity = 1.5;
var bounce = 0.9;
var friction = 0.9;
var StickBox = /*#__PURE__*/function () {
  function StickBox(x, y, width, height) {
    _classCallCheck(this, StickBox);

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.points = [];
    this.sticks = [];
    this.create();
  }

  _createClass(StickBox, [{
    key: "update",
    value: function update() {
      this.updatePoints();
      this.constrainPoints(); // for(var i = 0; i < 5; i++) {

      this.updateSticks(); // }

      this.renderPoints();
      this.renderSticks();
    }
  }, {
    key: "create",
    value: function create() {
      this.cratePoint(this.x, this.y);
      this.cratePoint(this.x + this.width, this.y);
      this.cratePoint(this.x + this.width, this.y + this.height);
      this.cratePoint(this.x, this.y + this.height);
      this.creatStick(0, 1);
      this.creatStick(1, 2);
      this.creatStick(2, 3);
      this.creatStick(3, 0);
      this.creatStick(0, 2);
      this.creatStick(1, 3);
      console.log(this.sticks.length, this.points);
    }
  }, {
    key: "creatStick",
    value: function creatStick(p1, p2) {
      this.sticks.push({
        p0: this.points[p1],
        p1: this.points[p2],
        length: this.distance(this.points[p1], this.points[p2])
      });
    }
  }, {
    key: "cratePoint",
    value: function cratePoint(xCor, yCor) {
      console.log(xCor, yCor);
      this.points.push({
        x: xCor,
        y: yCor,
        oldx: xCor + Math.random() * 30 - 15,
        oldy: yCor + Math.random() * 30 - 15
      });
    }
  }, {
    key: "distance",
    value: function distance(p0, p1) {
      var dx = p1.x - p0.x,
          dy = p1.y - p0.y;
      return Math.sqrt(dx * dx + dy * dy);
    }
  }, {
    key: "updatePoints",
    value: function updatePoints() {
      for (var i = 0; i < this.points.length; i++) {
        var p = this.points[i];
        var vx = (p.x - p.oldx) * friction;
        var vy = (p.y - p.oldy) * friction;
        p.oldx = p.x;
        p.oldy = p.y;
        p.x += vx;
        p.y += vy;
        p.y += gravity;
      }
    }
  }, {
    key: "constrainPoints",
    value: function constrainPoints() {
      for (var i = 0; i < this.points.length; i++) {
        var p = this.points[i],
            vx = (p.x - p.oldx) * friction,
            vy = (p.y - p.oldy) * friction;

        if (p.x > _canvas__WEBPACK_IMPORTED_MODULE_0__["canvas"].width) {
          p.x = _canvas__WEBPACK_IMPORTED_MODULE_0__["canvas"].width;
          p.oldx = p.x + vx * bounce;
        } else if (p.x < 0) {
          p.x = 0;
          p.oldx = p.x + vx * bounce;
        }

        if (p.y > _canvas__WEBPACK_IMPORTED_MODULE_0__["canvas"].height) {
          p.y = _canvas__WEBPACK_IMPORTED_MODULE_0__["canvas"].height;
          p.oldy = p.y + vy * bounce;
        } else if (p.y < 0) {
          p.y = 0;
          p.oldy = p.y + vy * bounce;
        }
      }
    }
  }, {
    key: "updateSticks",
    value: function updateSticks() {
      for (var i = 0; i < this.sticks.length; i++) {
        var s = this.sticks[i],
            dx = s.p1.x - s.p0.x,
            dy = s.p1.y - s.p0.y,
            distance = Math.sqrt(dx * dx + dy * dy),
            difference = s.length - distance,
            percent = difference / distance / 2,
            offsetX = dx * percent,
            offsetY = dy * percent;
        s.p0.x -= offsetX;
        s.p0.y -= offsetY;
        s.p1.x += offsetX;
        s.p1.y += offsetY;
      }
    }
  }, {
    key: "renderPoints",
    value: function renderPoints() {
      for (var i = 0; i < this.points.length; i++) {
        var p = this.points[i];
        _canvas__WEBPACK_IMPORTED_MODULE_0__["c"].beginPath();
        _canvas__WEBPACK_IMPORTED_MODULE_0__["c"].arc(p.x, p.y, 5, 0, Math.PI * 2);
        _canvas__WEBPACK_IMPORTED_MODULE_0__["c"].fill();
      }
    }
  }, {
    key: "renderSticks",
    value: function renderSticks() {
      _canvas__WEBPACK_IMPORTED_MODULE_0__["c"].beginPath();

      for (var i = 0; i < this.sticks.length; i++) {
        var s = this.sticks[i];
        _canvas__WEBPACK_IMPORTED_MODULE_0__["c"].moveTo(s.p0.x, s.p0.y);
        _canvas__WEBPACK_IMPORTED_MODULE_0__["c"].lineTo(s.p1.x, s.p1.y);
      }

      _canvas__WEBPACK_IMPORTED_MODULE_0__["c"].stroke();
    }
  }]);

  return StickBox;
}();

/***/ }),

/***/ "./src/js/Vec2.js":
/*!************************!*\
  !*** ./src/js/Vec2.js ***!
  \************************/
/*! exports provided: Vec2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Vec2", function() { return Vec2; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Vec2 = /*#__PURE__*/function () {
  function Vec2(x, y) {
    _classCallCheck(this, Vec2);

    this.x = x;
    this.y = y;
  }

  _createClass(Vec2, [{
    key: "length",
    value: function length() {
      return Math.sqrt(this.x * this.x + this.y * this.y);
    }
  }, {
    key: "add",
    value: function add(vec) {
      return new Vec2(vec.x + this.x, vec.y + this.y);
    }
  }, {
    key: "subtract",
    value: function subtract(vec) {
      return new Vec2(this.x - vec.x, this.y - vec.y);
    }
  }, {
    key: "scale",
    value: function scale(n) {
      return new Vec2(this.x * n, this.y * n);
    }
  }, {
    key: "dot",
    value: function dot(vec) {
      return this.x * vec.x + this.y * vec.y;
    }
  }, {
    key: "cross",
    value: function cross(vec) {
      return this.x * vec.y - this.y * vec.x;
    }
  }, {
    key: "normalize",
    value: function normalize() {
      var len = this.length();

      if (len > 0) {
        len = 1 / len;
      }

      return new Vec2(this.x * len, this.y * len);
    }
  }, {
    key: "rotate",
    value: function rotate(center, angle) {
      //rotate in counterclockwise
      var r = [];
      var x = this.x - center.x;
      var y = this.y - center.y;
      r[0] = x * Math.cos(angle) - y * Math.sin(angle);
      r[1] = x * Math.sin(angle) + y * Math.cos(angle);
      r[0] += center.x;
      r[1] += center.y;
      return new Vec2(r[0], r[1]);
    }
  }, {
    key: "distance",
    value: function distance(vec) {
      var x = this.x - vec.x;
      var y = this.y - vec.y;
      return Math.sqrt(x * x + y * y);
    }
  }]);

  return Vec2;
}();

/***/ }),

/***/ "./src/js/canvas.js":
/*!**************************!*\
  !*** ./src/js/canvas.js ***!
  \**************************/
/*! exports provided: canvas, c, init, distance */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "canvas", function() { return canvas; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return c; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "init", function() { return init; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "distance", function() { return distance; });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/js/utils.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_utils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Ball__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Ball */ "./src/js/Ball.js");
/* harmony import */ var _Rectangle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Rectangle */ "./src/js/Rectangle.js");
/* harmony import */ var _Vec2__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Vec2 */ "./src/js/Vec2.js");
/* harmony import */ var _Player__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Player */ "./src/js/Player.js");
/* harmony import */ var _StickBox__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./StickBox */ "./src/js/StickBox.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }







var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;
var charInput = false;
var moving = false;
var line = [];
var mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
};
/** PlaceHolder line for shooting directions */

var Line = /*#__PURE__*/function () {
  function Line(x, y, toX, toY) {
    _classCallCheck(this, Line);

    this.x = x;
    this.y = y;
    this.toX = toX;
    this.toY = toY;
  }

  _createClass(Line, [{
    key: "update",
    value: function update() {
      this.draw();
    }
  }, {
    key: "draw",
    value: function draw() {
      c.beginPath();
      c.moveTo(this.x, this.y);
      c.lineTo(mouse.x, mouse.y);
      c.stroke();
      c.strokeStyle = 'black';
    }
  }]);

  return Line;
}();

var colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']; // Event Listeners

addEventListener('mousemove', function (event) {
  if (moving) {
    placeH.center.y = event.clientY;
    placeH.center.x = event.clientX;
  }
});
addEventListener('keydown', function (event) {
  player.controll(event.key, true);
});
addEventListener('keyup', function (event) {
  player.controll(event.key, false);
});
addEventListener('resize', function () {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  init();
});
var placeH = null;
var extra = {
  x: null,
  y: null,
  width: null,
  height: null
};
addEventListener('mousedown', function (event) {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
  placeH = new _Rectangle__WEBPACK_IMPORTED_MODULE_2__["Rectangle"](new _Vec2__WEBPACK_IMPORTED_MODULE_3__["Vec2"](mouse.x, mouse.y), 100, 20, 0, 'green', 0);
  moving = true;
});
addEventListener('mouseup', function (event) {
  moving = false;
  rectArray.push(placeH);
  placeH = null;
}); // Implementation

var ballArray = [];
var rectArray = [];
var player = null;
var stickyBox = null;
function init() {
  ballArray = [];
  stickyBox = new _StickBox__WEBPACK_IMPORTED_MODULE_5__["StickBox"](100, 100, 100, 100);
  player = new _Player__WEBPACK_IMPORTED_MODULE_4__["Player"](new _Vec2__WEBPACK_IMPORTED_MODULE_3__["Vec2"](canvas.width / 2, canvas.height / 2), 20, 20, new _Vec2__WEBPACK_IMPORTED_MODULE_3__["Vec2"](0, 0), 'blue', 0);
  rectArray.push(new _Rectangle__WEBPACK_IMPORTED_MODULE_2__["Rectangle"](new _Vec2__WEBPACK_IMPORTED_MODULE_3__["Vec2"](canvas.width / 2, canvas.height - 50), 100, 20, new _Vec2__WEBPACK_IMPORTED_MODULE_3__["Vec2"](0, 0), 'green', 0));
  rectArray.push(new _Rectangle__WEBPACK_IMPORTED_MODULE_2__["Rectangle"](new _Vec2__WEBPACK_IMPORTED_MODULE_3__["Vec2"](canvas.width / 2 + 100, canvas.height - 150), 100, 20, new _Vec2__WEBPACK_IMPORTED_MODULE_3__["Vec2"](0, 0), 'green', 0));

  for (var i = 0; i < 7; i++) {
    var radius = 30;
    var x = _utils__WEBPACK_IMPORTED_MODULE_0___default.a.randomIntFromRange(radius, canvas.width - radius);
    var y = _utils__WEBPACK_IMPORTED_MODULE_0___default.a.randomIntFromRange(radius, canvas.height - radius);
    var dx = _utils__WEBPACK_IMPORTED_MODULE_0___default.a.randomIntFromRange(-3, 3);
    var dy = _utils__WEBPACK_IMPORTED_MODULE_0___default.a.randomIntFromRange(-2, 2);

    if (i !== 0) {
      for (var j = 0; j < ballArray.length; j++) {
        var prev = ballArray[j];

        if (distance(x, y, prev.x, prev.y) - radius * 2 < 0) {
          var x = _utils__WEBPACK_IMPORTED_MODULE_0___default.a.randomIntFromRange(radius, canvas.width - radius);
          var y = _utils__WEBPACK_IMPORTED_MODULE_0___default.a.randomIntFromRange(radius, canvas.height - radius);
          j = -1;
        }
      }
    }

    ballArray.push(new _Ball__WEBPACK_IMPORTED_MODULE_1__["Ball"](x, y, dx, dy, radius, 'blue', false));
  }
}
function distance(x1, y1, x2, y2) {
  var xDist = x2 - x1;
  var yDist = y2 - y1;
  return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
} // Animation Loop

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  ballArray.forEach(function (ball) {
    ball.update(ballArray, rectArray);
  });

  if (line) {
    line.forEach(function (li) {
      li.update();
    });
  }

  rectArray.forEach(function (rect) {
    rect.update();
  });
  player.update(rectArray, ballArray);
  stickyBox.update();

  if (placeH) {
    placeH.update();
  }
}

init();
animate();

/***/ }),

/***/ "./src/js/utils.js":
/*!*************************!*\
  !*** ./src/js/utils.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)];
}

function distance(x1, y1, x2, y2) {
  var xDist = x2 - x1;
  var yDist = y2 - y1;
  return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}

module.exports = {
  randomIntFromRange: randomIntFromRange,
  randomColor: randomColor,
  distance: distance
};

/***/ })

/******/ });
//# sourceMappingURL=canvas.bundle.js.map