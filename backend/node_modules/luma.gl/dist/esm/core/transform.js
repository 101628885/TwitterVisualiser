function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

import Model from './model';
import Buffer from '../webgl/buffer';
import TransformFeedback from '../webgl/transform-feedback';
import { isWebGL2, assertWebGL2Context, getShaderVersion } from '../webgl-utils';
import assert from '../utils/assert';
import { log } from '../utils';
var FS100 = 'void main() {}';
var FS300 = "#version 300 es\n".concat(FS100);

var Transform = function () {
  _createClass(Transform, null, [{
    key: "isSupported",
    value: function isSupported(gl) {
      return isWebGL2(gl);
    }
  }]);

  function Transform(gl) {
    var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Transform);

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

  _createClass(Transform, [{
    key: "delete",
    value: function _delete() {
      for (var name in this._buffersCreated) {
        this._buffersCreated[name].delete();
      }

      this.model.delete();
    }
  }, {
    key: "getBuffer",
    value: function getBuffer() {
      var varyingName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      assert(varyingName && this.feedbackBuffers[this.currentIndex][varyingName]);
      return this.feedbackBuffers[this.currentIndex][varyingName];
    }
  }, {
    key: "run",
    value: function run() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref$uniforms = _ref.uniforms,
          uniforms = _ref$uniforms === void 0 ? {} : _ref$uniforms,
          _ref$unbindModels = _ref.unbindModels,
          unbindModels = _ref$unbindModels === void 0 ? [] : _ref$unbindModels;

      this.model.setAttributes(this.sourceBuffers[this.currentIndex]);
      this.model.transform({
        transformFeedback: this.transformFeedbacks[this.currentIndex],
        parameters: _defineProperty({}, 35977, true),
        uniforms: uniforms,
        unbindModels: unbindModels
      });
    }
  }, {
    key: "swapBuffers",
    value: function swapBuffers() {
      assert(this.feedbackMap);
      this.currentIndex = (this.currentIndex + 1) % 2;
    }
  }, {
    key: "update",
    value: function update(_ref2) {
      var _ref2$sourceBuffers = _ref2.sourceBuffers,
          sourceBuffers = _ref2$sourceBuffers === void 0 ? null : _ref2$sourceBuffers,
          _ref2$feedbackBuffers = _ref2.feedbackBuffers,
          feedbackBuffers = _ref2$feedbackBuffers === void 0 ? null : _ref2$feedbackBuffers,
          _ref2$elementCount = _ref2.elementCount,
          elementCount = _ref2$elementCount === void 0 ? this.elementCount : _ref2$elementCount;

      if (!sourceBuffers && !feedbackBuffers) {
        log.warn('Transform : no buffers updated')();
        return this;
      }

      this.model.setVertexCount(elementCount);

      for (var bufferName in feedbackBuffers) {
        assert(feedbackBuffers[bufferName] instanceof Buffer);
      }

      var currentIndex = this.currentIndex;
      Object.assign(this.sourceBuffers[currentIndex], sourceBuffers);
      Object.assign(this.feedbackBuffers[currentIndex], feedbackBuffers);

      this._createFeedbackBuffers({
        feedbackBuffers: feedbackBuffers
      });

      this.transformFeedbacks[currentIndex].setBuffers(this.feedbackBuffers[currentIndex]);

      this._setupSwapBuffers();

      return this;
    }
  }, {
    key: "_initialize",
    value: function _initialize() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var feedbackBuffers = props.feedbackBuffers,
          feedbackMap = props.feedbackMap;
      var destinationBuffers = props.destinationBuffers,
          sourceDestinationMap = props.sourceDestinationMap;

      if (destinationBuffers) {
        log.deprecated('destinationBuffers', 'feedbackBuffers')();
        feedbackBuffers = feedbackBuffers || destinationBuffers;
      }

      if (sourceDestinationMap) {
        log.deprecated('sourceDestinationMap', 'feedbackMap')();
        feedbackMap = feedbackMap || sourceDestinationMap;
      }

      var sourceBuffers = props.sourceBuffers,
          vs = props.vs,
          elementCount = props.elementCount;
      assert(sourceBuffers && vs && elementCount >= 0);
      assert(feedbackBuffers || feedbackMap, ' Transform needs feedbackBuffers or feedbackMap');

      for (var bufferName in feedbackBuffers || {}) {
        assert(feedbackBuffers[bufferName] instanceof Buffer);
      }

      var varyings = props.varyings;
      assert(Array.isArray(varyings) || feedbackMap);
      var varyingsArray = varyings;

      if (!Array.isArray(varyings)) {
        varyingsArray = Object.values(feedbackMap);
      }

      this.feedbackMap = feedbackMap;

      this._setupBuffers({
        sourceBuffers: sourceBuffers,
        feedbackBuffers: feedbackBuffers
      });

      this._setupSwapBuffers();

      this._buildModel(Object.assign({}, props, {
        id: props.id || 'transform-model',
        drawMode: props.drawMode || 0,
        varyings: varyingsArray
      }));
    }
  }, {
    key: "_setupBuffers",
    value: function _setupBuffers(_ref3) {
      var _ref3$sourceBuffers = _ref3.sourceBuffers,
          sourceBuffers = _ref3$sourceBuffers === void 0 ? null : _ref3$sourceBuffers,
          _ref3$feedbackBuffers = _ref3.feedbackBuffers,
          feedbackBuffers = _ref3$feedbackBuffers === void 0 ? null : _ref3$feedbackBuffers;
      this.sourceBuffers[0] = Object.assign({}, sourceBuffers);
      this.feedbackBuffers[0] = Object.assign({}, feedbackBuffers);

      this._createFeedbackBuffers({
        feedbackBuffers: feedbackBuffers
      });

      this.sourceBuffers[1] = {};
      this.feedbackBuffers[1] = {};
    }
  }, {
    key: "_createFeedbackBuffers",
    value: function _createFeedbackBuffers(_ref4) {
      var feedbackBuffers = _ref4.feedbackBuffers;

      if (!this.feedbackMap) {
        return;
      }

      var current = this.currentIndex;

      for (var sourceBufferName in this.feedbackMap) {
        var feedbackBufferName = this.feedbackMap[sourceBufferName];

        if (!feedbackBuffers || !feedbackBuffers[feedbackBufferName]) {
          var sourceBuffer = this.sourceBuffers[current][sourceBufferName];
          var bytes = sourceBuffer.bytes,
              type = sourceBuffer.type,
              usage = sourceBuffer.usage,
              accessor = sourceBuffer.accessor;
          var buffer = new Buffer(this.gl, {
            bytes: bytes,
            type: type,
            usage: usage,
            accessor: accessor
          });

          if (this._buffersCreated[feedbackBufferName]) {
            this._buffersCreated[feedbackBufferName].delete();

            this._buffersCreated[feedbackBufferName] = buffer;
          }

          this.feedbackBuffers[current][feedbackBufferName] = buffer;
        }
      }
    }
  }, {
    key: "_setupSwapBuffers",
    value: function _setupSwapBuffers() {
      if (!this.feedbackMap) {
        return;
      }

      var current = this.currentIndex;
      var next = (current + 1) % 2;

      for (var sourceBufferName in this.feedbackMap) {
        var feedbackBufferName = this.feedbackMap[sourceBufferName];
        this.sourceBuffers[next][sourceBufferName] = this.feedbackBuffers[current][feedbackBufferName];
        this.feedbackBuffers[next][feedbackBufferName] = this.sourceBuffers[current][sourceBufferName];
        assert(this.feedbackBuffers[next][feedbackBufferName] instanceof Buffer);
      }

      if (this.transformFeedbacks[next]) {
        this.transformFeedbacks[next].setBuffers(this.feedbackBuffers[next]);
      }
    }
  }, {
    key: "_buildModel",
    value: function _buildModel() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var vs = props.vs,
          elementCount = props.elementCount;
      var fs = getShaderVersion(vs) === 300 ? FS300 : FS100;
      this.model = new Model(this.gl, Object.assign({}, props, {
        fs: fs,
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
  }, {
    key: "elementCount",
    get: function get() {
      return this.model.getVertexCount();
    }
  }]);

  return Transform;
}();

export { Transform as default };
//# sourceMappingURL=transform.js.map