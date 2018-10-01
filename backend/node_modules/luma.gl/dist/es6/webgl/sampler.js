import { isWebGL2, assertWebGL2Context } from '../webgl-utils';
import Resource from './resource';
export default class Sampler extends Resource {
  static isSupported(gl) {
    return isWebGL2(gl);
  }

  constructor(gl, opts) {
    assertWebGL2Context(gl);
    super(gl, opts);
    Object.seal(this);
  }

  bind(unit) {
    this.gl.bindSampler(unit, this.handle);
    return this;
  }

  unbind(unit) {
    this.gl.bindSampler(unit, null);
    return this;
  }

  _createHandle() {
    return this.gl.createSampler();
  }

  _deleteHandle() {
    this.gl.deleteSampler(this.handle);
  }

  _getParameter(pname) {
    return this.gl.getSamplerParameter(this.handle, pname);
  }

  _setParameter(pname, param) {
    switch (pname) {
      case 33082:
      case 33083:
        this.gl.samplerParameterf(this.handle, pname, param);
        break;

      default:
        this.gl.samplerParameteri(this.handle, pname, param);
        break;
    }

    return this;
  }

}
//# sourceMappingURL=sampler.js.map