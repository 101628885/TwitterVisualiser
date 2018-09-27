function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var OES_vertex_array_object = 'OES_vertex_array_object';
var GL_VERTEX_ARRAY_BINDING = 0x85B5;

var VertexAttrib = function () {
  function VertexAttrib(gl) {
    _classCallCheck(this, VertexAttrib);

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

  _createClass(VertexAttrib, [{
    key: "recache",
    value: function recache() {
      this.cached = [this.size, this.type, this.normalized, this.stride, this.offset].join(':');
    }
  }]);

  return VertexAttrib;
}();

var WebGLVertexArrayObjectOES = function WebGLVertexArrayObjectOES(ext) {
  _classCallCheck(this, WebGLVertexArrayObjectOES);

  var gl = ext.gl;
  this.ext = ext;
  this.isAlive = true;
  this.hasBeenBound = false;
  this.elementArrayBuffer = null;
  this.attribs = new Array(ext.maxVertexAttribs);

  for (var n = 0; n < this.attribs.length; n++) {
    var attrib = new VertexAttrib(gl);
    this.attribs[n] = attrib;
  }

  this.maxAttrib = 0;
};

var OESVertexArrayObject = function () {
  function OESVertexArrayObject(gl) {
    _classCallCheck(this, OESVertexArrayObject);

    this.gl = gl;
    wrapGLError(gl);

    this._polyfillWebGLRenderingContext(gl);
  }

  _createClass(OESVertexArrayObject, [{
    key: "createVertexArrayOES",
    value: function createVertexArrayOES() {
      var arrayObject = new WebGLVertexArrayObjectOES(this);
      this.vertexArrayObjects.push(arrayObject);
      return arrayObject;
    }
  }, {
    key: "deleteVertexArrayOES",
    value: function deleteVertexArrayOES(arrayObject) {
      arrayObject.isAlive = false;
      this.vertexArrayObjects.splice(this.vertexArrayObjects.indexOf(arrayObject), 1);

      if (this.currentVertexArrayObject === arrayObject) {
        this.bindVertexArrayOES(null);
      }
    }
  }, {
    key: "isVertexArrayOES",
    value: function isVertexArrayOES(arrayObject) {
      if (arrayObject && arrayObject instanceof WebGLVertexArrayObjectOES) {
        if (arrayObject.hasBeenBound && arrayObject.ext === this) {
          return true;
        }
      }

      return false;
    }
  }, {
    key: "bindVertexArrayOES",
    value: function bindVertexArrayOES(arrayObject) {
      var gl = this.gl;

      if (arrayObject && !arrayObject.isAlive) {
        synthesizeGLError(1282, 'bindVertexArrayOES: attempt to bind deleted arrayObject');
        return;
      }

      var original = this.original;
      var oldVAO = this.currentVertexArrayObject;
      this.currentVertexArrayObject = arrayObject || this.defaultVertexArrayObject;
      this.currentVertexArrayObject.hasBeenBound = true;
      var newVAO = this.currentVertexArrayObject;

      if (oldVAO === newVAO) {
        return;
      }

      if (!oldVAO || newVAO.elementArrayBuffer !== oldVAO.elementArrayBuffer) {
        original.bindBuffer.call(gl, 34963, newVAO.elementArrayBuffer);
      }

      var currentBinding = this.currentArrayBuffer;
      var maxAttrib = Math.max(oldVAO ? oldVAO.maxAttrib : 0, newVAO.maxAttrib);

      for (var n = 0; n <= maxAttrib; n++) {
        var attrib = newVAO.attribs[n];
        var oldAttrib = oldVAO ? oldVAO.attribs[n] : null;

        if (!oldVAO || attrib.enabled !== oldAttrib.enabled) {
          if (attrib.enabled) {
            original.enableVertexAttribArray.call(gl, n);
          } else {
            original.disableVertexAttribArray.call(gl, n);
          }
        }

        if (attrib.enabled) {
          var bufferChanged = false;

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
  }, {
    key: "_polyfillWebGLRenderingContext",
    value: function _polyfillWebGLRenderingContext(gl) {
      var original = this.original = {
        getParameter: gl.getParameter,
        enableVertexAttribArray: gl.enableVertexAttribArray,
        disableVertexAttribArray: gl.disableVertexAttribArray,
        bindBuffer: gl.bindBuffer,
        getVertexAttrib: gl.getVertexAttrib,
        vertexAttribPointer: gl.vertexAttribPointer
      };
      var self = this;
      Object.assign(gl, {
        getParameter: function getParameter(pname) {
          if (pname === self.VERTEX_ARRAY_BINDING_OES) {
            return self.currentVertexArrayObject === self.defaultVertexArrayObject ? null : self.currentVertexArrayObject;
          }

          return original.getParameter.apply(this, arguments);
        },
        enableVertexAttribArray: function enableVertexAttribArray(index) {
          var vao = self.currentVertexArrayObject;
          vao.maxAttrib = Math.max(vao.maxAttrib, index);
          var attrib = vao.attribs[index];
          attrib.enabled = true;
          return original.enableVertexAttribArray.apply(this, arguments);
        },
        disableVertexAttribArray: function disableVertexAttribArray(index) {
          var vao = self.currentVertexArrayObject;
          vao.maxAttrib = Math.max(vao.maxAttrib, index);
          var attrib = vao.attribs[index];
          attrib.enabled = false;
          return original.disableVertexAttribArray.apply(this, arguments);
        },
        bindBuffer: function bindBuffer(target, buffer) {
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
        getVertexAttrib: function getVertexAttrib(index, pname) {
          var vao = self.currentVertexArrayObject;
          var attrib = vao.attribs[index];

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
        vertexAttribPointer: function vertexAttribPointer(indx, size, type, normalized, stride, offset) {
          var vao = self.currentVertexArrayObject;
          vao.maxAttrib = Math.max(vao.maxAttrib, indx);
          var attrib = vao.attribs[indx];
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
  }, {
    key: "_reset",
    value: function _reset() {
      var contextWasLost = this.vertexArrayObjects !== undefined;

      if (contextWasLost) {
        for (var ii = 0; ii < this.vertexArrayObjects.length; ++ii) {
          this.vertexArrayObjects.isAlive = false;
        }
      }

      var gl = this.gl;
      this.maxVertexAttribs = gl.getParameter(34921);
      this.defaultVertexArrayObject = new WebGLVertexArrayObjectOES(this);
      this.currentVertexArrayObject = null;
      this.currentArrayBuffer = null;
      this.vertexArrayObjects = [this.defaultVertexArrayObject];
      this.bindVertexArrayOES(null);
    }
  }, {
    key: "VERTEX_ARRAY_BINDING_OES",
    get: function get() {
      return GL_VERTEX_ARRAY_BINDING;
    }
  }]);

  return OESVertexArrayObject;
}();

var glErrorShadow = {};

function synthesizeGLError(err, optionalMessage) {
  glErrorShadow[err] = true;

  if (optionalMessage !== undefined) {
    console.error(optionalMessage);
  }
}

function wrapGLError(gl) {
  var originalFunc = gl.getError;
  Object.assign(gl, {
    getError: function getError() {
      var err;

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
  var isWebGL2 = WebGLRenderingContext.VERTEX_ARRAY_BINDING === GL_VERTEX_ARRAY_BINDING;

  if (isWebGL2) {
    return;
  }

  var originalMethods = {};
  var POLYFILL_METHODS = {
    VERTEX_ARRAY_BINDING: GL_VERTEX_ARRAY_BINDING,
    getSupportedExtensions: function getSupportedExtensions() {
      var list = originalMethods.getSupportedExtensions.call(this) || [];

      if (list.indexOf(OES_vertex_array_object) < 0) {
        list.push(OES_vertex_array_object);
      }

      return list;
    },
    getExtension: function getExtension(name) {
      var ext = originalMethods.getExtension.call(this, name);

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
  var contextUsesPrototype = Boolean(WebGLRenderingContext.prototype.getExtension);
  var polyfillContext = contextUsesPrototype ? WebGLRenderingContext.prototype : gl;
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