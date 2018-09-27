import Pass from './pass';
export default class RenderPass extends Pass {
  constructor(gl, props = {}) {
    super(gl, Object.assign({
      id: 'render-pass'
    }, props));
  }

  _renderPass({
    animationProps
  }) {
    const _this$props = this.props,
          _this$props$models = _this$props.models,
          models = _this$props$models === void 0 ? [] : _this$props$models,
          drawParams = _this$props.drawParams;

    for (const model of models) {
      model.draw(Object.assign({}, drawParams, {
        animationProps
      }));
    }
  }

}
//# sourceMappingURL=render-pass.js.map