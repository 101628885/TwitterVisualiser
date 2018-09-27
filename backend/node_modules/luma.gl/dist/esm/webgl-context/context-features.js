import { isWebGL2 } from '../webgl-utils';
import { isOldIE } from '../utils';
import assert from '../utils/assert';
var WEBGL_FEATURES = {
  VERTEX_ARRAY_OBJECT: ['OES_vertex_array_object', true],
  TIMER_QUERY: ['EXT_disjoint_timer_query', 'EXT_disjoint_timer_query_webgl2'],
  INSTANCED_RENDERING: ['ANGLE_instanced_arrays', true],
  MULTIPLE_RENDER_TARGETS: ['WEBGL_draw_buffers', true],
  ELEMENT_INDEX_UINT32: ['OES_element_index_uint', true],
  BLEND_EQUATION_MINMAX: ['EXT_blend_minmax', true],
  COLOR_ENCODING_SRGB: ['EXT_sRGB', true],
  TEXTURE_DEPTH: ['WEBGL_depth_texture', true],
  TEXTURE_FLOAT: ['OES_texture_float', true],
  TEXTURE_HALF_FLOAT: ['OES_texture_half_float', true],
  TEXTURE_FILTER_LINEAR_FLOAT: ['OES_texture_float_linear'],
  TEXTURE_FILTER_LINEAR_HALF_FLOAT: ['OES_texture_half_float_linear'],
  TEXTURE_FILTER_ANISOTROPIC: ['EXT_texture_filter_anisotropic'],
  COLOR_ATTACHMENT_RGBA32F: ['WEBGL_color_buffer_float', 'EXT_color_buffer_float'],
  COLOR_ATTACHMENT_FLOAT: [false, 'EXT_color_buffer_float'],
  COLOR_ATTACHMENT_HALF_FLOAT: [false, 'EXT_color_buffer_half_float'],
  GLSL_FRAG_DATA: ['WEBGL_draw_buffers', true],
  GLSL_FRAG_DEPTH: ['EXT_frag_depth', true],
  GLSL_DERIVATIVES: ['OES_standard_derivatives', true],
  GLSL_TEXTURE_LOD: ['EXT_shader_texture_lod', true]
};
var FEATURES = {};
Object.keys(WEBGL_FEATURES).forEach(function (key) {
  FEATURES[key] = key;
});
export { FEATURES };
var compiledGlslExtensions = {};
export function canCompileGLGSExtension(gl, cap) {
  var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var feature = WEBGL_FEATURES[cap];
  assert(feature, cap);

  if (!isOldIE(opts)) {
    return true;
  }

  if (cap in compiledGlslExtensions) {
    return compiledGlslExtensions[cap];
  }

  var extensionName = feature[0];
  var source = "#extension GL_".concat(extensionName, " : enable\nvoid main(void) {}");
  var shader = gl.createShader(35633);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  var canCompile = gl.getShaderParameter(shader, 35713);
  gl.deleteShader(shader);
  compiledGlslExtensions[cap] = canCompile;
  return canCompile;
}

function getFeature(gl, cap) {
  var feature = WEBGL_FEATURES[cap];
  assert(feature, cap);
  var extensionName = isWebGL2(gl) ? feature[1] || feature[0] : feature[0];
  var value = typeof extensionName === 'string' ? Boolean(gl.getExtension(extensionName)) : extensionName;
  assert(value === false || value === true);
  return value;
}

export function hasFeature(gl, feature) {
  return hasFeatures(gl, feature);
}
export function hasFeatures(gl, features) {
  features = Array.isArray(features) ? features : [features];
  return features.every(function (feature) {
    return getFeature(gl, feature);
  });
}
export function getFeatures(gl) {
  gl.luma = gl.luma || {};

  if (!gl.luma.caps) {
    gl.luma.caps = {};
    gl.luma.caps.webgl2 = isWebGL2(gl);

    for (var cap in WEBGL_FEATURES) {
      gl.luma.caps[cap] = getFeature(gl, cap);
    }
  }

  return gl.luma.caps;
}
export var TEST_EXPORTS = {
  WEBGL_FEATURES: WEBGL_FEATURES
};
//# sourceMappingURL=context-features.js.map