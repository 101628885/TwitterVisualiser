"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.assembleShaders = assembleShaders;

var _constants = require("./constants");

var _resolveModules = require("./resolve-modules");

var _platformDefines = require("./platform-defines");

var _injectShader = _interopRequireDefault(require("./inject-shader"));

var _assert = _interopRequireDefault(require("../utils/assert"));

var _SHADER_TYPE;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var SHADER_TYPE = (_SHADER_TYPE = {}, _defineProperty(_SHADER_TYPE, _constants.VERTEX_SHADER, 'vertex'), _defineProperty(_SHADER_TYPE, _constants.FRAGMENT_SHADER, 'fragment'), _SHADER_TYPE);
var FRAGMENT_SHADER_PROLOGUE = "precision highp float;\n\n";

function assembleShaders(gl) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var vs = opts.vs,
      fs = opts.fs;
  var modules = (0, _resolveModules.resolveModules)(opts.modules || []);
  return {
    gl: gl,
    vs: assembleShader(gl, Object.assign({}, opts, {
      source: vs,
      type: _constants.VERTEX_SHADER,
      modules: modules
    })),
    fs: assembleShader(gl, Object.assign({}, opts, {
      source: fs,
      type: _constants.FRAGMENT_SHADER,
      modules: modules
    })),
    getUniforms: assembleGetUniforms(modules),
    modules: assembleModuleMap(modules)
  };
}

function assembleShader(gl, _ref) {
  var id = _ref.id,
      source = _ref.source,
      type = _ref.type,
      _ref$modules = _ref.modules,
      modules = _ref$modules === void 0 ? [] : _ref$modules,
      _ref$defines = _ref.defines,
      defines = _ref$defines === void 0 ? {} : _ref$defines,
      _ref$inject = _ref.inject,
      inject = _ref$inject === void 0 ? {} : _ref$inject,
      _ref$prologue = _ref.prologue,
      prologue = _ref$prologue === void 0 ? true : _ref$prologue,
      log = _ref.log;
  (0, _assert.default)(typeof source === 'string', 'shader source must be a string');
  var isVertex = type === _constants.VERTEX_SHADER;
  var sourceLines = source.split('\n');
  var glslVersion = 100;
  var versionLine = '';
  var coreSource = source;

  if (sourceLines[0].indexOf('#version ') === 0) {
    glslVersion = 300;
    versionLine = sourceLines[0];
    coreSource = sourceLines.slice(1).join('\n');
  }

  var assembledSource = prologue ? "".concat(versionLine, "\n").concat(getShaderName({
    id: id,
    source: source,
    type: type
  }), "\n").concat((0, _platformDefines.getPlatformShaderDefines)(gl), "\n").concat((0, _platformDefines.getVersionDefines)(gl, glslVersion, !isVertex), "\n").concat(getApplicationDefines(defines), "\n").concat(isVertex ? '' : FRAGMENT_SHADER_PROLOGUE, "\n") : "".concat(versionLine, "\n");
  var injectStandardStubs = false;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = modules[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var module = _step.value;

      switch (module.name) {
        case 'inject':
          injectStandardStubs = true;
          break;

        default:
          module.checkDeprecations(coreSource, log);
          var moduleSource = module.getModuleSource(type, glslVersion);
          assembledSource += moduleSource;
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

  assembledSource += coreSource;
  assembledSource = (0, _injectShader.default)(assembledSource, type, inject, injectStandardStubs);
  return assembledSource;
}

function assembleGetUniforms(modules) {
  return function getUniforms(opts) {
    var uniforms = {};
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = modules[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var module = _step2.value;
        var moduleUniforms = module.getUniforms(opts, uniforms);
        Object.assign(uniforms, moduleUniforms);
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }

    return uniforms;
  };
}

function assembleModuleMap(modules) {
  var result = {};
  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = modules[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var moduleName = _step3.value;
      var shaderModule = (0, _resolveModules.getShaderModule)(moduleName);
      result[moduleName] = shaderModule;
    }
  } catch (err) {
    _didIteratorError3 = true;
    _iteratorError3 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
        _iterator3.return();
      }
    } finally {
      if (_didIteratorError3) {
        throw _iteratorError3;
      }
    }
  }

  return result;
}

function getShaderName(_ref2) {
  var id = _ref2.id,
      source = _ref2.source,
      type = _ref2.type;
  var injectShaderName = id && typeof id === 'string' && source.indexOf('SHADER_NAME') === -1;
  return injectShaderName ? "\n#define SHADER_NAME ".concat(id, "_").concat(SHADER_TYPE[type], "\n\n") : '';
}

function getApplicationDefines() {
  var defines = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var count = 0;
  var sourceText = '';

  for (var define in defines) {
    if (count === 0) {
      sourceText += '\n// APPLICATION DEFINES\n';
    }

    count++;
    var value = defines[define];

    if (value || Number.isFinite(value)) {
      sourceText += "#define ".concat(define.toUpperCase(), " ").concat(defines[define], "\n");
    }
  }

  if (count === 0) {
    sourceText += '\n';
  }

  return sourceText;
}
//# sourceMappingURL=assemble-shaders.js.map