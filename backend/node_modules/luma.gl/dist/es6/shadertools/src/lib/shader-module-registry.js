import ShaderModule from './shader-module';
import assert from '../utils/assert';
export default class ShaderModuleRegistry {
  constructor() {
    this.shaderModules = {};
    this.defaultShaderModules = [];
  }

  setDefaultShaderModules(modules) {
    this.defaultShaderModules = this.resolveModules(modules);
  }

  registerShaderModules(shaderModuleList, {
    ignoreMultipleRegistrations = false
  } = {}) {
    for (const shaderModule of shaderModuleList) {
      this._registerShaderModule(shaderModule, ignoreMultipleRegistrations);
    }
  }

  getShaderModule(moduleOrName) {
    if (moduleOrName instanceof ShaderModule) {
      return moduleOrName;
    }

    if (typeof moduleOrName !== 'string') {
      return this._registerShaderModule(moduleOrName, true);
    }

    const module = this.shaderModules[moduleOrName];

    if (!module) {
      assert(false, `Unknown shader module ${moduleOrName}`);
    }

    return module;
  }

  resolveModules(modules) {
    return modules.map(moduleOrName => this.getShaderModule(moduleOrName));
  }

  _registerShaderModule(module, ignoreMultipleRegistrations = false) {
    if (module instanceof ShaderModule) {
      return module;
    }

    assert(module.name, 'shader module has no name');

    if (!this.shaderModules[module.name] || ignoreMultipleRegistrations) {
      module = new ShaderModule(module);
      module.dependencies = this.resolveModules(module.dependencies);
      this.shaderModules[module.name] = module;
    } else {
      throw new Error(`shader module ${module.name} already registered`);
    }

    return this.shaderModules[module.name];
  }

}
//# sourceMappingURL=shader-module-registry.js.map