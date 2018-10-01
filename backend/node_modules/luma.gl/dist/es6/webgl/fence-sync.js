import Resource from './resource';
import { assertWebGL2Context } from '../webgl-utils';
import queryManager from '../webgl-utils/query-manager';
export default class FenceSync extends Resource {
  constructor(gl, opts) {
    assertWebGL2Context(gl);
    super(gl, opts);
    this.promise = null;
    Object.seal(this);
  }

  wait({
    flags = 0,
    timeout = -1
  } = {}) {
    this.gl.waitSync(this.handle, flags, timeout);
    return this;
  }

  clientWait({
    flags = 1,
    timeout
  }) {
    const result = this.gl.clientWaitSync(this.handle, flags, timeout);

    switch (result) {
      case 37146:
        break;

      case 37147:
        break;

      case 37148:
        break;

      case 37149:
        break;

      default:
    }

    return result;
  }

  cancel() {
    queryManager.cancelQuery(this);
  }

  isSignaled() {
    return this.getParameter(37140) === 37145;
  }

  isResultAvailable() {
    return this.isSignaled();
  }

  getResult() {
    return this.isSignaled();
  }

  getParameter(pname) {
    return this.gl.getSyncParameter(this.handle, pname);
  }

  _createHandle() {
    return this.gl.fenceSync(37143, 0);
  }

  _deleteHandle() {
    queryManager.deleteQuery(this);
    this.gl.deleteSync(this.handle);
  }

}
//# sourceMappingURL=fence-sync.js.map