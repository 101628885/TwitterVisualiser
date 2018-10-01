"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _core = require("../core");

var _geometry = require("../geometry");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var CLIPSPACE_VERTEX_SHADER = "attribute vec2 aClipSpacePosition;\nattribute vec2 aTexCoord;\nattribute vec2 aCoordinate;\n\nvarying vec2 position;\nvarying vec2 coordinate;\nvarying vec2 uv;\n\nvoid main(void) {\n  gl_Position = vec4(aClipSpacePosition, 0., 1.);\n  position = aClipSpacePosition;\n  coordinate = aCoordinate;\n  uv = aTexCoord;\n}\n";
var POSITIONS = [-1, -1, 1, -1, -1, 1, 1, 1];

var ClipSpace = function (_Model) {
  _inherits(ClipSpace, _Model);

  function ClipSpace(gl, opts) {
    var _this;

    _classCallCheck(this, ClipSpace);

    var TEX_COORDS = POSITIONS.map(function (coord) {
      return coord === -1 ? 0 : coord;
    });
    _this = _possibleConstructorReturn(this, _getPrototypeOf(ClipSpace).call(this, gl, Object.assign({}, opts, {
      vs: CLIPSPACE_VERTEX_SHADER,
      geometry: new _geometry.Geometry({
        drawMode: 5,
        vertexCount: 4,
        attributes: {
          aClipSpacePosition: {
            size: 2,
            value: new Float32Array(POSITIONS)
          },
          aTexCoord: {
            size: 2,
            value: new Float32Array(TEX_COORDS)
          },
          aCoordinate: {
            size: 2,
            value: new Float32Array(TEX_COORDS)
          }
        }
      })
    })));

    _this.setVertexCount(4);

    return _this;
  }

  return ClipSpace;
}(_core.Model);

exports.default = ClipSpace;
//# sourceMappingURL=clip-space.js.map