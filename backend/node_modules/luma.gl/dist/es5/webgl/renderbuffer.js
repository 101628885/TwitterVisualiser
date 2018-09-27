"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.RENDERBUFFER_FORMATS = void 0;

var _webglUtils = require("../webgl-utils");

var _resource = _interopRequireDefault(require("./resource"));

var _assert = _interopRequireDefault(require("../utils/assert"));

var _RENDERBUFFER_FORMATS;

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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var GL_RENDERBUFFER = 0x8D41;
var GL_SAMPLES = 0x80A9;
var GL_RENDERBUFFER_WIDTH = 0x8D42;
var GL_RENDERBUFFER_HEIGHT = 0x8D43;
var GL_RENDERBUFFER_INTERNAL_FORMAT = 0x8D44;
var GL_RENDERBUFFER_SAMPLES = 0x8CAB;
var CB_FLOAT_WEBGL2 = 'EXT_color_buffer_float';
var RENDERBUFFER_FORMATS = (_RENDERBUFFER_FORMATS = {}, _defineProperty(_RENDERBUFFER_FORMATS, 33189, {}), _defineProperty(_RENDERBUFFER_FORMATS, 33190, {
  gl2: true
}), _defineProperty(_RENDERBUFFER_FORMATS, 36012, {
  gl2: true
}), _defineProperty(_RENDERBUFFER_FORMATS, 36168, {}), _defineProperty(_RENDERBUFFER_FORMATS, 34041, {}), _defineProperty(_RENDERBUFFER_FORMATS, 35056, {
  gl2: true
}), _defineProperty(_RENDERBUFFER_FORMATS, 36013, {
  gl2: true
}), _defineProperty(_RENDERBUFFER_FORMATS, 32854, {}), _defineProperty(_RENDERBUFFER_FORMATS, 36194, {}), _defineProperty(_RENDERBUFFER_FORMATS, 32855, {}), _defineProperty(_RENDERBUFFER_FORMATS, 33321, {
  gl2: true
}), _defineProperty(_RENDERBUFFER_FORMATS, 33330, {
  gl2: true
}), _defineProperty(_RENDERBUFFER_FORMATS, 33329, {
  gl2: true
}), _defineProperty(_RENDERBUFFER_FORMATS, 33332, {
  gl2: true
}), _defineProperty(_RENDERBUFFER_FORMATS, 33331, {
  gl2: true
}), _defineProperty(_RENDERBUFFER_FORMATS, 33334, {
  gl2: true
}), _defineProperty(_RENDERBUFFER_FORMATS, 33333, {
  gl2: true
}), _defineProperty(_RENDERBUFFER_FORMATS, 33323, {
  gl2: true
}), _defineProperty(_RENDERBUFFER_FORMATS, 33336, {
  gl2: true
}), _defineProperty(_RENDERBUFFER_FORMATS, 33335, {
  gl2: true
}), _defineProperty(_RENDERBUFFER_FORMATS, 33338, {
  gl2: true
}), _defineProperty(_RENDERBUFFER_FORMATS, 33337, {
  gl2: true
}), _defineProperty(_RENDERBUFFER_FORMATS, 33340, {
  gl2: true
}), _defineProperty(_RENDERBUFFER_FORMATS, 33339, {
  gl2: true
}), _defineProperty(_RENDERBUFFER_FORMATS, 32849, {
  gl2: true
}), _defineProperty(_RENDERBUFFER_FORMATS, 32856, {
  gl2: true
}), _defineProperty(_RENDERBUFFER_FORMATS, 32857, {
  gl2: true
}), _defineProperty(_RENDERBUFFER_FORMATS, 36220, {
  gl2: true
}), _defineProperty(_RENDERBUFFER_FORMATS, 36238, {
  gl2: true
}), _defineProperty(_RENDERBUFFER_FORMATS, 36975, {
  gl2: true
}), _defineProperty(_RENDERBUFFER_FORMATS, 36214, {
  gl2: true
}), _defineProperty(_RENDERBUFFER_FORMATS, 36232, {
  gl2: true
}), _defineProperty(_RENDERBUFFER_FORMATS, 36226, {
  gl2: true
}), _defineProperty(_RENDERBUFFER_FORMATS, 36208, {
  gl2: true
}), _defineProperty(_RENDERBUFFER_FORMATS, 33325, {
  gl2: CB_FLOAT_WEBGL2
}), _defineProperty(_RENDERBUFFER_FORMATS, 33327, {
  gl2: CB_FLOAT_WEBGL2
}), _defineProperty(_RENDERBUFFER_FORMATS, 34842, {
  gl2: CB_FLOAT_WEBGL2
}), _defineProperty(_RENDERBUFFER_FORMATS, 33326, {
  gl2: CB_FLOAT_WEBGL2
}), _defineProperty(_RENDERBUFFER_FORMATS, 33328, {
  gl2: CB_FLOAT_WEBGL2
}), _defineProperty(_RENDERBUFFER_FORMATS, 34836, {
  gl2: CB_FLOAT_WEBGL2
}), _defineProperty(_RENDERBUFFER_FORMATS, 35898, {
  gl2: CB_FLOAT_WEBGL2
}), _RENDERBUFFER_FORMATS);
exports.RENDERBUFFER_FORMATS = RENDERBUFFER_FORMATS;

function isFormatSupported(gl, format, formats) {
  var info = formats[format];

  if (!info) {
    return false;
  }

  var value = (0, _webglUtils.isWebGL2)(gl) ? info.gl2 || info.gl1 : info.gl1;

  if (typeof value === 'string') {
    return gl.getExtension(value);
  }

  return value;
}

var Renderbuffer = function (_Resource) {
  _inherits(Renderbuffer, _Resource);

  _createClass(Renderbuffer, null, [{
    key: "isSupported",
    value: function isSupported(gl) {
      var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          format = _ref.format;

      return !format || isFormatSupported(gl, format, RENDERBUFFER_FORMATS);
    }
  }, {
    key: "getSamplesForFormat",
    value: function getSamplesForFormat(gl, _ref2) {
      var format = _ref2.format;
      return gl.getInternalformatParameter(GL_RENDERBUFFER, format, GL_SAMPLES);
    }
  }]);

  function Renderbuffer(gl) {
    var _this;

    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Renderbuffer);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Renderbuffer).call(this, gl, opts));

    _this.initialize(opts);

    Object.seal(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(Renderbuffer, [{
    key: "initialize",
    value: function initialize(_ref3) {
      var format = _ref3.format,
          _ref3$width = _ref3.width,
          width = _ref3$width === void 0 ? 1 : _ref3$width,
          _ref3$height = _ref3.height,
          height = _ref3$height === void 0 ? 1 : _ref3$height,
          _ref3$samples = _ref3.samples,
          samples = _ref3$samples === void 0 ? 0 : _ref3$samples;
      (0, _assert.default)(format, 'Needs format');
      this.gl.bindRenderbuffer(GL_RENDERBUFFER, this.handle);

      if (samples !== 0 && (0, _webglUtils.isWebGL2)(this.gl)) {
        this.gl.renderbufferStorageMultisample(GL_RENDERBUFFER, samples, format, width, height);
      } else {
        this.gl.renderbufferStorage(GL_RENDERBUFFER, format, width, height);
      }

      this.format = format;
      this.width = width;
      this.height = height;
      this.samples = samples;
      return this;
    }
  }, {
    key: "resize",
    value: function resize(_ref4) {
      var width = _ref4.width,
          height = _ref4.height;

      if (width !== this.width || height !== this.height) {
        return this.initialize({
          width: width,
          height: height,
          format: this.format,
          samples: this.samples
        });
      }

      return this;
    }
  }, {
    key: "_createHandle",
    value: function _createHandle() {
      return this.gl.createRenderbuffer();
    }
  }, {
    key: "_deleteHandle",
    value: function _deleteHandle() {
      this.gl.deleteRenderbuffer(this.handle);
    }
  }, {
    key: "_bindHandle",
    value: function _bindHandle(handle) {
      this.gl.bindRenderbuffer(GL_RENDERBUFFER, handle);
    }
  }, {
    key: "_syncHandle",
    value: function _syncHandle(handle) {
      this.format = this.getParameter(GL_RENDERBUFFER_INTERNAL_FORMAT);
      this.width = this.getParameter(GL_RENDERBUFFER_WIDTH);
      this.height = this.getParameter(GL_RENDERBUFFER_HEIGHT);
      this.samples = this.getParameter(GL_RENDERBUFFER_SAMPLES);
    }
  }, {
    key: "_getParameter",
    value: function _getParameter(pname) {
      this.gl.bindRenderbuffer(GL_RENDERBUFFER, this.handle);
      var value = this.gl.getRenderbufferParameter(GL_RENDERBUFFER, pname);
      return value;
    }
  }]);

  return Renderbuffer;
}(_resource.default);

exports.default = Renderbuffer;
//# sourceMappingURL=renderbuffer.js.map