function isWebGL2(gl) {
  const GL_TEXTURE_BINDING_3D = 0x806A;
  return gl && 32874 === GL_TEXTURE_BINDING_3D;
}

const WEBGL_debug_renderer_info = 'WEBGL_debug_renderer_info';
const EXT_disjoint_timer_query = 'EXT_disjoint_timer_query';
const EXT_disjoint_timer_query_webgl2 = 'EXT_disjoint_timer_query_webgl2';
const EXT_texture_filter_anisotropic = 'EXT_texture_filter_anisotropic';
const WEBGL_LIMITS = {
  [33902]: [new Float32Array([1, 1])],
  [33901]: [new Float32Array([1, 1])],
  [3379]: [64, 2048],
  [34076]: [16],
  [34930]: [8],
  [35661]: [8],
  [35660]: [0],
  [34024]: [1],
  [36348]: [8],
  [34921]: [8],
  [36347]: [128],
  [36349]: [16],
  [3386]: [new Int32Array([0, 0])],
  [32883]: [0, 256],
  [35071]: [0, 256],
  [37447]: [0, 0],
  [36063]: [0, 4],
  [35379]: [0, 0],
  [35374]: [0, 0],
  [35377]: [0, 0],
  [34852]: [0, 4],
  [36203]: [0, 0],
  [33001]: [0, 0],
  [33000]: [0, 0],
  [37157]: [0, 0],
  [35373]: [0, 0],
  [35657]: [0, 0],
  [36183]: [0, 0],
  [37137]: [0, 0],
  [34045]: [0, 0],
  [35978]: [0, 0],
  [35979]: [0, 0],
  [35968]: [0, 0],
  [35376]: [0, 0],
  [35375]: [0, 0],
  [35659]: [0, 0],
  [37154]: [0, 0],
  [35371]: [0, 0],
  [35658]: [0, 0],
  [35076]: [0, -8],
  [35077]: [0, 7],
  [35380]: [0, 0]
};
export function getContextLimits(gl) {
  gl.luma = gl.luma || {};

  if (!gl.luma.limits) {
    gl.luma.limits = {};
    gl.luma.webgl1MinLimits = {};
    gl.luma.webgl2MinLimits = {};
    const isWebgl2 = isWebGL2(gl);

    for (const parameter in WEBGL_LIMITS) {
      const limit = WEBGL_LIMITS[parameter];
      const webgl1MinLimit = limit.gl1;
      const webgl2MinLimit = 'gl2' in limit ? limit.gl2 : limit.gl1;
      const minLimit = isWebgl2 ? webgl2MinLimit : webgl1MinLimit;
      const limitNotAvailable = 'gl2' in limit && !isWebgl2 || 'extension' in limit && !gl.getExtension(limit.extension);
      const value = limitNotAvailable ? minLimit : gl.getParameter(parameter);
      gl.luma.limits[parameter] = value;
      gl.luma.webgl1MinLimits[parameter] = webgl1MinLimit;
      gl.luma.webgl2MinLimits[parameter] = webgl2MinLimit;
    }
  }

  return gl.luma.limits;
}
export function getParameter(gl, originalFunc, pname) {
  const GL_UNMASKED_VENDOR_WEBGL = 0x9245;
  const GL_UNMASKED_RENDERER_WEBGL = 0x9246;
  const GL_MAX_TEXTURE_MAX_ANISOTROPY_EXT = 0x84FF;
  const GL_FRAGMENT_SHADER_DERIVATIVE_HINT = 0x8B8B;
  const GL_DONT_CARE = 0x1100;
  const GL_GPU_DISJOINT_EXT = 0x8FBB;
  const extensions = gl.luma.extensions;
  const info = gl.getExtension(WEBGL_debug_renderer_info);

  switch (pname) {
    case GL_UNMASKED_VENDOR_WEBGL:
      return originalFunc(info && info.UNMASKED_VENDOR_WEBGL || 7936);

    case GL_UNMASKED_RENDERER_WEBGL:
      return originalFunc(info && info.UNMASKED_RENDERER_WEBGL || 7937);

    case GL_FRAGMENT_SHADER_DERIVATIVE_HINT:
      return !isWebGL2(gl) ? GL_DONT_CARE : undefined;

    case GL_GPU_DISJOINT_EXT:
      const hasTimerQueries = !extensions[EXT_disjoint_timer_query] && !extensions[EXT_disjoint_timer_query_webgl2];
      return hasTimerQueries ? 0 : undefined;

    case GL_MAX_TEXTURE_MAX_ANISOTROPY_EXT:
      const ext = gl.luma.extensions[EXT_texture_filter_anisotropic];
      pname = ext && ext.MAX_TEXTURE_MAX_ANISOTROPY_EXT;
      return !pname ? 1.0 : undefined;

    default:
      return undefined;
  }
}
//# sourceMappingURL=get-parameter.js.map