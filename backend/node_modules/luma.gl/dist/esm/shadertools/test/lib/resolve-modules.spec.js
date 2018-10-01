function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import test from 'tape-catch';
import { resolveModules, TEST_EXPORTS } from 'luma.gl/shadertools/src/lib/resolve-modules';
var getDependencyGraph = TEST_EXPORTS.getDependencyGraph;
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
test('ShaderModules#import', function (t) {
  t.ok(resolveModules !== undefined, 'resolveModules import successful');
  t.ok(getDependencyGraph !== undefined, 'getDependencyGraph import successful');
  t.end();
});
test('ShaderModules#getShaderDependencies', function (t) {
  var result = resolveModules([project64, project]);
  t.deepEqual(result.map(function (module) {
    return module.name;
  }), [fp32.name, project.name, fp64.name, project64.name], 'Module order is correct');
  t.end();
});
test('ShaderModules#getDependencyGraph', function (t) {
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