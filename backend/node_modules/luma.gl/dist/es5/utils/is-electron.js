"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function isElectron() {
  if (typeof window !== 'undefined' && _typeof(window.process) === 'object' && window.process.type === 'renderer') {
    return true;
  }

  if (typeof process !== 'undefined' && _typeof(process.versions) === 'object' && Boolean(process.versions.electron)) {
    return true;
  }

  if ((typeof navigator === "undefined" ? "undefined" : _typeof(navigator)) === 'object' && typeof navigator.userAgent === 'string' && navigator.userAgent.indexOf('Electron') >= 0) {
    return true;
  }

  return false;
}

var _default = isElectron();

exports.default = _default;
//# sourceMappingURL=is-electron.js.map