function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import { global } from '../utils/globals';
import { log } from '../utils';

function getContextData(gl) {
  gl.luma = gl.luma || {};
  return gl.luma;
}

export function enableDebug(debug) {
  log.debug = debug;
}
export function makeDebugContext(gl) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$debug = _ref.debug,
      debug = _ref$debug === void 0 ? true : _ref$debug;

  if (gl === null) {
    return null;
  }

  return debug ? getDebugContext(gl) : getRealContext(gl);
}
export function getRealContext(gl) {
  if (gl === null) {
    return null;
  }

  var data = getContextData(gl);
  return data.realContext ? data.realContext : gl;
}
export function getDebugContext(gl) {
  if (gl === null) {
    return null;
  }

  if (!global.WebGLDebug) {
    log.warn('WebGL debug mode not activated. import "luma.gl/debug" to enable.')();
    return gl;
  }

  var data = getContextData(gl);

  if (data.realContext) {
    return gl;
  }

  if (data.debugContext) {
    return data.debugContext;
  }

  var WebGLDebugContext = function WebGLDebugContext() {
    _classCallCheck(this, WebGLDebugContext);
  };

  var debugContext = global.WebGLDebug.makeDebugContext(gl, onGLError, onValidateGLFunc);
  Object.assign(WebGLDebugContext.prototype, debugContext);
  data.debugContext = debugContext;
  debugContext.debug = true;
  debugContext.gl = gl;
  log.info('debug context actived.');
  return debugContext;
}

function getFunctionString(functionName, functionArgs) {
  var args = global.WebGLDebug.glFunctionArgsToString(functionName, functionArgs);
  args = "".concat(args.slice(0, 100)).concat(args.length > 100 ? '...' : '');
  return "gl.".concat(functionName, "(").concat(args, ")");
}

function onGLError(err, functionName, args) {
  var errorMessage = global.WebGLDebug.glEnumToString(err);
  var functionArgs = global.WebGLDebug.glFunctionArgsToString(functionName, args);
  var message = "".concat(errorMessage, " in gl.").concat(functionName, "(").concat(functionArgs, ")");

  if (log.throw) {
    throw new Error(message);
  } else {
    log.error(message)();
    debugger;
  }
}

function onValidateGLFunc(functionName, functionArgs) {
  var functionString;

  if (log.priority >= 4) {
    functionString = getFunctionString(functionName, functionArgs);
    log.log(4, functionString)();
  }

  if (log.break) {
    functionString = functionString || getFunctionString(functionName, functionArgs);
    var isBreakpoint = log.break && log.break.every(function (breakOn) {
      return functionString.indexOf(breakOn) !== -1;
    });

    if (isBreakpoint) {
      debugger;
    }
  }

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = functionArgs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var arg = _step.value;

      if (arg === undefined) {
        functionString = functionString || getFunctionString(functionName, functionArgs);

        if (log.throw) {
          throw new Error("Undefined argument: ".concat(functionString));
        } else {
          log.error("Undefined argument: ".concat(functionString));
          debugger;
        }
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
}
//# sourceMappingURL=debug-context.js.map