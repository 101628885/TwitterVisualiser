import Pass from './pass';
export default class CompositePass extends Pass {
  constructor(gl, props) {
    props = Array.isArray(props) ? {
      passes: props
    } : props;
    super(gl, Object.assign({
      id: 'composite-pass'
    }, props));
  }

  render(...args) {
    const _this$props$passes = this.props.passes,
          passes = _this$props$passes === void 0 ? [] : _this$props$passes;

    for (const pass of passes) {
      pass.render(...args);
    }
  }

}
//# sourceMappingURL=composite-pass.js.map