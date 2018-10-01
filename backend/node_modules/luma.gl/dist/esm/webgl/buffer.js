function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

import Resource from './resource';
import Accessor from './accessor';
import { assertWebGL2Context } from '../webgl-utils';
import { getGLTypeFromTypedArray, getTypedArrayFromGLType } from '../webgl-utils/typed-array-utils';
import { log } from '../utils';
import assert from '../utils/assert';
var DEBUG_DATA_LENGTH = 10;

var Buffer = function (_Resource) {
  _inherits(Buffer, _Resource);

  function Buffer(gl) {
    var _this;

    var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Buffer);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Buffer).call(this, gl, props));

    _this.stubRemovedMethods('Buffer', 'v6.0', ['layout', 'setLayout', 'getIndexedParameter']);

    _this.target = props.target || (_this.gl.webgl2 ? 36662 : 34962);

    _this._initialize(props);

    Object.seal(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(Buffer, [{
    key: "getElementCount",
    value: function getElementCount() {
      var accessor = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.accessor;
      return Math.round(this.byteLength / Accessor.getBytesPerElement(accessor));
    }
  }, {
    key: "getVertexCount",
    value: function getVertexCount() {
      var accessor = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.accessor;
      return Math.round(this.byteLength / Accessor.getBytesPerVertex(accessor));
    }
  }, {
    key: "initialize",
    value: function initialize(props) {
      return this._initialize(props);
    }
  }, {
    key: "setProps",
    value: function setProps(props) {
      if ('data' in props) {
        this.setData(props);
      }

      return this;
    }
  }, {
    key: "setAccessor",
    value: function setAccessor(opts) {
      this.accessor = opts;
      return this;
    }
  }, {
    key: "reallocate",
    value: function reallocate(byteLength) {
      if (byteLength > this.byteLength) {
        this._setByteLength(byteLength);

        return true;
      }

      this.bytesUsed = byteLength;
      return false;
    }
  }, {
    key: "setData",
    value: function setData(opts) {
      return this.initialize(opts);
    }
  }, {
    key: "subData",
    value: function subData(props) {
      if (ArrayBuffer.isView(props)) {
        props = {
          data: props
        };
      }

      var _props = props,
          data = _props.data,
          _props$offset = _props.offset,
          offset = _props$offset === void 0 ? 0 : _props$offset,
          _props$srcOffset = _props.srcOffset,
          srcOffset = _props$srcOffset === void 0 ? 0 : _props$srcOffset;
      var byteLength = props.byteLength || props.length;
      assert(data);
      var target = this.gl.webgl2 ? 36663 : this.target;
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
  }, {
    key: "copyData",
    value: function copyData(_ref) {
      var sourceBuffer = _ref.sourceBuffer,
          _ref$readOffset = _ref.readOffset,
          readOffset = _ref$readOffset === void 0 ? 0 : _ref$readOffset,
          _ref$writeOffset = _ref.writeOffset,
          writeOffset = _ref$writeOffset === void 0 ? 0 : _ref$writeOffset,
          size = _ref.size;
      var gl = this.gl;
      assertWebGL2Context(gl);
      gl.bindBuffer(36662, sourceBuffer.handle);
      gl.bindBuffer(36663, this.handle);
      gl.copyBufferSubData(36662, 36663, readOffset, writeOffset, size);
      gl.bindBuffer(36662, null);
      gl.bindBuffer(36663, null);
      this.debugData = null;
      return this;
    }
  }, {
    key: "getData",
    value: function getData() {
      var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref2$dstData = _ref2.dstData,
          dstData = _ref2$dstData === void 0 ? null : _ref2$dstData,
          _ref2$srcByteOffset = _ref2.srcByteOffset,
          srcByteOffset = _ref2$srcByteOffset === void 0 ? 0 : _ref2$srcByteOffset,
          _ref2$dstOffset = _ref2.dstOffset,
          dstOffset = _ref2$dstOffset === void 0 ? 0 : _ref2$dstOffset,
          _ref2$length = _ref2.length,
          length = _ref2$length === void 0 ? 0 : _ref2$length;

      assertWebGL2Context(this.gl);
      var ArrayType = getTypedArrayFromGLType(this.accessor.type || 5126, {
        clamped: false
      });

      var sourceAvailableElementCount = this._getAvailableElementCount(srcByteOffset);

      var dstElementOffset = dstOffset;
      var dstAvailableElementCount;
      var dstElementCount;

      if (dstData) {
        dstElementCount = dstData.length;
        dstAvailableElementCount = dstElementCount - dstElementOffset;
      } else {
        dstAvailableElementCount = Math.min(sourceAvailableElementCount, length || sourceAvailableElementCount);
        dstElementCount = dstElementOffset + dstAvailableElementCount;
      }

      var copyElementCount = Math.min(sourceAvailableElementCount, dstAvailableElementCount);
      length = length || copyElementCount;
      assert(length <= copyElementCount);
      dstData = dstData || new ArrayType(dstElementCount);
      this.gl.bindBuffer(36662, this.handle);
      this.gl.getBufferSubData(36662, srcByteOffset, dstData, dstOffset, length);
      this.gl.bindBuffer(36662, null);
      return dstData;
    }
  }, {
    key: "bind",
    value: function bind() {
      var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref3$target = _ref3.target,
          target = _ref3$target === void 0 ? this.target : _ref3$target,
          _ref3$index = _ref3.index,
          index = _ref3$index === void 0 ? this.accessor && this.accessor.index : _ref3$index,
          _ref3$offset = _ref3.offset,
          offset = _ref3$offset === void 0 ? 0 : _ref3$offset,
          size = _ref3.size;

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
  }, {
    key: "unbind",
    value: function unbind() {
      var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref4$target = _ref4.target,
          target = _ref4$target === void 0 ? this.target : _ref4$target,
          _ref4$index = _ref4.index,
          index = _ref4$index === void 0 ? this.accessor && this.accessor.index : _ref4$index;

      var isIndexedBuffer = target === 35345 || target === 35982;

      if (isIndexedBuffer) {
        this.gl.bindBufferBase(target, index, null);
      } else {
        this.gl.bindBuffer(target, null);
      }

      return this;
    }
  }, {
    key: "getDebugData",
    value: function getDebugData() {
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
  }, {
    key: "invalidateDebugData",
    value: function invalidateDebugData() {
      this.debugData = null;
    }
  }, {
    key: "_initialize",
    value: function _initialize() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

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

      var byteLength = props.byteLength || props.bytes || 0;
      this.usage = props.usage || 35044;
      this.setAccessor(new Accessor(props, props.accessor));
      return props.data ? this._setData(props.data) : this._setByteLength(byteLength);
    }
  }, {
    key: "_setData",
    value: function _setData(data) {
      var usage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.usage;
      assert(ArrayBuffer.isView(data));

      var target = this._getTarget();

      this.gl.bindBuffer(target, this.handle);
      this.gl.bufferData(target, data, usage);
      this.gl.bindBuffer(target, null);
      this.usage = usage;
      this.debugData = data.slice(0, DEBUG_DATA_LENGTH);
      this.byteLength = data.byteLength;
      this.bytesUsed = data.byteLength;
      var type = getGLTypeFromTypedArray(data);
      assert(type);
      this.setAccessor(new Accessor(this.accessor, {
        type: type
      }));
      return this;
    }
  }, {
    key: "_setByteLength",
    value: function _setByteLength(byteLength) {
      var usage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.usage;
      assert(byteLength >= 0);
      var data = byteLength;

      if (byteLength === 0) {
        data = new Float32Array(0);
      }

      var target = this._getTarget();

      this.gl.bindBuffer(target, this.handle);
      this.gl.bufferData(target, data, usage);
      this.gl.bindBuffer(target, null);
      this.usage = usage;
      this.debugData = null;
      this.byteLength = byteLength;
      this.bytesUsed = byteLength;
      return this;
    }
  }, {
    key: "_getTarget",
    value: function _getTarget() {
      return this.gl.webgl2 ? 36663 : this.target;
    }
  }, {
    key: "_getAvailableElementCount",
    value: function _getAvailableElementCount(srcByteOffset) {
      var ArrayType = getTypedArrayFromGLType(this.accessor.type || 5126, {
        clamped: false
      });
      var sourceElementOffset = srcByteOffset / ArrayType.BYTES_PER_ELEMENT;
      return this.getElementCount() - sourceElementOffset;
    }
  }, {
    key: "_createHandle",
    value: function _createHandle() {
      return this.gl.createBuffer();
    }
  }, {
    key: "_deleteHandle",
    value: function _deleteHandle() {
      this.gl.deleteBuffer(this.handle);
    }
  }, {
    key: "_getParameter",
    value: function _getParameter(pname) {
      this.gl.bindBuffer(this.target, this.handle);
      var value = this.gl.getBufferParameter(this.target, pname);
      this.gl.bindBuffer(this.target, null);
      return value;
    }
  }, {
    key: "updateAccessor",
    value: function updateAccessor(opts) {
      log.deprecated('updateAccessor(...)', 'setAccessor(new Accessor(buffer.accessor, ...)');
      this.accessor = new Accessor(this.accessor, opts);
      return this;
    }
  }, {
    key: "setByteLength",
    value: function setByteLength(byteLength) {
      log.deprecated('setByteLength', 'reallocate');
      return this.reallocate(byteLength);
    }
  }, {
    key: "data",
    get: function get() {
      log.removed('Buffer.data', 'N/A', 'v6.0');
    }
  }, {
    key: "bytes",
    get: function get() {
      log.deprecated('Buffer.bytes', 'Buffer.byteLength', 'v6.1');
      return this.byteLength;
    }
  }]);

  return Buffer;
}(Resource);

export { Buffer as default };
//# sourceMappingURL=buffer.js.map