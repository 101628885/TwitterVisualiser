"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _webglUtils = require("../webgl-utils");

var _resource = _interopRequireDefault(require("./resource"));

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

var Sampler = function (_Resource) {
  _inherits(Sampler, _Resource);

  _createClass(Sampler, null, [{
    key: "isSupported",
    value: function isSupported(gl) {
      return (0, _webglUtils.isWebGL2)(gl);
    }
  }]);

  function Sampler(gl, opts) {
    var _this;

    _classCallCheck(this, Sampler);

    (0, _webglUtils.assertWebGL2Context)(gl);
    _this = _possibleConstructorReturn(this, _getPrototypeOf(Sampler).call(this, gl, opts));
    Object.seal(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(Sampler, [{
    key: "bind",
    value: function bind(unit) {
      this.gl.bindSampler(unit, this.handle);
      return this;
    }
  }, {
    key: "unbind",
    value: function unbind(unit) {
      this.gl.bindSampler(unit, null);
      return this;
    }
  }, {
    key: "_createHandle",
    value: function _createHandle() {
      return this.gl.createSampler();
    }
  }, {
    key: "_deleteHandle",
    value: function _deleteHandle() {
      this.gl.deleteSampler(this.handle);
    }
  }, {
    key: "_getParameter",
    value: function _getParameter(pname) {
      return this.gl.getSamplerParameter(this.handle, pname);
    }
  }, {
    key: "_setParameter",
    value: function _setParameter(pname, param) {
      switch (pname) {
        case 33082:
        case 33083:
          this.gl.samplerParameterf(this.handle, pname, param);
          break;

        default:
          this.gl.samplerParameteri(this.handle, pname, param);
          break;
      }

      return this;
    }
  }]);

  return Sampler;
}(_resource.default);

exports.default = Sampler;
//# sourceMappingURL=sampler.js.map