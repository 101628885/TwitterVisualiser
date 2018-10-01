function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

import luma from '../init';
import { assertWebGLContext, isWebGL2, getKey, getKeyValue } from '../webgl-utils';
import { uid } from '../utils';
import { stubRemovedMethods as _stubRemovedMethods } from '../utils';
import assert from '../utils/assert';
var ERR_RESOURCE_METHOD_UNDEFINED = 'Resource subclass must define virtual methods';

var Resource = function () {
  function Resource(gl) {
    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Resource);

    assertWebGLContext(gl);
    var id = opts.id,
        _opts$userData = opts.userData,
        userData = _opts$userData === void 0 ? {} : _opts$userData;
    this.gl = gl;
    this.id = id || uid(this.constructor.name);
    this.userData = userData;
    this._bound = false;
    this._handle = opts.handle;

    if (this._handle === undefined) {
      this._handle = this._createHandle();
    }

    this._addStats();
  }

  _createClass(Resource, [{
    key: "toString",
    value: function toString() {
      return "".concat(this.constructor.name, "(").concat(this.id, ")");
    }
  }, {
    key: "delete",
    value: function _delete() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref$deleteChildren = _ref.deleteChildren,
          deleteChildren = _ref$deleteChildren === void 0 ? false : _ref$deleteChildren;

      var children = this._handle && this._deleteHandle(this._handle);

      this._handle = null;

      this._removeStats();

      if (children && deleteChildren) {
        children.filter(Boolean).forEach(function (child) {
          child.delete();
        });
      }

      return this;
    }
  }, {
    key: "bind",
    value: function bind() {
      var funcOrHandle = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.handle;

      if (typeof funcOrHandle !== 'function') {
        this._bindHandle(funcOrHandle);

        return this;
      }

      var value;

      if (!this._bound) {
        this._bindHandle(this.handle);

        this._bound = true;
        value = funcOrHandle();
        this._bound = false;

        this._bindHandle(null);
      } else {
        value = funcOrHandle();
      }

      return value;
    }
  }, {
    key: "unbind",
    value: function unbind() {
      this.bind(null);
    }
  }, {
    key: "getParameter",
    value: function getParameter(pname) {
      var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      pname = getKeyValue(this.gl, pname);
      assert(pname);
      var parameters = this.constructor.PARAMETERS || {};
      var parameter = parameters[pname];

      if (parameter) {
        var isWebgl2 = isWebGL2(this.gl);
        var parameterAvailable = (!('webgl2' in parameter) || isWebgl2) && (!('extension' in parameter) || this.gl.getExtension(parameter.extension));

        if (!parameterAvailable) {
          var webgl1Default = parameter.webgl1;
          var webgl2Default = 'webgl2' in parameter ? parameter.webgl2 : parameter.webgl1;
          var defaultValue = isWebgl2 ? webgl2Default : webgl1Default;
          return defaultValue;
        }
      }

      return this._getParameter(pname, opts);
    }
  }, {
    key: "getParameters",
    value: function getParameters() {
      var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var _ref2 = {},
          parameters = _ref2.parameters,
          keys = _ref2.keys;
      var PARAMETERS = this.constructor.PARAMETERS || {};
      var isWebgl2 = isWebGL2(this.gl);
      var values = {};
      var parameterKeys = parameters || Object.keys(PARAMETERS);
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = parameterKeys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var pname = _step.value;
          var parameter = PARAMETERS[pname];
          var parameterAvailable = parameter && (!('webgl2' in parameter) || isWebgl2) && (!('extension' in parameter) || this.gl.getExtension(parameter.extension));

          if (parameterAvailable) {
            var key = keys ? getKey(this.gl, pname) : pname;
            values[key] = this.getParameter(pname, opts);

            if (keys && parameter.type === 'GLenum') {
              values[key] = getKey(this.gl, values[key]);
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

      return values;
    }
  }, {
    key: "setParameter",
    value: function setParameter(pname, value) {
      pname = getKeyValue(this.gl, pname);
      assert(pname);
      var parameters = this.constructor.PARAMETERS || {};
      var parameter = parameters[pname];

      if (parameter) {
        var isWebgl2 = isWebGL2(this.gl);
        var parameterAvailable = (!('webgl2' in parameter) || isWebgl2) && (!('extension' in parameter) || this.gl.getExtension(parameter.extension));

        if (!parameterAvailable) {
          throw new Error('Parameter not available on this platform');
        }

        if (parameter.type === 'GLenum') {
          value = getKeyValue(value);
        }
      }

      this._setParameter(pname, value);

      return this;
    }
  }, {
    key: "setParameters",
    value: function setParameters(parameters) {
      for (var pname in parameters) {
        this.setParameter(pname, parameters[pname]);
      }

      return this;
    }
  }, {
    key: "stubRemovedMethods",
    value: function stubRemovedMethods(className, version, methodNames) {
      return _stubRemovedMethods(this, className, version, methodNames);
    }
  }, {
    key: "initialize",
    value: function initialize(opts) {}
  }, {
    key: "_createHandle",
    value: function _createHandle() {
      throw new Error(ERR_RESOURCE_METHOD_UNDEFINED);
    }
  }, {
    key: "_deleteHandle",
    value: function _deleteHandle() {
      throw new Error(ERR_RESOURCE_METHOD_UNDEFINED);
    }
  }, {
    key: "_bindHandle",
    value: function _bindHandle() {
      throw new Error(ERR_RESOURCE_METHOD_UNDEFINED);
    }
  }, {
    key: "_getOptsFromHandle",
    value: function _getOptsFromHandle() {
      throw new Error(ERR_RESOURCE_METHOD_UNDEFINED);
    }
  }, {
    key: "_getParameter",
    value: function _getParameter(pname, opts) {
      throw new Error(ERR_RESOURCE_METHOD_UNDEFINED);
    }
  }, {
    key: "_setParameter",
    value: function _setParameter(pname, value) {
      throw new Error(ERR_RESOURCE_METHOD_UNDEFINED);
    }
  }, {
    key: "_context",
    value: function _context() {
      this.gl.luma = this.gl.luma || {};
      return this.gl.luma;
    }
  }, {
    key: "_addStats",
    value: function _addStats() {
      var name = this.constructor.name;
      var stats = luma.stats;
      stats.resourceCount = stats.resourceCount || 0;
      stats.resourceMap = stats.resourceMap || {};
      stats.resourceCount++;
      stats.resourceMap[name] = stats.resourceMap[name] || {
        created: 0,
        active: 0
      };
      stats.resourceMap[name].created++;
      stats.resourceMap[name].active++;
    }
  }, {
    key: "_removeStats",
    value: function _removeStats() {
      var name = this.constructor.name;
      var stats = luma.stats;
      stats.resourceMap[name].active--;
    }
  }, {
    key: "handle",
    get: function get() {
      return this._handle;
    }
  }]);

  return Resource;
}();

export { Resource as default };
//# sourceMappingURL=resource.js.map