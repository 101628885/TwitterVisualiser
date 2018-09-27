"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _shaderModule = _interopRequireDefault(require("./shader-module"));

var _assert = _interopRequireDefault(require("../utils/assert"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ShaderModuleRegistry = function () {
  function ShaderModuleRegistry() {
    _classCallCheck(this, ShaderModuleRegistry);

    this.shaderModules = {};
    this.defaultShaderModules = [];
  }

  _createClass(ShaderModuleRegistry, [{
    key: "setDefaultShaderModules",
    value: function setDefaultShaderModules(modules) {
      this.defaultShaderModules = this.resolveModules(modules);
    }
  }, {
    key: "registerShaderModules",
    value: function registerShaderModules(shaderModuleList) {
      var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          _ref$ignoreMultipleRe = _ref.ignoreMultipleRegistrations,
          ignoreMultipleRegistrations = _ref$ignoreMultipleRe === void 0 ? false : _ref$ignoreMultipleRe;

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = shaderModuleList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var shaderModule = _step.value;

          this._registerShaderModule(shaderModule, ignoreMultipleRegistrations);
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
  }, {
    key: "getShaderModule",
    value: function getShaderModule(moduleOrName) {
      if (moduleOrName instanceof _shaderModule.default) {
        return moduleOrName;
      }

      if (typeof moduleOrName !== 'string') {
        return this._registerShaderModule(moduleOrName, true);
      }

      var module = this.shaderModules[moduleOrName];

      if (!module) {
        (0, _assert.default)(false, "Unknown shader module ".concat(moduleOrName));
      }

      return module;
    }
  }, {
    key: "resolveModules",
    value: function resolveModules(modules) {
      var _this = this;

      return modules.map(function (moduleOrName) {
        return _this.getShaderModule(moduleOrName);
      });
    }
  }, {
    key: "_registerShaderModule",
    value: function _registerShaderModule(module) {
      var ignoreMultipleRegistrations = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (module instanceof _shaderModule.default) {
        return module;
      }

      (0, _assert.default)(module.name, 'shader module has no name');

      if (!this.shaderModules[module.name] || ignoreMultipleRegistrations) {
        module = new _shaderModule.default(module);
        module.dependencies = this.resolveModules(module.dependencies);
        this.shaderModules[module.name] = module;
      } else {
        throw new Error("shader module ".concat(module.name, " already registered"));
      }

      return this.shaderModules[module.name];
    }
  }]);

  return ShaderModuleRegistry;
}();

exports.default = ShaderModuleRegistry;
//# sourceMappingURL=shader-module-registry.js.map