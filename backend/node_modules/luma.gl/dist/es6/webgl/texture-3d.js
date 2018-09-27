import { isWebGL2, assertWebGL2Context } from '../webgl-utils';
import { withParameters } from '../webgl-context/context-state';
import Texture from '../webgl/texture';
import Buffer from './buffer';
export default class Texture3D extends Texture {
  static isSupported(gl) {
    return isWebGL2(gl);
  }

  constructor(gl, opts = {}) {
    assertWebGL2Context(gl);
    super(gl, Object.assign({}, opts, {
      target: opts.target || 32879
    }));
    this.width = null;
    this.height = null;
    this.depth = null;
    Object.seal(this);
    this.setImageData(opts);

    if (opts.generateMipmap) {
      this.generateMipmap();
    }
  }

  initialize(opts = {}) {
    this.opts = Object.assign({}, this.opts, opts);
    const _this$opts = this.opts,
          pixels = _this$opts.pixels,
          settings = _this$opts.settings;

    if (settings) {
      withParameters(settings, () => {
        if (pixels) {
          this.setImage3D(this.opts);
        }
      });
      this.setParameters(opts);
    }
  }

  setImage3D({
    level = 0,
    internalformat = 6408,
    width,
    height,
    depth = 1,
    border = 0,
    format,
    type = 5121,
    offset = 0,
    pixels
  }) {
    if (ArrayBuffer.isView(pixels)) {
      this.gl.texImage3D(this.target, level, internalformat, width, height, depth, border, format, type, pixels);
      return;
    }

    if (pixels instanceof Buffer) {
      this.gl.bindBuffer(35052, pixels.handle);
      this.gl.texImage3D(this.target, level, internalformat, width, height, depth, border, format, type, offset);
      this.gl.bindBuffer(35052, pixels.handle);
    }
  }

}
//# sourceMappingURL=texture-3d.js.map