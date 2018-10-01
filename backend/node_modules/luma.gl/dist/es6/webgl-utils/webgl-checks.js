import { WebGLRenderingContext, WebGL2RenderingContext } from './webgl-types';
import assert from '../utils/assert';
const GL_ARRAY_BUFFER = 0x8892;
const GL_TEXTURE_BINDING_3D = 0x806A;
export const ERR_CONTEXT = 'Invalid WebGLRenderingContext';
export const ERR_WEBGL = ERR_CONTEXT;
export const ERR_WEBGL2 = 'Requires WebGL2';
export function isWebGL(glAlias) {
  return Boolean(glAlias && (glAlias instanceof WebGLRenderingContext || glAlias.ARRAY_BUFFER === GL_ARRAY_BUFFER));
}
export function isWebGL2(glAlias) {
  return Boolean(glAlias && (glAlias instanceof WebGL2RenderingContext || glAlias.TEXTURE_BINDING_3D === GL_TEXTURE_BINDING_3D));
}
export function assertWebGLContext(gl) {
  assert(isWebGL(gl), ERR_CONTEXT);
}
export function assertWebGL2Context(gl) {
  assert(isWebGL2(gl), ERR_WEBGL2);
}
//# sourceMappingURL=webgl-checks.js.map