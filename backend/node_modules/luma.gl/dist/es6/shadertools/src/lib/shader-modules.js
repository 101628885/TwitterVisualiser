import assert from '../utils/assert';
const shaderModules = {};
let defaultShaderModules = [];
export function registerShaderModules(shaderModuleList, {
  ignoreMultipleRegistrations = false
} = {}) {
  for (const shaderModule of shaderModuleList) {
    registerShaderModule(shaderModule, {
      ignoreMultipleRegistrations
    });
  }
}
export function setDefaultShaderModules(modules) {
  defaultShaderModules = modules;
}
export function getShaderModule(moduleOrName) {
  if (typeof moduleOrName !== 'string') {
    const shaderModule = moduleOrName;
    assert(typeof shaderModule.name === 'string');
    registerShaderModule(shaderModule, {
      ignoreMultipleRegistrations: true
    });
    return shaderModule;
  }

  const shaderModule = shaderModules[moduleOrName];

  if (!shaderModule) {
    assert(false, `Unknown shader module ${moduleOrName}`);
  }

  return shaderModule;
}
export function resolveModules(modules) {
  const moduleNames = modules.map(module => {
    if (typeof module !== 'string') {
      registerShaderModules([module], {
        ignoreMultipleRegistrations: true
      });
      return module.name;
    }

    return module;
  });
  return getShaderDependencies(moduleNames);
}
export function getShaderDependencies(modules) {
  modules = modules.concat(defaultShaderModules);
  const result = {};
  getDependencyGraph({
    modules,
    level: 0,
    result
  });
  return Object.keys(result).sort((a, b) => result[b] - result[a]);
}
export function getDependencyGraph({
  modules,
  level,
  result
}) {
  if (level >= 5) {
    throw new Error('Possible loop in shader dependency graph');
  }

  for (const moduleOrName of modules) {
    const shaderModule = getShaderModule(moduleOrName);

    if (result[shaderModule.name] === undefined || result[shaderModule.name] < level) {
      result[shaderModule.name] = level;
    }
  }

  for (const moduleOrName of modules) {
    const shaderModule = getShaderModule(moduleOrName);

    if (shaderModule.dependencies) {
      getDependencyGraph({
        modules: shaderModule.dependencies,
        level: level + 1,
        result
      });
    }
  }

  return result;
}

function parseDeprecationDefinitions(deprecations = []) {
  deprecations.forEach(def => {
    switch (def.type) {
      case 'function':
        def.regex = new RegExp(`\\b${def.old}\\(`);
        break;

      default:
        def.regex = new RegExp(`${def.type} ${def.old};`);
    }
  });
  return deprecations;
}

function registerShaderModule(shaderModule, {
  ignoreMultipleRegistrations = false
}) {
  assert(shaderModule.name, 'shader module has no name');

  if (!ignoreMultipleRegistrations && shaderModules[shaderModule.name]) {
    throw new Error(`shader module ${shaderModule.name} already registered`);
  }

  shaderModules[shaderModule.name] = shaderModule;
  shaderModule.dependencies = shaderModule.dependencies || [];
  shaderModule.deprecations = parseDeprecationDefinitions(shaderModule.deprecations);
}
//# sourceMappingURL=shader-modules.js.map