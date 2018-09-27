import assert from '../utils/assert';
export function trackContextCreation(_ref) {
  var _ref$onContextCreate = _ref.onContextCreate,
      onContextCreate = _ref$onContextCreate === void 0 ? function () {
    return null;
  } : _ref$onContextCreate,
      _ref$onContextCreated = _ref.onContextCreated,
      onContextCreated = _ref$onContextCreated === void 0 ? function () {} : _ref$onContextCreated;
  assert(onContextCreate || onContextCreated);

  if (typeof HTMLCanvasElement !== 'undefined') {
    var getContext = HTMLCanvasElement.prototype.getContext;

    HTMLCanvasElement.prototype.getContext = function getContextSpy(type, opts) {
      var context;

      if (type === 'webgl') {
        context = onContextCreate({
          canvas: this,
          type: type,
          opts: opts,
          getContext: getContext.bind(this)
        });
      }

      context = context || getContext.call(this, type, opts);

      if (context instanceof WebGLRenderingContext) {
        onContextCreated({
          canvas: this,
          context: context,
          type: type,
          opts: opts
        });
      }

      return context;
    };
  }
}
//# sourceMappingURL=track-context-creation.js.map