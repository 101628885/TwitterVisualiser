"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WebGLRenderingContext = exports.webGLTypesAvailable = exports.headlessTypes = exports.ERR_HEADLESSGL_LOAD = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ERR_HEADLESSGL_LOAD = "luma.gl: WebGL contexts can not be created in Node.js since headless gl is not installed. If this is desired, install headless gl using \"npm install gl --save-dev\" or \"yarn add -D gl\"";
exports.ERR_HEADLESSGL_LOAD = ERR_HEADLESSGL_LOAD;
var headlessTypes = null;
exports.headlessTypes = headlessTypes;

if (module.require) {
  try {
    exports.headlessTypes = headlessTypes = module.require('gl/wrap');
  } catch (error) {
    console.info(ERR_HEADLESSGL_LOAD);
  }
}

var DummyType = function DummyType() {
  _classCallCheck(this, DummyType);
};

var global_ = typeof global !== 'undefined' ? global : window;

var _ref = headlessTypes || global_,
    _ref$WebGLRenderingCo = _ref.WebGLRenderingContext,
    WebGLRenderingContext = _ref$WebGLRenderingCo === void 0 ? DummyType : _ref$WebGLRenderingCo;

exports.WebGLRenderingContext = WebGLRenderingContext;
var webGLTypesAvailable = WebGLRenderingContext !== DummyType;
exports.webGLTypesAvailable = webGLTypesAvailable;
//# sourceMappingURL=webgl-rendering-context.js.map