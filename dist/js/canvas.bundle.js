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
    this.velocity = {
      x: dx,
      y: dy
    };
    this.radius = radius;
    this.color = color;
    this.mass = 1;
    this.placeHolder = placeHolder;
  }

  _createClass(Ball, [{
    key: "update",
    value: function update(balls) {
      if (!this.placeHolder) {
        var coll = false;

        for (var i = 0; i < balls.length; i++) {
          if (this === balls[i]) continue;
          var prev = balls[i];

          if (Object(_canvas__WEBPACK_IMPORTED_MODULE_0__["distance"])(this.x + this.velocity.x, this.y + this.velocity.y, prev.x, prev.y) - this.radius * 2 < 0) {
            resolveCollision(this, balls[i]);
            coll = true;
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
        this.y += this.velocity.y; // if (this.y + this.radius + this.velocity.y > this.canvas.height) {
        // 	this.velocity.y = -this.velocity.y;
        // 	this.velocity.y = this.velocity.y * friction;
        // 	this.velocity.x = this.velocity.x * friction;
        // } else {
        // 	this.velocity.y += gravity;
        // }
        // if (this.x + this.radius >= this.canvas.width || this.x - this.radius <= 0) {
        // 	this.velocity.x = -this.velocity.x * friction;
        // }
        // this.x += this.velocity.x;
        // this.y += this.velocity.y;
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

function resolveCollision(ball, otherBall) {
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
}

function rotate(velocity, angle) {
  var rotatedVelocities = {
    x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
    y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
  };
  return rotatedVelocities;
}

/***/ }),

/***/ "./src/js/canvas.js":
/*!**************************!*\
  !*** ./src/js/canvas.js ***!
  \**************************/
/*! exports provided: canvas, c, distance */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "canvas", function() { return canvas; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return c; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "distance", function() { return distance; });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/js/utils.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_utils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Ball__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Ball */ "./src/js/Ball.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;
var moving = false;
var line = [];
var mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
};

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
    mouse.x = event.clientX;
    mouse.y = event.clientY;
  }
});
addEventListener('resize', function () {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  init();
});
var extra = {
  x: null,
  y: null,
  xd: null,
  xy: null
};
addEventListener('mousedown', function (event) {
  moving = true;
  extra.x = event.clientX;
  extra.y = event.clientY;
  line.push(new Line(extra.x, extra.y, mouse.x, mouse.y));
  ballArray.push(new _Ball__WEBPACK_IMPORTED_MODULE_1__["Ball"](extra.x, extra.y, 0, 0, 30, 'green', true));
});
addEventListener('mouseup', function (event) {
  moving = false;
  line.pop();
  ballArray.pop();
  ballArray.push(new _Ball__WEBPACK_IMPORTED_MODULE_1__["Ball"](extra.x, extra.y, -(event.clientX - extra.x) / 10, -(event.clientY - extra.y) / 10, 30, 'red', false));
}); // Implementation

var ballArray = [];

function init() {
  ballArray = [];

  for (var i = 0; i < 40; i++) {
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
    ball.update(ballArray);
  });

  if (line) {
    line.forEach(function (li) {
      li.update();
    });
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