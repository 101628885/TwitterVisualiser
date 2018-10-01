"use strict";

var _debugParameters = require("./webgl-debug/debug-parameters");

var WebGLDebug = require('webgl-debug');

var global_ = typeof global !== 'undefined' ? global : window;
global_.WebGLDebug = WebGLDebug;
(0, _debugParameters.installParameterDefinitions)();
console.log('luma.gl: WebGL debug support installed');
//# sourceMappingURL=debug.js.map