function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

import { ClipSpace } from '../models';
import Pass from './pass';
var fs = "uniform sampler2D uDiffuseSampler;\nuniform float uOpacity;\n\nvarying vec2 uv;\n\nvoid main() {\n  vec4 texel = texture2D(uDiffuseSampler, uv);\n  gl_FragColor = uOpacity * texel;\n}\n";

var CopyPass = function (_Pass) {
  _inherits(CopyPass, _Pass);

  function CopyPass(gl) {
    var _this;

    var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, CopyPass);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CopyPass).call(this, gl, Object.assign({
      id: 'copy-pass',
      swap: true
    }, props)));
    _this.clipspace = new ClipSpace(gl, {
      id: 'copy-pass',
      fs: fs
    });
    return _this;
  }

  _createClass(CopyPass, [{
    key: "_renderPass",
    value: function _renderPass(_ref) {
      var inputBuffer = _ref.inputBuffer;
      var _this$props$opacity = this.props.opacity,
          opacity = _this$props$opacity === void 0 ? 1.0 : _this$props$opacity;
      this.clipspace.draw({
        uniforms: {
          uDiffuseSampler: inputBuffer,
          uOpacity: opacity
        },
        parameters: {
          depthWrite: false,
          depthTest: false
        }
      });
    }
  }]);

  return CopyPass;
}(Pass);

export { CopyPass as default };
//# sourceMappingURL=copy-pass.js.map