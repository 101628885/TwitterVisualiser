import Attribute from './attribute';
import Object3D from './object-3d';
import { getDrawMode } from '../geometry/geometry';
import { Buffer, Query, Program, TransformFeedback, VertexArray, clear } from '../webgl';
import { isWebGL } from '../webgl-utils';
import { MODULAR_SHADERS } from '../shadertools/src/shaders';
import { assembleShaders } from '../shadertools/src';
import { addModel, removeModel, logModel, getOverrides } from '../debug/seer-integration';
import { getDebugTableForUniforms } from '../webgl-debug/debug-uniforms';
import { getDebugTableForVertexArray } from '../webgl-debug/debug-vertex-array';
import { getDebugTableForProgramConfiguration } from '../webgl-debug/debug-program-configuration';
import { log, isObjectEmpty } from '../utils';
import assert from '../utils/assert';
const ERR_MODEL_PARAMS = 'Model needs drawMode and vertexCount';
const LOG_DRAW_PRIORITY = 2;
const LOG_DRAW_TIMEOUT = 10000;
const DEPRECATED_PICKING_UNIFORMS = ['renderPickingBuffer', 'pickingEnabled'];
export default class Model extends Object3D {
  constructor(gl, props = {}) {
    super(props);
    assert(isWebGL(gl));
    this.gl = gl;
    this.lastLogTime = 0;
    this.initialize(props);
  }

  initialize(props = {}) {
    this.props = {};
    this.program = this._createProgram(props);
    this.vertexArray = new VertexArray(this.gl, {
      program: this.program
    });
    this.userData = {};
    this.needsRedraw = true;
    this._attributes = {};
    this.attributes = {};
    this.animatedUniforms = {};
    this.animated = false;
    this.animationLoop = null;
    this.timerQueryEnabled = false;
    this.timeElapsedQuery = undefined;
    this.lastQueryReturned = true;
    this.stats = {
      accumulatedFrameTime: 0,
      averageFrameTime: 0,
      profileFrameCount: 0
    };
    this.pickable = true;
    this.setProps(props);
    this.setUniforms(Object.assign({}, this.getModuleUniforms(), this.getModuleUniforms(props.moduleSettings)));
    this.isInstanced = props.isInstanced || props.instanced;

    this.onBeforeRender = props.onBeforeRender || (() => {});

    this.onAfterRender = props.onAfterRender || (() => {});

    assert(this.drawMode !== undefined && Number.isFinite(this.vertexCount), ERR_MODEL_PARAMS);
  }

  setProps(props) {
    Object.assign(this.props, props);

    if ('instanceCount' in props) {
      this.instanceCount = props.instanceCount;
    }

    if ('geometry' in props) {
      this.setGeometry(props.geometry);
    }

    if ('attributes' in props) {
      this.setAttributes(props.attributes);
    }

    if ('uniforms' in props) {
      this.setUniforms(props.uniforms, props.samplers);
    }

    if ('pickable' in props) {
      this.pickable = props.pickable;
    }

    if ('timerQueryEnabled' in props) {
      this.timerQueryEnabled = props.timerQueryEnabled && Query.isSupported(this.gl, ['timers']);

      if (props.timerQueryEnabled && !this.timerQueryEnabled) {
        log.warn('GPU timer not supported')();
      }
    }

    if ('_feedbackBuffers' in props) {
      this._setFeedbackBuffers(props._feedbackBuffers);
    }

    if ('_animationProps' in props) {
      this._setAnimationProps(props._animationProps);
    }

    if ('_animationLoop' in props) {
      this.animationLoop = props._animationLoop;
    }
  }

  delete() {
    for (const key in this._attributes) {
      if (this._attributes[key] !== this.attributes[key]) {
        this._attributes[key].delete();
      }
    }

    this.program.delete();
    this.vertexArray.delete();
    removeModel(this.id);
  }

  destroy() {
    this.delete();
  }

  get vertexCount() {
    if (Number.isFinite(this.props.vertexCount)) {
      return this.props.vertexCount;
    }

    return this.geometry && this.geometry.getVertexCount();
  }

  get drawMode() {
    if (Number.isFinite(this.props.drawMode)) {
      return this.props.drawMode;
    }

    return this.geometry && this.geometry.drawMode;
  }

  getNeedsRedraw({
    clearRedrawFlags = false
  } = {}) {
    let redraw = false;
    redraw = redraw || this.needsRedraw;
    this.needsRedraw = this.needsRedraw && !clearRedrawFlags;

    if (this.geometry) {
      redraw = redraw || this.geometry.getNeedsRedraw({
        clearRedrawFlags
      });
    }

    if (this.animated) {
      redraw = redraw || `animated model ${this.id}`;
    }

    return redraw;
  }

  getDrawMode() {
    return this.drawMode;
  }

  getVertexCount() {
    return this.vertexCount;
  }

  getInstanceCount() {
    return this.instanceCount;
  }

  getProgram() {
    return this.program;
  }

  getAttributes() {
    return this.attributes;
  }

  getUniforms() {
    return this.program.getUniforms;
  }

  setNeedsRedraw(redraw = true) {
    this.needsRedraw = redraw;
    return this;
  }

  setDrawMode(drawMode) {
    this.props.drawMode = getDrawMode(drawMode);
    return this;
  }

  setVertexCount(vertexCount) {
    assert(Number.isFinite(vertexCount));
    this.props.vertexCount = vertexCount;
    return this;
  }

  setInstanceCount(instanceCount) {
    assert(Number.isFinite(instanceCount));
    this.instanceCount = instanceCount;
    return this;
  }

  setGeometry(geometry) {
    this.geometry = geometry;

    const buffers = this._createBuffersFromAttributeDescriptors(this.geometry.getAttributes());

    this.vertexArray.setAttributes(buffers);
    this.setNeedsRedraw();
    return this;
  }

  setAttributes(attributes = {}) {
    if (isObjectEmpty(attributes)) {
      return this;
    }

    Object.assign(this.attributes, attributes);

    const buffers = this._createBuffersFromAttributeDescriptors(attributes);

    this.vertexArray.setAttributes(buffers);
    this.setNeedsRedraw();
    return this;
  }

  setUniforms(uniforms = {}, samplers = {}) {
    uniforms = Object.assign({}, uniforms);
    getOverrides(this.id, uniforms);
    uniforms = this._extractAnimatedUniforms(uniforms);
    this.program.setUniforms(uniforms, samplers, () => {
      this._checkForDeprecatedUniforms(uniforms);

      this.setNeedsRedraw();
    });
  }

  _setAnimationProps(animationProps) {
    if (this.animated) {
      assert(animationProps, 'Model.draw(): animated uniforms but no animationProps');

      const animatedUniforms = this._evaluateAnimateUniforms(animationProps);

      this.program.setUniforms(animatedUniforms, {}, () => {
        this._checkForDeprecatedUniforms(animatedUniforms);

        this.setNeedsRedraw();
      });
    }
  }

  updateModuleSettings(opts) {
    const uniforms = this.getModuleUniforms(opts || {});
    return this.setUniforms(uniforms);
  }

  clear(opts) {
    clear(this.program.gl, opts);
    return this;
  }

  draw(opts = {}) {
    const _opts$moduleSettings = opts.moduleSettings,
          moduleSettings = _opts$moduleSettings === void 0 ? null : _opts$moduleSettings,
          framebuffer = opts.framebuffer,
          _opts$uniforms = opts.uniforms,
          uniforms = _opts$uniforms === void 0 ? {} : _opts$uniforms,
          _opts$attributes = opts.attributes,
          attributes = _opts$attributes === void 0 ? {} : _opts$attributes,
          _opts$samplers = opts.samplers,
          samplers = _opts$samplers === void 0 ? {} : _opts$samplers,
          _opts$transformFeedba = opts.transformFeedback,
          transformFeedback = _opts$transformFeedba === void 0 ? this.transformFeedback : _opts$transformFeedba,
          _opts$parameters = opts.parameters,
          parameters = _opts$parameters === void 0 ? {} : _opts$parameters,
          _opts$vertexArray = opts.vertexArray,
          vertexArray = _opts$vertexArray === void 0 ? this.vertexArray : _opts$vertexArray,
          animationProps = opts.animationProps;
    addModel(this);
    this.setAttributes(attributes);
    this.updateModuleSettings(moduleSettings);
    this.setUniforms(uniforms, samplers);

    this._refreshAnimationProps(animationProps);

    const logPriority = this._logDrawCallStart(2);

    const drawParams = this.vertexArray.getDrawParams(this.props);

    if (drawParams.isInstanced && !this.isInstanced) {
      log.warn('Found instanced attributes on non-instanced model', this.id)();
    }

    const isIndexed = drawParams.isIndexed,
          indexType = drawParams.indexType;
    const isInstanced = this.isInstanced,
          instanceCount = this.instanceCount;
    this.onBeforeRender();

    this._timerQueryStart();

    this.program.draw(Object.assign({}, opts, {
      logPriority,
      uniforms: null,
      framebuffer,
      parameters,
      drawMode: this.getDrawMode(),
      vertexCount: this.getVertexCount(),
      vertexArray,
      transformFeedback,
      isIndexed,
      indexType,
      isInstanced,
      instanceCount
    }));

    this._timerQueryEnd();

    this.onAfterRender();
    this.setNeedsRedraw(false);

    this._logDrawCallEnd(logPriority, vertexArray, framebuffer);

    return this;
  }

  transform(opts = {}) {
    const _opts$discard = opts.discard,
          discard = _opts$discard === void 0 ? true : _opts$discard,
          feedbackBuffers = opts.feedbackBuffers,
          _opts$unbindModels = opts.unbindModels,
          unbindModels = _opts$unbindModels === void 0 ? [] : _opts$unbindModels;
    let parameters = opts.parameters;

    if (feedbackBuffers) {
      this._setFeedbackBuffers(feedbackBuffers);
    }

    if (discard) {
      parameters = Object.assign({}, parameters, {
        [35977]: discard
      });
    }

    unbindModels.forEach(model => model.vertexArray.unbindBuffers());

    try {
      this.draw(Object.assign({}, opts, {
        parameters
      }));
    } finally {
      unbindModels.forEach(model => model.vertexArray.bindBuffers());
    }

    return this;
  }

  render(uniforms = {}) {
    assert(arguments.length <= 1);
    return this.draw({
      uniforms
    });
  }

  _createProgram({
    vs = null,
    fs = null,
    modules = null,
    defines = {},
    inject = {},
    shaderCache = null,
    varyings = null,
    bufferMode = 35981,
    program = null
  }) {
    this.getModuleUniforms = x => {};

    const id = this.id;

    if (!program) {
      vs = vs || MODULAR_SHADERS.vs;
      fs = fs || MODULAR_SHADERS.fs;
      const assembleResult = assembleShaders(this.gl, {
        vs,
        fs,
        modules,
        inject,
        defines,
        log
      });
      vs = assembleResult.vs;
      fs = assembleResult.fs;

      if (shaderCache) {
        program = shaderCache.getProgram(this.gl, {
          id,
          vs,
          fs
        });
      } else {
        program = new Program(this.gl, {
          id,
          vs,
          fs,
          varyings,
          bufferMode
        });
      }

      this.getModuleUniforms = assembleResult.getUniforms || (x => {});
    }

    assert(program instanceof Program, 'Model needs a program');
    return program;
  }

  _checkForDeprecatedUniforms(uniforms) {
    DEPRECATED_PICKING_UNIFORMS.forEach(uniform => {
      if (uniform in uniforms) {
        log.deprecated(uniform, 'use picking shader module and Model class updateModuleSettings()')();
      }
    });
  }

  _refreshAnimationProps(animationProps) {
    animationProps = animationProps || this.animationLoop && this.animationLoop.animationProps;

    if (animationProps) {
      this._setAnimationProps(animationProps);
    }
  }

  _evaluateAnimateUniforms(animationProps) {
    if (!this.animated) {
      return {};
    }

    const animatedUniforms = {};

    for (const uniformName in this.animatedUniforms) {
      const valueFunction = this.animatedUniforms[uniformName];
      animatedUniforms[uniformName] = valueFunction(animationProps);
    }

    return animatedUniforms;
  }

  _extractAnimatedUniforms(uniforms) {
    let foundAnimated = false;

    for (const uniformName in uniforms) {
      const newValue = uniforms[uniformName];

      if (typeof newValue === 'function') {
        this.animatedUniforms[uniformName] = newValue;
        foundAnimated = true;
      } else {
        delete this.animatedUniforms[uniformName];
      }
    }

    this.animated = !isObjectEmpty(this.animatedUniforms);

    if (!foundAnimated) {
      return uniforms;
    }

    const staticUniforms = {};

    for (const uniformName in uniforms) {
      if (!this.animatedUniforms[uniformName]) {
        staticUniforms[uniformName] = uniforms[uniformName];
      }
    }

    return staticUniforms;
  }

  _setFeedbackBuffers(feedbackBuffers = {}) {
    if (isObjectEmpty(feedbackBuffers)) {
      return this;
    }

    const gl = this.program.gl;
    this.transformFeedback = this.transformFeedback || new TransformFeedback(gl, {
      program: this.program
    });
    this.transformFeedback.setBuffers(feedbackBuffers);
    this.setNeedsRedraw();
    return this;
  }

  _timerQueryStart() {
    if (this.timerQueryEnabled === true) {
      if (!this.timeElapsedQuery) {
        this.timeElapsedQuery = new Query(this.gl);
      }

      if (this.lastQueryReturned) {
        this.lastQueryReturned = false;
        this.timeElapsedQuery.beginTimeElapsedQuery();
      }
    }
  }

  _timerQueryEnd() {
    if (this.timerQueryEnabled === true) {
      this.timeElapsedQuery.end();

      if (this.timeElapsedQuery.isResultAvailable()) {
        this.lastQueryReturned = true;
        const elapsedTime = this.timeElapsedQuery.getResult();
        this.stats.lastFrameTime = elapsedTime;
        this.stats.accumulatedFrameTime += elapsedTime;
        this.stats.profileFrameCount++;
        this.stats.averageFrameTime = this.stats.accumulatedFrameTime / this.stats.profileFrameCount;
        log.log(LOG_DRAW_PRIORITY, `\
GPU time ${this.program.id}: ${this.stats.lastFrameTime}ms \
average ${this.stats.averageFrameTime}ms \
accumulated: ${this.stats.accumulatedFrameTime}ms \
count: ${this.stats.profileFrameCount}`)();
      }
    }
  }

  _createBuffersFromAttributeDescriptors(attributes) {
    const gl = this.program.gl;
    const buffers = {};

    for (const attributeName in attributes) {
      const descriptor = attributes[attributeName];
      let attribute = this._attributes[attributeName];

      if (descriptor instanceof Attribute) {
        attribute = descriptor;
      } else if (descriptor instanceof Buffer) {
        attribute = attribute || new Attribute(gl, Object.assign({}, descriptor, descriptor.layout, {
          id: attributeName
        }));
        attribute.update({
          buffer: descriptor
        });
      } else if (attribute) {
        attribute.update(descriptor);
      } else {
        attribute = new Attribute(gl, Object.assign({}, descriptor, {
          id: attributeName
        }));
      }

      this._attributes[attributeName] = attribute;
      buffers[attributeName] = attribute.getValue();
    }

    return buffers;
  }

  _logDrawCallStart(priority) {
    const logDrawTimeout = priority > 3 ? 0 : LOG_DRAW_TIMEOUT;

    if (log.priority < priority || Date.now() - this.lastLogTime < logDrawTimeout) {
      return undefined;
    }

    this.lastLogTime = Date.now();
    log.group(LOG_DRAW_PRIORITY, `>>> DRAWING MODEL ${this.id}`, {
      collapsed: log.priority <= 2
    })();
    return priority;
  }

  _logDrawCallEnd(priority, vertexArray, uniforms, framebuffer) {
    if (priority === undefined) {
      return;
    }

    const attributeTable = getDebugTableForVertexArray({
      vertexArray,
      header: `${this.id} attributes`,
      attributes: this._attributes
    });

    const _getDebugTableForUnif = getDebugTableForUniforms({
      header: `${this.id} uniforms`,
      program: this.program,
      uniforms: Object.assign({}, this.program.uniforms, uniforms)
    }),
          uniformTable = _getDebugTableForUnif.table,
          unusedTable = _getDebugTableForUnif.unusedTable,
          unusedCount = _getDebugTableForUnif.unusedCount;

    const _getDebugTableForUnif2 = getDebugTableForUniforms({
      header: `${this.id} uniforms`,
      program: this.program,
      uniforms: Object.assign({}, this.program.uniforms, uniforms),
      undefinedOnly: true
    }),
          missingTable = _getDebugTableForUnif2.table,
          missingCount = _getDebugTableForUnif2.count;

    if (missingCount > 0) {
      log.log('MISSING UNIFORMS', Object.keys(missingTable))();
    }

    if (unusedCount > 0) {
      log.log('UNUSED UNIFORMS', Object.keys(unusedTable))();
    }

    const configTable = getDebugTableForProgramConfiguration(this.vertexArray.configuration);
    log.table(priority, attributeTable)();
    log.table(priority, uniformTable)();
    log.table(priority + 1, configTable)();
    logModel(this, uniforms);

    if (framebuffer) {
      framebuffer.log({
        priority: LOG_DRAW_PRIORITY,
        message: `Rendered to ${framebuffer.id}`
      });
    }

    log.groupEnd(LOG_DRAW_PRIORITY, `>>> DRAWING MODEL ${this.id}`)();
  }

}
//# sourceMappingURL=model.js.map