"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _resource = _interopRequireDefault(require("./resource"));

var _webglUtils = require("../webgl-utils");

var _utils = require("../utils");

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

var TransformFeedback = function (_Resource) {
  _inherits(TransformFeedback, _Resource);

  _createClass(TransformFeedback, null, [{
    key: "isSupported",
    value: function isSupported(gl) {
      return (0, _webglUtils.isWebGL2)(gl);
    }
  }]);

  function TransformFeedback(gl) {
    var _this;

    var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, TransformFeedback);

    (0, _webglUtils.assertWebGL2Context)(gl);
    _this = _possibleConstructorReturn(this, _getPrototypeOf(TransformFeedback).call(this, gl, props));

    _this.initialize(props);

    _this.stubRemovedMethods('TransformFeedback', 'v6.0', ['pause', 'resume']);

    Object.seal(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(TransformFeedback, [{
    key: "initialize",
    value: function initialize() {
      var _this2 = this;

      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      this.buffers = {};
      this.unused = {};
      this.configuration = null;
      this.bindOnUse = true;

      if (!(0, _utils.isObjectEmpty)(this.buffers)) {
        this.bind(function () {
          return _this2._unbindBuffers();
        });
      }

      this.setProps(props);
      return this;
    }
  }, {
    key: "setProps",
    value: function setProps(props) {
      if ('program' in props) {
        this.configuration = props.program && props.program.configuration;
      }

      if ('configuration' in props) {
        this.configuration = props.configuration;
      }

      if ('bindOnUse' in props) {
        props = props.bindOnUse;
      }

      if ('buffers' in props) {
        this.setBuffers(props.buffers);
      }
    }
  }, {
    key: "setBuffers",
    value: function setBuffers() {
      var _this3 = this;

      var buffers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      this.bind(function () {
        for (var bufferName in buffers) {
          _this3.setBuffer(bufferName, buffers[bufferName]);
        }
      });
      return this;
    }
  }, {
    key: "setBuffer",
    value: function setBuffer(locationOrName, buffer, size) {
      var _this4 = this;

      var offset = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

      var location = this._getVaryingIndex(locationOrName);

      if (location < 0) {
        this.unused[locationOrName] = buffer;

        _utils.log.warn(function () {
          return "".concat(_this4.id, " unused varying buffer ").concat(locationOrName);
        })();

        return this;
      }

      this.buffers[location] = buffer;

      if (!this.bindOnUse) {
        this._bindBuffer(location, buffer, size, offset);
      }

      return this;
    }
  }, {
    key: "begin",
    value: function begin() {
      var primitiveMode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      this.gl.bindTransformFeedback(36386, this.handle);

      this._bindBuffers();

      this.gl.beginTransformFeedback(primitiveMode);
      return this;
    }
  }, {
    key: "end",
    value: function end() {
      this.gl.endTransformFeedback();

      this._unbindBuffers();

      this.gl.bindTransformFeedback(36386, null);
      return this;
    }
  }, {
    key: "_getVaryingInfo",
    value: function _getVaryingInfo(locationOrName) {
      return this.configuration && this.configuration.getVaryingInfo(locationOrName);
    }
  }, {
    key: "_getVaryingIndex",
    value: function _getVaryingIndex(locationOrName) {
      if (this.configuration) {
        return this.configuration.getVaryingInfo(locationOrName).location;
      }

      var location = Number(locationOrName);
      return Number.isFinite(location) ? location : -1;
    }
  }, {
    key: "_bindBuffers",
    value: function _bindBuffers() {
      if (this.bindOnUse) {
        for (var bufferIndex in this.buffers) {
          this._bindBuffer(bufferIndex, this.buffers[bufferIndex]);
        }
      }
    }
  }, {
    key: "_unbindBuffers",
    value: function _unbindBuffers() {
      if (this.bindOnUse) {
        for (var bufferIndex in this.buffers) {
          this._bindBuffer(bufferIndex, null);
        }
      }
    }
  }, {
    key: "_bindBuffer",
    value: function _bindBuffer(index, buffer) {
      var offset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var size = arguments.length > 3 ? arguments[3] : undefined;
      var handle = buffer && buffer.handle;

      if (!handle || size === undefined) {
        this.gl.bindBufferBase(35982, index, handle);
      } else {
        this.gl.bindBufferRange(35982, index, handle, offset, size);
      }

      return this;
    }
  }, {
    key: "_createHandle",
    value: function _createHandle() {
      return this.gl.createTransformFeedback();
    }
  }, {
    key: "_deleteHandle",
    value: function _deleteHandle() {
      this.gl.deleteTransformFeedback(this.handle);
    }
  }, {
    key: "_bindHandle",
    value: function _bindHandle(handle) {
      this.gl.bindTransformFeedback(36386, this.handle);
    }
  }]);

  return TransformFeedback;
}(_resource.default);

exports.default = TransformFeedback;
//# sourceMappingURL=transform-feedback.js.map