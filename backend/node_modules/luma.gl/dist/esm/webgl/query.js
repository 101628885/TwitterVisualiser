function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

import Resource from './resource';
import { FEATURES, hasFeatures } from '../webgl-context/context-features';
import { isWebGL2 } from '../webgl-utils';
import queryManager from '../webgl-utils/query-manager';
import assert from '../utils/assert';

var noop = function noop(x) {
  return x;
};

var ERR_GPU_DISJOINT = 'Disjoint GPU operation invalidated timer queries';
var ERR_TIMER_QUERY_NOT_SUPPORTED = 'Timer queries require "EXT_disjoint_timer_query" extension';
var GL_QUERY_COUNTER_BITS_EXT = 0x8864;
var GL_QUERY_RESULT = 0x8866;
var GL_QUERY_RESULT_AVAILABLE = 0x8867;
var GL_TIME_ELAPSED_EXT = 0x88BF;
var GL_TIMESTAMP_EXT = 0x8E28;
var GL_GPU_DISJOINT_EXT = 0x8FBB;
var GL_TRANSFORM_FEEDBACK_PRIMITIVES_WRITTEN = 0x8C88;
var GL_ANY_SAMPLES_PASSED = 0x8C2F;
var GL_ANY_SAMPLES_PASSED_CONSERVATIVE = 0x8D6A;

var Query = function (_Resource) {
  _inherits(Query, _Resource);

  _createClass(Query, null, [{
    key: "isSupported",
    value: function isSupported(gl) {
      var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var webgl2 = isWebGL2(gl);
      var hasTimerQuery = hasFeatures(gl, FEATURES.TIMER_QUERY);
      var supported = webgl2 || hasTimerQuery;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = opts[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var key = _step.value;

          switch (key) {
            case 'queries':
              supported = supported && webgl2;
              break;

            case 'timers':
              supported = supported && hasTimerQuery;
              break;

            case 'timestamps':
              var queryCounterBits = hasTimerQuery ? gl.getQuery(GL_TIMESTAMP_EXT, GL_QUERY_COUNTER_BITS_EXT) : 0;
              supported = supported && queryCounterBits > 0;
              break;

            default:
              assert(false);
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

      return supported;
    }
  }]);

  function Query(gl) {
    var _this;

    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Query);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Query).call(this, gl, opts));
    var _opts$onComplete = opts.onComplete,
        onComplete = _opts$onComplete === void 0 ? noop : _opts$onComplete,
        _opts$onError = opts.onError,
        onError = _opts$onError === void 0 ? noop : _opts$onError;
    _this.target = null;
    _this.onComplete = onComplete;
    _this.onError = onError;
    _this.promise = null;
    Object.seal(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(Query, [{
    key: "beginTimeElapsedQuery",
    value: function beginTimeElapsedQuery() {
      return this.begin(GL_TIME_ELAPSED_EXT);
    }
  }, {
    key: "beginOcclusionQuery",
    value: function beginOcclusionQuery() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref$conservative = _ref.conservative,
          conservative = _ref$conservative === void 0 ? false : _ref$conservative;

      return this.begin(conservative ? GL_ANY_SAMPLES_PASSED_CONSERVATIVE : GL_ANY_SAMPLES_PASSED);
    }
  }, {
    key: "beginTransformFeedbackQuery",
    value: function beginTransformFeedbackQuery() {
      return this.begin(GL_TRANSFORM_FEEDBACK_PRIMITIVES_WRITTEN);
    }
  }, {
    key: "getTimestamp",
    value: function getTimestamp() {
      queryManager.beginQuery(this, this.onComplete, this.onError);

      try {
        this.gl.queryCounter(this.handle, GL_TIMESTAMP_EXT);
      } catch (error) {
        queryManager.rejectQuery(this, ERR_TIMER_QUERY_NOT_SUPPORTED);
      }

      return this;
    }
  }, {
    key: "begin",
    value: function begin(target) {
      queryManager.beginQuery(this, this.onComplete, this.onError);
      this.target = target;

      try {
        this.gl.beginQuery(this.target, this.handle);
      } catch (error) {
        queryManager.rejectQuery(this, 'Query not supported');
      }

      return this;
    }
  }, {
    key: "end",
    value: function end() {
      if (this.target) {
        this.ext.endQuery(this.target);
        this.target = null;
      }

      return this;
    }
  }, {
    key: "cancel",
    value: function cancel() {
      this.end();
      queryManager.cancelQuery(this);
      return this;
    }
  }, {
    key: "isResultAvailable",
    value: function isResultAvailable() {
      return this.gl.getQueryParameter(this.handle, GL_QUERY_RESULT_AVAILABLE);
    }
  }, {
    key: "getResult",
    value: function getResult() {
      var result = this.gl.getQueryParameter(this.handle, GL_QUERY_RESULT);
      return Number.isFinite(result) ? result / 1e6 : 0;
    }
  }, {
    key: "_createHandle",
    value: function _createHandle() {
      return Query.isSupported(this.gl) ? this.gl.createQuery() : null;
    }
  }, {
    key: "_deleteHandle",
    value: function _deleteHandle() {
      queryManager.deleteQuery(this);
      this.gl.deleteQuery(this.handle);
    }
  }], [{
    key: "poll",
    value: function poll(gl) {
      queryManager.poll(gl);
    }
  }]);

  return Query;
}(Resource);

export { Query as default };
queryManager.setInvalidator({
  queryType: Query,
  errorMessage: ERR_GPU_DISJOINT,
  checkInvalid: function checkInvalid(gl) {
    return gl.getParameter(GL_GPU_DISJOINT_EXT);
  }
});
//# sourceMappingURL=query.js.map