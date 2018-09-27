"use strict";

var _luma = require("luma.gl");

var _tapeCatch = _interopRequireDefault(require("tape-catch"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var fixture = {
  gl: (0, _luma.createGLContext)()
};
var VS_GLSL_300 = "#version 300 es\n\nin vec4 positions;\n\nvoid main(void) {\n  gl_Position = positions;\n}\n";
var FS_GLSL_300 = "#version 300 es\n\nprecision highp float;\n\nout vec4 fragmentColor;\n\nvoid main(void) {\n  fragmentColor = vec4(1.0, 1.0, 1.0, 1.0);\n}\n";
(0, _tapeCatch.default)('assembleShaders#import', function (t) {
  t.ok(_luma.assembleShaders !== undefined, 'assembleShaders import successful');
  t.end();
});
(0, _tapeCatch.default)('assembleShaders#version_directive', function (t) {
  var assembleResult = (0, _luma.assembleShaders)(fixture.gl, {
    vs: VS_GLSL_300,
    fs: FS_GLSL_300,
    modules: [_luma.picking]
  });
  t.equal(assembleResult.vs.indexOf('#version 300 es'), 0, 'version directive should be first statement');
  t.equal(assembleResult.fs.indexOf('#version 300 es'), 0, 'version directive should be first statement');
  t.end();
});
(0, _tapeCatch.default)('assembleShaders#getUniforms', function (t) {
  var testModuleSettings = {
    pickingActive: true
  };
  var assembleResult;
  assembleResult = (0, _luma.assembleShaders)(fixture.gl, {
    vs: VS_GLSL_300,
    fs: FS_GLSL_300
  });
  t.is(_typeof(assembleResult.getUniforms), 'function', 'getUniforms should be function');
  var testModule = {
    name: 'test-module',
    vs: '',
    fs: '',
    getUniforms: function getUniforms(opts, context) {
      t.ok(context.picking_uActive, 'module getUniforms is called with correct context');
      return {};
    },
    dependencies: ['picking']
  };
  assembleResult = (0, _luma.assembleShaders)(fixture.gl, {
    vs: VS_GLSL_300,
    fs: FS_GLSL_300,
    modules: [_luma.picking, testModule, _luma.fp64]
  });
  t.is(_typeof(assembleResult.getUniforms), 'function', 'getUniforms should be function');
  assembleResult.getUniforms(testModuleSettings);
  t.end();
});
//# sourceMappingURL=assemble-shaders.spec.js.map