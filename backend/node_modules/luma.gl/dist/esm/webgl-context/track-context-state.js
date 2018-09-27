function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { setParameters, getParameters, GL_PARAMETER_DEFAULTS } from './set-parameters';
import assert from '../utils/assert';
export var clone = function clone(x) {
  return Array.isArray(x) || ArrayBuffer.isView(x) ? x.slice() : x;
};
export var deepEqual = function deepEqual(x, y) {
  var isArrayX = Array.isArray(x) || ArrayBuffer.isView(x);
  var isArrayY = Array.isArray(y) || ArrayBuffer.isView(y);

  if (isArrayX && isArrayY && x.length === y.length) {
    for (var i = 0; i < x.length; ++i) {
      if (x[i] !== y[i]) {
        return false;
      }
    }

    return true;
  }

  return x === y;
};
export var GL_STATE_SETTERS = {
  enable: function enable(update, cap) {
    return update(_defineProperty({}, cap, true));
  },
  disable: function disable(update, cap) {
    return update(_defineProperty({}, cap, false));
  },
  pixelStorei: function pixelStorei(update, pname, param) {
    return update(_defineProperty({}, pname, param));
  },
  hint: function hint(update, pname, _hint) {
    return update(_defineProperty({}, pname, _hint));
  },
  bindFramebuffer: function bindFramebuffer(update, target, fb) {
    var _update5;

    switch (target) {
      case 36160:
        return update((_update5 = {}, _defineProperty(_update5, 36006, fb), _defineProperty(_update5, 36010, fb), _update5));

      case 36009:
        return update(_defineProperty({}, 36006, fb));

      case 36008:
        return update(_defineProperty({}, 36010, fb));

      default:
        return null;
    }
  },
  blendColor: function blendColor(update, r, g, b, a) {
    return update(_defineProperty({}, 32773, new Float32Array([r, g, b, a])));
  },
  blendEquation: function blendEquation(update, mode) {
    var _update9;

    return update((_update9 = {}, _defineProperty(_update9, 32777, mode), _defineProperty(_update9, 34877, mode), _update9));
  },
  blendEquationSeparate: function blendEquationSeparate(update, modeRGB, modeAlpha) {
    var _update10;

    return update((_update10 = {}, _defineProperty(_update10, 32777, modeRGB), _defineProperty(_update10, 34877, modeAlpha), _update10));
  },
  blendFunc: function blendFunc(update, src, dst) {
    var _update11;

    return update((_update11 = {}, _defineProperty(_update11, 32969, src), _defineProperty(_update11, 32968, dst), _defineProperty(_update11, 32971, src), _defineProperty(_update11, 32970, dst), _update11));
  },
  blendFuncSeparate: function blendFuncSeparate(update, srcRGB, dstRGB, srcAlpha, dstAlpha) {
    var _update12;

    return update((_update12 = {}, _defineProperty(_update12, 32969, srcRGB), _defineProperty(_update12, 32968, dstRGB), _defineProperty(_update12, 32971, srcAlpha), _defineProperty(_update12, 32970, dstAlpha), _update12));
  },
  clearColor: function clearColor(update, r, g, b, a) {
    return update(_defineProperty({}, 3106, new Float32Array([r, g, b, a])));
  },
  clearDepth: function clearDepth(update, depth) {
    return update(_defineProperty({}, 2931, depth));
  },
  clearStencil: function clearStencil(update, s) {
    return update(_defineProperty({}, 2961, s));
  },
  colorMask: function colorMask(update, r, g, b, a) {
    return update(_defineProperty({}, 3107, [r, g, b, a]));
  },
  cullFace: function cullFace(update, mode) {
    return update(_defineProperty({}, 2885, mode));
  },
  depthFunc: function depthFunc(update, func) {
    return update(_defineProperty({}, 2932, func));
  },
  depthRange: function depthRange(update, zNear, zFar) {
    return update(_defineProperty({}, 2928, new Float32Array([zNear, zFar])));
  },
  depthMask: function depthMask(update, mask) {
    return update(_defineProperty({}, 2930, mask));
  },
  frontFace: function frontFace(update, face) {
    return update(_defineProperty({}, 2886, face));
  },
  lineWidth: function lineWidth(update, width) {
    return update(_defineProperty({}, 2849, width));
  },
  polygonOffset: function polygonOffset(update, factor, units) {
    var _update23;

    return update((_update23 = {}, _defineProperty(_update23, 32824, factor), _defineProperty(_update23, 10752, units), _update23));
  },
  sampleCoverage: function sampleCoverage(update, value, invert) {
    var _update24;

    return update((_update24 = {}, _defineProperty(_update24, 32938, value), _defineProperty(_update24, 32939, invert), _update24));
  },
  scissor: function scissor(update, x, y, width, height) {
    return update(_defineProperty({}, 3088, new Int32Array([x, y, width, height])));
  },
  stencilMask: function stencilMask(update, mask) {
    var _update26;

    return update((_update26 = {}, _defineProperty(_update26, 2968, mask), _defineProperty(_update26, 36005, mask), _update26));
  },
  stencilMaskSeparate: function stencilMaskSeparate(update, face, mask) {
    return update(_defineProperty({}, face === 1028 ? 2968 : 36005, mask));
  },
  stencilFunc: function stencilFunc(update, func, ref, mask) {
    var _update28;

    return update((_update28 = {}, _defineProperty(_update28, 2962, func), _defineProperty(_update28, 2967, ref), _defineProperty(_update28, 2963, mask), _defineProperty(_update28, 34816, func), _defineProperty(_update28, 36003, ref), _defineProperty(_update28, 36004, mask), _update28));
  },
  stencilFuncSeparate: function stencilFuncSeparate(update, face, func, ref, mask) {
    var _update29;

    return update((_update29 = {}, _defineProperty(_update29, face === 1028 ? 2962 : 34816, func), _defineProperty(_update29, face === 1028 ? 2967 : 36003, ref), _defineProperty(_update29, face === 1028 ? 2963 : 36004, mask), _update29));
  },
  stencilOp: function stencilOp(update, fail, zfail, zpass) {
    var _update30;

    return update((_update30 = {}, _defineProperty(_update30, 2964, fail), _defineProperty(_update30, 2965, zfail), _defineProperty(_update30, 2966, zpass), _defineProperty(_update30, 34817, fail), _defineProperty(_update30, 34818, zfail), _defineProperty(_update30, 34819, zpass), _update30));
  },
  stencilOpSeparate: function stencilOpSeparate(update, face, fail, zfail, zpass) {
    var _update31;

    return update((_update31 = {}, _defineProperty(_update31, face === 1028 ? 2964 : 34817, fail), _defineProperty(_update31, face === 1028 ? 2965 : 34818, zfail), _defineProperty(_update31, face === 1028 ? 2966 : 34819, zpass), _update31));
  },
  viewport: function viewport(update, x, y, width, height) {
    return update(_defineProperty({}, 2978, new Int32Array([x, y, width, height])));
  }
};

function installGetterOverride(gl, functionName) {
  var originalGetterFunc = gl[functionName].bind(gl);

  gl[functionName] = function () {
    var pname = arguments.length <= 0 ? undefined : arguments[0];

    if (!(pname in gl.state.cache)) {
      gl.state.cache[pname] = originalGetterFunc.apply(void 0, arguments);
    }

    return gl.state.enable ? gl.state.cache[pname] : originalGetterFunc.apply(void 0, arguments);
  };

  Object.defineProperty(gl[functionName], 'name', {
    value: "".concat(functionName, "-from-cache"),
    configurable: false
  });
}

function installSetterSpy(gl, functionName, setter) {
  var originalSetterFunc = gl[functionName].bind(gl);

  gl[functionName] = function () {
    for (var _len = arguments.length, params = new Array(_len), _key = 0; _key < _len; _key++) {
      params[_key] = arguments[_key];
    }

    var _setter = setter.apply(void 0, [gl.state._updateCache].concat(params)),
        valueChanged = _setter.valueChanged,
        oldValue = _setter.oldValue;

    if (valueChanged) {
      var _gl$state;

      (_gl$state = gl.state).log.apply(_gl$state, ["gl.".concat(functionName)].concat(params));

      originalSetterFunc.apply(void 0, params);
    }

    return oldValue;
  };

  Object.defineProperty(gl[functionName], 'name', {
    value: "".concat(functionName, "-to-cache"),
    configurable: false
  });
}

var GLState = function () {
  function GLState(gl) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$copyState = _ref.copyState,
        copyState = _ref$copyState === void 0 ? false : _ref$copyState,
        _ref$log = _ref.log,
        log = _ref$log === void 0 ? function () {} : _ref$log;

    _classCallCheck(this, GLState);

    this.gl = gl;
    this.stateStack = [];
    this.enable = true;
    this.cache = copyState ? getParameters(gl) : Object.assign({}, GL_PARAMETER_DEFAULTS);
    this.log = log;
    this._updateCache = this._updateCache.bind(this);
    Object.seal(this);
  }

  _createClass(GLState, [{
    key: "push",
    value: function push() {
      var values = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      this.stateStack.push({});
    }
  }, {
    key: "pop",
    value: function pop() {
      assert(this.stateStack.length > 0);
      var oldValues = this.stateStack[this.stateStack.length - 1];
      setParameters(this.gl, oldValues, this.cache);
      this.stateStack.pop();
    }
  }, {
    key: "_updateCache",
    value: function _updateCache(values) {
      var valueChanged = false;
      var oldValue;
      var oldValues = this.stateStack.length > 0 && this.stateStack[this.stateStack.length - 1];

      for (var key in values) {
        assert(key !== undefined);

        if (!deepEqual(values[key], this.cache[key])) {
          valueChanged = true;
          oldValue = this.cache[key];

          if (oldValues && !(key in oldValues)) {
            oldValues[key] = this.cache[key];
          }

          this.cache[key] = values[key];
        }
      }

      return {
        valueChanged: valueChanged,
        oldValue: oldValue
      };
    }
  }]);

  return GLState;
}();

export default function trackContextState(gl) {
  var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref2$enable = _ref2.enable,
      enable = _ref2$enable === void 0 ? true : _ref2$enable,
      copyState = _ref2.copyState;

  assert(copyState !== undefined);

  if (!gl.state) {
    var global_ = typeof global !== 'undefined' ? global : window;

    if (global_.polyfillContext) {
      global_.polyfillContext(gl);
    }

    gl.state = new GLState(gl, {
      copyState: copyState,
      enable: enable
    });

    for (var key in GL_STATE_SETTERS) {
      var setter = GL_STATE_SETTERS[key];
      installSetterSpy(gl, key, setter);
    }

    installGetterOverride(gl, 'getParameter');
    installGetterOverride(gl, 'isEnabled');
  }

  gl.state.enable = enable;
  return gl;
}
export function pushContextState(gl) {
  if (!gl.state) {
    trackContextState(gl, {
      copyState: false
    });
  }

  gl.state.push();
}
export function popContextState(gl) {
  assert(gl.state);
  gl.state.pop();
}
//# sourceMappingURL=track-context-state.js.map