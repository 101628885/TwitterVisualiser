const GL_FRAGMENT_SHADER = 0x8B30;
const GL_VERTEX_SHADER = 0x8B31;
export default function getShaderName(shader, defaultName = 'unnamed') {
  const SHADER_NAME_REGEXP = /#define[\s*]SHADER_NAME[\s*]([A-Za-z0-9_-]+)[\s*]/;
  const match = shader.match(SHADER_NAME_REGEXP);
  return match ? match[1] : defaultName;
}
export function getShaderTypeName(type) {
  switch (type) {
    case GL_FRAGMENT_SHADER:
      return 'fragment';

    case GL_VERTEX_SHADER:
      return 'vertex';

    default:
      return 'unknown type';
  }
}
//# sourceMappingURL=get-shader-name.js.map