import { getParameterPolyfill } from './polyfill-get-parameter';

function assert(condition, message) {
  if (!condition) {
    throw new Error(message || 'luma.gl: assertion failed.');
  }
}

const OES_vertex_array_object = 'OES_vertex_array_object';
const ANGLE_instanced_arrays = 'ANGLE_instanced_arrays';
const WEBGL_draw_buffers = 'WEBGL_draw_buffers';
const EXT_disjoint_timer_query = 'EXT_disjoint_timer_query';
const EXT_disjoint_timer_query_webgl2 = 'EXT_disjoint_timer_query_webgl2';
const EXT_texture_filter_anisotropic = 'EXT_texture_filter_anisotropic';
const ERR_VAO_NOT_SUPPORTED = 'VertexArray requires WebGL2 or OES_vertex_array_object extension';

function isWebGL2(gl) {
  return gl && 32874 === 32874;
}

function getExtensionData(gl, extension) {
  return {
    webgl2: isWebGL2(gl),
    ext: gl.getExtension(extension)
  };
}

const WEBGL_CONTEXT_POLYFILLS = {
  [OES_vertex_array_object]: {
    meta: {
      suffix: 'OES'
    },
    createVertexArray: () => {
      assert(false, ERR_VAO_NOT_SUPPORTED);
    },
    deleteVertexArray: () => {},
    bindVertexArray: () => {},
    isVertexArray: () => false
  },
  [ANGLE_instanced_arrays]: {
    meta: {
      suffix: 'ANGLE'
    },

    vertexAttribDivisor(location, divisor) {
      assert(divisor === 0, 'WebGL instanced rendering not supported');
    },

    drawElementsInstanced: () => {},
    drawArraysInstanced: () => {}
  },
  [WEBGL_draw_buffers]: {
    meta: {
      suffix: 'WEBGL'
    },
    drawBuffers: () => {
      assert(false);
    }
  },
  [EXT_disjoint_timer_query]: {
    meta: {
      suffix: 'EXT'
    },
    createQuery: () => {
      assert(false);
    },
    deleteQuery: () => {
      assert(false);
    },
    beginQuery: () => {
      assert(false);
    },
    endQuery: () => {},

    getQuery(handle, pname) {
      return this.getQueryObject(handle, pname);
    },

    getQueryParameter(handle, pname) {
      return this.getQueryObject(handle, pname);
    },

    queryCounter: () => {},
    getQueryObject: () => {}
  },
  [EXT_disjoint_timer_query_webgl2]: {
    meta: {
      suffix: 'EXT'
    },
    queryCounter: null
  },
  OVERRIDES: {
    readBuffer: (gl, originalFunc, attachment) => {
      if (isWebGL2(gl)) {
        originalFunc(attachment);
      } else {}
    },
    getVertexAttrib: (gl, originalFunc, location, pname) => {
      const _getExtensionData = getExtensionData(gl, ANGLE_instanced_arrays),
            webgl2 = _getExtensionData.webgl2,
            ext = _getExtensionData.ext;

      let result;

      switch (pname) {
        case 35069:
          result = !webgl2 ? false : undefined;
          break;

        case 35070:
          result = !webgl2 && !ext ? 0 : undefined;
          break;

        default:
      }

      return result !== undefined ? result : originalFunc(location, pname);
    },
    getProgramParameter: (gl, originalFunc, program, pname) => {
      if (!isWebGL2(gl)) {
        switch (pname) {
          case 35967:
            return 35981;

          case 35971:
            return 0;

          case 35382:
            return 0;

          default:
        }
      }

      return originalFunc(program, pname);
    },
    getInternalformatParameter: (gl, originalFunc, target, format, pname) => {
      if (!isWebGL2(gl)) {
        switch (pname) {
          case 32937:
            return new Int32Array([0]);

          default:
        }
      }

      return gl.getInternalformatParameter(target, format, pname);
    },

    getTexParameter(gl, originalFunc, target, pname) {
      switch (pname) {
        case 34046:
          const extensions = gl.luma.extensions;
          const ext = extensions[EXT_texture_filter_anisotropic];
          pname = ext && ext.TEXTURE_MAX_ANISOTROPY_EXT || 34046;
          break;

        default:
      }

      return originalFunc(target, pname);
    },

    getParameter: getParameterPolyfill,

    hint(gl, originalFunc, pname, value) {
      return originalFunc(pname, value);
    }

  }
};

function initializeExtensions(gl) {
  gl.luma.extensions = {};
  const EXTENSIONS = gl.getSupportedExtensions();

  for (const extension of EXTENSIONS) {
    gl.luma[extension] = gl.getExtension(extension);
  }
}

function polyfillExtension(gl, {
  extension,
  target,
  target2
}) {
  const defaults = WEBGL_CONTEXT_POLYFILLS[extension];
  assert(defaults);
  const _defaults$meta = defaults.meta,
        meta = _defaults$meta === void 0 ? {} : _defaults$meta;
  const _meta$suffix = meta.suffix,
        suffix = _meta$suffix === void 0 ? '' : _meta$suffix;
  const ext = gl.getExtension(extension);
  Object.keys(defaults).forEach(key => {
    const extKey = `${key}${suffix}`;
    let polyfill = null;

    if (key === 'meta') {} else if (typeof gl[key] === 'function') {} else if (ext && typeof ext[extKey] === 'function') {
      polyfill = (...args) => ext[extKey](...args);
    } else if (typeof defaults[key] === 'function') {
      polyfill = defaults[key].bind(target);
    }

    if (polyfill) {
      target[key] = polyfill;
      target2[key] = polyfill;
    }
  });
}

function installOverrides(gl, {
  target,
  target2
}) {
  const OVERRIDES = WEBGL_CONTEXT_POLYFILLS.OVERRIDES;
  Object.keys(OVERRIDES).forEach(key => {
    if (typeof OVERRIDES[key] === 'function') {
      const originalFunc = gl[key] ? gl[key].bind(gl) : () => {};
      const polyfill = OVERRIDES[key].bind(null, gl, originalFunc);
      target[key] = polyfill;
      target2[key] = polyfill;
    }
  });
}

export default function polyfillContext(gl) {
  gl.luma = gl.luma || {};
  initializeExtensions(gl);

  if (!gl.luma.polyfilled) {
    for (const extension in WEBGL_CONTEXT_POLYFILLS) {
      if (extension !== 'overrides') {
        polyfillExtension(gl, {
          extension,
          target: gl.luma,
          target2: gl
        });
      }
    }

    installOverrides(gl, {
      target: gl.luma,
      target2: gl
    });
    gl.luma.polyfilled = true;
  }

  return gl;
}
const global_ = typeof global !== 'undefined' ? global : window;
global_.polyfillContext = polyfillContext;
//# sourceMappingURL=polyfill-context.js.map