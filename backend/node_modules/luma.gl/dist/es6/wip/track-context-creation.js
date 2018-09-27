import assert from '../utils/assert';
export function trackContextCreation({
  onContextCreate = () => null,
  onContextCreated = () => {}
}) {
  assert(onContextCreate || onContextCreated);

  if (typeof HTMLCanvasElement !== 'undefined') {
    const getContext = HTMLCanvasElement.prototype.getContext;

    HTMLCanvasElement.prototype.getContext = function getContextSpy(type, opts) {
      let context;

      if (type === 'webgl') {
        context = onContextCreate({
          canvas: this,
          type,
          opts,
          getContext: getContext.bind(this)
        });
      }

      context = context || getContext.call(this, type, opts);

      if (context instanceof WebGLRenderingContext) {
        onContextCreated({
          canvas: this,
          context,
          type,
          opts
        });
      }

      return context;
    };
  }
}
//# sourceMappingURL=track-context-creation.js.map