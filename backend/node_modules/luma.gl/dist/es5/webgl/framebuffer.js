"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FRAMEBUFFER_ATTACHMENT_PARAMETERS = exports.default = void 0;

var _resource = _interopRequireDefault(require("./resource"));

var _texture2d = _interopRequireDefault(require("./texture-2d"));

var _renderbuffer = _interopRequireDefault(require("./renderbuffer"));

var _buffer = _interopRequireDefault(require("./buffer"));

var _clear2 = require("./clear");

var _webglContext = require("../webgl-context");

var _contextFeatures = require("../webgl-context/context-features");

var _typedArrayUtils = require("../webgl-utils/typed-array-utils");

var _formatUtils = require("../webgl-utils/format-utils");

var _webglUtils = require("../webgl-utils");

var _constantsToKeys = require("../webgl-utils/constants-to-keys");

var _utils = require("../utils");

var _assert = _interopRequireDefault(require("../utils/assert"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

var ERR_MULTIPLE_RENDERTARGETS = 'Multiple render targets not supported';

var Framebuffer = function (_Resource) {
  _inherits(Framebuffer, _Resource);

  _createClass(Framebuffer, [{
    key: "MAX_COLOR_ATTACHMENTS",
    get: function get() {
      return this.gl.getParameter(this.gl.MAX_COLOR_ATTACHMENTS);
    }
  }, {
    key: "MAX_DRAW_BUFFERS",
    get: function get() {
      return this.gl.getParameter(this.gl.MAX_DRAW_BUFFERS);
    }
  }], [{
    key: "isSupported",
    value: function isSupported(gl) {
      var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          colorBufferFloat = _ref.colorBufferFloat,
          colorBufferHalfFloat = _ref.colorBufferHalfFloat;

      var supported = true;
      supported = colorBufferFloat && gl.getExtension((0, _webglUtils.isWebGL2)(gl) ? 'EXT_color_buffer_float' : 'WEBGL.color_buffer_float');
      supported = colorBufferHalfFloat && gl.getExtension((0, _webglUtils.isWebGL2)(gl) ? 'EXT_color_buffer_float' : 'EXT_color_buffer_half_float');
      return supported;
    }
  }, {
    key: "getDefaultFramebuffer",
    value: function getDefaultFramebuffer(gl) {
      gl.luma = gl.luma || {};
      gl.luma.defaultFramebuffer = gl.luma.defaultFramebuffer || new Framebuffer(gl, {
        id: 'default-framebuffer',
        handle: null,
        attachments: {}
      });
      return gl.luma.defaultFramebuffer;
    }
  }]);

  function Framebuffer(gl) {
    var _this;

    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Framebuffer);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Framebuffer).call(this, gl, opts));
    _this.width = null;
    _this.height = null;
    _this.attachments = {};
    _this.readBuffer = 36064;
    _this.drawBuffers = [36064];

    _this.initialize(opts);

    Object.seal(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(Framebuffer, [{
    key: "initialize",
    value: function initialize(_ref2) {
      var _ref2$width = _ref2.width,
          width = _ref2$width === void 0 ? 1 : _ref2$width,
          _ref2$height = _ref2.height,
          height = _ref2$height === void 0 ? 1 : _ref2$height,
          _ref2$attachments = _ref2.attachments,
          attachments = _ref2$attachments === void 0 ? null : _ref2$attachments,
          _ref2$color = _ref2.color,
          color = _ref2$color === void 0 ? true : _ref2$color,
          _ref2$depth = _ref2.depth,
          depth = _ref2$depth === void 0 ? true : _ref2$depth,
          _ref2$stencil = _ref2.stencil,
          stencil = _ref2$stencil === void 0 ? false : _ref2$stencil,
          _ref2$check = _ref2.check,
          check = _ref2$check === void 0 ? true : _ref2$check,
          readBuffer = _ref2.readBuffer,
          drawBuffers = _ref2.drawBuffers;
      (0, _assert.default)(width >= 0 && height >= 0, 'Width and height need to be integers');
      this.width = width;
      this.height = height;

      if (attachments) {
        for (var attachment in attachments) {
          var target = attachments[attachment];
          var object = Array.isArray(target) ? target[0] : target;
          object.resize({
            width: width,
            height: height
          });
        }
      } else {
        attachments = this._createDefaultAttachments({
          color: color,
          depth: depth,
          stencil: stencil,
          width: width,
          height: height
        });
      }

      this.update({
        clearAttachments: true,
        attachments: attachments,
        readBuffer: readBuffer,
        drawBuffers: drawBuffers
      });

      if (attachments && check) {
        this.checkStatus();
      }
    }
  }, {
    key: "update",
    value: function update(_ref3) {
      var _ref3$attachments = _ref3.attachments,
          attachments = _ref3$attachments === void 0 ? {} : _ref3$attachments,
          readBuffer = _ref3.readBuffer,
          drawBuffers = _ref3.drawBuffers,
          _ref3$clearAttachment = _ref3.clearAttachments,
          clearAttachments = _ref3$clearAttachment === void 0 ? false : _ref3$clearAttachment;
      this.attach(attachments, {
        clearAttachments: clearAttachments
      });
      var gl = this.gl;
      var prevHandle = gl.bindFramebuffer(36160, this.handle);

      if (readBuffer) {
        this._setReadBuffer(readBuffer);
      }

      if (drawBuffers) {
        this._setDrawBuffers(drawBuffers);
      }

      gl.bindFramebuffer(36160, prevHandle || null);
      return this;
    }
  }, {
    key: "resize",
    value: function resize() {
      var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          width = _ref4.width,
          height = _ref4.height;

      if (this.handle === null) {
        (0, _assert.default)(width === undefined && height === undefined);
        this.width = this.gl.drawingBufferWidth;
        this.height = this.gl.drawingBufferHeight;
        return this;
      }

      if (width === undefined) {
        width = this.gl.drawingBufferWidth;
      }

      if (height === undefined) {
        height = this.gl.drawingBufferHeight;
      }

      if (width !== this.width && height !== this.height) {
        _utils.log.log(2, "Resizing framebuffer ".concat(this.id, " to ").concat(width, "x").concat(height));
      }

      for (var attachmentPoint in this.attachments) {
        this.attachments[attachmentPoint].resize({
          width: width,
          height: height
        });
      }

      this.width = width;
      this.height = height;
      return this;
    }
  }, {
    key: "attach",
    value: function attach(attachments) {
      var _this2 = this;

      var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          _ref5$clearAttachment = _ref5.clearAttachments,
          clearAttachments = _ref5$clearAttachment === void 0 ? false : _ref5$clearAttachment;

      var newAttachments = {};

      if (clearAttachments) {
        Object.keys(this.attachments).forEach(function (key) {
          newAttachments[key] = null;
        });
      }

      Object.assign(newAttachments, attachments);
      var prevHandle = this.gl.bindFramebuffer(36160, this.handle);

      for (var key in newAttachments) {
        (0, _assert.default)(key !== undefined, 'Misspelled framebuffer binding point?');
        var attachment = Number(key);
        var descriptor = newAttachments[attachment];
        var object = descriptor;

        if (!object) {
          this._unattach({
            attachment: attachment
          });
        } else if (object instanceof _renderbuffer.default) {
          this._attachRenderbuffer({
            attachment: attachment,
            renderbuffer: object
          });
        } else if (Array.isArray(descriptor)) {
          var _descriptor = _slicedToArray(descriptor, 3),
              texture = _descriptor[0],
              _descriptor$ = _descriptor[1],
              layer = _descriptor$ === void 0 ? 0 : _descriptor$,
              _descriptor$2 = _descriptor[2],
              level = _descriptor$2 === void 0 ? 0 : _descriptor$2;

          object = texture;

          this._attachTexture({
            attachment: attachment,
            texture: texture,
            layer: layer,
            level: level
          });
        } else {
          this._attachTexture({
            attachment: attachment,
            texture: object,
            layer: 0,
            level: 0
          });
        }

        if (object) {
          object.resize({
            width: this.width,
            height: this.height
          });
        }
      }

      this.gl.bindFramebuffer(36160, prevHandle || null);
      Object.assign(this.attachments, attachments);
      Object.keys(this.attachments).filter(function (key) {
        return !_this2.attachments[key];
      }).forEach(function (key) {
        delete _this2.attachments[key];
      });
    }
  }, {
    key: "checkStatus",
    value: function checkStatus() {
      var gl = this.gl;
      var prevHandle = gl.bindFramebuffer(36160, this.handle);
      var status = gl.checkFramebufferStatus(36160);
      gl.bindFramebuffer(36160, prevHandle || null);

      if (status !== 36053) {
        throw new Error(_getFrameBufferStatus(status));
      }

      return this;
    }
  }, {
    key: "clear",
    value: function clear() {
      var _ref6 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          color = _ref6.color,
          depth = _ref6.depth,
          stencil = _ref6.stencil,
          _ref6$drawBuffers = _ref6.drawBuffers,
          drawBuffers = _ref6$drawBuffers === void 0 ? [] : _ref6$drawBuffers;

      var prevHandle = this.gl.bindFramebuffer(36160, this.handle);

      if (color || depth || stencil) {
        (0, _clear2.clear)(this.gl, {
          color: color,
          depth: depth,
          stencil: stencil
        });
      }

      drawBuffers.forEach(function (value, drawBuffer) {
        (0, _clear2.clearBuffer)({
          drawBuffer: drawBuffer,
          value: value
        });
      });
      this.gl.bindFramebuffer(36160, prevHandle || null);
      return this;
    }
  }, {
    key: "readPixels",
    value: function readPixels(_ref7) {
      var _ref7$x = _ref7.x,
          x = _ref7$x === void 0 ? 0 : _ref7$x,
          _ref7$y = _ref7.y,
          y = _ref7$y === void 0 ? 0 : _ref7$y,
          _ref7$width = _ref7.width,
          width = _ref7$width === void 0 ? this.width : _ref7$width,
          _ref7$height = _ref7.height,
          height = _ref7$height === void 0 ? this.height : _ref7$height,
          _ref7$format = _ref7.format,
          format = _ref7$format === void 0 ? 6408 : _ref7$format,
          type = _ref7.type,
          _ref7$pixelArray = _ref7.pixelArray,
          pixelArray = _ref7$pixelArray === void 0 ? null : _ref7$pixelArray,
          _ref7$attachment = _ref7.attachment,
          attachment = _ref7$attachment === void 0 ? 36064 : _ref7$attachment;
      var gl = this.gl;

      if (attachment === 36064 && this.handle === null) {
        attachment = 1028;
      }

      if (!pixelArray) {
        type = type || 5121;
        var ArrayType = (0, _typedArrayUtils.getTypedArrayFromGLType)(type, {
          clamped: false
        });
        var components = (0, _formatUtils.glFormatToComponents)(format);
        pixelArray = pixelArray || new ArrayType(width * height * components);
      }

      type = type || (0, _typedArrayUtils.getGLTypeFromTypedArray)(pixelArray);
      var prevHandle = this.gl.bindFramebuffer(36160, this.handle);
      this.gl.readPixels(x, y, width, height, format, type, pixelArray);
      this.gl.bindFramebuffer(36160, prevHandle || null);
      return pixelArray;
    }
  }, {
    key: "readPixelsToBuffer",
    value: function readPixelsToBuffer(_ref8) {
      var _ref8$x = _ref8.x,
          x = _ref8$x === void 0 ? 0 : _ref8$x,
          _ref8$y = _ref8.y,
          y = _ref8$y === void 0 ? 0 : _ref8$y,
          _ref8$width = _ref8.width,
          width = _ref8$width === void 0 ? this.width : _ref8$width,
          _ref8$height = _ref8.height,
          height = _ref8$height === void 0 ? this.height : _ref8$height,
          _ref8$format = _ref8.format,
          format = _ref8$format === void 0 ? 6408 : _ref8$format,
          type = _ref8.type,
          _ref8$buffer = _ref8.buffer,
          buffer = _ref8$buffer === void 0 ? null : _ref8$buffer,
          _ref8$byteOffset = _ref8.byteOffset,
          byteOffset = _ref8$byteOffset === void 0 ? 0 : _ref8$byteOffset;
      var gl = this.gl;
      (0, _webglUtils.assertWebGL2Context)(gl);
      type = type || (buffer ? buffer.type : 5121);

      if (!buffer) {
        var components = (0, _formatUtils.glFormatToComponents)(format);
        var byteCount = (0, _formatUtils.glTypeToBytes)(type);
        var bytes = byteOffset + width * height * components * byteCount;
        buffer = new _buffer.default(gl, {
          bytes: bytes,
          type: type,
          size: components
        });
      }

      buffer.bind({
        target: 35051
      });
      (0, _webglContext.withParameters)(gl, {
        framebuffer: this
      }, function () {
        gl.readPixels(x, y, width, height, format, type, byteOffset);
      });
      buffer.unbind({
        target: 35051
      });
      return buffer;
    }
  }, {
    key: "copyToDataUrl",
    value: function copyToDataUrl() {
      var _ref9 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref9$attachment = _ref9.attachment,
          attachment = _ref9$attachment === void 0 ? 36064 : _ref9$attachment,
          _ref9$maxHeight = _ref9.maxHeight,
          maxHeight = _ref9$maxHeight === void 0 ? Number.MAX_SAFE_INTEGER : _ref9$maxHeight;

      var data = this.readPixels({
        attachment: attachment
      });
      var width = this.width,
          height = this.height;

      while (height > maxHeight) {
        var _scalePixels = (0, _webglUtils.scalePixels)({
          data: data,
          width: width,
          height: height
        });

        data = _scalePixels.data;
        width = _scalePixels.width;
        height = _scalePixels.height;
      }

      (0, _webglUtils.flipRows)({
        data: data,
        width: width,
        height: height
      });
      var canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      var context = canvas.getContext('2d');
      var imageData = context.createImageData(width, height);
      imageData.data.set(data);
      context.putImageData(imageData, 0, 0);
      return canvas.toDataURL();
    }
  }, {
    key: "copyToImage",
    value: function copyToImage() {
      var _ref10 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref10$image = _ref10.image,
          image = _ref10$image === void 0 ? null : _ref10$image,
          _ref10$attachment = _ref10.attachment,
          attachment = _ref10$attachment === void 0 ? 36064 : _ref10$attachment,
          _ref10$maxHeight = _ref10.maxHeight,
          maxHeight = _ref10$maxHeight === void 0 ? Number.MAX_SAFE_INTEGER : _ref10$maxHeight;

      var dataUrl = this.readDataUrl({
        attachment: attachment
      });
      image = image || new Image();
      image.src = dataUrl;
      return image;
    }
  }, {
    key: "copyToTexture",
    value: function copyToTexture(_ref11) {
      var texture = _ref11.texture,
          target = _ref11.target,
          _ref11$xoffset = _ref11.xoffset,
          xoffset = _ref11$xoffset === void 0 ? 0 : _ref11$xoffset,
          _ref11$yoffset = _ref11.yoffset,
          yoffset = _ref11$yoffset === void 0 ? 0 : _ref11$yoffset,
          _ref11$zoffset = _ref11.zoffset,
          zoffset = _ref11$zoffset === void 0 ? 0 : _ref11$zoffset,
          _ref11$mipmapLevel = _ref11.mipmapLevel,
          mipmapLevel = _ref11$mipmapLevel === void 0 ? 0 : _ref11$mipmapLevel,
          _ref11$attachment = _ref11.attachment,
          attachment = _ref11$attachment === void 0 ? 36064 : _ref11$attachment,
          _ref11$x = _ref11.x,
          x = _ref11$x === void 0 ? 0 : _ref11$x,
          _ref11$y = _ref11.y,
          y = _ref11$y === void 0 ? 0 : _ref11$y,
          width = _ref11.width,
          height = _ref11.height;
      var gl = this.gl;
      var prevHandle = gl.bindFramebuffer(36160, this.handle);
      var prevBuffer = gl.readBuffer(attachment);
      width = Number.isFinite(width) ? width : texture.width;
      height = Number.isFinite(height) ? height : texture.height;

      switch (texture.target) {
        case 3553:
        case 34067:
          gl.copyTexSubImage2D(target || texture.target, mipmapLevel, xoffset, yoffset, x, y, width, height);
          break;

        case 35866:
        case 32879:
          gl.copyTexSubImage3D(target || texture.target, mipmapLevel, xoffset, yoffset, zoffset, x, y, width, height);
          break;

        default:
      }

      gl.readBuffer(prevBuffer);
      gl.bindFramebuffer(36160, prevHandle || null);
      return texture;
    }
  }, {
    key: "blit",
    value: function blit(_ref12) {
      var srcFramebuffer = _ref12.srcFramebuffer,
          _ref12$attachment = _ref12.attachment,
          attachment = _ref12$attachment === void 0 ? 36064 : _ref12$attachment,
          _ref12$srcX = _ref12.srcX0,
          srcX0 = _ref12$srcX === void 0 ? 0 : _ref12$srcX,
          _ref12$srcY = _ref12.srcY0,
          srcY0 = _ref12$srcY === void 0 ? 0 : _ref12$srcY,
          srcX1 = _ref12.srcX1,
          srcY1 = _ref12.srcY1,
          _ref12$dstX = _ref12.dstX0,
          dstX0 = _ref12$dstX === void 0 ? 0 : _ref12$dstX,
          _ref12$dstY = _ref12.dstY0,
          dstY0 = _ref12$dstY === void 0 ? 0 : _ref12$dstY,
          dstX1 = _ref12.dstX1,
          dstY1 = _ref12.dstY1,
          _ref12$color = _ref12.color,
          color = _ref12$color === void 0 ? true : _ref12$color,
          _ref12$depth = _ref12.depth,
          depth = _ref12$depth === void 0 ? false : _ref12$depth,
          _ref12$stencil = _ref12.stencil,
          stencil = _ref12$stencil === void 0 ? false : _ref12$stencil,
          _ref12$mask = _ref12.mask,
          mask = _ref12$mask === void 0 ? 0 : _ref12$mask,
          _ref12$filter = _ref12.filter,
          filter = _ref12$filter === void 0 ? 9728 : _ref12$filter;
      var gl = this.gl;
      (0, _webglUtils.assertWebGL2Context)(gl);

      if (!srcFramebuffer.handle && attachment === 36064) {
        attachment = 1028;
      }

      if (color) {
        mask |= 16384;
      }

      if (depth) {
        mask |= 256;
      }

      if (stencil) {
        mask |= 1024;
      }

      (0, _assert.default)(mask);
      srcX1 = srcX1 === undefined ? srcFramebuffer.width : srcX1;
      srcY1 = srcY1 === undefined ? srcFramebuffer.height : srcY1;
      dstX1 = dstX1 === undefined ? this.width : dstX1;
      dstY1 = dstY1 === undefined ? this.height : dstY1;
      var prevDrawHandle = gl.bindFramebuffer(36009, this.handle);
      var prevReadHandle = gl.bindFramebuffer(36008, srcFramebuffer.handle);
      gl.readBuffer(attachment);
      gl.blitFramebuffer(srcX0, srcY0, srcX1, srcY1, dstX0, dstY0, dstX1, dstY1, mask, filter);
      gl.readBuffer(this.readBuffer);
      gl.bindFramebuffer(36008, prevReadHandle || null);
      gl.bindFramebuffer(36009, prevDrawHandle || null);
      return this;
    }
  }, {
    key: "invalidate",
    value: function invalidate(_ref13) {
      var _ref13$attachments = _ref13.attachments,
          attachments = _ref13$attachments === void 0 ? [] : _ref13$attachments,
          _ref13$x = _ref13.x,
          x = _ref13$x === void 0 ? 0 : _ref13$x,
          _ref13$y = _ref13.y,
          y = _ref13$y === void 0 ? 0 : _ref13$y,
          width = _ref13.width,
          height = _ref13.height;
      var gl = this.gl;
      (0, _webglUtils.assertWebGL2Context)(gl);
      var prevHandle = gl.bindFramebuffer(36008, this.handle);
      var invalidateAll = x === 0 && y === 0 && width === undefined && height === undefined;

      if (invalidateAll) {
        gl.invalidateFramebuffer(36008, attachments);
      } else {
        gl.invalidateFramebuffer(36008, attachments, x, y, width, height);
      }

      gl.bindFramebuffer(36008, prevHandle);
      return this;
    }
  }, {
    key: "getAttachmentParameter",
    value: function getAttachmentParameter(attachment, pname, keys) {
      var value = this._getAttachmentParameterFallback(pname);

      if (value === null) {
        this.gl.bindFramebuffer(36160, this.handle);
        value = this.gl.getFramebufferAttachmentParameter(36160, attachment, pname);
        this.gl.bindFramebuffer(36160, null);
      }

      if (keys && value > 1000) {
        value = (0, _constantsToKeys.glKey)(this.gl, value);
      }

      return value;
    }
  }, {
    key: "getAttachmentParameters",
    value: function getAttachmentParameters() {
      var attachment = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 36064;
      var keys = arguments.length > 1 ? arguments[1] : undefined;
      var parameters = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.constructor.ATTACHMENT_PARAMETERS || [];
      var values = {};
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = parameters[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var pname = _step.value;
          var key = keys ? (0, _constantsToKeys.glKey)(this.gl, pname) : pname;
          values[key] = this.getAttachmentParameter(attachment, pname, keys);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return values;
    }
  }, {
    key: "getParameters",
    value: function getParameters() {
      var keys = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var attachments = Object.keys(this.attachments);
      var parameters = {};

      for (var _i2 = 0; _i2 < attachments.length; _i2++) {
        var attachmentName = attachments[_i2];
        var attachment = Number(attachmentName);
        var key = keys ? (0, _constantsToKeys.glKey)(this.gl, attachment) : attachment;
        parameters[key] = this.getAttachmentParameters(attachment, keys);
      }

      return parameters;
    }
  }, {
    key: "show",
    value: function show() {
      if (typeof window !== 'undefined') {
        window.open(this.copyToDataUrl(), 'luma-debug-texture');
      }

      return this;
    }
  }, {
    key: "log",
    value: function log() {
      var priority = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

      if (priority > _utils.log.priority || typeof window === 'undefined') {
        return this;
      }

      message = message || "Framebuffer ".concat(this.id);
      var image = this.copyToDataUrl({
        maxHeight: 100
      });

      _utils.log.image({
        priority: priority,
        message: message,
        image: image
      }, message)();

      return this;
    }
  }, {
    key: "bind",
    value: function bind() {
      var _ref14 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref14$target = _ref14.target,
          target = _ref14$target === void 0 ? 36160 : _ref14$target;

      this.gl.bindFramebuffer(target, this.handle);
      return this;
    }
  }, {
    key: "unbind",
    value: function unbind() {
      var _ref15 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref15$target = _ref15.target,
          target = _ref15$target === void 0 ? 36160 : _ref15$target;

      this.gl.bindFramebuffer(target, null);
      return this;
    }
  }, {
    key: "_createDefaultAttachments",
    value: function _createDefaultAttachments(_ref16) {
      var color = _ref16.color,
          depth = _ref16.depth,
          stencil = _ref16.stencil,
          width = _ref16.width,
          height = _ref16.height;
      var defaultAttachments = null;

      if (color) {
        var _parameters;

        defaultAttachments = defaultAttachments || {};
        defaultAttachments[36064] = new _texture2d.default(this.gl, {
          id: "".concat(this.id, "-color0"),
          pixels: null,
          format: 6408,
          type: 5121,
          width: width,
          height: height,
          mipmaps: false,
          parameters: (_parameters = {}, _defineProperty(_parameters, 10241, 9728), _defineProperty(_parameters, 10240, 9728), _defineProperty(_parameters, 10242, 33071), _defineProperty(_parameters, 10243, 33071), _parameters)
        });
      }

      if (depth && stencil) {
        defaultAttachments = defaultAttachments || {};
        defaultAttachments[33306] = new _renderbuffer.default(this.gl, {
          id: "".concat(this.id, "-depth-stencil"),
          format: 35056,
          width: width,
          height: 111
        });
      } else if (depth) {
        defaultAttachments = defaultAttachments || {};
        defaultAttachments[36096] = new _renderbuffer.default(this.gl, {
          id: "".concat(this.id, "-depth"),
          format: 33189,
          width: width,
          height: height
        });
      } else if (stencil) {
        (0, _assert.default)(false);
      }

      return defaultAttachments;
    }
  }, {
    key: "_unattach",
    value: function _unattach(_ref17) {
      var attachment = _ref17.attachment;
      this.gl.bindRenderbuffer(36161, this.handle);
      this.gl.framebufferRenderbuffer(36160, attachment, 36161, null);
      delete this.attachments[attachment];
    }
  }, {
    key: "_attachRenderbuffer",
    value: function _attachRenderbuffer(_ref18) {
      var _ref18$attachment = _ref18.attachment,
          attachment = _ref18$attachment === void 0 ? 36064 : _ref18$attachment,
          renderbuffer = _ref18.renderbuffer;
      var gl = this.gl;
      gl.framebufferRenderbuffer(36160, attachment, 36161, renderbuffer.handle);
      this.attachments[attachment] = renderbuffer;
    }
  }, {
    key: "_attachTexture",
    value: function _attachTexture(_ref19) {
      var _ref19$attachment = _ref19.attachment,
          attachment = _ref19$attachment === void 0 ? 36064 : _ref19$attachment,
          texture = _ref19.texture,
          layer = _ref19.layer,
          level = _ref19.level;
      var gl = this.gl;
      gl.bindTexture(texture.target, texture.handle);

      switch (texture.target) {
        case 35866:
        case 32879:
          gl.framebufferTextureLayer(36160, attachment, texture.target, level, layer);
          break;

        case 34067:
          var face = mapIndexToCubeMapFace(layer);
          gl.framebufferTexture2D(36160, attachment, face, texture.handle, level);
          break;

        case 3553:
          gl.framebufferTexture2D(36160, attachment, 3553, texture.handle, level);
          break;

        default:
          (0, _assert.default)(false, 'Illegal texture type');
      }

      gl.bindTexture(texture.target, null);
      this.attachments[attachment] = texture;
    }
  }, {
    key: "_setReadBuffer",
    value: function _setReadBuffer(gl, readBuffer) {
      if ((0, _webglUtils.isWebGL2)(gl)) {
        gl.readBuffer(readBuffer);
      } else {
        (0, _assert.default)(readBuffer === 36064 || readBuffer === 1029, ERR_MULTIPLE_RENDERTARGETS);
      }

      this.readBuffer = readBuffer;
    }
  }, {
    key: "_setDrawBuffers",
    value: function _setDrawBuffers(gl, drawBuffers) {
      if ((0, _webglUtils.isWebGL2)(gl)) {
        gl.drawBuffers(drawBuffers);
      } else {
        var ext = gl.getExtension('WEBGL.draw_buffers');

        if (ext) {
          ext.drawBuffersWEBGL(drawBuffers);
        } else {
          (0, _assert.default)(drawBuffers.length === 1 && (drawBuffers[0] === 36064 || drawBuffers[0] === 1029), ERR_MULTIPLE_RENDERTARGETS);
        }
      }

      this.drawBuffers = drawBuffers;
    }
  }, {
    key: "_getAttachmentParameterFallback",
    value: function _getAttachmentParameterFallback(pname) {
      var caps = (0, _contextFeatures.getFeatures)(this.gl);

      switch (pname) {
        case 36052:
          return !caps.webgl2 ? 0 : null;

        case 33298:
        case 33299:
        case 33300:
        case 33301:
        case 33302:
        case 33303:
          return !caps.webgl2 ? 8 : null;

        case 33297:
          return !caps.webgl2 ? 5125 : null;

        case 33296:
          return !caps.webgl2 && !caps.EXT_sRGB ? 9729 : null;

        default:
          return null;
      }
    }
  }, {
    key: "_createHandle",
    value: function _createHandle() {
      return this.gl.createFramebuffer();
    }
  }, {
    key: "_deleteHandle",
    value: function _deleteHandle() {
      this.gl.deleteFramebuffer(this.handle);
    }
  }, {
    key: "_bindHandle",
    value: function _bindHandle(handle) {
      return this.gl.bindFramebuffer(36160, handle);
    }
  }, {
    key: "color",
    get: function get() {
      return this.attachments[36064] || null;
    }
  }, {
    key: "texture",
    get: function get() {
      return this.attachments[36064] || null;
    }
  }, {
    key: "depth",
    get: function get() {
      return this.attachments[36096] || this.attachments[33306] || null;
    }
  }, {
    key: "stencil",
    get: function get() {
      return this.attachments[36128] || this.attachments[33306] || null;
    }
  }]);

  return Framebuffer;
}(_resource.default);

exports.default = Framebuffer;

function mapIndexToCubeMapFace(layer) {
  return layer < 34069 ? layer + 34069 : layer;
}

function _getFrameBufferStatus(status) {
  var STATUS = Framebuffer.STATUS || {};
  return STATUS[status] || "Framebuffer error ".concat(status);
}

var FRAMEBUFFER_ATTACHMENT_PARAMETERS = [36049, 36048, 33296, 33298, 33299, 33300, 33301, 33302, 33303];
exports.FRAMEBUFFER_ATTACHMENT_PARAMETERS = FRAMEBUFFER_ATTACHMENT_PARAMETERS;
Framebuffer.ATTACHMENT_PARAMETERS = FRAMEBUFFER_ATTACHMENT_PARAMETERS;
//# sourceMappingURL=framebuffer.js.map