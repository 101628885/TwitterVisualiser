function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

import TruncatedConeGeometry from './truncated-cone-geometry';

var ConeGeometry = function (_TruncatedConeGeometr) {
  _inherits(ConeGeometry, _TruncatedConeGeometr);

  function ConeGeometry() {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, ConeGeometry);

    var _opts$radius = opts.radius,
        radius = _opts$radius === void 0 ? 1 : _opts$radius,
        _opts$cap = opts.cap,
        cap = _opts$cap === void 0 ? true : _opts$cap;
    return _possibleConstructorReturn(this, _getPrototypeOf(ConeGeometry).call(this, Object.assign({}, opts, {
      topRadius: 0,
      topCap: Boolean(cap),
      bottomCap: Boolean(cap),
      bottomRadius: radius
    })));
  }

  return ConeGeometry;
}(TruncatedConeGeometry);

export { ConeGeometry as default };
//# sourceMappingURL=cone-geometry.js.map