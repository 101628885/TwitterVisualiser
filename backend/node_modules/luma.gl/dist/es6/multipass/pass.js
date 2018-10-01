import { Framebuffer } from '../webgl';
import { withParameters } from '../webgl-context';
export default class Pass {
  constructor(gl, props) {
    const _props$id = props.id,
          id = _props$id === void 0 ? 'pass' : _props$id;
    this.id = id;
    this.gl = gl;
    this.props = {
      enabled: true,
      screen: false,
      swap: false
    };
    Object.assign(this.props, props);
  }

  setProps(props) {
    Object.assign(this.props, props);
  }

  render(renderState, animationProps) {
    if (!this.props.enabled) {
      return;
    }

    const gl = this.gl;
    const renderParams = {
      gl,
      outputBuffer: renderState.writeBuffer,
      inputBuffer: renderState.readBuffer,
      animationProps,
      swapBuffers: () => renderState._swapFramebuffers()
    };

    if (this.props.screen) {
      renderParams.inputBuffer = renderParams.outputBuffer;
      renderParams.outputBuffer = Framebuffer.getDefaultFramebuffer(gl);
    } else if (this.props.swap) {
      renderParams.inputBuffer = renderState.writeBuffer;
      renderParams.outputBuffer = renderState.readBuffer;
    }

    withParameters(gl, {
      framebuffer: renderParams.outputBuffer
    }, () => this._renderPass(renderParams));
    renderParams.outputBuffer.log(3, this.id);

    if (this.props.swap) {
      renderState._swapFramebuffers();
    }
  }

  _renderPass({
    gl,
    inputBuffer,
    outputBuffer,
    animationProps
  }) {}

}
//# sourceMappingURL=pass.js.map