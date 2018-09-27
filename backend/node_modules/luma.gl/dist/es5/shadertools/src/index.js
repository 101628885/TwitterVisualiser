"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "assembleShaders", {
  enumerable: true,
  get: function get() {
    return _assembleShaders.assembleShaders;
  }
});
Object.defineProperty(exports, "registerShaderModules", {
  enumerable: true,
  get: function get() {
    return _resolveModules.registerShaderModules;
  }
});
Object.defineProperty(exports, "setDefaultShaderModules", {
  enumerable: true,
  get: function get() {
    return _resolveModules.setDefaultShaderModules;
  }
});
Object.defineProperty(exports, "fp32", {
  enumerable: true,
  get: function get() {
    return _fp.default;
  }
});
Object.defineProperty(exports, "fp64", {
  enumerable: true,
  get: function get() {
    return _fp2.default;
  }
});
Object.defineProperty(exports, "project", {
  enumerable: true,
  get: function get() {
    return _project.default;
  }
});
Object.defineProperty(exports, "lighting", {
  enumerable: true,
  get: function get() {
    return _lighting.default;
  }
});
Object.defineProperty(exports, "dirlight", {
  enumerable: true,
  get: function get() {
    return _dirlight.default;
  }
});
Object.defineProperty(exports, "picking", {
  enumerable: true,
  get: function get() {
    return _picking.default;
  }
});
Object.defineProperty(exports, "diffuse", {
  enumerable: true,
  get: function get() {
    return _diffuse.default;
  }
});

var _assembleShaders = require("./lib/assemble-shaders");

var _resolveModules = require("./lib/resolve-modules");

var _fp = _interopRequireDefault(require("./modules/fp32/fp32"));

var _fp2 = _interopRequireDefault(require("./modules/fp64/fp64"));

var _project = _interopRequireDefault(require("./modules/project/project"));

var _lighting = _interopRequireDefault(require("./modules/lighting/lighting"));

var _dirlight = _interopRequireDefault(require("./modules/dirlight/dirlight"));

var _picking = _interopRequireDefault(require("./modules/picking/picking"));

var _diffuse = _interopRequireDefault(require("./modules/diffuse/diffuse"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=index.js.map