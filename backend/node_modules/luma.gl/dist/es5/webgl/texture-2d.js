"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _texture = _interopRequireDefault(require("./texture"));

var _webglUtils = require("../webgl-utils");

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

var Texture2D = function (_Texture) {
  _inherits(Texture2D, _Texture);

  _createClass(Texture2D, null, [{
    key: "isSupported",
    value: function isSupported(gl, opts) {
      return _texture.default.isSupported(gl, opts);
    }
  }]);

  function Texture2D(gl) {
    var _this;

    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Texture2D);

    (0, _webglUtils.assertWebGLContext)(gl);
    _this = _possibleConstructorReturn(this, _getPrototypeOf(Texture2D).call(this, gl, Object.assign({}, opts, {
      target: 3553
    })));

    _this.initialize(opts);

    Object.seal(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(Texture2D, [{
    key: "bind",
    value: function bind() {
      var textureUnit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.textureUnit;
      var gl = this.gl;

      if (textureUnit === undefined) {
        throw new Error('Texture.bind: must specify texture unit');
      }

      this.textureUnit = textureUnit;
      gl.activeTexture(33984 + textureUnit);
      gl.bindTexture(this.target, this.handle);
      return textureUnit;
    }
  }, {
    key: "unbind",
    value: function unbind() {
      var gl = this.gl;

      if (this.textureUnit === undefined) {
        throw new Error('Texture.unbind: texture unit not specified');
      }

      gl.activeTexture(33984 + this.textureUnit);
      gl.bindTexture(this.target, null);
      return this.textureUnit;
    }
  }, {
    key: "getActiveUnit",
    value: function getActiveUnit() {
      return this.gl.getParameter(34016) - 33984;
    }
  }]);

  return Texture2D;
}(_texture.default);

exports.default = Texture2D;
//# sourceMappingURL=texture-2d.js.map