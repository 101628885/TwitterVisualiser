"use strict";

var _tapeCatch = _interopRequireDefault(require("tape-catch"));

var _resolveModules = require("luma.gl/shadertools/src/lib/resolve-modules");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var getDependencyGraph = _resolveModules.TEST_EXPORTS.getDependencyGraph;
var fp32 = {
  name: 'fp32-test'
};
var fp64 = {
  name: 'fp64-test'
};
var project = {
  name: 'project-test',
  dependencies: [fp32]
};
var project64 = {
  name: 'project64-test',
  dependencies: [project, fp64]
};
(0, _tapeCatch.default)('ShaderModules#import', function (t) {
  t.ok(_resolveModules.resolveModules !== undefined, 'resolveModules import successful');
  t.ok(getDependencyGraph !== undefined, 'getDependencyGraph import successful');
  t.end();
});
(0, _tapeCatch.default)('ShaderModules#getShaderDependencies', function (t) {
  var result = (0, _resolveModules.resolveModules)([project64, project]);
  t.deepEqual(result.map(function (module) {
    return module.name;
  }), [fp32.name, project.name, fp64.name, project64.name], 'Module order is correct');
  t.end();
});
(0, _tapeCatch.default)('ShaderModules#getDependencyGraph', function (t) {
  var _t$deepEqual;

  var moduleDepth = {};
  getDependencyGraph({
    modules: [project64, project],
    level: 0,
    moduleMap: {},
    moduleDepth: moduleDepth
  });
  t.deepEqual(moduleDepth, (_t$deepEqual = {}, _defineProperty(_t$deepEqual, fp32.name, 2), _defineProperty(_t$deepEqual, project.name, 1), _defineProperty(_t$deepEqual, fp64.name, 1), _defineProperty(_t$deepEqual, project64.name, 0), _t$deepEqual), 'Module dependecny is correct');
  t.end();
});
//# sourceMappingURL=resolve-modules.spec.js.map