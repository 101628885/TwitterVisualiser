import Resource from './resource';
import Accessor from './accessor';
import { assertWebGL2Context } from '../webgl-utils';
import { getGLTypeFromTypedArray, getTypedArrayFromGLType } from '../webgl-utils/typed-array-utils';
import { log } from '../utils';
import assert from '../utils/assert';
const DEBUG_DATA_LENGTH = 10;
export default class Buffer extends Resource {
  constructor(gl, props = {}) {
    super(gl, props);
    this.stubRemovedMethods('Buffer', 'v6.0', ['layout', 'setLayout', 'getIndexedParameter']);
    this.target = props.target || (this.gl.webgl2 ? 36662 : 34962);

    this._initialize(props);

    Object.seal(this);
  }

  getElementCount(accessor = this.accessor) {
    return Math.round(this.byteLength / Accessor.getBytesPerElement(accessor));
  }

  getVertexCount(accessor = this.accessor) {
    return Math.round(this.byteLength / Accessor.getBytesPerVertex(accessor));
  }

  initialize(props) {
    return this._initialize(props);
  }

  setProps(props) {
    if ('data' in props) {
      this.setData(props);
    }

    return this;
  }

  setAccessor(opts) {
    this.accessor = opts;
    return this;
  }

  reallocate(byteLength) {
    if (byteLength > this.byteLength) {
      this._setByteLength(byteLength);

      return true;
    }

    this.bytesUsed = byteLength;
    return false;
  }

  setData(opts) {
    return this.initialize(opts);
  }

  subData(props) {
    if (ArrayBuffer.isView(props)) {
      props = {
        data: props
      };
    }

    const _props = props,
          data = _props.data,
          _props$offset = _props.offset,
          offset = _props$offset === void 0 ? 0 : _props$offset,
          _props$srcOffset = _props.srcOffset,
          srcOffset = _props$srcOffset === void 0 ? 0 : _props$srcOffset;
    const byteLength = props.byteLength || props.length;
    assert(data);
    const target = this.gl.webgl2 ? 36663 : this.target;
    this.gl.bindBuffer(target, this.handle);

    if (srcOffset !== 0 || byteLength !== undefined) {
      assertWebGL2Context(this.gl);
      this.gl.bufferSubData(this.target, offset, data, srcOffset, byteLength);
    } else {
      this.gl.bufferSubData(target, offset, data);
    }

    this.gl.bindBuffer(target, null);
    this.debugData = null;

    if (!this.accessor.type) {
      this.setAccessor(new Accessor(this.accessor, {
        type: getGLTypeFromTypedArray(data)
      }));
    }

    return this;
  }

  copyData({
    sourceBuffer,
    readOffset = 0,
    writeOffset = 0,
    size
  }) {
    const gl = this.gl;
    assertWebGL2Context(gl);
    gl.bindBuffer(36662, sourceBuffer.handle);
    gl.bindBuffer(36663, this.handle);
    gl.copyBufferSubData(36662, 36663, readOffset, writeOffset, size);
    gl.bindBuffer(36662, null);
    gl.bindBuffer(36663, null);
    this.debugData = null;
    return this;
  }

  getData({
    dstData = null,
    srcByteOffset = 0,
    dstOffset = 0,
    length = 0
  } = {}) {
    assertWebGL2Context(this.gl);
    const ArrayType = getTypedArrayFromGLType(this.accessor.type || 5126, {
      clamped: false
    });

    const sourceAvailableElementCount = this._getAvailableElementCount(srcByteOffset);

    const dstElementOffset = dstOffset;
    let dstAvailableElementCount;
    let dstElementCount;

    if (dstData) {
      dstElementCount = dstData.length;
      dstAvailableElementCount = dstElementCount - dstElementOffset;
    } else {
      dstAvailableElementCount = Math.min(sourceAvailableElementCount, length || sourceAvailableElementCount);
      dstElementCount = dstElementOffset + dstAvailableElementCount;
    }

    const copyElementCount = Math.min(sourceAvailableElementCount, dstAvailableElementCount);
    length = length || copyElementCount;
    assert(length <= copyElementCount);
    dstData = dstData || new ArrayType(dstElementCount);
    this.gl.bindBuffer(36662, this.handle);
    this.gl.getBufferSubData(36662, srcByteOffset, dstData, dstOffset, length);
    this.gl.bindBuffer(36662, null);
    return dstData;
  }

  bind({
    target = this.target,
    index = this.accessor && this.accessor.index,
    offset = 0,
    size
  } = {}) {
    if (target === 35345 || target === 35982) {
      if (size !== undefined) {
        this.gl.bindBufferRange(target, index, this.handle, offset, size);
      } else {
        assert(offset === 0);
        this.gl.bindBufferBase(target, index, this.handle);
      }
    } else {
      this.gl.bindBuffer(target, this.handle);
    }

    return this;
  }

  unbind({
    target = this.target,
    index = this.accessor && this.accessor.index
  } = {}) {
    const isIndexedBuffer = target === 35345 || target === 35982;

    if (isIndexedBuffer) {
      this.gl.bindBufferBase(target, index, null);
    } else {
      this.gl.bindBuffer(target, null);
    }

    return this;
  }

  get data() {
    log.removed('Buffer.data', 'N/A', 'v6.0');
  }

  get bytes() {
    log.deprecated('Buffer.bytes', 'Buffer.byteLength', 'v6.1');
    return this.byteLength;
  }

  getDebugData() {
    if (!this.debugData) {
      this.debugData = this.getData({
        length: DEBUG_DATA_LENGTH
      });
      return {
        data: this.debugData,
        changed: true
      };
    }

    return {
      data: this.debugData,
      changed: false
    };
  }

  invalidateDebugData() {
    this.debugData = null;
  }

  _initialize(props = {}) {
    if (ArrayBuffer.isView(props)) {
      props = {
        data: props
      };
    }

    if (Number.isFinite(props)) {
      props = {
        byteLength: props
      };
    }

    if (props.bytes) {
      log.deprecated('bytes', 'byteLength');
    }

    const byteLength = props.byteLength || props.bytes || 0;
    this.usage = props.usage || 35044;
    this.setAccessor(new Accessor(props, props.accessor));
    return props.data ? this._setData(props.data) : this._setByteLength(byteLength);
  }

  _setData(data, usage = this.usage) {
    assert(ArrayBuffer.isView(data));

    const target = this._getTarget();

    this.gl.bindBuffer(target, this.handle);
    this.gl.bufferData(target, data, usage);
    this.gl.bindBuffer(target, null);
    this.usage = usage;
    this.debugData = data.slice(0, DEBUG_DATA_LENGTH);
    this.byteLength = data.byteLength;
    this.bytesUsed = data.byteLength;
    const type = getGLTypeFromTypedArray(data);
    assert(type);
    this.setAccessor(new Accessor(this.accessor, {
      type
    }));
    return this;
  }

  _setByteLength(byteLength, usage = this.usage) {
    assert(byteLength >= 0);
    let data = byteLength;

    if (byteLength === 0) {
      data = new Float32Array(0);
    }

    const target = this._getTarget();

    this.gl.bindBuffer(target, this.handle);
    this.gl.bufferData(target, data, usage);
    this.gl.bindBuffer(target, null);
    this.usage = usage;
    this.debugData = null;
    this.byteLength = byteLength;
    this.bytesUsed = byteLength;
    return this;
  }

  _getTarget() {
    return this.gl.webgl2 ? 36663 : this.target;
  }

  _getAvailableElementCount(srcByteOffset) {
    const ArrayType = getTypedArrayFromGLType(this.accessor.type || 5126, {
      clamped: false
    });
    const sourceElementOffset = srcByteOffset / ArrayType.BYTES_PER_ELEMENT;
    return this.getElementCount() - sourceElementOffset;
  }

  _createHandle() {
    return this.gl.createBuffer();
  }

  _deleteHandle() {
    this.gl.deleteBuffer(this.handle);
  }

  _getParameter(pname) {
    this.gl.bindBuffer(this.target, this.handle);
    const value = this.gl.getBufferParameter(this.target, pname);
    this.gl.bindBuffer(this.target, null);
    return value;
  }

  updateAccessor(opts) {
    log.deprecated('updateAccessor(...)', 'setAccessor(new Accessor(buffer.accessor, ...)');
    this.accessor = new Accessor(this.accessor, opts);
    return this;
  }

  setByteLength(byteLength) {
    log.deprecated('setByteLength', 'reallocate');
    return this.reallocate(byteLength);
  }

}
//# sourceMappingURL=buffer.js.map