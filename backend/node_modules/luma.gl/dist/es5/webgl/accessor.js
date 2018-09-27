"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DEFAULT_ACCESSOR_VALUES = exports.default = void 0;

var _typedArrayUtils = require("../webgl-utils/typed-array-utils");

var _log = _interopRequireDefault(require("../utils/log"));

var _assert = _interopRequireDefault(require("../utils/assert"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var DEFAULT_ACCESSOR_VALUES = {
  offset: 0,
  stride: 0,
  type: 5126,
  size: 1,
  divisor: 0,
  normalized: false,
  integer: false
};
exports.DEFAULT_ACCESSOR_VALUES = DEFAULT_ACCESSOR_VALUES;

var Accessor = function () {
  _createClass(Accessor, null, [{
    key: "getBytesPerElement",
    value: function getBytesPerElement(accessor) {
      var ArrayType = (0, _typedArrayUtils.getTypedArrayFromGLType)(accessor.type || 5126);
      return ArrayType.BYTES_PER_ELEMENT;
    }
  }, {
    key: "getBytesPerVertex",
    value: function getBytesPerVertex(accessor) {
      (0, _assert.default)(accessor.size);
      var ArrayType = (0, _typedArrayUtils.getTypedArrayFromGLType)(accessor.type || 5126);
      return ArrayType.BYTES_PER_ELEMENT * accessor.size;
    }
  }, {
    key: "resolve",
    value: function resolve() {
      for (var _len = arguments.length, accessors = new Array(_len), _key = 0; _key < _len; _key++) {
        accessors[_key] = arguments[_key];
      }

      return _construct(Accessor, [DEFAULT_ACCESSOR_VALUES].concat(accessors));
    }
  }]);

  function Accessor() {
    var _this = this;

    _classCallCheck(this, Accessor);

    for (var _len2 = arguments.length, accessors = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      accessors[_key2] = arguments[_key2];
    }

    accessors.forEach(function (accessor) {
      return _this._assign(accessor);
    });
    Object.freeze(this);
  }

  _createClass(Accessor, [{
    key: "toString",
    value: function toString() {
      return JSON.stringify(this);
    }
  }, {
    key: "_assign",
    value: function _assign() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (props.type !== undefined) {
        if (this.type !== props.type) {
          _log.default.warn('accessor type mismatch');
        }

        this.type = props.type;

        if (props.type === 5124 || props.type === 5125) {
          this.integer = true;
        }
      }

      if (props.size !== undefined) {
        if (this.size !== props.size) {
          _log.default.warn('accessor size mismatch');
        }

        this.size = props.size;
      }

      if (props.divisor !== undefined) {
        this.divisor = props.divisor;
      }

      if (props.offset !== undefined) {
        this.offset = props.offset;
      }

      if (props.stride !== undefined) {
        this.stride = props.stride;
      }

      if (props.normalized !== undefined) {
        this.normalized = props.normalized;
      }

      if (props.integer !== undefined) {
        this.integer = props.integer;
      }

      if (props.instanced !== undefined) {
        _log.default.deprecated('Accessor.instanced', 'Accessor.divisor');

        this.divisor = props.instanced ? 1 : 0;
      }

      if (props.isInstanced !== undefined) {
        _log.default.deprecated('Accessor.isInstanced', 'Accessor.divisor');

        this.divisor = props.isInstanced ? 1 : 0;
      }

      if (props.index !== undefined) {
        this.index = props.index ? 1 : 0;
      }

      return this;
    }
  }, {
    key: "BYTES_PER_ELEMENT",
    get: function get() {
      return Accessor.getBytesPerElement(this);
    }
  }, {
    key: "BYTES_PER_VERTEX",
    get: function get() {
      return Accessor.getBytesPerVertex(this);
    }
  }]);

  return Accessor;
}();

exports.default = Accessor;
//# sourceMappingURL=accessor.js.map