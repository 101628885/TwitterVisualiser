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
var fs = "uniform sampler2D uDiffuseSampler;\nuniform float uOpacity;\nvarying vec2 uv;\n\nvoid main() {\n  vec4 texel = texture2D(uDiffuseSampler, uv);\n  gl_FragColor = uOpacity * texel;\n}\n";

var TexturePass = function (_Pass) {
  _inherits(TexturePass, _Pass);

  function TexturePass(gl) {
    var _this;

    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, TexturePass);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(TexturePass).call(this, gl, Object.assign({
      id: 'texture-pass'
    }, options)));
    var texture = options.texture,
        _options$opacity = options.opacity,
        opacity = _options$opacity === void 0 ? 1.0 : _options$opacity;
    _this.clipspace = new ClipSpace(gl, {
      id: 'texture-pass',
      fs: fs,
      uniforms: {
        uDiffuseSampler: texture,
        uOpacity: opacity
      }
    });
    return _this;
  }

  _createClass(TexturePass, [{
    key: "_renderPass",
    value: function _renderPass() {
      this.clipspace.draw({
        parameters: {
          depthWrite: false,
          depthTest: false
        }
      });
    }
  }]);

  return TexturePass;
}(Pass);

export { TexturePass as default };
//# sourceMappingURL=texture-pass.js.map