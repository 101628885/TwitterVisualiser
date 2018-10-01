"use strict";

var _luma = require("luma.gl");

var _tapeCatch = _interopRequireDefault(require("tape-catch"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _tapeCatch.default)('shadertools#module imports are defined', function (t) {
  t.ok(_luma.registerShaderModules, 'registerShaderModules is defined');
  t.ok(_luma.setDefaultShaderModules, 'setDefaultShaderModules is defined');
  t.ok(_luma.fp32, 'fp32 is defined');
  t.ok(_luma.fp64, 'fp64 is defined');
  t.ok(_luma.project, 'project is defined');
  t.ok(_luma.dirlight, 'dirlight is defined');
  t.ok(_luma.picking, 'picking is defined');
  t.ok(_luma.diffuse, 'diffuse is defined');
  t.end();
});
//# sourceMappingURL=index.js.map