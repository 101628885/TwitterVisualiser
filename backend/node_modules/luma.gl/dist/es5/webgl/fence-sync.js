"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _resource = _interopRequireDefault(require("./resource"));

var _webglUtils = require("../webgl-utils");

var _queryManager = _interopRequireDefault(require("../webgl-utils/query-manager"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

var FenceSync = function (_Resource) {
  _inherits(FenceSync, _Resource);

  function FenceSync(gl, opts) {
    var _this;

    _classCallCheck(this, FenceSync);

    (0, _webglUtils.assertWebGL2Context)(gl);
    _this = _possibleConstructorReturn(this, _getPrototypeOf(FenceSync).call(this, gl, opts));
    _this.promise = null;
    Object.seal(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(FenceSync, [{
    key: "wait",
    value: function wait() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref$flags = _ref.flags,
          flags = _ref$flags === void 0 ? 0 : _ref$flags,
          _ref$timeout = _ref.timeout,
          timeout = _ref$timeout === void 0 ? -1 : _ref$timeout;

      this.gl.waitSync(this.handle, flags, timeout);
      return this;
    }
  }, {
    key: "clientWait",
    value: function clientWait(_ref2) {
      var _ref2$flags = _ref2.flags,
          flags = _ref2$flags === void 0 ? 1 : _ref2$flags,
          timeout = _ref2.timeout;
      var result = this.gl.clientWaitSync(this.handle, flags, timeout);

      switch (result) {
        case 37146:
          break;

        case 37147:
          break;

        case 37148:
          break;

        case 37149:
          break;

        default:
      }

      return result;
    }
  }, {
    key: "cancel",
    value: function cancel() {
      _queryManager.default.cancelQuery(this);
    }
  }, {
    key: "isSignaled",
    value: function isSignaled() {
      return this.getParameter(37140) === 37145;
    }
  }, {
    key: "isResultAvailable",
    value: function isResultAvailable() {
      return this.isSignaled();
    }
  }, {
    key: "getResult",
    value: function getResult() {
      return this.isSignaled();
    }
  }, {
    key: "getParameter",
    value: function getParameter(pname) {
      return this.gl.getSyncParameter(this.handle, pname);
    }
  }, {
    key: "_createHandle",
    value: function _createHandle() {
      return this.gl.fenceSync(37143, 0);
    }
  }, {
    key: "_deleteHandle",
    value: function _deleteHandle() {
      _queryManager.default.deleteQuery(this);

      this.gl.deleteSync(this.handle);
    }
  }]);

  return FenceSync;
}(_resource.default);

exports.default = FenceSync;
//# sourceMappingURL=fence-sync.js.map