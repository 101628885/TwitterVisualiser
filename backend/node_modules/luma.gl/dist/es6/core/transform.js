import Model from './model';
import Buffer from '../webgl/buffer';
import TransformFeedback from '../webgl/transform-feedback';
import { isWebGL2, assertWebGL2Context, getShaderVersion } from '../webgl-utils';
import assert from '../utils/assert';
import { log } from '../utils';
const FS100 = 'void main() {}';
const FS300 = `#version 300 es\n${FS100}`;
export default class Transform {
  static isSupported(gl) {
    return isWebGL2(gl);
  }

  constructor(gl, props = {}) {
    assertWebGL2Context(gl);
    this.gl = gl;
    this.model = null;
    this.currentIndex = 0;
    this.sourceBuffers = new Array(2);
    this.feedbackBuffers = new Array(2);
    this.transformFeedbacks = new Array(2);
    this._buffersCreated = {};

    this._initialize(props);

    Object.seal(this);
  }

  delete() {
    for (const name in this._buffersCreated) {
      this._buffersCreated[name].delete();
    }

    this.model.delete();
  }

  get elementCount() {
    return this.model.getVertexCount();
  }

  getBuffer(varyingName = null) {
    assert(varyingName && this.feedbackBuffers[this.currentIndex][varyingName]);
    return this.feedbackBuffers[this.currentIndex][varyingName];
  }

  run({
    uniforms = {},
    unbindModels = []
  } = {}) {
    this.model.setAttributes(this.sourceBuffers[this.currentIndex]);
    this.model.transform({
      transformFeedback: this.transformFeedbacks[this.currentIndex],
      parameters: {
        [35977]: true
      },
      uniforms,
      unbindModels
    });
  }

  swapBuffers() {
    assert(this.feedbackMap);
    this.currentIndex = (this.currentIndex + 1) % 2;
  }

  update({
    sourceBuffers = null,
    feedbackBuffers = null,
    elementCount = this.elementCount
  }) {
    if (!sourceBuffers && !feedbackBuffers) {
      log.warn('Transform : no buffers updated')();
      return this;
    }

    this.model.setVertexCount(elementCount);

    for (const bufferName in feedbackBuffers) {
      assert(feedbackBuffers[bufferName] instanceof Buffer);
    }

    const currentIndex = this.currentIndex;
    Object.assign(this.sourceBuffers[currentIndex], sourceBuffers);
    Object.assign(this.feedbackBuffers[currentIndex], feedbackBuffers);

    this._createFeedbackBuffers({
      feedbackBuffers
    });

    this.transformFeedbacks[currentIndex].setBuffers(this.feedbackBuffers[currentIndex]);

    this._setupSwapBuffers();

    return this;
  }

  _initialize(props = {}) {
    let feedbackBuffers = props.feedbackBuffers,
        feedbackMap = props.feedbackMap;
    const destinationBuffers = props.destinationBuffers,
          sourceDestinationMap = props.sourceDestinationMap;

    if (destinationBuffers) {
      log.deprecated('destinationBuffers', 'feedbackBuffers')();
      feedbackBuffers = feedbackBuffers || destinationBuffers;
    }

    if (sourceDestinationMap) {
      log.deprecated('sourceDestinationMap', 'feedbackMap')();
      feedbackMap = feedbackMap || sourceDestinationMap;
    }

    const sourceBuffers = props.sourceBuffers,
          vs = props.vs,
          elementCount = props.elementCount;
    assert(sourceBuffers && vs && elementCount >= 0);
    assert(feedbackBuffers || feedbackMap, ' Transform needs feedbackBuffers or feedbackMap');

    for (const bufferName in feedbackBuffers || {}) {
      assert(feedbackBuffers[bufferName] instanceof Buffer);
    }

    const varyings = props.varyings;
    assert(Array.isArray(varyings) || feedbackMap);
    let varyingsArray = varyings;

    if (!Array.isArray(varyings)) {
      varyingsArray = Object.values(feedbackMap);
    }

    this.feedbackMap = feedbackMap;

    this._setupBuffers({
      sourceBuffers,
      feedbackBuffers
    });

    this._setupSwapBuffers();

    this._buildModel(Object.assign({}, props, {
      id: props.id || 'transform-model',
      drawMode: props.drawMode || 0,
      varyings: varyingsArray
    }));
  }

  _setupBuffers({
    sourceBuffers = null,
    feedbackBuffers = null
  }) {
    this.sourceBuffers[0] = Object.assign({}, sourceBuffers);
    this.feedbackBuffers[0] = Object.assign({}, feedbackBuffers);

    this._createFeedbackBuffers({
      feedbackBuffers
    });

    this.sourceBuffers[1] = {};
    this.feedbackBuffers[1] = {};
  }

  _createFeedbackBuffers({
    feedbackBuffers
  }) {
    if (!this.feedbackMap) {
      return;
    }

    const current = this.currentIndex;

    for (const sourceBufferName in this.feedbackMap) {
      const feedbackBufferName = this.feedbackMap[sourceBufferName];

      if (!feedbackBuffers || !feedbackBuffers[feedbackBufferName]) {
        const sourceBuffer = this.sourceBuffers[current][sourceBufferName];
        const bytes = sourceBuffer.bytes,
              type = sourceBuffer.type,
              usage = sourceBuffer.usage,
              accessor = sourceBuffer.accessor;
        const buffer = new Buffer(this.gl, {
          bytes,
          type,
          usage,
          accessor
        });

        if (this._buffersCreated[feedbackBufferName]) {
          this._buffersCreated[feedbackBufferName].delete();

          this._buffersCreated[feedbackBufferName] = buffer;
        }

        this.feedbackBuffers[current][feedbackBufferName] = buffer;
      }
    }
  }

  _setupSwapBuffers() {
    if (!this.feedbackMap) {
      return;
    }

    const current = this.currentIndex;
    const next = (current + 1) % 2;

    for (const sourceBufferName in this.feedbackMap) {
      const feedbackBufferName = this.feedbackMap[sourceBufferName];
      this.sourceBuffers[next][sourceBufferName] = this.feedbackBuffers[current][feedbackBufferName];
      this.feedbackBuffers[next][feedbackBufferName] = this.sourceBuffers[current][sourceBufferName];
      assert(this.feedbackBuffers[next][feedbackBufferName] instanceof Buffer);
    }

    if (this.transformFeedbacks[next]) {
      this.transformFeedbacks[next].setBuffers(this.feedbackBuffers[next]);
    }
  }

  _buildModel(props = {}) {
    const vs = props.vs,
          elementCount = props.elementCount;
    const fs = getShaderVersion(vs) === 300 ? FS300 : FS100;
    this.model = new Model(this.gl, Object.assign({}, props, {
      fs,
      vertexCount: elementCount
    }));
    this.transformFeedbacks[0] = new TransformFeedback(this.gl, {
      program: this.model.program,
      buffers: this.feedbackBuffers[0]
    });

    if (this.feedbackMap) {
      this.transformFeedbacks[1] = new TransformFeedback(this.gl, {
        program: this.model.program,
        buffers: this.feedbackBuffers[1]
      });
    }
  }

}
//# sourceMappingURL=transform.js.map