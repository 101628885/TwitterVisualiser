import luma from '../init';
import { assertWebGLContext, isWebGL2, getKey, getKeyValue } from '../webgl-utils';
import { uid } from '../utils';
import { stubRemovedMethods } from '../utils';
import assert from '../utils/assert';
const ERR_RESOURCE_METHOD_UNDEFINED = 'Resource subclass must define virtual methods';
export default class Resource {
  constructor(gl, opts = {}) {
    assertWebGLContext(gl);
    const id = opts.id,
          _opts$userData = opts.userData,
          userData = _opts$userData === void 0 ? {} : _opts$userData;
    this.gl = gl;
    this.id = id || uid(this.constructor.name);
    this.userData = userData;
    this._bound = false;
    this._handle = opts.handle;

    if (this._handle === undefined) {
      this._handle = this._createHandle();
    }

    this._addStats();
  }

  toString() {
    return `${this.constructor.name}(${this.id})`;
  }

  get handle() {
    return this._handle;
  }

  delete({
    deleteChildren = false
  } = {}) {
    const children = this._handle && this._deleteHandle(this._handle);

    this._handle = null;

    this._removeStats();

    if (children && deleteChildren) {
      children.filter(Boolean).forEach(child => {
        child.delete();
      });
    }

    return this;
  }

  bind(funcOrHandle = this.handle) {
    if (typeof funcOrHandle !== 'function') {
      this._bindHandle(funcOrHandle);

      return this;
    }

    let value;

    if (!this._bound) {
      this._bindHandle(this.handle);

      this._bound = true;
      value = funcOrHandle();
      this._bound = false;

      this._bindHandle(null);
    } else {
      value = funcOrHandle();
    }

    return value;
  }

  unbind() {
    this.bind(null);
  }

  getParameter(pname, opts = {}) {
    pname = getKeyValue(this.gl, pname);
    assert(pname);
    const parameters = this.constructor.PARAMETERS || {};
    const parameter = parameters[pname];

    if (parameter) {
      const isWebgl2 = isWebGL2(this.gl);
      const parameterAvailable = (!('webgl2' in parameter) || isWebgl2) && (!('extension' in parameter) || this.gl.getExtension(parameter.extension));

      if (!parameterAvailable) {
        const webgl1Default = parameter.webgl1;
        const webgl2Default = 'webgl2' in parameter ? parameter.webgl2 : parameter.webgl1;
        const defaultValue = isWebgl2 ? webgl2Default : webgl1Default;
        return defaultValue;
      }
    }

    return this._getParameter(pname, opts);
  }

  getParameters(opts = {}) {
    const _ref = {},
          parameters = _ref.parameters,
          keys = _ref.keys;
    const PARAMETERS = this.constructor.PARAMETERS || {};
    const isWebgl2 = isWebGL2(this.gl);
    const values = {};
    const parameterKeys = parameters || Object.keys(PARAMETERS);

    for (const pname of parameterKeys) {
      const parameter = PARAMETERS[pname];
      const parameterAvailable = parameter && (!('webgl2' in parameter) || isWebgl2) && (!('extension' in parameter) || this.gl.getExtension(parameter.extension));

      if (parameterAvailable) {
        const key = keys ? getKey(this.gl, pname) : pname;
        values[key] = this.getParameter(pname, opts);

        if (keys && parameter.type === 'GLenum') {
          values[key] = getKey(this.gl, values[key]);
        }
      }
    }

    return values;
  }

  setParameter(pname, value) {
    pname = getKeyValue(this.gl, pname);
    assert(pname);
    const parameters = this.constructor.PARAMETERS || {};
    const parameter = parameters[pname];

    if (parameter) {
      const isWebgl2 = isWebGL2(this.gl);
      const parameterAvailable = (!('webgl2' in parameter) || isWebgl2) && (!('extension' in parameter) || this.gl.getExtension(parameter.extension));

      if (!parameterAvailable) {
        throw new Error('Parameter not available on this platform');
      }

      if (parameter.type === 'GLenum') {
        value = getKeyValue(value);
      }
    }

    this._setParameter(pname, value);

    return this;
  }

  setParameters(parameters) {
    for (const pname in parameters) {
      this.setParameter(pname, parameters[pname]);
    }

    return this;
  }

  stubRemovedMethods(className, version, methodNames) {
    return stubRemovedMethods(this, className, version, methodNames);
  }

  initialize(opts) {}

  _createHandle() {
    throw new Error(ERR_RESOURCE_METHOD_UNDEFINED);
  }

  _deleteHandle() {
    throw new Error(ERR_RESOURCE_METHOD_UNDEFINED);
  }

  _bindHandle() {
    throw new Error(ERR_RESOURCE_METHOD_UNDEFINED);
  }

  _getOptsFromHandle() {
    throw new Error(ERR_RESOURCE_METHOD_UNDEFINED);
  }

  _getParameter(pname, opts) {
    throw new Error(ERR_RESOURCE_METHOD_UNDEFINED);
  }

  _setParameter(pname, value) {
    throw new Error(ERR_RESOURCE_METHOD_UNDEFINED);
  }

  _context() {
    this.gl.luma = this.gl.luma || {};
    return this.gl.luma;
  }

  _addStats() {
    const name = this.constructor.name;
    const stats = luma.stats;
    stats.resourceCount = stats.resourceCount || 0;
    stats.resourceMap = stats.resourceMap || {};
    stats.resourceCount++;
    stats.resourceMap[name] = stats.resourceMap[name] || {
      created: 0,
      active: 0
    };
    stats.resourceMap[name].created++;
    stats.resourceMap[name].active++;
  }

  _removeStats() {
    const name = this.constructor.name;
    const stats = luma.stats;
    stats.resourceMap[name].active--;
  }

}
//# sourceMappingURL=resource.js.map