"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.TEXTURE_FORMATS = void 0;

var _resource = _interopRequireDefault(require("./resource"));

var _buffer = _interopRequireDefault(require("./buffer"));

var _contextState = require("../webgl-context/context-state");

var _webglUtils = require("../webgl-utils");

var _utils = require("../utils");

var _assert = _interopRequireDefault(require("../utils/assert"));

var _TEXTURE_FORMATS;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var NPOT_MIN_FILTERS = [9729, 9728];
var TEXTURE_FORMATS = (_TEXTURE_FORMATS = {}, _defineProperty(_TEXTURE_FORMATS, 6407, {
  dataFormat: 6407,
  types: [5121, 33635]
}), _defineProperty(_TEXTURE_FORMATS, 6408, {
  dataFormat: 6408,
  types: [5121, 32819, 32820]
}), _defineProperty(_TEXTURE_FORMATS, 6406, {
  dataFormat: 6406,
  types: [5121]
}), _defineProperty(_TEXTURE_FORMATS, 6409, {
  dataFormat: 6409,
  types: [5121]
}), _defineProperty(_TEXTURE_FORMATS, 6410, {
  dataFormat: 6410,
  types: [5121]
}), _TEXTURE_FORMATS);
exports.TEXTURE_FORMATS = TEXTURE_FORMATS;

function isFormatSupported(gl, format) {
  var info = TEXTURE_FORMATS[format];

  if (!info) {
    return false;
  }

  if (info.gl1 === undefined && info.gl2 === undefined) {
    return true;
  }

  var value = (0, _webglUtils.isWebGL2)(gl) ? info.gl2 || info.gl1 : info.gl1;
  return typeof value === 'string' ? gl.getExtension(value) : value;
}

function isLinearFilteringSupported(gl, format) {
  var info = TEXTURE_FORMATS[format];

  switch (info && info.types[0]) {
    case 5126:
      return gl.getExtension('OES_texture_float_linear');

    case 5131:
      return gl.getExtension('OES_texture_half_float_linear');

    default:
      return true;
  }
}

var Texture = function (_Resource) {
  _inherits(Texture, _Resource);

  _createClass(Texture, null, [{
    key: "isSupported",
    value: function isSupported(gl) {
      var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          format = _ref.format,
          linearFiltering = _ref.linearFiltering;

      var supported = true;

      if (format) {
        supported = supported && isFormatSupported(gl, format);
        supported = supported && (!linearFiltering || isLinearFilteringSupported(gl, format));
      }

      return supported;
    }
  }]);

  function Texture(gl, opts) {
    var _this;

    _classCallCheck(this, Texture);

    var _opts$id = opts.id,
        id = _opts$id === void 0 ? (0, _utils.uid)('texture') : _opts$id,
        handle = opts.handle,
        target = opts.target;
    _this = _possibleConstructorReturn(this, _getPrototypeOf(Texture).call(this, gl, {
      id: id,
      handle: handle
    }));
    _this.target = target;
    _this.hasFloatTexture = gl.getExtension('OES_texture_float');
    _this.textureUnit = undefined;
    return _this;
  }

  _createClass(Texture, [{
    key: "toString",
    value: function toString() {
      return "Texture(".concat(this.id, ",").concat(this.width, "x").concat(this.height, ")");
    }
  }, {
    key: "initialize",
    value: function initialize() {
      var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var data = opts.data;
      var _opts$pixels = opts.pixels,
          pixels = _opts$pixels === void 0 ? null : _opts$pixels,
          _opts$format = opts.format,
          format = _opts$format === void 0 ? 6408 : _opts$format,
          _opts$type = opts.type,
          type = _opts$type === void 0 ? 5121 : _opts$type,
          _opts$border = opts.border,
          border = _opts$border === void 0 ? 0 : _opts$border,
          _opts$recreate = opts.recreate,
          recreate = _opts$recreate === void 0 ? false : _opts$recreate,
          _opts$parameters = opts.parameters,
          parameters = _opts$parameters === void 0 ? {} : _opts$parameters,
          _opts$pixelStore = opts.pixelStore,
          pixelStore = _opts$pixelStore === void 0 ? {} : _opts$pixelStore,
          _opts$unpackFlipY = opts.unpackFlipY,
          unpackFlipY = _opts$unpackFlipY === void 0 ? true : _opts$unpackFlipY;
      var _opts$mipmaps = opts.mipmaps,
          mipmaps = _opts$mipmaps === void 0 ? true : _opts$mipmaps;

      if (!data) {
        data = pixels;
      }

      var width = opts.width,
          height = opts.height,
          dataFormat = opts.dataFormat;

      var _this$_deduceParamete = this._deduceParameters({
        format: format,
        type: type,
        dataFormat: dataFormat,
        compressed: false,
        data: data,
        width: width,
        height: height
      });

      width = _this$_deduceParamete.width;
      height = _this$_deduceParamete.height;
      dataFormat = _this$_deduceParamete.dataFormat;
      this.width = width;
      this.height = height;
      this.format = format;
      this.type = type;
      this.dataFormat = dataFormat;
      this.border = border;

      var DEFAULT_TEXTURE_SETTINGS = _defineProperty({}, 37440, unpackFlipY);

      var glSettings = Object.assign({}, DEFAULT_TEXTURE_SETTINGS, pixelStore);

      if (this._isNPOT() && mipmaps) {
        _utils.log.warn("texture: ".concat(this, " is Non-Power-Of-Two, disabling mipmaping"))();

        mipmaps = false;

        this._updateForNPOT(parameters);
      }

      this.mipmaps = mipmaps;
      this.setImageData({
        data: data,
        width: width,
        height: height,
        format: format,
        type: type,
        dataFormat: dataFormat,
        border: border,
        mipmaps: mipmaps,
        parameters: glSettings
      });

      if (mipmaps) {
        this.generateMipmap();
      }

      this.setParameters(parameters);

      if (recreate) {
        this.data = data;
      }
    }
  }, {
    key: "resize",
    value: function resize(_ref2) {
      var width = _ref2.width,
          height = _ref2.height;

      if (width !== this.width || height !== this.height) {
        return this.initialize({
          width: width,
          height: height,
          format: this.format,
          type: this.type,
          dataFormat: this.dataFormat,
          border: this.border,
          mipmaps: false
        });
      }

      return this;
    }
  }, {
    key: "generateMipmap",
    value: function generateMipmap() {
      var _this2 = this;

      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      this.gl.bindTexture(this.target, this.handle);
      (0, _contextState.withParameters)(this.gl, params, function () {
        _this2.gl.generateMipmap(_this2.target);
      });
      this.gl.bindTexture(this.target, null);
      return this;
    }
  }, {
    key: "setImageData",
    value: function setImageData(_ref3) {
      var _this3 = this;

      var _ref3$target = _ref3.target,
          target = _ref3$target === void 0 ? this.target : _ref3$target,
          _ref3$pixels = _ref3.pixels,
          pixels = _ref3$pixels === void 0 ? null : _ref3$pixels,
          _ref3$data = _ref3.data,
          data = _ref3$data === void 0 ? null : _ref3$data,
          width = _ref3.width,
          height = _ref3.height,
          _ref3$level = _ref3.level,
          level = _ref3$level === void 0 ? 0 : _ref3$level,
          _ref3$format = _ref3.format,
          format = _ref3$format === void 0 ? 6408 : _ref3$format,
          type = _ref3.type,
          dataFormat = _ref3.dataFormat,
          _ref3$offset = _ref3.offset,
          offset = _ref3$offset === void 0 ? 0 : _ref3$offset,
          _ref3$border = _ref3.border,
          border = _ref3$border === void 0 ? 0 : _ref3$border,
          _ref3$compressed = _ref3.compressed,
          compressed = _ref3$compressed === void 0 ? false : _ref3$compressed,
          _ref3$parameters = _ref3.parameters,
          parameters = _ref3$parameters === void 0 ? {} : _ref3$parameters;

      if (!data) {
        data = pixels;
      }

      var _this$_deduceParamete2 = this._deduceParameters({
        format: format,
        type: type,
        dataFormat: dataFormat,
        compressed: compressed,
        data: data,
        width: width,
        height: height
      });

      type = _this$_deduceParamete2.type;
      dataFormat = _this$_deduceParamete2.dataFormat;
      compressed = _this$_deduceParamete2.compressed;
      width = _this$_deduceParamete2.width;
      height = _this$_deduceParamete2.height;
      var gl = this.gl;
      gl.bindTexture(this.target, this.handle);
      var dataType = null;

      var _this$_getDataType = this._getDataType({
        data: data,
        compressed: compressed
      });

      data = _this$_getDataType.data;
      dataType = _this$_getDataType.dataType;
      (0, _contextState.withParameters)(this.gl, parameters, function () {
        switch (dataType) {
          case 'null':
            gl.texImage2D(target, level, format, width, height, border, dataFormat, type, data);
            break;

          case 'typed-array':
            gl.texImage2D(target, level, format, width, height, border, dataFormat, type, data, offset);
            break;

          case 'buffer':
            (0, _webglUtils.assertWebGL2Context)(gl);
            gl.bindBuffer(35052, data.handle || data);
            gl.texImage2D(target, level, format, width, height, border, format, type, offset);
            break;

          case 'browser-object':
            gl.texImage2D(target, level, format, format, type, data);
            break;

          case 'compressed':
            gl.compressedTexImage2D(_this3.target, level, format, width, height, border, data);
            break;

          default:
            (0, _assert.default)(false, 'Unknown image data type');
        }
      });
    }
  }, {
    key: "setSubImageData",
    value: function setSubImageData(_ref4) {
      var _this4 = this;

      var _ref4$target = _ref4.target,
          target = _ref4$target === void 0 ? this.target : _ref4$target,
          _ref4$pixels = _ref4.pixels,
          pixels = _ref4$pixels === void 0 ? null : _ref4$pixels,
          _ref4$data = _ref4.data,
          data = _ref4$data === void 0 ? null : _ref4$data,
          _ref4$x = _ref4.x,
          x = _ref4$x === void 0 ? 0 : _ref4$x,
          _ref4$y = _ref4.y,
          y = _ref4$y === void 0 ? 0 : _ref4$y,
          width = _ref4.width,
          height = _ref4.height,
          _ref4$level = _ref4.level,
          level = _ref4$level === void 0 ? 0 : _ref4$level,
          _ref4$format = _ref4.format,
          format = _ref4$format === void 0 ? 6408 : _ref4$format,
          type = _ref4.type,
          dataFormat = _ref4.dataFormat,
          _ref4$compressed = _ref4.compressed,
          compressed = _ref4$compressed === void 0 ? false : _ref4$compressed,
          _ref4$offset = _ref4.offset,
          offset = _ref4$offset === void 0 ? 0 : _ref4$offset,
          _ref4$border = _ref4.border,
          border = _ref4$border === void 0 ? 0 : _ref4$border,
          _ref4$parameters = _ref4.parameters,
          parameters = _ref4$parameters === void 0 ? {} : _ref4$parameters;

      var _this$_deduceParamete3 = this._deduceParameters({
        format: format,
        type: type,
        dataFormat: dataFormat,
        compressed: compressed,
        data: data,
        width: width,
        height: height
      });

      type = _this$_deduceParamete3.type;
      dataFormat = _this$_deduceParamete3.dataFormat;
      compressed = _this$_deduceParamete3.compressed;
      width = _this$_deduceParamete3.width;
      height = _this$_deduceParamete3.height;

      if (!data) {
        data = pixels;
      }

      if (data && data.data) {
        var ndarray = data;
        data = ndarray.data;
        width = ndarray.shape[0];
        height = ndarray.shape[1];
      }

      if (data instanceof _buffer.default) {
        data = data.handle;
      }

      this.gl.bindTexture(this.target, this.handle);
      (0, _contextState.withParameters)(this.gl, parameters, function () {
        if (compressed) {
          _this4.gl.compressedTexSubImage2D(target, level, x, y, width, height, format, data);
        } else if (data === null) {
          _this4.gl.texSubImage2D(target, level, format, width, height, border, dataFormat, type, null);
        } else if (ArrayBuffer.isView(data)) {
          _this4.gl.texSubImage2D(target, level, x, y, width, height, format, type, data, offset);
        } else if (data instanceof _webglUtils.WebGLBuffer) {
          (0, _webglUtils.assertWebGL2Context)(_this4.gl);

          _this4.gl.bindBuffer(35052, data);

          _this4.gl.texSubImage2D(target, level, format, width, height, border, format, type, offset);

          _this4.gl.bindBuffer(35052, null);
        } else {
          _this4.gl.texSubImage2D(target, level, x, y, format, type, data);
        }
      });
      this.gl.bindTexture(this.target, null);
    }
  }, {
    key: "copyFramebuffer",
    value: function copyFramebuffer(_ref5) {
      var _ref5$target = _ref5.target,
          target = _ref5$target === void 0 ? this.target : _ref5$target,
          framebuffer = _ref5.framebuffer,
          _ref5$offset = _ref5.offset,
          offset = _ref5$offset === void 0 ? 0 : _ref5$offset,
          _ref5$x = _ref5.x,
          x = _ref5$x === void 0 ? 0 : _ref5$x,
          _ref5$y = _ref5.y,
          y = _ref5$y === void 0 ? 0 : _ref5$y,
          width = _ref5.width,
          height = _ref5.height,
          _ref5$level = _ref5.level,
          level = _ref5$level === void 0 ? 0 : _ref5$level,
          _ref5$internalFormat = _ref5.internalFormat,
          internalFormat = _ref5$internalFormat === void 0 ? 6408 : _ref5$internalFormat,
          _ref5$border = _ref5.border,
          border = _ref5$border === void 0 ? 0 : _ref5$border;

      if (framebuffer) {
        framebuffer.bind();
      }

      this.bind();
      this.gl.copyTexImage2D(this.target, level, internalFormat, x, y, width, height, border);
      this.unbind();

      if (framebuffer) {
        framebuffer.unbind();
      }
    }
  }, {
    key: "getActiveUnit",
    value: function getActiveUnit() {
      return this.gl.getParameter(34016) - 33984;
    }
  }, {
    key: "bind",
    value: function bind() {
      var textureUnit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.textureUnit;

      if (textureUnit === undefined) {
        throw new Error('Texture.bind: must specify texture unit');
      }

      this.textureUnit = textureUnit;
      this.gl.activeTexture(33984 + textureUnit);
      this.gl.bindTexture(this.target, this.handle);
      return textureUnit;
    }
  }, {
    key: "unbind",
    value: function unbind() {
      if (this.textureUnit === undefined) {
        throw new Error('Texture.unbind: texture unit not specified');
      }

      this.gl.activeTexture(33984 + this.textureUnit);
      this.gl.bindTexture(this.target, null);
      return this.textureUnit;
    }
  }, {
    key: "_getDataType",
    value: function _getDataType(_ref6) {
      var data = _ref6.data,
          _ref6$compressed = _ref6.compressed,
          compressed = _ref6$compressed === void 0 ? false : _ref6$compressed;

      if (compressed) {
        return {
          data: data,
          dataType: 'compressed'
        };
      }

      if (data === null) {
        return {
          data: data,
          dataType: 'null'
        };
      }

      if (ArrayBuffer.isView(data)) {
        return {
          data: data,
          dataType: 'typed-array'
        };
      }

      if (data instanceof _buffer.default) {
        return {
          data: data.handle,
          dataType: 'buffer'
        };
      }

      if (data instanceof _webglUtils.WebGLBuffer) {
        return {
          data: data,
          dataType: 'buffer'
        };
      }

      return {
        data: data,
        dataType: 'browser-object'
      };
    }
  }, {
    key: "setImage3D",
    value: function setImage3D(_ref7) {
      var _ref7$level = _ref7.level,
          level = _ref7$level === void 0 ? 0 : _ref7$level,
          _ref7$internalformat = _ref7.internalformat,
          internalformat = _ref7$internalformat === void 0 ? 6408 : _ref7$internalformat,
          width = _ref7.width,
          height = _ref7.height,
          _ref7$depth = _ref7.depth,
          depth = _ref7$depth === void 0 ? 1 : _ref7$depth,
          _ref7$border = _ref7.border,
          border = _ref7$border === void 0 ? 0 : _ref7$border,
          format = _ref7.format,
          _ref7$type = _ref7.type,
          type = _ref7$type === void 0 ? 5121 : _ref7$type,
          _ref7$offset = _ref7.offset,
          offset = _ref7$offset === void 0 ? 0 : _ref7$offset,
          pixels = _ref7.pixels;

      if (ArrayBuffer.isView(pixels)) {
        this.gl.texImage3D(this.target, level, internalformat, width, height, depth, border, format, type, pixels);
        return this;
      }

      if (pixels instanceof _buffer.default) {
        this.gl.bindBuffer(35052, pixels.handle);
        this.gl.texImage3D(this.target, level, internalformat, width, height, depth, border, format, type, offset);
      }

      return this;
    }
  }, {
    key: "_deduceParameters",
    value: function _deduceParameters(opts) {
      var format = opts.format,
          data = opts.data;
      var width = opts.width,
          height = opts.height,
          dataFormat = opts.dataFormat,
          type = opts.type,
          compressed = opts.compressed;
      var textureFormat = TEXTURE_FORMATS[format];
      dataFormat = dataFormat || textureFormat && textureFormat.dataFormat;
      type = type || textureFormat && textureFormat.types[0];
      compressed = compressed || textureFormat && textureFormat.compressed;

      var _this$_deduceImageSiz = this._deduceImageSize({
        data: data,
        width: width,
        height: height
      });

      width = _this$_deduceImageSiz.width;
      height = _this$_deduceImageSiz.height;
      return {
        dataFormat: dataFormat,
        type: type,
        compressed: compressed,
        width: width,
        height: height,
        format: format,
        data: data
      };
    }
  }, {
    key: "_deduceImageSize",
    value: function _deduceImageSize(_ref8) {
      var data = _ref8.data,
          width = _ref8.width,
          height = _ref8.height;
      var size;

      if (typeof ImageData !== 'undefined' && data instanceof ImageData) {
        size = {
          width: data.width,
          height: data.height
        };
      } else if (typeof HTMLImageElement !== 'undefined' && data instanceof HTMLImageElement) {
        size = {
          width: data.naturalWidth,
          height: data.naturalHeight
        };
      } else if (typeof HTMLCanvasElement !== 'undefined' && data instanceof HTMLCanvasElement) {
        size = {
          width: data.width,
          height: data.height
        };
      } else if (typeof HTMLVideoElement !== 'undefined' && data instanceof HTMLVideoElement) {
        size = {
          width: data.videoWidth,
          height: data.videoHeight
        };
      } else if (!data) {
        size = {
          width: width >= 0 ? width : 1,
          height: height >= 0 ? height : 1
        };
      } else {
        size = {
          width: width,
          height: height
        };
      }

      (0, _assert.default)(size, 'Could not deduced texture size');
      (0, _assert.default)(width === undefined || size.width === width, 'Deduced texture width does not match supplied width');
      (0, _assert.default)(height === undefined || size.height === height, 'Deduced texture height does not match supplied height');
      return size;
    }
  }, {
    key: "_createHandle",
    value: function _createHandle() {
      return this.gl.createTexture();
    }
  }, {
    key: "_deleteHandle",
    value: function _deleteHandle() {
      this.gl.deleteTexture(this.handle);
    }
  }, {
    key: "_getParameter",
    value: function _getParameter(pname) {
      switch (pname) {
        case 4096:
          return this.width;

        case 4097:
          return this.height;

        default:
          this.gl.bindTexture(this.target, this.handle);
          var value = this.gl.getTexParameter(this.target, pname);
          this.gl.bindTexture(this.target, null);
          return value;
      }
    }
  }, {
    key: "_setParameter",
    value: function _setParameter(pname, param) {
      this.gl.bindTexture(this.target, this.handle);
      param = this._getNPOTParam(pname, param);

      switch (pname) {
        case 33082:
        case 33083:
          this.gl.texParameterf(this.handle, pname, param);
          break;

        case 4096:
        case 4097:
          (0, _assert.default)(false);
          break;

        default:
          this.gl.texParameteri(this.target, pname, param);
          break;
      }

      this.gl.bindTexture(this.target, null);
      return this;
    }
  }, {
    key: "_isNPOT",
    value: function _isNPOT() {
      return !(0, _webglUtils.isWebGL2)(this.gl) && (!(0, _utils.isPowerOfTwo)(this.width) || !(0, _utils.isPowerOfTwo)(this.height));
    }
  }, {
    key: "_updateForNPOT",
    value: function _updateForNPOT(parameters) {
      if (parameters[this.gl.TEXTURE_MIN_FILTER] === undefined) {
        parameters[this.gl.TEXTURE_MIN_FILTER] = this.gl.LINEAR;
      }

      if (parameters[this.gl.TEXTURE_WRAP_S] === undefined) {
        parameters[this.gl.TEXTURE_WRAP_S] = this.gl.CLAMP_TO_EDGE;
      }

      if (parameters[this.gl.TEXTURE_WRAP_T] === undefined) {
        parameters[this.gl.TEXTURE_WRAP_T] = this.gl.CLAMP_TO_EDGE;
      }
    }
  }, {
    key: "_getNPOTParam",
    value: function _getNPOTParam(pname, param) {
      if (this._isNPOT()) {
        switch (pname) {
          case 10241:
            if (NPOT_MIN_FILTERS.indexOf(param) === -1) {
              param = 9729;
            }

            break;

          case 10242:
          case 10243:
            if (param !== 33071) {
              param = 33071;
            }

            break;

          default:
            break;
        }
      }

      return param;
    }
  }]);

  return Texture;
}(_resource.default);

exports.default = Texture;
//# sourceMappingURL=texture.js.map