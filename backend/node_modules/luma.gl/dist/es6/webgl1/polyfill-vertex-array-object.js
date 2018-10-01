const OES_vertex_array_object = 'OES_vertex_array_object';
const GL_VERTEX_ARRAY_BINDING = 0x85B5;

class VertexAttrib {
  constructor(gl) {
    this.enabled = false;
    this.buffer = null;
    this.size = 4;
    this.type = 5126;
    this.normalized = false;
    this.stride = 16;
    this.offset = 0;
    this.cached = '';
    this.recache();
  }

  recache() {
    this.cached = [this.size, this.type, this.normalized, this.stride, this.offset].join(':');
  }

}

class WebGLVertexArrayObjectOES {
  constructor(ext) {
    const gl = ext.gl;
    this.ext = ext;
    this.isAlive = true;
    this.hasBeenBound = false;
    this.elementArrayBuffer = null;
    this.attribs = new Array(ext.maxVertexAttribs);

    for (let n = 0; n < this.attribs.length; n++) {
      const attrib = new VertexAttrib(gl);
      this.attribs[n] = attrib;
    }

    this.maxAttrib = 0;
  }

}

class OESVertexArrayObject {
  constructor(gl) {
    this.gl = gl;
    wrapGLError(gl);

    this._polyfillWebGLRenderingContext(gl);
  }

  get VERTEX_ARRAY_BINDING_OES() {
    return GL_VERTEX_ARRAY_BINDING;
  }

  createVertexArrayOES() {
    const arrayObject = new WebGLVertexArrayObjectOES(this);
    this.vertexArrayObjects.push(arrayObject);
    return arrayObject;
  }

  deleteVertexArrayOES(arrayObject) {
    arrayObject.isAlive = false;
    this.vertexArrayObjects.splice(this.vertexArrayObjects.indexOf(arrayObject), 1);

    if (this.currentVertexArrayObject === arrayObject) {
      this.bindVertexArrayOES(null);
    }
  }

  isVertexArrayOES(arrayObject) {
    if (arrayObject && arrayObject instanceof WebGLVertexArrayObjectOES) {
      if (arrayObject.hasBeenBound && arrayObject.ext === this) {
        return true;
      }
    }

    return false;
  }

  bindVertexArrayOES(arrayObject) {
    const gl = this.gl;

    if (arrayObject && !arrayObject.isAlive) {
      synthesizeGLError(1282, 'bindVertexArrayOES: attempt to bind deleted arrayObject');
      return;
    }

    const original = this.original;
    const oldVAO = this.currentVertexArrayObject;
    this.currentVertexArrayObject = arrayObject || this.defaultVertexArrayObject;
    this.currentVertexArrayObject.hasBeenBound = true;
    const newVAO = this.currentVertexArrayObject;

    if (oldVAO === newVAO) {
      return;
    }

    if (!oldVAO || newVAO.elementArrayBuffer !== oldVAO.elementArrayBuffer) {
      original.bindBuffer.call(gl, 34963, newVAO.elementArrayBuffer);
    }

    let currentBinding = this.currentArrayBuffer;
    const maxAttrib = Math.max(oldVAO ? oldVAO.maxAttrib : 0, newVAO.maxAttrib);

    for (let n = 0; n <= maxAttrib; n++) {
      const attrib = newVAO.attribs[n];
      const oldAttrib = oldVAO ? oldVAO.attribs[n] : null;

      if (!oldVAO || attrib.enabled !== oldAttrib.enabled) {
        if (attrib.enabled) {
          original.enableVertexAttribArray.call(gl, n);
        } else {
          original.disableVertexAttribArray.call(gl, n);
        }
      }

      if (attrib.enabled) {
        let bufferChanged = false;

        if (!oldVAO || attrib.buffer !== oldAttrib.buffer) {
          if (currentBinding !== attrib.buffer) {
            original.bindBuffer.call(gl, 34962, attrib.buffer);
            currentBinding = attrib.buffer;
          }

          bufferChanged = true;
        }

        if (bufferChanged || attrib.cached !== oldAttrib.cached) {
          original.vertexAttribPointer.call(gl, n, attrib.size, attrib.type, attrib.normalized, attrib.stride, attrib.offset);
        }
      }
    }

    if (this.currentArrayBuffer !== currentBinding) {
      original.bindBuffer.call(gl, 34962, this.currentArrayBuffer);
    }
  }

  _polyfillWebGLRenderingContext(gl) {
    const original = this.original = {
      getParameter: gl.getParameter,
      enableVertexAttribArray: gl.enableVertexAttribArray,
      disableVertexAttribArray: gl.disableVertexAttribArray,
      bindBuffer: gl.bindBuffer,
      getVertexAttrib: gl.getVertexAttrib,
      vertexAttribPointer: gl.vertexAttribPointer
    };
    const self = this;
    Object.assign(gl, {
      getParameter(pname) {
        if (pname === self.VERTEX_ARRAY_BINDING_OES) {
          return self.currentVertexArrayObject === self.defaultVertexArrayObject ? null : self.currentVertexArrayObject;
        }

        return original.getParameter.apply(this, arguments);
      },

      enableVertexAttribArray(index) {
        const vao = self.currentVertexArrayObject;
        vao.maxAttrib = Math.max(vao.maxAttrib, index);
        const attrib = vao.attribs[index];
        attrib.enabled = true;
        return original.enableVertexAttribArray.apply(this, arguments);
      },

      disableVertexAttribArray(index) {
        const vao = self.currentVertexArrayObject;
        vao.maxAttrib = Math.max(vao.maxAttrib, index);
        const attrib = vao.attribs[index];
        attrib.enabled = false;
        return original.disableVertexAttribArray.apply(this, arguments);
      },

      bindBuffer(target, buffer) {
        switch (target) {
          case 34962:
            self.currentArrayBuffer = buffer;
            break;

          case 34963:
            self.currentVertexArrayObject.elementArrayBuffer = buffer;
            break;

          default:
            throw new Error();
        }

        return original.bindBuffer.apply(this, arguments);
      },

      getVertexAttrib(index, pname) {
        const vao = self.currentVertexArrayObject;
        const attrib = vao.attribs[index];

        switch (pname) {
          case 34975:
            return attrib.buffer;

          case 34338:
            return attrib.enabled;

          case 34339:
            return attrib.size;

          case 34340:
            return attrib.stride;

          case 34341:
            return attrib.type;

          case 34922:
            return attrib.normalized;

          default:
            return original.getVertexAttrib.apply(this, arguments);
        }
      },

      vertexAttribPointer(indx, size, type, normalized, stride, offset) {
        const vao = self.currentVertexArrayObject;
        vao.maxAttrib = Math.max(vao.maxAttrib, indx);
        const attrib = vao.attribs[indx];
        attrib.buffer = self.currentArrayBuffer;
        attrib.size = size;
        attrib.type = type;
        attrib.normalized = normalized;
        attrib.stride = stride;
        attrib.offset = offset;
        attrib.recache();
        return original.vertexAttribPointer.apply(this, arguments);
      }

    });

    if (gl.instrumentExtension) {
      gl.instrumentExtension(this, OES_vertex_array_object);
    }

    if (gl.canvas) {
      gl.canvas.addEventListener('webglcontextrestored', function () {
        console.debug('OESVertexArrayObject emulation library context restored');

        self._reset();
      }, true);
    }

    this._reset();
  }

  _reset() {
    const contextWasLost = this.vertexArrayObjects !== undefined;

    if (contextWasLost) {
      for (let ii = 0; ii < this.vertexArrayObjects.length; ++ii) {
        this.vertexArrayObjects.isAlive = false;
      }
    }

    const gl = this.gl;
    this.maxVertexAttribs = gl.getParameter(34921);
    this.defaultVertexArrayObject = new WebGLVertexArrayObjectOES(this);
    this.currentVertexArrayObject = null;
    this.currentArrayBuffer = null;
    this.vertexArrayObjects = [this.defaultVertexArrayObject];
    this.bindVertexArrayOES(null);
  }

}

const glErrorShadow = {};

function synthesizeGLError(err, optionalMessage) {
  glErrorShadow[err] = true;

  if (optionalMessage !== undefined) {
    console.error(optionalMessage);
  }
}

function wrapGLError(gl) {
  const originalFunc = gl.getError;
  Object.assign(gl, {
    getError() {
      let err;

      do {
        err = originalFunc.apply(gl);

        if (err !== 0) {
          glErrorShadow[err] = true;
        }
      } while (err !== 0);

      for (err in glErrorShadow) {
        if (glErrorShadow[err]) {
          delete glErrorShadow[err];
          return parseInt(err, 10);
        }
      }

      return 0;
    }

  });
}

export default function polyfillVertexArrayObject(WebGLRenderingContext, gl) {
  const isWebGL2 = WebGLRenderingContext.VERTEX_ARRAY_BINDING === GL_VERTEX_ARRAY_BINDING;

  if (isWebGL2) {
    return;
  }

  const originalMethods = {};
  const POLYFILL_METHODS = {
    VERTEX_ARRAY_BINDING: GL_VERTEX_ARRAY_BINDING,

    getSupportedExtensions() {
      const list = originalMethods.getSupportedExtensions.call(this) || [];

      if (list.indexOf(OES_vertex_array_object) < 0) {
        list.push(OES_vertex_array_object);
      }

      return list;
    },

    getExtension(name) {
      const ext = originalMethods.getExtension.call(this, name);

      if (ext) {
        return ext;
      }

      if (name !== OES_vertex_array_object) {
        return null;
      }

      if (!this.__OESVertexArrayObject) {
        this.__OESVertexArrayObject = new OESVertexArrayObject(this);
      }

      return this.__OESVertexArrayObject;
    }

  };
  const contextUsesPrototype = Boolean(WebGLRenderingContext.prototype.getExtension);
  const polyfillContext = contextUsesPrototype ? WebGLRenderingContext.prototype : gl;
  Object.assign(originalMethods, {
    getSupportedExtensions: polyfillContext.getSupportedExtensions,
    getExtension: polyfillContext.getExtension
  });

  if (contextUsesPrototype) {
    if (WebGLRenderingContext.prototype.getExtension !== POLYFILL_METHODS.getExtension) {
      Object.assign(WebGLRenderingContext.prototype, POLYFILL_METHODS);
    }
  } else {
    Object.assign(gl, POLYFILL_METHODS);
  }
}
//# sourceMappingURL=polyfill-vertex-array-object.js.map