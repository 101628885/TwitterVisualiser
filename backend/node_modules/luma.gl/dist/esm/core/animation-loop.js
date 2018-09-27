function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

import { createGLContext, resizeGLContext, resetParameters } from '../webgl-context';
import { pageLoadPromise } from '../webgl-context';
import { makeDebugContext } from '../webgl-context/debug-context';
import { isWebGL, requestAnimationFrame, cancelAnimationFrame } from '../webgl-utils';
import { log } from '../utils';
import assert from '../utils/assert';
import { Framebuffer } from '../webgl';
var DEFAULT_GL_OPTIONS = {
  preserveDrawingBuffer: true
};

var AnimationLoop = function () {
  function AnimationLoop() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, AnimationLoop);

    var _props$onCreateContex = props.onCreateContext,
        onCreateContext = _props$onCreateContex === void 0 ? function (opts) {
      return createGLContext(opts);
    } : _props$onCreateContex,
        _props$onAddHTML = props.onAddHTML,
        onAddHTML = _props$onAddHTML === void 0 ? null : _props$onAddHTML,
        _props$onInitialize = props.onInitialize,
        onInitialize = _props$onInitialize === void 0 ? function () {} : _props$onInitialize,
        _props$onRender = props.onRender,
        onRender = _props$onRender === void 0 ? function () {} : _props$onRender,
        _props$onFinalize = props.onFinalize,
        onFinalize = _props$onFinalize === void 0 ? function () {} : _props$onFinalize,
        _props$offScreen = props.offScreen,
        offScreen = _props$offScreen === void 0 ? false : _props$offScreen,
        _props$gl = props.gl,
        gl = _props$gl === void 0 ? null : _props$gl,
        _props$glOptions = props.glOptions,
        glOptions = _props$glOptions === void 0 ? {} : _props$glOptions,
        _props$debug = props.debug,
        debug = _props$debug === void 0 ? false : _props$debug,
        _props$createFramebuf = props.createFramebuffer,
        createFramebuffer = _props$createFramebuf === void 0 ? false : _props$createFramebuf,
        _props$autoResizeView = props.autoResizeViewport,
        autoResizeViewport = _props$autoResizeView === void 0 ? true : _props$autoResizeView,
        _props$autoResizeDraw = props.autoResizeDrawingBuffer,
        autoResizeDrawingBuffer = _props$autoResizeDraw === void 0 ? true : _props$autoResizeDraw;
    var _props$useDevicePixel = props.useDevicePixels,
        useDevicePixels = _props$useDevicePixel === void 0 ? true : _props$useDevicePixel;

    if ('useDevicePixelRatio' in props) {
      log.deprecated('useDevicePixelRatio', 'useDevicePixels')();
      useDevicePixels = props.useDevicePixelRatio;
    }

    this.props = {
      onCreateContext: onCreateContext,
      onAddHTML: onAddHTML,
      onInitialize: onInitialize,
      onRender: onRender,
      onFinalize: onFinalize,
      gl: gl,
      glOptions: glOptions,
      debug: debug,
      createFramebuffer: createFramebuffer
    };
    this.gl = gl;
    this.offScreen = offScreen;
    this.needsRedraw = null;
    this.setProps({
      autoResizeViewport: autoResizeViewport,
      autoResizeDrawingBuffer: autoResizeDrawingBuffer,
      useDevicePixels: useDevicePixels
    });
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this._renderFrame = this._renderFrame.bind(this);
    this._onMousemove = this._onMousemove.bind(this);
    this._onMouseleave = this._onMouseleave.bind(this);
    return this;
  }

  _createClass(AnimationLoop, [{
    key: "setNeedsRedraw",
    value: function setNeedsRedraw(reason) {
      assert(typeof reason === 'string');
      this.needsRedraw = this.needsRedraw || reason;
      return this;
    }
  }, {
    key: "setProps",
    value: function setProps(props) {
      if ('autoResizeViewport' in props) {
        this.autoResizeViewport = props.autoResizeViewport;
      }

      if ('autoResizeDrawingBuffer' in props) {
        this.autoResizeDrawingBuffer = props.autoResizeDrawingBuffer;
      }

      if ('useDevicePixels' in props) {
        this.useDevicePixels = props.useDevicePixels;
      }

      return this;
    }
  }, {
    key: "start",
    value: function start() {
      var _this = this;

      var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      this._stopped = false;

      if (!this._animationFrameId) {
        this._startPromise = pageLoadPromise.then(function () {
          if (_this._stopped) {
            return null;
          }

          _this._createWebGLContext(opts);

          _this._createFramebuffer();

          _this._startEventHandling();

          _this._initializeCallbackData();

          _this._updateCallbackData();

          _this._resizeCanvasDrawingBuffer();

          _this._resizeViewport();

          return _this.onInitialize(_this.animationProps);
        }).then(function (appContext) {
          if (!_this._stopped) {
            _this._addCallbackData(appContext || {});

            if (appContext !== false && !_this._animationFrameId) {
              _this._animationFrameId = requestAnimationFrame(_this._renderFrame);
            }
          }
        });
      }

      return this;
    }
  }, {
    key: "stop",
    value: function stop() {
      if (this._animationFrameId) {
        this._finalizeCallbackData();

        cancelAnimationFrame(this._animationFrameId);
        this._animationFrameId = null;
        this._stopped = true;
      }

      return this;
    }
  }, {
    key: "onCreateContext",
    value: function onCreateContext() {
      var _this$props;

      return (_this$props = this.props).onCreateContext.apply(_this$props, arguments);
    }
  }, {
    key: "onInitialize",
    value: function onInitialize() {
      var _this$props2;

      return (_this$props2 = this.props).onInitialize.apply(_this$props2, arguments);
    }
  }, {
    key: "onRender",
    value: function onRender() {
      var _this$props3;

      return (_this$props3 = this.props).onRender.apply(_this$props3, arguments);
    }
  }, {
    key: "onFinalize",
    value: function onFinalize() {
      var _this$props4;

      return (_this$props4 = this.props).onFinalize.apply(_this$props4, arguments);
    }
  }, {
    key: "getHTMLControlValue",
    value: function getHTMLControlValue(id) {
      var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      var element = document.getElementById(id);
      return element ? Number(element.value) : defaultValue;
    }
  }, {
    key: "setViewParameters",
    value: function setViewParameters() {
      log.removed('AnimationLoop.setViewParameters', 'AnimationLoop.setProps')();
      return this;
    }
  }, {
    key: "_setupFrame",
    value: function _setupFrame() {
      if (this._onSetupFrame) {
        this._onSetupFrame(this.animationProps);
      } else {
        this._resizeCanvasDrawingBuffer();

        this._resizeViewport();

        this._resizeFramebuffer();
      }
    }
  }, {
    key: "_renderFrame",
    value: function _renderFrame() {
      if (this._stopped) {
        return;
      }

      this._setupFrame();

      this._updateCallbackData();

      this.onRender(this.animationProps);

      if (this.offScreen) {
        this.gl.commit().then(this._renderFrame);
      } else {
        this._animationFrameId = requestAnimationFrame(this._renderFrame);
      }
    }
  }, {
    key: "_initializeCallbackData",
    value: function _initializeCallbackData() {
      this.animationProps = {
        gl: this.gl,
        stop: this.stop,
        canvas: this.gl.canvas,
        framebuffer: this.framebuffer,
        useDevicePixels: this.useDevicePixels,
        needsRedraw: null,
        startTime: Date.now(),
        time: 0,
        tick: 0,
        tock: 0,
        _loop: this,
        _animationLoop: this,
        _mousePosition: null
      };
    }
  }, {
    key: "_updateCallbackData",
    value: function _updateCallbackData() {
      this.animationProps.needsRedraw = this.needsRedraw;
      this.needsRedraw = null;
      var width = this.gl.drawingBufferWidth;
      var height = this.gl.drawingBufferHeight;

      if (width !== this.animationProps.width || height !== this.animationProps.height) {
        this.setNeedsRedraw('drawing buffer resized');
      }

      this.animationProps.width = width;
      this.animationProps.height = height;
      this.animationProps.aspect = height > 0 ? width / height : 1;
      this.animationProps.needsRedraw = this.needsRedraw;
      this.animationProps.time = Date.now() - this.animationProps.startTime;
      this.animationProps.tick++;
      this.animationProps.tock = Math.floor(this.animationProps.time / 1000 * 60);
      this.animationProps._offScreen = this.offScreen;
    }
  }, {
    key: "_finalizeCallbackData",
    value: function _finalizeCallbackData() {
      this.onFinalize(this.animationProps);
    }
  }, {
    key: "_addCallbackData",
    value: function _addCallbackData(appContext) {
      if (_typeof(appContext) === 'object' && appContext !== null) {
        this.animationProps = Object.assign({}, this.animationProps, appContext);
      }
    }
  }, {
    key: "_createWebGLContext",
    value: function _createWebGLContext(opts) {
      opts = Object.assign({}, opts, DEFAULT_GL_OPTIONS, this.props.glOptions);
      this.gl = this.props.gl || this.onCreateContext(opts);

      if (!isWebGL(this.gl)) {
        throw new Error('AnimationLoop.onCreateContext - illegal context returned');
      }

      if (this.props.debug) {
        this.gl = makeDebugContext(this.gl);
      }

      resetParameters(this.gl);

      this._createInfoDiv();
    }
  }, {
    key: "_createInfoDiv",
    value: function _createInfoDiv() {
      if (this.gl.canvas && this.props.onAddHTML) {
        var wrapperDiv = document.createElement('div');
        document.body.appendChild(wrapperDiv);
        wrapperDiv.style.position = 'relative';
        var div = document.createElement('div');
        div.style.position = 'absolute';
        div.style.left = '10px';
        div.style.bottom = '10px';
        div.style.width = '300px';
        div.style.background = 'white';
        wrapperDiv.appendChild(this.gl.canvas);
        wrapperDiv.appendChild(div);
        var html = this.props.onAddHTML(div);

        if (html) {
          div.innerHTML = html;
        }
      }
    }
  }, {
    key: "_resizeViewport",
    value: function _resizeViewport() {
      if (this.autoResizeViewport) {
        this.gl.viewport(0, 0, this.gl.drawingBufferWidth, this.gl.drawingBufferHeight);
      }
    }
  }, {
    key: "_resizeCanvasDrawingBuffer",
    value: function _resizeCanvasDrawingBuffer() {
      if (this.autoResizeDrawingBuffer) {
        resizeGLContext(this.gl, {
          useDevicePixels: this.useDevicePixels
        });
      }
    }
  }, {
    key: "_createFramebuffer",
    value: function _createFramebuffer() {
      if (this.props.createFramebuffer) {
        this.framebuffer = new Framebuffer(this.gl);
      }
    }
  }, {
    key: "_resizeFramebuffer",
    value: function _resizeFramebuffer() {
      if (this.framebuffer) {
        this.framebuffer.resize({
          width: this.gl.drawingBufferWidth,
          height: this.gl.drawingBufferHeight
        });
      }
    }
  }, {
    key: "_startEventHandling",
    value: function _startEventHandling() {
      this.gl.canvas.addEventListener('mousemove', this._onMousemove);
      this.gl.canvas.addEventListener('mouseleave', this._onMouseleave);
    }
  }, {
    key: "_onMousemove",
    value: function _onMousemove(e) {
      this.animationProps._mousePosition = [e.offsetX, e.offsetY];
    }
  }, {
    key: "_onMouseleave",
    value: function _onMouseleave(e) {
      this.animationProps._mousePosition = null;
    }
  }]);

  return AnimationLoop;
}();

export { AnimationLoop as default };
//# sourceMappingURL=animation-loop.js.map