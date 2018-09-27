function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

import Resource from './resource';
import Buffer from './buffer';
import { isWebGL2 } from '../webgl-utils';
import { getScratchArray, fillArray } from '../utils/array-utils-flat';
import { assert } from '../utils';
import { isMobile, getBrowser } from 'probe.gl';
var OES_vertex_array_object = 'OES_vertex_array_object';
var ERR_ELEMENTS = 'elements must be GL.ELEMENT_ARRAY_BUFFER';

var VertexArrayObject = function (_Resource) {
  _inherits(VertexArrayObject, _Resource);

  _createClass(VertexArrayObject, null, [{
    key: "isSupported",
    value: function isSupported(gl) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (options.constantAttributeZero) {
        return isWebGL2(gl) || isMobile() || getBrowser() === 'Chrome';
      }

      return isWebGL2(gl) || gl.getExtension(OES_vertex_array_object);
    }
  }, {
    key: "getDefaultArray",
    value: function getDefaultArray(gl) {
      gl.luma = gl.luma || {};

      if (!gl.luma.defaultVertexArray) {
        gl.luma.defaultVertexArray = new VertexArrayObject(gl, {
          handle: null
        });
      }

      return gl.luma.defaultVertexArray;
    }
  }, {
    key: "getMaxAttributes",
    value: function getMaxAttributes(gl) {
      VertexArrayObject.MAX_ATTRIBUTES = VertexArrayObject.MAX_ATTRIBUTES || gl.getParameter(34921);
      return VertexArrayObject.MAX_ATTRIBUTES;
    }
  }, {
    key: "setConstant",
    value: function setConstant(gl, location, array) {
      switch (array.constructor) {
        case Float32Array:
          VertexArrayObject._setConstantFloatArray(gl, location, array);

          break;

        case Int32Array:
          VertexArrayObject._setConstantIntArray(gl, location, array);

          break;

        case Uint32Array:
          VertexArrayObject._setConstantUintArray(gl, location, array);

          break;

        default:
          assert(false);
      }
    }
  }]);

  function VertexArrayObject(gl) {
    var _this;

    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, VertexArrayObject);

    var id = opts.id || opts.program && opts.program.id;
    _this = _possibleConstructorReturn(this, _getPrototypeOf(VertexArrayObject).call(this, gl, Object.assign({}, opts, {
      id: id
    })));
    _this.hasVertexArrays = VertexArrayObject.isSupported(gl);
    _this.buffer = null;
    _this.bufferValue = null;

    _this.initialize(opts);

    Object.seal(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(VertexArrayObject, [{
    key: "delete",
    value: function _delete() {
      _get(_getPrototypeOf(VertexArrayObject.prototype), "delete", this).call(this);

      if (this.buffer) {
        this.buffer.delete();
      }
    }
  }, {
    key: "initialize",
    value: function initialize() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return this.setProps(props);
    }
  }, {
    key: "setProps",
    value: function setProps(props) {
      return this;
    }
  }, {
    key: "setElementBuffer",
    value: function setElementBuffer() {
      var _this2 = this;

      var elementBuffer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      assert(!elementBuffer || elementBuffer.target === 34963, ERR_ELEMENTS);
      this.bind(function () {
        _this2.gl.bindBuffer(34963, elementBuffer ? elementBuffer.handle : null);
      });
      return this;
    }
  }, {
    key: "setBuffer",
    value: function setBuffer(location, buffer, accessor) {
      if (buffer.target === 34963) {
        return this.setElementBuffer(buffer, accessor);
      }

      var size = accessor.size,
          type = accessor.type,
          stride = accessor.stride,
          offset = accessor.offset,
          normalized = accessor.normalized,
          integer = accessor.integer,
          divisor = accessor.divisor;
      var gl = this.gl;
      location = Number(location);
      this.bind(function () {
        gl.bindBuffer(34962, buffer.handle);

        if (integer) {
          assert(isWebGL2(gl));
          gl.vertexAttribIPointer(location, size, type, stride, offset);
        } else {
          gl.vertexAttribPointer(location, size, type, normalized, stride, offset);
        }

        gl.enableVertexAttribArray(location);
        gl.vertexAttribDivisor(location, divisor || 0);
      });
      return this;
    }
  }, {
    key: "enable",
    value: function enable(location) {
      var _this3 = this;

      var _enable = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      var disablingAttributeZero = !_enable && location === 0 && !VertexArrayObject.isSupported(this.gl, {
        constantAttributeZero: true
      });

      if (!disablingAttributeZero) {
        location = Number(location);
        this.bind(function () {
          return _enable ? _this3.gl.enableVertexAttribArray(location) : _this3.gl.disableVertexAttribArray(location);
        });
      }

      return this;
    }
  }, {
    key: "getConstantBuffer",
    value: function getConstantBuffer(elementCount, value, accessor) {
      var constantValue = this._normalizeConstantArrayValue(value, accessor);

      var byteLength = constantValue.byteLength * elementCount;
      var length = constantValue.length * elementCount;
      var updateNeeded = !this.buffer;
      this.buffer = this.buffer || new Buffer(this.gl, byteLength);
      updateNeeded = updateNeeded || this.buffer.setByteLength(byteLength);
      updateNeeded = updateNeeded || !this._compareConstantArrayValues(constantValue, this.bufferValue);

      if (updateNeeded) {
        var typedArray = getScratchArray(value.constructor, length);
        fillArray({
          target: typedArray,
          source: constantValue,
          start: 0,
          count: length
        });
        this.buffer.subData(typedArray);
        this.bufferValue = value;
      }

      return this.buffer;
    }
  }, {
    key: "_normalizeConstantArrayValue",
    value: function _normalizeConstantArrayValue(arrayValue, accessor) {
      if (Array.isArray(arrayValue)) {
        return new Float32Array(arrayValue);
      }

      return arrayValue;
    }
  }, {
    key: "_compareConstantArrayValues",
    value: function _compareConstantArrayValues(v1, v2) {
      if (!v1 || !v2 || v1.length !== v2.length || v1.constructor !== v2.constructor) {
        return false;
      }

      for (var i = 0; i < v1.length; ++i) {
        if (v1[i] !== v2[i]) {
          return false;
        }
      }

      return true;
    }
  }, {
    key: "_createHandle",
    value: function _createHandle() {
      this.hasVertexArrays = VertexArrayObject.isSupported(this.gl);

      if (this.hasVertexArrays) {
        return this.gl.createVertexArray();
      }

      return null;
    }
  }, {
    key: "_deleteHandle",
    value: function _deleteHandle(handle) {
      if (this.hasVertexArrays) {
        this.gl.deleteVertexArray(handle);
      }

      return [this.elements];
    }
  }, {
    key: "_bindHandle",
    value: function _bindHandle(handle) {
      if (this.hasVertexArrays) {
        this.gl.bindVertexArray(handle);
      }
    }
  }, {
    key: "_getParameter",
    value: function _getParameter(pname, _ref) {
      var _this4 = this;

      var location = _ref.location;
      assert(Number.isFinite(location));
      return this.bind(function () {
        switch (pname) {
          case 34373:
            return _this4.gl.getVertexAttribOffset(location, pname);

          default:
            return _this4.gl.getVertexAttrib(location, pname);
        }
      });
    }
  }, {
    key: "MAX_ATTRIBUTES",
    get: function get() {
      return VertexArrayObject.getMaxAttributes(this.gl);
    }
  }], [{
    key: "_setConstantFloatArray",
    value: function _setConstantFloatArray(gl, location, array) {
      switch (array.length) {
        case 1:
          gl.vertexAttrib1fv(location, array);
          break;

        case 2:
          gl.vertexAttrib2fv(location, array);
          break;

        case 3:
          gl.vertexAttrib3fv(location, array);
          break;

        case 4:
          gl.vertexAttrib4fv(location, array);
          break;

        default:
          assert(false);
      }
    }
  }, {
    key: "_setConstantIntArray",
    value: function _setConstantIntArray(gl, location, array) {
      assert(isWebGL2(gl));

      switch (array.length) {
        case 1:
          gl.vertexAttribI1iv(location, array);
          break;

        case 2:
          gl.vertexAttribI2iv(location, array);
          break;

        case 3:
          gl.vertexAttribI3iv(location, array);
          break;

        case 4:
          gl.vertexAttribI4iv(location, array);
          break;

        default:
          assert(false);
      }
    }
  }, {
    key: "_setConstantUintArray",
    value: function _setConstantUintArray(gl, location, array) {
      assert(isWebGL2(gl));

      switch (array.length) {
        case 1:
          gl.vertexAttribI1uiv(location, array);
          break;

        case 2:
          gl.vertexAttribI2uiv(location, array);
          break;

        case 3:
          gl.vertexAttribI3uiv(location, array);
          break;

        case 4:
          gl.vertexAttribI4uiv(location, array);
          break;

        default:
          assert(false);
      }
    }
  }]);

  return VertexArrayObject;
}(Resource);

export { VertexArrayObject as default };
//# sourceMappingURL=vertex-array-object.js.map