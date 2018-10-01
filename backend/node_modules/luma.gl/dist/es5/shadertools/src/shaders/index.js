"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MODULAR_SHADERS = void 0;

var _modularVertex = _interopRequireDefault(require("./modular-vertex.glsl"));

var _modularFragment = _interopRequireDefault(require("./modular-fragment.glsl"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MODULAR_SHADERS = {
  vs: _modularVertex.default,
  fs: _modularFragment.default,
  defaultUniforms: {}
};
exports.MODULAR_SHADERS = MODULAR_SHADERS;
//# sourceMappingURL=index.js.map