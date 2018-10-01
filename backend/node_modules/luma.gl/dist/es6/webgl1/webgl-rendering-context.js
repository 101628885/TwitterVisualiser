export const ERR_HEADLESSGL_LOAD = `\
luma.gl: WebGL contexts can not be created in Node.js since headless gl is not installed. \
If this is desired, install headless gl using "npm install gl --save-dev" or "yarn add -D gl"`;
export let headlessTypes = null;

if (module.require) {
  try {
    headlessTypes = module.require('gl/wrap');
  } catch (error) {
    console.info(ERR_HEADLESSGL_LOAD);
  }
}

class DummyType {}

const global_ = typeof global !== 'undefined' ? global : window;

const _ref = headlessTypes || global_,
      _ref$WebGLRenderingCo = _ref.WebGLRenderingContext,
      WebGLRenderingContext = _ref$WebGLRenderingCo === void 0 ? DummyType : _ref$WebGLRenderingCo;

export const webGLTypesAvailable = WebGLRenderingContext !== DummyType;
export { WebGLRenderingContext };
//# sourceMappingURL=webgl-rendering-context.js.map