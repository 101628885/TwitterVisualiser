import Resource from './resource';
import { isWebGL2, assertWebGL2Context } from '../webgl-utils';
import { log, isObjectEmpty } from '../utils';
export default class TransformFeedback extends Resource {
  static isSupported(gl) {
    return isWebGL2(gl);
  }

  constructor(gl, props = {}) {
    assertWebGL2Context(gl);
    super(gl, props);
    this.initialize(props);
    this.stubRemovedMethods('TransformFeedback', 'v6.0', ['pause', 'resume']);
    Object.seal(this);
  }

  initialize(props = {}) {
    this.buffers = {};
    this.unused = {};
    this.configuration = null;
    this.bindOnUse = true;

    if (!isObjectEmpty(this.buffers)) {
      this.bind(() => this._unbindBuffers());
    }

    this.setProps(props);
    return this;
  }

  setProps(props) {
    if ('program' in props) {
      this.configuration = props.program && props.program.configuration;
    }

    if ('configuration' in props) {
      this.configuration = props.configuration;
    }

    if ('bindOnUse' in props) {
      props = props.bindOnUse;
    }

    if ('buffers' in props) {
      this.setBuffers(props.buffers);
    }
  }

  setBuffers(buffers = {}) {
    this.bind(() => {
      for (const bufferName in buffers) {
        this.setBuffer(bufferName, buffers[bufferName]);
      }
    });
    return this;
  }

  setBuffer(locationOrName, buffer, size, offset = 0) {
    const location = this._getVaryingIndex(locationOrName);

    if (location < 0) {
      this.unused[locationOrName] = buffer;
      log.warn(() => `${this.id} unused varying buffer ${locationOrName}`)();
      return this;
    }

    this.buffers[location] = buffer;

    if (!this.bindOnUse) {
      this._bindBuffer(location, buffer, size, offset);
    }

    return this;
  }

  begin(primitiveMode = 0) {
    this.gl.bindTransformFeedback(36386, this.handle);

    this._bindBuffers();

    this.gl.beginTransformFeedback(primitiveMode);
    return this;
  }

  end() {
    this.gl.endTransformFeedback();

    this._unbindBuffers();

    this.gl.bindTransformFeedback(36386, null);
    return this;
  }

  _getVaryingInfo(locationOrName) {
    return this.configuration && this.configuration.getVaryingInfo(locationOrName);
  }

  _getVaryingIndex(locationOrName) {
    if (this.configuration) {
      return this.configuration.getVaryingInfo(locationOrName).location;
    }

    const location = Number(locationOrName);
    return Number.isFinite(location) ? location : -1;
  }

  _bindBuffers() {
    if (this.bindOnUse) {
      for (const bufferIndex in this.buffers) {
        this._bindBuffer(bufferIndex, this.buffers[bufferIndex]);
      }
    }
  }

  _unbindBuffers() {
    if (this.bindOnUse) {
      for (const bufferIndex in this.buffers) {
        this._bindBuffer(bufferIndex, null);
      }
    }
  }

  _bindBuffer(index, buffer, offset = 0, size) {
    const handle = buffer && buffer.handle;

    if (!handle || size === undefined) {
      this.gl.bindBufferBase(35982, index, handle);
    } else {
      this.gl.bindBufferRange(35982, index, handle, offset, size);
    }

    return this;
  }

  _createHandle() {
    return this.gl.createTransformFeedback();
  }

  _deleteHandle() {
    this.gl.deleteTransformFeedback(this.handle);
  }

  _bindHandle(handle) {
    this.gl.bindTransformFeedback(36386, this.handle);
  }

}
//# sourceMappingURL=transform-feedback.js.map