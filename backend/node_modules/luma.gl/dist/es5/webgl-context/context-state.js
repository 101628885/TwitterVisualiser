"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setParameters = setParameters;
exports.withParameters = withParameters;
Object.defineProperty(exports, "getParameter", {
  enumerable: true,
  get: function get() {
    return _setParameters.getParameter;
  }
});
Object.defineProperty(exports, "getParameters", {
  enumerable: true,
  get: function get() {
    return _setParameters.getParameters;
  }
});
Object.defineProperty(exports, "setParameter", {
  enumerable: true,
  get: function get() {
    return _setParameters.setParameter;
  }
});
Object.defineProperty(exports, "resetParameters", {
  enumerable: true,
  get: function get() {
    return _setParameters.resetParameters;
  }
});
Object.defineProperty(exports, "getModifiedParameters", {
  enumerable: true,
  get: function get() {
    return _setParameters.getModifiedParameters;
  }
});
exports.LUMA_SETTERS = void 0;

var _trackContextState = require("../webgl-context/track-context-state");

var _setParameters = require("../webgl-context/set-parameters");

var _utils = require("../utils");

var _assert = _interopRequireDefault(require("../utils/assert"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var LUMA_SETTERS = {
  framebuffer: function framebuffer(gl, _framebuffer) {
    var handle = _framebuffer && 'handle' in _framebuffer ? _framebuffer.handle : _framebuffer;
    return gl.bindFramebuffer(36160, handle);
  },
  blend: function blend(gl, value) {
    return value ? gl.enable(3042) : gl.disable(3042);
  },
  blendColor: function blendColor(gl, value) {
    return gl.blendColor.apply(gl, _toConsumableArray(value));
  },
  blendEquation: function blendEquation(gl, args) {
    args = isArray(args) ? args : [args, args];
    gl.blendEquationSeparate.apply(gl, _toConsumableArray(args));
  },
  blendFunc: function blendFunc(gl, args) {
    args = isArray(args) && args.length === 2 ? _toConsumableArray(args).concat(_toConsumableArray(args)) : args;
    gl.blendFuncSeparate.apply(gl, _toConsumableArray(args));
  },
  clearColor: function clearColor(gl, value) {
    return gl.clearColor.apply(gl, _toConsumableArray(value));
  },
  clearDepth: function clearDepth(gl, value) {
    return gl.clearDepth(value);
  },
  clearStencil: function clearStencil(gl, value) {
    return gl.clearStencil(value);
  },
  colorMask: function colorMask(gl, value) {
    return gl.colorMask.apply(gl, _toConsumableArray(value));
  },
  cull: function cull(gl, value) {
    return value ? gl.enable(2884) : gl.disable(2884);
  },
  cullFace: function cullFace(gl, value) {
    return gl.cullFace(value);
  },
  depthTest: function depthTest(gl, value) {
    return value ? gl.enable(2929) : gl.disable(2929);
  },
  depthFunc: function depthFunc(gl, value) {
    return gl.depthFunc(value);
  },
  depthMask: function depthMask(gl, value) {
    return gl.depthMask(value);
  },
  depthRange: function depthRange(gl, value) {
    return gl.depthRange.apply(gl, _toConsumableArray(value));
  },
  dither: function dither(gl, value) {
    return value ? gl.enable(3024) : gl.disable(3024);
  },
  derivativeHint: function derivativeHint(gl, value) {
    gl.hint(35723, value);
  },
  frontFace: function frontFace(gl, value) {
    return gl.frontFace(value);
  },
  mipmapHint: function mipmapHint(gl, value) {
    return gl.hint(33170, value);
  },
  lineWidth: function lineWidth(gl, value) {
    return gl.lineWidth(value);
  },
  polygonOffsetFill: function polygonOffsetFill(gl, value) {
    return value ? gl.enable(32823) : gl.disable(32823);
  },
  polygonOffset: function polygonOffset(gl, value) {
    return gl.polygonOffset.apply(gl, _toConsumableArray(value));
  },
  sampleCoverage: function sampleCoverage(gl, value) {
    return gl.sampleCoverage.apply(gl, _toConsumableArray(value));
  },
  scissorTest: function scissorTest(gl, value) {
    return value ? gl.enable(3089) : gl.disable(3089);
  },
  scissor: function scissor(gl, value) {
    return gl.scissor.apply(gl, _toConsumableArray(value));
  },
  stencilTest: function stencilTest(gl, value) {
    return value ? gl.enable(2960) : gl.disable(2960);
  },
  stencilMask: function stencilMask(gl, value) {
    value = isArray(value) ? value : [value, value];

    var _value = value,
        _value2 = _slicedToArray(_value, 2),
        mask = _value2[0],
        backMask = _value2[1];

    gl.stencilMaskSeparate(1028, mask);
    gl.stencilMaskSeparate(1029, backMask);
  },
  stencilFunc: function stencilFunc(gl, args) {
    args = isArray(args) && args.length === 3 ? _toConsumableArray(args).concat(_toConsumableArray(args)) : args;

    var _args = args,
        _args2 = _slicedToArray(_args, 6),
        func = _args2[0],
        ref = _args2[1],
        mask = _args2[2],
        backFunc = _args2[3],
        backRef = _args2[4],
        backMask = _args2[5];

    gl.stencilFuncSeparate(1028, func, ref, mask);
    gl.stencilFuncSeparate(1029, backFunc, backRef, backMask);
  },
  stencilOp: function stencilOp(gl, args) {
    args = isArray(args) && args.length === 3 ? _toConsumableArray(args).concat(_toConsumableArray(args)) : args;

    var _args3 = args,
        _args4 = _slicedToArray(_args3, 6),
        sfail = _args4[0],
        dpfail = _args4[1],
        dppass = _args4[2],
        backSfail = _args4[3],
        backDpfail = _args4[4],
        backDppass = _args4[5];

    gl.stencilOpSeparate(1028, sfail, dpfail, dppass);
    gl.stencilOpSeparate(1029, backSfail, backDpfail, backDppass);
  },
  viewport: function viewport(gl, value) {
    return gl.viewport.apply(gl, _toConsumableArray(value));
  }
};
exports.LUMA_SETTERS = LUMA_SETTERS;

function isArray(array) {
  return Array.isArray(array) || ArrayBuffer.isView(array);
}

function setParameters(gl, parameters) {
  (0, _setParameters.setParameters)(gl, parameters);

  for (var key in parameters) {
    var setter = LUMA_SETTERS[key];

    if (setter) {
      setter(gl, parameters[key], key);
    }
  }
}

function withParameters(gl, parameters, func) {
  if ((0, _utils.isObjectEmpty)(parameters)) {
    return func(gl);
  }

  var _parameters$nocatch = parameters.nocatch,
      nocatch = _parameters$nocatch === void 0 ? true : _parameters$nocatch;
  (0, _assert.default)(!parameters.frameBuffer);
  (0, _trackContextState.pushContextState)(gl);
  setParameters(gl, parameters);
  var value;

  if (nocatch) {
    value = func(gl);
    (0, _trackContextState.popContextState)(gl);
  } else {
    try {
      value = func(gl);
    } finally {
      (0, _trackContextState.popContextState)(gl);
    }
  }

  return value;
}
//# sourceMappingURL=context-state.js.map