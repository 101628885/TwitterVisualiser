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
export default class CopyPass extends Pass {
  constructor(gl, props = {}) {
    super(gl, Object.assign({
      id: 'copy-pass',
      swap: true
    }, props));
    this.clipspace = new ClipSpace(gl, {
      id: 'copy-pass',
      fs
    });
  }

  _renderPass({
    inputBuffer
  }) {
    const _this$props$opacity = this.props.opacity,
          opacity = _this$props$opacity === void 0 ? 1.0 : _this$props$opacity;
    this.clipspace.draw({
      uniforms: {
        uDiffuseSampler: inputBuffer,
        uOpacity: opacity
      },
      parameters: {
        depthWrite: false,
        depthTest: false
      }
    });
  }

}
//# sourceMappingURL=copy-pass.js.map