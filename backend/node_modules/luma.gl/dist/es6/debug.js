const WebGLDebug = require('webgl-debug');

const global_ = typeof global !== 'undefined' ? global : window;
global_.WebGLDebug = WebGLDebug;
import { installParameterDefinitions } from './webgl-debug/debug-parameters';
installParameterDefinitions();
console.log('luma.gl: WebGL debug support installed');
//# sourceMappingURL=debug.js.map