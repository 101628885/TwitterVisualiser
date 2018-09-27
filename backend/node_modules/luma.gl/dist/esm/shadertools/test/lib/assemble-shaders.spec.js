function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

import { createGLContext, assembleShaders, picking, fp64 } from 'luma.gl';
import test from 'tape-catch';
var fixture = {
  gl: createGLContext()
};
var VS_GLSL_300 = "#version 300 es\n\nin vec4 positions;\n\nvoid main(void) {\n  gl_Position = positions;\n}\n";
var FS_GLSL_300 = "#version 300 es\n\nprecision highp float;\n\nout vec4 fragmentColor;\n\nvoid main(void) {\n  fragmentColor = vec4(1.0, 1.0, 1.0, 1.0);\n}\n";
test('assembleShaders#import', function (t) {
  t.ok(assembleShaders !== undefined, 'assembleShaders import successful');
  t.end();
});
test('assembleShaders#version_directive', function (t) {
  var assembleResult = assembleShaders(fixture.gl, {
    vs: VS_GLSL_300,
    fs: FS_GLSL_300,
    modules: [picking]
  });
  t.equal(assembleResult.vs.indexOf('#version 300 es'), 0, 'version directive should be first statement');
  t.equal(assembleResult.fs.indexOf('#version 300 es'), 0, 'version directive should be first statement');
  t.end();
});
test('assembleShaders#getUniforms', function (t) {
  var testModuleSettings = {
    pickingActive: true
  };
  var assembleResult;
  assembleResult = assembleShaders(fixture.gl, {
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
  assembleResult = assembleShaders(fixture.gl, {
    vs: VS_GLSL_300,
    fs: FS_GLSL_300,
    modules: [picking, testModule, fp64]
  });
  t.is(_typeof(assembleResult.getUniforms), 'function', 'getUniforms should be function');
  assembleResult.getUniforms(testModuleSettings);
  t.end();
});
//# sourceMappingURL=assemble-shaders.spec.js.map