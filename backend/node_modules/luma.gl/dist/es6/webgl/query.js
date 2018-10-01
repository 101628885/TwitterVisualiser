import Resource from './resource';
import { FEATURES, hasFeatures } from '../webgl-context/context-features';
import { isWebGL2 } from '../webgl-utils';
import queryManager from '../webgl-utils/query-manager';
import assert from '../utils/assert';

const noop = x => x;

const ERR_GPU_DISJOINT = 'Disjoint GPU operation invalidated timer queries';
const ERR_TIMER_QUERY_NOT_SUPPORTED = 'Timer queries require "EXT_disjoint_timer_query" extension';
const GL_QUERY_COUNTER_BITS_EXT = 0x8864;
const GL_QUERY_RESULT = 0x8866;
const GL_QUERY_RESULT_AVAILABLE = 0x8867;
const GL_TIME_ELAPSED_EXT = 0x88BF;
const GL_TIMESTAMP_EXT = 0x8E28;
const GL_GPU_DISJOINT_EXT = 0x8FBB;
const GL_TRANSFORM_FEEDBACK_PRIMITIVES_WRITTEN = 0x8C88;
const GL_ANY_SAMPLES_PASSED = 0x8C2F;
const GL_ANY_SAMPLES_PASSED_CONSERVATIVE = 0x8D6A;
export default class Query extends Resource {
  static isSupported(gl, opts = []) {
    const webgl2 = isWebGL2(gl);
    const hasTimerQuery = hasFeatures(gl, FEATURES.TIMER_QUERY);
    let supported = webgl2 || hasTimerQuery;

    for (const key of opts) {
      switch (key) {
        case 'queries':
          supported = supported && webgl2;
          break;

        case 'timers':
          supported = supported && hasTimerQuery;
          break;

        case 'timestamps':
          const queryCounterBits = hasTimerQuery ? gl.getQuery(GL_TIMESTAMP_EXT, GL_QUERY_COUNTER_BITS_EXT) : 0;
          supported = supported && queryCounterBits > 0;
          break;

        default:
          assert(false);
      }
    }

    return supported;
  }

  constructor(gl, opts = {}) {
    super(gl, opts);
    const _opts$onComplete = opts.onComplete,
          onComplete = _opts$onComplete === void 0 ? noop : _opts$onComplete,
          _opts$onError = opts.onError,
          onError = _opts$onError === void 0 ? noop : _opts$onError;
    this.target = null;
    this.onComplete = onComplete;
    this.onError = onError;
    this.promise = null;
    Object.seal(this);
  }

  beginTimeElapsedQuery() {
    return this.begin(GL_TIME_ELAPSED_EXT);
  }

  beginOcclusionQuery({
    conservative = false
  } = {}) {
    return this.begin(conservative ? GL_ANY_SAMPLES_PASSED_CONSERVATIVE : GL_ANY_SAMPLES_PASSED);
  }

  beginTransformFeedbackQuery() {
    return this.begin(GL_TRANSFORM_FEEDBACK_PRIMITIVES_WRITTEN);
  }

  getTimestamp() {
    queryManager.beginQuery(this, this.onComplete, this.onError);

    try {
      this.gl.queryCounter(this.handle, GL_TIMESTAMP_EXT);
    } catch (error) {
      queryManager.rejectQuery(this, ERR_TIMER_QUERY_NOT_SUPPORTED);
    }

    return this;
  }

  begin(target) {
    queryManager.beginQuery(this, this.onComplete, this.onError);
    this.target = target;

    try {
      this.gl.beginQuery(this.target, this.handle);
    } catch (error) {
      queryManager.rejectQuery(this, 'Query not supported');
    }

    return this;
  }

  end() {
    if (this.target) {
      this.ext.endQuery(this.target);
      this.target = null;
    }

    return this;
  }

  cancel() {
    this.end();
    queryManager.cancelQuery(this);
    return this;
  }

  isResultAvailable() {
    return this.gl.getQueryParameter(this.handle, GL_QUERY_RESULT_AVAILABLE);
  }

  getResult() {
    const result = this.gl.getQueryParameter(this.handle, GL_QUERY_RESULT);
    return Number.isFinite(result) ? result / 1e6 : 0;
  }

  static poll(gl) {
    queryManager.poll(gl);
  }

  _createHandle() {
    return Query.isSupported(this.gl) ? this.gl.createQuery() : null;
  }

  _deleteHandle() {
    queryManager.deleteQuery(this);
    this.gl.deleteQuery(this.handle);
  }

}
queryManager.setInvalidator({
  queryType: Query,
  errorMessage: ERR_GPU_DISJOINT,
  checkInvalid: gl => gl.getParameter(GL_GPU_DISJOINT_EXT)
});
//# sourceMappingURL=query.js.map