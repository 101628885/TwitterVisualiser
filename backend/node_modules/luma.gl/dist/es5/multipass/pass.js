"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _webgl = require("../webgl");

var _webglContext = require("../webgl-context");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Pass = function () {
  function Pass(gl, props) {
    _classCallCheck(this, Pass);

    var _props$id = props.id,
        id = _props$id === void 0 ? 'pass' : _props$id;
    this.id = id;
    this.gl = gl;
    this.props = {
      enabled: true,
      screen: false,
      swap: false
    };
    Object.assign(this.props, props);
  }

  _createClass(Pass, [{
    key: "setProps",
    value: function setProps(props) {
      Object.assign(this.props, props);
    }
  }, {
    key: "render",
    value: function render(renderState, animationProps) {
      var _this = this;

      if (!this.props.enabled) {
        return;
      }

      var gl = this.gl;
      var renderParams = {
        gl: gl,
        outputBuffer: renderState.writeBuffer,
        inputBuffer: renderState.readBuffer,
        animationProps: animationProps,
        swapBuffers: function swapBuffers() {
          return renderState._swapFramebuffers();
        }
      };

      if (this.props.screen) {
        renderParams.inputBuffer = renderParams.outputBuffer;
        renderParams.outputBuffer = _webgl.Framebuffer.getDefaultFramebuffer(gl);
      } else if (this.props.swap) {
        renderParams.inputBuffer = renderState.writeBuffer;
        renderParams.outputBuffer = renderState.readBuffer;
      }

      (0, _webglContext.withParameters)(gl, {
        framebuffer: renderParams.outputBuffer
      }, function () {
        return _this._renderPass(renderParams);
      });
      renderParams.outputBuffer.log(3, this.id);

      if (this.props.swap) {
        renderState._swapFramebuffers();
      }
    }
  }, {
    key: "_renderPass",
    value: function _renderPass(_ref) {
      var gl = _ref.gl,
          inputBuffer = _ref.inputBuffer,
          outputBuffer = _ref.outputBuffer,
          animationProps = _ref.animationProps;
    }
  }]);

  return Pass;
}();

exports.default = Pass;
//# sourceMappingURL=pass.js.map