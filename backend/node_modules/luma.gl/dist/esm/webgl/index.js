export { Image, WebGLRenderingContext, WebGLProgram, WebGLShader, WebGLBuffer, WebGLFramebuffer, WebGLRenderbuffer, WebGLTexture, WebGLUniformLocation, WebGLActiveInfo, WebGLShaderPrecisionFormat, WebGL2RenderingContext, webGLTypesAvailable } from '../webgl-utils';
export { isWebGL, isWebGL2, createGLContext, destroyGLContext } from '../webgl-context/context';
export { withParameters, resetParameters } from '../webgl-context/context-state';
export { getContextInfo } from '../webgl-context/context-limits';
export { clear } from './clear';
export { parseUniformName, getUniformSetter } from './uniforms';
export { default as Buffer } from './buffer';
export { Shader, VertexShader, FragmentShader } from './shader';
export { default as Program } from './program';
export { default as Framebuffer } from './framebuffer';
export { default as Renderbuffer } from './renderbuffer';
export { default as Texture2D } from './texture-2d';
export { default as TextureCube } from './texture-cube';
export { default as VertexArray } from './vertex-array';
export { default as TransformFeedback } from './transform-feedback';
export { default as Query } from './query';
//# sourceMappingURL=index.js.map