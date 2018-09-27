function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

import { Buffer } from '../webgl';
import { log, uid } from '../utils';

var Attribute = function () {
  function Attribute(gl) {
    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Attribute);

    var _opts$id = opts.id,
        id = _opts$id === void 0 ? uid('attribute') : _opts$id,
        type = opts.type,
        _opts$isIndexed = opts.isIndexed,
        isIndexed = _opts$isIndexed === void 0 ? false : _opts$isIndexed;
    this.gl = gl;
    this.id = id;
    this.isIndexed = isIndexed;
    this.target = isIndexed ? 34963 : 34962;
    this.type = type;
    this.value = null;
    this.externalBuffer = null;
    this.buffer = null;
    this.userData = {};
    this.update(opts);
    Object.seal(this);

    this._validateAttributeDefinition();
  }

  _createClass(Attribute, [{
    key: "delete",
    value: function _delete() {
      if (this.buffer) {
        this.buffer.delete();
        this.buffer = null;
      }
    }
  }, {
    key: "update",
    value: function update(opts) {
      var value = opts.value,
          buffer = opts.buffer,
          _opts$constant = opts.constant,
          constant = _opts$constant === void 0 ? this.constant || false : _opts$constant;
      this.constant = constant;

      if (buffer) {
        this.externalBuffer = buffer;
        this.constant = false;
        this.type = buffer.accessor.type;

        if (buffer.accessor.divisor !== undefined) {
          this.divisor = buffer.accessor.divisor;
        }
      } else if (value) {
        this.externalBuffer = null;
        this.value = value;

        if (!constant) {
          this.buffer = this.buffer || new Buffer(this.gl, Object.assign({}, opts, {
            id: this.id,
            target: this.target,
            type: this.type
          }));
          this.buffer.setData({
            data: value
          });
          this.type = this.buffer.accessor.type;
        }
      }

      this._setAccessor(opts);
    }
  }, {
    key: "getBuffer",
    value: function getBuffer() {
      if (this.constant) {
        return null;
      }

      return this.externalBuffer || this.buffer;
    }
  }, {
    key: "getValue",
    value: function getValue() {
      if (this.constant) {
        return this.value;
      }

      var buffer = this.externalBuffer || this.buffer;

      if (buffer) {
        return [buffer, this];
      }

      return null;
    }
  }, {
    key: "_setAccessor",
    value: function _setAccessor(opts) {
      var _opts$size = opts.size,
          size = _opts$size === void 0 ? this.size : _opts$size,
          _opts$offset = opts.offset,
          offset = _opts$offset === void 0 ? this.offset || 0 : _opts$offset,
          _opts$stride = opts.stride,
          stride = _opts$stride === void 0 ? this.stride || 0 : _opts$stride,
          _opts$normalized = opts.normalized,
          normalized = _opts$normalized === void 0 ? this.normalized || false : _opts$normalized,
          _opts$integer = opts.integer,
          integer = _opts$integer === void 0 ? this.integer || false : _opts$integer,
          _opts$divisor = opts.divisor,
          divisor = _opts$divisor === void 0 ? this.divisor || 0 : _opts$divisor,
          instanced = opts.instanced,
          isInstanced = opts.isInstanced;
      this.size = size;
      this.offset = offset;
      this.stride = stride;
      this.normalized = normalized;
      this.integer = integer;
      this.divisor = divisor;

      if (isInstanced !== undefined) {
        log.deprecated('Attribute.isInstanced');
        this.divisor = isInstanced ? 1 : 0;
      }

      if (instanced !== undefined) {
        log.deprecated('Attribute.instanced');
        this.divisor = instanced ? 1 : 0;
      }
    }
  }, {
    key: "_validateAttributeDefinition",
    value: function _validateAttributeDefinition() {}
  }]);

  return Attribute;
}();

export { Attribute as default };
//# sourceMappingURL=attribute.js.map