"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getContextLimits = getContextLimits;
exports.getParameter = getParameter;

var _WEBGL_LIMITS;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function isWebGL2(gl) {
  var GL_TEXTURE_BINDING_3D = 0x806A;
  return gl && 32874 === GL_TEXTURE_BINDING_3D;
}

var WEBGL_debug_renderer_info = 'WEBGL_debug_renderer_info';
var EXT_disjoint_timer_query = 'EXT_disjoint_timer_query';
var EXT_disjoint_timer_query_webgl2 = 'EXT_disjoint_timer_query_webgl2';
var EXT_texture_filter_anisotropic = 'EXT_texture_filter_anisotropic';
var WEBGL_LIMITS = (_WEBGL_LIMITS = {}, _defineProperty(_WEBGL_LIMITS, 33902, [new Float32Array([1, 1])]), _defineProperty(_WEBGL_LIMITS, 33901, [new Float32Array([1, 1])]), _defineProperty(_WEBGL_LIMITS, 3379, [64, 2048]), _defineProperty(_WEBGL_LIMITS, 34076, [16]), _defineProperty(_WEBGL_LIMITS, 34930, [8]), _defineProperty(_WEBGL_LIMITS, 35661, [8]), _defineProperty(_WEBGL_LIMITS, 35660, [0]), _defineProperty(_WEBGL_LIMITS, 34024, [1]), _defineProperty(_WEBGL_LIMITS, 36348, [8]), _defineProperty(_WEBGL_LIMITS, 34921, [8]), _defineProperty(_WEBGL_LIMITS, 36347, [128]), _defineProperty(_WEBGL_LIMITS, 36349, [16]), _defineProperty(_WEBGL_LIMITS, 3386, [new Int32Array([0, 0])]), _defineProperty(_WEBGL_LIMITS, 32883, [0, 256]), _defineProperty(_WEBGL_LIMITS, 35071, [0, 256]), _defineProperty(_WEBGL_LIMITS, 37447, [0, 0]), _defineProperty(_WEBGL_LIMITS, 36063, [0, 4]), _defineProperty(_WEBGL_LIMITS, 35379, [0, 0]), _defineProperty(_WEBGL_LIMITS, 35374, [0, 0]), _defineProperty(_WEBGL_LIMITS, 35377, [0, 0]), _defineProperty(_WEBGL_LIMITS, 34852, [0, 4]), _defineProperty(_WEBGL_LIMITS, 36203, [0, 0]), _defineProperty(_WEBGL_LIMITS, 33001, [0, 0]), _defineProperty(_WEBGL_LIMITS, 33000, [0, 0]), _defineProperty(_WEBGL_LIMITS, 37157, [0, 0]), _defineProperty(_WEBGL_LIMITS, 35373, [0, 0]), _defineProperty(_WEBGL_LIMITS, 35657, [0, 0]), _defineProperty(_WEBGL_LIMITS, 36183, [0, 0]), _defineProperty(_WEBGL_LIMITS, 37137, [0, 0]), _defineProperty(_WEBGL_LIMITS, 34045, [0, 0]), _defineProperty(_WEBGL_LIMITS, 35978, [0, 0]), _defineProperty(_WEBGL_LIMITS, 35979, [0, 0]), _defineProperty(_WEBGL_LIMITS, 35968, [0, 0]), _defineProperty(_WEBGL_LIMITS, 35376, [0, 0]), _defineProperty(_WEBGL_LIMITS, 35375, [0, 0]), _defineProperty(_WEBGL_LIMITS, 35659, [0, 0]), _defineProperty(_WEBGL_LIMITS, 37154, [0, 0]), _defineProperty(_WEBGL_LIMITS, 35371, [0, 0]), _defineProperty(_WEBGL_LIMITS, 35658, [0, 0]), _defineProperty(_WEBGL_LIMITS, 35076, [0, -8]), _defineProperty(_WEBGL_LIMITS, 35077, [0, 7]), _defineProperty(_WEBGL_LIMITS, 35380, [0, 0]), _WEBGL_LIMITS);

function getContextLimits(gl) {
  gl.luma = gl.luma || {};

  if (!gl.luma.limits) {
    gl.luma.limits = {};
    gl.luma.webgl1MinLimits = {};
    gl.luma.webgl2MinLimits = {};
    var isWebgl2 = isWebGL2(gl);

    for (var parameter in WEBGL_LIMITS) {
      var limit = WEBGL_LIMITS[parameter];
      var webgl1MinLimit = limit.gl1;
      var webgl2MinLimit = 'gl2' in limit ? limit.gl2 : limit.gl1;
      var minLimit = isWebgl2 ? webgl2MinLimit : webgl1MinLimit;
      var limitNotAvailable = 'gl2' in limit && !isWebgl2 || 'extension' in limit && !gl.getExtension(limit.extension);
      var value = limitNotAvailable ? minLimit : gl.getParameter(parameter);
      gl.luma.limits[parameter] = value;
      gl.luma.webgl1MinLimits[parameter] = webgl1MinLimit;
      gl.luma.webgl2MinLimits[parameter] = webgl2MinLimit;
    }
  }

  return gl.luma.limits;
}

function getParameter(gl, originalFunc, pname) {
  var GL_UNMASKED_VENDOR_WEBGL = 0x9245;
  var GL_UNMASKED_RENDERER_WEBGL = 0x9246;
  var GL_MAX_TEXTURE_MAX_ANISOTROPY_EXT = 0x84FF;
  var GL_FRAGMENT_SHADER_DERIVATIVE_HINT = 0x8B8B;
  var GL_DONT_CARE = 0x1100;
  var GL_GPU_DISJOINT_EXT = 0x8FBB;
  var extensions = gl.luma.extensions;
  var info = gl.getExtension(WEBGL_debug_renderer_info);

  switch (pname) {
    case GL_UNMASKED_VENDOR_WEBGL:
      return originalFunc(info && info.UNMASKED_VENDOR_WEBGL || 7936);

    case GL_UNMASKED_RENDERER_WEBGL:
      return originalFunc(info && info.UNMASKED_RENDERER_WEBGL || 7937);

    case GL_FRAGMENT_SHADER_DERIVATIVE_HINT:
      return !isWebGL2(gl) ? GL_DONT_CARE : undefined;

    case GL_GPU_DISJOINT_EXT:
      var hasTimerQueries = !extensions[EXT_disjoint_timer_query] && !extensions[EXT_disjoint_timer_query_webgl2];
      return hasTimerQueries ? 0 : undefined;

    case GL_MAX_TEXTURE_MAX_ANISOTROPY_EXT:
      var ext = gl.luma.extensions[EXT_texture_filter_anisotropic];
      pname = ext && ext.MAX_TEXTURE_MAX_ANISOTROPY_EXT;
      return !pname ? 1.0 : undefined;

    default:
      return undefined;
  }
}
//# sourceMappingURL=get-parameter.js.map