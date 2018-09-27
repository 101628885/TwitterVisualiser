function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

import AnimationLoop from './animation-loop';
import { getPageLoadPromise, createCanvas } from '../webgl-context';
import { requestAnimationFrame, cancelAnimationFrame } from '../webgl-utils';

var AnimationLoopProxy = function () {
  _createClass(AnimationLoopProxy, null, [{
    key: "createWorker",
    value: function createWorker(opts) {
      return function (self) {
        self.animationLoop = new AnimationLoop(Object.assign({}, opts, {
          offScreen: true,
          useDevicePixels: false,
          autoResizeDrawingBuffer: false
        }));
        self.canvas = null;
        self.addEventListener('message', function (evt) {
          var animationLoop = self.animationLoop;

          switch (evt.data.command) {
            case 'start':
              self.canvas = evt.data.opts.canvas;
              animationLoop.start(evt.data.opts);
              break;

            case 'stop':
              animationLoop.stop();
              break;

            case 'resize':
              self.canvas.width = evt.data.width;
              self.canvas.height = evt.data.height;
              break;

            default:
          }
        });
      };
    }
  }]);

  function AnimationLoopProxy(_ref) {
    var worker = _ref.worker,
        _ref$onInitialize = _ref.onInitialize,
        onInitialize = _ref$onInitialize === void 0 ? function () {} : _ref$onInitialize,
        _ref$onFinalize = _ref.onFinalize,
        onFinalize = _ref$onFinalize === void 0 ? function () {} : _ref$onFinalize,
        _ref$useDevicePixels = _ref.useDevicePixels,
        useDevicePixels = _ref$useDevicePixels === void 0 ? true : _ref$useDevicePixels,
        _ref$autoResizeDrawin = _ref.autoResizeDrawingBuffer,
        autoResizeDrawingBuffer = _ref$autoResizeDrawin === void 0 ? true : _ref$autoResizeDrawin;

    _classCallCheck(this, AnimationLoopProxy);

    this.props = {
      worker: worker,
      onInitialize: onInitialize,
      onFinalize: onFinalize,
      autoResizeDrawingBuffer: autoResizeDrawingBuffer,
      useDevicePixels: useDevicePixels
    };
    this.canvas = null;
    this.width = null;
    this.height = null;
    this._stopped = true;
    this._animationFrameId = null;
    this._startPromise = null;
    this._updateFrame = this._updateFrame.bind(this);
  }

  _createClass(AnimationLoopProxy, [{
    key: "start",
    value: function start() {
      var _this = this;

      var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      this._stopped = false;

      if (!this._animationFrameId) {
        this._startPromise = getPageLoadPromise().then(function () {
          _this._createAndTransferCanvas(opts);

          return _this.props.onInitialize(_this);
        }).then(function () {
          if (!_this._stopped) {
            _this._animationFrameId = requestAnimationFrame(_this._updateFrame);
          }
        });
      }

      return this;
    }
  }, {
    key: "stop",
    value: function stop() {
      if (this._animationFrameId) {
        cancelAnimationFrame(this._animationFrameId);
        this._animationFrameId = null;
        this._stopped = true;
        this.props.onFinalize(this);
      }

      this.props.worker.postMessage({
        command: 'stop'
      });
      return this;
    }
  }, {
    key: "_updateFrame",
    value: function _updateFrame() {
      this._resizeCanvasDrawingBuffer();

      this._animationFrameId = requestAnimationFrame(this._updateFrame);
    }
  }, {
    key: "_createAndTransferCanvas",
    value: function _createAndTransferCanvas(opts) {
      var screenCanvas = createCanvas(opts);

      if (!screenCanvas.transferControlToOffscreen) {
        onError('OffscreenCanvas is not available. Enable Experimental canvas features in chrome://flags');
      }

      var offscreenCanvas = screenCanvas.transferControlToOffscreen();
      this.props.worker.postMessage({
        command: 'start',
        opts: Object.assign({}, opts, {
          canvas: offscreenCanvas
        })
      }, [offscreenCanvas]);
      this.canvas = screenCanvas;
    }
  }, {
    key: "_resizeCanvasDrawingBuffer",
    value: function _resizeCanvasDrawingBuffer() {
      if (this.props.autoResizeDrawingBuffer) {
        var devicePixelRatio = this.props.useDevicePixels ? window.devicePixelRatio || 1 : 1;
        var width = this.canvas.clientWidth * devicePixelRatio;
        var height = this.canvas.clientHeight * devicePixelRatio;

        if (this.width !== width || this.height !== height) {
          this.width = width;
          this.height = height;
          this.props.worker.postMessage({
            command: 'resize',
            width: width,
            height: height
          });
        }
      }
    }
  }]);

  return AnimationLoopProxy;
}();

export { AnimationLoopProxy as default };
//# sourceMappingURL=animation-loop-proxy.js.map