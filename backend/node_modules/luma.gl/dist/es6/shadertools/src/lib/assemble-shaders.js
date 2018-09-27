import { VERTEX_SHADER, FRAGMENT_SHADER } from './constants';
import { resolveModules, getShaderModule } from './resolve-modules';
import { getPlatformShaderDefines, getVersionDefines } from './platform-defines';
import injectShader from './inject-shader';
import assert from '../utils/assert';
const SHADER_TYPE = {
  [VERTEX_SHADER]: 'vertex',
  [FRAGMENT_SHADER]: 'fragment'
};
const FRAGMENT_SHADER_PROLOGUE = `\
precision highp float;

`;
export function assembleShaders(gl, opts = {}) {
  const vs = opts.vs,
        fs = opts.fs;
  const modules = resolveModules(opts.modules || []);
  return {
    gl,
    vs: assembleShader(gl, Object.assign({}, opts, {
      source: vs,
      type: VERTEX_SHADER,
      modules
    })),
    fs: assembleShader(gl, Object.assign({}, opts, {
      source: fs,
      type: FRAGMENT_SHADER,
      modules
    })),
    getUniforms: assembleGetUniforms(modules),
    modules: assembleModuleMap(modules)
  };
}

function assembleShader(gl, {
  id,
  source,
  type,
  modules = [],
  defines = {},
  inject = {},
  prologue = true,
  log
}) {
  assert(typeof source === 'string', 'shader source must be a string');
  const isVertex = type === VERTEX_SHADER;
  const sourceLines = source.split('\n');
  let glslVersion = 100;
  let versionLine = '';
  let coreSource = source;

  if (sourceLines[0].indexOf('#version ') === 0) {
    glslVersion = 300;
    versionLine = sourceLines[0];
    coreSource = sourceLines.slice(1).join('\n');
  }

  let assembledSource = prologue ? `\
${versionLine}
${getShaderName({
    id,
    source,
    type
  })}
${getPlatformShaderDefines(gl)}
${getVersionDefines(gl, glslVersion, !isVertex)}
${getApplicationDefines(defines)}
${isVertex ? '' : FRAGMENT_SHADER_PROLOGUE}
` : `${versionLine}
`;
  let injectStandardStubs = false;

  for (const module of modules) {
    switch (module.name) {
      case 'inject':
        injectStandardStubs = true;
        break;

      default:
        module.checkDeprecations(coreSource, log);
        const moduleSource = module.getModuleSource(type, glslVersion);
        assembledSource += moduleSource;
    }
  }

  assembledSource += coreSource;
  assembledSource = injectShader(assembledSource, type, inject, injectStandardStubs);
  return assembledSource;
}

function assembleGetUniforms(modules) {
  return function getUniforms(opts) {
    const uniforms = {};

    for (const module of modules) {
      const moduleUniforms = module.getUniforms(opts, uniforms);
      Object.assign(uniforms, moduleUniforms);
    }

    return uniforms;
  };
}

function assembleModuleMap(modules) {
  const result = {};

  for (const moduleName of modules) {
    const shaderModule = getShaderModule(moduleName);
    result[moduleName] = shaderModule;
  }

  return result;
}

function getShaderName({
  id,
  source,
  type
}) {
  const injectShaderName = id && typeof id === 'string' && source.indexOf('SHADER_NAME') === -1;
  return injectShaderName ? `
#define SHADER_NAME ${id}_${SHADER_TYPE[type]}

` : '';
}

function getApplicationDefines(defines = {}) {
  let count = 0;
  let sourceText = '';

  for (const define in defines) {
    if (count === 0) {
      sourceText += '\n// APPLICATION DEFINES\n';
    }

    count++;
    const value = defines[define];

    if (value || Number.isFinite(value)) {
      sourceText += `#define ${define.toUpperCase()} ${defines[define]}\n`;
    }
  }

  if (count === 0) {
    sourceText += '\n';
  }

  return sourceText;
}
//# sourceMappingURL=assemble-shaders.js.map