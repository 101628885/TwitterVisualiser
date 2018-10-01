"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WebGL2RenderingContext = exports.WebGLShaderPrecisionFormat = exports.WebGLActiveInfo = exports.WebGLUniformLocation = exports.WebGLTexture = exports.WebGLRenderbuffer = exports.WebGLFramebuffer = exports.WebGLBuffer = exports.WebGLShader = exports.WebGLProgram = exports.WebGLRenderingContext = exports.Image = exports.webGLTypesAvailable = exports.headlessGL = exports.headlessTypes = exports.ERR_HEADLESSGL_LOAD = void 0;

var _globals = require("../utils/globals");

var _isBrowser = _interopRequireDefault(require("../utils/is-browser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ERR_HEADLESSGL_LOAD = "luma.gl: loaded under Node.js without headless gl installed, meaning that WebGL contexts can not be created. This may not be an error. For example, this is a typical configuration for isorender applications running on the server.";
exports.ERR_HEADLESSGL_LOAD = ERR_HEADLESSGL_LOAD;
var headlessTypes = null;
exports.headlessTypes = headlessTypes;

var headlessGL = function headlessGL() {
  throw new Error(ERR_HEADLESSGL_LOAD);
};

exports.headlessGL = headlessGL;

if (!_isBrowser.default) {
  try {
    exports.headlessGL = headlessGL = module.require('gl');
    exports.headlessTypes = headlessTypes = module.require('gl/wrap');
  } catch (error) {
    console.info(ERR_HEADLESSGL_LOAD);
  }
}

var DummyType = function DummyType() {
  _classCallCheck(this, DummyType);
};

var _ref = headlessTypes || _globals.global,
    _ref$WebGLRenderingCo = _ref.WebGLRenderingContext,
    WebGLRenderingContext = _ref$WebGLRenderingCo === void 0 ? DummyType : _ref$WebGLRenderingCo,
    _ref$WebGLProgram = _ref.WebGLProgram,
    WebGLProgram = _ref$WebGLProgram === void 0 ? DummyType : _ref$WebGLProgram,
    _ref$WebGLShader = _ref.WebGLShader,
    WebGLShader = _ref$WebGLShader === void 0 ? DummyType : _ref$WebGLShader,
    _ref$WebGLBuffer = _ref.WebGLBuffer,
    WebGLBuffer = _ref$WebGLBuffer === void 0 ? DummyType : _ref$WebGLBuffer,
    _ref$WebGLFramebuffer = _ref.WebGLFramebuffer,
    WebGLFramebuffer = _ref$WebGLFramebuffer === void 0 ? DummyType : _ref$WebGLFramebuffer,
    _ref$WebGLRenderbuffe = _ref.WebGLRenderbuffer,
    WebGLRenderbuffer = _ref$WebGLRenderbuffe === void 0 ? DummyType : _ref$WebGLRenderbuffe,
    _ref$WebGLTexture = _ref.WebGLTexture,
    WebGLTexture = _ref$WebGLTexture === void 0 ? DummyType : _ref$WebGLTexture,
    _ref$WebGLUniformLoca = _ref.WebGLUniformLocation,
    WebGLUniformLocation = _ref$WebGLUniformLoca === void 0 ? DummyType : _ref$WebGLUniformLoca,
    _ref$WebGLActiveInfo = _ref.WebGLActiveInfo,
    WebGLActiveInfo = _ref$WebGLActiveInfo === void 0 ? DummyType : _ref$WebGLActiveInfo,
    _ref$WebGLShaderPreci = _ref.WebGLShaderPrecisionFormat,
    WebGLShaderPrecisionFormat = _ref$WebGLShaderPreci === void 0 ? DummyType : _ref$WebGLShaderPreci;

exports.WebGLShaderPrecisionFormat = WebGLShaderPrecisionFormat;
exports.WebGLActiveInfo = WebGLActiveInfo;
exports.WebGLUniformLocation = WebGLUniformLocation;
exports.WebGLTexture = WebGLTexture;
exports.WebGLRenderbuffer = WebGLRenderbuffer;
exports.WebGLFramebuffer = WebGLFramebuffer;
exports.WebGLBuffer = WebGLBuffer;
exports.WebGLShader = WebGLShader;
exports.WebGLProgram = WebGLProgram;
exports.WebGLRenderingContext = WebGLRenderingContext;
var webGLTypesAvailable = WebGLRenderingContext !== DummyType && WebGLProgram !== DummyType && WebGLShader !== DummyType && WebGLBuffer !== DummyType && WebGLFramebuffer !== DummyType && WebGLRenderbuffer !== DummyType && WebGLTexture !== DummyType && WebGLUniformLocation !== DummyType && WebGLActiveInfo !== DummyType && WebGLShaderPrecisionFormat !== DummyType;
exports.webGLTypesAvailable = webGLTypesAvailable;

function getWebGL2RenderingContext() {
  var WebGL2RenderingContextNotSupported = function WebGL2RenderingContextNotSupported() {
    _classCallCheck(this, WebGL2RenderingContextNotSupported);
  };

  return _globals.global.WebGL2RenderingContext || WebGL2RenderingContextNotSupported;
}

function getImage() {
  var ImageNotSupported = function ImageNotSupported() {
    _classCallCheck(this, ImageNotSupported);
  };

  return _globals.global.Image || ImageNotSupported;
}

var WebGL2RenderingContext = getWebGL2RenderingContext();
exports.WebGL2RenderingContext = WebGL2RenderingContext;
var Image = getImage();
exports.Image = Image;
//# sourceMappingURL=webgl-types.js.map