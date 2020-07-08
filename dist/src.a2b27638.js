// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/ship.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Ship = /*#__PURE__*/function () {
  //
  function Ship(game) {
    _classCallCheck(this, Ship);

    this.image = document.getElementById("image_ship"); //

    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight; //

    this.game = game; //

    this.position = {
      x: 20,
      y: 400
    };
    this.cspeed = {
      r: 0,
      m: 0
    };
    this.tspeed = {
      r: 0,
      m: 0
    };
    this.size = 20;
    this.rotation = 0; //

    this.rc = 150; //rotation change: _ per second

    this.mc = 300; //move change: _ per second

    this.ds = 500; //decay speed: _ per second
  } //


  _createClass(Ship, [{
    key: "turnLeft",
    value: function turnLeft() {
      this.tspeed.r = -this.rc;
    } //

  }, {
    key: "turnRight",
    value: function turnRight() {
      this.tspeed.r = this.rc;
    } //

  }, {
    key: "stopRot",
    value: function stopRot() {
      this.tspeed.r = 0;
    } //

  }, {
    key: "moveForward",
    value: function moveForward() {
      this.tspeed.m = this.mc;
    } //

  }, {
    key: "moveBackward",
    value: function moveBackward() {
      this.tspeed.m = -this.mc;
    } //

  }, {
    key: "stopMove",
    value: function stopMove() {
      this.tspeed.m = 0;
    } //

  }, {
    key: "draw",
    value: function draw(ctx) {
      var ux = this.position.x + this.size / 2;
      var uy = this.position.y + this.size / 2;
      ctx.translate(ux, uy);
      ctx.rotate(toRadians(this.rotation));
      ctx.translate(-ux, -uy);
      ctx.drawImage(this.image, this.position.x, this.position.y, this.size, this.size);
      ctx.translate(ux, uy);
      ctx.rotate(-toRadians(this.rotation));
      ctx.translate(-ux, -uy);
    } //

  }, {
    key: "update",
    value: function update(deltaTime) {
      this.rotation += this.cspeed.r / 1000 * deltaTime;

      if (this.rotation > 180) {
        this.rotation -= 360;
      } else if (this.rotation < -180) {
        this.rotation += 360;
      }

      this.position.x += this.cspeed.m / 1000 * deltaTime * Math.cos(toRadians(this.rotation));
      this.position.y += this.cspeed.m / 1000 * deltaTime * Math.sin(toRadians(this.rotation)); //

      var use = 0; //

      if (this.cspeed.r != this.tspeed.r) {
        //does ROTATION speed require acceleration?
        //
        use = this.ds / 1000 * deltaTime; //change amount allowed

        if (this.tspeed.r > this.cspeed.r) {
          //acceleration is positive
          if (this.cspeed.r + use > this.tspeed.r) {
            //acceleration exceeds speed cap
            this.cspeed.r = this.tspeed.r;
          } else {
            //it doesn't
            this.cspeed.r = this.cspeed.r + use;
          }
        } else {
          //acceleration is negative
          if (this.cspeed.r - use < this.tspeed.r) {
            //acceleration exceeds speed cap
            this.cspeed.r = this.tspeed.r;
          } else {
            //it doesn't
            this.cspeed.r = this.cspeed.r - use;
          }
        }
      } //


      if (this.cspeed.m != this.tspeed.m) {
        //does MOVE speed require acceleration?
        //
        use = this.ds / 1000 * deltaTime; //change amount allowed

        if (this.tspeed.m > this.cspeed.m) {
          //accel. is positive
          if (this.cspeed.m + use > this.tspeed.m) {
            //accel. exceeds speed cap
            this.cspeed.m = this.tspeed.m;
          } else {
            //it doesn't
            this.cspeed.m = this.cspeed.m + use;
          }
        } else {
          //accel. is negative
          if (this.cspeed.m - use < this.tspeed.m) {
            //accel. exceeds speed cap
            this.cspeed.m = this.tspeed.m;
          } else {
            //it doesn't
            this.cspeed.m = this.cspeed.m - use;
          }
        }
      } //
      //wall on left or right


      if (this.position.x + this.size > this.gameWidth) {
        this.position.x = 0;
        this.position.y = this.gameHeight - this.size - this.position.y;
      } else if (this.position.x < 0) {
        this.position.x = this.gameWidth - this.size;
        this.position.y = this.gameHeight - this.size - this.position.y;
      } //
      //wall on top or bottom


      if (this.position.y + this.size > this.gameHeight) {
        this.position.y = 0;
        this.position.x = this.gameWidth - this.size - this.position.x;
      } else if (this.position.y < 0) {
        this.position.y = this.gameHeight - this.size;
        this.position.x = this.gameWidth - this.size - this.position.x;
      } //

      /*if (detectCollision(this, this.game.paddle)) {
        this.speed.y = -this.speed.y;
        this.position.y = this.game.paddle.position.y - this.size;
      }*/

    }
  }]);

  return Ship;
}();

exports.default = Ship;

function toDegrees(angle) {
  return angle * (180 / Math.PI);
}

function toRadians(angle) {
  return angle * (Math.PI / 180);
}
},{}],"src/bolt.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Bolt = /*#__PURE__*/function () {
  //
  function Bolt(game, position, rotation) {
    _classCallCheck(this, Bolt);

    //
    this.image = document.getElementById("image_bolt"); //

    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight; //

    this.game = game; //

    this.speed = 500; //_ per second

    this.width = 16;
    this.height = 6;
    this.rotation = rotation;
    var hyp = pythagorus(this.width, this.height); //this.position = { x: (position.x + (hyp * Math.cos(toRadians(this.rotation))) / 2), y: (position.y + (hyp * Math.sin(toRadians(this.rotation))) / 2)};

    this.position = position; //

    this.markedForDeletion = false;
  } //


  _createClass(Bolt, [{
    key: "draw",
    value: function draw(ctx) {
      var ux = this.position.x + this.width / 2;
      var uy = this.position.y + this.height / 2;
      ctx.translate(ux, uy); //adjust to rotate

      ctx.rotate(toRadians(this.rotation)); //rotate

      ctx.translate(-ux, -uy);
      ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
      ctx.translate(ux, uy);
      ctx.rotate(-toRadians(this.rotation));
      ctx.translate(-ux, -uy);
    } //

  }, {
    key: "update",
    value: function update(deltaTime) {
      this.position.x += this.speed / 1000 * deltaTime * Math.cos(toRadians(this.rotation));
      this.position.y += this.speed / 1000 * deltaTime * Math.sin(toRadians(this.rotation)); //

      if (this.position.x > this.gameWidth - this.width //is the bolt touching the edge?
      || this.position.x < 0 || this.position.y > this.gameHeight - this.height || this.position.y < 0) {
        this.markedForDeletion = true;
      }
    }
  }]);

  return Bolt;
}();

exports.default = Bolt;

function toDegrees(angle) {
  return angle * (180 / Math.PI);
}

function toRadians(angle) {
  return angle * (Math.PI / 180);
}

function pythagorus(a, b) {
  return Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
}
},{}],"src/aster.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Aster = /*#__PURE__*/function () {
  //
  function Aster(game) {
    _classCallCheck(this, Aster);

    this.image = document.getElementById("image_aster"); //

    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight; //

    this.game = game; //

    this.speed = 100 + Math.random() * 200; //move speed: _ per second

    this.rotspeed = 20 * Math.random() * 50; //rotation speed: _ per second

    this.size = Math.random() * 50 + 30;
    this.rotation = 0;
    this.vrot = 0;
    var bin = Math.floor(Math.random() * 1.99);

    if (Math.random() < .5) {
      this.side = "horz";
      this.position = {
        x: bin * (this.gameWidth + 2 * this.size) - this.size,
        y: Math.random() * (this.gameHeight - this.size)
      };
      this.rotation = Math.random() * 180 - 90 - bin * 180;
    } else {
      this.side = "vert";
      this.position = {
        x: Math.random() * (this.gameWidth - this.size),
        y: bin * (this.gameHeight + 2 * this.size) - this.size
      };
      this.rotation = Math.random() * -180 + bin * 180;
    }

    this.revealed = false; //

    this.markedForDeletion = false;
  } //


  _createClass(Aster, [{
    key: "draw",
    value: function draw(ctx) {
      var ux = this.position.x + this.size / 2;
      var uy = this.position.y + this.size / 2;
      ctx.translate(ux, uy); //adjust to rotate

      ctx.rotate(toRadians(this.vrot)); //rotate

      ctx.translate(-ux, -uy);
      ctx.drawImage(this.image, this.position.x, this.position.y, this.size, this.size);
      ctx.translate(ux, uy);
      ctx.rotate(-toRadians(this.vrot));
      ctx.translate(-ux, -uy);
    } //

  }, {
    key: "update",
    value: function update(deltaTime) {
      this.vrot += this.rotspeed / 1000 * deltaTime;

      if (this.vrot > 180) {
        this.vrot -= 360;
      } else if (this.vrot < -180) {
        this.vrot += 360;
      } //


      this.position.x += this.speed / 1000 * deltaTime * Math.cos(toRadians(this.rotation));
      this.position.y -= this.speed / 1000 * deltaTime * Math.sin(toRadians(this.rotation)); //

      if (this.revealed) {
        //the asteroid has come out of the walls
        if (this.position.y > this.gameHeight - this.size) {
          this.position.y = 0;
        } else if (this.position.y < 0) {
          this.position.y = this.gameHeight - this.size;
        }

        if (this.position.x > this.gameWidth - this.size) {
          this.position.x = 0;
        } else if (this.position.x < 0) {
          this.position.x = this.gameWidth - this.size;
        }
      } else if (this.side == "horz") {
        //the asteroid is still in the left or right walls
        if (this.position.y > this.gameHeight - this.size) {
          this.position.y = 0;
        } else if (this.position.y < 0) {
          this.position.y = this.gameHeight - this.size;
        }

        if (this.position.x < this.gameWidth - this.size && this.position.x > 0) {
          this.revealed = true;
        }
      } else {
        //top or bottom walls
        if (this.position.x > this.gameWidth - this.size) {
          this.position.x = 0;
        } else if (this.position.x < 0) {
          this.position.x = this.gameWidth - this.size;
        }

        if (this.position.y < this.gameHeight - this.size && this.position.y > 0) {
          this.revealed = true;
        }
      }
    }
  }]);

  return Aster;
}();

exports.default = Aster;

function toDegrees(angle) {
  return angle * (180 / Math.PI);
}

function toRadians(angle) {
  return angle * (Math.PI / 180);
}
},{}],"src/input.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ship = _interopRequireDefault(require("./ship"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var InputHandler = function InputHandler(ship, game) {
  _classCallCheck(this, InputHandler);

  document.addEventListener("keydown", function (event) {
    switch (event.keyCode) {
      case 37:
        ship.turnLeft();
        break;
      //

      case 39:
        ship.turnRight();
        break;
      //

      case 38:
        ship.moveForward();
        break;
      //

      case 40:
        ship.moveBackward();
        break;
      //

      case 32:
        game.fire();
        break;
    }
  }); //

  document.addEventListener("keyup", function (event) {
    switch (event.keyCode) {
      case 37:
        if (ship.tspeed.r < 0) ship.stopRot();
        break;
      //

      case 39:
        if (ship.tspeed.r > 0) ship.stopRot();
        break;
      //

      case 38:
        if (ship.tspeed.m > 0) ship.stopMove();
        break;
      //

      case 40:
        if (ship.tspeed.m < 0) ship.stopMove();
        break;

      case 32:
        game.stopFire();
        break;
    }
  });
};

exports.default = InputHandler;
},{"./ship":"src/ship.js"}],"src/game.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ship = _interopRequireDefault(require("/src/ship"));

var _bolt = _interopRequireDefault(require("/src/bolt"));

var _aster = _interopRequireDefault(require("/src/aster"));

var _input = _interopRequireDefault(require("/src/input"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var GAMESTATE = {
  PAUSED: 0,
  RUNNING: 1,
  MENU: 2,
  GAMEOVER: 3
};

var Game = /*#__PURE__*/function () {
  //
  function Game(gameWidth, gameHeight) {
    _classCallCheck(this, Game);

    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight; //

    this.asteroids = new Array();
  } //


  _createClass(Game, [{
    key: "start",
    value: function start() {
      this.gamestate = GAMESTATE.RUNNING;
      this.ship = new _ship.default(this); //

      this.gameObjects = [this.ship].concat(_toConsumableArray(this.asteroids));
      this.firing = false;
      this.time = 0; //

      this.asteroids.push(new _aster.default(this)); //

      new _input.default(this.ship, this);
    } //

  }, {
    key: "update",
    value: function update(deltaTime) {
      if (this.gamestate === GAMESTATE.PAUSED) return; //

      this.gameObjects.forEach(function (object) {
        return object.update(deltaTime);
      }); //

      this.gameObjects = this.gameObjects.filter(function (object) {
        return !object.markedForDeletion;
      }); //

      if (this.firing) {
        var rot = this.ship.rotation;
        var size = this.ship.size;
        var fireP = {
          x: this.ship.position.x + (size - 3) * Math.cos(toRadians(rot)),
          y: this.ship.position.y + (size / 2 - 3) + (size - 3) * Math.sin(toRadians(rot))
        };
        this.gameObjects.push(new _bolt.default(this, fireP, rot));
      } //


      this.time += deltaTime;

      if (this.time > 5000) {
        this.newAst();
        this.time = 0;
      }
    } //

  }, {
    key: "draw",
    value: function draw(ctx) {
      this.gameObjects.forEach(function (object) {
        return object.draw(ctx);
      }); //

      if (this.gamestate === GAMESTATE.PAUSED) {
        ctx.rect(0, 0, this.gameWidth, this.gameHeight);
        ctx.fillStyle = "rgba(0,0,0,0.5)";
        ctx.fill();
      }
    } //

  }, {
    key: "fire",
    value: function fire() {
      this.firing = true;
    } //

  }, {
    key: "stopFire",
    value: function stopFire() {
      this.firing = false;
    } //

  }, {
    key: "newAst",
    value: function newAst() {
      this.asteroids.push(new _aster.default(this));
      console.log("Hello!");
    } //

    /*togglePause() {
      if (this.gamestate === GAMESTATE.PAUSED) {
        this.gamestate = GAMESTATE.RUNNING;
      } else {
        this.gamestate = GAMESTATE.PAUSED;
      }
    }*/

  }]);

  return Game;
}();

exports.default = Game;

function toDegrees(angle) {
  return angle * (180 / Math.PI);
}

function toRadians(angle) {
  return angle * (Math.PI / 180);
}
},{"/src/ship":"src/ship.js","/src/bolt":"src/bolt.js","/src/aster":"src/aster.js","/src/input":"src/input.js"}],"src/index.js":[function(require,module,exports) {
"use strict";

var _game = _interopRequireDefault(require("/src/game"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var canvas = document.getElementById("gameScreen");
var ctx = canvas.getContext("2d");
var GAME_WIDTH = window.innerWidth - 30;
var GAME_HEIGHT = window.innerHeight - 30;
canvas.width = GAME_WIDTH;
canvas.height = GAME_HEIGHT;
var game = new _game.default(GAME_WIDTH, GAME_HEIGHT);
game.start();
ctx.clearRect(0, 0, 800, 800);
var lastTime = 0;

function gameLoop(timeStamp) {
  var deltaTime = timeStamp - lastTime;
  lastTime = timeStamp; //

  game.update(deltaTime);
  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  game.draw(ctx); //

  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
},{"/src/game":"src/game.js"}],"../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "58965" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.js"], null)
//# sourceMappingURL=/src.a2b27638.js.map