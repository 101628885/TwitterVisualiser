"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _texture = _interopRequireDefault(require("./texture"));

var _assert = _interopRequireDefault(require("../utils/assert"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

var FACES = [34069, 34070, 34071, 34072, 34073, 34074];

var TextureCube = function (_Texture) {
  _inherits(TextureCube, _Texture);

  function TextureCube(gl) {
    var _this;

    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, TextureCube);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(TextureCube).call(this, gl, Object.assign({}, opts, {
      target: 34067
    })));

    _this.initialize(opts);

    Object.seal(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(TextureCube, [{
    key: "initialize",
    value: function initialize() {
      var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var _opts$format = opts.format,
          format = _opts$format === void 0 ? 6408 : _opts$format,
          _opts$mipmaps = opts.mipmaps,
          mipmaps = _opts$mipmaps === void 0 ? true : _opts$mipmaps;
      var _opts$width = opts.width,
          width = _opts$width === void 0 ? 1 : _opts$width,
          _opts$height = opts.height,
          height = _opts$height === void 0 ? 1 : _opts$height,
          _opts$type = opts.type,
          type = _opts$type === void 0 ? 5121 : _opts$type,
          dataFormat = opts.dataFormat;

      var _this$_deduceParamete = this._deduceParameters({
        format: format,
        type: type,
        dataFormat: dataFormat
      });

      type = _this$_deduceParamete.type;
      dataFormat = _this$_deduceParamete.dataFormat;

      var _this$_deduceImageSiz = this._deduceImageSize({
        data: opts[34069],
        width: width,
        height: height
      });

      width = _this$_deduceImageSiz.width;
      height = _this$_deduceImageSiz.height;
      (0, _assert.default)(width === height);
      this.setCubeMapImageData(opts);

      if (mipmaps) {
        this.generateMipmap(opts);
      }

      this.opts = opts;
    }
  }, {
    key: "subImage",
    value: function subImage(_ref) {
      var face = _ref.face,
          data = _ref.data,
          _ref$x = _ref.x,
          x = _ref$x === void 0 ? 0 : _ref$x,
          _ref$y = _ref.y,
          y = _ref$y === void 0 ? 0 : _ref$y,
          _ref$mipmapLevel = _ref.mipmapLevel,
          mipmapLevel = _ref$mipmapLevel === void 0 ? 0 : _ref$mipmapLevel;
      return this._subImage({
        target: face,
        data: data,
        x: x,
        y: y,
        mipmapLevel: mipmapLevel
      });
    }
  }, {
    key: "setCubeMapImageData",
    value: function setCubeMapImageData(_ref2) {
      var width = _ref2.width,
          height = _ref2.height,
          pixels = _ref2.pixels,
          data = _ref2.data,
          _ref2$border = _ref2.border,
          border = _ref2$border === void 0 ? 0 : _ref2$border,
          _ref2$format = _ref2.format,
          format = _ref2$format === void 0 ? 6408 : _ref2$format,
          _ref2$type = _ref2.type,
          type = _ref2$type === void 0 ? 5121 : _ref2$type,
          _ref2$generateMipmap = _ref2.generateMipmap,
          generateMipmap = _ref2$generateMipmap === void 0 ? false : _ref2$generateMipmap;
      var gl = this.gl;
      pixels = pixels || data;
      this.bind();

      if (this.width || this.height) {
        for (var _i = 0; _i < FACES.length; _i++) {
          var face = FACES[_i];
          gl.texImage2D(face, 0, format, width, height, border, format, type, pixels[face]);
        }
      } else {
        for (var _i2 = 0; _i2 < FACES.length; _i2++) {
          var _face = FACES[_i2];
          gl.texImage2D(_face, 0, format, format, type, pixels[_face]);
        }
      }
    }
  }, {
    key: "bind",
    value: function bind() {
      var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          index = _ref3.index;

      if (index !== undefined) {
        this.gl.activeTexture(33984 + index);
      }

      this.gl.bindTexture(34067, this.handle);
      return index;
    }
  }, {
    key: "unbind",
    value: function unbind() {
      this.gl.bindTexture(34067, null);
      return this;
    }
  }]);

  return TextureCube;
}(_texture.default);

exports.default = TextureCube;
TextureCube.FACES = FACES;
//# sourceMappingURL=texture-cube.js.map