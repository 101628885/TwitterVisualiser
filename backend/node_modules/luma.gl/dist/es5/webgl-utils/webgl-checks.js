"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isWebGL = isWebGL;
exports.isWebGL2 = isWebGL2;
exports.assertWebGLContext = assertWebGLContext;
exports.assertWebGL2Context = assertWebGL2Context;
exports.ERR_WEBGL2 = exports.ERR_WEBGL = exports.ERR_CONTEXT = void 0;

var _webglTypes = require("./webgl-types");

var _assert = _interopRequireDefault(require("../utils/assert"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GL_ARRAY_BUFFER = 0x8892;
var GL_TEXTURE_BINDING_3D = 0x806A;
var ERR_CONTEXT = 'Invalid WebGLRenderingContext';
exports.ERR_CONTEXT = ERR_CONTEXT;
var ERR_WEBGL = ERR_CONTEXT;
exports.ERR_WEBGL = ERR_WEBGL;
var ERR_WEBGL2 = 'Requires WebGL2';
exports.ERR_WEBGL2 = ERR_WEBGL2;

function isWebGL(glAlias) {
  return Boolean(glAlias && (glAlias instanceof _webglTypes.WebGLRenderingContext || glAlias.ARRAY_BUFFER === GL_ARRAY_BUFFER));
}

function isWebGL2(glAlias) {
  return Boolean(glAlias && (glAlias instanceof _webglTypes.WebGL2RenderingContext || glAlias.TEXTURE_BINDING_3D === GL_TEXTURE_BINDING_3D));
}

function assertWebGLContext(gl) {
  (0, _assert.default)(isWebGL(gl), ERR_CONTEXT);
}

function assertWebGL2Context(gl) {
  (0, _assert.default)(isWebGL2(gl), ERR_WEBGL2);
}
//# sourceMappingURL=webgl-checks.js.map