function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

import Resource from './resource';
import { parseGLSLCompilerError, getShaderName } from '../webgl-utils';
import { assertWebGLContext } from '../webgl-utils';
import { uid, log } from '../utils';
import assert from '../utils/assert';
var ERR_SOURCE = 'Shader: GLSL source code must be a JavaScript string';
var GL_FRAGMENT_SHADER = 0x8B30;
var GL_VERTEX_SHADER = 0x8B31;
var GL_COMPILE_STATUS = 0x8B81;
var GL_SHADER_TYPE = 0x8B4F;
export var Shader = function (_Resource) {
  _inherits(Shader, _Resource);

  _createClass(Shader, null, [{
    key: "getTypeName",
    value: function getTypeName(shaderType) {
      switch (shaderType) {
        case GL_VERTEX_SHADER:
          return 'vertex-shader';

        case GL_FRAGMENT_SHADER:
          return 'fragment-shader';

        default:
          assert(false);
          return 'unknown';
      }
    }
  }]);

  function Shader(gl, props) {
    var _this;

    _classCallCheck(this, Shader);

    assertWebGLContext(gl);
    assert(typeof props.source === 'string', ERR_SOURCE);
    var id = getShaderName(props.source, null) || props.id || uid("unnamed ".concat(Shader.getTypeName(props.shaderType)));
    _this = _possibleConstructorReturn(this, _getPrototypeOf(Shader).call(this, gl, {
      id: id
    }));
    _this.shaderType = props.shaderType;
    _this.source = props.source;

    _this.initialize(props);

    return _this;
  }

  _createClass(Shader, [{
    key: "initialize",
    value: function initialize(_ref) {
      var source = _ref.source;
      var shaderName = getShaderName(source, null);

      if (shaderName) {
        this.id = uid(shaderName);
      }

      this._compile(source);
    }
  }, {
    key: "getParameter",
    value: function getParameter(pname) {
      return this.gl.getShaderParameter(this.handle, pname);
    }
  }, {
    key: "toString",
    value: function toString() {
      return "".concat(this.getTypeName(this.shaderType), ":").concat(this.id);
    }
  }, {
    key: "getName",
    value: function getName() {
      return getShaderName(this.source) || 'unnamed-shader';
    }
  }, {
    key: "getSource",
    value: function getSource() {
      return this.gl.getShaderSource(this.handle);
    }
  }, {
    key: "getTranslatedSource",
    value: function getTranslatedSource() {
      var extension = this.gl.getExtension('WEBGL_debug_shaders');
      return extension ? extension.getTranslatedShaderSource(this.handle) : 'No translated source available. WEBGL_debug_shaders not implemented';
    }
  }, {
    key: "_compile",
    value: function _compile() {
      this.gl.shaderSource(this.handle, this.source);
      this.gl.compileShader(this.handle);
      var compileStatus = this.getParameter(GL_COMPILE_STATUS);

      if (!compileStatus) {
        var infoLog = this.gl.getShaderInfoLog(this.handle);

        var _parseGLSLCompilerErr = parseGLSLCompilerError(infoLog, this.source, this.shaderType, this.id),
            shaderName = _parseGLSLCompilerErr.shaderName,
            errors = _parseGLSLCompilerErr.errors,
            warnings = _parseGLSLCompilerErr.warnings;

        log.error("GLSL compilation errors in ".concat(shaderName, "\n").concat(errors))();
        log.warn("GLSL compilation warnings in ".concat(shaderName, "\n").concat(warnings))();
        throw new Error("GLSL compilation errors in ".concat(shaderName));
      }
    }
  }, {
    key: "_deleteHandle",
    value: function _deleteHandle() {
      this.gl.deleteShader(this.handle);
    }
  }, {
    key: "_getOptsFromHandle",
    value: function _getOptsFromHandle() {
      return {
        type: this.getParameter(GL_SHADER_TYPE),
        source: this.getSource()
      };
    }
  }]);

  return Shader;
}(Resource);
export var VertexShader = function (_Shader) {
  _inherits(VertexShader, _Shader);

  function VertexShader(gl, props) {
    _classCallCheck(this, VertexShader);

    if (typeof props === 'string') {
      log.deprecated('new FragmentShader(gl, source)', 'new FragmentShader(gl, {source})', '6.1');
      props = {
        source: props
      };
    }

    return _possibleConstructorReturn(this, _getPrototypeOf(VertexShader).call(this, gl, Object.assign({}, props, {
      shaderType: GL_VERTEX_SHADER
    })));
  }

  _createClass(VertexShader, [{
    key: "_createHandle",
    value: function _createHandle() {
      return this.gl.createShader(GL_VERTEX_SHADER);
    }
  }]);

  return VertexShader;
}(Shader);
export var FragmentShader = function (_Shader2) {
  _inherits(FragmentShader, _Shader2);

  function FragmentShader(gl, props) {
    _classCallCheck(this, FragmentShader);

    if (typeof props === 'string') {
      log.deprecated('new FragmentShader(gl, source)', 'new FragmentShader(gl, {source})', '6.1');
      props = {
        source: props
      };
    }

    return _possibleConstructorReturn(this, _getPrototypeOf(FragmentShader).call(this, gl, Object.assign({}, props, {
      shaderType: GL_FRAGMENT_SHADER
    })));
  }

  _createClass(FragmentShader, [{
    key: "_createHandle",
    value: function _createHandle() {
      return this.gl.createShader(GL_FRAGMENT_SHADER);
    }
  }]);

  return FragmentShader;
}(Shader);
//# sourceMappingURL=shader.js.map