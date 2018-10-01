import assert from '../utils/assert';
var shaderModules = {};
var defaultShaderModules = [];
export function registerShaderModules(shaderModuleList) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$ignoreMultipleRe = _ref.ignoreMultipleRegistrations,
      ignoreMultipleRegistrations = _ref$ignoreMultipleRe === void 0 ? false : _ref$ignoreMultipleRe;

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = shaderModuleList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var shaderModule = _step.value;
      registerShaderModule(shaderModule, {
        ignoreMultipleRegistrations: ignoreMultipleRegistrations
      });
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
export function setDefaultShaderModules(modules) {
  defaultShaderModules = modules;
}
export function getShaderModule(moduleOrName) {
  if (typeof moduleOrName !== 'string') {
    var _shaderModule = moduleOrName;
    assert(typeof _shaderModule.name === 'string');
    registerShaderModule(_shaderModule, {
      ignoreMultipleRegistrations: true
    });
    return _shaderModule;
  }

  var shaderModule = shaderModules[moduleOrName];

  if (!shaderModule) {
    assert(false, "Unknown shader module ".concat(moduleOrName));
  }

  return shaderModule;
}
export function resolveModules(modules) {
  var moduleNames = modules.map(function (module) {
    if (typeof module !== 'string') {
      registerShaderModules([module], {
        ignoreMultipleRegistrations: true
      });
      return module.name;
    }

    return module;
  });
  return getShaderDependencies(moduleNames);
}
export function getShaderDependencies(modules) {
  modules = modules.concat(defaultShaderModules);
  var result = {};
  getDependencyGraph({
    modules: modules,
    level: 0,
    result: result
  });
  return Object.keys(result).sort(function (a, b) {
    return result[b] - result[a];
  });
}
export function getDependencyGraph(_ref2) {
  var modules = _ref2.modules,
      level = _ref2.level,
      result = _ref2.result;

  if (level >= 5) {
    throw new Error('Possible loop in shader dependency graph');
  }

  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = modules[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var moduleOrName = _step2.value;
      var shaderModule = getShaderModule(moduleOrName);

      if (result[shaderModule.name] === undefined || result[shaderModule.name] < level) {
        result[shaderModule.name] = level;
      }
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

  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = modules[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var _moduleOrName = _step3.value;

      var _shaderModule2 = getShaderModule(_moduleOrName);

      if (_shaderModule2.dependencies) {
        getDependencyGraph({
          modules: _shaderModule2.dependencies,
          level: level + 1,
          result: result
        });
      }
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

function parseDeprecationDefinitions() {
  var deprecations = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  deprecations.forEach(function (def) {
    switch (def.type) {
      case 'function':
        def.regex = new RegExp("\\b".concat(def.old, "\\("));
        break;

      default:
        def.regex = new RegExp("".concat(def.type, " ").concat(def.old, ";"));
    }
  });
  return deprecations;
}

function registerShaderModule(shaderModule, _ref3) {
  var _ref3$ignoreMultipleR = _ref3.ignoreMultipleRegistrations,
      ignoreMultipleRegistrations = _ref3$ignoreMultipleR === void 0 ? false : _ref3$ignoreMultipleR;
  assert(shaderModule.name, 'shader module has no name');

  if (!ignoreMultipleRegistrations && shaderModules[shaderModule.name]) {
    throw new Error("shader module ".concat(shaderModule.name, " already registered"));
  }

  shaderModules[shaderModule.name] = shaderModule;
  shaderModule.dependencies = shaderModule.dependencies || [];
  shaderModule.deprecations = parseDeprecationDefinitions(shaderModule.deprecations);
}
//# sourceMappingURL=shader-modules.js.map