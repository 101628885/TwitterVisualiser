export function createBrowserContext(_ref) {
  var canvas = _ref.canvas,
      _ref$opts = _ref.opts,
      opts = _ref$opts === void 0 ? {} : _ref$opts,
      _ref$onError = _ref.onError,
      onError = _ref$onError === void 0 ? function (message) {
    return null;
  } : _ref$onError;

  function onContextCreationError(error) {
    onError("WebGL context: ".concat(error.statusMessage || 'Unknown error'));
  }

  canvas.addEventListener('webglcontextcreationerror', onContextCreationError, false);
  var _opts$webgl = opts.webgl1,
      webgl1 = _opts$webgl === void 0 ? true : _opts$webgl,
      _opts$webgl2 = opts.webgl2,
      webgl2 = _opts$webgl2 === void 0 ? true : _opts$webgl2;
  var gl = null;

  if (webgl2) {
    gl = gl || canvas.getContext('webgl2', opts);
    gl = gl || canvas.getContext('experimental-webgl2', opts);
  }

  if (webgl1) {
    gl = gl || canvas.getContext('webgl', opts);
    gl = gl || canvas.getContext('experimental-webgl', opts);
  }

  canvas.removeEventListener('webglcontextcreationerror', onContextCreationError, false);

  if (!gl) {
    return onError("Failed to create ".concat(webgl2 && !webgl1 ? 'WebGL2' : 'WebGL', " context"));
  }

  return gl;
}
//# sourceMappingURL=create-browser-context.js.map