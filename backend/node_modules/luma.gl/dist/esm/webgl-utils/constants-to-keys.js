import assert from '../utils/assert';
import log from '../utils/log';
export function getKeyValue(gl, name) {
  if (typeof name !== 'string') {
    return name;
  }

  var number = Number(name);

  if (!isNaN(number)) {
    return number;
  }

  name = name.replace(/^.*\./, '');
  var value = gl[name];
  assert(value !== undefined, "Accessing undefined constant GL.".concat(name));
  return value;
}
export function getKey(gl, value) {
  value = Number(value);

  for (var key in gl) {
    if (gl[key] === value) {
      return "GL.".concat(key);
    }
  }

  return String(value);
}
export function getKeyType(gl, value) {
  assert(value !== undefined, 'undefined key');
  value = Number(value);

  for (var key in gl) {
    if (gl[key] === value) {
      return "GL.".concat(key);
    }
  }

  return String(value);
}
export function glGet(gl, name) {
  if (!name) {
    log.removed('glGet(name)', 'glGet(gl, name)', '6.0')();
  }

  return getKeyValue(gl, name);
}
export function glKey(gl, value) {
  if (value === undefined) {
    log.removed('glKey(value)', 'glKey(gl, value)', '6.0')();
  }

  return getKey(gl, value);
}
export function glKeyType(gl, value) {
  if (value === undefined) {
    log.removed('glKeyType(value)', 'glKeyType(gl, value)', '6.0')();
  }

  return getKeyType(gl, value);
}
//# sourceMappingURL=constants-to-keys.js.map