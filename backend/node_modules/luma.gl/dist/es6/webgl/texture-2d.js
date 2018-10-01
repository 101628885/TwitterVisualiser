import Texture from './texture';
import { assertWebGLContext } from '../webgl-utils';
export default class Texture2D extends Texture {
  static isSupported(gl, opts) {
    return Texture.isSupported(gl, opts);
  }

  constructor(gl, opts = {}) {
    assertWebGLContext(gl);
    super(gl, Object.assign({}, opts, {
      target: 3553
    }));
    this.initialize(opts);
    Object.seal(this);
  }

  bind(textureUnit = this.textureUnit) {
    const gl = this.gl;

    if (textureUnit === undefined) {
      throw new Error('Texture.bind: must specify texture unit');
    }

    this.textureUnit = textureUnit;
    gl.activeTexture(33984 + textureUnit);
    gl.bindTexture(this.target, this.handle);
    return textureUnit;
  }

  unbind() {
    const gl = this.gl;

    if (this.textureUnit === undefined) {
      throw new Error('Texture.unbind: texture unit not specified');
    }

    gl.activeTexture(33984 + this.textureUnit);
    gl.bindTexture(this.target, null);
    return this.textureUnit;
  }

  getActiveUnit() {
    return this.gl.getParameter(34016) - 33984;
  }

}
//# sourceMappingURL=texture-2d.js.map