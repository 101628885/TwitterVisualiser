import CompositePass from './composite-pass';
import RenderState from './render-state';
export default class MultiPassRenderer extends CompositePass {
  constructor(gl, props) {
    props = Array.isArray(props) ? {
      passes: props
    } : props;
    super(gl, Object.assign({
      id: 'multi-pass'
    }, props));
    this.renderState = new RenderState(gl, props);
  }

  render(animationProps) {
    this.renderState.reset();
    const _this$props$passes = this.props.passes,
          passes = _this$props$passes === void 0 ? [] : _this$props$passes;

    for (const pass of passes) {
      pass.render(this.renderState, animationProps);
    }
  }

}
//# sourceMappingURL=multi-pass-renderer.js.map