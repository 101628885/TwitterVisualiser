"use strict";

var _injectShader = _interopRequireDefault(require("luma.gl/shadertools/src/lib/inject-shader"));

var _luma = require("luma.gl");

var _tapeCatch = _interopRequireDefault(require("tape-catch"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fixture = {
  gl: (0, _luma.createGLContext)()
};
var VS_GLSL_TEMPLATE = "#version 300 es\n\nin vec4 positions;\nout vec4 vColor;\n\nvoid f(out float a, in float b) {}\n\nvoid main(void) {\n  gl_Position = positions;\n  vColor = vec4(1., 0., 0., 1.);\n}\n";
var VS_GLSL_RESOLVED = "#version 300 es\nuniform float uNewUniform;\n\nin vec4 positions;\nout vec4 vColor;\n\nvoid f(out float a, in float b) {}\n\nvoid main(void) {\n  gl_Position = positions;\n  vColor = vec4(1., 0., 0., 1.);\n}\n";
var FS_GLSL_TEMPLATE = "#version 300 es\n\nprecision highp float;\n\nout vec4 fragmentColor;\nin vec4 vColor;\n\nvoid f(out float a, in float b) {}\n\nvoid main(void) {\n  fragmentColor = vColor;\n}\n";
var FS_GLSL_RESOLVED = "#version 300 es\nuniform bool uDiscard;\n\nprecision highp float;\n\nout vec4 fragmentColor;\nin vec4 vColor;\n\nvoid f(out float a, in float b) {}\n\nvoid main(void) {\n  if (uDiscard} { discard } else {\n  fragmentColor = vColor;\n  }\n}\n";
var INJECT = {
  'vs:#decl': 'uniform float uNewUniform;\n',
  'fs:#decl': 'uniform bool uDiscard;\n',
  'fs:#main-start': '  if (uDiscard} { discard } else {\n',
  'fs:#main-end': '  }\n'
};
(0, _tapeCatch.default)('injectShader#import', function (t) {
  t.ok(_injectShader.default !== undefined, 'injectShader import successful');
  t.end();
});
(0, _tapeCatch.default)('injectShader#injectShader', function (t) {
  var injectResult;
  injectResult = (0, _injectShader.default)(VS_GLSL_TEMPLATE, 'vs', INJECT);
  t.equal(injectResult, VS_GLSL_RESOLVED, 'correctly injected');
  injectResult = (0, _injectShader.default)(FS_GLSL_TEMPLATE, 'fs', INJECT);
  t.equal(injectResult, FS_GLSL_RESOLVED, 'correctly injected');
  t.end();
});
(0, _tapeCatch.default)('injectShader#assembleShaders', function (t) {
  var assembleResult = (0, _luma.assembleShaders)(fixture.gl, {
    vs: VS_GLSL_TEMPLATE,
    fs: FS_GLSL_TEMPLATE,
    inject: INJECT,
    prologue: false
  });
  t.equal(assembleResult.vs, VS_GLSL_RESOLVED, 'correctly injected');
  t.equal(assembleResult.fs, FS_GLSL_RESOLVED, 'correctly injected');
  t.end();
});
//# sourceMappingURL=inject-shader.spec.js.map