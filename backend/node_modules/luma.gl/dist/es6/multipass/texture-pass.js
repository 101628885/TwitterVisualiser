import { ClipSpace } from '../models';
import Pass from './pass';
const fs = `\
uniform sampler2D uDiffuseSampler;
uniform float uOpacity;
varying vec2 uv;

void main() {
  vec4 texel = texture2D(uDiffuseSampler, uv);
  gl_FragColor = uOpacity * texel;
}
`;
export default class TexturePass extends Pass {
  constructor(gl, options = {}) {
    super(gl, Object.assign({
      id: 'texture-pass'
    }, options));
    const texture = options.texture,
          _options$opacity = options.opacity,
          opacity = _options$opacity === void 0 ? 1.0 : _options$opacity;
    this.clipspace = new ClipSpace(gl, {
      id: 'texture-pass',
      fs,
      uniforms: {
        uDiffuseSampler: texture,
        uOpacity: opacity
      }
    });
  }

  _renderPass() {
    this.clipspace.draw({
      parameters: {
        depthWrite: false,
        depthTest: false
      }
    });
  }

}
//# sourceMappingURL=texture-pass.js.map