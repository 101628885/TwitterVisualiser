"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _attribute = _interopRequireDefault(require("./attribute"));

var _object3d = _interopRequireDefault(require("./object-3d"));

var _geometry = require("../geometry/geometry");

var _webgl = require("../webgl");

var _webglUtils = require("../webgl-utils");

var _shaders = require("../shadertools/src/shaders");

var _src = require("../shadertools/src");

var _seerIntegration = require("../debug/seer-integration");

var _debugUniforms = require("../webgl-debug/debug-uniforms");

var _debugVertexArray = require("../webgl-debug/debug-vertex-array");

var _debugProgramConfiguration = require("../webgl-debug/debug-program-configuration");

var _utils = require("../utils");

var _assert = _interopRequireDefault(require("../utils/assert"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var ERR_MODEL_PARAMS = 'Model needs drawMode and vertexCount';
var LOG_DRAW_PRIORITY = 2;
var LOG_DRAW_TIMEOUT = 10000;
var DEPRECATED_PICKING_UNIFORMS = ['renderPickingBuffer', 'pickingEnabled'];

var Model = function (_Object3D) {
  _inherits(Model, _Object3D);

  function Model(gl) {
    var _this;

    var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Model);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Model).call(this, props));
    (0, _assert.default)((0, _webglUtils.isWebGL)(gl));
    _this.gl = gl;
    _this.lastLogTime = 0;

    _this.initialize(props);

    return _this;
  }

  _createClass(Model, [{
    key: "initialize",
    value: function initialize() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      this.props = {};
      this.program = this._createProgram(props);
      this.vertexArray = new _webgl.VertexArray(this.gl, {
        program: this.program
      });
      this.userData = {};
      this.needsRedraw = true;
      this._attributes = {};
      this.attributes = {};
      this.animatedUniforms = {};
      this.animated = false;
      this.animationLoop = null;
      this.timerQueryEnabled = false;
      this.timeElapsedQuery = undefined;
      this.lastQueryReturned = true;
      this.stats = {
        accumulatedFrameTime: 0,
        averageFrameTime: 0,
        profileFrameCount: 0
      };
      this.pickable = true;
      this.setProps(props);
      this.setUniforms(Object.assign({}, this.getModuleUniforms(), this.getModuleUniforms(props.moduleSettings)));
      this.isInstanced = props.isInstanced || props.instanced;

      this.onBeforeRender = props.onBeforeRender || function () {};

      this.onAfterRender = props.onAfterRender || function () {};

      (0, _assert.default)(this.drawMode !== undefined && Number.isFinite(this.vertexCount), ERR_MODEL_PARAMS);
    }
  }, {
    key: "setProps",
    value: function setProps(props) {
      Object.assign(this.props, props);

      if ('instanceCount' in props) {
        this.instanceCount = props.instanceCount;
      }

      if ('geometry' in props) {
        this.setGeometry(props.geometry);
      }

      if ('attributes' in props) {
        this.setAttributes(props.attributes);
      }

      if ('uniforms' in props) {
        this.setUniforms(props.uniforms, props.samplers);
      }

      if ('pickable' in props) {
        this.pickable = props.pickable;
      }

      if ('timerQueryEnabled' in props) {
        this.timerQueryEnabled = props.timerQueryEnabled && _webgl.Query.isSupported(this.gl, ['timers']);

        if (props.timerQueryEnabled && !this.timerQueryEnabled) {
          _utils.log.warn('GPU timer not supported')();
        }
      }

      if ('_feedbackBuffers' in props) {
        this._setFeedbackBuffers(props._feedbackBuffers);
      }

      if ('_animationProps' in props) {
        this._setAnimationProps(props._animationProps);
      }

      if ('_animationLoop' in props) {
        this.animationLoop = props._animationLoop;
      }
    }
  }, {
    key: "delete",
    value: function _delete() {
      for (var key in this._attributes) {
        if (this._attributes[key] !== this.attributes[key]) {
          this._attributes[key].delete();
        }
      }

      this.program.delete();
      this.vertexArray.delete();
      (0, _seerIntegration.removeModel)(this.id);
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.delete();
    }
  }, {
    key: "getNeedsRedraw",
    value: function getNeedsRedraw() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref$clearRedrawFlags = _ref.clearRedrawFlags,
          clearRedrawFlags = _ref$clearRedrawFlags === void 0 ? false : _ref$clearRedrawFlags;

      var redraw = false;
      redraw = redraw || this.needsRedraw;
      this.needsRedraw = this.needsRedraw && !clearRedrawFlags;

      if (this.geometry) {
        redraw = redraw || this.geometry.getNeedsRedraw({
          clearRedrawFlags: clearRedrawFlags
        });
      }

      if (this.animated) {
        redraw = redraw || "animated model ".concat(this.id);
      }

      return redraw;
    }
  }, {
    key: "getDrawMode",
    value: function getDrawMode() {
      return this.drawMode;
    }
  }, {
    key: "getVertexCount",
    value: function getVertexCount() {
      return this.vertexCount;
    }
  }, {
    key: "getInstanceCount",
    value: function getInstanceCount() {
      return this.instanceCount;
    }
  }, {
    key: "getProgram",
    value: function getProgram() {
      return this.program;
    }
  }, {
    key: "getAttributes",
    value: function getAttributes() {
      return this.attributes;
    }
  }, {
    key: "getUniforms",
    value: function getUniforms() {
      return this.program.getUniforms;
    }
  }, {
    key: "setNeedsRedraw",
    value: function setNeedsRedraw() {
      var redraw = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      this.needsRedraw = redraw;
      return this;
    }
  }, {
    key: "setDrawMode",
    value: function setDrawMode(drawMode) {
      this.props.drawMode = (0, _geometry.getDrawMode)(drawMode);
      return this;
    }
  }, {
    key: "setVertexCount",
    value: function setVertexCount(vertexCount) {
      (0, _assert.default)(Number.isFinite(vertexCount));
      this.props.vertexCount = vertexCount;
      return this;
    }
  }, {
    key: "setInstanceCount",
    value: function setInstanceCount(instanceCount) {
      (0, _assert.default)(Number.isFinite(instanceCount));
      this.instanceCount = instanceCount;
      return this;
    }
  }, {
    key: "setGeometry",
    value: function setGeometry(geometry) {
      this.geometry = geometry;

      var buffers = this._createBuffersFromAttributeDescriptors(this.geometry.getAttributes());

      this.vertexArray.setAttributes(buffers);
      this.setNeedsRedraw();
      return this;
    }
  }, {
    key: "setAttributes",
    value: function setAttributes() {
      var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if ((0, _utils.isObjectEmpty)(attributes)) {
        return this;
      }

      Object.assign(this.attributes, attributes);

      var buffers = this._createBuffersFromAttributeDescriptors(attributes);

      this.vertexArray.setAttributes(buffers);
      this.setNeedsRedraw();
      return this;
    }
  }, {
    key: "setUniforms",
    value: function setUniforms() {
      var _this2 = this;

      var uniforms = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var samplers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      uniforms = Object.assign({}, uniforms);
      (0, _seerIntegration.getOverrides)(this.id, uniforms);
      uniforms = this._extractAnimatedUniforms(uniforms);
      this.program.setUniforms(uniforms, samplers, function () {
        _this2._checkForDeprecatedUniforms(uniforms);

        _this2.setNeedsRedraw();
      });
    }
  }, {
    key: "_setAnimationProps",
    value: function _setAnimationProps(animationProps) {
      var _this3 = this;

      if (this.animated) {
        (0, _assert.default)(animationProps, 'Model.draw(): animated uniforms but no animationProps');

        var animatedUniforms = this._evaluateAnimateUniforms(animationProps);

        this.program.setUniforms(animatedUniforms, {}, function () {
          _this3._checkForDeprecatedUniforms(animatedUniforms);

          _this3.setNeedsRedraw();
        });
      }
    }
  }, {
    key: "updateModuleSettings",
    value: function updateModuleSettings(opts) {
      var uniforms = this.getModuleUniforms(opts || {});
      return this.setUniforms(uniforms);
    }
  }, {
    key: "clear",
    value: function clear(opts) {
      (0, _webgl.clear)(this.program.gl, opts);
      return this;
    }
  }, {
    key: "draw",
    value: function draw() {
      var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var _opts$moduleSettings = opts.moduleSettings,
          moduleSettings = _opts$moduleSettings === void 0 ? null : _opts$moduleSettings,
          framebuffer = opts.framebuffer,
          _opts$uniforms = opts.uniforms,
          uniforms = _opts$uniforms === void 0 ? {} : _opts$uniforms,
          _opts$attributes = opts.attributes,
          attributes = _opts$attributes === void 0 ? {} : _opts$attributes,
          _opts$samplers = opts.samplers,
          samplers = _opts$samplers === void 0 ? {} : _opts$samplers,
          _opts$transformFeedba = opts.transformFeedback,
          transformFeedback = _opts$transformFeedba === void 0 ? this.transformFeedback : _opts$transformFeedba,
          _opts$parameters = opts.parameters,
          parameters = _opts$parameters === void 0 ? {} : _opts$parameters,
          _opts$vertexArray = opts.vertexArray,
          vertexArray = _opts$vertexArray === void 0 ? this.vertexArray : _opts$vertexArray,
          animationProps = opts.animationProps;
      (0, _seerIntegration.addModel)(this);
      this.setAttributes(attributes);
      this.updateModuleSettings(moduleSettings);
      this.setUniforms(uniforms, samplers);

      this._refreshAnimationProps(animationProps);

      var logPriority = this._logDrawCallStart(2);

      var drawParams = this.vertexArray.getDrawParams(this.props);

      if (drawParams.isInstanced && !this.isInstanced) {
        _utils.log.warn('Found instanced attributes on non-instanced model', this.id)();
      }

      var isIndexed = drawParams.isIndexed,
          indexType = drawParams.indexType;
      var isInstanced = this.isInstanced,
          instanceCount = this.instanceCount;
      this.onBeforeRender();

      this._timerQueryStart();

      this.program.draw(Object.assign({}, opts, {
        logPriority: logPriority,
        uniforms: null,
        framebuffer: framebuffer,
        parameters: parameters,
        drawMode: this.getDrawMode(),
        vertexCount: this.getVertexCount(),
        vertexArray: vertexArray,
        transformFeedback: transformFeedback,
        isIndexed: isIndexed,
        indexType: indexType,
        isInstanced: isInstanced,
        instanceCount: instanceCount
      }));

      this._timerQueryEnd();

      this.onAfterRender();
      this.setNeedsRedraw(false);

      this._logDrawCallEnd(logPriority, vertexArray, framebuffer);

      return this;
    }
  }, {
    key: "transform",
    value: function transform() {
      var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var _opts$discard = opts.discard,
          discard = _opts$discard === void 0 ? true : _opts$discard,
          feedbackBuffers = opts.feedbackBuffers,
          _opts$unbindModels = opts.unbindModels,
          unbindModels = _opts$unbindModels === void 0 ? [] : _opts$unbindModels;
      var parameters = opts.parameters;

      if (feedbackBuffers) {
        this._setFeedbackBuffers(feedbackBuffers);
      }

      if (discard) {
        parameters = Object.assign({}, parameters, _defineProperty({}, 35977, discard));
      }

      unbindModels.forEach(function (model) {
        return model.vertexArray.unbindBuffers();
      });

      try {
        this.draw(Object.assign({}, opts, {
          parameters: parameters
        }));
      } finally {
        unbindModels.forEach(function (model) {
          return model.vertexArray.bindBuffers();
        });
      }

      return this;
    }
  }, {
    key: "render",
    value: function render() {
      var uniforms = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      (0, _assert.default)(arguments.length <= 1);
      return this.draw({
        uniforms: uniforms
      });
    }
  }, {
    key: "_createProgram",
    value: function _createProgram(_ref2) {
      var _ref2$vs = _ref2.vs,
          vs = _ref2$vs === void 0 ? null : _ref2$vs,
          _ref2$fs = _ref2.fs,
          fs = _ref2$fs === void 0 ? null : _ref2$fs,
          _ref2$modules = _ref2.modules,
          modules = _ref2$modules === void 0 ? null : _ref2$modules,
          _ref2$defines = _ref2.defines,
          defines = _ref2$defines === void 0 ? {} : _ref2$defines,
          _ref2$inject = _ref2.inject,
          inject = _ref2$inject === void 0 ? {} : _ref2$inject,
          _ref2$shaderCache = _ref2.shaderCache,
          shaderCache = _ref2$shaderCache === void 0 ? null : _ref2$shaderCache,
          _ref2$varyings = _ref2.varyings,
          varyings = _ref2$varyings === void 0 ? null : _ref2$varyings,
          _ref2$bufferMode = _ref2.bufferMode,
          bufferMode = _ref2$bufferMode === void 0 ? 35981 : _ref2$bufferMode,
          _ref2$program = _ref2.program,
          program = _ref2$program === void 0 ? null : _ref2$program;

      this.getModuleUniforms = function (x) {};

      var id = this.id;

      if (!program) {
        vs = vs || _shaders.MODULAR_SHADERS.vs;
        fs = fs || _shaders.MODULAR_SHADERS.fs;
        var assembleResult = (0, _src.assembleShaders)(this.gl, {
          vs: vs,
          fs: fs,
          modules: modules,
          inject: inject,
          defines: defines,
          log: _utils.log
        });
        vs = assembleResult.vs;
        fs = assembleResult.fs;

        if (shaderCache) {
          program = shaderCache.getProgram(this.gl, {
            id: id,
            vs: vs,
            fs: fs
          });
        } else {
          program = new _webgl.Program(this.gl, {
            id: id,
            vs: vs,
            fs: fs,
            varyings: varyings,
            bufferMode: bufferMode
          });
        }

        this.getModuleUniforms = assembleResult.getUniforms || function (x) {};
      }

      (0, _assert.default)(program instanceof _webgl.Program, 'Model needs a program');
      return program;
    }
  }, {
    key: "_checkForDeprecatedUniforms",
    value: function _checkForDeprecatedUniforms(uniforms) {
      DEPRECATED_PICKING_UNIFORMS.forEach(function (uniform) {
        if (uniform in uniforms) {
          _utils.log.deprecated(uniform, 'use picking shader module and Model class updateModuleSettings()')();
        }
      });
    }
  }, {
    key: "_refreshAnimationProps",
    value: function _refreshAnimationProps(animationProps) {
      animationProps = animationProps || this.animationLoop && this.animationLoop.animationProps;

      if (animationProps) {
        this._setAnimationProps(animationProps);
      }
    }
  }, {
    key: "_evaluateAnimateUniforms",
    value: function _evaluateAnimateUniforms(animationProps) {
      if (!this.animated) {
        return {};
      }

      var animatedUniforms = {};

      for (var uniformName in this.animatedUniforms) {
        var valueFunction = this.animatedUniforms[uniformName];
        animatedUniforms[uniformName] = valueFunction(animationProps);
      }

      return animatedUniforms;
    }
  }, {
    key: "_extractAnimatedUniforms",
    value: function _extractAnimatedUniforms(uniforms) {
      var foundAnimated = false;

      for (var uniformName in uniforms) {
        var newValue = uniforms[uniformName];

        if (typeof newValue === 'function') {
          this.animatedUniforms[uniformName] = newValue;
          foundAnimated = true;
        } else {
          delete this.animatedUniforms[uniformName];
        }
      }

      this.animated = !(0, _utils.isObjectEmpty)(this.animatedUniforms);

      if (!foundAnimated) {
        return uniforms;
      }

      var staticUniforms = {};

      for (var _uniformName in uniforms) {
        if (!this.animatedUniforms[_uniformName]) {
          staticUniforms[_uniformName] = uniforms[_uniformName];
        }
      }

      return staticUniforms;
    }
  }, {
    key: "_setFeedbackBuffers",
    value: function _setFeedbackBuffers() {
      var feedbackBuffers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if ((0, _utils.isObjectEmpty)(feedbackBuffers)) {
        return this;
      }

      var gl = this.program.gl;
      this.transformFeedback = this.transformFeedback || new _webgl.TransformFeedback(gl, {
        program: this.program
      });
      this.transformFeedback.setBuffers(feedbackBuffers);
      this.setNeedsRedraw();
      return this;
    }
  }, {
    key: "_timerQueryStart",
    value: function _timerQueryStart() {
      if (this.timerQueryEnabled === true) {
        if (!this.timeElapsedQuery) {
          this.timeElapsedQuery = new _webgl.Query(this.gl);
        }

        if (this.lastQueryReturned) {
          this.lastQueryReturned = false;
          this.timeElapsedQuery.beginTimeElapsedQuery();
        }
      }
    }
  }, {
    key: "_timerQueryEnd",
    value: function _timerQueryEnd() {
      if (this.timerQueryEnabled === true) {
        this.timeElapsedQuery.end();

        if (this.timeElapsedQuery.isResultAvailable()) {
          this.lastQueryReturned = true;
          var elapsedTime = this.timeElapsedQuery.getResult();
          this.stats.lastFrameTime = elapsedTime;
          this.stats.accumulatedFrameTime += elapsedTime;
          this.stats.profileFrameCount++;
          this.stats.averageFrameTime = this.stats.accumulatedFrameTime / this.stats.profileFrameCount;

          _utils.log.log(LOG_DRAW_PRIORITY, "GPU time ".concat(this.program.id, ": ").concat(this.stats.lastFrameTime, "ms average ").concat(this.stats.averageFrameTime, "ms accumulated: ").concat(this.stats.accumulatedFrameTime, "ms count: ").concat(this.stats.profileFrameCount))();
        }
      }
    }
  }, {
    key: "_createBuffersFromAttributeDescriptors",
    value: function _createBuffersFromAttributeDescriptors(attributes) {
      var gl = this.program.gl;
      var buffers = {};

      for (var attributeName in attributes) {
        var descriptor = attributes[attributeName];
        var attribute = this._attributes[attributeName];

        if (descriptor instanceof _attribute.default) {
          attribute = descriptor;
        } else if (descriptor instanceof _webgl.Buffer) {
          attribute = attribute || new _attribute.default(gl, Object.assign({}, descriptor, descriptor.layout, {
            id: attributeName
          }));
          attribute.update({
            buffer: descriptor
          });
        } else if (attribute) {
          attribute.update(descriptor);
        } else {
          attribute = new _attribute.default(gl, Object.assign({}, descriptor, {
            id: attributeName
          }));
        }

        this._attributes[attributeName] = attribute;
        buffers[attributeName] = attribute.getValue();
      }

      return buffers;
    }
  }, {
    key: "_logDrawCallStart",
    value: function _logDrawCallStart(priority) {
      var logDrawTimeout = priority > 3 ? 0 : LOG_DRAW_TIMEOUT;

      if (_utils.log.priority < priority || Date.now() - this.lastLogTime < logDrawTimeout) {
        return undefined;
      }

      this.lastLogTime = Date.now();

      _utils.log.group(LOG_DRAW_PRIORITY, ">>> DRAWING MODEL ".concat(this.id), {
        collapsed: _utils.log.priority <= 2
      })();

      return priority;
    }
  }, {
    key: "_logDrawCallEnd",
    value: function _logDrawCallEnd(priority, vertexArray, uniforms, framebuffer) {
      if (priority === undefined) {
        return;
      }

      var attributeTable = (0, _debugVertexArray.getDebugTableForVertexArray)({
        vertexArray: vertexArray,
        header: "".concat(this.id, " attributes"),
        attributes: this._attributes
      });

      var _getDebugTableForUnif = (0, _debugUniforms.getDebugTableForUniforms)({
        header: "".concat(this.id, " uniforms"),
        program: this.program,
        uniforms: Object.assign({}, this.program.uniforms, uniforms)
      }),
          uniformTable = _getDebugTableForUnif.table,
          unusedTable = _getDebugTableForUnif.unusedTable,
          unusedCount = _getDebugTableForUnif.unusedCount;

      var _getDebugTableForUnif2 = (0, _debugUniforms.getDebugTableForUniforms)({
        header: "".concat(this.id, " uniforms"),
        program: this.program,
        uniforms: Object.assign({}, this.program.uniforms, uniforms),
        undefinedOnly: true
      }),
          missingTable = _getDebugTableForUnif2.table,
          missingCount = _getDebugTableForUnif2.count;

      if (missingCount > 0) {
        _utils.log.log('MISSING UNIFORMS', Object.keys(missingTable))();
      }

      if (unusedCount > 0) {
        _utils.log.log('UNUSED UNIFORMS', Object.keys(unusedTable))();
      }

      var configTable = (0, _debugProgramConfiguration.getDebugTableForProgramConfiguration)(this.vertexArray.configuration);

      _utils.log.table(priority, attributeTable)();

      _utils.log.table(priority, uniformTable)();

      _utils.log.table(priority + 1, configTable)();

      (0, _seerIntegration.logModel)(this, uniforms);

      if (framebuffer) {
        framebuffer.log({
          priority: LOG_DRAW_PRIORITY,
          message: "Rendered to ".concat(framebuffer.id)
        });
      }

      _utils.log.groupEnd(LOG_DRAW_PRIORITY, ">>> DRAWING MODEL ".concat(this.id))();
    }
  }, {
    key: "vertexCount",
    get: function get() {
      if (Number.isFinite(this.props.vertexCount)) {
        return this.props.vertexCount;
      }

      return this.geometry && this.geometry.getVertexCount();
    }
  }, {
    key: "drawMode",
    get: function get() {
      if (Number.isFinite(this.props.drawMode)) {
        return this.props.drawMode;
      }

      return this.geometry && this.geometry.drawMode;
    }
  }]);

  return Model;
}(_object3d.default);

exports.default = Model;
//# sourceMappingURL=model.js.map