import AnimationLoop from './animation-loop';
import { getPageLoadPromise, createCanvas } from '../webgl-context';
import { requestAnimationFrame, cancelAnimationFrame } from '../webgl-utils';
export default class AnimationLoopProxy {
  static createWorker(opts) {
    return self => {
      self.animationLoop = new AnimationLoop(Object.assign({}, opts, {
        offScreen: true,
        useDevicePixels: false,
        autoResizeDrawingBuffer: false
      }));
      self.canvas = null;
      self.addEventListener('message', evt => {
        const animationLoop = self.animationLoop;

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

  constructor({
    worker,
    onInitialize = () => {},
    onFinalize = () => {},
    useDevicePixels = true,
    autoResizeDrawingBuffer = true
  }) {
    this.props = {
      worker,
      onInitialize,
      onFinalize,
      autoResizeDrawingBuffer,
      useDevicePixels
    };
    this.canvas = null;
    this.width = null;
    this.height = null;
    this._stopped = true;
    this._animationFrameId = null;
    this._startPromise = null;
    this._updateFrame = this._updateFrame.bind(this);
  }

  start(opts = {}) {
    this._stopped = false;

    if (!this._animationFrameId) {
      this._startPromise = getPageLoadPromise().then(() => {
        this._createAndTransferCanvas(opts);

        return this.props.onInitialize(this);
      }).then(() => {
        if (!this._stopped) {
          this._animationFrameId = requestAnimationFrame(this._updateFrame);
        }
      });
    }

    return this;
  }

  stop() {
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

  _updateFrame() {
    this._resizeCanvasDrawingBuffer();

    this._animationFrameId = requestAnimationFrame(this._updateFrame);
  }

  _createAndTransferCanvas(opts) {
    const screenCanvas = createCanvas(opts);

    if (!screenCanvas.transferControlToOffscreen) {
      onError('OffscreenCanvas is not available. Enable Experimental canvas features in chrome://flags');
    }

    const offscreenCanvas = screenCanvas.transferControlToOffscreen();
    this.props.worker.postMessage({
      command: 'start',
      opts: Object.assign({}, opts, {
        canvas: offscreenCanvas
      })
    }, [offscreenCanvas]);
    this.canvas = screenCanvas;
  }

  _resizeCanvasDrawingBuffer() {
    if (this.props.autoResizeDrawingBuffer) {
      const devicePixelRatio = this.props.useDevicePixels ? window.devicePixelRatio || 1 : 1;
      const width = this.canvas.clientWidth * devicePixelRatio;
      const height = this.canvas.clientHeight * devicePixelRatio;

      if (this.width !== width || this.height !== height) {
        this.width = width;
        this.height = height;
        this.props.worker.postMessage({
          command: 'resize',
          width,
          height
        });
      }
    }
  }

}
//# sourceMappingURL=animation-loop-proxy.js.map