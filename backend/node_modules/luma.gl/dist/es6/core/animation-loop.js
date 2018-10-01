import { createGLContext, resizeGLContext, resetParameters } from '../webgl-context';
import { pageLoadPromise } from '../webgl-context';
import { makeDebugContext } from '../webgl-context/debug-context';
import { isWebGL, requestAnimationFrame, cancelAnimationFrame } from '../webgl-utils';
import { log } from '../utils';
import assert from '../utils/assert';
import { Framebuffer } from '../webgl';
const DEFAULT_GL_OPTIONS = {
  preserveDrawingBuffer: true
};
export default class AnimationLoop {
  constructor(props = {}) {
    const _props$onCreateContex = props.onCreateContext,
          onCreateContext = _props$onCreateContex === void 0 ? opts => createGLContext(opts) : _props$onCreateContex,
          _props$onAddHTML = props.onAddHTML,
          onAddHTML = _props$onAddHTML === void 0 ? null : _props$onAddHTML,
          _props$onInitialize = props.onInitialize,
          onInitialize = _props$onInitialize === void 0 ? () => {} : _props$onInitialize,
          _props$onRender = props.onRender,
          onRender = _props$onRender === void 0 ? () => {} : _props$onRender,
          _props$onFinalize = props.onFinalize,
          onFinalize = _props$onFinalize === void 0 ? () => {} : _props$onFinalize,
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
    let _props$useDevicePixel = props.useDevicePixels,
        useDevicePixels = _props$useDevicePixel === void 0 ? true : _props$useDevicePixel;

    if ('useDevicePixelRatio' in props) {
      log.deprecated('useDevicePixelRatio', 'useDevicePixels')();
      useDevicePixels = props.useDevicePixelRatio;
    }

    this.props = {
      onCreateContext,
      onAddHTML,
      onInitialize,
      onRender,
      onFinalize,
      gl,
      glOptions,
      debug,
      createFramebuffer
    };
    this.gl = gl;
    this.offScreen = offScreen;
    this.needsRedraw = null;
    this.setProps({
      autoResizeViewport,
      autoResizeDrawingBuffer,
      useDevicePixels
    });
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this._renderFrame = this._renderFrame.bind(this);
    this._onMousemove = this._onMousemove.bind(this);
    this._onMouseleave = this._onMouseleave.bind(this);
    return this;
  }

  setNeedsRedraw(reason) {
    assert(typeof reason === 'string');
    this.needsRedraw = this.needsRedraw || reason;
    return this;
  }

  setProps(props) {
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

  start(opts = {}) {
    this._stopped = false;

    if (!this._animationFrameId) {
      this._startPromise = pageLoadPromise.then(() => {
        if (this._stopped) {
          return null;
        }

        this._createWebGLContext(opts);

        this._createFramebuffer();

        this._startEventHandling();

        this._initializeCallbackData();

        this._updateCallbackData();

        this._resizeCanvasDrawingBuffer();

        this._resizeViewport();

        return this.onInitialize(this.animationProps);
      }).then(appContext => {
        if (!this._stopped) {
          this._addCallbackData(appContext || {});

          if (appContext !== false && !this._animationFrameId) {
            this._animationFrameId = requestAnimationFrame(this._renderFrame);
          }
        }
      });
    }

    return this;
  }

  stop() {
    if (this._animationFrameId) {
      this._finalizeCallbackData();

      cancelAnimationFrame(this._animationFrameId);
      this._animationFrameId = null;
      this._stopped = true;
    }

    return this;
  }

  onCreateContext(...args) {
    return this.props.onCreateContext(...args);
  }

  onInitialize(...args) {
    return this.props.onInitialize(...args);
  }

  onRender(...args) {
    return this.props.onRender(...args);
  }

  onFinalize(...args) {
    return this.props.onFinalize(...args);
  }

  getHTMLControlValue(id, defaultValue = 1) {
    const element = document.getElementById(id);
    return element ? Number(element.value) : defaultValue;
  }

  setViewParameters() {
    log.removed('AnimationLoop.setViewParameters', 'AnimationLoop.setProps')();
    return this;
  }

  _setupFrame() {
    if (this._onSetupFrame) {
      this._onSetupFrame(this.animationProps);
    } else {
      this._resizeCanvasDrawingBuffer();

      this._resizeViewport();

      this._resizeFramebuffer();
    }
  }

  _renderFrame() {
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

  _initializeCallbackData() {
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

  _updateCallbackData() {
    this.animationProps.needsRedraw = this.needsRedraw;
    this.needsRedraw = null;
    const width = this.gl.drawingBufferWidth;
    const height = this.gl.drawingBufferHeight;

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

  _finalizeCallbackData() {
    this.onFinalize(this.animationProps);
  }

  _addCallbackData(appContext) {
    if (typeof appContext === 'object' && appContext !== null) {
      this.animationProps = Object.assign({}, this.animationProps, appContext);
    }
  }

  _createWebGLContext(opts) {
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

  _createInfoDiv() {
    if (this.gl.canvas && this.props.onAddHTML) {
      const wrapperDiv = document.createElement('div');
      document.body.appendChild(wrapperDiv);
      wrapperDiv.style.position = 'relative';
      const div = document.createElement('div');
      div.style.position = 'absolute';
      div.style.left = '10px';
      div.style.bottom = '10px';
      div.style.width = '300px';
      div.style.background = 'white';
      wrapperDiv.appendChild(this.gl.canvas);
      wrapperDiv.appendChild(div);
      const html = this.props.onAddHTML(div);

      if (html) {
        div.innerHTML = html;
      }
    }
  }

  _resizeViewport() {
    if (this.autoResizeViewport) {
      this.gl.viewport(0, 0, this.gl.drawingBufferWidth, this.gl.drawingBufferHeight);
    }
  }

  _resizeCanvasDrawingBuffer() {
    if (this.autoResizeDrawingBuffer) {
      resizeGLContext(this.gl, {
        useDevicePixels: this.useDevicePixels
      });
    }
  }

  _createFramebuffer() {
    if (this.props.createFramebuffer) {
      this.framebuffer = new Framebuffer(this.gl);
    }
  }

  _resizeFramebuffer() {
    if (this.framebuffer) {
      this.framebuffer.resize({
        width: this.gl.drawingBufferWidth,
        height: this.gl.drawingBufferHeight
      });
    }
  }

  _startEventHandling() {
    this.gl.canvas.addEventListener('mousemove', this._onMousemove);
    this.gl.canvas.addEventListener('mouseleave', this._onMouseleave);
  }

  _onMousemove(e) {
    this.animationProps._mousePosition = [e.offsetX, e.offsetY];
  }

  _onMouseleave(e) {
    this.animationProps._mousePosition = null;
  }

}
//# sourceMappingURL=animation-loop.js.map