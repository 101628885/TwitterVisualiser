import { setParameters, getParameters, GL_PARAMETER_DEFAULTS } from './set-parameters';
import assert from '../utils/assert';
export const clone = x => {
  return Array.isArray(x) || ArrayBuffer.isView(x) ? x.slice() : x;
};
export const deepEqual = (x, y) => {
  const isArrayX = Array.isArray(x) || ArrayBuffer.isView(x);
  const isArrayY = Array.isArray(y) || ArrayBuffer.isView(y);

  if (isArrayX && isArrayY && x.length === y.length) {
    for (let i = 0; i < x.length; ++i) {
      if (x[i] !== y[i]) {
        return false;
      }
    }

    return true;
  }

  return x === y;
};
export const GL_STATE_SETTERS = {
  enable: (update, cap) => update({
    [cap]: true
  }),
  disable: (update, cap) => update({
    [cap]: false
  }),
  pixelStorei: (update, pname, param) => update({
    [pname]: param
  }),
  hint: (update, pname, _hint) => update({
    [pname]: _hint
  }),
  bindFramebuffer: (update, target, fb) => {
    switch (target) {
      case 36160:
        return update({
          [36006]: fb,
          [36010]: fb
        });

      case 36009:
        return update({
          [36006]: fb
        });

      case 36008:
        return update({
          [36010]: fb
        });

      default:
        return null;
    }
  },
  blendColor: (update, r, g, b, a) => update({
    [32773]: new Float32Array([r, g, b, a])
  }),
  blendEquation: (update, mode) => update({
    [32777]: mode,
    [34877]: mode
  }),
  blendEquationSeparate: (update, modeRGB, modeAlpha) => update({
    [32777]: modeRGB,
    [34877]: modeAlpha
  }),
  blendFunc: (update, src, dst) => update({
    [32969]: src,
    [32968]: dst,
    [32971]: src,
    [32970]: dst
  }),
  blendFuncSeparate: (update, srcRGB, dstRGB, srcAlpha, dstAlpha) => update({
    [32969]: srcRGB,
    [32968]: dstRGB,
    [32971]: srcAlpha,
    [32970]: dstAlpha
  }),
  clearColor: (update, r, g, b, a) => update({
    [3106]: new Float32Array([r, g, b, a])
  }),
  clearDepth: (update, depth) => update({
    [2931]: depth
  }),
  clearStencil: (update, s) => update({
    [2961]: s
  }),
  colorMask: (update, r, g, b, a) => update({
    [3107]: [r, g, b, a]
  }),
  cullFace: (update, mode) => update({
    [2885]: mode
  }),
  depthFunc: (update, func) => update({
    [2932]: func
  }),
  depthRange: (update, zNear, zFar) => update({
    [2928]: new Float32Array([zNear, zFar])
  }),
  depthMask: (update, mask) => update({
    [2930]: mask
  }),
  frontFace: (update, face) => update({
    [2886]: face
  }),
  lineWidth: (update, width) => update({
    [2849]: width
  }),
  polygonOffset: (update, factor, units) => update({
    [32824]: factor,
    [10752]: units
  }),
  sampleCoverage: (update, value, invert) => update({
    [32938]: value,
    [32939]: invert
  }),
  scissor: (update, x, y, width, height) => update({
    [3088]: new Int32Array([x, y, width, height])
  }),
  stencilMask: (update, mask) => update({
    [2968]: mask,
    [36005]: mask
  }),
  stencilMaskSeparate: (update, face, mask) => update({
    [face === 1028 ? 2968 : 36005]: mask
  }),
  stencilFunc: (update, func, ref, mask) => update({
    [2962]: func,
    [2967]: ref,
    [2963]: mask,
    [34816]: func,
    [36003]: ref,
    [36004]: mask
  }),
  stencilFuncSeparate: (update, face, func, ref, mask) => update({
    [face === 1028 ? 2962 : 34816]: func,
    [face === 1028 ? 2967 : 36003]: ref,
    [face === 1028 ? 2963 : 36004]: mask
  }),
  stencilOp: (update, fail, zfail, zpass) => update({
    [2964]: fail,
    [2965]: zfail,
    [2966]: zpass,
    [34817]: fail,
    [34818]: zfail,
    [34819]: zpass
  }),
  stencilOpSeparate: (update, face, fail, zfail, zpass) => update({
    [face === 1028 ? 2964 : 34817]: fail,
    [face === 1028 ? 2965 : 34818]: zfail,
    [face === 1028 ? 2966 : 34819]: zpass
  }),
  viewport: (update, x, y, width, height) => update({
    [2978]: new Int32Array([x, y, width, height])
  })
};

function installGetterOverride(gl, functionName) {
  const originalGetterFunc = gl[functionName].bind(gl);

  gl[functionName] = function (...params) {
    const pname = params[0];

    if (!(pname in gl.state.cache)) {
      gl.state.cache[pname] = originalGetterFunc(...params);
    }

    return gl.state.enable ? gl.state.cache[pname] : originalGetterFunc(...params);
  };

  Object.defineProperty(gl[functionName], 'name', {
    value: `${functionName}-from-cache`,
    configurable: false
  });
}

function installSetterSpy(gl, functionName, setter) {
  const originalSetterFunc = gl[functionName].bind(gl);

  gl[functionName] = function (...params) {
    const _setter = setter(gl.state._updateCache, ...params),
          valueChanged = _setter.valueChanged,
          oldValue = _setter.oldValue;

    if (valueChanged) {
      gl.state.log(`gl.${functionName}`, ...params);
      originalSetterFunc(...params);
    }

    return oldValue;
  };

  Object.defineProperty(gl[functionName], 'name', {
    value: `${functionName}-to-cache`,
    configurable: false
  });
}

class GLState {
  constructor(gl, {
    copyState = false,
    log = () => {}
  } = {}) {
    this.gl = gl;
    this.stateStack = [];
    this.enable = true;
    this.cache = copyState ? getParameters(gl) : Object.assign({}, GL_PARAMETER_DEFAULTS);
    this.log = log;
    this._updateCache = this._updateCache.bind(this);
    Object.seal(this);
  }

  push(values = {}) {
    this.stateStack.push({});
  }

  pop() {
    assert(this.stateStack.length > 0);
    const oldValues = this.stateStack[this.stateStack.length - 1];
    setParameters(this.gl, oldValues, this.cache);
    this.stateStack.pop();
  }

  _updateCache(values) {
    let valueChanged = false;
    let oldValue;
    const oldValues = this.stateStack.length > 0 && this.stateStack[this.stateStack.length - 1];

    for (const key in values) {
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
      valueChanged,
      oldValue
    };
  }

}

export default function trackContextState(gl, {
  enable = true,
  copyState
} = {}) {
  assert(copyState !== undefined);

  if (!gl.state) {
    const global_ = typeof global !== 'undefined' ? global : window;

    if (global_.polyfillContext) {
      global_.polyfillContext(gl);
    }

    gl.state = new GLState(gl, {
      copyState,
      enable
    });

    for (const key in GL_STATE_SETTERS) {
      const setter = GL_STATE_SETTERS[key];
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