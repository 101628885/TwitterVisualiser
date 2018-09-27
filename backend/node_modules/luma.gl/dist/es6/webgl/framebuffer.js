function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import Resource from './resource';
import Texture2D from './texture-2d';
import Renderbuffer from './renderbuffer';
import Buffer from './buffer';
import { clear, clearBuffer } from './clear';
import { withParameters } from '../webgl-context';
import { getFeatures } from '../webgl-context/context-features';
import { getTypedArrayFromGLType, getGLTypeFromTypedArray } from '../webgl-utils/typed-array-utils';
import { glFormatToComponents, glTypeToBytes } from '../webgl-utils/format-utils';
import { isWebGL2, assertWebGL2Context } from '../webgl-utils';
import { flipRows, scalePixels } from '../webgl-utils';
import { glKey } from '../webgl-utils/constants-to-keys';
import { log } from '../utils';
import assert from '../utils/assert';
const ERR_MULTIPLE_RENDERTARGETS = 'Multiple render targets not supported';
export default class Framebuffer extends Resource {
  static isSupported(gl, {
    colorBufferFloat,
    colorBufferHalfFloat
  } = {}) {
    let supported = true;
    supported = colorBufferFloat && gl.getExtension(isWebGL2(gl) ? 'EXT_color_buffer_float' : 'WEBGL.color_buffer_float');
    supported = colorBufferHalfFloat && gl.getExtension(isWebGL2(gl) ? 'EXT_color_buffer_float' : 'EXT_color_buffer_half_float');
    return supported;
  }

  static getDefaultFramebuffer(gl) {
    gl.luma = gl.luma || {};
    gl.luma.defaultFramebuffer = gl.luma.defaultFramebuffer || new Framebuffer(gl, {
      id: 'default-framebuffer',
      handle: null,
      attachments: {}
    });
    return gl.luma.defaultFramebuffer;
  }

  get MAX_COLOR_ATTACHMENTS() {
    return this.gl.getParameter(this.gl.MAX_COLOR_ATTACHMENTS);
  }

  get MAX_DRAW_BUFFERS() {
    return this.gl.getParameter(this.gl.MAX_DRAW_BUFFERS);
  }

  constructor(gl, opts = {}) {
    super(gl, opts);
    this.width = null;
    this.height = null;
    this.attachments = {};
    this.readBuffer = 36064;
    this.drawBuffers = [36064];
    this.initialize(opts);
    Object.seal(this);
  }

  get color() {
    return this.attachments[36064] || null;
  }

  get texture() {
    return this.attachments[36064] || null;
  }

  get depth() {
    return this.attachments[36096] || this.attachments[33306] || null;
  }

  get stencil() {
    return this.attachments[36128] || this.attachments[33306] || null;
  }

  initialize({
    width = 1,
    height = 1,
    attachments = null,
    color = true,
    depth = true,
    stencil = false,
    check = true,
    readBuffer,
    drawBuffers
  }) {
    assert(width >= 0 && height >= 0, 'Width and height need to be integers');
    this.width = width;
    this.height = height;

    if (attachments) {
      for (const attachment in attachments) {
        const target = attachments[attachment];
        const object = Array.isArray(target) ? target[0] : target;
        object.resize({
          width,
          height
        });
      }
    } else {
      attachments = this._createDefaultAttachments({
        color,
        depth,
        stencil,
        width,
        height
      });
    }

    this.update({
      clearAttachments: true,
      attachments,
      readBuffer,
      drawBuffers
    });

    if (attachments && check) {
      this.checkStatus();
    }
  }

  update({
    attachments = {},
    readBuffer,
    drawBuffers,
    clearAttachments = false
  }) {
    this.attach(attachments, {
      clearAttachments
    });
    const gl = this.gl;
    const prevHandle = gl.bindFramebuffer(36160, this.handle);

    if (readBuffer) {
      this._setReadBuffer(readBuffer);
    }

    if (drawBuffers) {
      this._setDrawBuffers(drawBuffers);
    }

    gl.bindFramebuffer(36160, prevHandle || null);
    return this;
  }

  resize({
    width,
    height
  } = {}) {
    if (this.handle === null) {
      assert(width === undefined && height === undefined);
      this.width = this.gl.drawingBufferWidth;
      this.height = this.gl.drawingBufferHeight;
      return this;
    }

    if (width === undefined) {
      width = this.gl.drawingBufferWidth;
    }

    if (height === undefined) {
      height = this.gl.drawingBufferHeight;
    }

    if (width !== this.width && height !== this.height) {
      log.log(2, `Resizing framebuffer ${this.id} to ${width}x${height}`);
    }

    for (const attachmentPoint in this.attachments) {
      this.attachments[attachmentPoint].resize({
        width,
        height
      });
    }

    this.width = width;
    this.height = height;
    return this;
  }

  attach(attachments, {
    clearAttachments = false
  } = {}) {
    const newAttachments = {};

    if (clearAttachments) {
      Object.keys(this.attachments).forEach(key => {
        newAttachments[key] = null;
      });
    }

    Object.assign(newAttachments, attachments);
    const prevHandle = this.gl.bindFramebuffer(36160, this.handle);

    for (const key in newAttachments) {
      assert(key !== undefined, 'Misspelled framebuffer binding point?');
      const attachment = Number(key);
      const descriptor = newAttachments[attachment];
      let object = descriptor;

      if (!object) {
        this._unattach({
          attachment
        });
      } else if (object instanceof Renderbuffer) {
        this._attachRenderbuffer({
          attachment,
          renderbuffer: object
        });
      } else if (Array.isArray(descriptor)) {
        const _descriptor = _slicedToArray(descriptor, 3),
              texture = _descriptor[0],
              _descriptor$ = _descriptor[1],
              layer = _descriptor$ === void 0 ? 0 : _descriptor$,
              _descriptor$2 = _descriptor[2],
              level = _descriptor$2 === void 0 ? 0 : _descriptor$2;

        object = texture;

        this._attachTexture({
          attachment,
          texture,
          layer,
          level
        });
      } else {
        this._attachTexture({
          attachment,
          texture: object,
          layer: 0,
          level: 0
        });
      }

      if (object) {
        object.resize({
          width: this.width,
          height: this.height
        });
      }
    }

    this.gl.bindFramebuffer(36160, prevHandle || null);
    Object.assign(this.attachments, attachments);
    Object.keys(this.attachments).filter(key => !this.attachments[key]).forEach(key => {
      delete this.attachments[key];
    });
  }

  checkStatus() {
    const gl = this.gl;
    const prevHandle = gl.bindFramebuffer(36160, this.handle);
    const status = gl.checkFramebufferStatus(36160);
    gl.bindFramebuffer(36160, prevHandle || null);

    if (status !== 36053) {
      throw new Error(_getFrameBufferStatus(status));
    }

    return this;
  }

  clear({
    color,
    depth,
    stencil,
    drawBuffers = []
  } = {}) {
    const prevHandle = this.gl.bindFramebuffer(36160, this.handle);

    if (color || depth || stencil) {
      clear(this.gl, {
        color,
        depth,
        stencil
      });
    }

    drawBuffers.forEach((value, drawBuffer) => {
      clearBuffer({
        drawBuffer,
        value
      });
    });
    this.gl.bindFramebuffer(36160, prevHandle || null);
    return this;
  }

  readPixels({
    x = 0,
    y = 0,
    width = this.width,
    height = this.height,
    format = 6408,
    type,
    pixelArray = null,
    attachment = 36064
  }) {
    const gl = this.gl;

    if (attachment === 36064 && this.handle === null) {
      attachment = 1028;
    }

    if (!pixelArray) {
      type = type || 5121;
      const ArrayType = getTypedArrayFromGLType(type, {
        clamped: false
      });
      const components = glFormatToComponents(format);
      pixelArray = pixelArray || new ArrayType(width * height * components);
    }

    type = type || getGLTypeFromTypedArray(pixelArray);
    const prevHandle = this.gl.bindFramebuffer(36160, this.handle);
    this.gl.readPixels(x, y, width, height, format, type, pixelArray);
    this.gl.bindFramebuffer(36160, prevHandle || null);
    return pixelArray;
  }

  readPixelsToBuffer({
    x = 0,
    y = 0,
    width = this.width,
    height = this.height,
    format = 6408,
    type,
    buffer = null,
    byteOffset = 0
  }) {
    const gl = this.gl;
    assertWebGL2Context(gl);
    type = type || (buffer ? buffer.type : 5121);

    if (!buffer) {
      const components = glFormatToComponents(format);
      const byteCount = glTypeToBytes(type);
      const bytes = byteOffset + width * height * components * byteCount;
      buffer = new Buffer(gl, {
        bytes,
        type,
        size: components
      });
    }

    buffer.bind({
      target: 35051
    });
    withParameters(gl, {
      framebuffer: this
    }, () => {
      gl.readPixels(x, y, width, height, format, type, byteOffset);
    });
    buffer.unbind({
      target: 35051
    });
    return buffer;
  }

  copyToDataUrl({
    attachment = 36064,
    maxHeight = Number.MAX_SAFE_INTEGER
  } = {}) {
    let data = this.readPixels({
      attachment
    });
    let width = this.width,
        height = this.height;

    while (height > maxHeight) {
      var _scalePixels = scalePixels({
        data,
        width,
        height
      });

      data = _scalePixels.data;
      width = _scalePixels.width;
      height = _scalePixels.height;
    }

    flipRows({
      data,
      width,
      height
    });
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext('2d');
    const imageData = context.createImageData(width, height);
    imageData.data.set(data);
    context.putImageData(imageData, 0, 0);
    return canvas.toDataURL();
  }

  copyToImage({
    image = null,
    attachment = 36064,
    maxHeight = Number.MAX_SAFE_INTEGER
  } = {}) {
    const dataUrl = this.readDataUrl({
      attachment
    });
    image = image || new Image();
    image.src = dataUrl;
    return image;
  }

  copyToTexture({
    texture,
    target,
    xoffset = 0,
    yoffset = 0,
    zoffset = 0,
    mipmapLevel = 0,
    attachment = 36064,
    x = 0,
    y = 0,
    width,
    height
  }) {
    const gl = this.gl;
    const prevHandle = gl.bindFramebuffer(36160, this.handle);
    const prevBuffer = gl.readBuffer(attachment);
    width = Number.isFinite(width) ? width : texture.width;
    height = Number.isFinite(height) ? height : texture.height;

    switch (texture.target) {
      case 3553:
      case 34067:
        gl.copyTexSubImage2D(target || texture.target, mipmapLevel, xoffset, yoffset, x, y, width, height);
        break;

      case 35866:
      case 32879:
        gl.copyTexSubImage3D(target || texture.target, mipmapLevel, xoffset, yoffset, zoffset, x, y, width, height);
        break;

      default:
    }

    gl.readBuffer(prevBuffer);
    gl.bindFramebuffer(36160, prevHandle || null);
    return texture;
  }

  blit({
    srcFramebuffer,
    attachment = 36064,
    srcX0 = 0,
    srcY0 = 0,
    srcX1,
    srcY1,
    dstX0 = 0,
    dstY0 = 0,
    dstX1,
    dstY1,
    color = true,
    depth = false,
    stencil = false,
    mask = 0,
    filter = 9728
  }) {
    const gl = this.gl;
    assertWebGL2Context(gl);

    if (!srcFramebuffer.handle && attachment === 36064) {
      attachment = 1028;
    }

    if (color) {
      mask |= 16384;
    }

    if (depth) {
      mask |= 256;
    }

    if (stencil) {
      mask |= 1024;
    }

    assert(mask);
    srcX1 = srcX1 === undefined ? srcFramebuffer.width : srcX1;
    srcY1 = srcY1 === undefined ? srcFramebuffer.height : srcY1;
    dstX1 = dstX1 === undefined ? this.width : dstX1;
    dstY1 = dstY1 === undefined ? this.height : dstY1;
    const prevDrawHandle = gl.bindFramebuffer(36009, this.handle);
    const prevReadHandle = gl.bindFramebuffer(36008, srcFramebuffer.handle);
    gl.readBuffer(attachment);
    gl.blitFramebuffer(srcX0, srcY0, srcX1, srcY1, dstX0, dstY0, dstX1, dstY1, mask, filter);
    gl.readBuffer(this.readBuffer);
    gl.bindFramebuffer(36008, prevReadHandle || null);
    gl.bindFramebuffer(36009, prevDrawHandle || null);
    return this;
  }

  invalidate({
    attachments = [],
    x = 0,
    y = 0,
    width,
    height
  }) {
    const gl = this.gl;
    assertWebGL2Context(gl);
    const prevHandle = gl.bindFramebuffer(36008, this.handle);
    const invalidateAll = x === 0 && y === 0 && width === undefined && height === undefined;

    if (invalidateAll) {
      gl.invalidateFramebuffer(36008, attachments);
    } else {
      gl.invalidateFramebuffer(36008, attachments, x, y, width, height);
    }

    gl.bindFramebuffer(36008, prevHandle);
    return this;
  }

  getAttachmentParameter(attachment, pname, keys) {
    let value = this._getAttachmentParameterFallback(pname);

    if (value === null) {
      this.gl.bindFramebuffer(36160, this.handle);
      value = this.gl.getFramebufferAttachmentParameter(36160, attachment, pname);
      this.gl.bindFramebuffer(36160, null);
    }

    if (keys && value > 1000) {
      value = glKey(this.gl, value);
    }

    return value;
  }

  getAttachmentParameters(attachment = 36064, keys, parameters = this.constructor.ATTACHMENT_PARAMETERS || []) {
    const values = {};

    for (const pname of parameters) {
      const key = keys ? glKey(this.gl, pname) : pname;
      values[key] = this.getAttachmentParameter(attachment, pname, keys);
    }

    return values;
  }

  getParameters(keys = true) {
    const attachments = Object.keys(this.attachments);
    const parameters = {};

    for (const attachmentName of attachments) {
      const attachment = Number(attachmentName);
      const key = keys ? glKey(this.gl, attachment) : attachment;
      parameters[key] = this.getAttachmentParameters(attachment, keys);
    }

    return parameters;
  }

  show() {
    if (typeof window !== 'undefined') {
      window.open(this.copyToDataUrl(), 'luma-debug-texture');
    }

    return this;
  }

  log(priority = 0, message = '') {
    if (priority > log.priority || typeof window === 'undefined') {
      return this;
    }

    message = message || `Framebuffer ${this.id}`;
    const image = this.copyToDataUrl({
      maxHeight: 100
    });
    log.image({
      priority,
      message,
      image
    }, message)();
    return this;
  }

  bind({
    target = 36160
  } = {}) {
    this.gl.bindFramebuffer(target, this.handle);
    return this;
  }

  unbind({
    target = 36160
  } = {}) {
    this.gl.bindFramebuffer(target, null);
    return this;
  }

  _createDefaultAttachments({
    color,
    depth,
    stencil,
    width,
    height
  }) {
    let defaultAttachments = null;

    if (color) {
      defaultAttachments = defaultAttachments || {};
      defaultAttachments[36064] = new Texture2D(this.gl, {
        id: `${this.id}-color0`,
        pixels: null,
        format: 6408,
        type: 5121,
        width,
        height,
        mipmaps: false,
        parameters: {
          [10241]: 9728,
          [10240]: 9728,
          [10242]: 33071,
          [10243]: 33071
        }
      });
    }

    if (depth && stencil) {
      defaultAttachments = defaultAttachments || {};
      defaultAttachments[33306] = new Renderbuffer(this.gl, {
        id: `${this.id}-depth-stencil`,
        format: 35056,
        width,
        height: 111
      });
    } else if (depth) {
      defaultAttachments = defaultAttachments || {};
      defaultAttachments[36096] = new Renderbuffer(this.gl, {
        id: `${this.id}-depth`,
        format: 33189,
        width,
        height
      });
    } else if (stencil) {
      assert(false);
    }

    return defaultAttachments;
  }

  _unattach({
    attachment
  }) {
    this.gl.bindRenderbuffer(36161, this.handle);
    this.gl.framebufferRenderbuffer(36160, attachment, 36161, null);
    delete this.attachments[attachment];
  }

  _attachRenderbuffer({
    attachment = 36064,
    renderbuffer
  }) {
    const gl = this.gl;
    gl.framebufferRenderbuffer(36160, attachment, 36161, renderbuffer.handle);
    this.attachments[attachment] = renderbuffer;
  }

  _attachTexture({
    attachment = 36064,
    texture,
    layer,
    level
  }) {
    const gl = this.gl;
    gl.bindTexture(texture.target, texture.handle);

    switch (texture.target) {
      case 35866:
      case 32879:
        gl.framebufferTextureLayer(36160, attachment, texture.target, level, layer);
        break;

      case 34067:
        const face = mapIndexToCubeMapFace(layer);
        gl.framebufferTexture2D(36160, attachment, face, texture.handle, level);
        break;

      case 3553:
        gl.framebufferTexture2D(36160, attachment, 3553, texture.handle, level);
        break;

      default:
        assert(false, 'Illegal texture type');
    }

    gl.bindTexture(texture.target, null);
    this.attachments[attachment] = texture;
  }

  _setReadBuffer(gl, readBuffer) {
    if (isWebGL2(gl)) {
      gl.readBuffer(readBuffer);
    } else {
      assert(readBuffer === 36064 || readBuffer === 1029, ERR_MULTIPLE_RENDERTARGETS);
    }

    this.readBuffer = readBuffer;
  }

  _setDrawBuffers(gl, drawBuffers) {
    if (isWebGL2(gl)) {
      gl.drawBuffers(drawBuffers);
    } else {
      const ext = gl.getExtension('WEBGL.draw_buffers');

      if (ext) {
        ext.drawBuffersWEBGL(drawBuffers);
      } else {
        assert(drawBuffers.length === 1 && (drawBuffers[0] === 36064 || drawBuffers[0] === 1029), ERR_MULTIPLE_RENDERTARGETS);
      }
    }

    this.drawBuffers = drawBuffers;
  }

  _getAttachmentParameterFallback(pname) {
    const caps = getFeatures(this.gl);

    switch (pname) {
      case 36052:
        return !caps.webgl2 ? 0 : null;

      case 33298:
      case 33299:
      case 33300:
      case 33301:
      case 33302:
      case 33303:
        return !caps.webgl2 ? 8 : null;

      case 33297:
        return !caps.webgl2 ? 5125 : null;

      case 33296:
        return !caps.webgl2 && !caps.EXT_sRGB ? 9729 : null;

      default:
        return null;
    }
  }

  _createHandle() {
    return this.gl.createFramebuffer();
  }

  _deleteHandle() {
    this.gl.deleteFramebuffer(this.handle);
  }

  _bindHandle(handle) {
    return this.gl.bindFramebuffer(36160, handle);
  }

}

function mapIndexToCubeMapFace(layer) {
  return layer < 34069 ? layer + 34069 : layer;
}

function _getFrameBufferStatus(status) {
  const STATUS = Framebuffer.STATUS || {};
  return STATUS[status] || `Framebuffer error ${status}`;
}

export const FRAMEBUFFER_ATTACHMENT_PARAMETERS = [36049, 36048, 33296, 33298, 33299, 33300, 33301, 33302, 33303];
Framebuffer.ATTACHMENT_PARAMETERS = FRAMEBUFFER_ATTACHMENT_PARAMETERS;
//# sourceMappingURL=framebuffer.js.map