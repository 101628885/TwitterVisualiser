import { isWebGL2 } from '../webgl-utils';
import assert from '../utils/assert';
export const GL_PARAMETER_DEFAULTS = {
  [3042]: false,
  [32773]: new Float32Array([0, 0, 0, 0]),
  [32777]: 32774,
  [34877]: 32774,
  [32969]: 1,
  [32968]: 0,
  [32971]: 1,
  [32970]: 0,
  [3106]: new Float32Array([0, 0, 0, 0]),
  [3107]: [true, true, true, true],
  [2884]: false,
  [2885]: 1029,
  [2929]: false,
  [2931]: 1,
  [2932]: 513,
  [2928]: new Float32Array([0, 1]),
  [2930]: true,
  [3024]: true,
  [36006]: null,
  [2886]: 2305,
  [33170]: 4352,
  [2849]: 1,
  [32823]: false,
  [32824]: 0,
  [10752]: 0,
  [32938]: 1.0,
  [32939]: false,
  [3089]: false,
  [3088]: new Int32Array([0, 0, 1024, 1024]),
  [2960]: false,
  [2961]: 0,
  [2968]: 0xFFFFFFFF,
  [36005]: 0xFFFFFFFF,
  [2962]: 519,
  [2967]: 0,
  [2963]: 0xFFFFFFFF,
  [34816]: 519,
  [36003]: 0,
  [36004]: 0xFFFFFFFF,
  [2964]: 7680,
  [2965]: 7680,
  [2966]: 7680,
  [34817]: 7680,
  [34818]: 7680,
  [34819]: 7680,
  [2978]: new Int32Array([0, 0, 1024, 1024]),
  [3333]: 4,
  [3317]: 4,
  [37440]: false,
  [37441]: false,
  [37443]: 37444,
  [35723]: 4352,
  [36010]: null,
  [35977]: false,
  [3330]: 0,
  [3332]: 0,
  [3331]: 0,
  [3314]: 0,
  [32878]: 0,
  [3316]: 0,
  [3315]: 0,
  [32877]: 0
};

const enable = (gl, value, key) => value ? gl.enable(key) : gl.disable(key);

const hint = (gl, value, key) => gl.hint(key, value);

const pixelStorei = (gl, value, key) => gl.pixelStorei(key, value);

const drawFramebuffer = (gl, value) => {
  const target = isWebGL2(gl) ? 36009 : 36160;
  return gl.bindFramebuffer(target, value);
};

const readFramebuffer = (gl, value) => {
  return gl.bindFramebuffer(36008, value);
};

export const GL_PARAMETER_SETTERS = {
  [3042]: enable,
  [32773]: (gl, value) => gl.blendColor(...value),
  [32777]: 'blendEquation',
  [34877]: 'blendEquation',
  [32969]: 'blendFunc',
  [32968]: 'blendFunc',
  [32971]: 'blendFunc',
  [32970]: 'blendFunc',
  [3106]: (gl, value) => gl.clearColor(...value),
  [3107]: (gl, value) => gl.colorMask(...value),
  [2884]: enable,
  [2885]: (gl, value) => gl.cullFace(value),
  [2929]: enable,
  [2931]: (gl, value) => gl.clearDepth(value),
  [2932]: (gl, value) => gl.depthFunc(value),
  [2928]: (gl, value) => gl.depthRange(...value),
  [2930]: (gl, value) => gl.depthMask(value),
  [3024]: enable,
  [35723]: hint,
  [36006]: drawFramebuffer,
  [2886]: (gl, value) => gl.frontFace(value),
  [33170]: hint,
  [2849]: (gl, value) => gl.lineWidth(value),
  [32823]: enable,
  [32824]: 'polygonOffset',
  [10752]: 'polygonOffset',
  [35977]: enable,
  [32938]: 'sampleCoverage',
  [32939]: 'sampleCoverage',
  [3089]: enable,
  [3088]: (gl, value) => gl.scissor(...value),
  [2960]: enable,
  [2961]: (gl, value) => gl.clearStencil(value),
  [2968]: (gl, value) => gl.stencilMaskSeparate(1028, value),
  [36005]: (gl, value) => gl.stencilMaskSeparate(1029, value),
  [2962]: 'stencilFuncFront',
  [2967]: 'stencilFuncFront',
  [2963]: 'stencilFuncFront',
  [34816]: 'stencilFuncBack',
  [36003]: 'stencilFuncBack',
  [36004]: 'stencilFuncBack',
  [2964]: 'stencilOpFront',
  [2965]: 'stencilOpFront',
  [2966]: 'stencilOpFront',
  [34817]: 'stencilOpBack',
  [34818]: 'stencilOpBack',
  [34819]: 'stencilOpBack',
  [2978]: (gl, value) => gl.viewport(...value),
  [3333]: pixelStorei,
  [3317]: pixelStorei,
  [37440]: pixelStorei,
  [37441]: pixelStorei,
  [37443]: pixelStorei,
  [3330]: pixelStorei,
  [3332]: pixelStorei,
  [3331]: pixelStorei,
  [36010]: readFramebuffer,
  [3314]: pixelStorei,
  [32878]: pixelStorei,
  [3316]: pixelStorei,
  [3315]: pixelStorei,
  [32877]: pixelStorei
};
const COMPOSITE_GL_PARAMETER_SETTERS = {
  blendEquation: (gl, values) => gl.blendEquationSeparate(values[32777], values[34877]),
  blendFunc: (gl, values) => gl.blendFuncSeparate(values[32969], values[32968], values[32971], values[32970]),
  polygonOffset: (gl, values) => gl.polygonOffset(values[32824], values[10752]),
  sampleCoverage: (gl, values) => gl.sampleCoverage(values[32938], values[32939]),
  stencilFuncFront: (gl, values) => gl.stencilFuncSeparate(1028, values[2962], values[2967], values[2963]),
  stencilFuncBack: (gl, values) => gl.stencilFuncSeparate(1029, values[34816], values[36003], values[36004]),
  stencilOpFront: (gl, values) => gl.stencilOpSeparate(1028, values[2964], values[2965], values[2966]),
  stencilOpBack: (gl, values) => gl.stencilOpSeparate(1029, values[34817], values[34818], values[34819])
};

const isEnabled = (gl, key) => gl.isEnabled(key);

export const GL_PARAMETER_GETTERS = {
  [3042]: isEnabled,
  [2884]: isEnabled,
  [2929]: isEnabled,
  [3024]: isEnabled,
  [32823]: isEnabled,
  [32926]: isEnabled,
  [32928]: isEnabled,
  [3089]: isEnabled,
  [2960]: isEnabled,
  [35977]: isEnabled
};

const deepArrayEqual = (x, y) => {
  if (x === y) {
    return true;
  }

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

  return false;
};

export function setParameter(gl, key, value) {
  const getter = GL_PARAMETER_GETTERS[key];
  const prevValue = getter ? getter(gl, Number(key)) : gl.getParameter(Number(key));
  const setter = GL_PARAMETER_SETTERS[key];
  assert(typeof setter === 'function');
  setter(gl, value, Number(key));
  return prevValue;
}
export function setParameters(gl, values) {
  const compositeSetters = {};

  for (const key in values) {
    const glConstant = Number(key);
    const setter = GL_PARAMETER_SETTERS[key];

    if (setter) {
      if (typeof setter === 'string') {
        compositeSetters[setter] = true;
      } else {
        setter(gl, values[key], glConstant);
      }
    }
  }

  const cache = gl.state && gl.state.cache;

  if (cache) {
    const mergedValues = Object.assign({}, cache, values);

    for (const key in compositeSetters) {
      const compositeSetter = COMPOSITE_GL_PARAMETER_SETTERS[key];
      compositeSetter(gl, mergedValues);
    }
  }
}
export function getParameter(gl, key) {
  const getter = GL_PARAMETER_GETTERS[key];
  return getter ? getter(gl, Number(key)) : gl.getParameter(Number(key));
}
export function getParameters(gl, parameters) {
  parameters = parameters || GL_PARAMETER_DEFAULTS;
  const parameterKeys = Array.isArray(parameters) ? parameters : Object.keys(parameters);
  const state = {};

  for (const key of parameterKeys) {
    state[key] = getParameter(gl, key);
  }

  return state;
}
export function getDefaultParameters(gl) {
  return Object.assign({}, GL_PARAMETER_DEFAULTS, {});
}
export function resetParameters(gl) {
  setParameters(gl, getDefaultParameters(gl));
}
export function getModifiedParameters(gl) {
  const values = getParameters(GL_PARAMETER_DEFAULTS);
  const modified = {};

  for (const key in GL_PARAMETER_DEFAULTS) {
    if (!deepArrayEqual(values[key], GL_PARAMETER_DEFAULTS[key])) {
      modified[key] = values[key];
    }
  }

  return modified;
}
//# sourceMappingURL=set-parameters.js.map