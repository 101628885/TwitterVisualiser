import Resource from './resource';
import Buffer from './buffer';
import { withParameters } from '../webgl-context/context-state';
import { WebGLBuffer } from '../webgl-utils';
import { isWebGL2, assertWebGL2Context } from '../webgl-utils';
import { log, uid, isPowerOfTwo } from '../utils';
import assert from '../utils/assert';
const NPOT_MIN_FILTERS = [9729, 9728];
export const TEXTURE_FORMATS = {
  [6407]: {
    dataFormat: 6407,
    types: [5121, 33635]
  },
  [6408]: {
    dataFormat: 6408,
    types: [5121, 32819, 32820]
  },
  [6406]: {
    dataFormat: 6406,
    types: [5121]
  },
  [6409]: {
    dataFormat: 6409,
    types: [5121]
  },
  [6410]: {
    dataFormat: 6410,
    types: [5121]
  }
};

function isFormatSupported(gl, format) {
  const info = TEXTURE_FORMATS[format];

  if (!info) {
    return false;
  }

  if (info.gl1 === undefined && info.gl2 === undefined) {
    return true;
  }

  const value = isWebGL2(gl) ? info.gl2 || info.gl1 : info.gl1;
  return typeof value === 'string' ? gl.getExtension(value) : value;
}

function isLinearFilteringSupported(gl, format) {
  const info = TEXTURE_FORMATS[format];

  switch (info && info.types[0]) {
    case 5126:
      return gl.getExtension('OES_texture_float_linear');

    case 5131:
      return gl.getExtension('OES_texture_half_float_linear');

    default:
      return true;
  }
}

export default class Texture extends Resource {
  static isSupported(gl, {
    format,
    linearFiltering
  } = {}) {
    let supported = true;

    if (format) {
      supported = supported && isFormatSupported(gl, format);
      supported = supported && (!linearFiltering || isLinearFilteringSupported(gl, format));
    }

    return supported;
  }

  constructor(gl, opts) {
    const _opts$id = opts.id,
          id = _opts$id === void 0 ? uid('texture') : _opts$id,
          handle = opts.handle,
          target = opts.target;
    super(gl, {
      id,
      handle
    });
    this.target = target;
    this.hasFloatTexture = gl.getExtension('OES_texture_float');
    this.textureUnit = undefined;
  }

  toString() {
    return `Texture(${this.id},${this.width}x${this.height})`;
  }

  initialize(opts = {}) {
    let data = opts.data;
    const _opts$pixels = opts.pixels,
          pixels = _opts$pixels === void 0 ? null : _opts$pixels,
          _opts$format = opts.format,
          format = _opts$format === void 0 ? 6408 : _opts$format,
          _opts$type = opts.type,
          type = _opts$type === void 0 ? 5121 : _opts$type,
          _opts$border = opts.border,
          border = _opts$border === void 0 ? 0 : _opts$border,
          _opts$recreate = opts.recreate,
          recreate = _opts$recreate === void 0 ? false : _opts$recreate,
          _opts$parameters = opts.parameters,
          parameters = _opts$parameters === void 0 ? {} : _opts$parameters,
          _opts$pixelStore = opts.pixelStore,
          pixelStore = _opts$pixelStore === void 0 ? {} : _opts$pixelStore,
          _opts$unpackFlipY = opts.unpackFlipY,
          unpackFlipY = _opts$unpackFlipY === void 0 ? true : _opts$unpackFlipY;
    let _opts$mipmaps = opts.mipmaps,
        mipmaps = _opts$mipmaps === void 0 ? true : _opts$mipmaps;

    if (!data) {
      data = pixels;
    }

    let width = opts.width,
        height = opts.height,
        dataFormat = opts.dataFormat;

    var _this$_deduceParamete = this._deduceParameters({
      format,
      type,
      dataFormat,
      compressed: false,
      data,
      width,
      height
    });

    width = _this$_deduceParamete.width;
    height = _this$_deduceParamete.height;
    dataFormat = _this$_deduceParamete.dataFormat;
    this.width = width;
    this.height = height;
    this.format = format;
    this.type = type;
    this.dataFormat = dataFormat;
    this.border = border;
    const DEFAULT_TEXTURE_SETTINGS = {
      [37440]: unpackFlipY
    };
    const glSettings = Object.assign({}, DEFAULT_TEXTURE_SETTINGS, pixelStore);

    if (this._isNPOT() && mipmaps) {
      log.warn(`texture: ${this} is Non-Power-Of-Two, disabling mipmaping`)();
      mipmaps = false;

      this._updateForNPOT(parameters);
    }

    this.mipmaps = mipmaps;
    this.setImageData({
      data,
      width,
      height,
      format,
      type,
      dataFormat,
      border,
      mipmaps,
      parameters: glSettings
    });

    if (mipmaps) {
      this.generateMipmap();
    }

    this.setParameters(parameters);

    if (recreate) {
      this.data = data;
    }
  }

  resize({
    width,
    height
  }) {
    if (width !== this.width || height !== this.height) {
      return this.initialize({
        width,
        height,
        format: this.format,
        type: this.type,
        dataFormat: this.dataFormat,
        border: this.border,
        mipmaps: false
      });
    }

    return this;
  }

  generateMipmap(params = {}) {
    this.gl.bindTexture(this.target, this.handle);
    withParameters(this.gl, params, () => {
      this.gl.generateMipmap(this.target);
    });
    this.gl.bindTexture(this.target, null);
    return this;
  }

  setImageData({
    target = this.target,
    pixels = null,
    data = null,
    width,
    height,
    level = 0,
    format = 6408,
    type,
    dataFormat,
    offset = 0,
    border = 0,
    compressed = false,
    parameters = {}
  }) {
    if (!data) {
      data = pixels;
    }

    var _this$_deduceParamete2 = this._deduceParameters({
      format,
      type,
      dataFormat,
      compressed,
      data,
      width,
      height
    });

    type = _this$_deduceParamete2.type;
    dataFormat = _this$_deduceParamete2.dataFormat;
    compressed = _this$_deduceParamete2.compressed;
    width = _this$_deduceParamete2.width;
    height = _this$_deduceParamete2.height;
    const gl = this.gl;
    gl.bindTexture(this.target, this.handle);
    let dataType = null;

    var _this$_getDataType = this._getDataType({
      data,
      compressed
    });

    data = _this$_getDataType.data;
    dataType = _this$_getDataType.dataType;
    withParameters(this.gl, parameters, () => {
      switch (dataType) {
        case 'null':
          gl.texImage2D(target, level, format, width, height, border, dataFormat, type, data);
          break;

        case 'typed-array':
          gl.texImage2D(target, level, format, width, height, border, dataFormat, type, data, offset);
          break;

        case 'buffer':
          assertWebGL2Context(gl);
          gl.bindBuffer(35052, data.handle || data);
          gl.texImage2D(target, level, format, width, height, border, format, type, offset);
          break;

        case 'browser-object':
          gl.texImage2D(target, level, format, format, type, data);
          break;

        case 'compressed':
          gl.compressedTexImage2D(this.target, level, format, width, height, border, data);
          break;

        default:
          assert(false, 'Unknown image data type');
      }
    });
  }

  setSubImageData({
    target = this.target,
    pixels = null,
    data = null,
    x = 0,
    y = 0,
    width,
    height,
    level = 0,
    format = 6408,
    type,
    dataFormat,
    compressed = false,
    offset = 0,
    border = 0,
    parameters = {}
  }) {
    var _this$_deduceParamete3 = this._deduceParameters({
      format,
      type,
      dataFormat,
      compressed,
      data,
      width,
      height
    });

    type = _this$_deduceParamete3.type;
    dataFormat = _this$_deduceParamete3.dataFormat;
    compressed = _this$_deduceParamete3.compressed;
    width = _this$_deduceParamete3.width;
    height = _this$_deduceParamete3.height;

    if (!data) {
      data = pixels;
    }

    if (data && data.data) {
      const ndarray = data;
      data = ndarray.data;
      width = ndarray.shape[0];
      height = ndarray.shape[1];
    }

    if (data instanceof Buffer) {
      data = data.handle;
    }

    this.gl.bindTexture(this.target, this.handle);
    withParameters(this.gl, parameters, () => {
      if (compressed) {
        this.gl.compressedTexSubImage2D(target, level, x, y, width, height, format, data);
      } else if (data === null) {
        this.gl.texSubImage2D(target, level, format, width, height, border, dataFormat, type, null);
      } else if (ArrayBuffer.isView(data)) {
        this.gl.texSubImage2D(target, level, x, y, width, height, format, type, data, offset);
      } else if (data instanceof WebGLBuffer) {
        assertWebGL2Context(this.gl);
        this.gl.bindBuffer(35052, data);
        this.gl.texSubImage2D(target, level, format, width, height, border, format, type, offset);
        this.gl.bindBuffer(35052, null);
      } else {
        this.gl.texSubImage2D(target, level, x, y, format, type, data);
      }
    });
    this.gl.bindTexture(this.target, null);
  }

  copyFramebuffer({
    target = this.target,
    framebuffer,
    offset = 0,
    x = 0,
    y = 0,
    width,
    height,
    level = 0,
    internalFormat = 6408,
    border = 0
  }) {
    if (framebuffer) {
      framebuffer.bind();
    }

    this.bind();
    this.gl.copyTexImage2D(this.target, level, internalFormat, x, y, width, height, border);
    this.unbind();

    if (framebuffer) {
      framebuffer.unbind();
    }
  }

  getActiveUnit() {
    return this.gl.getParameter(34016) - 33984;
  }

  bind(textureUnit = this.textureUnit) {
    if (textureUnit === undefined) {
      throw new Error('Texture.bind: must specify texture unit');
    }

    this.textureUnit = textureUnit;
    this.gl.activeTexture(33984 + textureUnit);
    this.gl.bindTexture(this.target, this.handle);
    return textureUnit;
  }

  unbind() {
    if (this.textureUnit === undefined) {
      throw new Error('Texture.unbind: texture unit not specified');
    }

    this.gl.activeTexture(33984 + this.textureUnit);
    this.gl.bindTexture(this.target, null);
    return this.textureUnit;
  }

  _getDataType({
    data,
    compressed = false
  }) {
    if (compressed) {
      return {
        data,
        dataType: 'compressed'
      };
    }

    if (data === null) {
      return {
        data,
        dataType: 'null'
      };
    }

    if (ArrayBuffer.isView(data)) {
      return {
        data,
        dataType: 'typed-array'
      };
    }

    if (data instanceof Buffer) {
      return {
        data: data.handle,
        dataType: 'buffer'
      };
    }

    if (data instanceof WebGLBuffer) {
      return {
        data,
        dataType: 'buffer'
      };
    }

    return {
      data,
      dataType: 'browser-object'
    };
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
      return this;
    }

    if (pixels instanceof Buffer) {
      this.gl.bindBuffer(35052, pixels.handle);
      this.gl.texImage3D(this.target, level, internalformat, width, height, depth, border, format, type, offset);
    }

    return this;
  }

  _deduceParameters(opts) {
    const format = opts.format,
          data = opts.data;
    let width = opts.width,
        height = opts.height,
        dataFormat = opts.dataFormat,
        type = opts.type,
        compressed = opts.compressed;
    const textureFormat = TEXTURE_FORMATS[format];
    dataFormat = dataFormat || textureFormat && textureFormat.dataFormat;
    type = type || textureFormat && textureFormat.types[0];
    compressed = compressed || textureFormat && textureFormat.compressed;

    var _this$_deduceImageSiz = this._deduceImageSize({
      data,
      width,
      height
    });

    width = _this$_deduceImageSiz.width;
    height = _this$_deduceImageSiz.height;
    return {
      dataFormat,
      type,
      compressed,
      width,
      height,
      format,
      data
    };
  }

  _deduceImageSize({
    data,
    width,
    height
  }) {
    let size;

    if (typeof ImageData !== 'undefined' && data instanceof ImageData) {
      size = {
        width: data.width,
        height: data.height
      };
    } else if (typeof HTMLImageElement !== 'undefined' && data instanceof HTMLImageElement) {
      size = {
        width: data.naturalWidth,
        height: data.naturalHeight
      };
    } else if (typeof HTMLCanvasElement !== 'undefined' && data instanceof HTMLCanvasElement) {
      size = {
        width: data.width,
        height: data.height
      };
    } else if (typeof HTMLVideoElement !== 'undefined' && data instanceof HTMLVideoElement) {
      size = {
        width: data.videoWidth,
        height: data.videoHeight
      };
    } else if (!data) {
      size = {
        width: width >= 0 ? width : 1,
        height: height >= 0 ? height : 1
      };
    } else {
      size = {
        width,
        height
      };
    }

    assert(size, 'Could not deduced texture size');
    assert(width === undefined || size.width === width, 'Deduced texture width does not match supplied width');
    assert(height === undefined || size.height === height, 'Deduced texture height does not match supplied height');
    return size;
  }

  _createHandle() {
    return this.gl.createTexture();
  }

  _deleteHandle() {
    this.gl.deleteTexture(this.handle);
  }

  _getParameter(pname) {
    switch (pname) {
      case 4096:
        return this.width;

      case 4097:
        return this.height;

      default:
        this.gl.bindTexture(this.target, this.handle);
        const value = this.gl.getTexParameter(this.target, pname);
        this.gl.bindTexture(this.target, null);
        return value;
    }
  }

  _setParameter(pname, param) {
    this.gl.bindTexture(this.target, this.handle);
    param = this._getNPOTParam(pname, param);

    switch (pname) {
      case 33082:
      case 33083:
        this.gl.texParameterf(this.handle, pname, param);
        break;

      case 4096:
      case 4097:
        assert(false);
        break;

      default:
        this.gl.texParameteri(this.target, pname, param);
        break;
    }

    this.gl.bindTexture(this.target, null);
    return this;
  }

  _isNPOT() {
    return !isWebGL2(this.gl) && (!isPowerOfTwo(this.width) || !isPowerOfTwo(this.height));
  }

  _updateForNPOT(parameters) {
    if (parameters[this.gl.TEXTURE_MIN_FILTER] === undefined) {
      parameters[this.gl.TEXTURE_MIN_FILTER] = this.gl.LINEAR;
    }

    if (parameters[this.gl.TEXTURE_WRAP_S] === undefined) {
      parameters[this.gl.TEXTURE_WRAP_S] = this.gl.CLAMP_TO_EDGE;
    }

    if (parameters[this.gl.TEXTURE_WRAP_T] === undefined) {
      parameters[this.gl.TEXTURE_WRAP_T] = this.gl.CLAMP_TO_EDGE;
    }
  }

  _getNPOTParam(pname, param) {
    if (this._isNPOT()) {
      switch (pname) {
        case 10241:
          if (NPOT_MIN_FILTERS.indexOf(param) === -1) {
            param = 9729;
          }

          break;

        case 10242:
        case 10243:
          if (param !== 33071) {
            param = 33071;
          }

          break;

        default:
          break;
      }
    }

    return param;
  }

}
//# sourceMappingURL=texture.js.map