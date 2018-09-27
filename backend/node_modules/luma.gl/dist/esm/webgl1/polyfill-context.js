var _WEBGL_CONTEXT_POLYFI;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { getParameterPolyfill } from './polyfill-get-parameter';

function assert(condition, message) {
  if (!condition) {
    throw new Error(message || 'luma.gl: assertion failed.');
  }
}

var OES_vertex_array_object = 'OES_vertex_array_object';
var ANGLE_instanced_arrays = 'ANGLE_instanced_arrays';
var WEBGL_draw_buffers = 'WEBGL_draw_buffers';
var EXT_disjoint_timer_query = 'EXT_disjoint_timer_query';
var EXT_disjoint_timer_query_webgl2 = 'EXT_disjoint_timer_query_webgl2';
var EXT_texture_filter_anisotropic = 'EXT_texture_filter_anisotropic';
var ERR_VAO_NOT_SUPPORTED = 'VertexArray requires WebGL2 or OES_vertex_array_object extension';

function isWebGL2(gl) {
  return gl && 32874 === 32874;
}

function getExtensionData(gl, extension) {
  return {
    webgl2: isWebGL2(gl),
    ext: gl.getExtension(extension)
  };
}

var WEBGL_CONTEXT_POLYFILLS = (_WEBGL_CONTEXT_POLYFI = {}, _defineProperty(_WEBGL_CONTEXT_POLYFI, OES_vertex_array_object, {
  meta: {
    suffix: 'OES'
  },
  createVertexArray: function createVertexArray() {
    assert(false, ERR_VAO_NOT_SUPPORTED);
  },
  deleteVertexArray: function deleteVertexArray() {},
  bindVertexArray: function bindVertexArray() {},
  isVertexArray: function isVertexArray() {
    return false;
  }
}), _defineProperty(_WEBGL_CONTEXT_POLYFI, ANGLE_instanced_arrays, {
  meta: {
    suffix: 'ANGLE'
  },
  vertexAttribDivisor: function vertexAttribDivisor(location, divisor) {
    assert(divisor === 0, 'WebGL instanced rendering not supported');
  },
  drawElementsInstanced: function drawElementsInstanced() {},
  drawArraysInstanced: function drawArraysInstanced() {}
}), _defineProperty(_WEBGL_CONTEXT_POLYFI, WEBGL_draw_buffers, {
  meta: {
    suffix: 'WEBGL'
  },
  drawBuffers: function drawBuffers() {
    assert(false);
  }
}), _defineProperty(_WEBGL_CONTEXT_POLYFI, EXT_disjoint_timer_query, {
  meta: {
    suffix: 'EXT'
  },
  createQuery: function createQuery() {
    assert(false);
  },
  deleteQuery: function deleteQuery() {
    assert(false);
  },
  beginQuery: function beginQuery() {
    assert(false);
  },
  endQuery: function endQuery() {},
  getQuery: function getQuery(handle, pname) {
    return this.getQueryObject(handle, pname);
  },
  getQueryParameter: function getQueryParameter(handle, pname) {
    return this.getQueryObject(handle, pname);
  },
  queryCounter: function queryCounter() {},
  getQueryObject: function getQueryObject() {}
}), _defineProperty(_WEBGL_CONTEXT_POLYFI, EXT_disjoint_timer_query_webgl2, {
  meta: {
    suffix: 'EXT'
  },
  queryCounter: null
}), _defineProperty(_WEBGL_CONTEXT_POLYFI, "OVERRIDES", {
  readBuffer: function readBuffer(gl, originalFunc, attachment) {
    if (isWebGL2(gl)) {
      originalFunc(attachment);
    } else {}
  },
  getVertexAttrib: function getVertexAttrib(gl, originalFunc, location, pname) {
    var _getExtensionData = getExtensionData(gl, ANGLE_instanced_arrays),
        webgl2 = _getExtensionData.webgl2,
        ext = _getExtensionData.ext;

    var result;

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
  getProgramParameter: function getProgramParameter(gl, originalFunc, program, pname) {
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
  getInternalformatParameter: function getInternalformatParameter(gl, originalFunc, target, format, pname) {
    if (!isWebGL2(gl)) {
      switch (pname) {
        case 32937:
          return new Int32Array([0]);

        default:
      }
    }

    return gl.getInternalformatParameter(target, format, pname);
  },
  getTexParameter: function getTexParameter(gl, originalFunc, target, pname) {
    switch (pname) {
      case 34046:
        var extensions = gl.luma.extensions;
        var ext = extensions[EXT_texture_filter_anisotropic];
        pname = ext && ext.TEXTURE_MAX_ANISOTROPY_EXT || 34046;
        break;

      default:
    }

    return originalFunc(target, pname);
  },
  getParameter: getParameterPolyfill,
  hint: function hint(gl, originalFunc, pname, value) {
    return originalFunc(pname, value);
  }
}), _WEBGL_CONTEXT_POLYFI);

function initializeExtensions(gl) {
  gl.luma.extensions = {};
  var EXTENSIONS = gl.getSupportedExtensions();
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = EXTENSIONS[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var extension = _step.value;
      gl.luma[extension] = gl.getExtension(extension);
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
}

function polyfillExtension(gl, _ref) {
  var extension = _ref.extension,
      target = _ref.target,
      target2 = _ref.target2;
  var defaults = WEBGL_CONTEXT_POLYFILLS[extension];
  assert(defaults);
  var _defaults$meta = defaults.meta,
      meta = _defaults$meta === void 0 ? {} : _defaults$meta;
  var _meta$suffix = meta.suffix,
      suffix = _meta$suffix === void 0 ? '' : _meta$suffix;
  var ext = gl.getExtension(extension);
  Object.keys(defaults).forEach(function (key) {
    var extKey = "".concat(key).concat(suffix);
    var polyfill = null;

    if (key === 'meta') {} else if (typeof gl[key] === 'function') {} else if (ext && typeof ext[extKey] === 'function') {
      polyfill = function polyfill() {
        return ext[extKey].apply(ext, arguments);
      };
    } else if (typeof defaults[key] === 'function') {
      polyfill = defaults[key].bind(target);
    }

    if (polyfill) {
      target[key] = polyfill;
      target2[key] = polyfill;
    }
  });
}

function installOverrides(gl, _ref2) {
  var target = _ref2.target,
      target2 = _ref2.target2;
  var OVERRIDES = WEBGL_CONTEXT_POLYFILLS.OVERRIDES;
  Object.keys(OVERRIDES).forEach(function (key) {
    if (typeof OVERRIDES[key] === 'function') {
      var originalFunc = gl[key] ? gl[key].bind(gl) : function () {};
      var polyfill = OVERRIDES[key].bind(null, gl, originalFunc);
      target[key] = polyfill;
      target2[key] = polyfill;
    }
  });
}

export default function polyfillContext(gl) {
  gl.luma = gl.luma || {};
  initializeExtensions(gl);

  if (!gl.luma.polyfilled) {
    for (var extension in WEBGL_CONTEXT_POLYFILLS) {
      if (extension !== 'overrides') {
        polyfillExtension(gl, {
          extension: extension,
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
var global_ = typeof global !== 'undefined' ? global : window;
global_.polyfillContext = polyfillContext;
//# sourceMappingURL=polyfill-context.js.map