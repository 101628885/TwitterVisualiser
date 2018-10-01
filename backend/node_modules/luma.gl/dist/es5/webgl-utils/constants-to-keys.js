"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getKeyValue = getKeyValue;
exports.getKey = getKey;
exports.getKeyType = getKeyType;
exports.glGet = glGet;
exports.glKey = glKey;
exports.glKeyType = glKeyType;

var _assert = _interopRequireDefault(require("../utils/assert"));

var _log = _interopRequireDefault(require("../utils/log"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getKeyValue(gl, name) {
  if (typeof name !== 'string') {
    return name;
  }

  var number = Number(name);

  if (!isNaN(number)) {
    return number;
  }

  name = name.replace(/^.*\./, '');
  var value = gl[name];
  (0, _assert.default)(value !== undefined, "Accessing undefined constant GL.".concat(name));
  return value;
}

function getKey(gl, value) {
  value = Number(value);

  for (var key in gl) {
    if (gl[key] === value) {
      return "GL.".concat(key);
    }
  }

  return String(value);
}

function getKeyType(gl, value) {
  (0, _assert.default)(value !== undefined, 'undefined key');
  value = Number(value);

  for (var key in gl) {
    if (gl[key] === value) {
      return "GL.".concat(key);
    }
  }

  return String(value);
}

function glGet(gl, name) {
  if (!name) {
    _log.default.removed('glGet(name)', 'glGet(gl, name)', '6.0')();
  }

  return getKeyValue(gl, name);
}

function glKey(gl, value) {
  if (value === undefined) {
    _log.default.removed('glKey(value)', 'glKey(gl, value)', '6.0')();
  }

  return getKey(gl, value);
}

function glKeyType(gl, value) {
  if (value === undefined) {
    _log.default.removed('glKeyType(value)', 'glKeyType(gl, value)', '6.0')();
  }

  return getKeyType(gl, value);
}
//# sourceMappingURL=constants-to-keys.js.map