import { isWebGL2 } from '../webgl-utils';
import Resource from './resource';
import assert from '../utils/assert';
const GL_RENDERBUFFER = 0x8D41;
const GL_SAMPLES = 0x80A9;
const GL_RENDERBUFFER_WIDTH = 0x8D42;
const GL_RENDERBUFFER_HEIGHT = 0x8D43;
const GL_RENDERBUFFER_INTERNAL_FORMAT = 0x8D44;
const GL_RENDERBUFFER_SAMPLES = 0x8CAB;
const CB_FLOAT_WEBGL2 = 'EXT_color_buffer_float';
export const RENDERBUFFER_FORMATS = {
  [33189]: {},
  [33190]: {
    gl2: true
  },
  [36012]: {
    gl2: true
  },
  [36168]: {},
  [34041]: {},
  [35056]: {
    gl2: true
  },
  [36013]: {
    gl2: true
  },
  [32854]: {},
  [36194]: {},
  [32855]: {},
  [33321]: {
    gl2: true
  },
  [33330]: {
    gl2: true
  },
  [33329]: {
    gl2: true
  },
  [33332]: {
    gl2: true
  },
  [33331]: {
    gl2: true
  },
  [33334]: {
    gl2: true
  },
  [33333]: {
    gl2: true
  },
  [33323]: {
    gl2: true
  },
  [33336]: {
    gl2: true
  },
  [33335]: {
    gl2: true
  },
  [33338]: {
    gl2: true
  },
  [33337]: {
    gl2: true
  },
  [33340]: {
    gl2: true
  },
  [33339]: {
    gl2: true
  },
  [32849]: {
    gl2: true
  },
  [32856]: {
    gl2: true
  },
  [32857]: {
    gl2: true
  },
  [36220]: {
    gl2: true
  },
  [36238]: {
    gl2: true
  },
  [36975]: {
    gl2: true
  },
  [36214]: {
    gl2: true
  },
  [36232]: {
    gl2: true
  },
  [36226]: {
    gl2: true
  },
  [36208]: {
    gl2: true
  },
  [33325]: {
    gl2: CB_FLOAT_WEBGL2
  },
  [33327]: {
    gl2: CB_FLOAT_WEBGL2
  },
  [34842]: {
    gl2: CB_FLOAT_WEBGL2
  },
  [33326]: {
    gl2: CB_FLOAT_WEBGL2
  },
  [33328]: {
    gl2: CB_FLOAT_WEBGL2
  },
  [34836]: {
    gl2: CB_FLOAT_WEBGL2
  },
  [35898]: {
    gl2: CB_FLOAT_WEBGL2
  }
};

function isFormatSupported(gl, format, formats) {
  const info = formats[format];

  if (!info) {
    return false;
  }

  const value = isWebGL2(gl) ? info.gl2 || info.gl1 : info.gl1;

  if (typeof value === 'string') {
    return gl.getExtension(value);
  }

  return value;
}

export default class Renderbuffer extends Resource {
  static isSupported(gl, {
    format
  } = {}) {
    return !format || isFormatSupported(gl, format, RENDERBUFFER_FORMATS);
  }

  static getSamplesForFormat(gl, {
    format
  }) {
    return gl.getInternalformatParameter(GL_RENDERBUFFER, format, GL_SAMPLES);
  }

  constructor(gl, opts = {}) {
    super(gl, opts);
    this.initialize(opts);
    Object.seal(this);
  }

  initialize({
    format,
    width = 1,
    height = 1,
    samples = 0
  }) {
    assert(format, 'Needs format');
    this.gl.bindRenderbuffer(GL_RENDERBUFFER, this.handle);

    if (samples !== 0 && isWebGL2(this.gl)) {
      this.gl.renderbufferStorageMultisample(GL_RENDERBUFFER, samples, format, width, height);
    } else {
      this.gl.renderbufferStorage(GL_RENDERBUFFER, format, width, height);
    }

    this.format = format;
    this.width = width;
    this.height = height;
    this.samples = samples;
    return this;
  }

  resize({
    width,
    height
  }) {
    if (width !== this.width || height !== this.height) {
      return this.initialize({
        width,
        height,
        format: this.format,
        samples: this.samples
      });
    }

    return this;
  }

  _createHandle() {
    return this.gl.createRenderbuffer();
  }

  _deleteHandle() {
    this.gl.deleteRenderbuffer(this.handle);
  }

  _bindHandle(handle) {
    this.gl.bindRenderbuffer(GL_RENDERBUFFER, handle);
  }

  _syncHandle(handle) {
    this.format = this.getParameter(GL_RENDERBUFFER_INTERNAL_FORMAT);
    this.width = this.getParameter(GL_RENDERBUFFER_WIDTH);
    this.height = this.getParameter(GL_RENDERBUFFER_HEIGHT);
    this.samples = this.getParameter(GL_RENDERBUFFER_SAMPLES);
  }

  _getParameter(pname) {
    this.gl.bindRenderbuffer(GL_RENDERBUFFER, this.handle);
    const value = this.gl.getRenderbufferParameter(GL_RENDERBUFFER, pname);
    return value;
  }

}
//# sourceMappingURL=renderbuffer.js.map