import { isWebGL2 } from '../webgl-utils';
const WEBGL_LIMITS = {
  [33902]: {
    gl1: new Float32Array([1, 1])
  },
  [33901]: {
    gl1: new Float32Array([1, 1])
  },
  [3379]: {
    gl1: 64,
    gl2: 2048
  },
  [34076]: {
    gl1: 16
  },
  [34930]: {
    gl1: 8
  },
  [35661]: {
    gl1: 8
  },
  [35660]: {
    gl1: 0
  },
  [34024]: {
    gl1: 1
  },
  [36348]: {
    gl1: 8
  },
  [34921]: {
    gl1: 8
  },
  [36347]: {
    gl1: 128
  },
  [36349]: {
    gl1: 16
  },
  [3386]: {
    gl1: new Int32Array([0, 0])
  },
  [32883]: {
    gl1: 0,
    gl2: 256
  },
  [35071]: {
    gl1: 0,
    gl2: 256
  },
  [37447]: {
    gl1: 0,
    gl2: 0
  },
  [36063]: {
    gl1: 0,
    gl2: 4
  },
  [35379]: {
    gl1: 0,
    gl2: 0
  },
  [35374]: {
    gl1: 0,
    gl2: 0
  },
  [35377]: {
    gl1: 0,
    gl2: 0
  },
  [34852]: {
    gl1: 0,
    gl2: 4
  },
  [36203]: {
    gl1: 0,
    gl2: 0
  },
  [33001]: {
    gl1: 0,
    gl2: 0
  },
  [33000]: {
    gl1: 0,
    gl2: 0
  },
  [37157]: {
    gl1: 0,
    gl2: 0
  },
  [35373]: {
    gl1: 0,
    gl2: 0
  },
  [35657]: {
    gl1: 0,
    gl2: 0
  },
  [36183]: {
    gl1: 0,
    gl2: 0
  },
  [37137]: {
    gl1: 0,
    gl2: 0
  },
  [34045]: {
    gl1: 0,
    gl2: 0
  },
  [35978]: {
    gl1: 0,
    gl2: 0
  },
  [35979]: {
    gl1: 0,
    gl2: 0
  },
  [35968]: {
    gl1: 0,
    gl2: 0
  },
  [35376]: {
    gl1: 0,
    gl2: 0
  },
  [35375]: {
    gl1: 0,
    gl2: 0
  },
  [35659]: {
    gl1: 0,
    gl2: 0
  },
  [37154]: {
    gl1: 0,
    gl2: 0
  },
  [35371]: {
    gl1: 0,
    gl2: 0
  },
  [35658]: {
    gl1: 0,
    gl2: 0
  },
  [35076]: {
    gl1: 0,
    gl2: -8,
    negative: true
  },
  [35077]: {
    gl1: 0,
    gl2: 7
  },
  [35380]: {
    gl1: 0,
    gl2: 0
  }
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
export function getGLContextInfo(gl) {
  gl.luma = gl.luma || {};

  if (!gl.luma.info) {
    const info = gl.getExtension('WEBGL_debug_renderer_info');
    gl.luma.info = {
      [7936]: gl.getParameter(7936),
      [7937]: gl.getParameter(7937),
      [37445]: gl.getParameter(info && info.UNMASKED_VENDOR_WEBGL || 7936),
      [37446]: gl.getParameter(info && info.UNMASKED_RENDERER_WEBGL || 7937),
      [7938]: gl.getParameter(7938),
      [35724]: gl.getParameter(35724)
    };
  }

  return gl.luma.info;
}
const GL_UNMASKED_VENDOR_WEBGL = 0x9245;
const GL_UNMASKED_RENDERER_WEBGL = 0x9246;
export function getGLContextInfo2(gl) {
  const vendorMasked = gl.getParameter(7936);
  const rendererMasked = gl.getParameter(7937);
  const ext = gl.getExtension('WEBGL_debug_renderer_info');
  const vendorUnmasked = ext && gl.getParameter(ext.UNMASKED_VENDOR_WEBGL || 7936);
  const rendererUnmasked = ext && gl.getParameter(ext.UNMASKED_RENDERER_WEBGL || 7937);
  return {
    vendor: vendorUnmasked || vendorMasked,
    renderer: rendererUnmasked || rendererMasked,
    vendorMasked,
    rendererMasked,
    version: gl.getParameter(7938),
    shadingLanguageVersion: gl.getParameter(35724)
  };
}
export function getContextInfo(gl) {
  const limits = getContextLimits(gl);
  const info = getGLContextInfo(gl);
  return {
    vendor: info[GL_UNMASKED_VENDOR_WEBGL] || info[7936],
    renderer: info[GL_UNMASKED_RENDERER_WEBGL] || info[7937],
    version: info[7938],
    shadingLanguageVersion: info[35724],
    info,
    limits,
    webgl1MinLimits: gl.luma.webgl1MinLimits,
    webgl2MinLimits: gl.luma.webgl2MinLimits
  };
}
export function glGetDebugInfo(gl) {
  return getGLContextInfo2(gl);
}
export const TEST_EXPORTS = {
  WEBGL_LIMITS
};
//# sourceMappingURL=context-limits.js.map