import { createGLContext, setParameters } from 'luma.gl';

function glEnumToString(gl, value) {
  if (value === 0) {
    return 'NO_ERROR';
  }

  for (const p in gl) {
    if (gl[p] === value) {
      return p;
    }
  }

  return '0x' + value.toString(16);
}

function glErrorShouldBe(gl, glErrors, opt_msg) {
  if (!glErrors.length) {
    glErrors = [glErrors];
  }

  opt_msg = opt_msg || '';
  const err = gl.getError();
  const ndx = glErrors.indexOf(err);
  const errStrs = [];

  for (let ii = 0; ii < glErrors.length; ++ii) {
    errStrs.push(glEnumToString(gl, glErrors[ii]));
  }

  if (ndx < 0) {
    const msg = `getError expected${glErrors.length > 1 ? ' one of: ' : ': '}`;
    console.error('FAIL ' + msg);
  }
}

export function initializeGL(canvas) {
  const gl = createGLContext(canvas);
  setParameters(gl, {
    viewport: [0, 0, canvas.width, canvas.height],
    clearColor: [0, 0, 0, 1],
    clearDepth: 1
  });
  gl.clear(16384 | 256);
  return gl;
}
export function initializeTexTarget(gl) {
  const framebuffer = gl.createFramebuffer();
  gl.bindFramebuffer(36160, framebuffer);
  framebuffer.width = 10;
  framebuffer.height = 10;
  const tex = gl.createTexture();
  gl.bindTexture(3553, tex);
  gl.texParameteri(3553, 10240, 9728);
  gl.texParameteri(3553, 10241, 9728);
  gl.texImage2D(3553, 0, 34836, framebuffer.width, framebuffer.height, 0, 6408, 5126, null);
  const renderbuffer = gl.createRenderbuffer();
  gl.bindRenderbuffer(36161, renderbuffer);
  gl.renderbufferStorage(36161, 33189, framebuffer.width, framebuffer.height);
  gl.framebufferTexture2D(36160, 36064, 3553, tex, 0);
  gl.framebufferRenderbuffer(36160, 36096, 36161, renderbuffer);
}
export function render(gl) {
  gl.drawArrays(5, 0, 4);
  glErrorShouldBe(gl, 0, 'no error from draw');
}
export function getGPUOutput(gl) {
  const width = gl.canvas.width;
  const height = gl.canvas.height;
  const buf = new Float32Array(width * height * 4);
  gl.readPixels(0, 0, width, height, 6408, 5126, buf);
  return buf;
}
//# sourceMappingURL=gpu-test-utils.js.map