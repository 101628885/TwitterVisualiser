import Accessor from './accessor';
import { isWebGL2 } from '../webgl-utils';
import { decomposeCompositeGLType } from '../webgl-utils/attribute-utils';
export default class ProgramConfiguration {
  constructor(program) {
    this.id = program.id;
    this.attributeInfos = [];
    this.attributeInfosByName = {};
    this.varyingInfos = [];
    this.varyingInfosByName = {};
    Object.seal(this);

    this._readAttributesFromProgram(program);

    this._readVaryingsFromProgram(program);
  }

  getAttributeInfo(locationOrName) {
    const location = Number(locationOrName);

    if (Number.isFinite(location)) {
      return this.attributeInfos[location];
    }

    return this.attributeInfosByName[locationOrName] || null;
  }

  getAttributeLocation(locationOrName) {
    const attributeInfo = this.getAttributeInfo(locationOrName);
    return attributeInfo ? attributeInfo.location : -1;
  }

  getAttributeAccessor(locationOrName) {
    const attributeInfo = this.getAttributeInfo(locationOrName);
    return attributeInfo ? attributeInfo.accessor : null;
  }

  getVaryingInfo(locationOrName) {
    const location = Number(locationOrName);

    if (Number.isFinite(location)) {
      return this.varyingInfos[location];
    }

    return this.varyingInfosByName[locationOrName] || null;
  }

  getVaryingIndex(locationOrName) {
    const varying = this.getVaryingInfo();
    return varying ? varying.location : -1;
  }

  getVaryingAccessor(locationOrName) {
    const varying = this.getVaryingInfo();
    return varying ? varying.accessor : null;
  }

  _readAttributesFromProgram(program) {
    const gl = program.gl;
    const count = gl.getProgramParameter(program.handle, 35721);

    for (let index = 0; index < count; index++) {
      const _gl$getActiveAttrib = gl.getActiveAttrib(program.handle, index),
            name = _gl$getActiveAttrib.name,
            type = _gl$getActiveAttrib.type,
            size = _gl$getActiveAttrib.size;

      const location = gl.getAttribLocation(program.handle, name);

      this._addAttribute(location, name, type, size);
    }

    this.attributeInfos.sort((a, b) => a.location - b.location);
  }

  _readVaryingsFromProgram(program) {
    const gl = program.gl;

    if (!isWebGL2(gl)) {
      return;
    }

    const count = gl.getProgramParameter(program.handle, 35971);

    for (let location = 0; location < count; location++) {
      const _gl$getTransformFeedb = gl.getTransformFeedbackVarying(program.handle, location),
            name = _gl$getTransformFeedb.name,
            type = _gl$getTransformFeedb.type,
            size = _gl$getTransformFeedb.size;

      this._addVarying(location, name, type, size);
    }

    this.varyingInfos.sort((a, b) => a.location - b.location);
  }

  _addAttribute(location, name, compositeType, size) {
    const _decomposeCompositeGL = decomposeCompositeGLType(compositeType),
          type = _decomposeCompositeGL.type,
          components = _decomposeCompositeGL.components;

    const accessor = {
      type,
      size: size * components
    };

    this._inferProperties(location, name, accessor);

    const attributeInfo = {
      location,
      name,
      accessor: new Accessor(accessor)
    };
    this.attributeInfos.push(attributeInfo);
    this.attributeInfosByName[attributeInfo.name] = attributeInfo;
  }

  _inferProperties(location, name, accessor) {
    if (/instance/i.test(name)) {
      accessor.divisor = 1;
    }
  }

  _addVarying(location, name, compositeType, size) {
    const _decomposeCompositeGL2 = decomposeCompositeGLType(compositeType),
          type = _decomposeCompositeGL2.type,
          components = _decomposeCompositeGL2.components;

    const accessor = new Accessor({
      type,
      size: size * components
    });
    const varying = {
      location,
      name,
      accessor
    };
    this.varyingInfos.push(varying);
    this.varyingInfosByName[varying.name] = varying;
  }

}
//# sourceMappingURL=program-configuration.js.map