import { global } from '../utils/globals';
import isBrowser from '../utils/is-browser';
export const ERR_HEADLESSGL_LOAD = `\
luma.gl: loaded under Node.js without headless gl installed, meaning that WebGL \
contexts can not be created. This may not be an error. For example, this is a \
typical configuration for isorender applications running on the server.`;
export let headlessTypes = null;
export let headlessGL = () => {
  throw new Error(ERR_HEADLESSGL_LOAD);
};

if (!isBrowser) {
  try {
    headlessGL = module.require('gl');
    headlessTypes = module.require('gl/wrap');
  } catch (error) {
    console.info(ERR_HEADLESSGL_LOAD);
  }
}

class DummyType {}

const _ref = headlessTypes || global,
      _ref$WebGLRenderingCo = _ref.WebGLRenderingContext,
      WebGLRenderingContext = _ref$WebGLRenderingCo === void 0 ? DummyType : _ref$WebGLRenderingCo,
      _ref$WebGLProgram = _ref.WebGLProgram,
      WebGLProgram = _ref$WebGLProgram === void 0 ? DummyType : _ref$WebGLProgram,
      _ref$WebGLShader = _ref.WebGLShader,
      WebGLShader = _ref$WebGLShader === void 0 ? DummyType : _ref$WebGLShader,
      _ref$WebGLBuffer = _ref.WebGLBuffer,
      WebGLBuffer = _ref$WebGLBuffer === void 0 ? DummyType : _ref$WebGLBuffer,
      _ref$WebGLFramebuffer = _ref.WebGLFramebuffer,
      WebGLFramebuffer = _ref$WebGLFramebuffer === void 0 ? DummyType : _ref$WebGLFramebuffer,
      _ref$WebGLRenderbuffe = _ref.WebGLRenderbuffer,
      WebGLRenderbuffer = _ref$WebGLRenderbuffe === void 0 ? DummyType : _ref$WebGLRenderbuffe,
      _ref$WebGLTexture = _ref.WebGLTexture,
      WebGLTexture = _ref$WebGLTexture === void 0 ? DummyType : _ref$WebGLTexture,
      _ref$WebGLUniformLoca = _ref.WebGLUniformLocation,
      WebGLUniformLocation = _ref$WebGLUniformLoca === void 0 ? DummyType : _ref$WebGLUniformLoca,
      _ref$WebGLActiveInfo = _ref.WebGLActiveInfo,
      WebGLActiveInfo = _ref$WebGLActiveInfo === void 0 ? DummyType : _ref$WebGLActiveInfo,
      _ref$WebGLShaderPreci = _ref.WebGLShaderPrecisionFormat,
      WebGLShaderPrecisionFormat = _ref$WebGLShaderPreci === void 0 ? DummyType : _ref$WebGLShaderPreci;

export const webGLTypesAvailable = WebGLRenderingContext !== DummyType && WebGLProgram !== DummyType && WebGLShader !== DummyType && WebGLBuffer !== DummyType && WebGLFramebuffer !== DummyType && WebGLRenderbuffer !== DummyType && WebGLTexture !== DummyType && WebGLUniformLocation !== DummyType && WebGLActiveInfo !== DummyType && WebGLShaderPrecisionFormat !== DummyType;

function getWebGL2RenderingContext() {
  class WebGL2RenderingContextNotSupported {}

  return global.WebGL2RenderingContext || WebGL2RenderingContextNotSupported;
}

function getImage() {
  class ImageNotSupported {}

  return global.Image || ImageNotSupported;
}

const WebGL2RenderingContext = getWebGL2RenderingContext();
const Image = getImage();
export { Image, WebGLRenderingContext, WebGLProgram, WebGLShader, WebGLBuffer, WebGLFramebuffer, WebGLRenderbuffer, WebGLTexture, WebGLUniformLocation, WebGLActiveInfo, WebGLShaderPrecisionFormat, WebGL2RenderingContext };
//# sourceMappingURL=webgl-types.js.map