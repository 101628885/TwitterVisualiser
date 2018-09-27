import Texture from './texture';
import assert from '../utils/assert';
const FACES = [34069, 34070, 34071, 34072, 34073, 34074];
export default class TextureCube extends Texture {
  constructor(gl, opts = {}) {
    super(gl, Object.assign({}, opts, {
      target: 34067
    }));
    this.initialize(opts);
    Object.seal(this);
  }

  initialize(opts = {}) {
    const _opts$format = opts.format,
          format = _opts$format === void 0 ? 6408 : _opts$format,
          _opts$mipmaps = opts.mipmaps,
          mipmaps = _opts$mipmaps === void 0 ? true : _opts$mipmaps;
    let _opts$width = opts.width,
        width = _opts$width === void 0 ? 1 : _opts$width,
        _opts$height = opts.height,
        height = _opts$height === void 0 ? 1 : _opts$height,
        _opts$type = opts.type,
        type = _opts$type === void 0 ? 5121 : _opts$type,
        dataFormat = opts.dataFormat;

    var _this$_deduceParamete = this._deduceParameters({
      format,
      type,
      dataFormat
    });

    type = _this$_deduceParamete.type;
    dataFormat = _this$_deduceParamete.dataFormat;

    var _this$_deduceImageSiz = this._deduceImageSize({
      data: opts[34069],
      width,
      height
    });

    width = _this$_deduceImageSiz.width;
    height = _this$_deduceImageSiz.height;
    assert(width === height);
    this.setCubeMapImageData(opts);

    if (mipmaps) {
      this.generateMipmap(opts);
    }

    this.opts = opts;
  }

  subImage({
    face,
    data,
    x = 0,
    y = 0,
    mipmapLevel = 0
  }) {
    return this._subImage({
      target: face,
      data,
      x,
      y,
      mipmapLevel
    });
  }

  setCubeMapImageData({
    width,
    height,
    pixels,
    data,
    border = 0,
    format = 6408,
    type = 5121,
    generateMipmap = false
  }) {
    const gl = this.gl;
    pixels = pixels || data;
    this.bind();

    if (this.width || this.height) {
      for (const face of FACES) {
        gl.texImage2D(face, 0, format, width, height, border, format, type, pixels[face]);
      }
    } else {
      for (const face of FACES) {
        gl.texImage2D(face, 0, format, format, type, pixels[face]);
      }
    }
  }

  bind({
    index
  } = {}) {
    if (index !== undefined) {
      this.gl.activeTexture(33984 + index);
    }

    this.gl.bindTexture(34067, this.handle);
    return index;
  }

  unbind() {
    this.gl.bindTexture(34067, null);
    return this;
  }

}
TextureCube.FACES = FACES;
//# sourceMappingURL=texture-cube.js.map