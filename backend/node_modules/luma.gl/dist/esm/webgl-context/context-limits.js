var _WEBGL_LIMITS;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { isWebGL2 } from '../webgl-utils';
var WEBGL_LIMITS = (_WEBGL_LIMITS = {}, _defineProperty(_WEBGL_LIMITS, 33902, {
  gl1: new Float32Array([1, 1])
}), _defineProperty(_WEBGL_LIMITS, 33901, {
  gl1: new Float32Array([1, 1])
}), _defineProperty(_WEBGL_LIMITS, 3379, {
  gl1: 64,
  gl2: 2048
}), _defineProperty(_WEBGL_LIMITS, 34076, {
  gl1: 16
}), _defineProperty(_WEBGL_LIMITS, 34930, {
  gl1: 8
}), _defineProperty(_WEBGL_LIMITS, 35661, {
  gl1: 8
}), _defineProperty(_WEBGL_LIMITS, 35660, {
  gl1: 0
}), _defineProperty(_WEBGL_LIMITS, 34024, {
  gl1: 1
}), _defineProperty(_WEBGL_LIMITS, 36348, {
  gl1: 8
}), _defineProperty(_WEBGL_LIMITS, 34921, {
  gl1: 8
}), _defineProperty(_WEBGL_LIMITS, 36347, {
  gl1: 128
}), _defineProperty(_WEBGL_LIMITS, 36349, {
  gl1: 16
}), _defineProperty(_WEBGL_LIMITS, 3386, {
  gl1: new Int32Array([0, 0])
}), _defineProperty(_WEBGL_LIMITS, 32883, {
  gl1: 0,
  gl2: 256
}), _defineProperty(_WEBGL_LIMITS, 35071, {
  gl1: 0,
  gl2: 256
}), _defineProperty(_WEBGL_LIMITS, 37447, {
  gl1: 0,
  gl2: 0
}), _defineProperty(_WEBGL_LIMITS, 36063, {
  gl1: 0,
  gl2: 4
}), _defineProperty(_WEBGL_LIMITS, 35379, {
  gl1: 0,
  gl2: 0
}), _defineProperty(_WEBGL_LIMITS, 35374, {
  gl1: 0,
  gl2: 0
}), _defineProperty(_WEBGL_LIMITS, 35377, {
  gl1: 0,
  gl2: 0
}), _defineProperty(_WEBGL_LIMITS, 34852, {
  gl1: 0,
  gl2: 4
}), _defineProperty(_WEBGL_LIMITS, 36203, {
  gl1: 0,
  gl2: 0
}), _defineProperty(_WEBGL_LIMITS, 33001, {
  gl1: 0,
  gl2: 0
}), _defineProperty(_WEBGL_LIMITS, 33000, {
  gl1: 0,
  gl2: 0
}), _defineProperty(_WEBGL_LIMITS, 37157, {
  gl1: 0,
  gl2: 0
}), _defineProperty(_WEBGL_LIMITS, 35373, {
  gl1: 0,
  gl2: 0
}), _defineProperty(_WEBGL_LIMITS, 35657, {
  gl1: 0,
  gl2: 0
}), _defineProperty(_WEBGL_LIMITS, 36183, {
  gl1: 0,
  gl2: 0
}), _defineProperty(_WEBGL_LIMITS, 37137, {
  gl1: 0,
  gl2: 0
}), _defineProperty(_WEBGL_LIMITS, 34045, {
  gl1: 0,
  gl2: 0
}), _defineProperty(_WEBGL_LIMITS, 35978, {
  gl1: 0,
  gl2: 0
}), _defineProperty(_WEBGL_LIMITS, 35979, {
  gl1: 0,
  gl2: 0
}), _defineProperty(_WEBGL_LIMITS, 35968, {
  gl1: 0,
  gl2: 0
}), _defineProperty(_WEBGL_LIMITS, 35376, {
  gl1: 0,
  gl2: 0
}), _defineProperty(_WEBGL_LIMITS, 35375, {
  gl1: 0,
  gl2: 0
}), _defineProperty(_WEBGL_LIMITS, 35659, {
  gl1: 0,
  gl2: 0
}), _defineProperty(_WEBGL_LIMITS, 37154, {
  gl1: 0,
  gl2: 0
}), _defineProperty(_WEBGL_LIMITS, 35371, {
  gl1: 0,
  gl2: 0
}), _defineProperty(_WEBGL_LIMITS, 35658, {
  gl1: 0,
  gl2: 0
}), _defineProperty(_WEBGL_LIMITS, 35076, {
  gl1: 0,
  gl2: -8,
  negative: true
}), _defineProperty(_WEBGL_LIMITS, 35077, {
  gl1: 0,
  gl2: 7
}), _defineProperty(_WEBGL_LIMITS, 35380, {
  gl1: 0,
  gl2: 0
}), _WEBGL_LIMITS);
export function getContextLimits(gl) {
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
export function getGLContextInfo(gl) {
  gl.luma = gl.luma || {};

  if (!gl.luma.info) {
    var _gl$luma$info;

    var info = gl.getExtension('WEBGL_debug_renderer_info');
    gl.luma.info = (_gl$luma$info = {}, _defineProperty(_gl$luma$info, 7936, gl.getParameter(7936)), _defineProperty(_gl$luma$info, 7937, gl.getParameter(7937)), _defineProperty(_gl$luma$info, 37445, gl.getParameter(info && info.UNMASKED_VENDOR_WEBGL || 7936)), _defineProperty(_gl$luma$info, 37446, gl.getParameter(info && info.UNMASKED_RENDERER_WEBGL || 7937)), _defineProperty(_gl$luma$info, 7938, gl.getParameter(7938)), _defineProperty(_gl$luma$info, 35724, gl.getParameter(35724)), _gl$luma$info);
  }

  return gl.luma.info;
}
var GL_UNMASKED_VENDOR_WEBGL = 0x9245;
var GL_UNMASKED_RENDERER_WEBGL = 0x9246;
export function getGLContextInfo2(gl) {
  var vendorMasked = gl.getParameter(7936);
  var rendererMasked = gl.getParameter(7937);
  var ext = gl.getExtension('WEBGL_debug_renderer_info');
  var vendorUnmasked = ext && gl.getParameter(ext.UNMASKED_VENDOR_WEBGL || 7936);
  var rendererUnmasked = ext && gl.getParameter(ext.UNMASKED_RENDERER_WEBGL || 7937);
  return {
    vendor: vendorUnmasked || vendorMasked,
    renderer: rendererUnmasked || rendererMasked,
    vendorMasked: vendorMasked,
    rendererMasked: rendererMasked,
    version: gl.getParameter(7938),
    shadingLanguageVersion: gl.getParameter(35724)
  };
}
export function getContextInfo(gl) {
  var limits = getContextLimits(gl);
  var info = getGLContextInfo(gl);
  return {
    vendor: info[GL_UNMASKED_VENDOR_WEBGL] || info[7936],
    renderer: info[GL_UNMASKED_RENDERER_WEBGL] || info[7937],
    version: info[7938],
    shadingLanguageVersion: info[35724],
    info: info,
    limits: limits,
    webgl1MinLimits: gl.luma.webgl1MinLimits,
    webgl2MinLimits: gl.luma.webgl2MinLimits
  };
}
export function glGetDebugInfo(gl) {
  return getGLContextInfo2(gl);
}
export var TEST_EXPORTS = {
  WEBGL_LIMITS: WEBGL_LIMITS
};
//# sourceMappingURL=context-limits.js.map