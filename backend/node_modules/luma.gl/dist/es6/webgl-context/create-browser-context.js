export function createBrowserContext({
  canvas,
  opts = {},
  onError = message => null
}) {
  function onContextCreationError(error) {
    onError(`WebGL context: ${error.statusMessage || 'Unknown error'}`);
  }

  canvas.addEventListener('webglcontextcreationerror', onContextCreationError, false);
  const _opts$webgl = opts.webgl1,
        webgl1 = _opts$webgl === void 0 ? true : _opts$webgl,
        _opts$webgl2 = opts.webgl2,
        webgl2 = _opts$webgl2 === void 0 ? true : _opts$webgl2;
  let gl = null;

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
    return onError(`Failed to create ${webgl2 && !webgl1 ? 'WebGL2' : 'WebGL'} context`);
  }

  return gl;
}
//# sourceMappingURL=create-browser-context.js.map