import Pass from './pass';
export default class ClearPass extends Pass {
  constructor(gl, props = {}) {
    super(gl, Object.assign({
      id: 'clear-pass'
    }, props));
  }

  _renderPass({
    gl
  }) {
    const _this$props$clearBits = this.props.clearBits,
          clearBits = _this$props$clearBits === void 0 ? 16384 | 256 : _this$props$clearBits;
    gl.clear(clearBits);
  }

}
//# sourceMappingURL=clear-pass.js.map