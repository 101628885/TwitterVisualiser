"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _webglUtils = require("../webgl-utils");

var _contextState = require("../webgl-context/context-state");

var _texture = _interopRequireDefault(require("../webgl/texture"));

var _buffer = _interopRequireDefault(require("./buffer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

var Texture3D = function (_Texture) {
  _inherits(Texture3D, _Texture);

  _createClass(Texture3D, null, [{
    key: "isSupported",
    value: function isSupported(gl) {
      return (0, _webglUtils.isWebGL2)(gl);
    }
  }]);

  function Texture3D(gl) {
    var _this;

    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Texture3D);

    (0, _webglUtils.assertWebGL2Context)(gl);
    _this = _possibleConstructorReturn(this, _getPrototypeOf(Texture3D).call(this, gl, Object.assign({}, opts, {
      target: opts.target || 32879
    })));
    _this.width = null;
    _this.height = null;
    _this.depth = null;
    Object.seal(_assertThisInitialized(_assertThisInitialized(_this)));

    _this.setImageData(opts);

    if (opts.generateMipmap) {
      _this.generateMipmap();
    }

    return _this;
  }

  _createClass(Texture3D, [{
    key: "initialize",
    value: function initialize() {
      var _this2 = this;

      var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      this.opts = Object.assign({}, this.opts, opts);
      var _this$opts = this.opts,
          pixels = _this$opts.pixels,
          settings = _this$opts.settings;

      if (settings) {
        (0, _contextState.withParameters)(settings, function () {
          if (pixels) {
            _this2.setImage3D(_this2.opts);
          }
        });
        this.setParameters(opts);
      }
    }
  }, {
    key: "setImage3D",
    value: function setImage3D(_ref) {
      var _ref$level = _ref.level,
          level = _ref$level === void 0 ? 0 : _ref$level,
          _ref$internalformat = _ref.internalformat,
          internalformat = _ref$internalformat === void 0 ? 6408 : _ref$internalformat,
          width = _ref.width,
          height = _ref.height,
          _ref$depth = _ref.depth,
          depth = _ref$depth === void 0 ? 1 : _ref$depth,
          _ref$border = _ref.border,
          border = _ref$border === void 0 ? 0 : _ref$border,
          format = _ref.format,
          _ref$type = _ref.type,
          type = _ref$type === void 0 ? 5121 : _ref$type,
          _ref$offset = _ref.offset,
          offset = _ref$offset === void 0 ? 0 : _ref$offset,
          pixels = _ref.pixels;

      if (ArrayBuffer.isView(pixels)) {
        this.gl.texImage3D(this.target, level, internalformat, width, height, depth, border, format, type, pixels);
        return;
      }

      if (pixels instanceof _buffer.default) {
        this.gl.bindBuffer(35052, pixels.handle);
        this.gl.texImage3D(this.target, level, internalformat, width, height, depth, border, format, type, offset);
        this.gl.bindBuffer(35052, pixels.handle);
      }
    }
  }]);

  return Texture3D;
}(_texture.default);

exports.default = Texture3D;
//# sourceMappingURL=texture-3d.js.map